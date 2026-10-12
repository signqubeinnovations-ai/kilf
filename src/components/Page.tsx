import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { setPage } from '@/lib/page';
import { eventJsonLd } from '@/lib/meta';
import { useTranslations, isTranslated } from '@/i18n/ui';

/**
 * Every page's frame (the old BaseLayout): skip link, header, main, footer
 * and any JSON-LD. Metadata comes from pageMetadata() in each route.
 */
interface Props {
  /** The page's URL path, e.g. "/ml/about". */
  pathname: string;
  /** Include the festival Event JSON-LD. */
  event?: boolean;
  /** Extra JSON-LD objects for this page. */
  jsonLd?: Record<string, unknown>[];
  /** The page opens with a dark hero: the header floats over it until scroll. */
  overlayHeader?: boolean;
  children: ReactNode;
}

export default function Page({ pathname, event = false, jsonLd = [], overlayHeader = false, children }: Props) {
  const { lang, path } = setPage(pathname);
  const t = useTranslations(lang);
  const fallback = lang === 'ml' && !isTranslated(path);
  const ld = [...(event ? [eventJsonLd()] : []), ...jsonLd];
  return (
    <>
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(obj).replace(/</g, '\\u003c') }} />
      ))}
      <a href="#main" className="sr-only z-[100] bg-cobalt px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {t('nav.skip')}
      </a>
      <Header lang={lang} path={path} overlay={overlayHeader && !fallback} />
      <main id="main" tabIndex={-1} className="outline-none">
        {fallback && (
          <div className="border-b border-line bg-lake-soft" lang="ml">
            <p className="container-kilf py-3 text-sm text-navy">{t('fallback.notice')}</p>
          </div>
        )}
        <div lang={fallback ? 'en' : undefined}>{children}</div>
      </main>
      <Footer lang={lang} closing={path !== '/'} />
    </>
  );
}
