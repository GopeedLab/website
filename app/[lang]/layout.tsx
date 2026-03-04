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
import {
  jsonLdScriptContent,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";
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
    keywords: t("seo.keywords.en"),
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
      images: [
        {
          url: `${BASE_URL}/images/screenshot.png`,
          width: 1200,
          height: 900,
          alt: "Gopeed Download Manager",
        },
      ],
      locale:
        locale === "zh" ? "zh_CN" : locale === "zh-TW" ? "zh_TW" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("site.title"),
      description: t("site.description"),
      images: [`${BASE_URL}/images/screenshot.png`],
    },
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
    other: {
      "google-site-verification": "",
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
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data is server-generated and safe */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScriptContent(
              organizationJsonLd(),
              webSiteJsonLd(locale),
            ),
          }}
        />
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
