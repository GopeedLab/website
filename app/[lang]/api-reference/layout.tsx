import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { SidebarFooter } from "@/components/docs/SidebarFooter";
import { i18n, type Locale } from "@/lib/i18n";
import { baseOptions } from "@/lib/layout.shared";
import { apiReferenceSource } from "@/lib/source";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (
    i18n.languages.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;
  return (
    <DocsLayout
      tree={apiReferenceSource.getPageTree(locale)}
      {...baseOptions(locale)}
      sidebar={{ footer: <SidebarFooter /> }}
    >
      {children}
    </DocsLayout>
  );
}
