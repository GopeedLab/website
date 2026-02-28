#!/usr/bin/env node
/**
 * Patch handler.mjs in the open-next build output to prevent resvg.wasm +
 * yoga.wasm from being bundled into the Cloudflare Worker.
 *
 * Problem:
 *   Turbopack generates an externalImport() dispatcher in handler.mjs that
 *   contains:
 *
 *     case "next/dist/compiled/@vercel/og/index.node.js":
 *       raw = await import("next/dist/compiled/@vercel/og/index.edge.js");
 *       break;
 *
 *   This maps the node.js module ID to the edge build, which has static
 *   `import resvg_wasm from "resvg.wasm?module"` declarations.  Wrangler's
 *   esbuild bundler sees the dynamic import of index.edge.js and pulls in the
 *   WASM files, costing ~543 KB gzip on the Free plan (3 MB limit).
 *
 *   All OG images are statically pre-generated via generateStaticParams(), so
 *   ImageResponse is never called at runtime in this worker.  The WASM is
 *   purely dead code.
 *
 * Fix:
 *   Replace the two occurrences of
 *     import("next/dist/compiled/@vercel/og/index.edge.js")
 *   inside handler.mjs with
 *     import("next/dist/compiled/@vercel/og/index.node.js")
 *
 *   This removes index.edge.js (and its WASM imports) from the esbuild input
 *   graph entirely.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const HANDLER = join(ROOT, ".open-next/server-functions/default/handler.mjs");

if (!existsSync(HANDLER)) {
  console.warn(
    "[patch-og-wasm] WARNING: handler.mjs not found — skipping patch\n" +
      "  (run `pnpm cf:build` first)",
  );
  process.exit(0);
}

const SEARCH = 'import("next/dist/compiled/@vercel/og/index.edge.js")';
const REPLACE = 'import("next/dist/compiled/@vercel/og/index.node.js")';

const src = readFileSync(HANDLER, "utf8");

const occurrences = src.split(SEARCH).length - 1;

if (occurrences === 0) {
  if (src.includes("/* patched-by-patch-og-wasm */")) {
    console.log("[patch-og-wasm] handler.mjs already patched — nothing to do.");
  } else {
    console.warn(
      "[patch-og-wasm] WARNING: Expected pattern not found in handler.mjs.\n" +
        "  The turbopack output format may have changed; please inspect manually.",
    );
  }
  process.exit(0);
}

const patched = src.replaceAll(SEARCH, REPLACE);
// Append a tiny marker so re-runs detect the already-patched state.
const final = patched.replace(
  'import("next/dist/compiled/@vercel/og/index.node.js")',
  '/* patched-by-patch-og-wasm */ import("next/dist/compiled/@vercel/og/index.node.js")',
);

writeFileSync(HANDLER, final, "utf8");
console.log(
  `[patch-og-wasm] Patched ${occurrences} occurrence(s) in handler.mjs.`,
);
console.log("[patch-og-wasm] Done.");
