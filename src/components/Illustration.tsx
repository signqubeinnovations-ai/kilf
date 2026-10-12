import Picture from './Picture';
import { asset } from '@/lib/images';

/**
 * Responsive illustration from kilf-assets/ (or its generated stand-in),
 * served as AVIF/WebP via <picture>. Lazy-loaded unless `priority`.
 */
interface Props {
  src: string; // path inside kilf-assets, e.g. "illustrations/cover.jpg"
  alt: string;
  widths?: number[];
  sizes?: string;
  className?: string;
  pictureClassName?: string;
  priority?: boolean;
}

export default function Illustration({ src, alt, widths, sizes = '100vw', className, pictureClassName, priority = false }: Props) {
  return <Picture set={asset(src)} alt={alt} widths={widths} sizes={sizes} className={className} pictureClassName={pictureClassName} priority={priority} />;
}
