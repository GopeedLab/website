import { getCloudflareContext } from "@opennextjs/cloudflare";
import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { extensionLocalizations, extensions } from "@/db/schema";
import { sitemapResponse } from "@/lib/sitemap";
import { getAllPages } from "@/lib/source";

// Read the current catalog at request time, including extensions added after a
// deployment. Never freeze a missing build-time D1 binding into the sitemap.
export const dynamic = "force-dynamic";

export async function GET() {
  return sitemapResponse(getAllPages(), async () => {
    const ctx = await getCloudflareContext({ async: true });
    // @ts-expect-error - CF env type
    const d1 = ctx.env.DB as D1Database | undefined;
    if (!d1) throw new Error("D1 database not available");
    return getDb(d1)
      .select({
        id: extensions.id,
        updatedAt:
          sql`max(${extensions.updatedAt}, coalesce(max(${extensionLocalizations.updatedAt}), 0))`.mapWith(
            extensions.updatedAt,
          ),
      })
      .from(extensions)
      .leftJoin(
        extensionLocalizations,
        and(
          eq(extensionLocalizations.extensionId, extensions.id),
          eq(extensionLocalizations.sourceHash, extensions.contentHash),
        ),
      )
      .groupBy(extensions.id)
      .all();
  });
}
