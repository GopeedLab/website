"use client";

import { useCallback, useRef, useState } from "react";
import { getOptimizedDownloadUrl } from "@/lib/release-assets";

/**
 * Hook for handling file downloads with optimized URLs
 * Uses anchor tag approach instead of window.open for better UX
 */
export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const triggerDownload = useCallback(
    async (url: string, filename?: string) => {
      setIsDownloading(true);
      try {
        const optimizedUrl = await getOptimizedDownloadUrl(url);

        // Create a temporary anchor element and trigger download
        const link = linkRef.current || document.createElement("a");
        link.href = optimizedUrl;
        if (filename) {
          link.download = filename;
        }

        // If it's a new link, append and remove it after click
        if (!linkRef.current) {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // If using the ref element, just trigger click
          link.click();
        }
      } catch (error) {
        console.error("Download failed:", error);
        // Fallback to direct URL
        const link = linkRef.current || document.createElement("a");
        link.href = url;
        if (filename) {
          link.download = filename;
        }

        if (!linkRef.current) {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          link.click();
        }
      } finally {
        setIsDownloading(false);
      }
    },
    [],
  );

  return {
    isDownloading,
    triggerDownload,
    linkRef,
  };
}
