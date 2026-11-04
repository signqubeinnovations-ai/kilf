/**
 * Single source of truth for business facts (NAP) and links.
 * Anything wrapped as "[FILL: ...]" is missing information. It is shown on the
 * page as a highlighted marker and is left out of schema markup until it is filled.
 * NAP must match the Google Business Profile exactly.
 */
export const isFill = (v?: string | null) => !v || v.trim().startsWith('[FILL');
/** Returns the value only when it is real (not a [FILL] marker). */
export const real = <T extends string | undefined>(v: T) => (isFill(v) ? undefined : v);

export const site = {
  name: 'FACADO LLP',
  brand: 'FACADO',
  tagline: 'Exterior Design Studio',
  /** Consistent entity line for search and AI answers. */
  entity: 'FACADO LLP, an ACP facade and exterior design studio in Karunagappally, Kerala',
  phoneDisplay: '+91 81130 13556',
  phoneE164: '+918113013556',
  waNumber: '918113013556',
  /** Office lines from the brochure. [FILL: confirm which number is on Google Business Profile] */
  officePhones: [
    { display: '+91 79026 44001', e164: '+917902644001' },
    { display: '+91 79026 44002', e164: '+917902644002' },
  ],
  email: '[FILL: email]',
  address: {
    street: 'Opposite Court Complex, Railway Station Road',
    locality: 'Karunagappally',
    district: 'Kollam',
    region: 'Kerala',
    postalCode: '[FILL: PIN]',
    country: 'IN',
  },
  /** Opening hours as shown on the page and in schema (schema needs real values). */
  hoursDisplay: '[FILL: e.g. Mon–Sat, 9:30 am – 6:30 pm]',
  hoursSchema: [] as { days: string[]; opens: string; closes: string }[],
  geo: undefined as undefined | { lat: number; lng: number }, // [FILL: exact office coordinates]
  mapsUrl: '[FILL: Google Maps link]',
  reviewUrl: '[FILL: Google review link]',
  social: {
    instagram: '[FILL: Instagram URL]',
    facebook: '[FILL: Facebook URL]',
  },
  /** Real towns and districts only. */
  areasServed: ['Karunagappally', 'Kollam'],
  areasNote: '[FILL: confirm the other districts you serve]',
  priceRange: '[FILL: e.g. ₹₹]',
  founded: '[FILL: year started]',
};

export const addressLine = () => {
  const a = site.address;
  return [a.street, a.locality, `${a.district}, ${a.region}`, a.postalCode].join(', ');
};

const mapsSearch = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('FACADO LLP Karunagappally Kollam');
export const directionsUrl = () => real(site.mapsUrl) ?? mapsSearch;
export const mapEmbedUrl = () =>
  site.geo
    ? `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent('FACADO LLP Karunagappally Kollam Kerala')}&z=15&output=embed`;

export const telUrl = `tel:${site.phoneE164}`;

/** WhatsApp link with a pre-filled message. */
export const wa = (text: string) => `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
export const waFor = (context: string) => wa(`Hi FACADO, I'd like a free facade design for my ${context}.`);

export const nav = [
  { href: '/#what-we-build', label: 'Services' },
  { href: '/about', label: 'Studio' },
  { href: '/journal', label: 'Journal' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export const env = {
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
  ga4: import.meta.env.PUBLIC_GA4_ID || '',
  pixel: import.meta.env.PUBLIC_META_PIXEL_ID || '',
};
