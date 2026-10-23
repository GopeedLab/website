import { notFound } from "next/navigation";
import { ContentPage, contentMetadata } from "@/components/docs/ContentPage";
import { i18n, type Locale } from "@/lib/i18n";
import { apiReferenceSource } from "@/lib/source";

interface PageProps {
  params: Promise<{ lang: string; slug?: string[] }>;
}

async function loadPage(props: PageProps) {
  const { lang, slug } = await props.params;
  const locale = (
    i18n.languages.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;
  const page = apiReferenceSource.getPage(slug, locale);
  if (!page) notFound();
  return { page, locale };
}

export default async function Page(props: PageProps) {
  return <ContentPage {...(await loadPage(props))} api />;
}

export function generateStaticParams() {
  return apiReferenceSource.generateParams();
}

export async function generateMetadata(props: PageProps) {
  const { page, locale } = await loadPage(props);
  return contentMetadata(page, locale);
}
