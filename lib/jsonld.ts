import type { Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";
import { getVisibleFaqEntries } from "@/lib/keyword-pages";
import { BASE_URL, canonicalUrl } from "@/lib/seo";

/**
 * JSON-LD structured data generators for SEO.
 *
 * These produce Schema.org objects that Google, Bing and other search engines
 * use to display rich results (software info cards, breadcrumbs, sitelinks
 * search box, etc.).
 */

// ── SoftwareApplication ────────────────────────────────────────────────────
// Tells Google this site is about a downloadable software product.
export function softwareApplicationJsonLd(locale: Locale, version?: string) {
  const t = (key: string) => getTranslation(locale, key);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gopeed",
    alternateName: "Gopeed Download Manager",
    description: t("site.description"),
    url: canonicalUrl(locale, "/"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows, macOS, Linux, Android, iOS",
    ...(version ? { softwareVersion: version } : {}),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    downloadUrl: `${BASE_URL}/#downloads`,
    screenshot: `${BASE_URL}/images/screenshot.png`,
    image: `${BASE_URL}/images/logo.png`,
    author: {
      "@type": "Organization",
      name: "Gopeed",
      url: BASE_URL,
    },
    license: "https://opensource.org/licenses/GPL-3.0",
    featureList: [
      "Multi-threaded download engine",
      "HTTP/HTTPS protocol support",
      "BitTorrent protocol support",
      "Magnet link support",
      "ed2k link support",
      "Cross-platform (Windows, macOS, Linux, Android, iOS, Web)",
      "JavaScript extension system",
      "RESTful API",
      "Browser extension (Chrome, Edge, Firefox)",
      "Open source",
    ],
  };
}

// ── WebSite (enables Sitelinks Search Box in Google) ───────────────────────
export function webSiteJsonLd(locale: Locale) {
  const t = (key: string) => getTranslation(locale, key);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("site.name"),
    alternateName: "Gopeed Download Manager",
    url: canonicalUrl(locale, "/"),
    description: t("site.description"),
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: "Gopeed",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
  };
}

// ── Organization ──────────────────────────────────────────────────────────
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gopeed",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    sameAs: ["https://github.com/GoproxySS/gopeed"],
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────
// Generates breadcrumb structured data for any page path.
export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(locale, item.path),
    })),
  };
}

// ── FAQPage (for features section – helps win "People also ask" snippets) ─
export function faqJsonLd(locale: Locale) {
  const entries = getVisibleFaqEntries(locale);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

/**
 * Helper: renders one or more JSON-LD objects into a string
 * suitable for dangerouslySetInnerHTML.
 */
export function jsonLdScriptContent(
  ...objects: Record<string, unknown>[]
): string {
  if (objects.length === 1) {
    return JSON.stringify(objects[0]);
  }
  return JSON.stringify(objects);
}
