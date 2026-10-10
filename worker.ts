// biome-ignore lint/suspicious/noTsIgnore: The module is absent before build and present afterwards.
// @ts-ignore OpenNext generates this module at build time.
import handler from "./.open-next/worker.js";
import { runScheduledExtensionSync } from "./lib/store/cron";
import { withExtensionResponseCache } from "./lib/store/response-cache";

interface WorkerEnv {
  DB: D1Database;
  GITHUB_TOKEN?: string;
}

export default {
  async fetch(request, env, ctx) {
    return withExtensionResponseCache(
      request,
      ctx,
      () => handler.fetch(request, env, ctx),
      (caches as CacheStorage & { default: Cache }).default,
    );
  },
  async scheduled(_event, env) {
    await runScheduledExtensionSync(env);
  },
} satisfies ExportedHandler<WorkerEnv>;

// Preserve the Durable Object exports supplied by OpenNext.
// biome-ignore lint/suspicious/noTsIgnore: The module is absent before build and present afterwards.
// @ts-ignore OpenNext generates this module at build time.
export * from "./.open-next/worker.js";
