import 'server-only';
import { cache } from 'react';
import { parsePath, type Lang } from '@/i18n/ui';

/**
 * The page being rendered: its language and language-neutral path. Each page
 * sets it once (via <Page>), and any server component below can read it,
 * much like Astro.url did before. React's cache() keeps it per request, so
 * pages built in parallel never see each other's values.
 */
type PageInfo = { lang: Lang; path: string; pathname: string };

const store = cache((): { current: PageInfo } => ({ current: { lang: 'en', path: '/', pathname: '/' } }));

export function setPage(pathname: string) {
  const { lang, path } = parsePath(pathname);
  store().current = { lang, path, pathname };
  return store().current;
}

export const getPage = () => store().current;
