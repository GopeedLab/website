import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Prevent indexing of internal API routes and OG image generator
      disallow: ["/api/", "/og/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
