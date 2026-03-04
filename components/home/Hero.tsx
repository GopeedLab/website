"use client";

import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDownload } from "@/hooks/useDownload";
import type { ReleaseAsset } from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import {
  detectPlatform,
  type PlatformInfo,
  platformNames,
} from "@/lib/platform-detector";
import { getPreferredDownloadUrl } from "@/lib/release-assets";

const browserExtensions = [
  {
    name: "Chrome",
    href: "https://chromewebstore.google.com/detail/gopeed/mijpgljlfcapndmchhjffkpckknofcnd",
    icon: "/images/chrome.svg",
  },
  {
    name: "Edge",
    href: "https://microsoftedge.microsoft.com/addons/detail/dkajnckekendchdleoaenoophcobooce",
    icon: "/images/edge.svg",
  },
  {
    name: "Firefox",
    href: "https://addons.mozilla.org/firefox/addon/gopeed-extension",
    icon: "/images/firefox.svg",
  },
];

interface HeroProps {
  version: string;
  releaseAssets: ReleaseAsset[];
}

export function Hero({ version, releaseAssets }: HeroProps) {
  const { t } = useLocale();
  const { isDownloading, triggerDownload } = useDownload();
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    platform: "unknown",
    arch: "unknown",
    canDirectDownload: false,
  });

  useEffect(() => {
    // Detect platform
    setPlatformInfo(detectPlatform());
  }, []);

  const scrollToDownload = () => {
    const downloadSection = document.getElementById("downloads");
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadClick = async () => {
    const { platform, arch, canDirectDownload } = platformInfo;

    if (!canDirectDownload || !version) {
      // Scroll to downloads section if can't auto-download
      scrollToDownload();
      return;
    }

    const downloadUrl = getPreferredDownloadUrl(releaseAssets, platform, arch);
    if (downloadUrl) {
      await triggerDownload(downloadUrl);
    } else {
      scrollToDownload();
    }
  };

  const getDownloadButtonText = () => {
    const { platform, canDirectDownload } = platformInfo;

    if (!canDirectDownload || platform === "unknown") {
      return t("hero.downloadNow");
    }

    return t("hero.downloadFor", { platform: platformNames[platform] });
  };

  return (
    <section className="relative pt-18" aria-label="Gopeed Download Manager">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-gradient-grid bg-[length:50px_50px] opacity-5 dark:opacity-10" />

      {/* Dynamic Gradient */}
      <div className="absolute inset-0 bg-gradient-x from-primary-500/5 via-primary-300/3 to-primary-500/5 dark:from-primary-500/10 dark:via-primary-300/5 dark:to-primary-500/10" />

      {/* Decorative Circles */}
      <div className="absolute top-0 -right-40 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute -bottom-20 -left-40 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-12 lg:py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-8 items-stretch">
            {/* Text Content - Order 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left space-y-4 lg:space-y-6 flex flex-col justify-center order-1"
            >
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl leading-tight section-heading">
                  {t("hero.title")}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  {t("hero.subtitle")}
                </p>
              </div>

              {/* Buttons - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:flex flex-col sm:flex-row lg:justify-start justify-center gap-4">
                <motion.button
                  whileHover={{ scale: isDownloading ? 1 : 1.05 }}
                  whileTap={{ scale: isDownloading ? 1 : 0.95 }}
                  className="bg-linear-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleDownloadClick}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Loading"
                    >
                      <title>Loading</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <ArrowDownTrayIcon className="h-5 w-5" />
                      <span>{getDownloadButtonText()}</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all border border-gray-200 dark:border-gray-700/50 cursor-pointer"
                  onClick={scrollToDownload}
                >
                  <span>{t("hero.moreVersions")}</span>
                  <ChevronDownIcon className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Browser Extensions - Hidden on mobile, shown on desktop */}
              <div className="hidden lg:flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                {browserExtensions.map((browser) => (
                  <motion.a
                    key={browser.name}
                    href={browser.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Image
                      src={browser.icon}
                      alt={browser.name}
                      width={20}
                      height={20}
                      className="opacity-75 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-sm">
                      {browser.name} {t("hero.extension")}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Preview Image - Order 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full lg:scale-[1.2] origin-center order-2"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full aspect-[4/3]"
              >
                {/* Combined Screenshot Preview */}
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/screenshot.png"
                    alt={t("hero.previewAlt")}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Buttons and Extensions - Order 3, shown only on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:hidden text-center space-y-4 order-3"
            >
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ scale: isDownloading ? 1 : 1.05 }}
                  whileTap={{ scale: isDownloading ? 1 : 0.95 }}
                  className="bg-linear-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleDownloadClick}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label="Loading"
                    >
                      <title>Loading</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <ArrowDownTrayIcon className="h-5 w-5" />
                      <span>{getDownloadButtonText()}</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all border border-gray-200 dark:border-gray-700/50 cursor-pointer"
                  onClick={scrollToDownload}
                >
                  <span>{t("hero.moreVersions")}</span>
                  <ChevronDownIcon className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Browser Extensions */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {browserExtensions.map((browser) => (
                  <motion.a
                    key={browser.name}
                    href={browser.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <Image
                      src={browser.icon}
                      alt={browser.name}
                      width={20}
                      height={20}
                      className="opacity-75 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="text-sm">
                      {browser.name} {t("hero.extension")}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
