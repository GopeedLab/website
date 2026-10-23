"use client";

import { useEffect } from "react";

/** Scalar fragments never reach the server. Resolve old bookmarks using the schema's operations. */
export function LegacyAPIAnchor({
  destinations,
}: {
  destinations: Record<string, string>;
}) {
  useEffect(() => {
    function resolve() {
      let hash: string;
      try {
        hash = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const destination = destinations[hash.toLowerCase()];
      if (destination) window.location.replace(destination);
    }
    resolve();
    window.addEventListener("hashchange", resolve);
    return () => window.removeEventListener("hashchange", resolve);
  }, [destinations]);
  return null;
}
