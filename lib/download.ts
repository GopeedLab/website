/**
 * Download utilities for detecting platform and architecture
 */

export type PlatformId =
  | "windows"
  | "macos"
  | "linux"
  | "android"
  | "ios"
  | "docker"
  | "qnap"
  | "web";
export type ArchId =
  | "amd64"
  | "arm64"
  | "arm"
  | "386"
  | "universal"
  | "armeabi-v7a"
  | "arm64-v8a"
  | "x86_64";

export interface DetectedPlatform {
  platform: PlatformId;
  arch: ArchId;
  canDirectDownload: boolean;
}

/**
 * Detect user's platform and architecture from browser
 */
export function detectPlatform(): DetectedPlatform {
  if (typeof window === "undefined") {
    return { platform: "windows", arch: "amd64", canDirectDownload: true };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || "";

  // Detect platform
  let detectedPlatform: PlatformId = "windows";
  let detectedArch: ArchId = "amd64";
  const canDirectDownload = true;

  if (userAgent.includes("android")) {
    detectedPlatform = "android";
    detectedArch = "universal";
  } else if (
    userAgent.includes("iphone") ||
    userAgent.includes("ipad") ||
    userAgent.includes("ipod")
  ) {
    detectedPlatform = "ios";
    detectedArch = "universal";
  } else if (userAgent.includes("mac") || platform.includes("mac")) {
    detectedPlatform = "macos";
    // Check for Apple Silicon
    // @ts-expect-error - navigator.userAgentData is not in all browsers
    const uaData = navigator.userAgentData;
    if (uaData?.platform === "macOS") {
      // Modern approach using User-Agent Client Hints
      detectedArch = "universal"; // Default to universal for safety
    } else if (platform.includes("arm") || userAgent.includes("arm")) {
      detectedArch = "arm64";
    } else {
      detectedArch = "universal"; // macOS universal is safest default
    }
  } else if (userAgent.includes("linux")) {
    detectedPlatform = "linux";
    if (platform.includes("arm") || userAgent.includes("aarch64")) {
      detectedArch = "arm64";
    } else {
      detectedArch = "amd64";
    }
  } else if (userAgent.includes("win")) {
    detectedPlatform = "windows";
    // Check for ARM Windows
    if (userAgent.includes("arm") || platform.includes("arm")) {
      detectedArch = "arm64";
    } else {
      detectedArch = "amd64";
    }
  }

  return { platform: detectedPlatform, arch: detectedArch, canDirectDownload };
}

/**
 * Check if a platform supports direct download (vs command-only like Docker)
 */
export function canDirectDownload(platformId: PlatformId): boolean {
  return !["docker"].includes(platformId);
}

/**
 * Get download URL template for a platform/arch combination
 */
export function getDownloadTemplate(
  platform: PlatformId,
  arch: ArchId,
): string | null {
  const templates: Record<string, string> = {
    // Windows
    "windows-amd64": "Gopeed-$version-windows-amd64.zip",
    "windows-arm64": "Gopeed-$version-windows-arm64.zip",

    // macOS
    "macos-universal": "Gopeed-$version-macos.dmg",
    "macos-arm64": "Gopeed-$version-macos-arm64.dmg",
    "macos-amd64": "Gopeed-$version-macos-amd64.dmg",

    // Linux
    "linux-amd64": "Gopeed-$version-linux-amd64.AppImage",
    "linux-arm64": "Gopeed-$version-linux-arm64.AppImage",

    // Android
    "android-universal": "Gopeed-$version-android.apk",
    "android-arm64-v8a": "Gopeed-$version-android-arm64-v8a.apk",
    "android-armeabi-v7a": "Gopeed-$version-android-armeabi-v7a.apk",
    "android-x86_64": "Gopeed-$version-android-x86_64.apk",

    // iOS
    "ios-universal": "Gopeed-$version-ios.ipa",
  };

  return templates[`${platform}-${arch}`] || null;
}

/**
 * Get the actual download URL from API
 */
export function getDownloadUrl(template: string): string {
  return `/api/download?tpl=${encodeURIComponent(template)}`;
}

/**
 * Get display name for a platform
 */
export function getPlatformDisplayName(platform: PlatformId): string {
  const names: Record<PlatformId, string> = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux",
    android: "Android",
    ios: "iOS",
    docker: "Docker",
    qnap: "QNAP",
    web: "Web",
  };
  return names[platform] || platform;
}

/**
 * Get display name for an architecture
 */
export function getArchDisplayName(arch: ArchId, platform: PlatformId): string {
  if (platform === "macos") {
    const names: Record<string, string> = {
      universal: "Universal",
      arm64: "Apple Silicon",
      amd64: "Intel",
    };
    return names[arch] || arch;
  }

  const names: Record<ArchId, string> = {
    amd64: "x64 (64-bit)",
    arm64: "ARM64",
    arm: "ARM",
    "386": "x86 (32-bit)",
    universal: "Universal",
    "armeabi-v7a": "ARMv7",
    "arm64-v8a": "ARM64",
    x86_64: "x86_64",
  };
  return names[arch] || arch;
}
