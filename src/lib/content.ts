import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { z } from 'zod';
import { speakerSchema, faqSchema, passSchema, strandSchema, sponsorSchema, teaserSchema, daySchema } from '@/content.config';

/**
 * Reads the editable content in src/content/ at build time and validates it.
 * Each entry is `{ id, data }` (speakers also carry their Markdown `body`).
 */
const dir = path.join(process.cwd(), 'src/content');

export type Entry<T> = { id: string; data: T; body?: string };

function fail(file: string, id: string, error: z.ZodError): never {
  const issues = error.issues.map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`).join('\n');
  throw new Error(`Invalid content in src/content/${file} (entry "${id}"):\n${issues}`);
}

function json<S extends z.ZodType>(file: string, schema: S): Entry<z.output<S>>[] {
  const raw = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')) as Record<string, unknown>[];
  return raw.map((item) => {
    const { id, ...rest } = item as { id?: string };
    if (!id) throw new Error(`Every entry in src/content/${file} needs an "id".`);
    const parsed = schema.safeParse(rest);
    if (!parsed.success) fail(file, id, parsed.error);
    return { id, data: parsed.data };
  });
}

const cache = new Map<string, unknown>();
function once<T>(key: string, load: () => T): T {
  if (!cache.has(key)) cache.set(key, load());
  return cache.get(key) as T;
}

export type Speaker = Entry<z.output<typeof speakerSchema>>;
export type Day = z.output<typeof daySchema>;

export const getSpeakers = (): Speaker[] =>
  once('speakers', () =>
    fs
      .readdirSync(path.join(dir, 'speakers'))
      .filter((f) => f.endsWith('.md'))
      .sort()
      .map((f) => {
        const id = f.replace(/\.md$/, '');
        const { data, content } = matter(fs.readFileSync(path.join(dir, 'speakers', f), 'utf8'));
        const parsed = speakerSchema.safeParse(data);
        if (!parsed.success) fail(`speakers/${f}`, id, parsed.error);
        return { id, data: parsed.data, body: content };
      }),
  );

export const getFaqs = () => once('faqs', () => json('faqs.json', faqSchema));
export const getPasses = () => once('passes', () => json('passes.json', passSchema));
export const getStrands = () => once('strands', () => json('strands.json', strandSchema));
export const getSponsors = () => once('sponsors', () => json('sponsors.json', sponsorSchema));
export const getTeasers = () => once('teasers', () => json('teasers.json', teaserSchema));
export const getSchedule = () => once('schedule', () => json('schedule.json', daySchema));

export const byOrder = <T extends { data: { order: number } }>(list: T[]) => [...list].sort((a, b) => a.data.order - b.data.order);
