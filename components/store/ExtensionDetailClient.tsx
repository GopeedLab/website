"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import type { Extension } from "@/db/schema";

export interface ExtensionDetailTranslations {
  back: string;
  readme: string;
  noReadme: string;
  installs: string;
  stars: string;
  author: string;
  updated: string;
  install: string;
  copied: string;
  copyUrl: string;
  viewSource: string;
  installFailed: string;
}

interface ExtensionDetailClientProps {
  extension: Extension;
  storeHref: string;
  translations: ExtensionDetailTranslations;
  readmeNode: ReactNode;
}

function buildGopeedInstallUrl(
  repoUrl: string,
  directory?: string | null,
): string {
  const installUrl = directory ? `${repoUrl}#${directory}` : repoUrl;
  const params = btoa(JSON.stringify({ url: installUrl }));
  return `gopeed:///extension?params=${params}`;
}

export function ExtensionDetailClient({
  extension,
  storeHref,
  translations: t,
  readmeNode,
}: ExtensionDetailClientProps) {
  const [installing, setInstalling] = useState(false);
  const [iconError, setIconError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [installFailed, setInstallFailed] = useState(false);

  const displayTitle = extension.title || extension.name;
  const authorName = extension.author || extension.repoFullName.split("/")[0];
  const installUrl = extension.directory
    ? `${extension.repoUrl}#${extension.directory}`
    : extension.repoUrl;
  const sourceUrl = extension.directory
    ? `${extension.repoUrl}/tree/HEAD/${extension.directory}`
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

  const updatedAt = new Date(extension.updatedAt).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-24 lg:pt-36">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link
            href={storeHref}
            className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 group"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.back}
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-16 relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-20 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="shrink-0 relative z-10"
          >
            <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-[32px] bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 shadow-sm flex items-center justify-center p-4 relative overflow-hidden group">
              {extension.icon && !iconError ? (
                <Image
                  src={extension.icon}
                  alt={displayTitle}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={() => setIconError(true)}
                />
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 text-gray-300 dark:text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                  />
                </svg>
              )}
              <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-[32px] pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 min-w-0 pt-2 relative z-10"
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {displayTitle}
              </h1>
              <span className="px-3 py-1 rounded-full text-[13px] font-mono font-bold bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400 border border-primary-100 dark:border-primary-500/20">
                v{extension.version}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-medium mb-6">
              <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                <span className="text-gray-400 dark:text-gray-500">
                  {t.author}
                </span>
                {authorName}
              </div>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div
                className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"
                title={t.stars}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {extension.stars.toLocaleString()}
              </div>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div
                className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300"
                title={t.installs}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-primary-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {extension.installCount.toLocaleString()}
              </div>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                <span className="text-gray-400 dark:text-gray-500">
                  {t.updated}
                </span>
                {updatedAt}
              </div>
            </div>

            {extension.description && (
              <p className="text-[16px] sm:text-[17px] text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl">
                {extension.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                type="button"
                onClick={handleInstall}
                disabled={installing}
                whileTap={{ scale: 0.98 }}
                className="h-12 px-8 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-[15px] shadow-lg shadow-primary-500/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {installing ? (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
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
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                )}
                {t.install}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCopy}
                whileTap={{ scale: 0.98 }}
                className="h-12 px-6 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-medium text-[15px] border border-gray-200 dark:border-white/10 transition-all flex items-center gap-2"
              >
                {copied ? (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-primary-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {copied ? t.copied : t.copyUrl}
              </motion.button>

              <motion.a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.98 }}
                className="h-12 px-6 rounded-2xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-medium text-[15px] border border-gray-200 dark:border-white/10 transition-all flex items-center gap-2"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {t.viewSource}
              </motion.a>
            </div>

            {installFailed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-4 py-3 mt-4 max-w-fit"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  />
                </svg>
                <p className="text-[13px] text-amber-800 dark:text-amber-400 font-medium leading-relaxed">
                  {t.installFailed}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="h-px w-full bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent mb-12" />

          <div className="bg-white dark:bg-[#111111] rounded-[32px] border border-gray-100 dark:border-white/5 p-6 sm:p-10 lg:p-12 shadow-sm [&_pre]:px-4 [&_pre]:py-3">
            {readmeNode ? (
              readmeNode
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 mb-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-300 dark:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {t.readme}
                </h3>
                <p className="text-[15px] text-gray-500 dark:text-gray-400 max-w-sm">
                  {t.noReadme}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
