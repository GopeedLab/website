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
Platform-specific detail-page copy, tutorials and additional languages are a
separate content project.

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
4. Discuss extension detail pages separately, then pilot a few complete platform
   pages. Research English demand in India/US and native-language demand in
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
