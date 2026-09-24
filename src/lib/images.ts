import type { ImageMetadata } from 'astro';

type Mod = { default: ImageMetadata };

// Real artwork dropped into kilf-assets/ always wins…
const real = import.meta.glob<Mod>('/kilf-assets/**/*.{jpg,jpeg,png,webp,avif}', { eager: true });
// …otherwise we fall back to the generated stand-ins (scripts/prepare-assets.mjs).
const generated = import.meta.glob<Mod>('/src/assets/generated/**/*.jpg', { eager: true });

const stem = (p: string) => p.replace(/\.[a-z0-9]+$/i, '');

function find(map: Record<string, Mod>, prefix: string, rel: string) {
  const wanted = stem(`${prefix}/${rel}`).toLowerCase();
  for (const [key, mod] of Object.entries(map)) {
    if (stem(key).toLowerCase() === wanted) return mod.default;
  }
  return undefined;
}

/**
 * Resolve an asset by its path inside kilf-assets/, e.g.
 * `asset('illustrations/cover.jpg')` or `asset('speakers/blessy.jpg')`.
 */
export function asset(rel: string): { src: ImageMetadata; placeholder: boolean } {
  const r = find(real, '/kilf-assets', rel);
  if (r) return { src: r, placeholder: false };
  const g = find(generated, '/src/assets/generated', rel);
  if (g) return { src: g, placeholder: true };
  const fallback = find(generated, '/src/assets/generated', 'illustrations/lake-band.jpg');
  if (!fallback) throw new Error(`Missing asset ${rel}. Run npm run assets.`);
  return { src: fallback, placeholder: true };
}

/** Optional logo file (kilf-assets/logos/kilf-logo.svg|png). */
const logos = import.meta.glob<{ default: ImageMetadata | string }>('/kilf-assets/logos/*.{svg,png}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as unknown as Record<string, string>;

export function logoUrl(name: string): string | undefined {
  for (const [key, url] of Object.entries(logos)) {
    if (stem(key.split('/').pop() ?? '') === name) return url;
  }
  return undefined;
}
