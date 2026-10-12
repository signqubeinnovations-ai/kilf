import Karimeen from './Karimeen';
import SwimBehavior from './behaviors/SwimBehavior';
import { cx } from '@/lib/cx';

/**
 * "Keep the waters alive": the karimeen as a line drawing, above three
 * ripple rings. It swims with the page: as the card scrolls into view the
 * fish swims in from the left, tail swishing, bubbles rising, and settles in
 * the middle when the card does; scrolling on, it drifts a little further.
 * Without JavaScript, with reduced motion or with "Pause the lake" on, it
 * rests in the middle. Decorative.
 */
const bubbles = [
  [182, 44, 3.6],
  [190, 26, 2.8],
  [184, 10, 2],
];

export default function CauseArt({ className = '' }: { className?: string }) {
  return (
    <div className={cx('relative aspect-square overflow-hidden rounded-[1.5rem] bg-lake-soft', className)} data-swim aria-hidden="true">
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 400">
        <g className="swim-rings" fill="none" stroke="#a9c4ea" strokeWidth="2">
          <ellipse cx="200" cy="290" rx="64" ry="11" />
          <ellipse cx="200" cy="290" rx="118" ry="21" />
          <ellipse cx="200" cy="290" rx="172" ry="31" />
        </g>
      </svg>
      <div className="swim-fish absolute left-1/2 top-[44%] w-[64%]">
        <Karimeen uid="cause" className="block h-auto w-full" />
        {/* Bubbles from the fish's mouth, drawn in the fish's own units. */}
        <svg className="swim-bubbles absolute inset-0 size-full overflow-visible" viewBox="0 0 200 120">
          {bubbles.map(([x, y, r]) => (
            <circle key={y} className="bubble" cx={x} cy={y} r={r} fill="none" stroke="#13207a" strokeWidth="1.2" />
          ))}
        </svg>
      </div>
      <SwimBehavior />
    </div>
  );
}
