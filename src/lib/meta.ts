import type { Metadata } from 'next';
import { site, abs } from '@/lib/site';
import { localizePath, parsePath, isTranslated } from '@/i18n/ui';

/**
 * Page metadata: title, description, canonical URL, hreflang alternates,
 * Open Graph and Twitter tags. Malayalam URLs whose content hasn't been
 * translated yet point their canonical at the English page and are noindexed,
 * so search engines don't index duplicates.
 */
export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}

export function pageMetadata(pathname: string, { title, description, image = '/og-image.jpg', noindex = false }: PageMeta): Metadata {
  const { lang, path } = parsePath(pathname);
  const translated = isTranslated(path);
  const fallback = lang === 'ml' && !translated;
  const canonical = abs(fallback ? localizePath(path, 'en') : localizePath(path, lang));
  const fullTitle = path === '/' ? title : `${title} · KILF 2027`;
  const ogImage = abs(image);
  return {
    metadataBase: new URL(abs('/')),
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical,
      languages: translated ? { en: abs(localizePath(path, 'en')), ml: abs(localizePath(path, 'ml')), 'x-default': abs(localizePath(path, 'en')) } : undefined,
    },
    robots: noindex || fallback ? (fallback ? 'noindex, follow' : 'noindex') : undefined,
    icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' }, apple: '/apple-touch-icon.png' },
    openGraph: {
      type: 'website',
      siteName: 'KILF 2027',
      title: fullTitle,
      description,
      url: canonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Chapter 1: The Pause. Kollam International Literature Festival, 31 Dec 2026 – 4 Jan 2027, by Ashtamudi Lake.' }],
      locale: lang === 'ml' ? 'ml_IN' : 'en_IN',
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [ogImage] },
  };
}

/** The festival as schema.org JSON-LD, on the home page. */
export function eventJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Festival',
    name: `${site.name} (KILF) 2027`,
    alternateName: 'KILF 2027',
    description: site.description,
    startDate: site.startISO,
    endDate: site.endISO,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    inLanguage: ['ml', 'en'],
    url: abs('/'),
    image: [abs('/og-image.jpg')],
    location: site.venues.map((v) => ({
      '@type': 'Place',
      name: v.name,
      address: { '@type': 'PostalAddress', addressLocality: 'Kollam', addressRegion: 'Kerala', addressCountry: 'IN' },
    })),
    organizer: { '@type': 'Organization', name: site.organiser, email: site.email, url: abs('/') },
  };
}
