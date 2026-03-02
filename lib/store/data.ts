import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import type { Extension } from "@/db/schema";
import { extensions } from "@/db/schema";
import { syncExtensions } from "@/lib/store/fetcher";

export type { Extension };

/**
 * Fetch all extensions from the database, then trigger a background sync.
 * Returns the current DB data immediately for SSR.
 */
export async function getExtensionsWithBackgroundSync(
  d1: D1Database,
  githubToken?: string,
): Promise<Extension[]> {
  const db = getDb(d1);

  // Fetch current data from DB (fast path for SSR)
  const rows = await db
    .select()
    .from(extensions)
    .orderBy(desc(extensions.installCount), desc(extensions.stars))
    .all();

  // Trigger background sync (fire and forget)
  // In CF Workers, we use waitUntil via the execution context
  // Here we just fire a non-blocking promise
  syncExtensions(db, githubToken).catch((err) => {
    console.error("Background extension sync error:", err);
  });

  return rows;
}
