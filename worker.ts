// biome-ignore lint/suspicious/noTsIgnore: The module is absent before build and present afterwards.
// @ts-ignore OpenNext generates this module at build time.
import handler from "./.open-next/worker.js";
import { runScheduledExtensionSync } from "./lib/store/cron";

interface WorkerEnv {
  DB: D1Database;
  GITHUB_TOKEN?: string;
}

export default {
  fetch: handler.fetch,
  async scheduled(_event, env) {
    await runScheduledExtensionSync(env);
  },
} satisfies ExportedHandler<WorkerEnv>;

// Preserve the Durable Object exports supplied by OpenNext.
// biome-ignore lint/suspicious/noTsIgnore: The module is absent before build and present afterwards.
// @ts-ignore OpenNext generates this module at build time.
export * from "./.open-next/worker.js";
