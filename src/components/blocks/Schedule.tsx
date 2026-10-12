import { byOrder, getSpeakers, getStrands } from '@/lib/content';
import type { Entry, Day } from '@/lib/content';
import Icon from '../Icon';
import Rings from '../Rings';
import { site } from '@/lib/site';
import { localizePath, type Lang } from '@/i18n/ui';
import ScheduleBehavior from '@/components/behaviors/ScheduleBehavior';
import { cx } from '@/lib/cx';

interface Props {
  days: Entry<Day>[];
  lang: Lang;
}

/**
 * The day-by-day programme (src/content/schedule.json). Without JavaScript
 * every day is listed in turn; with it, the days become tabs, and the strand
 * chips filter the sessions. Speaker chips link to their notes on /speakers.
 * Each session shows its venue code in ripple rings (1, 2 or 3).
 */
export default function Schedule(props: Props) {
  const { days, lang } = props;
  const speakers = getSpeakers();
  const strands = byOrder(getStrands());
  const speaker = (slug: string) => speakers.find((s) => s.id === slug);
  const venueOf = (id: string) => site.venues.find((v) => v.id === id);
  // On /ml/ the day titles are in Malayalam.
  const ml = lang === 'ml';
  const theme = (d: Day) => (ml && d.theme_ml ? d.theme_ml : d.theme);
  const strandName = (id?: string) => (id === 'youth' ? 'Youth' : strands.find((s) => s.id === id)?.data.name);
  const formats = {
    conversation: 'Conversation',
    panel: 'Panel',
    reading: 'Reading',
    workshop: 'Workshop',
    performance: 'Performance',
    screening: 'Screening',
    walk: 'Walk',
    ceremony: 'Ceremony',
  } as const;
  const when = (date: string, o: Intl.DateTimeFormatOptions) => new Date(`${date}T12:00:00+05:30`).toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata', ...o });
  const sorted = [...days].sort((a, b) => a.data.date.localeCompare(b.data.date));
  const byTime = (list: Day['sessions']) => [...list].sort((a, b) => a.start.localeCompare(b.start));
  // Only the strands that actually appear, in their usual order.
  const present = new Set(sorted.flatMap((d) => d.data.sessions.map((s) => s.strand).filter(Boolean)));
  const filters = [...strands.map((s) => s.id), 'youth'].filter((id) => present.has(id));
  const total = sorted.reduce((n, d) => n + d.data.sessions.length, 0);
  return (
    <>
      <div data-schedule>
        <nav className="sticky top-[var(--hh)] z-30 -mx-5 border-b border-line bg-cream/95 px-5 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0" aria-label="Festival days">
          <ul className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]" data-tablist>
            {sorted.map((d, i) => (
              <li key={i} className="shrink-0">
                <a
                  href={`#day-${d.id}`}
                  data-tab={d.id}
                  className="day-tab flex min-h-16 items-center gap-3 px-4 py-2 text-navy ring-1 ring-inset ring-navy/15 transition-colors hover:bg-navy/5 sm:min-w-[12.5rem] sm:px-5"
                >
                  <span className="numeral text-[2.1rem] font-extrabold leading-none">{when(d.data.date, { day: '2-digit' })}</span>
                  <span className="leading-tight">
                    <span className="block text-[0.68rem] font-bold uppercase tracking-[0.16em] opacity-75">
                      {when(d.data.date, { month: 'short' })} · {when(d.data.date, { weekday: 'short' })}
                    </span>
                    <span className="block whitespace-nowrap text-[0.95rem] font-bold" lang={ml && d.data.theme_ml ? 'ml' : undefined}>
                      {theme(d.data).replace(/\.$/, '')}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" data-filter-bar hidden>
          <ul className="flex flex-wrap gap-2" aria-label="Filter sessions by strand">
            <li>
              <button type="button" data-strand-filter="all" aria-pressed="true" className="chip">
                All strands
              </button>
            </li>
            {filters.map((id, i) => (
              <li key={i}>
                <button type="button" data-strand-filter={id} aria-pressed="false" className="chip">
                  {strandName(id)}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted" aria-live="polite" data-filter-status>
            {total} sessions over {sorted.length} days
          </p>
        </div>

        {sorted.map((d) => {
          const list = byTime(d.data.sessions);
          const picks = list.filter((s) => s.highlight).length;
          return (
            <section key={d.id} id={`day-${d.id}`} className="day-panel scroll-mt-40 pt-14" data-day={d.id} aria-labelledby={`day-${d.id}-h`}>
              <header className="grid gap-8 border-b border-navy/15 pb-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <p className="eyebrow text-navy">
                    {d.data.label} · <time dateTime={d.data.date}>{when(d.data.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</time>
                  </p>
                  <h3
                    id={`day-${d.id}-h`}
                    className={cx(
                      'display mt-4 text-navy',
                      ml && d.data.theme_ml ? 'text-[1.75rem] min-[380px]:text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem]' : 'text-[2.7rem] sm:text-[3.8rem] lg:text-[4.4rem]',
                    )}
                    lang={ml && d.data.theme_ml ? 'ml' : undefined}
                  >
                    {theme(d.data)}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{d.data.blurb}</p>
                </div>
                <div className="self-end lg:col-span-5">
                  <p className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold text-navy">
                    <span>{list.length} sessions</span>
                    <span className="text-coral-ink">★ {picks} not to miss</span>
                  </p>
                  {d.data.allDay.length > 0 && (
                    <ul className="mt-4 border-t border-line text-[0.95rem]">
                      {d.data.allDay.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 border-b border-line py-3 text-navy">
                          <Icon name="clock" size={18} className="mt-0.5 shrink-0 text-cobalt" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </header>

              <ol className="sessions">
                {list.map((s, i) => (
                  <li
                    key={i}
                    className={cx('session grid gap-x-10 gap-y-3 border-b border-line py-8 sm:grid-cols-[7.5rem_1fr] lg:grid-cols-[8.5rem_1fr_16.5rem]', s.highlight && 'is-pick')}
                    data-strand={s.strand ?? 'none'}
                  >
                    <p className="flex items-baseline gap-2 sm:block">
                      <span className="numeral text-[2rem] font-extrabold leading-none text-navy">{s.start}</span>
                      <span className="text-sm text-muted sm:mt-2 sm:block">{s.end ? `to ${s.end}` : 'Evening'}</span>
                    </p>
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.72rem] font-bold uppercase tracking-[0.14em]">
                        {s.strand && <span className="text-navy">{strandName(s.strand)}</span>}
                        {s.format && <span className="text-muted">{formats[s.format]}</span>}
                        {s.highlight && <span className="bg-coral-soft px-2 py-1 text-coral-ink">★ Don’t miss</span>}
                      </p>
                      <h4 className="mt-3 max-w-2xl font-display text-[1.4rem] font-extrabold leading-snug tracking-[-0.025em] text-navy sm:text-[1.6rem]">{s.title}</h4>
                      {s.description && <p className="mt-2 max-w-2xl leading-relaxed text-muted">{s.description}</p>}
                      {s.speakers.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Speakers">
                          {s.speakers.map((slug) => {
                            const p = speaker(slug);
                            if (!p) return null;
                            return (
                              <li key={slug}>
                                <a
                                  href={localizePath(`/speakers#${slug}`, lang)}
                                  className="inline-flex min-h-11 items-center gap-2 bg-lake-soft px-4 py-1.5 text-navy transition-colors hover:bg-navy hover:text-white"
                                >
                                  <span className="size-1.5 shrink-0 rounded-full bg-current opacity-60" aria-hidden="true"></span>
                                  <span className="text-[0.92rem] font-bold">{p.data.name}</span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {s.guests.length > 0 && (
                        <p className="mt-3 text-[0.95rem] text-muted">
                          <span className="font-semibold text-navy">With </span>
                          {s.guests.join(' · ')}
                        </p>
                      )}
                      {s.link && (
                        <a href={localizePath(s.link.href, lang)} className="text-link mt-5 inline-flex min-h-11 items-end gap-2 font-bold text-cobalt hover:text-navy">
                          {s.link.label} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                    <p className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted sm:col-start-2 lg:col-start-auto lg:flex-col lg:items-end lg:text-right">
                      <span className="inline-flex items-center gap-2 lg:flex-row-reverse">
                        <Rings n={(venueOf(s.venue)?.rings ?? 1) as 1 | 2 | 3} size={30} tone="cobalt" label={`Venue code ${venueOf(s.venue)?.rings ?? ''}`} />
                        {venueOf(s.venue)?.name ?? s.venue}
                      </span>
                      {s.language && (
                        <span className="inline-flex items-start gap-1.5">
                          <Icon name="globe" size={16} className="mt-0.5 shrink-0" />
                          {s.language}
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="hidden py-10 text-lg text-muted" data-empty>
                No sessions in this strand on this day. Try another day, or all strands.
              </p>
            </section>
          );
        })}
      </div>

      <ScheduleBehavior />
    </>
  );
}
