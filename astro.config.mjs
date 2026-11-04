// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';

// Case studies stay out of the sitemap (and are noindexed) until `confirmed: true`.
const dir = './src/content/projects';
const unconfirmed = fs.readdirSync(dir).filter((f) => f.endsWith('.md') && !/^confirmed:\s*true/m.test(fs.readFileSync(`${dir}/${f}`, 'utf8'))).map((f) => `/projects/${f.replace(/\.md$/, '')}/`);

// Set SITE_URL in Netlify/Vercel once the domain is live (e.g. https://facado.in).
// It drives canonical URLs, Open Graph tags and the sitemap.
const site = process.env.SITE_URL || 'https://facado.netlify.app';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !/\/(404|privacy)\/?$/.test(path) && !unconfirmed.includes(path);
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
