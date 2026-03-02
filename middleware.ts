import { type NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/i18n";

/**
 * Detects the best matching locale from the Accept-Language header
 */
function detectLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return i18n.defaultLanguage;

  // Parse Accept-Language header (e.g., "zh-CN,zh;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";q=");
      return {
        code: code.toLowerCase(),
        q: qValue ? Number.parseFloat(qValue) : 1.0,
      };
    })
    .sort((a, b) => b.q - a.q);

  // Try to match supported locales
  for (const { code } of languages) {
    // Exact match (e.g., "zh-tw" -> "zh-TW")
    const exactMatch = i18n.languages.find(
      (locale) => locale.toLowerCase() === code,
    );
    if (exactMatch) return exactMatch;

    // Match language prefix (e.g., "zh-cn" -> "zh", "zh-hk" -> "zh")
    const langPrefix = code.split("-")[0];
    const prefixMatch = i18n.languages.find(
      (locale) => locale.toLowerCase().split("-")[0] === langPrefix,
    );
    if (prefixMatch) return prefixMatch;
  }

  return i18n.defaultLanguage;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale handling for the standalone OpenAPI reference route
  if (pathname.startsWith("/docs/openapi")) {
    return NextResponse.next();
  }

  // 301 redirect legacy /zh-CN/* paths (old site) to /zh/*
  if (/^\/zh-CN(\/|$)/i.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh-CN/i, "/zh");
    return NextResponse.redirect(url, { status: 301 });
  }

  // Normalize English locale: redirect /en/* to /* (hideLocale: "default-locale")
  if (pathname.startsWith("/en/") || pathname === "/en") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/en" ? "/" : pathname.slice(3); // Remove '/en'
    return NextResponse.redirect(url);
  }

  // Get user's saved locale preference and referer
  const savedLocale = request.cookies.get("user-locale")?.value;
  const referer = request.headers.get("referer");

  // Determine current locale from pathname
  let currentLocale = i18n.defaultLanguage;
  for (const locale of i18n.languages) {
    if (locale !== i18n.defaultLanguage) {
      if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
        currentLocale = locale;
        break;
      }
    }
  }

  // Check if this is a language switch navigation (user clicking language switcher)
  let isLanguageSwitch = false;
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      const refererPath = refererUrl.pathname;

      // Extract referer locale
      let refererLocale = i18n.defaultLanguage;
      for (const locale of i18n.languages) {
        if (locale !== i18n.defaultLanguage) {
          if (
            refererPath.startsWith(`/${locale}/`) ||
            refererPath === `/${locale}`
          ) {
            refererLocale = locale;
            break;
          }
        }
      }

      // Check if the paths are the same (modulo locale prefix)
      const currentPathWithoutLocale =
        currentLocale === i18n.defaultLanguage
          ? pathname
          : pathname.slice(`/${currentLocale}`.length) || "/";
      const refererPathWithoutLocale =
        refererLocale === i18n.defaultLanguage
          ? refererPath
          : refererPath.slice(`/${refererLocale}`.length) || "/";

      // If paths match but locales differ, this is a language switch
      if (
        currentPathWithoutLocale === refererPathWithoutLocale &&
        currentLocale !== refererLocale
      ) {
        isLanguageSwitch = true;
      }
    } catch {
      // Invalid referer URL, ignore
    }
  }

  // If user has a saved locale preference AND this is not an active language switch
  if (
    !isLanguageSwitch &&
    savedLocale &&
    i18n.languages.includes(savedLocale as (typeof i18n.languages)[number])
  ) {
    if (currentLocale !== savedLocale) {
      const url = request.nextUrl.clone();

      if (savedLocale === i18n.defaultLanguage) {
        // Redirect to root for default locale
        if (currentLocale !== i18n.defaultLanguage) {
          // Remove locale prefix: /zh/docs -> /docs
          const pathWithoutLocale =
            pathname.slice(`/${currentLocale}`.length) || "/";
          url.pathname = pathWithoutLocale;
          return NextResponse.redirect(url);
        }
      } else {
        // Redirect to saved non-default locale
        if (currentLocale === i18n.defaultLanguage) {
          // Add locale prefix: /docs -> /zh/docs
          url.pathname = `/${savedLocale}${pathname}`;
        } else {
          // Replace locale prefix: /zh/docs -> /zh-TW/docs
          url.pathname = pathname.replace(
            `/${currentLocale}`,
            `/${savedLocale}`,
          );
        }
        return NextResponse.redirect(url);
      }
    }
  } else if (!savedLocale && !isLanguageSwitch) {
    // No saved preference and not a language switch - auto-detect on first visit
    const pathnameHasLocale = i18n.languages
      .filter((locale) => locale !== i18n.defaultLanguage)
      .some(
        (locale) =>
          pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
      );

    if (!pathnameHasLocale) {
      const detectedLocale = detectLocale(request);

      // Redirect to detected locale if not default
      if (detectedLocale !== i18n.defaultLanguage) {
        const redirectPath = pathname === "/" ? "" : pathname;
        const url = request.nextUrl.clone();
        url.pathname = `/${detectedLocale}${redirectPath}`;
        return NextResponse.redirect(url);
      }
    }
  }

  // If this is a language switch, update the cookie
  if (isLanguageSwitch) {
    const response = NextResponse.next();
    response.cookies.set("user-locale", currentLocale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });

    // Rewrite default locale paths
    if (currentLocale === i18n.defaultLanguage) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathname}`;
      return NextResponse.rewrite(url);
    }

    return response;
  }

  // Rewrite paths without locale prefix to /en/* (for default locale routing)
  const pathnameHasLocale = i18n.languages
    .filter((locale) => locale !== i18n.defaultLanguage)
    .some(
      (locale) =>
        pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

  if (!pathnameHasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Continue with normal processing for non-default locales
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
