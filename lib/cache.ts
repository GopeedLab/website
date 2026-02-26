/**
 * Cache utilities compatible with Cloudflare Workers
 * Uses fetch cache headers for edge caching
 */

const GITHUB_API = "https://api.github.com";
const CACHE_TTL = 1800; // 30 minutes in seconds

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
    download_count?: number;
  }>;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
}

/**
 * Fetch with Cloudflare-compatible caching
 * When deployed to CF Workers, this uses CF's edge cache
 * In development, uses Next.js revalidation
 */
async function cachedFetch<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "Gopeed-Website",
    },
    // Next.js cache config - works in dev and Vercel
    next: { revalidate: CACHE_TTL },
    // CF Workers cache config - used when deployed to CF
    // @ts-expect-error - CF-specific option
    cf: {
      cacheTtl: CACHE_TTL,
      cacheEverything: true,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Get latest release from GitHub
 */
export async function getLatestRelease(): Promise<GitHubRelease> {
  return cachedFetch<GitHubRelease>(
    `${GITHUB_API}/repos/GopeedLab/gopeed/releases/latest`,
  );
}

/**
 * Get repository info including star count
 */
export async function getRepoInfo(): Promise<GitHubRepo> {
  return cachedFetch<GitHubRepo>(`${GITHUB_API}/repos/GopeedLab/gopeed`);
}

/**
 * Get star count formatted for display
 */
export async function getStarCount(): Promise<string> {
  const repo = await getRepoInfo();
  const stars = repo.stargazers_count;

  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}k`;
  }
  return stars.toString();
}

/**
 * Get download URL for a specific asset template
 */
export async function getDownloadUrl(template: string): Promise<string | null> {
  const release = await getLatestRelease();
  const version = release.tag_name;

  // Replace version placeholder in template
  const assetName = template.replace("{version}", version);

  // Find matching asset
  const asset = release.assets.find((a) => a.name === assetName);

  return asset?.browser_download_url || null;
}
