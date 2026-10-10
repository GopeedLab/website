import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { ExtensionDetailClient } from "@/components/store/ExtensionDetailClient";
import { ReadmeRenderer } from "@/components/store/ReadmeRenderer";
import { toExtensionSummary } from "@/db/schema";
import { getAppData } from "@/lib/data";
import { i18n, type Locale, locales } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";
import { pageAlternates } from "@/lib/seo";
import { getStoreExtension } from "@/lib/store/data";

// Generate details on first request, then refresh in the background.
export const revalidate = 600;
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const locale = (
    locales.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;

  const extension = await getStoreExtension(id);

  if (!extension) {
    return { title: getTranslation(locale, "store.detail.notFound") };
  }

  const displayTitle = extension.title || extension.name;
  const authorName = extension.author || extension.repoFullName.split("/")[0];

  return {
    title: `${displayTitle} — ${getTranslation(locale, "store.title")}`,
    description:
      extension.description ||
      `${displayTitle} by ${authorName} — Gopeed Extension`,
    alternates: pageAlternates(locale, `/store/${encodeURIComponent(id)}`),
    openGraph: {
      title: `${displayTitle} — ${getTranslation(locale, "store.title")} | Gopeed`,
      description:
        extension.description ||
        `${displayTitle} by ${authorName} — Gopeed Extension`,
      ...(extension.icon ? { images: [{ url: extension.icon }] } : {}),
    },
  };
}

export default async function ExtensionDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const locale = (
    locales.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;

  const appData = await getAppData();

  const extension = await getStoreExtension(id);

  if (!extension) {
    notFound();
  }

  const tr = (key: string) => getTranslation(locale, key);
  const storeHref =
    locale === i18n.defaultLanguage ? "/store" : `/${locale}/store`;

  const translations = {
    back: tr("store.detail.back"),
    readme: tr("store.detail.readme"),
    noReadme: tr("store.detail.noReadme"),
    installs: tr("store.detail.installs"),
    stars: tr("store.detail.stars"),
    author: tr("store.detail.author"),
    updated: tr("store.detail.updated"),
    install: tr("store.detail.install"),
    copied: tr("store.detail.copied"),
    copyUrl: tr("store.detail.copyUrl"),
    viewSource: tr("store.detail.viewSource"),
    installFailed: tr("store.detail.installFailed"),
  };

  const readmeNode = extension.readme ? (
    <ReadmeRenderer content={extension.readme} />
  ) : null;

  return (
    <main className="min-h-screen stable-vh overflow-x-clip bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 relative">
      <Navbar version={appData.version} stars={appData.stars} />
      <ExtensionDetailClient
        extension={toExtensionSummary(extension)}
        storeHref={storeHref}
        translations={translations}
        readmeNode={readmeNode}
      />
      <Footer />
    </main>
  );
}
