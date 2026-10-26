import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { generateFilesOnly } from "fumadocs-openapi";
import { createOpenAPI } from "fumadocs-openapi/server";
import { locales } from "../lib/i18n/config.ts";
import { docsCopy } from "../lib/i18n/docs.ts";
import { getOperations, slugify } from "../lib/openapi/operations.ts";

const document = JSON.parse(
  await readFile(
    new URL("../lib/openapi/swagger.json", import.meta.url),
    "utf8",
  ),
);
const openapi = createOpenAPI({ input: { gopeed: document } });
const operations = getOperations(document);
const tags = [
  ...new Set([
    ...(document.tags ?? []).map((tag) => slugify(tag.name)),
    ...operations.map((entry) => entry.slugs[0]),
  ]),
].filter((tag) => operations.some((entry) => entry.slugs[0] === tag));
const files = await generateFilesOnly({
  input: openapi,
  per: "operation",
  groupBy: "tag",
  slugify,
  name(entry) {
    const operation = this.document.paths[entry.item.path][entry.item.method];
    return slugify(
      operation.operationId ?? `${entry.item.method}-${entry.item.path}`,
    );
  },
  meta: true,
  includeDescription: true,
});

for (const locale of locales) {
  const copy = docsCopy[locale];
  const output = join("content/api-reference", locale === "en" ? "" : locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const baseUrl = `${prefix}/api-reference`;
  // This entire directory is generated and git-ignored; hand-written docs live outside it.
  await rm(output, { recursive: true, force: true });
  for (const file of files) {
    const path = join(output, file.path);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, file.content);
  }
  const sections = [];
  for (const tag of tags) {
    const title =
      copy.groups[tag] ??
      document.tags?.find((entry) => slugify(entry.name) === tag)?.name ??
      tag;
    await writeFile(
      join(output, tag, "meta.json"),
      JSON.stringify({ title, defaultOpen: false }, null, 2),
    );
    const entries = operations.filter((entry) => entry.slugs[0] === tag);
    sections.push(
      `## ${title}\n\n${entries.map((entry) => `- [\`${entry.method.toUpperCase()}\` ${entry.operation.summary ?? entry.operation.operationId}](${baseUrl}/${entry.slugs.join("/")})`).join("\n")}`,
    );
  }
  const overview = `---\ntitle: ${JSON.stringify(copy.title)}\ndescription: ${JSON.stringify(copy.description)}\n---\n\n${copy.intro}\n\n[${copy.integration}](${prefix}/docs/dev-api) · [${copy.spec}](/openapi.json)\n\n<Callout type="info">${copy.playground}</Callout>\n\n${sections.join("\n\n")}\n`;
  await writeFile(join(output, "index.mdx"), overview);
  await writeFile(
    join(output, "meta.json"),
    JSON.stringify(
      {
        title: copy.title,
        root: true,
        defaultOpen: false,
        pages: ["index", ...tags],
      },
      null,
      2,
    ),
  );
}
console.log(
  `[openapi] Generated ${operations.length} operations for ${locales.length} locales`,
);
