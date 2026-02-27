import { Markdown } from "fumadocs-core/content/md";
import { rehypeCode, remarkGfm } from "fumadocs-core/mdx-plugins";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { APIPage } from "@/components/api-page";
import { BASE_URL } from "@/lib/seo";
import { openapiPageSource } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Redirect root /docs/openapi to the Introduction page
  if (!slug || slug.length === 0) {
    const intro = openapiPageSource.getPage(["introduction"]);
    if (intro) redirect(intro.url);
    const pages = openapiPageSource.getPages();
    if (pages.length > 0) redirect(pages[0].url);
    notFound();
  }

  const page = openapiPageSource.getPage(slug);
  if (!page) notFound();

  // Introduction page: render raw markdown using fumadocs Markdown component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const introMarkdown = (page.data as any)._introductionMarkdown as
    | string
    | undefined;
  if (introMarkdown !== undefined) {
    return (
      <DocsPage toc={[]} full={false}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeCode]}
            components={getMDXComponents()}
          >
            {introMarkdown}
          </Markdown>
        </DocsBody>
      </DocsPage>
    );
  }

  return (
    <DocsPage toc={page.data.toc} full>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <APIPage {...page.data.getAPIPageProps()} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return openapiPageSource.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || slug.length === 0) return {};

  const page = openapiPageSource.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: `${BASE_URL}${page.url}`,
    },
  };
}
