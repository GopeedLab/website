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
  const [copied, setCopied] = useState(false);
  const [installFailed, setInstallFailed] = useState(false);

  const installUrl = extension.directory
    ? `${extension.repoUrl}#${extension.directory}`
    : extension.repoUrl;

  const gopeedUrl = buildGopeedInstallUrl(
    extension.repoUrl,
    extension.directory,
  );

  const handleInstall = () => {
    if (installing) return;
    setInstalling(true);
    setInstallFailed(false);

    let appOpened = false;
    const onVisibilityChange = () => {
      if (document.hidden) appOpened = true;
    };
    const onBlur = () => {
      appOpened = true;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onBlur);
    window.location.href = gopeedUrl;

    setTimeout(() => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onBlur);
      setInstalling(false);
      if (!appOpened) {
        setInstallFailed(true);
      }
    }, 2000);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = installUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayTitle = extension.title || extension.name;
  const authorName = extension.author || extension.repoFullName.split("/")[0];
  const sourceUrl = extension.directory
    ? `${extension.repoUrl}/tree/HEAD/${extension.directory}`
    : extension.repoUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group relative h-full flex flex-col"
    >
      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-linear-to-br from-primary-500/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

      <div className="relative h-full flex flex-col bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-white/5 group-hover:border-primary-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-500 overflow-hidden p-6">
        {/* Top Highlight Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary-500/0 to-transparent group-hover:via-primary-500/50 transition-all duration-500 z-20" />

        {/* Inner Decorative Gradient */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors duration-500 z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="shrink-0 w-12 h-12 flex items-center justify-center">
              {extension.icon && !iconError ? (
                <Image
                  src={extension.icon}
                  alt={displayTitle}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  onError={() => setIconError(true)}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full rounded-[14px] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-gray-500"
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
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate text-[15px] leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {displayTitle}
              </h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 truncate font-medium">
                {authorName}
              </p>
            </div>

            <span className="shrink-0 self-start mt-1 px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-transparent group-hover:border-primary-500/20 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
              {extension.version}
            </span>
          </div>

          {/* Description */}
          <p className="text-[14px] text-gray-600 dark:text-gray-400 flex-1 line-clamp-2 mb-6 leading-relaxed">
            {extension.description || "—"}
          </p>

          {/* Footer: Stats & Actions */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5 group-hover:border-primary-500/20 transition-colors duration-300">
            {/* Stats */}
            <div className="flex items-center gap-4 text-[13px] font-medium text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5 group-hover:text-primary-600/70 dark:group-hover:text-primary-400/70 transition-colors duration-300">
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500/70 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {extension.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5 group-hover:text-primary-600/70 dark:group-hover:text-primary-400/70 transition-colors duration-300">
                <svg
                  className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-primary-500/70 transition-colors duration-300"
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
                {extension.installCount.toLocaleString()}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Install — Icon Only */}
              <motion.button
                type="button"
                onClick={handleInstall}
                disabled={installing}
                whileTap={{ scale: 0.98 }}
                title={t("store.install") || "Install"}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-950 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white dark:text-gray-950 transition-colors duration-200"
              >
                {installing ? (
                  <svg
                    className="w-4 h-4 animate-spin"
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
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                )}
              </motion.button>

              {/* Copy URL — Icon Only */}
              <motion.button
                type="button"
                onClick={handleCopy}
                whileTap={{ scale: 0.98 }}
                title={copied ? t("store.copied") : t("store.copyUrl")}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 dark:text-gray-400 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors duration-200"
              >
                {copied ? (
                  <svg
                    className="w-4 h-4 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </motion.button>

              {/* GitHub — Icon Only */}
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={t("store.viewSource")}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 dark:text-gray-400 bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 transition-colors duration-200"
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

          {/* Install failed notice */}
          {installFailed && (
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-3 py-2.5">
              <svg
                className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
              <p className="text-[12px] text-amber-700 dark:text-amber-400 leading-relaxed">
                {t("store.installFailed")}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
