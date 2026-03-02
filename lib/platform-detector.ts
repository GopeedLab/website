export type PlatformKey =
  | "windows"
  | "macos"
  | "linux"
  | "android"
  | "ios"
  | "docker"
  | "web"
  | "unknown";

export interface PlatformInfo {
  platform: PlatformKey;
  arch: string;
  canDirectDownload: boolean;
}

/**
 * Detect user's platform and architecture from browser user agent
 */
export function detectPlatform(): PlatformInfo {
  if (typeof window === "undefined") {
    return { platform: "unknown", arch: "unknown", canDirectDownload: false };
  }

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || "";

  // Detect platform
  let detectedPlatform: PlatformKey = "unknown";
  let arch = "unknown";
  let canDirectDownload = true;

  if (userAgent.includes("android")) {
    detectedPlatform = "android";
    arch = "arm64";
  } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
    detectedPlatform = "ios";
    arch = "arm64";
  } else if (userAgent.includes("win")) {
    detectedPlatform = "windows";
    // Check for ARM Windows
    if (userAgent.includes("arm") || platform.includes("arm")) {
      arch = "arm64";
    } else {
      // 桌面端只有 amd64 和 arm64，默认 x64
      arch = "x64";
    }
  } else if (userAgent.includes("mac")) {
    detectedPlatform = "macos";
    // Try to detect Apple Silicon
    // Check for ARM in platform or use navigator.userAgentData if available
    if (platform.includes("arm") || userAgent.includes("arm64")) {
      arch = "arm64";
    } else {
      // Try userAgentData API for more accurate detection
      const uaData = (navigator as { userAgentData?: { platform?: string } })
        ?.userAgentData;
      if (uaData?.platform === "macOS") {
        // If available, assume modern Macs are likely ARM
        arch = "arm64";
      } else {
        // Fall back to universal
        arch = "universal";
      }
    }
  } else if (userAgent.includes("linux")) {
    detectedPlatform = "linux";
    if (userAgent.includes("arm") || userAgent.includes("aarch64")) {
      arch = "arm64";
    } else {
      arch = "amd64";
    }
  }

  // Docker and Web can't be auto-detected, they need manual selection
  if (detectedPlatform === "unknown") {
    canDirectDownload = false;
  }

  return { platform: detectedPlatform, arch, canDirectDownload };
}

export const platformNames: Record<PlatformKey, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  android: "Android",
  ios: "iOS",
  docker: "Docker",
  web: "Web",
  unknown: "",
};
