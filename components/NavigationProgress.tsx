"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function NavigationProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;

    const bar = barRef.current;
    if (!bar) return;

    // Clear any existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Reset and start
    bar.style.transition = "none";
    bar.style.width = "0%";
    bar.style.opacity = "1";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = "width 0.3s ease";
        bar.style.width = "90%";
      });
    });

    // Complete after a short delay
    timerRef.current = setTimeout(() => {
      bar.style.transition = "width 0.2s ease, opacity 0.3s ease 0.2s";
      bar.style.width = "100%";
      bar.style.opacity = "0";
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pathname]);

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
