import type { MetadataRoute } from 'next';
import { abs } from '@/lib/site';
import { getSpeakers } from '@/lib/content';
import { hasBio } from '@/lib/speakers';
import { localizePath, translatedPaths } from '@/i18n/ui';

export const dynamic = 'force-static';

// English pages, plus the Malayalam pages that are translated (the others are
// noindexed until they are; see translatedPaths in src/i18n/ui.ts).
const pages = ['/', '/about', '/cause', '/contact', '/faq', '/get-involved', '/khasak', '/partners', '/passes', '/privacy', '/programme', '/speakers', '/visit', '/youth'];

export default function sitemap(): MetadataRoute.Sitemap {
  const speakers = getSpeakers()
    .filter((s) => hasBio(s.body))
    .map((s) => `/speakers/${s.id}`);
  return [...pages, ...speakers]
    .map((path) => {
      const translated = translatedPaths.includes(path);
      return {
        url: abs(localizePath(path, 'en')),
        alternates: translated ? { languages: { en: abs(localizePath(path, 'en')), ml: abs(localizePath(path, 'ml')) } } : undefined,
      };
    })
    .concat(
      translatedPaths.map((path) => ({
        url: abs(localizePath(path, 'ml')),
        alternates: { languages: { en: abs(localizePath(path, 'en')), ml: abs(localizePath(path, 'ml')) } },
      })),
    );
}
