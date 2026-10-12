import ChapterLabel from '@/components/ChapterLabel';
import Headline from '@/components/Headline';
import Icon from '@/components/Icon';
import LakeArt from '@/components/LakeArt';
import LimeButton from '@/components/LimeButton';
import TextLink from '@/components/TextLink';
import Placeholder from '@/components/Placeholder';
import Rings from '@/components/Rings';
import Divider from '@/components/Divider';
import CauseArt from '@/components/CauseArt';
import { site } from '@/lib/site';
import { useTranslations, localizePath, type Lang, type UIKey } from '@/i18n/ui';
import { cx } from '@/lib/cx';

interface Props {
  lang: Lang;
}

export default function Cause(props: Props) {
  const { lang } = props;
  const t = useTranslations(lang);
  const lp = (p: string) => localizePath(p, lang);
  const ml = lang === 'ml';

  const commitments = [
    ['home.cause.c1', 'cause.c1.d'],
    ['home.cause.c2', 'cause.c2.d'],
    ['home.cause.c3', 'cause.c3.d'],
  ] as const;
  const steps = ['cause.join.s1', 'cause.join.s2', 'cause.join.s3'] as const;
  const tips = [
    ['wave', 'cause.t1'],
    ['books', 'cause.t2'],
    ['bus', 'cause.t3'],
    ['leaf', 'cause.t4'],
  ] as const;
  const volunteer = lp('/get-involved#volunteer');
  return (
    <>
      {/* Hero: the cause, and the karimeen in clear water */}
      <section className="bg-cream pb-20 pt-14 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24" aria-labelledby="cause-h">
        <div className="container-kilf grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ChapterLabel label={t('nav.cause')} />
            <Headline as="h1" size="xl" id="cause-h" text={t('home.cause.h')} coral={t('home.cause.coral')} className="mt-8" />
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-muted">{t('cause.lead')}</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <LimeButton href={volunteer} label={t('cause.join.cta')} size="lg" />
              <TextLink href="#commitments" label={t('cause.c.label')} arrow="→" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <CauseArt className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      {/* The lake */}
      <section className="bg-lake-soft py-24 sm:py-28 lg:py-32" aria-labelledby="lake-h">
        <div className="container-kilf">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ChapterLabel label={t('cause.lake.label')} />
              <Headline id="lake-h" text={t('cause.lake.h')} accent={t('cause.lake.accent')} className="mt-6" />
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-navy/85 lg:col-span-7">
              <p className="text-navy">{t('cause.lake.p1')}</p>
              <p>{t('cause.lake.p2')}</p>
              <p>{t('cause.lake.p3')}</p>
            </div>
          </div>
          <figure className="mt-14">
            <LakeArt
              art="jetty"
              sizes="(min-width: 1280px) 1120px, 100vw"
              focus={[0.62, 0.5]}
              className="aspect-[4/3] w-full rounded-[1.25rem] sm:aspect-[2/1] lg:aspect-[2.6/1]"
            />
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-navy/80">
              <Rings n={1} size={24} tone="cobalt" />
              {t('home.hero.lakeCaption')}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Commitments */}
      <section id="commitments" className="scroll-mt-24 bg-cream py-24 sm:py-28 lg:py-32" aria-labelledby="commit-h">
        <div className="container-kilf grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <ChapterLabel label={t('cause.c.label')} />
            <Headline id="commit-h" text={t('cause.c.h')} accent={t('cause.c.accent')} className="mt-6" />
            <p className="mt-6 max-w-sm text-[1.02rem] leading-relaxed text-muted">{t('cause.c.note')}</p>
          </div>
          <ul className="border-t border-line lg:col-span-7">
            {commitments.map(([title, text], i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-7">
                <Rings n={1} size={30} tone="cobalt" className="mt-1.5" />
                <div>
                  <h3 className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-display text-[1.4rem] leading-tight tracking-[-0.03em]">
                    {t(title as UIKey)}
                    <span className="text-sm font-bold tracking-normal text-muted" lang="en">
                      <Placeholder value="[CONFIRM]" />
                    </span>
                  </h3>
                  <p className="mt-2 max-w-xl text-muted">{t(text as UIKey)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Join the clean-up */}
      <section className="bg-cream pb-24 sm:pb-28 lg:pb-32" aria-labelledby="join-h">
        <Divider />
        <div className="container-kilf pt-20 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <ChapterLabel label={t('cause.join.label')} />
              <Headline id="join-h" text={t('cause.join.h')} accent={t('cause.join.accent')} className="mt-6" />
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{t('cause.join.p')}</p>
              <dl className="mt-9 max-w-md border-t border-line">
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="eyebrow pt-1 text-navy">{t('cause.join.when')}</dt>
                  <dd className="font-bold text-navy" lang="en">
                    <Placeholder value="[DATE]" />
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="eyebrow pt-1 text-navy">{t('cause.join.where')}</dt>
                  <dd className="text-navy">
                    {t('cause.join.whereNote')}{' '}
                    <span className="font-bold" lang="en">
                      <Placeholder value="[CONFIRM]" />
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="lg:col-span-7">
              <ol className="border-t border-line">
                {steps.map((key, i) => (
                  <li key={i} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-7 sm:grid-cols-[4rem_1fr]">
                    <span className="numeral text-[2.2rem] leading-none text-cobalt">{i + 1}</span>
                    <div>
                      <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.03em]">{t(`${key}.t` as UIKey)}</h3>
                      <p className="mt-2 text-muted">{t(`${key}.d` as UIKey)}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <LimeButton href={volunteer} label={t('cause.join.cta')} size="lg" className="mt-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Leave no trace */}
      <section className="bg-lake-soft py-24 sm:py-28 lg:py-32" aria-labelledby="trace-h">
        <div className="container-kilf">
          <ChapterLabel label={t('cause.trace.label')} />
          <Headline id="trace-h" text={t('cause.trace.h')} accent={t('cause.trace.accent')} className="mt-6" />
          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map(([icon, key], i) => (
              <li key={i} className="border-t border-navy/15 pt-6">
                <Icon name={icon} size={28} className="text-cobalt" />
                <h3 className="mt-6 font-display text-[1.3rem] leading-tight tracking-[-0.03em]">{t(`${key}.t` as UIKey)}</h3>
                <p className="mt-2 text-navy/80">{t(`${key}.d` as UIKey)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Support */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="container-kilf">
          <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-8 sm:flex-row sm:items-center">
            <p className={cx('max-w-xl text-lg', ml && 'leading-relaxed')}>
              {t('cause.support')}{' '}
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent('KILF 2027: supporting the cause')}`}
                className="font-bold text-cobalt underline decoration-1 underline-offset-4 hover:text-navy"
                lang="en"
              >
                {site.email}
              </a>
            </p>
            <LimeButton href={lp('/partners')} label={t('cause.support.link')} variant="ghost" />
          </div>
        </div>
      </section>
    </>
  );
}
