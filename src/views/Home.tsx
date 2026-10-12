import { getSpeakers } from '@/lib/content';
import ChapterLabel from '@/components/ChapterLabel';
import Headline from '@/components/Headline';
import LimeButton from '@/components/LimeButton';
import TextLink from '@/components/TextLink';
import SpeakerCard from '@/components/SpeakerCard';
import Badge from '@/components/Badge';
import MotionToggle from '@/components/MotionToggle';
import HeroLake from '@/components/HeroLake';
import MiniCountdown from '@/components/MiniCountdown';
import Illustration from '@/components/Illustration';
import Placeholder from '@/components/Placeholder';
import Rings from '@/components/Rings';
import Stopped from '@/components/Stopped';
import Divider from '@/components/Divider';
import CauseArt from '@/components/CauseArt';
import { site } from '@/lib/site';
import { hasBio } from '@/lib/speakers';
import { useTranslations, localizePath, type Lang } from '@/i18n/ui';
import { cx } from '@/lib/cx';

interface Props {
  lang: Lang;
}

export default function Home(props: Props) {
  const { lang } = props;
  const t = useTranslations(lang);
  const lp = (p: string) => localizePath(p, lang);
  const ml = lang === 'ml';

  // "The Pause." with its one coral word.
  const split = (line: string, word: string) => {
    const i = line.indexOf(word);
    return i === -1 ? [line, '', ''] : [line.slice(0, i), word, line.slice(i + word.length)];
  };
  const [pre, coralWord, post] = split(t('home.hero.line2'), t('home.hero.coral'));

  // Eight featured voices, in three groups.
  const speakers = getSpeakers();
  const bySlug = (slug: string) => speakers.find((s) => s.id === slug)!;
  const groups = [
    { label: t('home.voices.lit'), slugs: ['m-mukundan', 'sara-joseph', 's-hareesh'] },
    { label: t('home.voices.ideas'), slugs: ['manu-s-pillai', 'sri-m', 'santhosh-george-kulangara'] },
    { label: t('home.voices.screen'), slugs: ['lijo-jose-pellissery', 'vairamuthu'] },
  ].map((g) => ({ ...g, people: g.slugs.map(bySlug) }));

  // New Year's Eve, as it runs on the night (the programme has the details).
  const venue = (id: string) => site.venues.find((v) => v.id === id)!;
  const eve = [
    { time: '17:00', what: t('home.nye.r1'), at: venue('sngcc') },
    { time: '18:15', what: t('home.nye.r2'), at: venue('ashramam') },
    { time: '19:00', what: t('home.nye.r3'), at: venue('8point') },
    { time: '20:30', what: t('home.nye.r4'), at: venue('ashramam'), star: true },
    { time: '23:45', what: t('home.nye.r5'), at: venue('ashramam') },
    { time: '00:00', what: t('home.nye.r6'), at: venue('ashramam') },
  ];
  const commitments = [t('home.cause.c1'), t('home.cause.c2'), t('home.cause.c3')];
  return (
    <>
      {/* 1 · Hero: a still lake. One ripple from the open book every six seconds; a karimeen surfaces once. */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cream text-navy lg:min-h-[min(100svh,64rem)]" data-hero aria-labelledby="hero-h">
        <div className="hero-art relative order-2 h-[22rem] sm:h-[30rem] lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
          <HeroLake
            sizes="(max-width: 639px) 194vw, (max-width: 1023px) 160vw, (max-aspect-ratio: 97/50) 194vh, 100vw"
            imgClass="object-[74%_100%] sm:object-[82%_100%] lg:object-[100%_100%]"
            stageClass="[--px:0.74] [--py:1] sm:[--px:0.82] lg:[--px:1]"
            className="size-full"
          />
          <div className="hero-mist pointer-events-none absolute inset-0" aria-hidden="true"></div>
        </div>

        <div className="container-kilf relative order-1 flex flex-col justify-center pb-8 pt-[calc(var(--hh)+2.5rem)] lg:flex-1 lg:pb-28 lg:pt-[calc(var(--hh)+3rem)]">
          <div className="max-w-[46rem]">
            <h1 id="hero-h">
              <span
                className={cx(
                  'display block',
                  ml ? 'text-[2.6rem] leading-[1.15] sm:text-[3.6rem] lg:text-[4.2rem]' : 'text-[3.1rem] leading-[0.98] sm:text-[4.5rem] lg:text-[5.4rem]',
                )}
              >
                {t('home.hero.line1')}
                <br />
                {pre}
                <span className="coral-word">{coralWord}</span>
                {post === '.' ? <span className="stop">.</span> : post}
              </span>
              <span className="mt-5 block font-display text-[1.3rem] font-extrabold leading-snug tracking-[-0.02em] text-navy sm:text-[1.6rem]">{t('home.hero.name')}</span>
            </h1>
            <p className="mt-3 text-lg text-muted">
              {t('site.dates')} · {t('home.hero.kollam')}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <LimeButton href={lp('/passes')} label={t('cta.getPass')} size="lg" />
              <TextLink href={lp('/programme')} label={t('cta.explore')} />
            </div>
            <MiniCountdown lang={lang} className="mt-9" />
          </div>
        </div>

        <div className="container-kilf pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-end pb-4 sm:pb-7">
          <div className="pointer-events-auto flex items-center gap-3 bg-cream/90 py-1.5 pl-4 pr-1.5 backdrop-blur-sm">
            <span className="eyebrow hidden text-[0.66rem] sm:inline">{t('home.hero.lakeCaption')}</span>
            <MotionToggle lang={lang} tone="light" />
          </div>
        </div>
      </section>

      {/* 2 · The Pause */}
      <section className="bg-cream py-24 sm:py-32 lg:py-40" aria-labelledby="pause-h">
        <div className="container-kilf">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow inline-flex items-center gap-3 text-navy">
              <Rings n={1} size={26} tone="cobalt" />
              {t('home.pause.label')}
            </p>
            <h2 id="pause-h" className={cx('display mt-8', ml ? 'text-[2.1rem] sm:text-[2.8rem] lg:text-[3.3rem]' : 'text-[2.4rem] sm:text-[3.4rem] lg:text-[4rem]')}>
              <Stopped text={t('home.pause.h')} />
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted sm:text-[1.4rem]">{t('home.pause.body')}</p>
            <p className="mt-10 font-display text-[1.6rem] font-extrabold tracking-[-0.03em] text-cobalt sm:text-[2rem]">{t('home.pause.second')}</p>
            <Rings n={3} size={96} tone="lake" className="mx-auto mt-16" />
            <p className="mx-auto mt-8 max-w-xl text-[1.05rem] leading-relaxed text-navy">
              <span className="eyebrow mb-2 block text-muted">{t('home.pause.whyLabel')}</span>
              {t('home.pause.why')}
            </p>
          </div>
        </div>
      </section>

      {/* 3 · New Year's Eve: Turn the page */}
      <section className="on-dark relative overflow-hidden bg-night text-white" aria-labelledby="nye-h">
        {/* Night water along the bottom edge: a horizon line and three rings, below the text. */}
        <svg className="pointer-events-none absolute bottom-0 left-0 hidden w-[26rem] opacity-60 lg:block" viewBox="0 0 300 70" aria-hidden="true">
          <line x1="0" x2="300" y1="6" y2="6" stroke="#a9c4ea" strokeOpacity="0.35" />
          <g fill="none" stroke="#a9c4ea" strokeOpacity="0.45" strokeWidth="1.2">
            <ellipse cx="120" cy="46" rx="24" ry="6" />
            <ellipse cx="120" cy="46" rx="52" ry="12" />
            <ellipse cx="120" cy="46" rx="84" ry="19" />
          </g>
        </svg>
        <div className="container-kilf relative grid gap-14 py-24 sm:py-28 lg:grid-cols-12 lg:gap-16 lg:py-32">
          <div className="lg:col-span-5">
            <ChapterLabel label={t('home.nye.chapter')} tone="dark" />
            <Headline id="nye-h" text={t('home.nye.turn')} coral={t('home.nye.turnCoral')} tone="dark" size="xl" className="mt-6" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85">{t('home.nye.story')}</p>
            <p className="mt-6 max-w-md text-[0.98rem] text-white/75">{t('home.nye.included')}</p>
            <TextLink href={lp('/programme#day-2026-12-31')} label={t('home.nye.link')} tone="dark" className="mt-8" />
          </div>
          <div className="lg:col-span-7 lg:pt-4">
            <p className="eyebrow text-white/70">{t('home.nye.run')} · 31.12.2026</p>
            <ol className="mt-4 border-t border-white/15">
              {eve.map((e, i) => (
                <li key={i} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-5 gap-y-1 border-b border-white/15 py-4 sm:grid-cols-[5rem_1fr_auto]">
                  <span className={cx('font-display text-[1.25rem] font-extrabold tabular-nums tracking-[-0.02em]', e.star ? 'text-coral' : 'text-white')}>{e.time}</span>
                  <span className={cx('text-[1.05rem]', e.star ? 'font-bold text-white' : 'text-white/85')}>{e.what}</span>
                  <span className="col-start-2 flex items-center gap-2 text-sm text-white/65 sm:col-start-auto" lang="en">
                    <Rings n={e.at.rings as 1 | 2 | 3} size={30} tone="lake" label={`${t('home.plan.ringLabel')} ${e.at.rings}`} />
                    {e.at.name}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4 · Voices */}
      <section className="bg-cream py-24 sm:py-28 lg:py-32" aria-labelledby="voices-h">
        <div className="container-kilf">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <ChapterLabel label={t('home.voices.label')} />
              <Headline id="voices-h" text={t('home.voices.h')} className="mt-6" />
            </div>
            <p className="flex max-w-sm flex-wrap items-center gap-3 text-sm text-muted">
              <Badge>{t('home.khasak.proposed')}</Badge>
              {t('home.voices.proposed')}
            </p>
          </div>
          <div className="mt-14 space-y-14 lg:space-y-16">
            {groups.map((g, i) => (
              <div key={i} className="grid gap-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-10">
                <h3 className="eyebrow flex items-center gap-3 self-start text-navy lg:col-span-3">
                  <Rings n={1} size={24} tone="cobalt" />
                  {g.label}
                </h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:col-span-9 lg:gap-x-6">
                  {g.people.map((s, i) => (
                    <SpeakerCard
                      key={i}
                      id={`voice-${s.id}`}
                      name={s.data.name}
                      role={s.data.role}
                      photo={s.data.photo}
                      categories={s.data.categories}
                      href={hasBio(s.body) ? lp(`/speakers/${s.id}`) : lp(`/speakers#${s.id}`)}
                      lang="en"
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <TextLink href={lp('/speakers')} label={t('cta.seeSpeakers')} className="mt-14" />
        </div>
      </section>

      {/* 5 · Khasakkinte Ithihasam */}
      <section className="bg-lake-soft py-24 sm:py-28 lg:py-32" aria-labelledby="khasak-h">
        <div className="container-kilf grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-night lg:col-span-6">
            <Illustration
              src="illustrations/p4_stage.jpg"
              alt="A theatre stage under a single spotlight, a palm against a low coral moon."
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-3">
              <ChapterLabel label={t('home.khasak.chapter')} />
              <Badge>{t('home.khasak.proposed')}</Badge>
            </div>
            <Headline id="khasak-h" text={t('home.khasak.h')} accent={t('home.khasak.accent')} className="mt-6" />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{t('home.khasak.short')}</p>
            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-bold text-navy">
              <Rings n={3} size={36} tone="cobalt" label={`${t('home.plan.ringLabel')} 3`} />
              {t('home.khasak.where')} · {t('home.khasak.when')}
            </p>
            <p className="mt-2 text-[1.02rem] text-muted">{t('home.khasak.priceLine')}</p>
            <LimeButton href={lp('/khasak#tickets')} label={t('home.khasak.tickets')} size="lg" className="mt-9" />
          </div>
        </div>
      </section>

      {/* 6 · Our cause: Keep the waters alive */}
      <section className="bg-cream py-24 sm:py-28 lg:py-32" aria-labelledby="cause-h">
        <div className="container-kilf grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ChapterLabel label={t('home.cause.label')} />
            <Headline id="cause-h" text={t('home.cause.h')} coral={t('home.cause.coral')} size="xl" className="mt-6" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t('home.cause.body')}</p>
            <ul className="mt-10 max-w-xl border-t border-line">
              {commitments.map((c, i) => (
                <li key={i} className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line py-4">
                  <Rings n={1} size={24} tone="cobalt" />
                  <span className="font-display text-[1.15rem] font-bold tracking-[-0.02em] text-navy">{c}</span>
                  <Placeholder value="[CONFIRM]" />
                </li>
              ))}
            </ul>
            <TextLink href={lp('/cause')} label={t('home.cause.link')} className="mt-8" />
          </div>
          <div className="lg:col-span-5">
            <CauseArt className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      {/* 7 · Plan and join */}
      <section className="bg-cream pb-24 sm:pb-28 lg:pb-36" aria-labelledby="plan-h">
        <Divider />
        <div className="container-kilf pt-20 sm:pt-24">
          <ChapterLabel label={t('home.plan.label')} />
          <Headline id="plan-h" text={t('home.plan.h')} accent={t('home.plan.accent')} className="mt-6" />
          <ul className="mt-12 grid border-l border-t border-line sm:grid-cols-3">
            {site.venues.map((v, i) => (
              <li key={i} className="flex flex-col gap-5 border-b border-r border-line p-7 sm:p-8">
                <Rings n={v.rings as 1 | 2 | 3} size={72} tone="cobalt" label={`${t('home.plan.ringLabel')} ${v.rings}`} />
                <div lang="en">
                  <h3 className="font-display text-[1.3rem] font-extrabold leading-tight tracking-[-0.03em]">{v.name}</h3>
                  <p className="mt-1 text-muted">{v.area}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-2xl text-[0.98rem] text-muted">
            {t('home.plan.venues')}{' '}
            <a href={lp('/visit')} className="font-bold text-cobalt underline decoration-1 underline-offset-4 hover:text-navy">
              {t('cta.visit')}
            </a>
          </p>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="border-t border-line pt-8">
              <h3 className="font-display text-[1.6rem] font-extrabold tracking-[-0.03em]">{t('home.plan.passes')}</h3>
              <p className="mt-2 text-muted">{t('home.plan.passesLine')}</p>
              <TextLink href={lp('/passes')} label={t('home.plan.passesLink')} className="mt-5" />
            </div>
            <div className="border-t border-line pt-8">
              <h3 className="font-display text-[1.6rem] font-extrabold tracking-[-0.03em]">{t('home.plan.join')}</h3>
              <p className="mt-2 text-muted">{t('home.plan.joinLine')}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <LimeButton href={lp('/get-involved#register')} label={t('cta.register')} />
                <LimeButton href={lp('/get-involved#volunteer')} label={t('cta.volunteer')} variant="ghost" />
              </div>
            </div>
          </div>

          <p
            className={cx(
              'display mx-auto mt-28 max-w-4xl text-center',
              ml ? 'text-[1.7rem] min-[380px]:text-[2rem] sm:text-[2.8rem] lg:text-[3.3rem]' : 'text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]',
            )}
          >
            <Stopped text={t('footer.closing.h')} />
            <br />
            <span className="text-cobalt">
              <Stopped text={t('footer.closing.accent')} />
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
