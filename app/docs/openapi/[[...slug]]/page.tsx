import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { APIPage } from "@/components/api-page";
import { openapiPageSource } from "@/lib/source";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // Redirect root /docs/openapi to first available page
  if (!slug || slug.length === 0) {
    const pages = openapiPageSource.getPages();
    if (pages.length > 0) redirect(pages[0].url);
    notFound();
  }

  const page = openapiPageSource.getPage(slug);
  if (!page) notFound();

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
  };
}
