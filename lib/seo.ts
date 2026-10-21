import type { Metadata } from "next";
import { defaultLocale, type Locale, locales } from "@/lib/i18n";

export const BASE_URL = "https://gopeed.com";

/**
 * Returns the URL-path prefix for a given locale.
 * The default locale (en) uses no prefix (hideLocale: "default-locale").
 */
export function localePrefix(locale: Locale | string): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/**
 * Builds the canonical URL for a page.
 *
 * @param locale  - page locale
 * @param path    - page path, optionally including a locale prefix (as returned by Fumadocs).
 *                  Use "" or "/" for the root/home page.
 */
export function canonicalUrl(
  locale: Locale | string,
  path: string = "/",
): string {
  const prefix = localePrefix(locale);
  const segments = path.split("/").filter(Boolean);
  // Fumadocs page URLs already include their locale. Remove it before applying
  // the target locale so canonicals, hreflang, sitemaps and breadcrumbs agree.
  if (locales.some((locale) => locale === segments[0])) segments.shift();
  const normPath = segments.length > 0 ? `/${segments.join("/")}` : "/";
  const full = `${BASE_URL}${prefix}${normPath === "/" ? "" : normPath}`;
  // Next.js redirects /zh/ to /zh with trailingSlash disabled. Use the final
  // URL for localized home pages too; only the bare domain needs a root slash.
  return normPath === "/" && !prefix ? `${full}/` : full;
}

/**
 * Builds the `alternates.languages` map expected by Next.js Metadata.
 * Includes x-default pointing to the default locale URL.
 *
 * @param path - page path, optionally including its current locale prefix
 */
export function hreflangAlternates(path: string = "/"): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of locales) {
    map[locale] = canonicalUrl(locale, path);
  }
  // x-default points to default locale
  map["x-default"] = canonicalUrl(defaultLocale, path);
  return map;
}

/**
 * Convenience helper: returns the `alternates` block for Next.js Metadata
 * with both canonical and hreflang languages set.
 */
export function pageAlternates(
  locale: Locale | string,
  path: string = "/",
): Metadata["alternates"] {
  return {
    canonical: canonicalUrl(locale, path),
    languages: hreflangAlternates(path),
  };
}

/** Next.js replaces nested metadata blocks, so every page supplies both in full. */
export function pageSocialMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
  image: string = `${BASE_URL}/images/screenshot.png`,
): Pick<Metadata, "openGraph" | "twitter"> {
  const openGraphLocale: Record<Locale, string> = {
    en: "en_US",
    zh: "zh_CN",
    "zh-TW": "zh_TW",
    ru: "ru_RU",
  };
  return {
    openGraph: {
      type: "website",
      siteName: "Gopeed",
      title,
      description,
      url: canonicalUrl(locale, path),
      locale: openGraphLocale[locale],
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
