import type { ReactNode } from 'react';
import Analytics from './Analytics';
import type { Lang } from '@/i18n/ui';
import '@/styles/global.css';

/**
 * <html> and <body> for both root layouts (English at /, Malayalam at /ml/),
 * so each page has the right <html lang>.
 */
// Before first paint: mark that JavaScript runs, and restore "Pause the lake".
const boot = `(function(){var d=document.documentElement;d.classList.add('has-js');try{if(localStorage.getItem('kilf-motion')==='paused')d.dataset.motion='paused'}catch(e){}})();`;

export default function Document({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="sitemap" href="/sitemap.xml" />
        <Analytics />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
