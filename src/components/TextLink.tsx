import { cx } from '@/lib/cx';

/** Text link with an underline rule and a ↗, as in the print style. */
interface Props {
  href: string;
  label: string;
  tone?: 'light' | 'dark' | 'navy';
  className?: string;
  arrow?: '↗' | '→';
}

const tones = {
  light: 'text-cobalt hover:text-navy',
  dark: 'text-white hover:text-lake',
  navy: 'text-navy hover:text-cobalt',
};

export default function TextLink({ href, label, tone = 'light', className = '', arrow = '↗' }: Props) {
  return (
    <a href={href} className={cx('text-link group inline-flex min-h-11 items-end gap-2 font-bold', tones[tone], className)}>
      <span>{label}</span>
      <span aria-hidden="true" className="text-[0.85em] transition-transform duration-500 ease-[var(--ease-calm)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        {arrow}
      </span>
    </a>
  );
}
