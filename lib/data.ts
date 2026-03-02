/**
 * Server-side data fetching functions for SSR
 * These functions are called during server-side rendering
 */

import { getLatestRelease, getRepoInfo } from "./cache";

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface AppData {
  version: string;
  stars: string;
  starsCount: number;
  releaseAssets: ReleaseAsset[];
}

/**
 * Fetch all app data for SSR
 * Called once during server-side rendering
 */
export async function getAppData(): Promise<AppData> {
  try {
    const [release, repo] = await Promise.all([
      getLatestRelease(),
      getRepoInfo(),
    ]);

    const starsCount = repo.stargazers_count;
    const stars =
      starsCount >= 1000
        ? `${(starsCount / 1000).toFixed(1)}k`
        : starsCount.toString();

    // Get release assets with download URLs and sizes
    const releaseAssets = release.assets.map((asset) => ({
      name: asset.name,
      browser_download_url: asset.browser_download_url,
      size: asset.size,
    }));

    return {
      version: release.tag_name,
      stars,
      starsCount,
      releaseAssets,
    };
  } catch (error) {
    console.error("Error fetching app data:", error);
    // Return fallback values
    return {
      version: "",
      stars: "",
      starsCount: 0,
      releaseAssets: [],
    };
  }
}
