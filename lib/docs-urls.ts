export function getPageMarkdownUrl(page: {
  url: string;
  slugs: string[];
}): string {
  return `${page.url}${page.slugs.length === 0 ? "/index" : ""}.md`;
}
