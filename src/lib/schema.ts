import { site, real } from './site';

const abs = (path: string, base: URL | string) => new URL(path, base).href;

/** HomeAndConstructionBusiness. Fields that are still [FILL] are left out. */
export function businessLd(base: URL | string) {
  const a = site.address;
  const sameAs = [real(site.social.instagram), real(site.social.facebook), real(site.mapsUrl)].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': abs('/#business', base),
    name: site.name,
    alternateName: `${site.brand} ${site.tagline}`,
    description: `${site.entity}. Design, 3D visualisation, fabrication and installation of ACP facades and exterior cladding.`,
    url: abs('/', base),
    logo: abs('/brand/facado-logo.png', base),
    image: abs('/og/home.jpg', base),
    telephone: site.phoneE164,
    ...(real(site.email) && { email: site.email }),
    address: {
      '@type': 'PostalAddress',
      ...(real(a.street) && { streetAddress: a.street }),
      addressLocality: a.locality,
      addressRegion: a.region,
      ...(real(a.postalCode) && { postalCode: a.postalCode }),
      addressCountry: a.country,
    },
    ...(site.geo && { geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } }),
    areaServed: site.areasServed.map((name) => ({ '@type': 'Place', name })),
    ...(site.hoursSchema.length && {
      openingHoursSpecification: site.hoursSchema.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    }),
    ...(sameAs.length && { sameAs }),
    ...(real(site.priceRange) && { priceRange: site.priceRange }),
    knowsAbout: ['ACP cladding', 'Aluminium composite panel facades', 'Building elevation design', 'Shop front elevation', '3D facade design', 'Facade renovation'],
  };
}

export function breadcrumbLd(items: { href?: string; label: string }[], base: URL | string, current: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: abs(it.href ?? current, base),
    })),
  };
}

/** Strip HTML and [FILL] markers so schema text stays clean. */
export const plain = (html: string) =>
  html.replace(/<em class="fill">[\s\S]*?<\/em>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })),
  };
}

export function serviceLd(o: { name: string; description: string; url: string; serviceType: string }, base: URL | string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: o.name,
    serviceType: o.serviceType,
    description: o.description,
    url: o.url,
    provider: { '@id': abs('/#business', base) },
    areaServed: site.areasServed.map((name) => ({ '@type': 'Place', name })),
  };
}
