/**
 * Each programme strand has one accent colour: Literature cobalt, Music
 * teal, Theatre and Art coral, Youth marigold (the rest follow the nearest:
 * Cinema coral, Ideas and the Book Fair cobalt, Children's and Food
 * marigold). The colours are set per strand in src/content/strands.json;
 * "youth" sessions (not a strand in that file) are marigold.
 */
export type Accent = 'cobalt' | 'teal' | 'coral' | 'marigold';

export const accentFor = (strand: string | undefined, strands: { id: string; data: { accent: Accent } }[]): Accent =>
  strand === 'youth' ? 'marigold' : (strands.find((s) => s.id === strand)?.data.accent ?? 'cobalt');

/** CSS colour for each accent (use as a fill, a rule or a dot: never as small text on off-white). */
export const accentVar: Record<Accent, string> = {
  cobalt: 'var(--color-cobalt)',
  teal: 'var(--color-teal)',
  coral: 'var(--color-coral)',
  marigold: 'var(--color-marigold)',
};
