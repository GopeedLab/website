"use client";

import type { Locale } from "@/lib/i18n";

/**
 * Sets a cookie to save the user's manually selected language preference.
 * This prevents automatic language detection from overriding user choice.
 */
export function setLocalePreference(locale: Locale) {
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API has limited browser support
  document.cookie = `user-locale=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

/**
 * Gets the user's saved locale preference from cookie
 */
export function getLocalePreference(): Locale | null {
  const match = document.cookie.match(/user-locale=([^;]+)/);
  return match ? (match[1] as Locale) : null;
}
