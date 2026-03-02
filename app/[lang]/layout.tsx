import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { LocalePreferenceTracker } from "@/components/LocalePreferenceTracker";
import { NavigationProgress } from "@/components/NavigationProgress";
import { i18n, type Locale, locales } from "@/lib/i18n";
import { localeNames } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";
import { LocaleProvider } from "@/lib/locale-context";
import { BASE_URL, pageAlternates } from "@/lib/seo";

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
    metadataBase: new URL(BASE_URL),
    title: {
      template: `%s | ${t("site.name")}`,
      default: t("site.title"),
    },
    description: t("site.description"),
    icons: {
      icon: "/images/logo.png",
    },
    alternates: pageAlternates(locale, "/"),
    openGraph: {
      type: "website",
      siteName: t("site.name"),
      title: t("site.title"),
      description: t("site.description"),
      url: BASE_URL,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;
  const locale = (
    locales.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NavigationProgress />
        <FirebaseAnalytics />
        <RootProvider
          theme={{
            enabled: true,
            defaultTheme: "dark",
            attribute: "class",
            enableSystem: true,
            disableTransitionOnChange: true,
          }}
          i18n={{
            locale,
            locales: locales.map((l) => ({
              locale: l,
              name: localeNames[l],
            })),
          }}
        >
          <LocaleProvider locale={locale}>
            <LocalePreferenceTracker />
            {children}
          </LocaleProvider>
        </RootProvider>
      </body>
    </html>
  );
}
