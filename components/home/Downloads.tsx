"use client";

import {
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  CommandLineIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  FaAndroid,
  FaApple,
  FaDocker,
  FaLinux,
  FaWindows,
} from "react-icons/fa";
import { SiIos, SiQnap } from "react-icons/si";
import { useDownload } from "@/hooks/useDownload";
import type { ReleaseAsset } from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import { detectPlatform } from "@/lib/platform-detector";
import {
  type Architecture,
  buildPlatformsFromAssets,
  type DownloadFile,
  normalizeArchForAsset,
  type OperatingSystem,
  type PackageType,
  type PlatformDef,
} from "@/lib/release-assets";

// icon 标识符 → React 组件映射
const PLATFORM_ICONS: Record<
  string,
  React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>> | any
> = {
  windows: FaWindows,
  macos: FaApple,
  linux: FaLinux,
  android: FaAndroid,
  ios: SiIos,
  docker: FaDocker,
  qnap: SiQnap,
  web: GlobeAltIcon,
};

type Platform = PlatformDef & {
  resolvedIcon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
};

interface DownloadsProps {
  version: string;
  releaseAssets: ReleaseAsset[];
}

export function Downloads({ version, releaseAssets }: DownloadsProps) {
  const { t } = useLocale();
  const { isDownloading, triggerDownload } = useDownload();

  // 使用 useMemo 缓存平台数据，避免每次渲染都重新构建
  const platforms: Platform[] = useMemo(
    () =>
      buildPlatformsFromAssets(releaseAssets).map((p) => ({
        ...p,
        resolvedIcon: PLATFORM_ICONS[p.icon] ?? GlobeAltIcon,
      })),
    [releaseAssets],
  );

  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );
  const [selectedOS, setSelectedOS] = useState<OperatingSystem | null>(null);
  const [selectedArch, setSelectedArch] = useState<Architecture | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(
    null,
  );
  const [selectedFile, setSelectedFile] = useState<DownloadFile | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // 根据当前系统自动选择默认平台
  useEffect(() => {
    // 使用共享的平台检测逻辑
    const platformInfo = detectPlatform();
    const defaultPlatform =
      platforms.find((p) => p.id === platformInfo.platform) || platforms[0];

    if (defaultPlatform) {
      setSelectedPlatform(defaultPlatform);
      // 默认选择第一个操作系统
      const defaultOS = defaultPlatform.operatingSystems[0];
      setSelectedOS(defaultOS);
      // 将浏览器检测到的架构转换为 asset 中使用的架构标识，再匹配
      const assetArch = normalizeArchForAsset(
        platformInfo.platform,
        platformInfo.arch,
      );
      const defaultArch =
        defaultOS.architectures.find((a) => a.id === assetArch) ||
        defaultOS.architectures[0];
      setSelectedArch(defaultArch);
      // 默认选择第一个包类型
      const defaultPackage = defaultArch.packageTypes[0];
      setSelectedPackage(defaultPackage);
      // 默认选择第一个下载文件
      setSelectedFile(defaultPackage.files[0]);
    }
  }, [platforms]);

  // 处理平台选择
  const getPackageTypeName = (id: string) => {
    const translations: Record<string, string> = {
      installer: t("downloads.installer"),
      portable: t("downloads.portable"),
      package: t("downloads.package"),
      universal: t("downloads.universal"),
    };
    return translations[id] || id;
  };

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    // 重置并选择第一个操作系统
    const defaultOS = platform.operatingSystems[0];
    setSelectedOS(defaultOS);
    // 重置并选择第一个架构
    const defaultArch = defaultOS.architectures[0];
    setSelectedArch(defaultArch);
    // 重置并选择第一个包类型
    const defaultPackage = defaultArch.packageTypes[0];
    setSelectedPackage(defaultPackage);
    // 重置并选择第一个下载文件
    setSelectedFile(defaultPackage.files[0]);
  };

  // 处理操作系统选择
  const handleOSSelect = (os: OperatingSystem) => {
    setSelectedOS(os);
    // 重置并选择第一个架构
    const defaultArch = os.architectures[0];
    setSelectedArch(defaultArch);
    // 重置并选择第一个包类型
    const defaultPackage = defaultArch.packageTypes[0];
    setSelectedPackage(defaultPackage);
    // 重置并选择第一个下载文件
    setSelectedFile(defaultPackage.files[0]);
  };

  // 处理架构选择
  const handleArchSelect = (arch: Architecture) => {
    setSelectedArch(arch);
    // 重置并选择第一个包类型
    const defaultPackage = arch.packageTypes[0];
    setSelectedPackage(defaultPackage);
    // 重置并选择第一个下载文件
    setSelectedFile(defaultPackage.files[0]);
  };

  // 处理包类型选择
  const handlePackageSelect = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    // 选择第一个下载文件
    setSelectedFile(pkg.files[0]);
  };

  // 渲染下载按钮
  const renderDownloadButton = () => {
    if (!selectedFile) return null;

    const isCommand = selectedFile.type === "command";

    // For URL type, resolve the asset info from release data
    let downloadUrl = selectedFile.content;
    let fileSize = selectedFile.size;

    if (!isCommand) {
      // 直接使用文件名在 release assets 中查找对应的下载链接
      const asset = releaseAssets.find((a) => a.name === selectedFile.content);
      if (asset) {
        downloadUrl = asset.browser_download_url;
        fileSize = asset.size;
      }
    }

    const commandId = `${selectedFile.content}-${selectedFile.name}`;
    const sizeInMB = fileSize ? (fileSize / 1024 / 1024).toFixed(1) : "0.0";

    if (isCommand) {
      return (
        <div className="flex flex-col items-center w-full">
          <div className="w-full">
            <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              <CommandLineIcon className="h-5 w-5 mr-2 text-primary-500" />
              {t("downloads.installVia")}
            </div>
            <div className="relative group/cmd">
              <div className="absolute -inset-0.5 bg-linear-to-br from-primary-500/30 to-transparent rounded-2xl opacity-0 group-hover/cmd:opacity-100 blur-sm transition-opacity duration-500" />
              <div className="relative bg-gray-900 dark:bg-gray-950 rounded-2xl p-5 shadow-2xl border border-gray-800 group-hover/cmd:border-primary-500/30 transition-colors duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-grid bg-[length:20px_20px] opacity-5 pointer-events-none" />
                <div className="flex items-center relative z-10">
                  <div className="text-primary-400 font-mono text-base mr-3 select-none">
                    $
                  </div>
                  <code className="text-gray-100 font-mono text-base flex-1 break-all leading-relaxed">
                    {selectedFile.content}
                  </code>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(selectedFile.content);
                      setCopiedIndex(commandId);
                      setTimeout(() => setCopiedIndex(null), 2000);
                    }}
                    className="ml-4 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 flex-shrink-0 border border-white/10 hover:border-white/20"
                    title="Copy command"
                  >
                    {copiedIndex === commandId ? (
                      <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-400" />
                    ) : (
                      <ClipboardIcon className="w-5 h-5 text-gray-400 group-hover/cmd:text-gray-200 transition-colors" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const handleDownload = async () => {
      await triggerDownload(downloadUrl, selectedFile.name);
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-6">
        <div className="flex flex-wrap gap-3 text-sm order-2 sm:order-1">
          <div className="flex items-center px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 backdrop-blur-sm">
            <span className="font-medium text-gray-900 dark:text-gray-200 mr-1.5">
              {t("downloads.version")}:
            </span>
            {version}
          </div>
          <div className="flex items-center px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 backdrop-blur-sm">
            <span className="font-medium text-gray-900 dark:text-gray-200 mr-1.5">
              {t("downloads.file")}:
            </span>
            {selectedFile.name}
          </div>
          <div className="flex items-center px-3 py-1.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 backdrop-blur-sm">
            <span className="font-medium text-gray-900 dark:text-gray-200 mr-1.5">
              {t("downloads.size")}:
            </span>
            {sizeInMB} MB
          </div>
        </div>

        <motion.button
          onClick={handleDownload}
          disabled={isDownloading}
          whileHover={{ scale: isDownloading ? 1 : 1.05 }}
          whileTap={{ scale: isDownloading ? 1 : 0.95 }}
          className="bg-linear-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2 w-full sm:w-auto"
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
              <ArrowDownTrayIcon className="w-5 h-5" />
              <span>{t("downloads.download")}</span>
            </>
          )}
        </motion.button>
      </div>
    );
  };

  return (
    <section id="downloads" className="relative py-20 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-grid bg-[length:50px_50px] opacity-5 dark:opacity-10" />

      {/* 装饰性光效 */}
      <div className="absolute top-0 -right-40 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 -left-40 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-900/20 rounded-full blur-3xl opacity-20 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {t("downloads.title")}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("downloads.subtitle")}
          </p>
        </motion.div>

        {/* 选择器区域 */}
        <div className="relative max-w-5xl mx-auto group">
          {/* Hover Glow Effect */}
          <div className="absolute -inset-0.5 bg-linear-to-br from-primary-500/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl border border-gray-200/50 dark:border-gray-800/50 group-hover:border-primary-500/30 transition-colors duration-500 shadow-2xl shadow-primary-500/5 overflow-hidden flex flex-col md:flex-row">
            {/* Top Highlight Line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary-500/0 to-transparent group-hover:via-primary-500/50 transition-all duration-500 z-20" />

            {/* Inner Decorative Gradient */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors duration-500 z-10 pointer-events-none" />

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-gradient-grid bg-[length:20px_20px] opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none" />

            {/* Left Sidebar: Platform Selection */}
            <div className="relative z-20 w-full md:w-64 bg-gray-50/50 dark:bg-gray-950/50 border-b md:border-b-0 md:border-r border-gray-200/50 dark:border-gray-800/50 p-6 flex flex-col">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-widest">
                {t("downloads.platform")}
              </p>
              <div className="flex flex-row flex-wrap md:flex-col gap-2 pb-2 md:pb-0">
                {platforms.map((platform) => (
                  <motion.button
                    key={platform.id}
                    onClick={() => handlePlatformSelect(platform)}
                    className={`flex items-center justify-center md:justify-start w-[calc(50%-0.25rem)] sm:w-auto md:w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                      selectedPlatform?.id === platform.id
                        ? "bg-white dark:bg-gray-800 shadow-md shadow-primary-500/10 border border-primary-500/20 text-primary-600 dark:text-primary-400"
                        : "hover:bg-white/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 border border-transparent"
                    }`}
                  >
                    <platform.resolvedIcon
                      className={`h-5 w-5 mr-2 md:mr-3 transition-transform duration-300 ${
                        selectedPlatform?.id === platform.id ? "scale-110" : ""
                      }`}
                    />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {platform.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right Content: Options & Download */}
            <div className="relative z-20 flex-1 p-6 sm:p-8 flex flex-col min-h-[320px] md:min-h-[400px] overflow-hidden justify-center">
              <AnimatePresence mode="wait">
                {selectedPlatform && (
                  <motion.div
                    key={selectedPlatform.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex flex-col justify-center relative z-10"
                  >
                    {(() => {
                      const hasOptions =
                        selectedPlatform.operatingSystems.length > 1 ||
                        (selectedOS && selectedOS.architectures.length > 1) ||
                        (selectedArch && selectedArch.packageTypes.length > 1);

                      return (
                        <div className="flex flex-col w-full">
                          {hasOptions && (
                            <div className="space-y-6 mb-8 pb-8 border-b border-gray-200/50 dark:border-gray-800/50">
                              {/* Row 2: OS Selection */}
                              {selectedPlatform.operatingSystems.length > 1 && (
                                <div>
                                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">
                                    {t("downloads.os")}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedPlatform.operatingSystems.map(
                                      (os) => (
                                        <button
                                          type="button"
                                          key={os.id}
                                          onClick={() => handleOSSelect(os)}
                                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                                            selectedOS?.id === os.id
                                              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-md"
                                              : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
                                          }`}
                                        >
                                          {os.name}
                                        </button>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}

                              {selectedOS && (
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={selectedOS.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                  >
                                    {/* Row 3: Architecture Selection */}
                                    {selectedOS.architectures.length > 1 && (
                                      <div>
                                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">
                                          {t("downloads.arch")}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedOS.architectures.map(
                                            (arch) => (
                                              <button
                                                type="button"
                                                key={arch.id}
                                                onClick={() =>
                                                  handleArchSelect(arch)
                                                }
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                                                  selectedArch?.id === arch.id
                                                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-md"
                                                    : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
                                                }`}
                                              >
                                                {arch.name}
                                              </button>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* Row 4: Package Type Selection */}
                                    {selectedArch &&
                                      selectedArch.packageTypes.length > 1 && (
                                        <div>
                                          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-widest">
                                            {t("downloads.type")}
                                          </p>
                                          <div className="flex flex-wrap gap-2">
                                            {selectedArch.packageTypes.map(
                                              (pkg) => (
                                                <button
                                                  type="button"
                                                  key={pkg.id}
                                                  onClick={() =>
                                                    handlePackageSelect(pkg)
                                                  }
                                                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                                                    selectedPackage?.id ===
                                                    pkg.id
                                                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-transparent shadow-md"
                                                      : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
                                                  }`}
                                                >
                                                  {pkg.name ||
                                                    getPackageTypeName(pkg.id)}
                                                </button>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      )}
                                  </motion.div>
                                </AnimatePresence>
                              )}
                            </div>
                          )}

                          {/* Download Action Area */}
                          <div>
                            <AnimatePresence mode="wait">
                              {selectedFile && (
                                <motion.div
                                  key={selectedFile.name}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {renderDownloadButton()}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
