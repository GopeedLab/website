/**
 * GitHub extension fetcher service
 * Searches GitHub for repos with the "gopeed-extension" topic,
 * fetches manifest.json from each repo (handling multi-extension repos via subdirectory),
 * and upserts data into the D1 database.
 */

import { eq } from "drizzle-orm";
import type { Db } from "@/db/client";
import type { NewExtension } from "@/db/schema";
import { extensionLocalizations, extensions } from "@/db/schema";
import { locales } from "@/lib/i18n/config";
import {
  type ContentSource,
  type ExtensionAi,
  emptyContentStats,
  localizeExtension,
  sourceContentHash,
} from "./content";
import { resolveMarkdownImageUrls } from "./markdown";
import { fetchReadmeSources } from "./readme-sources";

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
  incomplete_results?: boolean;
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
  const res = await fetch(url, {
    headers: githubHeaders(token),
    signal: AbortSignal.timeout(30_000),
  });
  if (res.status === 404) {
    await res.body?.cancel();
    return null;
  }
  if (!res.ok) {
    await res.body?.cancel();
    throw new Error(`GitHub HTTP ${res.status} ${res.statusText} — ${url}`);
  }
  return (await res.json()) as T;
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
  const res = await fetch(url, {
    headers: { "User-Agent": "Gopeed-Website/1.0" },
    signal: AbortSignal.timeout(30_000),
  });
  if (res.status === 404) {
    await res.body?.cancel();
    return null;
  }
  if (!res.ok) {
    await res.body?.cancel();
    throw new Error(`Manifest HTTP ${res.status} ${res.statusText} — ${url}`);
  }
  return (await res.json()) as ExtensionManifest;
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
    if (!result || result.incomplete_results) {
      throw new Error("GitHub extension search returned incomplete results");
    }
    if (result.items.length === 0) break;
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

export interface ExtensionSyncOptions {
  ai?: ExtensionAi;
  refreshContent?: boolean;
  /** Optional repository filter for an operator's targeted retry. */
  repo?: string;
}

async function syncExtension(
  db: Db,
  repo: GitHubRepo,
  directory: string | null,
  token: string | undefined,
  options: ExtensionSyncOptions,
) {
  const contentStats = emptyContentStats();
  // Pin manifest and all README files to the same repository snapshot.
  const commitSha = await getLatestCommitSha(
    repo.full_name,
    repo.default_branch,
    "",
    token,
  );
  const ref = commitSha ?? repo.default_branch;
  const manifest = await fetchManifest(repo.full_name, ref, directory, token);
  if (!manifest?.name) return { status: "ignored" as const, ...contentStats };
  const author = manifest.author?.trim() ?? "";
  const id = author ? `${author}@${manifest.name}` : manifest.name;
  const existing = await db
    .select()
    .from(extensions)
    .where(eq(extensions.id, id))
    .get();
  const newVersion = manifest.version ?? "0.0.0";
  if (
    existing?.version === newVersion &&
    existing.contentHash &&
    !options.refreshContent
  ) {
    await db
      .update(extensions)
      .set({ stars: repo.stargazers_count })
      .where(eq(extensions.id, id));
    if (options.ai) {
      const rows = await db
        .select({
          locale: extensionLocalizations.locale,
          hash: extensionLocalizations.sourceHash,
        })
        .from(extensionLocalizations)
        .where(eq(extensionLocalizations.extensionId, id))
        .all();
      if (
        locales.some(
          (locale) =>
            !rows.some(
              (row) =>
                row.locale === locale && row.hash === existing.contentHash,
            ),
        )
      ) {
        // Retry the saved version, not README edits made without a version bump.
        const readmes = await fetchReadmeSources(
          repo.full_name,
          existing.commitSha ?? ref,
          directory,
          token,
        );
        const source: ContentSource = {
          id,
          name: existing.name,
          title: existing.title,
          description: existing.description,
          repoFullName: repo.full_name,
          branch: repo.default_branch,
          directory,
          readmes,
        };
        if ((await sourceContentHash(source)) !== existing.contentHash)
          throw new Error(
            `Saved source snapshot does not match ${id}; run a full content refresh`,
          );
        Object.assign(
          contentStats,
          await localizeExtension(db, options.ai, source, existing.contentHash),
        );
      }
    }
    return { status: "skipped" as const, ...contentStats };
  }

  const readmes = await fetchReadmeSources(
    repo.full_name,
    ref,
    directory,
    token,
  );
  const source: ContentSource = {
    id,
    name: manifest.name,
    title: manifest.title || manifest.name,
    description: manifest.description ?? repo.description ?? "",
    repoFullName: repo.full_name,
    branch: repo.default_branch,
    directory,
    readmes,
  };
  const hash = await sourceContentHash(source);
  const primary =
    readmes.find((r) => /^readme\.(md|markdown)$/i.test(r.filename)) ??
    readmes[0];
  const data: NewExtension = {
    id,
    repoFullName: repo.full_name,
    repoUrl: repo.html_url,
    directory,
    commitSha,
    name: manifest.name,
    author,
    title: source.title,
    description: source.description,
    icon: resolveIconUrl(
      manifest.icon,
      repo.full_name,
      repo.default_branch,
      directory,
    ),
    version: newVersion,
    homepage: manifest.homepage ?? repo.html_url,
    readme: primary
      ? resolveMarkdownImageUrls(
          primary.content,
          repo.full_name,
          repo.default_branch,
          directory,
        )
      : null,
    contentHash: hash,
    stars: repo.stargazers_count,
    topics: JSON.stringify(repo.topics ?? []),
    updatedAt:
      existing?.version === newVersion && existing.contentHash === hash
        ? existing.updatedAt
        : new Date(),
  };
  await db
    .insert(extensions)
    .values(data)
    .onConflictDoUpdate({ target: extensions.id, set: data });
  if (options.ai)
    Object.assign(
      contentStats,
      await localizeExtension(db, options.ai, source, hash),
    );
  return { status: "synced" as const, ...contentStats };
}

/**
 * Main sync function: searches GitHub, finds all gopeed extensions,
 * and upserts them into the database.
 *
 * Supports pagination for the manual HTTP endpoint. The scheduled handler uses
 * syncAllExtensions instead, searching once and processing the full snapshot.
 *
 * @param page     1-based page index of repos to process (default: 1)
 * @param pageSize number of repos to process per call (default: 10)
 */
export async function syncExtensions(
  db: Db,
  token?: string,
  page = 1,
  pageSize = 10,
  options: ExtensionSyncOptions = {},
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
  const allRepos = await searchGopeedExtensionRepos(token);
  const totalRepos = allRepos.length;

  const start = (page - 1) * pageSize;
  const repos = allRepos.slice(start, start + pageSize);
  const hasMore = start + pageSize < totalRepos;

  const stats = await syncRepos(db, repos, token, options);
  return { ...stats, page, pageSize, totalRepos, hasMore };
}

/** Scan all discovered repos in one Workers Paid scheduled invocation. */
export async function syncAllExtensions(
  db: Db,
  token: string,
  options: ExtensionSyncOptions = {},
) {
  const discovered = await searchGopeedExtensionRepos(token);
  const repos = options.repo
    ? discovered.filter(
        (repo) => repo.full_name.toLowerCase() === options.repo?.toLowerCase(),
      )
    : discovered;
  if (options.repo && !repos.length)
    throw new Error(`Extension repository not found: ${options.repo}`);
  const stats = await syncRepos(db, repos, token, options);
  return { ...stats, totalRepos: repos.length };
}

async function syncRepos(
  db: Db,
  repos: GitHubRepo[],
  token: string | undefined,
  options: ExtensionSyncOptions,
) {
  const stats = {
    synced: 0,
    skipped: 0,
    ignored: 0,
    errors: 0,
    ...emptyContentStats(),
  };

  let cursor = 0;
  await Promise.all(
    Array.from({ length: 2 }, async () => {
      while (cursor < repos.length) {
        const repo = repos[cursor++];
        try {
          const dirs = await findExtensionDirectories(repo, token);

          for (const dir of dirs) {
            try {
              const result = await syncExtension(db, repo, dir, token, options);
              if (result.status === "synced") stats.synced++;
              else if (result.status === "skipped") stats.skipped++;
              else stats.ignored++;
              for (const key of Object.keys(emptyContentStats()) as Array<
                keyof ReturnType<typeof emptyContentStats>
              >)
                stats[key] += result[key];
              console.log(
                "[extension-sync]",
                repo.full_name,
                dir ?? "",
                JSON.stringify(result),
              );
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
    }),
  );

  return stats;
}
