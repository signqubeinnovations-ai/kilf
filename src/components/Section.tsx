import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

/** Page section: generous space on a calm surface (cream, pale lake, or night for the evenings). */
interface Props {
  tone?: 'cream' | 'white' | 'sky' | 'navy' | 'blue' | 'lime' | 'coral' | 'ink';
  /** A hairline across the top of the content, between two cream sections. */
  rule?: boolean;
  id?: string;
  className?: string;
  inner?: string;
  labelledby?: string;
  as?: 'section' | 'div';
  backdrop?: ReactNode;
  children?: ReactNode;
}

const tones = {
  cream: 'bg-cream text-navy',
  white: 'bg-cream text-navy',
  sky: 'bg-lake-soft text-navy',
  navy: 'bg-night text-white on-dark',
  ink: 'bg-night text-white on-dark',
  blue: 'bg-cobalt text-white on-dark',
  lime: 'bg-lake-soft text-navy',
  coral: 'bg-lake-soft text-navy',
};

export default function Section({ tone = 'cream', rule = false, id, className = '', inner = '', labelledby, as: Tag = 'section', backdrop, children }: Props) {
  return (
    <Tag id={id} aria-labelledby={labelledby} className={cx('relative overflow-hidden', rule ? 'pb-20 sm:pb-28 lg:pb-32' : 'py-20 sm:py-28 lg:py-32', tones[tone], className)}>
      {backdrop}
      <div className={cx('container-kilf relative', inner)}>
        {rule && <div className="mb-20 border-t border-line sm:mb-28 lg:mb-32" aria-hidden="true"></div>}
        {children}
      </div>
    </Tag>
  );
}
