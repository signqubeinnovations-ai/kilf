import MotionBehavior from './behaviors/MotionBehavior';
import { cx } from '@/lib/cx';
import { useTranslations, type Lang } from '@/i18n/ui';

/**
 * "Pause the lake": stills every moving thing on the site (WCAG 2.2.2). The
 * choice is remembered on this device; all toggles on a page stay in sync.
 */
export default function MotionToggle({ tone = 'dark', className = '', lang = 'en' }: { tone?: 'light' | 'dark'; className?: string; lang?: Lang }) {
  const t = useTranslations(lang);
  return (
    <>
      <button
        type="button"
        data-motion-toggle
        data-pause={t('motion.pause')}
        data-play={t('motion.play')}
        aria-pressed="false"
        className={cx(
          'inline-flex min-h-11 shrink-0 items-center gap-2.5 whitespace-nowrap px-4 text-sm font-medium transition-colors',
          tone === 'dark' ? 'text-white ring-1 ring-inset ring-white/35 hover:bg-white/10' : 'text-navy ring-1 ring-inset ring-navy/30 hover:bg-navy/5',
          className,
        )}
      >
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path data-icon-pause d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />
          <path data-icon-play d="M8 5.5v13l10.5-6.5Z" fill="currentColor" className="hidden" />
        </svg>
        <span data-label>{t('motion.pause')}</span>
      </button>
      <MotionBehavior />
    </>
  );
}
