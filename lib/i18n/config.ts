export const locales = [
  "en",
  "zh",
  "zh-TW",
  "ru",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  "zh-TW": "繁體中文",
  ru: "Русский",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  zh: "🇨🇳",
  "zh-TW": "🇹🇼",
  ru: "🇷🇺",
};
