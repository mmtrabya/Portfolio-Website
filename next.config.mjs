/** @type {import('next').NextConfig} */
// GitHub Pages project page lives at /Portfolio-Website, so we need a base path
// in production. Locally we want a clean root.
const isProd = process.env.NODE_ENV === "production";
const repoBase = "/Portfolio-Website";

const nextConfig = {
  reactStrictMode: true,
  // Static HTML export — required for GitHub Pages.
  output: "export",
  // Trailing slash makes nested routes resolve cleanly on GH Pages.
  trailingSlash: true,
  basePath: isProd ? repoBase : "",
  assetPrefix: isProd ? `${repoBase}/` : "",
  images: {
    // GitHub Pages can't run the Next.js image optimizer.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  // Expose the base path to client code so we can prepend it to static asset URLs.
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoBase : "",
  },
};

export default nextConfig;
