import { type Locale, locales } from "@/lib/i18n/config";
import type { ReadmeSource } from "./content";

export function readmeFilenameLocale(
  filename: string,
): Locale | null | undefined {
  const match = /^readme(?:[._-]([a-z][a-z0-9._-]*))?\.(?:md|markdown)$/i.exec(
    filename.split("/").at(-1) ?? filename,
  );
  if (!match) return undefined;
  if (!match[1]) return null;
  const tag = match[1].toLowerCase().replace(/[_.]/g, "-");
  // Generic Chinese filenames do not distinguish Simplified and Traditional.
  if (tag === "zh" || tag === "chinese") return null;
  const aliases: Record<string, string> = {
    english: "en",
    "zh-cn": "zh",
    "zh-hans": "zh",
    "zh-sg": "zh",
    cn: "zh",
    chs: "zh",
    "zh-tw": "zh-TW",
    "zh-hant": "zh-TW",
    "zh-hk": "zh-TW",
    "zh-mo": "zh-TW",
    tw: "zh-TW",
    cht: "zh-TW",
  };
  const configured = locales.find(
    (locale) => locale.toLowerCase() === tag || locale === aliases[tag],
  );
  if (configured) return configured;
  const language = tag.split("-")[0];
  const sameLanguage = locales.filter(
    (locale) => locale.split("-")[0] === language,
  );
  if (sameLanguage.length === 1 && language !== "zh") return sameLanguage[0];
  // Collect language variants even before the website enables that language.
  // Enabling another locale must not change the files included in the source hash.
  return null;
}

export async function fetchReadmeSources(
  repo: string,
  ref: string,
  directory: string | null,
  token?: string,
): Promise<ReadmeSource[]> {
  const path = directory
    ? directory.split("/").map(encodeURIComponent).join("/")
    : "";
  const response = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}?ref=${encodeURIComponent(ref)}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Gopeed-Website/1.0",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(30_000),
    },
  );
  if (!response.ok)
    throw new Error(
      `README directory HTTP ${response.status}: ${repo}/${path}`,
    );
  const entries = (await response.json()) as Array<{
    name: string;
    type: string;
  }>;
  const files = entries
    .filter(
      (entry) =>
        entry.type === "file" && readmeFilenameLocale(entry.name) !== undefined,
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  const sources: ReadmeSource[] = [];
  const pending = files.map((file) => file.name);
  const listed = new Set(pending);
  const seen = new Set(pending);
  for (const filename of pending) {
    const res = await fetch(
      `https://raw.githubusercontent.com/${repo}/${ref}/${path ? `${path}/` : ""}${filename.split("/").map(encodeURIComponent).join("/")}`,
      {
        headers: { "User-Agent": "Gopeed-Website/1.0" },
        signal: AbortSignal.timeout(30_000),
      },
    );
    if (res.status === 404 && !listed.has(filename)) {
      await res.body?.cancel();
      console.warn(
        `[extension-content] ignoring missing linked README: ${repo}/${filename}`,
      );
      continue;
    }
    if (!res.ok)
      throw new Error(`README HTTP ${res.status}: ${repo}/${filename}`);
    const content = (await res.text())
      .replace(/^\uFEFF/, "")
      .replace(/\r\n?/g, "\n");
    sources.push({
      filename,
      content,
      localeHint: readmeFilenameLocale(filename) ?? null,
    });
    if (filename.includes("/")) continue;
    // Follow explicitly linked local-language READMEs, including readme/ subfolders.
    // Stay inside this extension directory; never fetch arbitrary external links.
    const base = new URL(filename, "https://source.invalid/");
    for (const match of content.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(match[1])) continue;
      if (/^(?:\/|\.\.\/)/.test(match[1])) continue;
      const target = new URL(match[1], base);
      if (target.origin !== base.origin) continue;
      const linked = decodeURIComponent(target.pathname.slice(1));
      if (readmeFilenameLocale(linked) === undefined || seen.has(linked))
        continue;
      if (seen.size >= 32)
        throw new Error(`Too many linked README sources: ${repo}`);
      seen.add(linked);
      pending.push(linked);
    }
  }
  return sources;
}
