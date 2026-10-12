import QRCode from 'qrcode';
import Stopped from './Stopped';
import Logo from './Logo';
import Placeholder from './Placeholder';
import LimeButton from './LimeButton';
import MotionToggle from './MotionToggle';
import Rings from './Rings';
import { site, isPlaceholder, abs } from '@/lib/site';
import { cx } from '@/lib/cx';
import { useTranslations, localizePath, type Lang } from '@/i18n/ui';

interface Props {
  lang: Lang;
  /** The home page ends on its own closing line, so the footer doesn't repeat it. */
  closing?: boolean;
}

export default async function Footer({ lang, closing = true }: Props) {
  const t = useTranslations(lang);
  const lp = (p: string) => localizePath(p, lang);
  const siteUrl = abs(lp('/'));
  const qr = await QRCode.toString(siteUrl, {
    type: 'svg',
    margin: 1,
    color: { dark: '#101B62', light: '#FFFFFF' },
    errorCorrectionLevel: 'M',
  });

  const cols = [
    {
      title: t('footer.festival'),
      links: [
        ['/about', t('nav.about')],
        ['/programme', t('nav.programme')],
        ['/speakers', t('nav.speakers')],
        ['/visit', t('nav.visit')],
        ['/passes', t('nav.passes')],
      ],
    },
    {
      title: t('footer.more'),
      links: [
        ['/khasak', t('nav.theatre')],
        ['/youth', t('nav.youth')],
        ['/cause', t('nav.cause')],
        ['/get-involved', t('nav.involved')],
        ['/partners', t('nav.partners')],
        ['/faq', t('nav.faq')],
        ['/contact', t('nav.contact')],
      ],
    },
  ];

  return (
    <footer className="on-dark relative bg-night text-white">
      <div className="container-kilf relative">
        {closing && (
          <section className="flex flex-col gap-10 pb-16 pt-20 sm:pb-20 sm:pt-24 lg:flex-row lg:items-end lg:justify-between lg:gap-16" aria-labelledby="closing-h">
            <div>
              <p className="eyebrow flex items-center gap-3 text-white/75">
                <Rings n={3} size={40} tone="lake" />
                {t('footer.closing.kicker')}
              </p>
              <h2
                id="closing-h"
                className={cx(
                  'display mt-6',
                  lang === 'ml' ? 'text-[1.7rem] min-[380px]:text-[2.1rem] sm:text-[2.8rem] lg:text-[3.4rem]' : 'text-[2.4rem] sm:text-[3.4rem] lg:text-[4.2rem]',
                )}
              >
                <Stopped text={t('footer.closing.h')} />
                <br />
                <span className="text-lake">
                  <Stopped text={t('footer.closing.accent')} />
                </span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 lg:pb-3">
              <LimeButton href={lp('/get-involved#register')} label={t('cta.register')} variant="white" size="lg" />
              <LimeButton href={lp('/get-involved#volunteer')} label={t('cta.volunteer')} variant="outline-light" size="lg" />
            </div>
          </section>
        )}

        <div className={cx('grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.25fr] lg:gap-10', closing && 'border-t border-white/15')}>
          <div>
            <a href={lp('/')} className="inline-flex min-h-11 items-center text-white">
              <Logo tone="dark" className="h-12" decorative />
              <span className="sr-only">KILF 2027 — {t('nav.home')}</span>
            </a>
            <ul className="mt-6 space-y-1.5 text-[0.95rem] text-white/85">
              <li>{t('site.dates')}</li>
              <li>
                {t('site.city')} · {t('site.organisedBy')} {site.organiser}
              </li>
            </ul>
          </div>

          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="eyebrow text-white/65">{col.title}</h2>
              <ul className="mt-4">
                {col.links.map(([href, label]) => (
                  <li key={href}>
                    <a href={lp(href)} className="inline-flex min-h-10 items-center text-[0.97rem] text-white/90 transition-colors hover:text-lake">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow text-white/65">{t('footer.contact')}</h2>
            <ul className="mt-4 text-[0.97rem]">
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex min-h-10 items-center break-all text-white hover:text-lake">
                  {site.email}
                </a>
              </li>
              <li>
                {site.socialUrl && !isPlaceholder(site.socialHandle) ? (
                  <a href={site.socialUrl} className="inline-flex min-h-10 items-center text-white hover:text-lake" rel="noopener" target="_blank">
                    {site.socialHandle}
                  </a>
                ) : (
                  <span className="inline-flex min-h-10 items-center text-white">
                    <Placeholder value={site.socialHandle} />
                  </span>
                )}
              </li>
            </ul>
            <figure className="mt-5 flex items-center gap-4">
              <div className="size-20 shrink-0 bg-white p-1.5 [&_svg]:size-full" dangerouslySetInnerHTML={{ __html: qr }} role="img" aria-label={`QR code linking to ${siteUrl}`} />
              <figcaption className="max-w-[9rem] text-sm leading-snug text-white/75">{t('footer.scan')}</figcaption>
            </figure>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-6 text-sm text-white/75 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-3">
            <Rings n={3} size={34} tone="lake" />
            KILF 2027 · {t('footer.tagline')}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>
              © 2027 {site.shortName}. {t('footer.rights')}
            </p>
            <a href={lp('/privacy')} className="inline-flex min-h-11 items-center hover:text-lake">
              {t('nav.privacy')}
            </a>
            <MotionToggle lang={lang} />
          </div>
        </div>
      </div>
    </footer>
  );
}
