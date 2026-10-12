import type { CSSProperties, ReactNode } from 'react';
import Stopped from './Stopped';
import { cx } from '@/lib/cx';
import { getPage } from '@/lib/page';
import { isTranslated } from '@/i18n/ui';

/**
 * Headline in Plus Jakarta Sans 800 with tight tracking: a first line in the
 * surface's text colour and an optional second line (`accent`) in cobalt (lake
 * blue on dark). `coral` names one word to set in coral: at most one per headline.
 */
interface Props {
  text?: string;
  accent?: string;
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  tone?: 'light' | 'dark' | 'blue' | 'coral' | 'lime';
  /** Kept for older call sites; the accent is always a calm colour now. */
  accentStyle?: 'color' | 'gradient' | 'soft';
  accentColor?: 'coral' | 'blue' | 'lime' | 'navy';
  /** One word (in `text` or `accent`) to set in coral. */
  coral?: string;
  /** Keep the accent on the same line (default: its own line). */
  inline?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
  lang?: string;
  [key: `data-${string}`]: unknown;
}

const sizes = {
  xl: 'text-[2.6rem] sm:text-[3.8rem] lg:text-[4.6rem]',
  lg: 'text-[2.1rem] sm:text-[2.8rem] lg:text-[3.3rem]',
  md: 'text-[1.7rem] sm:text-[2.1rem] lg:text-[2.4rem]',
  sm: 'text-xl sm:text-2xl',
};
// Malayalam words run long: set translated Malayalam headlines a step smaller.
const mlSizes = {
  xl: 'text-[2.1rem] sm:text-[3rem] lg:text-[3.6rem]',
  lg: 'text-[1.8rem] sm:text-[2.4rem] lg:text-[2.8rem]',
  md: 'text-[1.5rem] sm:text-[1.85rem] lg:text-[2.1rem]',
  sm: 'text-xl sm:text-2xl',
};

export default function Headline({
  text = '',
  accent = '',
  as: Tag = 'h2',
  size = 'lg',
  tone = 'light',
  accentStyle = 'color',
  accentColor,
  coral,
  inline = false,
  className = '',
  style,
  id,
  lang,
  ...rest
}: Props) {
  const page = getPage();
  const mlText = lang === 'ml' || (page.lang === 'ml' && isTranslated(page.path));
  const base = { light: 'text-navy', dark: 'text-white', blue: 'text-white', coral: 'text-navy', lime: 'text-navy' }[tone];
  const onDark = tone === 'dark' || tone === 'blue';
  const colorFor = {
    coral: onDark ? 'text-coral' : 'text-coral-text',
    blue: onDark ? 'text-lake' : 'text-cobalt',
    lime: onDark ? 'text-lake' : 'text-cobalt',
    navy: onDark ? 'text-white' : 'text-navy',
  };
  const accentClass = accentStyle === 'soft' ? 'font-medium opacity-90' : accentColor ? colorFor[accentColor] : onDark ? 'text-lake' : 'text-cobalt';

  // Set the one coral word, if it appears; a closing full stop sits a touch closer.
  const render = (s: string): ReactNode => {
    const i = coral ? s.indexOf(coral) : -1;
    if (!coral || i === -1) return <Stopped text={s} />;
    const after = s.slice(i + coral.length);
    return (
      <>
        {s.slice(0, i)}
        <span className="coral-word">{coral}</span>
        {after && <Stopped text={after} />}
      </>
    );
  };

  return (
    <Tag id={id} lang={lang} style={style} className={cx('display', (mlText ? mlSizes : sizes)[size], base, onDark && 'on-dark', className)} {...rest}>
      {text && render(text)}
      {text && accent ? inline ? ' ' : <br /> : null}
      {accent && <span className={accentClass}>{render(accent)}</span>}
    </Tag>
  );
}
