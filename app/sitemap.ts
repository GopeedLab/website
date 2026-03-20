import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { MetadataRoute } from "next";
import { getDb } from "@/db/client";
import { extensions } from "@/db/schema";
import { locales } from "@/lib/i18n";
import { canonicalUrl } from "@/lib/seo";
import { source } from "@/lib/source";

// Static pages that exist for every locale
const STATIC_PATHS = [
  "/",
  "/store",
  "/download-manager",
  "/torrent-downloader",
  "/magnet-link-downloader",
  "/ed2k-downloader",
];

function parseTimestamp(value?: string) {
  if (!value) return null;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getSitemapTimestamp() {
  return (
    parseTimestamp(process.env.SITEMAP_BUILD_TIME) ??
    parseTimestamp(process.env.BUILT_AT) ??
    parseTimestamp(process.env.CF_PAGES_COMMIT_TIMESTAMP) ??
    new Date()
  );
}

// Keep fallback timestamps stable for the lifetime of the deployment instead
// of changing on every sitemap request.
const sitemapTimestamp = getSitemapTimestamp();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // ── Static pages (home, store) ──────────────────────────────────────────
  for (const path of STATIC_PATHS) {
    for (const locale of locales) {
      entries.push({
        url: canonicalUrl(locale, path),
        lastModified: sitemapTimestamp,
        changeFrequency: "weekly",
        priority: path === "/" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, canonicalUrl(l, path)]),
          ),
        },
      });
    }
  }

  // ── i18n docs pages ─────────────────────────────────────────────────────
  // source.getPages() returns all locales when called without argument
  for (const page of source.getPages()) {
    const locale = page.locale ?? "en";
    entries.push({
      url: canonicalUrl(locale, page.url),
      lastModified: sitemapTimestamp,
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, canonicalUrl(l, page.url)]),
        ),
      },
    });
  }

  // ── Extension store detail pages ────────────────────────────────────────
  try {
    const ctx = await getCloudflareContext({ async: true });
    // @ts-expect-error - CF env type
    const d1 = ctx.env.DB as D1Database | undefined;

    if (d1) {
      const db = getDb(d1);
      const extensionList = await db.select().from(extensions).all();

      for (const ext of extensionList) {
        const extPath = `/store/${encodeURIComponent(ext.id)}`;
        for (const locale of locales) {
          entries.push({
            url: canonicalUrl(locale, extPath),
            lastModified: ext.updatedAt
              ? new Date(ext.updatedAt)
              : sitemapTimestamp,
            changeFrequency: "weekly",
            priority: 0.6,
            alternates: {
              languages: Object.fromEntries(
                locales.map((l) => [l, canonicalUrl(l, extPath)]),
              ),
            },
          });
        }
      }
    }
  } catch (err) {
    console.error("Sitemap: failed to load extensions from D1:", err);
  }

  return entries;
}
