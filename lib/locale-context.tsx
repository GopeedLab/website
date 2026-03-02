"use client";

import { createContext, type ReactNode, useContext } from "react";
import { defaultLocale, type Locale, localeNames, locales } from "@/lib/i18n";
import { getTranslation } from "@/lib/i18n/translations";

interface LocaleContextType {
  locale: Locale;
  t: (key: string, params?: Record<string, string | number>) => string;
  locales: readonly Locale[];
  localeNames: Record<Locale, string>;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
  locale?: Locale;
}

export function LocaleProvider({
  children,
  locale = defaultLocale,
}: LocaleProviderProps) {
  const t = (key: string, params?: Record<string, string | number>) => {
    return getTranslation(locale, key, params);
  };

  return (
    <LocaleContext.Provider value={{ locale, t, locales, localeNames }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    // Return default values if not in provider (for backward compatibility)
    return {
      locale: defaultLocale,
      t: (key: string, params?: Record<string, string | number>) =>
        getTranslation(defaultLocale, key, params),
      locales,
      localeNames,
    };
  }
  return context;
}
