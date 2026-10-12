import { byOrder, getSchedule, getTeasers } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ChapterLabel from '@/components/ChapterLabel';
import Headline from '@/components/Headline';
import StrandGrid from '@/components/blocks/StrandGrid';
import NotifyBanner from '@/components/blocks/NotifyBanner';
import Schedule from '@/components/blocks/Schedule';
import Icon from '@/components/Icon';
import Badge from '@/components/Badge';
import { useTranslations, headings, type Lang, type UIKey } from '@/i18n/ui';

interface Props {
  lang: Lang;
}

export default function Programme(props: Props) {
  const { lang } = props;
  const t = useTranslations(lang);
  const h = headings(lang);
  const teasers = byOrder(getTeasers());
  const days = getSchedule();
  const hasSchedule = days.length > 0;
  const total = days.reduce((n, d) => n + d.data.sessions.length, 0);

  // A day at KILF: how a festival day flows, morning to night.
  const day = [
    ['sun', 'day.1'],
    ['books', 'day.2'],
    ['mask', 'day.3'],
    ['moon', 'day.4'],
  ] as const;
  const formats = [
    ['chat', 'Conversations', 'Two or three voices, one stage, and room for the audience to join in.'],
    ['book', 'Readings', 'Authors read from new and loved work, in Malayalam and English.'],
    ['users', 'Panels', 'Questions Kerala keeps asking: history, faith, media and society.'],
    ['pen', 'Workshops', 'Small, hands-on sessions on writing, illustration and storytelling.'],
    ['mask', 'Performances', 'Theatre, music and spoken word, on stage and by the lake.'],
    ['film', 'Screenings', 'Films that began as books, followed by talks with their makers.'],
  ];
  return (
    <>
      <PageHero
        label={h('Programme', 'പരിപാടികൾ')}
        text={h('Follow a thought.', 'ഒരു ചിന്തയെ പിന്തുടരൂ.')}
        accent={h('Find a festival.', 'ഒരു ഉത്സവം കണ്ടെത്തൂ.')}
        lang={h.lang}
        lead={
          hasSchedule
            ? 'Five days on the shore of Ashtamudi, from New Year’s Eve to 4 January: conversations, readings, films, music, theatre and a youth stage.'
            : 'We won’t tell you everything yet. Here is a glimpse of what the five days hold.'
        }
      >
        {hasSchedule && (
          <p className="mt-8 flex flex-wrap items-center gap-3 text-base text-muted">
            <Badge>Proposed programme</Badge> Sessions, times and speakers are subject to confirmation.
          </p>
        )}
      </PageHero>

      {hasSchedule ? (
        <Section tone="cream" className="!overflow-visible !pt-0" labelledby="schedule-h">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <ChapterLabel label={h('The programme', 'പരിപാടിപ്പട്ടിക')} lang={h.lang} />
              <Headline id="schedule-h" text={h('Five days.', 'അഞ്ചു ദിവസം.')} accent={h(`${total} sessions.`, `${total} സെഷനുകൾ.`)} lang={h.lang} className="mt-6" />
            </div>
            <p className="max-w-md text-lg leading-relaxed text-muted">Pick a day, or follow a strand across all five. The ★ marks the sessions not to miss.</p>
          </div>
          <div className="mt-10">
            <Schedule days={days} lang={lang} />
          </div>
        </Section>
      ) : (
        <Section tone="cream" className="!pt-0" labelledby="teasers-h">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <ChapterLabel label={h('A glimpse', 'ഒരു നോട്ടം')} lang={h.lang} />
              <Headline id="teasers-h" text={h('Six moments', 'കാത്തിരിക്കാൻ')} accent={h('to look for.', 'ആറു നിമിഷങ്ങൾ.')} lang={h.lang} className="mt-6" />
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">The full programme, with dates, times and venues, will be unveiled soon.</p>
            </div>
            <ul className="border-t border-line lg:col-span-8">
              {teasers.map((item, i) => (
                <li key={i} className="border-b border-line py-7 sm:py-9">
                  <h3 className="font-display text-[1.7rem] leading-tight tracking-[-0.03em] text-navy sm:text-[2rem]">{item.data.title}</h3>
                  <p className="mt-2 text-[1.05rem] leading-relaxed text-muted">{item.data.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {/* A day at KILF: morning to night */}
      <section className="bg-lake-soft py-24 sm:py-28 lg:py-32" aria-labelledby="day-h">
        <div className="container-kilf" lang={h.lang}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <ChapterLabel label={t('day.chapter')} />
              <Headline id="day-h" text={t('day.h')} accent={t('day.accent')} lang={h.lang} className="mt-6" />
            </div>
            <p className="max-w-sm text-[0.98rem] leading-relaxed text-navy/80">
              {hasSchedule ? t('day.note') : <span lang="en">An indicative day. The full programme will set the times for every session.</span>}
            </p>
          </div>
          <ol className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {day.map(([icon, key], i) => (
              <li key={i} className="border-t border-navy/15 py-8">
                <p className="eyebrow flex items-center gap-3 text-navy">
                  <Icon name={icon} size={22} className="text-cobalt" />
                  {t(`${key}.t` as UIKey)}
                </p>
                <h3 className="mt-6 font-display text-[1.4rem] leading-tight tracking-[-0.03em]">{t(`${key}.h` as UIKey)}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-navy/80">{t(`${key}.d` as UIKey)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section tone="cream" id="strands" labelledby="strands-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ChapterLabel label={h('Strands', 'ധാരകൾ')} lang={h.lang} />
            <Headline id="strands-h" text={h('Nine strands.', 'ഒമ്പതു ധാരകൾ.')} accent={h('One shore.', 'ഒരേ തീരം.')} lang={h.lang} className="mt-6" />
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted">Follow the one you love, or wander into one you never expected.</p>
        </div>
        <div className="mt-12">
          <StrandGrid lang={lang} />
        </div>
      </Section>

      {/* Formats */}
      <Section tone="cream" rule labelledby="formats-h">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ChapterLabel label={h('Formats', 'രൂപങ്ങൾ')} lang={h.lang} />
            <Headline id="formats-h" text={h('Six ways', 'ഒരു മണിക്കൂർ')} accent={h('to spend an hour.', 'ചെലവിടാൻ ആറു വഴികൾ.')} lang={h.lang} className="mt-6" />
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              Most sessions are in Malayalam, with several in English and some bilingual.{' '}
              {hasSchedule ? 'Every session in the programme lists its language.' : 'The full programme will list the language of every session.'}
            </p>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {formats.map(([icon, title, line], i) => (
              <li key={i} className="flex gap-5 border-t border-line py-7">
                <Icon name={icon} size={26} className="mt-1 shrink-0 text-cobalt" />
                <div>
                  <h3 className="font-display text-xl tracking-[-0.02em]">{title}</h3>
                  <p className="mt-1.5 text-muted">{line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {!hasSchedule && (
        <NotifyBanner
          id="notify"
          formName="programme-notify"
          kicker="Coming soon"
          text={h('The full programme,', 'മുഴുവൻ പരിപാടിപ്പട്ടിക,')}
          accent={h('first to you.', 'ആദ്യം നിങ്ങൾക്ക്.')}
          headingLang={h.lang}
          lead="Dates, times and venues for every session. Leave your details and we’ll send it to you first."
        />
      )}
    </>
  );
}
