import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export function baseOptions(_locale: Locale = "en"): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src="/images/logo.png"
            width={24}
            height={24}
            alt="Gopeed"
            className="rounded"
          />
          <span className="font-semibold">Gopeed</span>
        </>
      ),
      // Always link to root - middleware will redirect to user's preferred locale
      url: "/",
    },
  };
}
