import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import ChapterLabel from '@/components/ChapterLabel';
import Headline from '@/components/Headline';
import Icon from '@/components/Icon';
import LakeArt from '@/components/LakeArt';
import LimeButton from '@/components/LimeButton';
import Rings from '@/components/Rings';
import TextLink from '@/components/TextLink';
import { aboutQA } from '@/i18n/about-qa';
import { site } from '@/lib/site';
import { useTranslations, localizePath, type Lang, type UIKey } from '@/i18n/ui';
import { cx } from '@/lib/cx';

interface Props {
  lang: Lang;
}

export default function About(props: Props) {
  const { lang } = props;
  const t = useTranslations(lang);
  const lp = (p: string) => localizePath(p, lang);
  const expect = [
    ['chat', 'about.e1'],
    ['books', 'about.e2'],
    ['mic', 'about.e3'],
    ['mask', 'about.e4'],
    ['bowl', 'about.e5'],
    ['moon', 'about.e6'],
  ] as const;
  const values = ['about.v1', 'about.v2', 'about.v3', 'about.v4'] as const;
  const matters = [
    ['anchor', 'about.m1'],
    ['calendar', 'about.m2'],
    ['scroll', 'about.m3'],
    ['leaf', 'about.m4'],
  ] as const;
  return (
    <>
      <PageHero label={t('about.chapter')} text={t('about.h')} accent={t('about.accent')}>
        <div className="mt-12 grid gap-6 border-t border-line pt-10 text-lg leading-relaxed md:grid-cols-2 md:gap-12">
          <p className="text-navy">{t('about.p1')}</p>
          <p className="text-muted">{t('about.p2')}</p>
        </div>
      </PageHero>

      {/* Why KILF: one idea, on still water */}
      <section className="bg-lake-soft py-24 sm:py-28 lg:py-36" aria-labelledby="vision-h">
        <div className="container-kilf">
          <div className="mx-auto max-w-3xl text-center">
            <ChapterLabel label={t('about.vision.chapter')} />
            <Headline id="vision-h" text={t('about.vision.h')} accent={t('about.vision.accent')} className="mt-8" />
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-navy/85">{t('about.vision.p')}</p>
            <Rings n={3} size={96} tone="cobalt" className="mx-auto mt-14" />
          </div>
        </div>
      </section>

      <Section tone="cream" labelledby="why-h">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <ChapterLabel label={t('about.why.chapter')} />
            <Headline id="why-h" text={t('about.why.h')} accent={t('about.why.accent')} className="mt-6" />
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-muted lg:col-span-6 lg:pb-2">{t('about.why.p')}</p>
        </div>
        <figure className="mt-12">
          <LakeArt art="jetty" sizes="(min-width: 1280px) 1120px, 100vw" focus={[0.62, 0.5]} className="aspect-[4/3] w-full rounded-[1.25rem] sm:aspect-[2/1] lg:aspect-[2.4/1]" />
          <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted">
            <Rings n={1} size={24} tone="cobalt" />
            {t('home.hero.lakeCaption')}
          </figcaption>
        </figure>
      </Section>

      <Section tone="cream" rule labelledby="matters-h">
        <ChapterLabel label={lang === 'ml' ? 'കൊല്ലം' : 'Kollam'} />
        <Headline id="matters-h" text={t('about.matters.h')} accent={t('about.matters.accent')} className="mt-6" />
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {matters.map(([icon, key], i) => (
            <li key={i} className="border-t border-line pt-6">
              <Icon name={icon} size={28} className="text-cobalt" />
              <h3 className="mt-6 font-display text-[1.3rem] leading-tight tracking-[-0.03em] text-navy">{t(`${key}.t` as UIKey)}</h3>
              <p className="mt-2 text-muted">{t(`${key}.d` as UIKey)}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* What to expect */}
      <Section tone="cream" rule labelledby="expect-h">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ChapterLabel label={t('about.expect.chapter')} />
            <Headline id="expect-h" text={t('about.expect.h')} accent={t('about.expect.accent')} className="mt-6" />
          </div>
          <TextLink href={lp('/programme')} label={t('day.link')} />
        </div>
        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {expect.map(([icon, key], i) => (
            <li key={i} className="flex gap-5 border-t border-line py-7">
              <Icon name={icon} size={28} className="mt-0.5 shrink-0 text-cobalt" />
              <div>
                <h3 className="font-display text-[1.25rem] tracking-[-0.03em]">{t(`${key}.t` as UIKey)}</h3>
                <p className="mt-1.5 text-muted">{t(`${key}.d` as UIKey)}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* What we believe */}
      <Section tone="cream" rule labelledby="values-h">
        <ChapterLabel label={t('about.values.chapter')} />
        <Headline id="values-h" text={t('about.values.h')} accent={t('about.values.accent')} className="mt-6" />
        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((key, i) => (
            <li key={i} className="border-t border-line pt-6">
              <Rings n={1} size={30} tone="cobalt" />
              <h3 className="mt-5 font-display text-[1.3rem] leading-tight tracking-[-0.03em]">{t(`${key}.t` as UIKey)}</h3>
              <p className="mt-2 text-muted">{t(`${key}.d` as UIKey)}</p>
              {key === 'about.v4' && <TextLink href={lp('/cause')} label={t('home.cause.link')} className="mt-4" />}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sky" labelledby="qa-h">
        <ChapterLabel label={t('about.qa.chapter')} />
        <h2 id="qa-h" className="display mt-6 text-[2.1rem] text-navy sm:text-[2.8rem] lg:text-[3.3rem]">
          KILF,{' '}
          <span className="text-cobalt" lang="ml">
            ചുരുക്കത്തിൽ.
          </span>
        </h2>
        <dl className="mt-12 grid gap-x-12 border-t border-navy/15 md:grid-cols-2" lang="ml">
          {aboutQA.map((item, i) => (
            <div key={i} className={cx('border-b border-navy/15 py-7', i === 0 && 'md:col-span-2')}>
              <dt className="text-xl font-bold text-cobalt">{item.q}</dt>
              <dd className="mt-2 max-w-3xl text-lg leading-relaxed text-navy">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-kilf">
          <div className="flex flex-col items-start justify-between gap-6 border-y border-line py-8 sm:flex-row sm:items-center">
            <p className="text-lg">
              <span className="text-muted">{t('about.organised')}</span>
              <strong className="font-display text-2xl font-extrabold tracking-[-0.03em]"> {site.organiser}.</strong>
            </p>
            <LimeButton href={lp('/contact')} label={t('nav.contact')} />
          </div>
        </div>
      </section>
    </>
  );
}
