import Rings from './Rings';
import CountdownBehavior from './behaviors/CountdownBehavior';
import { site } from '@/lib/site';
import { cx } from '@/lib/cx';
import { useTranslations, type Lang } from '@/i18n/ui';

/**
 * A small, quiet countdown to the first page: days, hours and minutes, in
 * one line. Rendered at build time; a tiny script keeps it current. Once the
 * festival starts it says so.
 */
export default function MiniCountdown({ lang, className = '' }: { lang: Lang; className?: string }) {
  const t = useTranslations(lang);
  const left = Math.max(0, new Date(site.startISO).getTime() - Date.now());
  const d = Math.floor(left / 86400000);
  const h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const unit = (s: string) => s.toLowerCase();
  return (
    <p
      className={cx('flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted', className)}
      data-countdown
      data-target={site.startISO}
      data-live={t('countdown.live')}
      suppressHydrationWarning
    >
      <Rings n={1} size={24} tone="cobalt" />
      <span>{t('countdown.title')}</span>
      <span className="font-bold tabular-nums text-navy">
        <span data-d>{d}</span> {unit(t('countdown.days'))} · <span data-h>{h}</span> {unit(t('countdown.hours'))} · <span data-m>{m}</span> {unit(t('countdown.minutes'))}
      </span>
      <CountdownBehavior />
    </p>
  );
}
