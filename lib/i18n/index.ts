// Re-export from the main i18n config

export type { Locale } from "../i18n";
export {
  defaultLocale,
  i18n,
  localeFlags,
  localeNames,
  locales,
} from "../i18n";
export { getTranslation, useTranslation } from "./translations";
