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
  /** Chapter 1: The Pause. */
  taglines: {
    main: 'Chapter 1: The Pause.',
    second: 'Pause. Turn a page.',
    closing: 'Come for a story. Stay for the connection.',
    cause: 'Keep the waters alive.',
  },
  /** Meta and share description for the whole site. */
  description: 'Chapter 1: The Pause — the first Kollam International Literature Festival, 31 Dec 2026 – 4 Jan 2027, by Ashtamudi Lake.',
  venues: [
    {
      id: 'sngcc',
      /** Venue code: 1 ripple ring. */
      rings: 1,
      name: 'Sreenarayana Guru Cultural Centre',
      area: 'Kollam',
      lat: '[LAT]',
      lng: '[LNG]',
      mapsQuery: 'Sreenarayana Guru Cultural Centre, Kollam, Kerala',
    },
    {
      id: '8point',
      /** Venue code: 2 ripple rings. */
      rings: 2,
      name: '8 Point Art Cafe',
      area: 'Asramam, Kollam',
      lat: '[LAT]',
      lng: '[LNG]',
      mapsQuery: '8 Point Art Cafe, Kollam, Kerala',
    },
    {
      id: 'ashramam',
      /** Venue code: 3 ripple rings. */
      rings: 3,
      name: 'Ashramam Maidan',
      area: 'Asramam, Kollam',
      lat: '[LAT]',
      lng: '[LNG]',
      mapsQuery: 'Ashramam Maidan, Kollam, Kerala',
    },
  ],
} as const;

export const isPlaceholder = (v: string) => /^\[.*\]$/.test(v.trim());

/**
 * Environment variables, read at build time (see .env.example). They keep the
 * PUBLIC_ names from before; only server components read them, and pass what
 * the browser needs down as props.
 */
export const env = {
  siteUrl: (process.env.SITE_URL || 'https://kilf.vercel.app').replace(/\/$/, ''),
  formEndpoint: process.env.PUBLIC_FORM_ENDPOINT || '',
  formEndpointPartner: process.env.PUBLIC_FORM_ENDPOINT_PARTNER || '',
  formEndpointNewsletter: process.env.PUBLIC_FORM_ENDPOINT_NEWSLETTER || '',
  ga4: process.env.PUBLIC_GA4_ID || '',
  plausible: process.env.PUBLIC_PLAUSIBLE_DOMAIN || '',
  partnerCallUrl: process.env.PUBLIC_PARTNER_CALL_URL || '',
  whatsappUrl: process.env.PUBLIC_WHATSAPP_URL || '',
  dev: process.env.NODE_ENV === 'development',
};

/** An absolute URL on the public site, e.g. abs('/about/'). */
export const abs = (p: string) => new URL(p, env.siteUrl + '/').href;
