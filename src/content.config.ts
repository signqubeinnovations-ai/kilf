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
    /** Leave empty until ticketing opens. Never show invented prices. */
    price: z.string().optional(),
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
 * Programme. Teasers show now; the full schedule (days → sessions) can be
 * filled in later in src/content/schedule.json and the Programme page will
 * switch to the day-by-day view automatically.
 */
const teasers = defineCollection({
  loader: file('src/content/teasers.json'),
  schema: z.object({
    title: z.string(),
    line: z.string(),
    order: z.number(),
  }),
});

const schedule = defineCollection({
  loader: file('src/content/schedule.json'),
  schema: z.object({
    date: z.string(), // YYYY-MM-DD
    label: z.string(), // e.g. "Day 1 · New Year's Eve"
    sessions: z.array(
      z.object({
        start: z.string(), // "18:30"
        end: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        venue: z.enum(['sngcc', '8point', 'ashramam']),
        strand: z.string().optional(), // strand id from strands.json
        speakers: z.array(z.string()).default([]), // speaker slugs
        language: z.enum(['Malayalam', 'English', 'Tamil', 'Bilingual']).default('Malayalam'),
      })
    ),
  }),
});

export const collections = { speakers, faqs, passes, strands, sponsors, teasers, schedule };
