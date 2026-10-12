import type { NextConfig } from 'next';

// A fully static site: `next build` writes plain HTML, CSS and JS into out/,
// hostable anywhere (Vercel, Netlify, any static host).
const nextConfig: NextConfig = {
  output: 'export',
  // /about → /about/index.html, like the Astro build, so every host serves it.
  trailingSlash: true,
  // Images are resized ahead of time by scripts/prepare-assets.mjs (AVIF/WebP).
  images: { unoptimized: true },
  experimental: {
    // English (/) and Malayalam (/ml/) have their own root layouts, so their
    // <html lang> is right; the 404 page sits outside both.
    globalNotFound: true,
  },
};

export default nextConfig;
