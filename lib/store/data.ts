import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc, eq } from "drizzle-orm";
import { cache } from "react";
import { getDb } from "@/db/client";
import { extensionSummaryColumns, extensions } from "@/db/schema";

async function storeDb() {
  const ctx = await getCloudflareContext({ async: true });
  // @ts-expect-error - CF env type
  const d1 = ctx.env.DB as D1Database | undefined;
  if (!d1) throw new Error("D1 database not available");
  return getDb(d1);
}

export async function getExtensionSummaries() {
  const db = await storeDb();
  return db
    .select(extensionSummaryColumns)
    .from(extensions)
    .orderBy(desc(extensions.installCount), desc(extensions.stars))
    .all();
}

// Share the same read between generateMetadata and the page in one render.
export const getStoreExtension = cache(async (id: string) => {
  const db = await storeDb();
  return db.select().from(extensions).where(eq(extensions.id, id)).get();
});
