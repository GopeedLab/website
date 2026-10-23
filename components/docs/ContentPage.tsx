import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { LegacyAPIAnchor } from "@/components/docs/LegacyAPIAnchor";
import { OpenAPIPage } from "@/components/docs/OpenAPIPage";
import { getPageMarkdownUrl } from "@/lib/docs-urls";
import type { Locale } from "@/lib/i18n";
import { docsCopy } from "@/lib/i18n/docs";
import { getTranslation } from "@/lib/i18n/translations";
import { breadcrumbJsonLd, jsonLdScriptContent } from "@/lib/jsonld";
import { apiOperations, openapi } from "@/lib/openapi";
import {
  canonicalUrl,
  localePrefix,
  pageAlternates,
  pageSocialMetadata,
} from "@/lib/seo";
import {
  apiReferenceSource,
  type DocumentationPage,
  source,
} from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export function ContentPage({
  page,
  locale,
  api = false,
}: {
  page: DocumentationPage;
  locale: Locale;
  api?: boolean;
}) {
  const contentSource = api ? apiReferenceSource : source;
  const root = api ? "/api-reference" : "/docs";
  const sectionTitle = api
    ? docsCopy[locale].title
    : getTranslation(locale, "nav.docs");
  const markdownUrl = getPageMarkdownUrl(page);
  const githubUrl = api
    ? "https://github.com/GopeedLab/gopeed-js/blob/main/packages/gopeed-openapi/swagger.json"
    : `https://github.com/GopeedLab/website/blob/main/content/docs/${page.path}`;
  const breadcrumbs = [
    { name: "Gopeed", path: "/" },
    { name: sectionTitle, path: root },
  ];
  if (page.slugs.length)
    breadcrumbs.push({ name: page.data.title, path: page.url });
  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
    >
      <script type="application/ld+json">
        {jsonLdScriptContent(breadcrumbJsonLd(locale, breadcrumbs))}
      </script>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex flex-wrap items-center gap-2 border-b pb-6 not-prose">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={githubUrl}
          pageUrl={canonicalUrl(locale, markdownUrl)}
        />
      </div>
      {api && page.slugs.length === 0 && (
        <LegacyAPIAnchor
          destinations={Object.fromEntries(
            apiOperations.map((entry) => [
              `tag/${entry.operation.tags?.[0]}/${entry.method}${entry.path}`.toLowerCase(),
              `${localePrefix(locale)}/api-reference/${entry.slugs.join("/")}`,
            ]),
          )}
        />
      )}
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(contentSource, page),
            ...(api
              ? {
                  OpenAPIPage: async (props) => (
                    <OpenAPIPage
                      {...(await openapi.preloadOpenAPIPage(page))}
                      {...props}
                    />
                  ),
                }
              : {}),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function contentMetadata(
  page: DocumentationPage,
  locale: Locale,
): Metadata {
  const description =
    page.data.description || getTranslation(locale, "site.description");
  return {
    title: page.data.title,
    description,
    alternates: pageAlternates(locale, page.url),
    ...pageSocialMetadata(
      locale,
      page.url,
      `${page.data.title} | Gopeed`,
      description,
    ),
  };
}
