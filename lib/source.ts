import { docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { openapiPlugin, openapiSource } from "fumadocs-openapi/server";
import { i18n } from "@/lib/i18n";
import { openapi, SWAGGER_KEY } from "@/lib/openapi";

// i18n docs source
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  i18n,
});

function slugify(s: string) {
  return s.replace(/\s+/g, "-").toLowerCase();
}

const methodKeys = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
] as const;

/**
 * Build virtual files to inject into the OpenAPI source:
 *
 * 1. An `index.mdx` page that renders the swagger `info` block as an
 *    Introduction page (title + description only, no operations).
 * 2. Meta files that preserve the swagger.json ordering instead of the
 *    default alphabetical sort applied by fumadocs-core.
 *
 * We reuse the already-fetched & cached schema from fumadocs-openapi
 * to avoid a second network request.
 */
async function buildVirtualFiles() {
  const processed = await openapi.getSchema(SWAGGER_KEY);
  const swagger = processed.dereferenced as {
    info?: { title?: string; description?: string };
    tags?: { name: string }[];
    paths?: Record<
      string,
      Partial<
        Record<
          (typeof methodKeys)[number],
          { operationId?: string; tags?: string[] }
        >
      >
    >;
  };

  const tags: string[] = swagger.tags?.map((t) => t.name) ?? [];
  const tagToOperationIds: Record<string, string[]> = {};

  for (const [, methods] of Object.entries(swagger.paths ?? {})) {
    for (const methodKey of methodKeys) {
      const op = methods[methodKey];
      if (!op) continue;
      const opTags = op.tags && op.tags.length > 0 ? op.tags : ["unknown"];
      for (const tag of opTags) {
        if (!tagToOperationIds[tag]) tagToOperationIds[tag] = [];
        if (op.operationId) tagToOperationIds[tag].push(op.operationId);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files: { type: string; path: string; data: any }[] = [];

  // --- Introduction page ---
  // A virtual page that renders the swagger info.description as Markdown.
  // Named `introduction.mdx` (not `index.mdx`) to avoid becoming the folder
  // index whose URL would be `/docs/openapi` — which conflicts with the root
  // redirect handler in page.tsx. The root meta puts it first explicitly.
  const infoTitle = swagger.info?.title ?? "Introduction";
  const infoMarkdown = swagger.info?.description ?? "";

  files.push({
    type: "page",
    path: "introduction.mdx",
    data: {
      title: infoTitle,
      // Short plain-text excerpt for <meta description>
      description: infoMarkdown.split("\n")[0],
      toc: [],
      structuredData: { headings: [], contents: [] },
      _introductionMarkdown: infoMarkdown,
    },
  });

  // --- Root meta: Introduction first, then tags in swagger order ---
  files.push({
    type: "meta",
    path: "meta.json",
    data: { pages: ["introduction", ...tags.map((t) => slugify(t))] },
  });

  // --- Per-tag meta: preserve operation order within each tag folder ---
  for (const tag of tags) {
    const ops = tagToOperationIds[tag] ?? [];
    if (ops.length === 0) continue;
    files.push({
      type: "meta",
      path: `${slugify(tag)}/meta.json`,
      data: { pages: ops },
    });
  }

  return files;
}

// Standalone OpenAPI source — no i18n
const rawOpenapiSource = await openapiSource(openapi, {
  groupBy: "tag",
});

// Inject Introduction page + ordering meta files.
// We mutate `files` in-place so the Source<OpenAPIPageData> type is preserved
// for downstream type inference.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(rawOpenapiSource.files as any[]).push(...(await buildVirtualFiles()));

export const openapiPageSource = loader({
  baseUrl: "/docs/openapi",
  source: rawOpenapiSource,
  plugins: [openapiPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title}

${processed}`;
}
