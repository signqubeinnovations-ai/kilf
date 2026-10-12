import type { ReactNode } from 'react';
import Picture from './Picture';
import { arts } from '@/lib/lake-art';
import { asset } from '@/lib/images';
import { cx } from '@/lib/cx';

/**
 * One of the festival's lake illustrations, still: a responsive <picture>.
 * (The home hero adds its one ripple and the karimeen in HeroLake.)
 */
interface Props {
  art: 'hero' | 'jetty';
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** object-position, 0–1 on each axis. */
  focus?: [number, number];
  /** Classes for the <img>, e.g. responsive object-position; replaces `focus` for the picture. */
  imgClass?: string;
  alt?: string;
  children?: ReactNode;
}

export default function LakeArt({ art, className = '', sizes = '100vw', priority = false, focus = [0.5, 0.5], alt, imgClass, children }: Props) {
  const a = arts[art];
  return (
    <div className={cx('relative isolate overflow-hidden bg-lake-soft', className)}>
      <Picture
        set={asset(a.img)}
        alt={alt ?? a.alt}
        sizes={sizes}
        className={cx('absolute inset-0 size-full object-cover', imgClass)}
        style={imgClass ? undefined : { objectPosition: `${focus[0] * 100}% ${focus[1] * 100}%` }}
        priority={priority}
      />
      {children}
    </div>
  );
}
