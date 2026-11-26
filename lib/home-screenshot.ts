import type { Locale } from "@/lib/i18n";

export function homeScreenshotBase(locale: Locale) {
  const language = locale === "zh" || locale === "zh-TW" ? locale : "en";
  return `/images/gopeed-v2-${language}`;
}
