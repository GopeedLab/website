import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { i18n, type Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";
import { breadcrumbJsonLd, jsonLdScriptContent } from "@/lib/jsonld";
import { pageAlternates } from "@/lib/seo";
import { getPageImage, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

interface PageProps {
  params: Promise<{ lang: string; slug?: string[] }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = (
    i18n.languages.includes(params.lang as Locale)
      ? params.lang
      : i18n.defaultLanguage
  ) as Locale;
  const page = source.getPage(params.slug, locale);
  if (!page) notFound();

  const MDX = page.data.body;
  const docsLabel = getTranslation(locale, "nav.docs");
  const breadcrumbItems =
    page.url === "/docs"
      ? [
          { name: "Gopeed", path: "/" },
          { name: docsLabel, path: "/docs" },
        ]
      : [
          { name: "Gopeed", path: "/" },
          { name: docsLabel, path: "/docs" },
          { name: page.data.title, path: page.url },
        ];

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
    >
      <script type="application/ld+json">
        {jsonLdScriptContent(breadcrumbJsonLd(locale, breadcrumbItems))}
      </script>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const locale = (
    i18n.languages.includes(params.lang as Locale)
      ? params.lang
      : i18n.defaultLanguage
  ) as Locale;
  const page = source.getPage(params.slug, locale);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: pageAlternates(locale, page.url),
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
