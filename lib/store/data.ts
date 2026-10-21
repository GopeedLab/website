import { getCloudflareContext } from "@opennextjs/cloudflare";
import { and, desc, eq } from "drizzle-orm";
import { cache } from "react";
import { getDb } from "@/db/client";
import {
  extensionLocalizations,
  extensionSummaryColumns,
  extensions,
} from "@/db/schema";
import type { Locale } from "@/lib/i18n/config";

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
export const getStoreExtension = cache(async (id: string, locale: Locale) => {
  const db = await storeDb();
  const extension = await db
    .select()
    .from(extensions)
    .where(eq(extensions.id, id))
    .get();
  if (!extension) return undefined;
  const localized = await db
    .select()
    .from(extensionLocalizations)
    .where(
      and(
        eq(extensionLocalizations.extensionId, id),
        eq(extensionLocalizations.locale, locale),
        eq(extensionLocalizations.sourceHash, extension.contentHash ?? ""),
      ),
    )
    .get();
  return {
    ...extension,
    // Keep the author's metadata separate from generated landing-page copy.
    seoTitle: localized?.title ?? null,
    seoDescription: localized?.description ?? null,
    readme: localized ? localized.readme : extension.readme,
  };
});
