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
 * @param path    - path WITHOUT locale prefix, must start with "/" (e.g. "/docs/dev-api")
 *                  Use "" or "/" for the root/home page.
 */
export function canonicalUrl(
  locale: Locale | string,
  path: string = "/",
): string {
  const prefix = localePrefix(locale);
  // Normalise path: ensure leading slash, strip trailing slash (except root)
  const normPath = path === "" ? "/" : path.startsWith("/") ? path : `/${path}`;
  const full = `${BASE_URL}${prefix}${normPath === "/" ? "" : normPath}`;
  // Always end root with trailing slash for consistency; others without.
  return normPath === "/" ? `${full}/` : full;
}

/**
 * Builds the `alternates.languages` map expected by Next.js Metadata.
 * Includes x-default pointing to the default locale URL.
 *
 * @param path - path WITHOUT locale prefix (e.g. "/store", "/docs/dev-api")
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
