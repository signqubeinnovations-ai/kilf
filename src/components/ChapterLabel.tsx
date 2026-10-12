import Rings from './Rings';
import { cx } from '@/lib/cx';

/**
 * Section label: a single ripple ring and a few words in capitals. No
 * numbers: sections are not a sequence.
 */
interface Props {
  label: string;
  tone?: 'light' | 'dark' | 'lime' | 'coral';
  className?: string;
  /** Language of the label, when it differs from the page. */
  lang?: string;
}

export default function ChapterLabel({ label, tone = 'light', className = '', lang }: Props) {
  const color = { light: 'text-navy', dark: 'text-white/85', lime: 'text-navy', coral: 'text-navy' }[tone];
  const ring = tone === 'dark' ? 'lake' : 'cobalt';
  return (
    <p className={cx('eyebrow inline-flex items-center gap-3', color, className)} lang={lang}>
      <Rings n={1} size={26} tone={ring} />
      {label}
    </p>
  );
}
