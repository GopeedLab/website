import { defineI18n } from "fumadocs-core/i18n";
import { defaultLocale, locales } from "./i18n/config";

export type { Locale } from "./i18n/config";
export {
  defaultLocale,
  localeFlags,
  localeNames,
  locales,
} from "./i18n/config";

// Homepage, docs and extension generation share one language configuration.
export const i18n = defineI18n({
  defaultLanguage: defaultLocale,
  // Unprefixed entry URLs detect the user's preferred language.
  languages: [...locales],
  hideLocale: "default-locale",
  // Use directory-based i18n structure (content/docs/zh/...)
  parser: "dir",
});
