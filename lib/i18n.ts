import { defineI18n } from "fumadocs-core/i18n";

// Unified i18n configuration for both homepage and docs
export const i18n = defineI18n({
  defaultLanguage: "en",
  // Auto detect user's language
  languages: ["en", "zh", "zh-TW"],
  hideLocale: "default-locale",
  // Use directory-based i18n structure (content/docs/zh/...)
  parser: "dir",
});

export const locales = i18n.languages;
export type Locale = (typeof locales)[number];
export const defaultLocale = i18n.defaultLanguage;

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  "zh-TW": "繁體中文",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  zh: "🇨🇳",
  "zh-TW": "🇹🇼",
};
