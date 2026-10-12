import type { CSSProperties } from 'react';
import type { ImageSet } from '@/lib/images';

/**
 * A responsive <picture>: AVIF and WebP sources with a JPG fallback, from the
 * variants scripts/prepare-assets.mjs made. `widths` narrows the sizes offered.
 */
interface Props {
  set: ImageSet;
  alt: string;
  sizes?: string;
  widths?: number[];
  className?: string;
  pictureClassName?: string;
  style?: CSSProperties;
  priority?: boolean;
}

export default function Picture({ set, alt, sizes = '100vw', widths, className, pictureClassName, style, priority = false }: Props) {
  const keep = set.widths.map((w) => !widths || widths.includes(w));
  const srcset = (urls: string[]) =>
    urls
      .map((u, i) => (keep[i] ? `${u} ${set.widths[i]}w` : ''))
      .filter(Boolean)
      .join(', ');
  const fallbackFormat = set.formats.includes('jpg') ? 'jpg' : set.formats[set.formats.length - 1];
  const fallback = set.src[fallbackFormat]!;
  const largest = fallback[fallback.length - 1];
  const loading = {
    loading: priority ? ('eager' as const) : ('lazy' as const),
    fetchPriority: priority ? ('high' as const) : ('auto' as const),
    decoding: priority ? ('sync' as const) : ('async' as const),
  };
  return (
    <picture className={pictureClassName}>
      {set.formats
        .filter((f) => f !== fallbackFormat)
        .map((f) => (
          <source key={f} srcSet={srcset(set.src[f]!)} type={`image/${f}`} sizes={sizes} />
        ))}
      <img src={largest} srcSet={srcset(fallback)} alt={alt} sizes={sizes} width={set.width} height={set.height} className={className} style={style} {...loading} />
    </picture>
  );
}
