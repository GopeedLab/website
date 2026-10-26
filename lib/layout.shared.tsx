import type { BaseLayoutProps, LayoutTab } from "fumadocs-ui/layouts/shared";
import { BookOpen, SquareTerminal } from "lucide-react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";
import { localePrefix } from "@/lib/seo";

export function baseOptions(
  locale: Locale = "en",
): BaseLayoutProps & { tabs: LayoutTab[]; tabMode: "auto" } {
  return {
    themeSwitch: { enabled: false },
    tabMode: "auto",
    tabs: [
      {
        title: getTranslation(locale, "docs.tab.documentation"),
        description: getTranslation(
          locale,
          "docs.tab.documentationDescription",
        ),
        icon: (
          <BookOpen
            aria-hidden="true"
            className="size-full text-primary-600 dark:text-primary-400"
          />
        ),
        url: `${localePrefix(locale)}/docs`,
      },
      {
        title: getTranslation(locale, "docs.tab.apiReference"),
        description: getTranslation(locale, "docs.tab.apiReferenceDescription"),
        icon: (
          <SquareTerminal
            aria-hidden="true"
            className="size-full text-blue-600 dark:text-blue-400"
          />
        ),
        url: `${localePrefix(locale)}/api-reference`,
      },
    ],
    nav: {
      title: (
        <>
          <Image
            unoptimized
            src="/images/logo.png"
            width={24}
            height={24}
            alt="Gopeed"
            className="rounded"
          />
          <span className="font-semibold">Gopeed</span>
        </>
      ),
      url: localePrefix(locale) || "/",
    },
  };
}
