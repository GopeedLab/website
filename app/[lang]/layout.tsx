import "@/app/global.css";
import { i18nProvider } from "fumadocs-ui/i18n";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { LocalePreferenceTracker } from "@/components/LocalePreferenceTracker";
import { NavigationProgress } from "@/components/NavigationProgress";
import { i18n, type Locale, locales } from "@/lib/i18n";
import { fumadocsTranslations } from "@/lib/i18n/fumadocs";
import { getTranslation } from "@/lib/i18n/translations";
import {
  jsonLdScriptContent,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";
import { LocaleProvider } from "@/lib/locale-context";
import { BASE_URL, pageAlternates, pageSocialMetadata } from "@/lib/seo";

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
    keywords: t("seo.keywords.en"),
    icons: {
      icon: "/images/logo.png",
    },
    alternates: pageAlternates(locale, "/"),
    ...pageSocialMetadata(locale, "/", t("site.title"), t("site.description")),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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
      <head>
        {/* JSON-LD Structured Data: Organization + WebSite */}
        <script type="application/ld+json">
          {jsonLdScriptContent(organizationJsonLd(), webSiteJsonLd(locale))}
        </script>
      </head>
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
          i18n={i18nProvider(fumadocsTranslations, locale)}
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
