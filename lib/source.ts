import { docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { openapiPlugin, openapiSource } from "fumadocs-openapi/server";
import { i18n } from "@/lib/i18n";
import { openapi } from "@/lib/openapi";

// i18n docs source
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  i18n,
});

// Standalone OpenAPI source — no i18n
export const openapiPageSource = loader({
  baseUrl: "/docs/openapi",
  source: await openapiSource(openapi, {
    groupBy: "tag",
  }),
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
