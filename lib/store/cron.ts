import { getDb } from "@/db/client";
import type { ExtensionAi } from "./content";
import { syncAllExtensions } from "./fetcher";

export async function runScheduledExtensionSync(env: {
  DB: D1Database;
  GITHUB_TOKEN?: string;
  AI: ExtensionAi;
}) {
  if (!env.GITHUB_TOKEN?.trim()) {
    throw new Error(
      "Extension cron requires a GITHUB_TOKEN Worker secret. Configure it with pnpm exec wrangler secret put GITHUB_TOKEN.",
    );
  }

  console.log("[extension-cron] starting extension sync");
  const stats = await syncAllExtensions(getDb(env.DB), env.GITHUB_TOKEN, {
    ai: env.AI,
  });
  console.log("[extension-cron] completed", JSON.stringify(stats));

  if (stats.errors > 0 || stats.failedLocales > 0) {
    throw new Error(
      `Extension cron: ${stats.errors} sync errors, ${stats.failedLocales} pending language(s)`,
    );
  }

  return stats;
}
