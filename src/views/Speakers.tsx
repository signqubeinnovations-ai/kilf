import { byOrder, getSpeakers } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import SpeakerCard from '@/components/SpeakerCard';
import Badge from '@/components/Badge';
import ChapterLabel from '@/components/ChapterLabel';
import Headline from '@/components/Headline';
import LimeButton from '@/components/LimeButton';
import TextLink from '@/components/TextLink';
import Rings from '@/components/Rings';
import { site } from '@/lib/site';
import { hasBio } from '@/lib/speakers';
import { localizePath, headings, type Lang } from '@/i18n/ui';
import SpeakerFilterBehavior from '@/components/behaviors/SpeakerFilterBehavior';
import { cx } from '@/lib/cx';

interface Props {
  lang: Lang;
}

export default function Speakers(props: Props) {
  const { lang } = props;
  const h = headings(lang);
  const speakers = byOrder(getSpeakers());
  const filters = [
    ['all', 'All'],
    ['literature', 'Literature'],
    ['cinema', 'Cinema'],
    ['music', 'Music'],
    ['history-ideas', 'History & Ideas'],
  ];
  return (
    <>
      <PageHero label={h('Voices', 'ശബ്ദങ്ങൾ')} text={h('Voices without', 'അതിരുകളില്ലാത്ത')} accent={h('borders.', 'ശബ്ദങ്ങൾ.')} lang={h.lang}>
        <p className="mt-8 flex flex-wrap items-center gap-3 text-base text-muted">
          <Badge>Proposed line-up</Badge> Participation subject to confirmation.
        </p>
      </PageHero>

      <Section tone="cream" className="!pt-0" labelledby="speakers-list-h">
        <h2 id="speakers-list-h" className="sr-only" lang={h.lang}>
          {h('All speakers', 'എല്ലാ പ്രഭാഷകരും')}
        </h2>
        <div className="-mx-5 overflow-x-auto border-y border-line px-5 py-4 sm:mx-0 sm:px-0" data-filter-bar>
          <ul className="flex gap-2" aria-label="Filter speakers by strand">
            {filters.map(([value, label], i) => (
              <li key={i}>
                <button
                  type="button"
                  data-filter={value}
                  aria-pressed={i === 0 ? 'true' : 'false'}
                  className="min-h-11 whitespace-nowrap px-5 text-sm font-bold text-navy ring-1 ring-inset ring-navy/30 transition-colors hover:bg-navy/5 aria-pressed:bg-navy aria-pressed:text-white aria-pressed:ring-navy"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="sr-only" aria-live="polite" data-filter-status></p>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12" data-speaker-grid>
          {speakers.map((s, i) => (
            <SpeakerCard
              key={i}
              id={s.id}
              name={s.data.name}
              role={s.data.role}
              photo={s.data.photo}
              note={s.data.note}
              categories={s.data.categories}
              href={hasBio(s.body) ? localizePath(`/speakers/${s.id}`, lang) : undefined}
            />
          ))}
          <li className="list-none" data-categories="always">
            <div className="flex aspect-[4/5] flex-col items-start justify-end rounded-[1.25rem] border border-dashed border-navy/25 p-5">
              <Rings n={3} size={56} tone="cobalt" />
              <span className="mt-4 max-w-[10rem] font-display text-lg font-extrabold leading-tight tracking-[-0.02em]">More voices to be announced</span>
            </div>
          </li>
        </ul>
        <p className="mt-12 max-w-2xl text-sm text-muted">
          The line-up above is proposed. Names appear as invitations are extended; participation is subject to confirmation. Follow our updates to be first to know.
        </p>
      </Section>

      {/* How the line-up comes together */}
      <Section tone="cream" rule labelledby="lineup-h">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ChapterLabel label={h('The line-up', 'നിര')} lang={h.lang} />
            <Headline id="lineup-h" text={h('Masters and', 'മഹാരഥന്മാരും')} accent={h('first-time voices.', 'പുതിയ ശബ്ദങ്ങളും.')} lang={h.lang} className="mt-6" />
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-navy/85">
              KILF brings together novelists, poets, historians, filmmakers, lyricists and musicians, the names Kerala grew up reading and the voices it is only beginning to hear.
              Invitations go out strand by strand, and new names will join this page as they confirm.
            </p>
            <dl className="mt-10 grid border-t border-line sm:grid-cols-3">
              {[
                ['Literature', 'Novelists, poets and critics'],
                ['Cinema & music', 'Directors, composers and lyricists'],
                ['History & ideas', 'Historians, travellers and thinkers'],
              ].map(([t, d], i) => (
                <div key={i} className={cx('border-b border-line py-6', i > 0 && 'sm:border-l sm:pl-6')}>
                  <dt className="eyebrow text-navy">{t}</dt>
                  <dd className="mt-2 text-muted">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Suggest a voice */}
      <section className="bg-lake-soft text-navy" aria-labelledby="suggest-h">
        <div className="container-kilf grid items-end gap-8 py-24 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:py-32">
          <div>
            <ChapterLabel label={h('Suggest a voice', 'ഒരു ശബ്ദം നിർദ്ദേശിക്കാം')} lang={h.lang} />
            <Headline id="suggest-h" text={h('Who would you', 'ആരെയാണ് നിങ്ങൾക്ക്')} accent={h('like to hear?', 'കേൾക്കേണ്ടത്?')} lang={h.lang} className="mt-6" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/80">
              A writer you admire, a poet from your town, a thinker Kerala should listen to. Tell us who, and why. Every suggestion is read by the programme team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
            <LimeButton href={`mailto:${site.email}?subject=${encodeURIComponent('Speaker suggestion for KILF 2027')}`} label="Suggest a speaker" size="lg" />
            <TextLink href={localizePath('/programme', lang)} label="See the programme" />
          </div>
        </div>
      </section>

      <SpeakerFilterBehavior />
    </>
  );
}
