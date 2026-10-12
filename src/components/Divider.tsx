import Rings from './Rings';
import { cx } from '@/lib/cx';

/** A quiet break between sections: a hairline with three ripple rings at its centre. */
export default function Divider({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  const line = cx('h-px flex-1', tone === 'dark' ? 'bg-white/15' : 'bg-line');
  return (
    <div className={cx('container-kilf flex items-center gap-6', className)} aria-hidden="true">
      <span className={line}></span>
      <Rings n={3} size={52} tone="lake" />
      <span className={line}></span>
    </div>
  );
}
