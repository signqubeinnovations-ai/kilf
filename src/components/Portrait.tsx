import type { ReactNode } from 'react';
import { findImage } from '@/lib/images';
import { cx } from '@/lib/cx';

/**
 * A speaker portrait in a rounded rectangle (4:5), lazy-loaded. Until the
 * illustrated portrait is in kilf-assets/speakers/<slug>.jpg, a calm stand-in
 * shows a figure by the water (no initials).
 */
interface Props {
  name: string;
  photo: string;
  sizes?: string;
  widths?: number[];
  className?: string;
  eager?: boolean;
  tone?: 'light' | 'dark';
  children?: ReactNode;
}

// Close lake tints, so a grid of stand-ins doesn't look cloned.
const tints = ['#eaf1fb', '#e3ecf9', '#edf2fb'];

export default function Portrait({
  name,
  photo,
  sizes = '(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw',
  widths = [320, 480, 640],
  className = '',
  eager = false,
  tone = 'light',
  children,
}: Props) {
  const img = findImage(`speakers/${photo}`);
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
  const moodFill = tints[hash % tints.length];
  const dark = tone === 'dark';
  let srcSet = '';
  let src = '';
  if (img) {
    const urls = img.src.webp ?? img.src.jpg ?? [];
    const keep = img.widths.map((w, i) => (widths.includes(w) || img.widths.length === 1 ? `${urls[i]} ${w}w` : '')).filter(Boolean);
    srcSet = (keep.length ? keep : img.widths.map((w, i) => `${urls[i]} ${w}w`)).join(', ');
    src = urls[urls.length - 1];
  }
  return (
    <div className={cx('relative aspect-[4/5] overflow-hidden rounded-[1.25rem]', dark ? 'bg-night' : 'bg-lake-soft', className)}>
      {img ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={`Portrait of ${name}`}
          width={img.width}
          height={img.height}
          className="size-full object-cover transition-transform duration-700 ease-[var(--ease-calm)] group-hover:scale-[1.03]"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <div className="absolute inset-0" role="img" aria-label={`Portrait of ${name} (to come)`}>
          {/* Until the illustrated portrait arrives: a figure by the water, three rings at its feet. */}
          <svg className="absolute inset-0 size-full" viewBox="0 0 200 250" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <rect width="200" height="250" fill={dark ? '#101b62' : moodFill} />
            <g fill="none" stroke={dark ? '#a9c4ea' : '#ffffff'} strokeOpacity={dark ? 0.35 : 0.9} strokeWidth="1.2">
              <ellipse cx="100" cy="236" rx="40" ry="8" />
              <ellipse cx="100" cy="236" rx="72" ry="14" />
              <ellipse cx="100" cy="236" rx="104" ry="20" />
            </g>
            <g fill={dark ? '#1f3fd8' : '#a9c4ea'}>
              <circle cx="100" cy="98" r="34" />
              <path d="M34 250c0-52 30-86 66-86s66 34 66 86z" />
            </g>
          </svg>
        </div>
      )}
      {children}
    </div>
  );
}
