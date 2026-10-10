import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

export default defineCloudflareConfig({
  // Use R2 for incremental cache (ISR/SSG pages + fetch data cache)
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    // Bound staleness without introducing a separate global purge service.
    mode: "short-lived",
  }),
  queue: doQueue,
  enableCacheInterception: true,
});
