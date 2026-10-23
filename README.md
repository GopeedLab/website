# gopeed-website-fuma

This is a Next.js application generated with
[Create Fumadocs](https://github.com/fuma-nama/fumadocs).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## API reference and AI page actions

Use Node.js 24+ and pnpm 9.15.9. `pnpm docs:generate` downloads the Gopeed
OpenAPI schema and generates the reference under `content/api-reference/`.
These directories are disposable build output: edit the upstream schema or
`scripts/generate-openapi.mjs`, rather than generated MDX. Development, type
checks and builds generate the reference automatically.

The reference is an independent section at `/api-reference`, with its own content
collection, layout and sidebar, and localized equivalents under `/zh`, `/zh-TW`
and `/ru`. Old `/docs/openapi` URLs redirect to this section. Endpoint names and
descriptions remain in English; navigation,
page actions and the API playground use the selected UI language. The schema is
also available at `/openapi.json`. Playground requests go directly from the
browser to the selected Gopeed server.

Every docs page offers native Copy Markdown and Open actions. Append `.md` to
a document URL (use `/docs/index.md` for the docs home); existing `.mdx` URLs
remain supported. `/llms.txt` and `/llms-full.txt` serve the English index and
full text, with localized equivalents such as `/zh/llms.txt`. The shared index
and full text include both guides and the independent API reference. Page actions
use the selected language and canonical Markdown URLs. API Markdown
contains a standalone schema fragment including referenced components, rather
than an unrendered React component. No model credentials are needed for these
page actions and text endpoints. These integrations do not include a hosted
Ask AI chat or an MCP server.

## SEO URL and sitemap behavior

The sitemap is generated at request time from the current D1 catalog. New
extensions do not require a website rebuild to appear. Successful responses allow
up to five minutes of shared caching; D1 failures return an uncached 503 with a
retry interval instead of a partial sitemap. Store listings read the current
catalog at request time. Canonical URLs, internal links
and sitemap entries consistently encode extension IDs (`author%40name`).

## SEO rollout and monitoring

The current implementation covers language routing and metadata, redirects for
legacy duplicated locale paths, sitemap freshness, crawlable homepage/store
links, shared image crawling and first-screen image loading. Homepage platform
cards link to the corresponding existing extension pages in each language.
Extension detail-page copy and READMEs are localized in English, Simplified
Chinese, Traditional Chinese and Russian. Additional languages and tutorials
remain separate content work.

After deployment:

1. Check live canonical/hreflang, legacy redirects and sitemap completeness in
   Search Console. Inspect representative English/Chinese home, docs, store and
   extension URLs; monitor old duplicated-path 404s over subsequent crawls.
2. Compare 28-day Search Console periods by landing page, country and non-brand
   query cluster. Review clicks, impressions, click-through rate and average
   position without treating impressions as market search volume or installs.
3. Review mobile LCP/INP/CLS using field data. The smaller preloaded screenshot
   and immediately visible first-screen content address concrete loading delays;
   a passing field assessment still requires post-deployment measurements.
4. Review the generated extension pages against their source capabilities.
   Research English demand in India/US and native-language demand in
   Indonesia/Brazil, checking actual feature support and conversion before
   expanding languages. Add distinct tutorials for demonstrated user problems.
5. Review content accuracy, broken links, index coverage, acquisition and relevant
   referring links monthly. Keep an owner and a verified feature/version record
   for each priority extension page.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `lib/layout.shared.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for your landing page and other pages. |
| `app/docs`                | The documentation layout and pages.                    |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.dev) - learn about Fumadocs

## Cross-origin public API access

The public extension list, detail, install-report, and `/api/releases` endpoints support
credential-free cross-origin requests. `worker.ts` applies CORS outside the
response cache, including cached results, API errors, and JSON POST preflight.
The authenticated sync endpoint keeps its existing behavior.

Use `pnpm cf:dev` for browser integration tests through the Cloudflare Worker.

## Extension content generation

Apply `pnpm db:migrate` before deployment and `pnpm db:migrate:dev` for local
D1 development. Extension source content stays in `extensions`;
`extension_localizations` stores the title, description and complete README for
each language, together with its source hash and update time.

The hourly cron requires the existing `GITHUB_TOKEN` Worker secret and the `AI`
binding. SEO copy and translations use
`@cf/deepseek-ai/deepseek-v4.1-flash-1017` through `env.AI.run()` with reasoning
disabled. No Cloudflare API token secret is needed for inference.

The cron checks the manifest version first. On a version change, it hashes the
title, description and recognized README files from one commit. Only changed or
missing content triggers generation. Missing languages are retried against the
saved source snapshot even without another version change. Author-provided
translations and original-language READMEs are reused.

`lib/i18n/config.ts` is shared by website routing, extension generation, response
schemas and missing-language checks. Adding a website
language makes the next cron fill only its missing content, even if extension
versions stay unchanged. Database locale values are not restricted to a fixed
list. Until generation succeeds, the new language's pages show upstream content.

Translation preserves code, URLs and Markdown structure. Chinese interface
labels retain their original text with a model-generated translated explanation.
Long READMEs are translated in sections and validated as a complete document.
Requests are paced below 20/minute, have a 180-second deadline and get one retry;
rate-limit or capacity errors wait one minute before retrying.

Failed generation never overwrites valid content. Pages use translations only
when their source hash matches the current extension. Otherwise, titles,
descriptions and READMEs fall back to the upstream source. Page requests never
call AI. The public extension API continues to return upstream content.
