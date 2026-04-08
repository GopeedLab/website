export const locales = [
  "en",
  "zh",
  "zh-TW",
  "ja",
  "ko",
  "es",
  "pt",
  "fr",
  "de",
  "ru",
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  pt: "Português",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  zh: "🇨🇳",
  "zh-TW": "🇹🇼",
  ja: "🇯🇵",
  ko: "🇰🇷",
  es: "🇪🇸",
  pt: "🇧🇷",
  fr: "🇫🇷",
  de: "🇩🇪",
  ru: "🇷🇺",
};
