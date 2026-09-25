import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

/** Filter chips on /speakers map onto these categories. */
export const speakerCategories = ['literature', 'cinema', 'music', 'history-ideas'] as const;

const speakers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/speakers' }),
  schema: z.object({
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
  }),
});

const faqs = defineCollection({
  loader: file('src/content/faqs.json'),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number(),
    group: z.enum(['festival', 'tickets', 'visiting', 'taking-part']).default('festival'),
  }),
});

const passes = defineCollection({
  loader: file('src/content/passes.json'),
  schema: z.object({
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
  }),
});

const strands = defineCollection({
  loader: file('src/content/strands.json'),
  schema: z.object({
    name: z.string(),
    name_ml: z.string(),
    blurb: z.string(),
    blurb_ml: z.string(),
    icon: z.string(),
    order: z.number(),
  }),
});

const sponsors = defineCollection({
  loader: file('src/content/sponsors.json'),
  schema: z.object({
    name: z.string(),
    tier: z.enum(['title', 'presenting', 'associate', 'category', 'in-kind', 'media']),
    /** File name inside kilf-assets/logos/ */
    logo: z.string().optional(),
    url: z.url().optional(),
    order: z.number().default(100),
  }),
});

/**
 * Programme. Teasers are the fallback; once src/content/schedule.json has days
 * (days → sessions), the Programme page shows the day-by-day view instead.
 */
const teasers = defineCollection({
  loader: file('src/content/teasers.json'),
  schema: z.object({
    title: z.string(),
    line: z.string(),
    order: z.number(),
  }),
});

export const sessionFormats = ['conversation', 'panel', 'reading', 'workshop', 'performance', 'screening', 'walk', 'ceremony'] as const;

const schedule = defineCollection({
  loader: file('src/content/schedule.json'),
  schema: z.object({
    date: z.string(), // YYYY-MM-DD
    label: z.string(), // e.g. "Day 2"
    /** The day's title, e.g. "First light." */
    theme: z.string(),
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
      })
    ),
  }),
});

export const collections = { speakers, faqs, passes, strands, sponsors, teasers, schedule };
