import { byOrder, getPasses } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ChapterLabel from '@/components/ChapterLabel';
import Headline from '@/components/Headline';
import LimeButton from '@/components/LimeButton';
import TextLink from '@/components/TextLink';
import Rings from '@/components/Rings';
import NotifyBanner from '@/components/blocks/NotifyBanner';
import { localizePath, headings, type Lang } from '@/i18n/ui';
import { cx } from '@/lib/cx';

interface Props {
  lang: Lang;
}

export default function Passes(props: Props) {
  const { lang } = props;
  const lp = (p: string) => localizePath(p, lang);
  const h = headings(lang);
  const passes = byOrder(getPasses());
  const guide = [
    ['Coming for one day?', 'Day Pass · ₹299', 'Pick your day: sessions, the book fair and the lakeside evening.', '#notify'],
    ['Staying for the whole story?', 'Festival Pass · ₹499', 'All five days, from the midnight chapter on New Year’s Eve to the final page.', '#notify'],
    ['A student or young reader?', 'Young Reader Pass · ₹199', 'All five days for students. Bring your college ID.', '#notify'],
    ['Here for the play?', 'Theatre ticket · ₹1,500', 'A seat at Khasakkinte Ithihasam on 1, 2 or 3 January, on its own.', '/khasak#tickets'],
    ['The play and all five days?', 'Theatre + Festival Pass · ₹1,600', 'A seat at the play and a Festival Pass, together: the festival for ₹100 more.', '/khasak#tickets'],
  ];
  const questions = [
    ['When do passes go on sale?', 'Ticketing opens soon. Leave your details below and we’ll tell you the moment passes and theatre tickets go on sale.'],
    ['Is the play included in the Festival Pass?', 'No. Khasakkinte Ithihasam is ticketed separately. Choose a theatre ticket on its own, or the theatre + Festival Pass bundle.'],
    [
      'Are there passes for students?',
      'Yes: the Young Reader Pass is ₹199 for all five days, with your college ID. Colleges can also register on the Youth page to bring a group.',
    ],
    [
      'How much do passes cost?',
      'A Day Pass is ₹299, the Festival Pass ₹499 for all five days, and the Young Reader Pass ₹199 for students. Khasakkinte Ithihasam is ₹1,500, or ₹1,600 with a Festival Pass. Nothing is on sale yet, and no payment is taken until ticketing opens.',
    ],
  ];
  return (
    <>
      <PageHero
        label={h('Passes', 'പാസുകൾ')}
        text={h('Your seat by the', 'കായലോരത്ത്')}
        accent={h('lake.', 'നിങ്ങളുടെ ഇരിപ്പിടം.')}
        lang={h.lang}
        lead="Five days by the lake from ₹199. Ticketing opens soon: register early and we’ll tell you the moment passes go on sale."
      />

      <Section tone="cream" className="!pt-0" labelledby="passes-h">
        <h2 id="passes-h" className="sr-only" lang={h.lang}>
          {h('Pass types', 'പാസുകൾ')}
        </h2>
        <ul className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {passes.map((p) => {
            const hi = p.data.highlighted;
            return (
              <li key={p.id} className={cx('flex flex-col border-t-2 p-7 sm:p-9', hi ? 'border-cobalt bg-lake-soft' : 'border-navy/15 bg-cream')}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow text-muted">{p.data.audience}</p>
                  {hi && <span className="bg-cobalt px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white">Most complete</span>}
                </div>
                <h3 className="display mt-8 text-[2.2rem] sm:text-[2.5rem]">{p.data.name}</h3>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{p.data.description}</p>
                {p.data.price && (
                  <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="numeral text-[3.4rem] leading-none text-cobalt sm:text-[3.8rem]">{p.data.price}</span>
                    {p.data.priceNote && <span className="text-[0.95rem] text-muted">{p.data.priceNote}</span>}
                  </p>
                )}
                <ul className="mt-7 flex-1 border-t border-navy/10">
                  {p.data.includes.map((inc, i) => (
                    <li key={i} className="flex items-center gap-3 border-b border-navy/10 py-3 text-[0.98rem]">
                      <Rings n={1} size={20} tone="cobalt" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-9">
                  {p.data.price && p.data.buyUrl ? (
                    <LimeButton href={p.data.buyUrl} label={`Buy · ${p.data.price}`} className="w-full" external />
                  ) : (
                    <>
                      <p className="eyebrow mb-4 text-muted">On sale soon</p>
                      <LimeButton href="#notify" label="Notify me" variant={hi ? 'primary' : 'ghost'} className="w-full justify-between" />
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-2xl text-sm text-muted">
          Prices in Indian rupees. Inclusions are indicative and will be confirmed when ticketing opens. Some sessions may have limited seating. Khasakkinte Ithihasam is ticketed
          separately.
        </p>
      </Section>

      {/* Which pass is for me? */}
      <Section tone="cream" rule labelledby="guide-h">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ChapterLabel label={h('Choosing', 'തിരഞ്ഞെടുക്കാൻ')} lang={h.lang} />
            <Headline id="guide-h" text={h('Which pass', 'എനിക്ക്')} accent={h('is for me?', 'ഏതു പാസ്?')} lang={h.lang} className="mt-6" />
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">Five ways to come to KILF 2027. Find the line that sounds like you.</p>
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {guide.map(([q, name, line, href], i) => (
              <li key={i} className="border-b border-line">
                <a href={href.startsWith('#') ? href : lp(href)} className="group grid gap-x-6 gap-y-1 py-6 sm:grid-cols-[1fr_1.1fr_auto] sm:items-baseline">
                  <span className="text-[1.02rem] text-muted">{q}</span>
                  <span>
                    <span className="block font-display text-[1.4rem] font-extrabold leading-tight tracking-[-0.03em] text-navy transition-colors group-hover:text-cobalt">
                      {name}
                    </span>
                    <span className="mt-1 block text-[0.98rem] leading-relaxed text-muted">{line}</span>
                  </span>
                  <span aria-hidden="true" className="hidden text-xl text-cobalt sm:block">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* The play is ticketed separately: an evening at the theatre */}
      <section className="on-dark relative overflow-hidden bg-night text-white" aria-labelledby="theatre-h">
        <div className="container-kilf grid items-center gap-12 py-24 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:py-32">
          <div>
            <ChapterLabel label={h('Signature theatre', 'സവിശേഷ നാടകം')} lang={h.lang} tone="dark" />
            <Headline id="theatre-h" text={h('The play is', 'നാടകത്തിന്')} accent={h('ticketed separately.', 'പ്രത്യേകം ടിക്കറ്റ്.')} lang={h.lang} tone="dark" className="mt-6" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Khasakkinte Ithihasam needs its own ticket: three evenings at Ashramam Maidan, on 1, 2 and 3 January. Choose a theatre ticket on its own, or add all five days of the
              festival for ₹100 more.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <LimeButton href={lp('/khasak#tickets')} label="Theatre tickets" size="lg" />
              <TextLink href={lp('/khasak')} label="About the play" tone="dark" />
            </div>
          </div>
          <ul className="border-t border-white/15">
            <li className="flex items-end justify-between gap-6 border-b border-white/15 py-6">
              <div>
                <p className="eyebrow text-white/70">Theatre ticket</p>
                <p className="mt-2 font-display text-xl font-extrabold tracking-[-0.02em]">Khasakkinte Ithihasam only</p>
              </div>
              <p className="numeral text-[2.4rem] leading-none text-white">₹1,500</p>
            </li>
            <li className="flex items-end justify-between gap-6 border-b border-white/15 py-6">
              <div>
                <p className="eyebrow text-white/70">Theatre + Festival Pass</p>
                <p className="mt-2 font-display text-xl font-extrabold tracking-[-0.02em]">The play, plus all five days</p>
              </div>
              <p className="numeral text-[2.4rem] leading-none text-lake">₹1,600</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Ticketing questions */}
      <Section tone="cream" labelledby="questions-h">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <ChapterLabel label={h('Questions', 'ചോദ്യങ്ങൾ')} lang={h.lang} />
            <Headline id="questions-h" text={h('Ticketing,', 'ടിക്കറ്റുകൾ,')} accent={h('answered.', 'ഉത്തരങ്ങൾ.')} lang={h.lang} className="mt-6" />
            <TextLink href={lp('/faq')} label="All questions" className="mt-8" />
          </div>
          <dl className="border-t border-line lg:col-span-8">
            {questions.map(([q, a], i) => (
              <div key={i} className="border-b border-line py-7">
                <dt className="font-display text-[1.25rem] font-extrabold tracking-[-0.02em] text-navy">{q}</dt>
                <dd className="mt-2 max-w-2xl text-[1.02rem] leading-relaxed text-muted">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <NotifyBanner
        id="notify"
        formName="passes-notify"
        kicker="Ticketing opens soon"
        text={h('Be first in line', 'പാസുകൾ എത്തുമ്പോൾ')}
        accent={h('for passes.', 'ആദ്യം അറിയാം.')}
        headingLang={h.lang}
        lead="Register early and we’ll tell you the moment passes go on sale."
        lang={lang}
        extraField={{
          name: 'pass',
          label: 'Pass you’re interested in',
          options: ['Day Pass', 'Festival Pass', 'Young Reader Pass', 'Theatre ticket', 'Theatre + Festival Pass', 'Not sure yet'],
        }}
      />
    </>
  );
}
