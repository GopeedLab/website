import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Force shiki to be bundled into the server build instead of being treated
  // as an external module (Next.js default). Cloudflare Workers cannot resolve
  // hashed external module ids at runtime.
  transpilePackages: ["shiki"],
  experimental: {
    optimizePackageImports: ["lucide-react", "@heroicons/react"],
  },
  // Turbopack config: alias shiki subpath imports to concrete file paths so they
  // get bundled instead of externalized (Cloudflare Workers can't resolve hashed external modules)
  turbopack: {
    resolveAlias: {
      shiki: "./node_modules/shiki/dist/index.mjs",
      "shiki/core": "./node_modules/shiki/dist/core-unwasm.mjs",
      "shiki/engine/javascript":
        "./node_modules/shiki/dist/engine-javascript.mjs",
      "shiki/engine/oniguruma":
        "./node_modules/shiki/dist/engine-oniguruma.mjs",
      "shiki/wasm": "./node_modules/shiki/dist/wasm.mjs",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
    // Allow SVG images through the optimization pipeline (extension icons may be SVG).
    // CSP headers (script-src 'none'; frame-src 'none'; sandbox;) are applied automatically.
    dangerouslyAllowSVG: true,
  },
  async rewrites() {
    return [
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/docs/:path*",
      },
    ];
  },
};

export default withMDX(config);
