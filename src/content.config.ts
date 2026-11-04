import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const faq = z.object({ q: z.string(), a: z.string() });

/** One Markdown file per service page. The file name is the URL slug. */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    order: z.number(),
    navLabel: z.string(),
    /** H1: must contain the primary keyword. */
    h1: z.array(z.string()),
    metaTitle: z.string().max(60),
    description: z.string().max(155),
    keyword: z.string(),
    secondary: z.array(z.string()).default([]),
    /** First paragraph: a clear, quotable answer. */
    answer: z.string(),
    /** WhatsApp message context: "...free facade design for my <waContext>." */
    waContext: z.string(),
    art: z.enum(['commercial', 'showroom', 'office', 'villa', 'hospital', 'campus']),
    dimLabel: z.string(),
    /** Which design possibilities to feature (titles from lib/content.ts). */
    styles: z.array(z.string()).default([]),
    projectCategories: z.array(z.string()).default([]),
    faqs: z.array(faq).length(5),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().default(100),
      title: z.string(),
      client: z.string(),
      location: z.string(),
      category: z.enum(['commercial', 'showroom', 'office', 'villa', 'hospital', 'campus', 'renovation']),
      summary: z.string(),
      metaTitle: z.string().max(60),
      description: z.string().max(155),
      dimLabel: z.string(),
      scope: z.array(z.string()),
      materials: z.array(z.string()),
      /** Only real dates. Leave out if unknown. */
      timeline: z.string().optional(),
      /** Set to true once the owner has confirmed every detail on the page. */
      confirmed: z.boolean().default(false),
      cover: z.object({ src: image(), alt: z.string(), label: z.enum(['Design render', 'Completed']) }).optional(),
      gallery: z.array(z.object({ src: image(), alt: z.string(), label: z.enum(['Design render', 'Completed']) })).default([]),
      /** Only for real before/after photos of the same building. */
      beforeAfter: z.object({ before: image(), after: image(), alt: z.string() }).optional(),
    }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().max(60),
    description: z.string().max(155),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('FACADO Studio'),
    keyword: z.string(),
    relatedServices: z.array(z.string()).default([]),
    waContext: z.string().default('building'),
  }),
});

const faqs = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({ q: z.string(), a: z.string(), order: z.number(), preview: z.boolean().default(false) }),
});

export const collections = { services, projects, journal, faqs };
