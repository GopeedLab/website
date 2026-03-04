import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Prevent indexing of internal API routes, OG image generator, and LLM endpoints
        disallow: ["/api/", "/og/"],
      },
      {
        // Google-specific: allow maximum crawling for rich results
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/og/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
