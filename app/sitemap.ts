import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { BASE_URL, canonicalUrl } from "@/lib/seo";
import { openapiPageSource, source } from "@/lib/source";

// Static pages that exist for every locale
const STATIC_PATHS = ["/", "/store"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // ── Static pages (home, store) ──────────────────────────────────────────
  for (const path of STATIC_PATHS) {
    for (const locale of locales) {
      entries.push({
        url: canonicalUrl(locale, path),
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "/" ? 1.0 : 0.8,
      });
    }
  }

  // ── i18n docs pages ─────────────────────────────────────────────────────
  // source.getPages() returns all locales when called without argument
  for (const page of source.getPages()) {
    const locale = page.locale ?? "en";
    entries.push({
      url: canonicalUrl(locale, page.url),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // ── OpenAPI reference pages (locale-agnostic) ───────────────────────────
  for (const page of openapiPageSource.getPages()) {
    entries.push({
      url: `${BASE_URL}${page.url}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}
