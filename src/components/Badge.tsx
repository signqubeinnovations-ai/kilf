import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

/** Small square label, e.g. "Proposed" or "Subject to confirmation". */
const tones = {
  coral: 'bg-coral-soft text-coral-deep',
  lime: 'bg-lake-soft text-navy',
  sky: 'bg-lake-soft text-navy',
  outline: 'ring-1 ring-inset ring-current text-muted',
  dark: 'bg-white/10 text-lake ring-1 ring-inset ring-white/25',
};

export default function Badge({ tone = 'coral', className = '', children }: { tone?: keyof typeof tones; className?: string; children: ReactNode }) {
  return <span className={cx('inline-flex items-center gap-1 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]', tones[tone], className)}>{children}</span>;
}
