import Logo from './Logo';
import LimeButton from './LimeButton';
import Icon from './Icon';
import Rings from './Rings';
import HeaderBehavior from './behaviors/HeaderBehavior';
import { site } from '@/lib/site';
import { cx } from '@/lib/cx';
import { useTranslations, localizePath, languages, type Lang } from '@/i18n/ui';

interface Props {
  lang: Lang;
  path: string;
  /** Float over the illustrated hero, turning solid once the page scrolls. */
  overlay?: boolean;
}

export default function Header({ lang, path, overlay = false }: Props) {
  const t = useTranslations(lang);
  const lp = (p: string) => localizePath(p, lang);

  // Five in the bar; everything else lives in the menu (and the footer).
  const nav = [
    { href: '/about', label: t('nav.about') },
    { href: '/programme', label: t('nav.programme') },
    { href: '/speakers', label: t('nav.speakers') },
    { href: '/visit', label: t('nav.visit') },
    { href: '/passes', label: t('nav.passes') },
  ];
  const more = [
    { href: '/khasak', label: t('nav.theatre') },
    { href: '/youth', label: t('nav.youth') },
    { href: '/cause', label: t('nav.cause') },
    { href: '/get-involved', label: t('nav.involved') },
    { href: '/partners', label: t('nav.partners') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/contact', label: t('nav.contact') },
  ];
  const other: Lang = lang === 'en' ? 'ml' : 'en';
  const toggleHref = localizePath(path, other);
  // Malayalam labels are longer, so the bar needs more room before the links show.
  const wide = lang === 'ml';
  const isCurrent = (href: string) => path === href || (href !== '/' && path.startsWith(href + '/'));
  const current = (href: string) => (isCurrent(href) ? ('page' as const) : undefined);

  return (
    <header className="site-header" data-header data-overlay={overlay ? '' : undefined}>
      <div className="bar">
        <div className="container-kilf flex h-[var(--hh)] items-center justify-between gap-4">
          <a href={lp('/')} className="-ml-1 flex min-h-11 items-center gap-3.5 px-1">
            <Logo decorative className="h-9 lg:h-10" />
            <span className={cx('desc hidden whitespace-nowrap text-[0.62rem] font-bold uppercase leading-[1.45] tracking-[0.14em]', wide ? '2xl:block' : 'xl:block')} lang="en">
              Kollam International
              <br />
              Literature Festival
            </span>
            <span className="sr-only">KILF 2027 — {t('nav.home')}</span>
          </a>

          <nav aria-label={t('nav.primary')} className={cx('hidden', wide ? 'xl:block' : 'lg:block')}>
            <ul className="flex items-center gap-0.5 xl:gap-1.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={lp(item.href)} aria-current={current(item.href)} className="nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a href={toggleHref} hrefLang={other} lang={other} className="lang inline-flex min-h-11 items-center px-3.5 text-sm font-semibold ring-1 ring-inset transition-colors">
              {languages[other]}
            </a>
            <span className="hidden sm:contents">
              <LimeButton href={lp('/get-involved#register')} label={t('cta.register')} size="sm" className="hdr-cta" />
            </span>
            <button
              type="button"
              className="menu-btn inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-3 text-sm font-semibold ring-1 ring-inset"
              aria-controls="site-menu"
              aria-expanded="false"
              data-menu-toggle
            >
              <span className="hidden lg:inline" aria-hidden="true" data-open-text>
                {t('nav.menu')}
              </span>
              <span className="sr-only" data-open-label>
                {t('nav.menu')}
              </span>
              <span className="sr-only hidden" data-close-label>
                {t('nav.close')}
              </span>
              <Icon name="menu" size={20} className="menu-icon" />
              <Icon name="close" size={20} className="close-icon hidden" />
            </button>
          </div>
        </div>
      </div>

      <div id="site-menu" className="menu on-dark" data-menu>
        <div className="container-kilf flex min-h-full flex-col pb-10 pt-[calc(var(--hh)+1.5rem)]">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <nav aria-label={t('nav.festival')} className="lg:col-span-6">
              <p className="eyebrow flex items-center gap-3 text-white/70">
                <Rings n={1} size={26} tone="lake" />
                {t('nav.festival')}
              </p>
              <ul className="mt-4">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a href={lp(item.href)} aria-current={current(item.href)} className="menu-link big">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label={t('nav.more')} className="lg:col-span-6">
              <p className="eyebrow flex items-center gap-3 text-white/70">
                <Rings n={2} size={26} tone="lake" />
                {t('nav.more')}
              </p>
              <ul className="mt-4">
                {more.map((item) => (
                  <li key={item.href}>
                    <a href={lp(item.href)} aria-current={current(item.href)} className="menu-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="mt-auto flex flex-col gap-5 pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-2 gap-3 sm:flex">
              <LimeButton href={lp('/get-involved#register')} label={t('cta.register')} />
              <LimeButton href={lp('/get-involved#volunteer')} label={t('cta.volunteer')} variant="outline-light" />
            </div>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-white/80 hover:text-white">
              <Icon name="mail" size={18} className="text-lake" />
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <HeaderBehavior />
    </header>
  );
}
