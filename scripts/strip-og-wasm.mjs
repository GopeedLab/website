/**
 * Post-build script: strip the unused @vercel/og edge import from the
 * OpenNext server bundle so that wrangler does not pull in resvg.wasm
 * (~1.3 MB) and yoga.wasm (~87 KB).
 *
 * The turbopack runtime injects a switch-case inside `externalImport()`
 * that maps "index.node.js" → "index.edge.js".  Because this project
 * never uses `next/og` / `ImageResponse`, the branch is dead code, but
 * wrangler's esbuild pass still bundles the edge file (and its wasm
 * imports) because it sees a static `import(…)` expression.
 *
 * This script removes that switch-case so wrangler never encounters the
 * import.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const handlerPath = join(
  process.cwd(),
  ".open-next/server-functions/default/handler.mjs",
);

const content = readFileSync(handlerPath, "utf8");

// Pattern: the turbopack-injected switch branch for @vercel/og
const pattern =
  /case\s*"next\/dist\/compiled\/@vercel\/og\/index\.node\.js"\s*:\s*raw\s*=\s*await\s+import\(\s*"next\/dist\/compiled\/@vercel\/og\/index\.edge\.js"\s*\)\s*;\s*break\s*;\s*/g;

const patched = content.replace(pattern, "");

if (patched === content) {
  console.log(
    "⚠️  strip-og-wasm: no @vercel/og switch-case found – nothing to patch.",
  );
} else {
  writeFileSync(handlerPath, patched);
  console.log(
    "✅ strip-og-wasm: removed @vercel/og edge import from handler.mjs",
  );
}
