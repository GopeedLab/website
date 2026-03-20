import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { getAppData } from "@/lib/data";
import { i18n, type Locale, locales } from "@/lib/i18n";
import { breadcrumbJsonLd, jsonLdScriptContent } from "@/lib/jsonld";
import {
  getKeywordPage,
  type KeywordPageSlug,
  keywordPageSlugs,
  localeHref,
} from "@/lib/keyword-pages";
import { pageAlternates } from "@/lib/seo";

export const dynamicParams = false;

function resolveLocale(lang: string): Locale {
  return (
    locales.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;
}

function resolveKeywordSlug(slug: string): KeywordPageSlug | null {
  return keywordPageSlugs.includes(slug as KeywordPageSlug)
    ? (slug as KeywordPageSlug)
    : null;
}

export async function generateStaticParams() {
  return keywordPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const keywordSlug = resolveKeywordSlug(slug);

  if (!keywordSlug) {
    notFound();
  }

  const page = getKeywordPage(locale, keywordSlug);

  return {
    title: {
      absolute: page.metaTitle,
    },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: pageAlternates(locale, `/${keywordSlug}`),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function KeywordLandingPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveLocale(lang);
  const keywordSlug = resolveKeywordSlug(slug);

  if (!keywordSlug) {
    notFound();
  }

  const page = getKeywordPage(locale, keywordSlug);
  const appData = await getAppData();
  const downloadsHref = localeHref(locale, "/#downloads");
  const docsHref = localeHref(locale, "/docs/install");
  const breadcrumbItems = [
    { name: "Gopeed", path: "/" },
    { name: page.title, path: `/${keywordSlug}` },
  ];

  return (
    <main className="min-h-screen stable-vh overflow-x-clip bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 relative">
      <script type="application/ld+json">
        {jsonLdScriptContent(breadcrumbJsonLd(locale, breadcrumbItems))}
      </script>
      <Navbar version={appData.version} stars={appData.stars} />

      <article className="relative pt-32 pb-24 lg:pt-40">
        <div className="absolute inset-0 bg-gradient-grid bg-[length:48px_48px] opacity-5 dark:opacity-10" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold tracking-[0.18em] uppercase text-primary-600 dark:text-primary-400 mb-4">
              {page.eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-950 dark:text-white mb-6">
              {page.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-8 mb-10">
              {page.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <a
                href={downloadsHref}
                className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
              >
                {page.primaryCtaLabel}
              </a>
              <Link
                href={docsHref}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium text-gray-900 dark:text-gray-100 transition-colors hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {page.secondaryCtaLabel}
              </Link>
            </div>

            <div className="space-y-6 mb-14">
              {page.intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <section className="mb-14">
              <h2 className="text-2xl font-semibold text-gray-950 dark:text-white mb-6">
                {page.benefitsTitle}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {page.benefits.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white/90 dark:bg-gray-900/80 p-5"
                  >
                    <p className="text-gray-700 dark:text-gray-300 leading-7">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl font-semibold text-gray-950 dark:text-white mb-6">
                {page.stepsTitle}
              </h2>
              <ol className="space-y-4">
                {page.steps.map((step, index) => (
                  <li
                    key={step}
                    className="rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white/90 dark:bg-gray-900/80 p-5"
                  >
                    <span className="block text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
                      Step {index + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-7">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-3xl border border-primary-500/20 bg-primary-50/80 dark:bg-primary-950/20 p-8">
              <h2 className="text-2xl font-semibold text-gray-950 dark:text-white mb-4">
                {page.ctaTitle}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-7 mb-6">
                {page.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={downloadsHref}
                  className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
                >
                  {page.primaryCtaLabel}
                </a>
                <Link
                  href={docsHref}
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 px-6 py-3 font-medium text-gray-900 dark:text-gray-100 transition-colors hover:border-primary-500/50 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {page.secondaryCtaLabel}
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
