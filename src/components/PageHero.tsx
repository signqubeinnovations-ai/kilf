import type { ReactNode } from 'react';
import ChapterLabel from './ChapterLabel';
import Headline from './Headline';
import { cx } from '@/lib/cx';

/**
 * Header for inner pages: a label beside a ripple ring, one calm headline
 * (the second line in cobalt, at most one coral word), and a short lead.
 * Still: three faint rings on the water to the right, nothing moving.
 */
interface Props {
  label: string;
  text?: string;
  accent: string;
  lead?: string;
  /** One word in the headline to set in coral. */
  coral?: string;
  tone?: 'cream' | 'blue' | 'lime';
  /** Language of the headline, when it differs from the page (translated headlines on /ml/). */
  lang?: string;
  children?: ReactNode;
}

export default function PageHero({ label, text, accent, lead, coral, tone = 'cream', lang, children }: Props) {
  const dark = tone === 'blue';
  const bg = { cream: 'bg-cream text-navy', blue: 'bg-night text-white on-dark', lime: 'bg-lake-soft text-navy' }[tone];
  return (
    <section className={cx('relative overflow-hidden pb-14 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24', bg)}>
      <svg className="pointer-events-none absolute -right-24 top-1/2 hidden w-[34rem] -translate-y-1/2 md:block" viewBox="0 0 400 240" aria-hidden="true">
        <g fill="none" stroke="#a9c4ea" strokeOpacity={dark ? 0.35 : 0.7} strokeWidth="1.2">
          <ellipse cx="200" cy="120" rx="46" ry="26" />
          <ellipse cx="200" cy="120" rx="104" ry="58" />
          <ellipse cx="200" cy="120" rx="170" ry="96" />
        </g>
      </svg>
      <div className="container-kilf relative">
        <ChapterLabel label={label} lang={lang} tone={dark ? 'dark' : 'light'} />
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Headline as="h1" size="xl" text={text} accent={accent} coral={coral} lang={lang} tone={dark ? 'blue' : 'light'} className="lg:col-span-8" />
          {lead && <p className={cx('max-w-md text-lg leading-relaxed lg:col-span-4 lg:pb-3', dark ? 'text-white/85' : 'text-muted')}>{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
