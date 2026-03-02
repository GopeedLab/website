import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { SidebarFooter } from "@/components/docs/SidebarFooter";
import { i18n, type Locale } from "@/lib/i18n";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const locale = (
    i18n.languages.includes(lang as Locale) ? lang : i18n.defaultLanguage
  ) as Locale;

  return (
    <DocsLayout
      tree={source.getPageTree(locale)}
      {...baseOptions(locale)}
      i18n
      sidebar={{ footer: <SidebarFooter /> }}
    >
      {children}
    </DocsLayout>
  );
}
