import { type NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/i18n";

function preferredLocale(request: NextRequest): string {
  const savedLocale = request.cookies.get("user-locale")?.value;
  if (savedLocale && i18n.languages.some((locale) => locale === savedLocale)) {
    return savedLocale;
  }

  const languages = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((language) => {
      const [code, quality] = language.trim().toLowerCase().split(";q=");
      return { code, quality: quality ? Number.parseFloat(quality) : 1 };
    })
    .filter(({ quality }) => quality > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    const match =
      i18n.languages.find((locale) => locale.toLowerCase() === code) ??
      i18n.languages.find(
        (locale) => locale.toLowerCase() === code.split("-")[0],
      );
    if (match) return match;
  }

  return i18n.defaultLanguage;
}

function pathLocale(pathname: string): string {
  return (
    i18n.languages.find(
      (locale) =>
        pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    ) ?? i18n.defaultLanguage
  );
}

function isLanguageSwitch(request: NextRequest, locale: string): boolean {
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    const previous = new URL(referer);
    if (previous.origin !== request.nextUrl.origin) return false;
    const previousLocale = pathLocale(previous.pathname);
    const withoutLocale = (pathname: string, language: string) =>
      (pathname.startsWith(`/${language}/`) || pathname === `/${language}`
        ? pathname.slice(language.length + 1)
        : pathname) || "/";
    return (
      previousLocale !== locale &&
      withoutLocale(previous.pathname, previousLocale) ===
        withoutLocale(request.nextUrl.pathname, locale)
    );
  } catch {
    return false;
  }
}

function languageResponse(response: NextResponse, selectedLocale?: string) {
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Accept-Language, Cookie, Referer");
  if (selectedLocale) {
    response.cookies.set("user-locale", selectedLocale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname.toLowerCase();

  if (hostname === "www.gopeed.com") {
    const url = request.nextUrl.clone();
    url.hostname = "gopeed.com";
    return NextResponse.redirect(url, { status: 301 });
  }

  // Skip locale handling for the standalone OpenAPI reference route.
  if (pathname === "/docs/openapi" || pathname.startsWith("/docs/openapi/")) {
    return NextResponse.next();
  }

  // Repair locale prefixes emitted by the old hreflang bug, preserving the
  // outer (requested) language: /ru/zh/docs -> /ru/docs. Only leading locale
  // segments are stripped; content slugs such as /docs/ru stay intact.
  const defaultPrefix = `/${i18n.defaultLanguage}`;
  const segments = pathname.split("/").filter(Boolean);
  const normalizeLocale = (segment: string | undefined) =>
    /^zh-cn$/i.test(segment ?? "")
      ? "zh"
      : i18n.languages.find((locale) => locale === segment);
  const explicitLocale = normalizeLocale(segments[0]);
  let prefixLength = 0;
  while (normalizeLocale(segments[prefixLength])) prefixLength++;
  if (
    explicitLocale &&
    (prefixLength > 1 ||
      explicitLocale === i18n.defaultLanguage ||
      segments[0] !== explicitLocale)
  ) {
    const url = request.nextUrl.clone();
    const contentPath = segments.slice(prefixLength).join("/");
    url.pathname =
      (explicitLocale === i18n.defaultLanguage ? "" : `/${explicitLocale}`) +
        (contentPath ? `/${contentPath}` : "") || "/";
    // The docs switcher uses /en/* when selecting English. Save that explicit
    // choice before redirecting so browser detection cannot send it back.
    const response = NextResponse.redirect(url, { status: 301 });
    return explicitLocale === i18n.defaultLanguage
      ? languageResponse(response, i18n.defaultLanguage)
      : response;
  }

  const currentLocale = pathLocale(pathname);
  const switchingLanguage = isLanguageSwitch(request, currentLocale);

  // Unprefixed entry URLs retain saved preferences and browser detection.
  // Explicit language switches take priority, including switching to English.
  if (currentLocale === i18n.defaultLanguage && !switchingLanguage) {
    const locale = preferredLocale(request);
    if (locale !== i18n.defaultLanguage) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
      return languageResponse(NextResponse.redirect(url));
    }
  }

  if (currentLocale === i18n.defaultLanguage) {
    const url = request.nextUrl.clone();
    url.pathname = `${defaultPrefix}${pathname}`;
    return languageResponse(
      NextResponse.rewrite(url),
      switchingLanguage ? currentLocale : undefined,
    );
  }

  return switchingLanguage
    ? languageResponse(NextResponse.next(), currentLocale)
    : NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and static files.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
