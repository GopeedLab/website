"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { type ArchId, detectPlatform, type PlatformId } from "@/lib/download";

interface DownloadContextType {
  // Selected state
  selectedPlatform: PlatformId | null;
  selectedArch: ArchId | null;

  // Actions
  selectPlatform: (platform: PlatformId, arch?: ArchId) => void;
  scrollToDownloads: () => void;

  // Detected platform
  detectedPlatform: PlatformId;
  detectedArch: ArchId;
}

const DownloadContext = createContext<DownloadContextType | null>(null);

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId | null>(
    null,
  );
  const [selectedArch, setSelectedArch] = useState<ArchId | null>(null);

  // Get detected platform on mount
  const detected =
    typeof window !== "undefined"
      ? detectPlatform()
      : { platform: "windows" as PlatformId, arch: "amd64" as ArchId };

  const selectPlatform = useCallback((platform: PlatformId, arch?: ArchId) => {
    setSelectedPlatform(platform);
    if (arch) {
      setSelectedArch(arch);
    }
  }, []);

  const scrollToDownloads = useCallback(() => {
    const downloadSection = document.getElementById("downloads");
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <DownloadContext.Provider
      value={{
        selectedPlatform,
        selectedArch,
        selectPlatform,
        scrollToDownloads,
        detectedPlatform: detected.platform,
        detectedArch: detected.arch,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownload() {
  const context = useContext(DownloadContext);
  if (!context) {
    throw new Error("useDownload must be used within a DownloadProvider");
  }
  return context;
}
