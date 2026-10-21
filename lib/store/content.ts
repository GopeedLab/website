import { eq } from "drizzle-orm";
import type { Db } from "@/db/client";
import { extensionLocalizations, extensions } from "@/db/schema";
import { type Locale, localeNames, locales } from "@/lib/i18n/config";
import {
  README_SYSTEM_PROMPT,
  SEO_RESPONSE_SCHEMA,
  SEO_SYSTEM_PROMPT,
} from "./ai-prompts";
import { resolveMarkdownImageUrls } from "./markdown";

export const EXTENSION_AI_MODEL = "@cf/deepseek-ai/deepseek-v4.1-flash-1017";
export interface ExtensionAi {
  run(
    model: string,
    inputs: Record<string, unknown>,
    options?: { signal?: AbortSignal },
  ): Promise<unknown>;
}
export interface ReadmeSource {
  filename: string;
  content: string;
  localeHint: Locale | null;
}
export interface ContentSource {
  id: string;
  name: string;
  title: string;
  description: string;
  repoFullName: string;
  branch: string;
  directory: string | null;
  readmes: ReadmeSource[];
}
export interface ContentStats {
  generatedLocales: number;
  failedLocales: number;
  reusedReadmes: number;
  aiRequests: number;
  neurons: number;
}
export const emptyContentStats = (): ContentStats => ({
  generatedLocales: 0,
  failedLocales: 0,
  reusedReadmes: 0,
  aiRequests: 0,
  neurons: 0,
});

export async function sourceContentHash(
  source: Pick<ContentSource, "title" | "description" | "readmes">,
) {
  const normalize = (text: string) =>
    text.replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n");
  const value = JSON.stringify({
    title: normalize(source.title),
    description: normalize(source.description),
    readmes: [...source.readmes]
      .sort((a, b) => a.filename.localeCompare(b.filename))
      .map((r) => [r.filename, normalize(r.content)]),
  });
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
}

function prose(text: string) {
  return text
    .replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, "")
    .replace(/^(?:\[[^\]]+\]\([^)]*\)\s*(?:\|\s*)?){2,}\s*$/gm, "")
    .replace(/`[^`\n]*`/g, "")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/[^\s)]+|<[^>]*>/g, "");
}
function substantive(text: string) {
  const body = prose(text)
    .replace(/^#+.*$/gm, "")
    .trim();
  return body.length > 60 || /download|下载|下載|скач|загруз/i.test(body);
}
function languageCompatible(text: string, locale: Locale, brief = false) {
  const visible = prose(text);
  brief ||= visible.trim().length < 180;
  const han = (visible.match(/\p{Script=Han}/gu) ?? []).length;
  const cyrillic = (visible.match(/\p{Script=Cyrillic}/gu) ?? []).length;
  const words = (visible.match(/[a-zA-Z]{3,}/g) ?? []).length;
  // Long docs can legitimately retain foreign platform names or UI labels.
  const foreignLimit = Math.max(15, Math.floor(visible.length / 100));
  if (locale === "en") return han < foreignLimit && cyrillic < foreignLimit;
  if (locale === "ru") return cyrillic > (brief ? 6 : 15) && han < foreignLimit;
  return han > (brief ? 3 : 10) && (han > words / 3 || words < 50);
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Expected a JSON object");
  return value as Record<string, unknown>;
}
class IncompleteModelOutputError extends Error {}

// Standard Workers AI billing permits 20 requests/minute for this paid model.
// Share pacing across the concurrent repos and locales in one sync invocation.
const nextAiRequest = new WeakMap<ExtensionAi, number>();
async function paceAiRequest(ai: ExtensionAi) {
  const now = Date.now();
  const start = Math.max(now, nextAiRequest.get(ai) ?? now);
  nextAiRequest.set(ai, start + 3_500);
  if (start > now)
    await new Promise((resolve) => setTimeout(resolve, start - now));
}

function parseOutput(result: unknown) {
  const data = object(result);
  const choices = data.choices as
    | Array<{ finish_reason?: string; message?: { content?: string } }>
    | undefined;
  if (choices?.[0]?.finish_reason && choices[0].finish_reason !== "stop")
    throw new IncompleteModelOutputError(
      `Incomplete model output: ${choices[0].finish_reason}`,
    );
  const content = choices?.[0]?.message?.content ?? data.response ?? data;
  return typeof content === "string"
    ? object(
        JSON.parse(
          content
            .trim()
            .replace(/^```(?:json)?\s*/, "")
            .replace(/\s*```$/, ""),
        ),
      )
    : object(content);
}

async function generate<T>(
  ai: ExtensionAi,
  stats: ContentStats,
  task: string,
  system: string,
  user: string,
  schema: unknown,
  maxTokens: number,
  validate: (value: Record<string, unknown>) => T,
) {
  let problem = "";
  let truncated = false;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await paceAiRequest(ai);
      stats.aiRequests++;
      const result = await ai.run(
        EXTENSION_AI_MODEL,
        {
          messages: [
            { role: "system", content: system },
            {
              role: "user",
              content: `${user}${problem ? `\nThe previous attempt failed: ${problem}. Correct these issues and return the complete requested JSON.` : ""}`,
            },
          ],
          temperature: 0,
          stream: false,
          max_completion_tokens: truncated
            ? Math.min(24000, maxTokens * 2)
            : maxTokens,
          reasoning_effort: "none",
          response_format: {
            type: "json_schema",
            json_schema: { name: task, strict: true, schema },
          },
        },
        {
          signal: AbortSignal.timeout(180_000),
        },
      );
      const usage = object(result).usage as { neurons?: number } | undefined;
      stats.neurons += usage?.neurons ?? 0;
      return validate(parseOutput(result));
    } catch (error) {
      problem = error instanceof Error ? error.message : String(error);
      if (error instanceof IncompleteModelOutputError) {
        truncated = true;
      }
      if (attempt === 0 && /429|rate.?limit|3021|capacity/i.test(problem))
        await new Promise((resolve) => setTimeout(resolve, 60_000));
    }
  }
  throw new Error(`${task} (${EXTENSION_AI_MODEL}): ${problem}`);
}

function validateSeo(value: Record<string, unknown>, source: ContentSource) {
  const result = {} as Record<Locale, { title: string; intro: string }>;
  const original = `${source.title}\n${source.description}\n${source.readmes.map((r) => r.content).join("\n")}`;
  for (const locale of locales) {
    const copy = object(value[locale]);
    if (typeof copy.title !== "string" || typeof copy.intro !== "string")
      throw new Error(`${locale}: title/intro must be strings`);
    const title = copy.title.trim(),
      intro = copy.intro.trim();
    if (!title || [...title].length > 65 || !intro || [...intro].length > 180)
      throw new Error(`${locale}: title <=65, intro <=180 characters required`);
    if (
      !developerSample(source) &&
      (/Gopeed/i.test(title) || packagingTerminology(title, source))
    )
      throw new Error(
        `${locale}: forbidden brand/extension terminology in title "${title}". Remove Gopeed and self-referential extension packaging from EVERY title. Keep only the target platform, supported downloadable content and download intent.`,
      );
    if (!developerSample(source) && packagingTerminology(intro, source))
      throw new Error(
        `${locale}: intro contains self-referential extension packaging: "${intro}". Rewrite EVERY intro as direct download copy through Gopeed; do not describe Gopeed as an extension/plugin.`,
      );
    if (!intro.includes("Gopeed"))
      throw new Error(`${locale}: intro must explain use through Gopeed`);
    if (!languageCompatible(`${title}\n${intro}`, locale, true))
      throw new Error(`${locale}: wrong output language`);
    for (const platform of [
      /YouTube|Shorts/i,
      /Hugging\s*Face/i,
      /Bilibili|B站|哔哩|嗶哩/i,
      /TikTok/i,
      /Instagram/i,
      /SoundCloud/i,
      /Telegram/i,
    ]) {
      if (platform.test(`${title} ${intro}`) && !platform.test(original))
        throw new Error(
          `${locale}: platform absent from source: ${platform.source}`,
        );
    }
    for (const feature of [
      /MP3/i,
      /8K/i,
      /subtitles|字幕|субтитр/i,
      /unlimited|无限|無限|без ограничений/i,
    ]) {
      if (feature.test(`${title} ${intro}`) && !feature.test(original))
        throw new Error(`${locale}: unsupported feature ${feature.source}`);
    }
    if (/8K|HDR|Dolby|杜比/i.test(title))
      throw new Error(
        `${locale}: keep conditional quality claims out of titles`,
      );
    if (
      /分\s*P/.test(original) &&
      !/playlist|播放列表|播放清單/i.test(original) &&
      /playlist|播放列表|播放清單|плейлист/i.test(`${title} ${intro}`)
    )
      throw new Error(`${locale}: multipart videos are not playlists`);
    result[locale] = { title, intro };
  }
  return result;
}

function downloadablePlugins(source: ContentSource) {
  const original = `${source.title} ${source.description} ${source.readmes.map((r) => r.content).join("\n")}`;
  return (
    /modrinth|minecraft|bukkit|spigot|curseforge/i.test(original) &&
    /plugins?|插件|外掛|плагин/i.test(original)
  );
}

function packagingTerminology(copy: string, source: ContentSource) {
  return (
    /extension|add-on|扩展|擴充|расширени/i.test(copy) ||
    (!downloadablePlugins(source) && /plugin|插件|外掛|плагин/i.test(copy))
  );
}

function developerSample(source: ContentSource) {
  return /(?:^|-)(?:sample|demo|probe)(?:$|-)|^extension-test$/i.test(
    source.name,
  );
}

function validateLabelGloss(afterToken: string, locale: Locale, label: string) {
  const text = afterToken.trimStart().slice(0, 512);
  let depth = 0;
  let gloss = "";
  if (text[0] === "(" || text[0] === "（") {
    for (let index = 0; index < text.length; index++) {
      if (text[index] === "(" || text[index] === "（") depth++;
      if (text[index] === ")" || text[index] === "）") depth--;
      if (depth === 0) {
        gloss = text.slice(1, index);
        break;
      }
    }
  }
  const han = /\p{Script=Han}/u.test(gloss);
  const cyrillic = /\p{Script=Cyrillic}/u.test(gloss);
  const valid =
    locale === "en"
      ? /[a-z]{2}/i.test(gloss) && !han && !cyrillic
      : locale === "ru"
        ? cyrillic && !han
        : han;
  if (!valid)
    throw new Error(
      `After the protected interface label "${label}", add its ${locale} translation in parentheses. Translate the explanation; do not repeat its Chinese meaning.`,
    );
}

/** Keep code literal even when it contains translatable UI labels. */
export function protectReadme(source: string) {
  let prefix = "GOPEED_LITERAL_";
  while (source.includes(prefix)) prefix += "X_";
  const literals: string[] = [];
  const keep = (value: string) => {
    const token = `${prefix}${literals.length}__`;
    literals.push(value);
    return token;
  };
  const text = source
    .replace(/^(```[^\n]*|~~~[^\n]*)\n[\s\S]*?^(?:```|~~~)[ \t]*$/gm, keep)
    .replace(/`[^`\n]+`/g, keep)
    .replace(/\]\(([^)]+)\)/g, (_match, url: string) => `](${keep(url)})`)
    .replace(/<[^>]+>/g, keep);
  const labelMeanings = Object.fromEntries(
    literals.flatMap((value, index) =>
      /^`[^`\n]{1,100}`$/.test(value) &&
      /\p{Script=Han}/u.test(value) &&
      !/[/:=<>]/.test(value)
        ? [[`${prefix}${index}__`, value.slice(1, -1)]]
        : [],
    ),
  );
  const codeReferences = Object.fromEntries(
    literals.flatMap((value, index) =>
      /^`[^`\n]{1,500}`$/.test(value) && !labelMeanings[`${prefix}${index}__`]
        ? [[`${prefix}${index}__`, value.slice(1, -1)]]
        : [],
    ),
  );
  return {
    text,
    instruction: literals.length
      ? `\nTokens beginning ${prefix} are immutable source-code placeholders. Copy each token exactly once, in its original position; do not translate, expand, or wrap it in Markdown. They will be restored after translation. Never infer hidden token values or invent meanings. Only tokens explicitly listed below may receive a translated label explanation; never invent a new explanation for other code/product tokens. Translate existing surrounding prose and parenthetical conditions faithfully.${Object.keys(codeReferences).length ? ` Read-only code/product reference data, to understand surrounding prose (do not replace placeholders or add explanations for these): ${JSON.stringify(codeReferences)}` : ""}${Object.keys(labelMeanings).length ? ` For these natural-language interface labels, preserve the placeholder and add a faithful TARGET-LANGUAGE explanation in parentheses after it. Never copy the Chinese reference meaning as an English/Russian explanation. Example: a token meaning 新建任务 becomes TOKEN (New task) in en, preserving TOKEN itself. Reference meanings (never use them to replace a token): ${JSON.stringify(labelMeanings)}` : ""}`
      : "",
    restore(translated: string, reference = text, locale?: Locale) {
      for (const [index, value] of literals.entries()) {
        const token = `${prefix}${index}__`;
        const expected = reference.includes(token);
        if (
          (expected && translated.split(token).length !== 2) ||
          (!expected && translated.includes(token))
        )
          throw new Error(`Preserve placeholder exactly once: ${token}`);
        if (expected && locale && labelMeanings[token]) {
          validateLabelGloss(
            translated.slice(translated.indexOf(token) + token.length),
            locale,
            String(labelMeanings[token]),
          );
        }
        if (expected) translated = translated.replace(token, () => value);
      }
      return translated;
    },
  };
}

export function validateReadme(
  source: string,
  translated: string,
  locale: Locale,
  checkLanguage = true,
) {
  if (!translated.trim()) throw new Error("Empty README translation");
  const headings = (text: string) =>
    [...text.matchAll(/^(#{1,6}) /gm)].map((m) => m[1].length).join(",");
  if (headings(source) !== headings(translated))
    throw new Error("Preserve every heading and heading level");
  for (const match of source.matchAll(/\]\(([^)]+)\)/g))
    if (!translated.includes(`](${match[1]})`))
      throw new Error(`Preserve Markdown URL: ${match[1]}`);
  for (const match of source.matchAll(/`([^`\n]+)`/g))
    if (!translated.includes(`\`${match[1]}\``))
      throw new Error(`Preserve inline code: ${match[1]}`);
  for (const match of source.matchAll(
    /^(```[^\n]*|~~~[^\n]*)\n[\s\S]*?^(?:```|~~~)[ \t]*$/gm,
  ))
    if (!translated.includes(match[0]))
      throw new Error("Preserve fenced code verbatim");
  for (const match of source.matchAll(/<img[^>]*>/g))
    if (!translated.includes(match[0]))
      throw new Error("Preserve HTML image tags and attributes");
  for (const name of [
    "Gopeed",
    "YouTube",
    "Shorts",
    "FFmpeg",
    "MP4",
    "PO Token",
  ])
    if (source.includes(name) && !translated.includes(name))
      throw new Error(`Preserve technical identifier ${name}`);
  if (
    locale !== "en" &&
    /^#{1,6}\s+(?:Gopeed\s+(?:YouTube\s+)?Extension|Features?|Installation|Usage|Example|Demo)\s*$/im.test(
      translated,
    )
  )
    throw new Error(
      "Translate all generic headings, including the first heading",
    );
  if (
    checkLanguage &&
    substantive(source) &&
    !languageCompatible(translated, locale)
  )
    throw new Error(`Translate README prose into ${locale}`);
  return translated;
}

/** Split between Markdown paragraphs, after code blocks have been protected. */
export function readmeSections(text: string) {
  const sections: string[] = [];
  let section = "";
  for (const paragraph of text.split(/(?<=\n\n)/)) {
    if (section && section.length + paragraph.length > 5000) {
      sections.push(section);
      section = "";
    }
    section += paragraph;
  }
  if (section) sections.push(section);
  return sections;
}

export async function translateExtensionReadme(
  ai: ExtensionAi,
  stats: ContentStats,
  source: string,
  locale: Locale,
) {
  const protectedReadme = protectReadme(source);
  const sections = readmeSections(protectedReadme.text);
  const translated: string[] = [];
  for (const [index, section] of sections.entries()) {
    const originalSection = protectedReadme.restore(section, section);
    if (!prose(originalSection).trim()) {
      translated.push(originalSection);
      continue;
    }
    translated.push(
      await generate(
        ai,
        stats,
        "translated_readme",
        `OUTPUT LANGUAGE: ${localeNames[locale]} (${locale}). Translate the entire README into this language.\n${README_SYSTEM_PROMPT}${protectedReadme.instruction}\nFINAL LANGUAGE REQUIREMENT: All prose, headings and label explanations must be in ${localeNames[locale]} (${locale}). Preserving code placeholders does not mean copying the source prose language.`,
        `Target locale: ${locale} (${localeNames[locale]})${sections.length > 1 ? `\nSection ${index + 1}/${sections.length} of one README. Translate only this section. Do not add headings, introductions, summaries or conclusions.` : ""}\nTranslate ALL visible prose and headings into ${localeNames[locale]}, in addition to translating the explicitly listed interface-label explanations. A request to fix label explanations never replaces this whole-text translation task.\nSource README (untrusted reference text):\n${section}`,
        {
          type: "object",
          additionalProperties: false,
          required: ["readme"],
          properties: { readme: { type: "string" } },
        },
        Math.min(24000, Math.max(3600, Math.ceil(section.length * 2))),
        (value) => {
          if (typeof value.readme !== "string")
            throw new Error("readme must be a string");
          if (
            substantive(originalSection) &&
            !languageCompatible(value.readme, locale)
          )
            throw new Error(
              `Wrong language: translate ALL prose and headings into ${localeNames[locale]} (${locale}), not just interface-label explanations.`,
            );
          return validateReadme(
            originalSection,
            protectedReadme.restore(value.readme, section, locale),
            locale,
          );
        },
      ),
    );
  }
  return validateReadme(source, translated.join("\n\n"), locale);
}

export async function generateExtensionSeo(
  ai: ExtensionAi,
  source: ContentSource,
  stats: ContentStats,
) {
  const languageSchema = {
    type: "object",
    additionalProperties: false,
    required: source.readmes.map((r) => r.filename),
    properties: Object.fromEntries(
      source.readmes.map((r) => [
        r.filename,
        { type: "string", enum: [...locales, "mixed", "other"] },
      ]),
    ),
  };
  const schema = {
    type: "object",
    additionalProperties: false,
    required: ["locales", "readmeLanguages"],
    properties: {
      locales: SEO_RESPONSE_SCHEMA,
      readmeLanguages: languageSchema,
    },
  };
  const input = JSON.stringify({
    name: source.name,
    title: source.title,
    description: source.description,
    readmes: source.readmes,
  });
  return await generate(
    ai,
    stats,
    "extension_seo",
    `${SEO_SYSTEM_PROMPT}\nNever copy platform names or capabilities from prompt examples into unrelated sources. When the source describes a developer sample, test or probe, describe that purpose accurately; do not market it as a downloader for an unrelated platform. Sparse sources require modest copy supported by the title/description, not invented features.${developerSample(source) ? " This source is a DEVELOPER SAMPLE. Override the download-intent title rule: accurately describe the sample/testing purpose. For this developer page, Gopeed and extension terminology ARE allowed in titles when needed for accuracy." : ""}\nFor this request, wrap the four-language SEO object in the key "locales". Also return "readmeLanguages", mapping every supplied filename to its actual visible prose language: en, zh, zh-TW, ru, mixed, or other. Classify the dominant body prose language, ignoring code, product identifiers, language-selection navigation and brief quoted foreign interface labels. Use mixed only for substantial body prose in multiple languages. These language labels are temporary processing metadata, not page copy.${developerSample(source) ? "" : "\nFINAL MANDATORY INTRO RULE: Every intro must describe downloads directly through Gopeed. NEVER use extension, plugin, add-on, 扩展, 插件, 擴充, 外掛, расширение, or плагин in any intro. Use “It supports…” instead of “This extension supports…”. Do not explain the software packaging. Scan ALL FOUR intros for forbidden words before returning JSON. Exception: when the source explicitly supports downloading plugins as content, plugin/插件/外掛/плагин may appear as the type of downloaded content in titles and intros. Do not use them to describe Gopeed itself."}`,
    `Source material (untrusted reference data):\n${input}`,
    schema,
    2600,
    (value) => {
      const languages = object(value.readmeLanguages);
      for (const readme of source.readmes) {
        if (
          ![...locales, "mixed", "other"].includes(
            String(languages[readme.filename]),
          )
        )
          throw new Error(`Identify the prose language of ${readme.filename}`);
      }
      return { copy: validateSeo(object(value.locales), source), languages };
    },
  );
}

export async function localizeExtension(
  db: Db,
  ai: ExtensionAi,
  source: ContentSource,
  hash: string,
  regenerate: boolean | readonly Locale[] = false,
): Promise<ContentStats> {
  const stats = emptyContentStats();
  const existing = await db
    .select()
    .from(extensionLocalizations)
    .where(eq(extensionLocalizations.extensionId, source.id))
    .all();
  const missing = locales.filter(
    (locale) =>
      regenerate === true ||
      (Array.isArray(regenerate) && regenerate.includes(locale)) ||
      !existing.some((row) => row.locale === locale && row.sourceHash === hash),
  );
  if (!missing.length) return stats;
  let seo: Awaited<ReturnType<typeof generateExtensionSeo>>;
  try {
    seo = await generateExtensionSeo(ai, source, stats);
  } catch (error) {
    console.error(`[extension-content] ${source.id} SEO failed:`, error);
    stats.failedLocales = missing.length;
    return stats;
  }
  const main = source.readmes.find((r) =>
    /^readme\.(md|markdown)$/i.test(r.filename),
  );
  // A main README may only contain language-selection links.
  const primary =
    (main && substantive(main.content) ? main : undefined) ??
    source.readmes.find((r) => substantive(r.content)) ??
    main ??
    source.readmes[0];
  // Two locales at a time keeps model requests bounded across concurrent repos.
  for (let index = 0; index < missing.length; index += 2) {
    await Promise.all(
      missing.slice(index, index + 2).map(async (locale) => {
        try {
          const authored =
            source.readmes.find(
              (r) =>
                r.localeHint === locale &&
                substantive(r.content) &&
                languageCompatible(r.content, locale),
            ) ??
            source.readmes.find(
              (r) =>
                seo.languages[r.filename] === locale &&
                substantive(r.content) &&
                languageCompatible(r.content, locale),
            );
          const readmeSource = authored ?? primary;
          const nestedDirectory = readmeSource?.filename.includes("/")
            ? readmeSource.filename.slice(
                0,
                readmeSource.filename.lastIndexOf("/"),
              )
            : null;
          const readmeDirectory =
            [source.directory, nestedDirectory].filter(Boolean).join("/") ||
            null;
          let readme: string | null = null;
          if (authored || (primary && !substantive(primary.content))) {
            readme = (authored ?? primary)?.content ?? null;
            stats.reusedReadmes++;
          } else if (primary) {
            readme = await translateExtensionReadme(
              ai,
              stats,
              primary.content,
              locale,
            );
          }
          const current = await db
            .select({ hash: extensions.contentHash })
            .from(extensions)
            .where(eq(extensions.id, source.id))
            .get();
          if (current?.hash !== hash)
            throw new Error(
              "Upstream changed during generation; discard stale output",
            );
          const row = {
            extensionId: source.id,
            locale,
            title: seo.copy[locale].title,
            description: seo.copy[locale].intro,
            readme:
              readme === null
                ? null
                : resolveMarkdownImageUrls(
                    readme,
                    source.repoFullName,
                    source.branch,
                    readmeDirectory,
                  ),
            sourceHash: hash,
            updatedAt: new Date(),
          };
          await db
            .insert(extensionLocalizations)
            .values(row)
            .onConflictDoUpdate({
              target: [
                extensionLocalizations.extensionId,
                extensionLocalizations.locale,
              ],
              set: row,
            });
          stats.generatedLocales++;
        } catch (error) {
          stats.failedLocales++;
          console.error(
            `[extension-content] ${source.id} ${locale} failed:`,
            error,
          );
        }
      }),
    );
  }
  return stats;
}
