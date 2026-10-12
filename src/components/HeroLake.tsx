import type { CSSProperties, ReactNode } from 'react';
import Picture from './Picture';
import Karimeen from './Karimeen';
import { arts } from '@/lib/lake-art';
import { asset } from '@/lib/images';
import { cx } from '@/lib/cx';

/**
 * The home hero's lake: still. One orchestrated moment, all CSS
 * (src/styles/components.css):
 * - a karimeen surfaces once, soon after the page opens;
 * - every six seconds a single ripple spreads from the open book, over the
 *   water only (clipped to the water's outline, so it never crosses the book).
 * A "stage" box is cropped exactly like the picture (object-fit: cover at the
 * same object-position, via --px/--py), so both stay pinned to the artwork at
 * every screen size. "Pause the lake" and reduced motion stop them.
 */
interface Props {
  className?: string;
  /** Classes for the <img>: object-position per breakpoint. */
  imgClass?: string;
  /** Classes setting --px/--py (0–1) to match the <img>'s object-position. */
  stageClass?: string;
  sizes?: string;
  children?: ReactNode;
}

const W = 3600;
const H = 1857;
// Where the ripple starts: the water just behind the open book, where the karimeen surfaced.
const ripple = { x: 0.705 * W, y: 0.492 * H };
// Where the karimeen breaks the surface (as fractions of the picture). Its
// jump is drawn in picture units (1/3600 of the picture's width) around
// that point, and scaled a little larger on small screens.
const fish = { x: 0.7, y: 0.47 };
const splash = [
  { x: 34, d: 1.9 },
  { x: 280, d: 3.1 },
];

export default function HeroLake({ className = '', imgClass = '', stageClass = '', sizes = '100vw', children }: Props) {
  const a = arts.hero;
  // The water outline, pulled a touch away from the jetty's edge so no ring ever touches the planks.
  const water = a.mask.map(([x, y]) => `${Math.round(x * W)},${Math.round((x > 0.74 && y > 0.4 && y < 0.6 ? y - 0.018 : y) * H)}`).join(' ');
  return (
    <div className={cx('hero-lake relative isolate overflow-hidden bg-lake-soft', className)}>
      <Picture set={asset(a.img)} alt={a.alt} sizes={sizes} className={cx('absolute inset-0 size-full object-cover', imgClass)} priority />
      <div className={cx('hero-stage', stageClass)} aria-hidden="true">
        <svg className="absolute inset-0 size-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <clipPath id="hero-water">
              <polygon points={water} />
            </clipPath>
          </defs>
          <g clipPath="url(#hero-water)" fill="none" stroke="#fcfaf3" strokeLinecap="round">
            {[0, 1, 2].map((i) => (
              <ellipse key={i} className="hero-ring" cx={ripple.x} cy={ripple.y} rx="520" ry="100" style={{ '--i': i } as CSSProperties} />
            ))}
          </g>
        </svg>
        <div className="fish-at" style={{ left: `${fish.x * 100}%`, top: `${fish.y * 100}%` }}>
          <svg className="fish-splash" viewBox="-300 -60 900 120">
            <g fill="none" stroke="#fcfaf3" strokeLinecap="round">
              {splash.map((s) => (
                <ellipse key={s.x} className="fish-ring" cx={s.x} cy="0" rx="230" ry="46" style={{ '--d': `${s.d}s` } as CSSProperties} />
              ))}
            </g>
          </svg>
          <div className="fish-wrap">
            <div className="fish">
              <Karimeen uid="hero" className="block h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
