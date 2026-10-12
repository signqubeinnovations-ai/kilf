import { z } from 'zod';

/**
 * Content schemas. Every file in src/content/ is checked against these at
 * build time (src/lib/content.ts), so a typo in a field name fails the build
 * with a clear message.
 */

/** Filter chips on /speakers map onto these categories. */
export const speakerCategories = ['literature', 'cinema', 'music', 'history-ideas'] as const;

export const speakerSchema = z.object({
  name: z.string(),
  name_ml: z.string().optional(),
  role: z.string(),
  /** File name inside kilf-assets/speakers/ */
  photo: z.string(),
  categories: z.array(z.enum(speakerCategories)).min(1),
  /** Lower numbers appear first. */
  order: z.number().default(100),
  /** Show on the home page preview (first 12 by order). */
  featured: z.boolean().default(true),
  /** "proposed" until participation is confirmed. */
  status: z.enum(['proposed', 'confirmed']).default('proposed'),
  /** One or two lines about the speaker, shown on the Speakers page only. */
  note: z.string().optional(),
});

export const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
  order: z.number(),
  group: z.enum(['festival', 'tickets', 'visiting', 'taking-part']).default('festival'),
});

export const passSchema = z.object({
  name: z.string(),
  audience: z.string(),
  description: z.string(),
  includes: z.array(z.string()),
  highlighted: z.boolean().default(false),
  order: z.number(),
  /** The organisers' price, e.g. "₹499". Never show invented prices. */
  price: z.string().optional(),
  /** What the price covers, e.g. "per person, all five days". */
  priceNote: z.string().optional(),
  /** Leave empty until ticketing opens: the card shows "Notify me" instead of "Buy". */
  buyUrl: z.string().optional(),
});

export const strandSchema = z.object({
  name: z.string(),
  name_ml: z.string(),
  blurb: z.string(),
  blurb_ml: z.string(),
  icon: z.string(),
  order: z.number(),
});

export const sponsorSchema = z.object({
  name: z.string(),
  tier: z.enum(['title', 'presenting', 'associate', 'category', 'in-kind', 'media']),
  /** File name inside kilf-assets/logos/ */
  logo: z.string().optional(),
  url: z.url().optional(),
  order: z.number().default(100),
});

/**
 * Programme. Teasers are the fallback; once src/content/schedule.json has days
 * (days → sessions), the Programme page shows the day-by-day view instead.
 */
export const teaserSchema = z.object({
  title: z.string(),
  line: z.string(),
  order: z.number(),
});

export const sessionFormats = ['conversation', 'panel', 'reading', 'workshop', 'performance', 'screening', 'walk', 'ceremony'] as const;

export const daySchema = z.object({
  date: z.string(), // YYYY-MM-DD
  label: z.string(), // e.g. "Day 2"
  /** The day's title, e.g. "First light." */
  theme: z.string(),
  /** The day's title in Malayalam, for /ml/. */
  theme_ml: z.string().optional(),
  blurb: z.string(),
  /** Things that run all day, e.g. "Book fair · Ashramam Maidan · 10:00–21:00". */
  allDay: z.array(z.string()).default([]),
  sessions: z.array(
    z.object({
      start: z.string(), // "18:30"
      end: z.string().optional(),
      title: z.string(),
      description: z.string().optional(),
      venue: z.enum(['sngcc', '8point', 'ashramam']),
      strand: z.string().optional(), // strand id from strands.json, or "youth"
      format: z.enum(sessionFormats).optional(),
      speakers: z.array(z.string()).default([]), // speaker slugs
      /** Other participants, as text: invited guests or roles still to be announced. */
      guests: z.array(z.string()).default([]),
      language: z.enum(['Malayalam', 'English', 'Tamil', 'Bilingual']).optional(),
      /** A must-see: marked in the day's list. */
      highlight: z.boolean().default(false),
      /** An optional call to action, e.g. tickets for a separately ticketed event. */
      link: z.object({ href: z.string(), label: z.string() }).optional(),
    }),
  ),
});
