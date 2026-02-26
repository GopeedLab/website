"use client";

import {
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  CubeIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ServerIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ReleaseAsset } from "@/lib/data";
import { useLocale } from "@/lib/locale-context";
import { detectPlatform } from "@/lib/platform-detector";
import {
  type Architecture,
  buildPlatformsFromAssets,
  type DownloadFile,
  getOptimizedDownloadUrl,
  normalizeArchForAsset,
  type OperatingSystem,
  type PackageType,
  type PlatformDef,
} from "@/lib/release-assets";

// icon 标识符 → React 组件映射
const PLATFORM_ICONS: Record<
  string,
  React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
> = {
  windows: WindowIcon,
  macos: ComputerDesktopIcon,
  linux: CommandLineIcon,
  mobile: DevicePhoneMobileIcon,
  docker: CubeIcon,
  server: ServerIcon,
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
  const [isDownloading, setIsDownloading] = useState(false);

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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mt-10"
        >
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              <CommandLineIcon className="h-5 w-5 mr-2 text-primary-500" />
              {t("downloads.installVia")}
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-xl p-5 shadow-2xl border border-gray-700/50 dark:border-gray-800">
                <div className="flex items-center group">
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
                    className="ml-4 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 flex-shrink-0 border border-white/10 hover:border-white/20"
                    title="Copy command"
                  >
                    {copiedIndex === commandId ? (
                      <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-400" />
                    ) : (
                      <ClipboardIcon className="w-5 h-5 text-gray-400 group-hover:text-gray-200 transition-colors" />
                    )}
                  </motion.button>
                </div>
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl opacity-20 blur-sm -z-10" />
            </div>
          </div>
        </motion.div>
      );
    }

    const handleDownload = async () => {
      setIsDownloading(true);
      try {
        const optimizedUrl = await getOptimizedDownloadUrl(downloadUrl);
        window.open(optimizedUrl, "_blank");
      } catch (error) {
        console.error("Download failed:", error);
        window.open(downloadUrl, "_blank");
      } finally {
        setIsDownloading(false);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mt-10"
      >
        <motion.button
          onClick={handleDownload}
          disabled={isDownloading}
          whileHover={{ scale: isDownloading ? 1 : 1.05 }}
          whileTap={{ scale: isDownloading ? 1 : 0.95 }}
          className="bg-linear-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary-500/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300 mr-1.5">
              {t("downloads.version")}:
            </span>
            {version}
          </span>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
            |
          </span>
          <span className="flex items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300 mr-1.5">
              {t("downloads.file")}:
            </span>
            {selectedFile.name}
          </span>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
            |
          </span>
          <span className="flex items-center">
            <span className="font-medium text-gray-700 dark:text-gray-300 mr-1.5">
              {t("downloads.size")}:
            </span>
            {sizeInMB} MB
          </span>
        </div>
      </motion.div>
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
        <div className="max-w-6xl mx-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-xl shadow-primary-500/5">
          {/* Row 1: Platform Selection */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
              {t("downloads.platform")}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              {platforms.map((platform, index) => (
                <motion.button
                  key={platform.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => handlePlatformSelect(platform)}
                  className={`flex flex-col items-center justify-center w-full h-20 sm:w-24 sm:h-24 rounded-xl transition-all duration-200 border-2 ${
                    selectedPlatform?.id === platform.id
                      ? "bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-400 shadow-lg shadow-primary-500/10 scale-105"
                      : "bg-white dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750 hover:-translate-y-1"
                  }`}
                >
                  <platform.resolvedIcon
                    className={`h-6 w-6 mb-1 ${
                      selectedPlatform?.id === platform.id
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                  <span className="text-xs font-medium text-center">
                    {platform.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {selectedPlatform && (
              <>
                {/* Row 2: OS Selection - Only show for Web or multi-OS platforms */}
                {selectedPlatform.operatingSystems.length > 1 && (
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                      {t("downloads.os")}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {selectedPlatform.operatingSystems.map((os, index) => (
                        <motion.button
                          key={os.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          onClick={() => handleOSSelect(os)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                            selectedOS?.id === os.id
                              ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20"
                              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
                          }`}
                        >
                          {os.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedOS && (
                  <>
                    {/* Row 3: Architecture Selection */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                        {t("downloads.arch")}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {selectedOS.architectures.map((arch, index) => (
                          <motion.button
                            key={arch.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            onClick={() => handleArchSelect(arch)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                              selectedArch?.id === arch.id
                                ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20"
                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
                            }`}
                          >
                            {arch.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Row 4: Package Type Selection - Only show when multiple types */}
                    {selectedArch && selectedArch.packageTypes.length > 1 && (
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                          {t("downloads.type")}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {selectedArch.packageTypes.map((pkg, index) => (
                            <motion.button
                              key={pkg.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.05,
                              }}
                              onClick={() => handlePackageSelect(pkg)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                                selectedPackage?.id === pkg.id
                                  ? "bg-primary-600 text-white border-primary-600 shadow-md shadow-primary-500/20"
                                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700"
                              }`}
                            >
                              {pkg.name || getPackageTypeName(pkg.id)}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {/* 下载按钮可以放在容器内，也可以放在容器外，这里放里面稍微有点挤，放外面比较好 */}
        </div>

        {/* 下载按钮区域 */}
        {selectedFile && renderDownloadButton()}
      </div>
    </section>
  );
}
