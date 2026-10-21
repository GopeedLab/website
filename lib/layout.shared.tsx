import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { localePrefix } from "@/lib/seo";

export function baseOptions(locale: Locale = "en"): BaseLayoutProps {
  return {
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
