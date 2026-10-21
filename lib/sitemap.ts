import { locales } from "@/lib/i18n";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";

export interface SitemapPage {
  url: string;
  locale?: string;
}

export interface SitemapExtension {
  id: string;
  updatedAt: Date | null;
}

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    return {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
    }[character] as string;
  });
}

export function sitemapXml(
  pages: SitemapPage[],
  extensions: SitemapExtension[],
): string {
  const entries = new Map<string, string>();
  const add = (locale: string, path: string, modified?: Date | null) => {
    const url = canonicalUrl(locale, path);
    const lastModified =
      modified && !Number.isNaN(modified.getTime())
        ? `<lastmod>${modified.toISOString()}</lastmod>`
        : "";
    const alternates = Object.entries(hreflangAlternates(path))
      .map(
        ([language, href]) =>
          `<xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(href)}"/>`,
      )
      .join("");
    entries.set(
      url,
      `<url><loc>${escapeXml(url)}</loc>${lastModified}${alternates}</url>`,
    );
  };

  // Do not invent modification dates for pages without a content timestamp.
  for (const path of ["/", "/store"]) {
    for (const locale of locales) add(locale, path);
  }
  for (const page of pages) add(page.locale ?? "en", page.url);
  for (const extension of extensions) {
    const path = `/store/${encodeURIComponent(extension.id)}`;
    for (const locale of locales) add(locale, path, extension.updatedAt);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${[...entries.values()].join("")}</urlset>`;
}

export async function sitemapResponse(
  pages: SitemapPage[],
  loadExtensions: () => Promise<SitemapExtension[]>,
): Promise<Response> {
  try {
    const extensions = await loadExtensions();
    return new Response(sitemapXml(pages, extensions), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=300, must-revalidate",
      },
    });
  } catch (error) {
    // An incomplete 200 response could remove all extension URLs from discovery.
    console.error("Sitemap: failed to load extensions from D1:", error);
    return new Response("Sitemap temporarily unavailable", {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "300" },
    });
  }
}
