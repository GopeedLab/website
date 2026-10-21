#!/usr/bin/env node
// Operator-only runner. Uses the same source/hash/AI pipeline as the hourly cron.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(root);
const args = process.argv.slice(2);
if (
  args.includes("--help") ||
  !args.some((arg) => arg === "--remote" || arg === "--local")
) {
  console.log(
    "Usage: pnpm sync:extension-content --remote|--local [--full] [--regenerate] [--locales en,zh,zh-TW,ru] [--repo owner/name]\nAI always uses Cloudflare DeepSeek. --full refreshes source text even without a version bump. --regenerate also replaces completed localized content after validation; --locales limits this regeneration to selected languages.\nUses CLOUDFLARE_API_TOKEN or the current Wrangler login, and GITHUB_TOKEN or gh auth.",
  );
  process.exit(args.includes("--help") ? 0 : 1);
}
if (args.includes("--remote") && args.includes("--local"))
  throw new Error("Choose one database target");
for (let index = 0; index < args.length; index++) {
  if (args[index] === "--repo" || args[index] === "--locales") {
    const option = args[index];
    if (!args[++index] || args[index].startsWith("--"))
      throw new Error(`${option} requires a value`);
  } else if (
    !["--remote", "--local", "--full", "--regenerate"].includes(args[index])
  )
    throw new Error(`Unknown option: ${args[index]}`);
}
const remote = args.includes("--remote");
const localesIndex = args.indexOf("--locales");
const selectedLocales =
  localesIndex >= 0 ? args[localesIndex + 1].split(",") : undefined;
if (
  selectedLocales &&
  (!args.includes("--regenerate") ||
    selectedLocales.some(
      (locale) => !["en", "zh", "zh-TW", "ru"].includes(locale),
    ))
)
  throw new Error(
    "--locales requires --regenerate and a comma-separated subset of en,zh,zh-TW,ru",
  );
const repoIndex = args.indexOf("--repo");
const repo = repoIndex >= 0 ? args[repoIndex + 1] : undefined;
const config = readFileSync("wrangler.toml", "utf8");
const databaseId =
  process.env.CLOUDFLARE_DATABASE_ID ??
  /database_id\s*=\s*"([^"]+)"/.exec(config)?.[1];
let token = process.env.CLOUDFLARE_API_TOKEN;
let accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
if (!token || !accountId) {
  const status = JSON.parse(
    execFileSync("pnpm", ["exec", "wrangler", "whoami", "--json"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }),
  );
  accountId ??=
    status.accounts?.length === 1 ? status.accounts[0].id : undefined;
  if (!token) {
    const authFiles = [
      join(homedir(), ".wrangler/config/default.toml"),
      join(homedir(), "Library/Preferences/.wrangler/config/default.toml"),
      join(homedir(), ".config/.wrangler/config/default.toml"),
    ];
    for (const path of authFiles) {
      if (!existsSync(path)) continue;
      token = /^oauth_token\s*=\s*"([^"]+)"/m.exec(
        readFileSync(path, "utf8"),
      )?.[1];
      if (token) break;
    }
  }
}
if (!token || !accountId || !databaseId)
  throw new Error(
    "Cloudflare credentials/account/database missing; run wrangler login with AI and D1 permissions",
  );
const githubToken =
  process.env.GITHUB_TOKEN ??
  execFileSync("gh", ["auth", "token"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();

async function cloudflare(
  path,
  body,
  timeout = path.startsWith("d1/") ? 30_000 : 300_000,
  signal,
) {
  const attempts = path.startsWith("d1/") ? 4 : 1;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/${path}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: signal
            ? AbortSignal.any([signal, AbortSignal.timeout(timeout)])
            : AbortSignal.timeout(timeout),
        },
      );
      const data = await response.json();
      if (
        (response.status === 429 || response.status >= 500) &&
        attempt < attempts - 1
      )
        throw new Error(`Transient Cloudflare HTTP ${response.status}`);
      if (!response.ok || !data.success)
        throw new Error(
          `Cloudflare HTTP ${response.status}: ${JSON.stringify(data.errors ?? [])}`,
        );
      return data.result;
    } catch (error) {
      if (
        attempt === attempts - 1 ||
        (error instanceof Error && /^Cloudflare HTTP/.test(error.message))
      )
        throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** attempt));
    }
  }
}

let sqlite;
if (!remote) {
  const { createClient } = await import("@libsql/client");
  const directory = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject";
  const files = existsSync(directory)
    ? readdirSync(directory).filter((file) => /^[a-f0-9]+\.sqlite$/.test(file))
    : [];
  const path =
    process.env.LOCAL_DB_PATH ??
    (files.length === 1 ? join(directory, files[0]) : undefined);
  if (!path)
    throw new Error("Run pnpm db:migrate:dev first, or set LOCAL_DB_PATH");
  sqlite = createClient({ url: pathToFileURL(resolve(path)).href });
}

async function query(sql, params) {
  if (sqlite) {
    const result = await sqlite.execute({ sql, args: params });
    return {
      columns: result.columns,
      rows: result.rows.map((row) =>
        result.columns.map((column) => row[column]),
      ),
      meta: { changes: result.rowsAffected },
    };
  }
  const result = await cloudflare(`d1/database/${databaseId}/raw`, {
    sql,
    params,
  });
  if (!result[0]?.success) throw new Error("D1 query failed");
  return { ...result[0].results, meta: result[0].meta };
}
const database = {
  prepare(sql) {
    const statement = (params) => ({
      bind: (...values) => statement(values),
      async raw(options) {
        const result = await query(sql, params);
        return options?.columnNames
          ? [result.columns, ...result.rows]
          : result.rows;
      },
      async all() {
        const result = await query(sql, params);
        return {
          success: true,
          meta: result.meta,
          results: result.rows.map((row) =>
            Object.fromEntries(
              result.columns.map((column, index) => [column, row[index]]),
            ),
          ),
        };
      },
      async run() {
        return this.all();
      },
      async first(column) {
        const row = (await this.all()).results[0];
        return column ? (row?.[column] ?? null) : (row ?? null);
      },
    });
    return statement([]);
  },
};
const outputDir = resolve(".wrangler/extension-content");
await mkdir(outputDir, { recursive: true });
const bundle = join(outputDir, `pipeline-${process.pid}.mjs`);
await build({
  stdin: {
    contents:
      'export { getDb } from "./db/client"; export { syncAllExtensions } from "./lib/store/fetcher";',
    resolveDir: root,
    sourcefile: "local-sync.ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: bundle,
  logLevel: "silent",
});
const { getDb, syncAllExtensions } = await import(pathToFileURL(bundle).href);
console.log(
  `[extension-content] target=${remote ? "remote" : "local"} full=${args.includes("--full")} regenerate=${args.includes("--regenerate")} repo=${repo ?? "all"}`,
);
const startedAt = new Date().toISOString();
let requestNumber = 0;
try {
  const stats = await syncAllExtensions(getDb(database), githubToken, {
    refreshContent: args.includes("--full"),
    regenerateContent: args.includes("--regenerate")
      ? (selectedLocales ?? true)
      : false,
    repo,
    ai: {
      async run(model, inputs, options) {
        const number = ++requestNumber;
        const result = await cloudflare(
          `ai/run/${model}`,
          inputs,
          undefined,
          options?.signal,
        );
        await writeFile(
          join(
            outputDir,
            `${startedAt.replace(/[:.]/g, "-")}-request-${number}.json`,
          ),
          JSON.stringify({ model, result }),
        );
        return result;
      },
    },
  });
  const report = {
    startedAt,
    finishedAt: new Date().toISOString(),
    target: remote ? "remote" : "local",
    stats,
  };
  const path = join(outputDir, `${startedAt.replace(/[:.]/g, "-")}.json`);
  await writeFile(path, `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    `[extension-content] complete ${JSON.stringify(stats)}\nReport: ${path}`,
  );
  if (stats.errors || stats.failedLocales) process.exitCode = 1;
} finally {
  sqlite?.close();
}
