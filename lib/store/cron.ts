import { getDb } from "@/db/client";
import { syncAllExtensions } from "./fetcher";

export async function runScheduledExtensionSync(env: {
  DB: D1Database;
  GITHUB_TOKEN?: string;
}) {
  if (!env.GITHUB_TOKEN?.trim()) {
    throw new Error(
      "Extension cron requires a GITHUB_TOKEN Worker secret. Configure it with pnpm exec wrangler secret put GITHUB_TOKEN.",
    );
  }

  console.log("[extension-cron] starting full sync");
  const stats = await syncAllExtensions(getDb(env.DB), env.GITHUB_TOKEN);
  console.log("[extension-cron] completed", JSON.stringify(stats));

  if (stats.errors > 0) {
    throw new Error(`Extension cron failed to sync ${stats.errors} item(s)`);
  }

  return stats;
}
