"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { type Locale, locales } from "@/lib/i18n/config";
import {
  getLocalePreference,
  setLocalePreference,
} from "@/lib/locale-preference";

/**
 * Tracks when users manually switch languages and sets a cookie to remember their preference.
 * This prevents automatic language detection from overriding user choice.
 */
export function LocalePreferenceTracker() {
  const pathname = usePathname();
  const previousLocaleRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);

  // Extract current locale from pathname
  const getCurrentLocale = useCallback((path: string): Locale => {
    const firstSegment = path.split("/")[1];
    return (
      firstSegment && locales.find((locale) => locale === firstSegment)
        ? firstSegment
        : "en"
    ) as Locale;
  }, []);

  useEffect(() => {
    const currentLocale = getCurrentLocale(pathname);

    // On first render, initialize with current locale
    if (!isInitializedRef.current) {
      previousLocaleRef.current = currentLocale;
      isInitializedRef.current = true;

      // Check if there's a saved locale preference
      const savedLocale = getLocalePreference();
      const referrer = document.referrer;
      const isSameOriginReferrer = (() => {
        if (!referrer) return false;
        try {
          return new URL(referrer).origin === window.location.origin;
        } catch {
          return false;
        }
      })();

      // Sync cookie on same-origin navigations (e.g., language switch in docs)
      if (!savedLocale || savedLocale === currentLocale || isSameOriginReferrer) {
        setLocalePreference(currentLocale);
      }
      return;
    }

    // If locale has changed from previous pathname, user has switched language manually
    if (previousLocaleRef.current !== currentLocale) {
      setLocalePreference(currentLocale);
      previousLocaleRef.current = currentLocale;
    }
  }, [pathname, getCurrentLocale]);

  return null;
}
