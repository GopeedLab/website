"use client";

import { useEffect } from "react";
import { initializeWebsiteAnalytics, trackWebsiteEvent } from "@/lib/analytics";

export function FirebaseAnalytics() {
  useEffect(() => {
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(
          () => void initializeWebsiteAnalytics(),
          { timeout: 3000 },
        );
      } else {
        timer = setTimeout(() => void initializeWebsiteAnalytics(), 1000);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-analytics]");
      if (!target) return;
      const name = target.dataset.analytics;
      if (
        name === "extension_detail_click" ||
        name === "extension_install_click" ||
        name === "browser_extension_click"
      ) {
        trackWebsiteEvent(name, {
          source: target.dataset.source ?? "home",
          ...(target.dataset.extensionId
            ? { extension_id: target.dataset.extensionId }
            : {}),
          ...(target.dataset.browser
            ? { browser: target.dataset.browser }
            : {}),
        });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("load", start);
      document.removeEventListener("click", onClick);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  return null;
}
