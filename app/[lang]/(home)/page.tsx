import type { Metadata } from "next";
import {
  Downloads,
  Extensions,
  Features,
  Footer,
  Hero,
  Navbar,
} from "@/components/home";
import { getAppData } from "@/lib/data";
import { i18n, type Locale, locales } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";
import {
  faqJsonLd,
  jsonLdScriptContent,
  softwareApplicationJsonLd,
} from "@/lib/jsonld";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = (
    locales.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;
  const t = (key: string) => getTranslation(locale, key);

  return {
    title: {
      absolute: t("site.title"),
    },
    description: t("site.description"),
    keywords: t("seo.keywords.en"),
    alternates: pageAlternates(locale, "/"),
    openGraph: {
      title: t("site.title"),
      description: t("site.description"),
    },
  };
}

export default async function HomePage() {
  // Fetch data during SSR
  const appData = await getAppData();

  return (
    <main className="min-h-screen stable-vh overflow-x-clip bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 relative">
      {/* JSON-LD: SoftwareApplication + FAQ */}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is server-generated and safe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScriptContent(
            softwareApplicationJsonLd("en", appData.version),
            faqJsonLd("en"),
          ),
        }}
      />
      {/* Global background effects - only visible in dark mode */}
      <div className="fixed inset-0 -z-10 dark:block hidden">
        {/* Main background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />

        {/* Dynamic light effect */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-transparent to-transparent opacity-50" />

        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      <Navbar version={appData.version} stars={appData.stars} />
      <Hero version={appData.version} releaseAssets={appData.releaseAssets} />
      <Features />
      <Extensions />
      <Downloads
        version={appData.version}
        releaseAssets={appData.releaseAssets}
      />
      <Footer />
    </main>
  );
}
