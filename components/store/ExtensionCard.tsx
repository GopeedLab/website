"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Extension } from "@/db/schema";
import { useLocale } from "@/lib/locale-context";

interface ExtensionCardProps {
  extension: Extension;
  index: number;
}

function buildGopeedInstallUrl(
  repoUrl: string,
  directory?: string | null,
): string {
  const installUrl = directory ? `${repoUrl}#${directory}` : repoUrl;
  const params = btoa(JSON.stringify({ url: installUrl }));
  return `gopeed:///extension?params=${params}`;
}

export function ExtensionCard({ extension, index }: ExtensionCardProps) {
  const { t } = useLocale();
  const [installing, setInstalling] = useState(false);
  const [iconError, setIconError] = useState(false);

  const gopeedUrl = buildGopeedInstallUrl(
    extension.repoUrl,
    extension.directory,
  );

  const handleInstall = async () => {
    if (installing) return;
    setInstalling(true);

    // Track install count
    try {
      await fetch("/api/extensions/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: extension.id }),
      });
    } catch {
      // Non-critical - still open Gopeed even if tracking fails
    }

    // Open Gopeed via custom scheme
    window.location.href = gopeedUrl;

    // Reset after a short delay
    setTimeout(() => setInstalling(false), 2000);
  };

  const displayTitle = extension.title || extension.name;
  const authorName = extension.author || extension.repoFullName.split("/")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group relative flex flex-col bg-white dark:bg-gray-900/60 border border-gray-200/80 dark:border-white/8 rounded-2xl overflow-hidden hover:border-primary-400/60 dark:hover:border-primary-500/40 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
    >
      {/* Card top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col h-full p-5">
        {/* Header: icon + title + version */}
        <div className="flex items-start gap-3 mb-3">
          {/* Icon */}
          <div className="shrink-0 w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-white/10 overflow-hidden flex items-center justify-center">
            {extension.icon && !iconError ? (
              <Image
                src={extension.icon}
                alt={displayTitle}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={() => setIconError(true)}
                unoptimized
              />
            ) : (
              <svg
                className="w-7 h-7 text-primary-400 dark:text-primary-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>

          {/* Title + author + version */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm leading-tight">
              {displayTitle}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {authorName}
            </p>
            <span className="inline-flex items-center mt-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border border-primary-200/60 dark:border-primary-700/40">
              {t("store.version", { version: extension.version })}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 line-clamp-2 mb-4 leading-relaxed">
          {extension.description || t("store.noResults")}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-4 text-xs text-gray-500 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {extension.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {t("store.installs", {
              count: extension.installCount.toLocaleString(),
            })}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Install button */}
          <button
            type="button"
            onClick={handleInstall}
            disabled={installing}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium bg-primary-500 hover:bg-primary-400 disabled:opacity-60 disabled:cursor-not-allowed text-white transition-all duration-200 active:scale-95"
          >
            {installing ? (
              <>
                <svg
                  className="w-3.5 h-3.5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {t("store.installing")}
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t("store.install")}
              </>
            )}
          </button>

          {/* Source link */}
          <a
            href={
              extension.directory
                ? `${extension.repoUrl}/tree/HEAD/${extension.directory}`
                : extension.repoUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            title={t("store.viewSource")}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">{t("store.viewSource")}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
