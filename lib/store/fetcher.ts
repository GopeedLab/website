/**
 * GitHub extension fetcher service
 * Searches GitHub for repos with the "gopeed-extension" topic,
 * fetches manifest.json from each repo (handling multi-extension repos via subdirectory),
 * and upserts data into the D1 database.
 */

import { eq } from "drizzle-orm";
import type { Db } from "@/db/client";
import type { NewExtension } from "@/db/schema";
import { extensions } from "@/db/schema";

const GITHUB_API = "https://api.github.com";
const RAW_GITHUB = "https://raw.githubusercontent.com";

interface GitHubRepo {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  topics: string[];
  default_branch: string;
}

interface GitHubSearchResult {
  total_count: number;
  items: GitHubRepo[];
}

interface GitHubCommit {
  sha: string;
}

interface ExtensionManifest {
  name: string;
  author?: string;
  title?: string;
  description?: string;
  icon?: string;
  version?: string;
  homepage?: string;
  repository?: {
    url?: string;
    directory?: string;
  };
}

function githubHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Gopeed-Website/1.0",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function fetchJSON<T>(url: string, token?: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: githubHeaders(token) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Fetch the latest commit SHA for a given repo path.
 */
async function getLatestCommitSha(
  repoFullName: string,
  branch: string,
  path: string,
  token?: string,
): Promise<string | null> {
  const url = `${GITHUB_API}/repos/${repoFullName}/commits?path=${encodeURIComponent(path)}&per_page=1&sha=${branch}`;
  const commits = await fetchJSON<GitHubCommit[]>(url, token);
  return commits?.[0]?.sha ?? null;
}

/**
 * Fetch manifest.json content from a specific path in a repo.
 */
async function fetchManifest(
  repoFullName: string,
  branch: string,
  directory: string | null,
  _token?: string,
): Promise<ExtensionManifest | null> {
  const filePath = directory ? `${directory}/manifest.json` : "manifest.json";
  const url = `${RAW_GITHUB}/${repoFullName}/${branch}/${filePath}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Gopeed-Website/1.0" },
    });
    if (!res.ok) return null;
    return (await res.json()) as ExtensionManifest;
  } catch {
    return null;
  }
}

/**
 * Resolve icon URL: if it's a relative path, turn it into a raw GitHub URL.
 */
function resolveIconUrl(
  icon: string | undefined,
  repoFullName: string,
  branch: string,
  directory: string | null,
): string | null {
  if (!icon) return null;
  if (icon.startsWith("http://") || icon.startsWith("https://")) {
    return icon;
  }
  // Relative path - resolve against the manifest's directory
  const base = directory ? `${directory}/` : "";
  return `${RAW_GITHUB}/${repoFullName}/${branch}/${base}${icon}`;
}

/**
 * Search GitHub for repos with gopeed-extension topic, paginated.
 */
async function searchGopeedExtensionRepos(
  token?: string,
): Promise<GitHubRepo[]> {
  const allRepos: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const url = `${GITHUB_API}/search/repositories?q=topic:gopeed-extension&sort=stars&order=desc&per_page=100&page=${page}`;
    const result = await fetchJSON<GitHubSearchResult>(url, token);
    if (!result || result.items.length === 0) break;
    allRepos.push(...result.items);
    if (allRepos.length >= result.total_count || result.items.length < 100)
      break;
    page++;
    // Rate limit safety
    if (page > 10) break;
  }

  return allRepos;
}

/**
 * Check via the GitHub Contents API whether a specific file exists in a directory.
 * Returns true if found, false otherwise. Much more reliable than fetching raw content.
 */
async function directoryHasManifest(
  repoFullName: string,
  branch: string,
  directory: string,
  token?: string,
): Promise<boolean> {
  const url = `${GITHUB_API}/repos/${repoFullName}/contents/${encodeURIComponent(directory)}?ref=${branch}`;
  const entries = await fetchJSON<Array<{ name: string; type: string }>>(
    url,
    token,
  );
  if (!Array.isArray(entries)) return false;
  return entries.some((e) => e.type === "file" && e.name === "manifest.json");
}

/**
 * Find all extension locations (root or subdirectories) in a repo.
 * Returns list of directories (null = root) that contain a manifest.json.
 *
 * Strategy:
 * 1. Check root for manifest.json via Contents API.
 * 2. If none at root, scan every top-level directory (type="dir" only, ignoring
 *    submodules which have type="file" with null download_url) for a manifest.json.
 */
async function findExtensionDirectories(
  repo: GitHubRepo,
  token?: string,
): Promise<Array<string | null>> {
  // Step 1: check root
  const url = `${GITHUB_API}/repos/${repo.full_name}/contents/?ref=${repo.default_branch}`;
  const rootEntries = await fetchJSON<
    Array<{ name: string; type: string; download_url: string | null }>
  >(url, token);
  if (!rootEntries) return [];

  // Root has manifest.json → single-extension repo
  const hasRootManifest = rootEntries.some(
    (e) => e.type === "file" && e.name === "manifest.json",
  );
  if (hasRootManifest) {
    return [null];
  }

  // Step 2: scan top-level directories only (exclude submodules: they appear as
  // type="file" with download_url=null in the GitHub Contents API response)
  const dirs = rootEntries.filter((e) => e.type === "dir");

  const results: Array<string | null> = [];
  await Promise.all(
    dirs.map(async (dir) => {
      const has = await directoryHasManifest(
        repo.full_name,
        repo.default_branch,
        dir.name,
        token,
      );
      if (has) results.push(dir.name);
    }),
  );

  return results;
}

/**
 * Sync a single extension (repo + optional directory) into the DB.
 * Uses commit SHA as cache key - skips if unchanged.
 */
async function syncExtension(
  db: Db,
  repo: GitHubRepo,
  directory: string | null,
  token?: string,
): Promise<void> {
  const id = directory ? `${repo.full_name}#${directory}` : repo.full_name;
  const _manifestPath = directory ? directory : ".";

  // Get latest commit SHA for the manifest path
  const commitSha = await getLatestCommitSha(
    repo.full_name,
    repo.default_branch,
    directory ? `${directory}/manifest.json` : "manifest.json",
    token,
  );

  if (commitSha) {
    // Check if we already have this commit cached
    const existing = await db
      .select({ commitSha: extensions.commitSha })
      .from(extensions)
      .where(eq(extensions.id, id))
      .get();

    if (existing?.commitSha === commitSha) {
      // No changes, update stars only
      await db
        .update(extensions)
        .set({ stars: repo.stargazers_count })
        .where(eq(extensions.id, id));
      return;
    }
  }

  // Fetch and parse manifest
  const manifest = await fetchManifest(
    repo.full_name,
    repo.default_branch,
    directory,
    token,
  );
  if (!manifest || !manifest.name) return;

  const iconUrl = resolveIconUrl(
    manifest.icon,
    repo.full_name,
    repo.default_branch,
    directory,
  );

  // Build install URL base: repo URL + optional subdirectory
  const _installUrl = directory
    ? `${repo.html_url}#${directory}`
    : repo.html_url;

  const data: NewExtension = {
    id,
    repoFullName: repo.full_name,
    repoUrl: repo.html_url,
    directory: directory ?? undefined,
    commitSha: commitSha ?? undefined,
    name: manifest.name,
    author: manifest.author ?? "",
    title: manifest.title || manifest.name,
    description: manifest.description ?? repo.description ?? "",
    icon: iconUrl ?? undefined,
    version: manifest.version ?? "0.0.0",
    homepage: manifest.homepage ?? repo.html_url,
    stars: repo.stargazers_count,
    topics: JSON.stringify(repo.topics ?? []),
    updatedAt: new Date(),
  };

  await db
    .insert(extensions)
    .values(data)
    .onConflictDoUpdate({
      target: extensions.id,
      set: {
        commitSha: data.commitSha,
        name: data.name,
        author: data.author,
        title: data.title,
        description: data.description,
        icon: data.icon,
        version: data.version,
        homepage: data.homepage,
        stars: data.stars,
        topics: data.topics,
        updatedAt: data.updatedAt,
      },
    });
}

/**
 * Main sync function: searches GitHub, finds all gopeed extensions,
 * and upserts them into the database.
 * Returns stats about the sync operation.
 */
export async function syncExtensions(
  db: Db,
  token?: string,
): Promise<{ synced: number; skipped: number; errors: number }> {
  const stats = { synced: 0, skipped: 0, errors: 0 };

  const repos = await searchGopeedExtensionRepos(token);

  for (const repo of repos) {
    try {
      const dirs = await findExtensionDirectories(repo, token);

      for (const dir of dirs) {
        try {
          await syncExtension(db, repo, dir, token);
          stats.synced++;
        } catch (err) {
          console.error(
            `Error syncing ${repo.full_name}${dir ? `#${dir}` : ""}:`,
            err,
          );
          stats.errors++;
        }
      }
    } catch (err) {
      console.error(`Error processing repo ${repo.full_name}:`, err);
      stats.errors++;
    }
  }

  return stats;
}
