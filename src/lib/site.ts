/**
 * Festival facts used across the site. Edit here, not in the pages.
 * Anything wrapped in [BRACKETS] is a placeholder, see TODO.md.
 */
export const site = {
  name: 'Kollam International Literature Festival',
  shortName: 'KILF',
  edition: 'The first edition',
  year: 2027,
  email: 'kilf2027@gmail.com',
  organiser: 'Capital Media',
  url: 'https://www.kilf.in',
  domain: 'www.kilf.in',
  socialHandle: '[@HANDLE]',
  socialUrl: '', // e.g. https://instagram.com/kilf2027, fill in with the handle
  city: 'Kollam, Kerala',
  datesLabel: '31 December 2026 – 4 January 2027',
  datesShort: '31 Dec 2026 – 4 Jan 2027',
  days: 5,
  startISO: '2026-12-31T00:00:00+05:30',
  endISO: '2027-01-04T23:59:59+05:30',
  startDate: '2026-12-31',
  endDate: '2027-01-04',
  /** The edition's theme (a chapter title, not a tagline). */
  theme: 'Chapter 1 — The Pause',
  /** The one tagline, used site-wide. Nothing else is a tagline. */
  tagline: 'Pause. Turn a page.',
  /** The About story line. */
  story: 'Every ripple begins with a pause. One page, one idea, spreading outward.',
  /** Meta and share description for the whole site. */
  description: 'Pause. Turn a page. Five days by the stillness of Ashtamudi: the Kollam International Literature Festival, 31 December 2026 – 4 January 2027, Kollam, Kerala.',
  venues: [
    {
      id: 'sngcc',
      /** Venue code: 1 ripple ring. */
      rings: 1,
      name: 'Sree Narayana Cultural Complex',
      area: 'Kollam',
      lat: '[LAT]',
      lng: '[LNG]',
      mapsQuery: 'Sree Narayana Cultural Complex, Kollam, Kerala',
    },
    {
      id: '8point',
      /** Venue code: 2 ripple rings. */
      rings: 2,
      name: '8 Point Art Cafe',
      area: 'Kollam',
      lat: '[LAT]',
      lng: '[LNG]',
      mapsQuery: '8 Point Art Cafe, Kollam, Kerala',
    },
  ],
} as const;

export const isPlaceholder = (v: string) => /^\[.*\]$/.test(v.trim());

export const env = {
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT || '',
  formEndpointPartner: import.meta.env.PUBLIC_FORM_ENDPOINT_PARTNER || '',
  formEndpointNewsletter: import.meta.env.PUBLIC_FORM_ENDPOINT_NEWSLETTER || '',
  ga4: import.meta.env.PUBLIC_GA4_ID || '',
  plausible: import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN || '',
  partnerCallUrl: import.meta.env.PUBLIC_PARTNER_CALL_URL || '',
  whatsappUrl: import.meta.env.PUBLIC_WHATSAPP_URL || '',
};
