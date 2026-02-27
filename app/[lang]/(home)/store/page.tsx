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
import { syncExtensions } from "@/lib/store/fetcher";

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

  // Fetch app data for Navbar
  const appData = await getAppData();

  // Fetch extensions from DB
  let extensionList: Extension[] = [];

  try {
    const ctx = await getCloudflareContext({ async: true });
    // @ts-expect-error - CF env type
    const d1 = ctx.env.DB as D1Database | undefined;

    if (d1) {
      const db = getDb(d1);

      // Get current data from DB for SSR
      extensionList = await db
        .select()
        .from(extensions)
        .orderBy(desc(extensions.installCount), desc(extensions.stars))
        .all();

      // Background sync - fire and forget
      syncExtensions(db).catch((err) => {
        console.error("Background extension sync failed:", err);
      });
    }
  } catch (err) {
    console.error("Failed to connect to D1:", err);
  }

  return (
    <main className="min-h-screen stable-vh overflow-x-clip bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 relative">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10 dark:block hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
        <div className="absolute inset-0 bg-gradient-radial from-primary-900/20 via-transparent to-transparent opacity-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary-900/15 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-primary-900/15 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      </div>

      <Navbar version={appData.version} stars={appData.stars} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-primary-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-500 dark:text-primary-400">
              Gopeed
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            {getTranslation(locale, "store.title")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            {getTranslation(locale, "store.subtitle")}
          </p>
        </div>

        {/* Store grid with search/sort */}
        <StoreGrid extensions={extensionList} />
      </div>

      <Footer />
    </main>
  );
}
