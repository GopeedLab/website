import { getCloudflareContext } from "@opennextjs/cloudflare";
import { desc } from "drizzle-orm";
import type { Metadata } from "next";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { StoreGrid } from "@/components/store/StoreGrid";
import { getDb } from "@/db/client";
import { type Extension, extensions } from "@/db/schema";
import { getAppData } from "@/lib/data";
import { i18n, type Locale, locales } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";
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
    title: t("store.title"),
    description: t("store.subtitle"),
    alternates: pageAlternates(locale, "/store"),
  };
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (
    locales.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;

  const appData = await getAppData();

  let extensionList: Extension[] = [];

  try {
    const ctx = await getCloudflareContext({ async: true });
    // @ts-expect-error - CF env type
    const d1 = ctx.env.DB as D1Database | undefined;

    if (d1) {
      const db = getDb(d1);
      extensionList = await db
        .select()
        .from(extensions)
        .orderBy(desc(extensions.installCount), desc(extensions.stars))
        .all();
    }
  } catch (err) {
    console.error("Failed to connect to D1:", err);
  }

  const t = (key: string) => getTranslation(locale, key);

  return (
    <main className="min-h-screen stable-vh overflow-x-clip bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 relative">
      <Navbar version={appData.version} stars={appData.stars} />

      {/* ── Minimalist Hero Header ── */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-950 dark:text-white mb-5">
              {t("store.title")}
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 font-medium tracking-wide">
              {t("store.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Extension grid ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pb-24 relative">
        <div className="max-w-6xl mx-auto">
          <StoreGrid extensions={extensionList} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
