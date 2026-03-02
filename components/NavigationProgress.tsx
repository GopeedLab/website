"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export function NavigationProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathname = useRef(pathname);

  const startBar = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    bar.style.transition = "none";
    bar.style.width = "0%";
    bar.style.opacity = "1";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Slowly crawl to 85% - simulates waiting for the server
        bar.style.transition = "width 20s cubic-bezier(0.1, 0.05, 0, 1)";
        bar.style.width = "85%";
      });
    });
  }, []);

  const completeBar = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    // Snap to 100% then fade out
    bar.style.transition = "width 0.15s ease";
    bar.style.width = "100%";

    timerRef.current = setTimeout(() => {
      bar.style.transition = "opacity 0.3s ease";
      bar.style.opacity = "0";
      timerRef.current = setTimeout(() => {
        bar.style.width = "0%";
      }, 300);
    }, 150);
  }, []);

  // Start bar immediately when user clicks an internal link
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip: external links, new-tab links, hash-only, same pathname
      if (
        anchor.target === "_blank" ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#") ||
        href === window.location.pathname
      )
        return;

      startBar();
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [startBar]);

  // Complete bar once navigation is done (pathname committed)
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    completeBar();
  }, [pathname, completeBar]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          opacity: 0,
          background: "linear-gradient(90deg, #79c476, #a9d9a4)",
          boxShadow: "0 0 8px #79c47680",
        }}
      />
    </div>
  );
}
