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
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.warn(
        `[fetcher] HTTP ${res.status} ${res.statusText} — ${url}\n${body}`,
      );
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[fetcher] fetch error — ${url}`, err);
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
 * Fetch README content from a repo directory, trying common filename variants.
 * Returns the raw markdown text, or null if not found.
 */
async function fetchReadme(
  repoFullName: string,
  branch: string,
  directory: string | null,
  _token?: string,
): Promise<string | null> {
  const candidates = ["README.md", "readme.md", "Readme.md", "README.MD"];
  const base = directory ? `${directory}/` : "";

  for (const filename of candidates) {
    const url = `${RAW_GITHUB}/${repoFullName}/${branch}/${base}${filename}`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Gopeed-Website/1.0" },
      });
      if (res.ok) {
        return await res.text();
      }
    } catch {
      // continue trying next variant
    }
  }
  return null;
}

/**
 * Resolve relative image URLs in a markdown string to absolute raw GitHub URLs.
 * Handles both markdown image syntax ![alt](src) and HTML <img src="..."> tags.
 */
function resolveMarkdownImageUrls(
  markdown: string,
  repoFullName: string,
  branch: string,
  directory: string | null,
): string {
  const base = directory ? `${directory}/` : "";
  const rawBase = `${RAW_GITHUB}/${repoFullName}/${branch}/${base}`;

  // Replace markdown image syntax: ![alt](relative/path)
  let resolved = markdown.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, src) => {
      const trimmed = src.trim();
      if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("data:")
      ) {
        return match;
      }
      // Remove leading ./ if present
      const cleanSrc = trimmed.replace(/^\.\//, "");
      return `![${alt}](${rawBase}${cleanSrc})`;
    },
  );

  // Replace HTML img tags: <img src="relative/path" ...>
  resolved = resolved.replace(
    /(<img\s[^>]*src=)(["'])([^"']+)\2/gi,
    (match, prefix, quote, src) => {
      const trimmed = src.trim();
      if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("data:")
      ) {
        return match;
      }
      const cleanSrc = trimmed.replace(/^\.\//, "");
      return `${prefix}${quote}${rawBase}${cleanSrc}${quote}`;
    },
  );

  return resolved;
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
 * Returns "skipped" if commit SHA unchanged, "synced" if upserted, "ignored" if manifest invalid.
 */
async function syncExtension(
  db: Db,
  repo: GitHubRepo,
  directory: string | null,
  token?: string,
): Promise<"synced" | "skipped" | "ignored"> {
  // Get latest commit SHA for the manifest path
  const commitSha = await getLatestCommitSha(
    repo.full_name,
    repo.default_branch,
    directory ? `${directory}/manifest.json` : "manifest.json",
    token,
  );

  // Fetch and parse manifest first — we need author+name to build the id
  const manifest = await fetchManifest(
    repo.full_name,
    repo.default_branch,
    directory,
    token,
  );
  if (!manifest || !manifest.name) return "ignored";

  // Construct id from manifest: "author@name" if author present, otherwise just "name"
  const author = manifest.author?.trim() ?? "";
  const id = author ? `${author}@${manifest.name}` : manifest.name;

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
      return "skipped";
    }
  }

  const iconUrl = resolveIconUrl(
    manifest.icon,
    repo.full_name,
    repo.default_branch,
    directory,
  );

  // Fetch README and resolve relative image paths
  const rawReadme = await fetchReadme(
    repo.full_name,
    repo.default_branch,
    directory,
    token,
  );
  const readme = rawReadme
    ? resolveMarkdownImageUrls(
        rawReadme,
        repo.full_name,
        repo.default_branch,
        directory,
      )
    : null;

  const data: NewExtension = {
    id,
    repoFullName: repo.full_name,
    repoUrl: repo.html_url,
    directory: directory ?? undefined,
    commitSha: commitSha ?? undefined,
    name: manifest.name,
    author: author,
    title: manifest.title || manifest.name,
    description: manifest.description ?? repo.description ?? "",
    icon: iconUrl ?? undefined,
    version: manifest.version ?? "0.0.0",
    homepage: manifest.homepage ?? repo.html_url,
    readme: readme ?? undefined,
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
        readme: data.readme,
        stars: data.stars,
        topics: data.topics,
        updatedAt: data.updatedAt,
      },
    });

  return "synced";
}

/**
 * Main sync function: searches GitHub, finds all gopeed extensions,
 * and upserts them into the database.
 *
 * Supports pagination to stay within Cloudflare Workers' 50-subrequest limit.
 * Each repo costs ~3 subrequests; a pageSize of 10 uses ~30, leaving headroom
 * for the initial GitHub search call.
 *
 * @param page     1-based page index of repos to process (default: 1)
 * @param pageSize number of repos to process per call (default: 10)
 */
export async function syncExtensions(
  db: Db,
  token?: string,
  page = 1,
  pageSize = 10,
): Promise<{
  synced: number;
  skipped: number;
  ignored: number;
  errors: number;
  page: number;
  pageSize: number;
  totalRepos: number;
  hasMore: boolean;
}> {
  const stats = { synced: 0, skipped: 0, ignored: 0, errors: 0 };

  const allRepos = await searchGopeedExtensionRepos(token);
  const totalRepos = allRepos.length;

  const start = (page - 1) * pageSize;
  const repos = allRepos.slice(start, start + pageSize);
  const hasMore = start + pageSize < totalRepos;

  for (const repo of repos) {
    try {
      const dirs = await findExtensionDirectories(repo, token);

      for (const dir of dirs) {
        try {
          const result = await syncExtension(db, repo, dir, token);
          if (result === "synced") stats.synced++;
          else if (result === "skipped") stats.skipped++;
          else stats.ignored++;
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

  return { ...stats, page, pageSize, totalRepos, hasMore };
}
