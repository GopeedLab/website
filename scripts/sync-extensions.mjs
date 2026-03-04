#!/usr/bin/env node
/**
 * Sync gopeed extensions by calling POST /api/extensions/sync in paginated
 * batches until all repos are processed.
 *
 * Environment variables:
 *   WORKER_URL      Base URL of the deployed worker (default: https://gopeed.com)
 *   GITHUB_TOKEN    GitHub personal access token for higher API rate limits
 *   PAGE_SIZE       Repos to process per batch (default: 5, max: 5 — Worker subrequest limit)
 */

const WORKER_URL = (process.env.WORKER_URL ?? "https://gopeed.com").replace(
  /\/$/,
  "",
);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PAGE_SIZE = Math.min(
  5,
  Math.max(1, parseInt(process.env.PAGE_SIZE ?? "5", 10)),
);

const endpoint = `${WORKER_URL}/api/extensions/sync`;

async function syncPage(page) {
  const body = { page, pageSize: PAGE_SIZE };
  if (GITHUB_TOKEN) body.token = GITHUB_TOKEN;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }

  return await res.json();
}

async function main() {
  console.log(`[sync] target: ${endpoint}`);
  console.log(`[sync] pageSize: ${PAGE_SIZE}`);
  console.log(
    `[sync] token: ${GITHUB_TOKEN ? "provided" : "not set (rate-limited to 60 req/hr)"}`,
  );
  console.log();

  const totals = { synced: 0, skipped: 0, ignored: 0, errors: 0 };
  let page = 1;

  while (true) {
    process.stdout.write(`[sync] page ${page} ... `);

    const { ok, stats, error } = await syncPage(page);

    if (!ok) {
      console.error(`\n[sync] server error: ${error}`);
      process.exit(1);
    }

    console.log(
      `synced=${stats.synced} skipped=${stats.skipped} ignored=${stats.ignored} errors=${stats.errors}` +
        ` (total repos: ${stats.totalRepos})`,
    );

    totals.synced += stats.synced;
    totals.skipped += stats.skipped;
    totals.ignored += stats.ignored ?? 0;
    totals.errors += stats.errors;

    if (!stats.hasMore) break;
    page++;

    // Brief pause between batches
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log();
  console.log(
    `[sync] done — synced=${totals.synced} skipped=${totals.skipped} ignored=${totals.ignored} errors=${totals.errors}`,
  );

  if (totals.errors > 0) process.exit(1);
}

main().catch((err) => {
  console.error("[sync] fatal:", err);
  process.exit(1);
});
