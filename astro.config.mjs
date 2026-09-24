// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Set SITE_URL in your hosting provider (e.g. https://kilf.in). Used for
// canonical URLs, Open Graph tags, the sitemap and the footer QR code.
const site = process.env.SITE_URL || 'https://kilf.vercel.app';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  // Inline the (small) stylesheet so it never blocks first paint.
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // Malayalam pages that still fall back to English are noindexed, so keep
      // them out of the sitemap too (see translatedPaths in src/i18n/ui.ts).
      filter: (page) => {
        const path = new URL(page).pathname;
        if (path.includes('/404')) return false;
        if (path.startsWith('/ml/')) return ['/ml/', '/ml/about/'].includes(path);
        return true;
      },
      i18n: { defaultLocale: 'en', locales: { en: 'en-IN', ml: 'ml-IN' } },
    }),
  ],
  image: {
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
