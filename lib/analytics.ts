"use client";

import type { Analytics } from "firebase/analytics";

let analyticsPromise: Promise<Analytics | null> | undefined;

export function initializeWebsiteAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  analyticsPromise ??= Promise.all([
    import("firebase/app"),
    import("firebase/analytics"),
  ])
    .then(
      async ([
        { getApps, getApp, initializeApp },
        { isSupported, getAnalytics },
      ]) => {
        if (!(await isSupported())) return null;
        const app = getApps().length
          ? getApp()
          : initializeApp({
              apiKey: "AIzaSyBG1Jyk-3J5lgSXAmmjyQjCnxTLQS5e-VU",
              authDomain: "gopeed-4de76.firebaseapp.com",
              projectId: "gopeed-4de76",
              storageBucket: "gopeed-4de76.appspot.com",
              messagingSenderId: "742279468136",
              appId: "1:742279468136:web:ba58cebb34e2c9eec897dd",
              measurementId: "G-V552GWR1DN",
            });
        return getAnalytics(app);
      },
    )
    // Analytics restrictions or blockers must never break navigation/downloads.
    .catch(() => null);
  return analyticsPromise;
}

type WebsiteEvent =
  | "client_download_click"
  | "extension_detail_click"
  | "extension_install_click"
  | "browser_extension_click";

export function trackWebsiteEvent(
  name: WebsiteEvent,
  parameters: Record<string, string>,
): void {
  void initializeWebsiteAnalytics()
    .then(async (analytics) => {
      if (!analytics) return;
      const { logEvent } = await import("firebase/analytics");
      logEvent(analytics, name, {
        ...parameters,
        page_language: document.documentElement.lang,
        page_path: window.location.pathname,
      });
    })
    .catch(() => {});
}
