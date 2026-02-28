#!/usr/bin/env node
/**
 * Download the Gopeed OpenAPI swagger.json from GitHub before building.
 *
 * The file is placed at lib/openapi/swagger.json (git-ignored) so that
 * it can be imported as a static JSON module and bundled into the server
 * build. This avoids runtime fetch calls that fail in Cloudflare Workers.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SWAGGER_URL =
  "https://raw.githubusercontent.com/GopeedLab/gopeed-js/refs/heads/main/packages/gopeed-openapi/swagger.json";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "../lib/openapi/swagger.json");

async function main() {
  console.log(`[fetch-swagger] Downloading ${SWAGGER_URL}`);
  const res = await fetch(SWAGGER_URL);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch swagger.json: ${res.status} ${res.statusText}`,
    );
  }
  const text = await res.text();

  // Validate it's parseable JSON
  JSON.parse(text);

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, text, "utf-8");
  console.log(`[fetch-swagger] Saved to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
