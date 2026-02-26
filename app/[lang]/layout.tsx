import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LocalePreferenceTracker } from "@/components/LocalePreferenceTracker";
import { i18n, type Locale, locales } from "@/lib/i18n";
import { localeNames } from "@/lib/i18n/config";
import { LocaleProvider } from "@/lib/locale-context";

export const metadata: Metadata = {
  title: {
    template: "%s | Gopeed",
    default: "Gopeed - A Modern Download Manager",
  },
  description:
    "A modern download manager that supports all platforms. Built with Golang and Flutter.",
  icons: {
    icon: "/images/logo.png",
  },
};

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
