import { logoUrl } from '@/lib/images';
import { cx } from '@/lib/cx';

/**
 * KILF logo. Drop the real file at kilf-assets/logos/kilf-logo.svg (and
 * kilf-logo-white.svg for dark backgrounds) and it replaces this stand-in:
 * a lowercase "kilf" wordmark with "2027" set vertically beside it.
 * The stand-in draws in currentColor, so it follows the header's colour.
 */
interface Props {
  tone?: 'light' | 'dark';
  className?: string;
  /** Hide from AT when the parent link supplies the name. */
  decorative?: boolean;
}

export default function Logo({ tone = 'light', className = '', decorative = false }: Props) {
  const file = logoUrl(tone === 'dark' ? 'kilf-logo-white' : 'kilf-logo');
  if (file) return <img src={file} alt={decorative ? '' : 'KILF 2027'} className={cx('h-10 w-auto', className)} width="96" height="44" />;
  return (
    <svg
      viewBox="0 0 92 44"
      className={cx('h-10 w-auto', className)}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : 'KILF 2027, Kollam International Literature Festival'}
    >
      <text
        x="-1"
        y="36"
        fontFamily="Plus Jakarta Sans Variable, Plus Jakarta Sans, sans-serif"
        fontWeight="800"
        fontSize="46"
        letterSpacing="-2.6"
        textLength="70"
        lengthAdjust="spacingAndGlyphs"
        fill="currentColor"
      >
        kilf
      </text>
      <text
        transform="translate(76.5 3.5) rotate(90)"
        fontFamily="Manrope Variable, Manrope, sans-serif"
        fontWeight="800"
        fontSize="11.5"
        letterSpacing="0.9"
        textLength="33"
        lengthAdjust="spacingAndGlyphs"
        fill="currentColor"
        className="logo-year"
      >
        2027
      </text>
    </svg>
  );
}
