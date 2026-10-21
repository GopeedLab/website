// Test-only Node preload: an isolated, in-memory D1 binding for next start.
// No production credentials or persisted development data are read or changed.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getPlatformProxy } from "wrangler";

const proxy = await getPlatformProxy({
  configPath: resolve("scripts/seo-test-wrangler.toml"),
  persist: false,
  remoteBindings: false,
  envFiles: [],
});

for (const file of ["0000_hot_psynapse.sql", "0001_add_readme.sql"]) {
  const sql = readFileSync(resolve("db/migrations", file), "utf8");
  for (const statement of sql.split(";").filter((value) => value.trim())) {
    await proxy.env.DB.prepare(statement).run();
  }
}
for (const [id, name] of [
  ["monkeyWie@youtube", "YouTube"],
  ["Locon213@gopeed-extension-mediafire", "MediaFire"],
]) {
  await proxy.env.DB.prepare(
    `INSERT INTO extensions
      (id, repo_full_name, repo_url, name, title, description, readme, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      `seo-test/${name}`,
      `https://github.com/seo-test/${name}`,
      name,
      `${name} fixture`,
      `Local SEO test fixture for ${name}.`,
      "# Test extension\n\nThis README is rendered on the server.",
      1790812800,
      1790812800,
    )
    .run();
}

globalThis[Symbol.for("__cloudflare-context__")] = proxy;
