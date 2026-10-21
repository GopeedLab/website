const RAW_GITHUB = "https://raw.githubusercontent.com";

/**
 * Resolve relative image URLs in a markdown string to absolute raw GitHub URLs.
 * Handles both markdown image syntax ![alt](src) and HTML <img src="..."> tags.
 */
export function resolveMarkdownImageUrls(
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
