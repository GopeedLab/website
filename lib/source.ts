import { apiReference, docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, llms, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { openapiPlugin } from "fumadocs-openapi/server";
import { i18n } from "@/lib/i18n";
import { getAPIMarkdown } from "@/lib/openapi";
import { canonicalUrl } from "@/lib/seo";

// i18n docs source
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  i18n,
});

export const apiReferenceSource = loader({
  baseUrl: "/api-reference",
  source: apiReference.toFumadocsSource(),
  plugins: [openapiPlugin()],
  i18n,
});

export type DocumentationPage = InferPageType<typeof source>;

export function getAllPages(locale?: string) {
  return [...source.getPages(locale), ...apiReferenceSource.getPages(locale)];
}

async function renderLLMPage(page: DocumentationPage, api = false) {
  const content =
    (api ? getAPIMarkdown(page.slugs) : undefined) ??
    (await page.data.getText("processed"));
  return `# ${page.data.title}\n\nSource: ${canonicalUrl(page.locale ?? "en", page.url)}\n\n${content}`;
}

export const docsLlms = llms(source, { renderPage: renderLLMPage });
export const apiReferenceLlms = llms(apiReferenceSource, {
  renderPage: (page) => renderLLMPage(page, true),
});

// Agents discover both independent sections from the existing site-wide endpoints.
export const siteLlms = {
  index: (locale: string) =>
    `${docsLlms.index(locale)}\n\n${apiReferenceLlms.index(locale)}`,
  full: async (locale: string) =>
    (
      await Promise.all([docsLlms.full(locale), apiReferenceLlms.full(locale)])
    ).join("\n\n"),
};
