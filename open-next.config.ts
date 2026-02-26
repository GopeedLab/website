import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // Use R2 for incremental cache (ISR/SSG pages + fetch data cache)
  incrementalCache: r2IncrementalCache,
});
