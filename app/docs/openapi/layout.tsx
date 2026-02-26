import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { SidebarFooter } from "@/components/docs/SidebarFooter";
import { i18n, type Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";
import { baseOptions } from "@/lib/layout.shared";
import { openapiPageSource } from "@/lib/source";

export default async function Layout({ children }: { children: ReactNode }) {
  // The OpenAPI route is locale-agnostic, but we read the user's saved locale
  // preference to render translated sidebar tab labels.
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("user-locale")?.value;
  const locale: Locale =
    savedLocale && i18n.languages.includes(savedLocale as Locale)
      ? (savedLocale as Locale)
      : (i18n.defaultLanguage as Locale);

  const t = (key: string) => getTranslation(locale, key);
  const docsUrl = locale === i18n.defaultLanguage ? "/docs" : `/${locale}/docs`;

  return (
    <DocsLayout
      tree={openapiPageSource.pageTree}
      {...baseOptions()}
      sidebar={{
        footer: <SidebarFooter />,
        tabs: [
          {
            title: t("docs.tab.documentation"),
            url: docsUrl,
          },
          {
            title: t("docs.tab.apiReference"),
            url: "/docs/openapi",
          },
        ],
      }}
    >
      {children}
    </DocsLayout>
  );
}
