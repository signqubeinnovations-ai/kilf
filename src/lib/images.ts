import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Pictures resized by scripts/prepare-assets.mjs. Keys are paths without the
 * extension: "art/lake-hero", "illustrations/p4_stage", "speakers/blessy".
 * Real artwork in kilf-assets/ wins over the generated stand-ins.
 */
export type ImageSet = {
  width: number;
  height: number;
  /** A generated stand-in rather than real artwork. */
  placeholder: boolean;
  widths: number[];
  formats: ('avif' | 'webp' | 'jpg')[];
  src: Partial<Record<'avif' | 'webp' | 'jpg', string[]>>;
};

let manifest: Record<string, ImageSet> | undefined;
function load() {
  if (!manifest) {
    const file = path.join(process.cwd(), 'src/assets/generated/images.json');
    if (!fs.existsSync(file)) throw new Error('Missing src/assets/generated/images.json. Run npm run assets.');
    manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return manifest!;
}

const stem = (p: string) => p.replace(/\.[a-z0-9]+$/i, '').toLowerCase();

/** Look up a picture by its path inside kilf-assets/, e.g. "speakers/blessy.jpg". */
export function findImage(rel: string): ImageSet | undefined {
  return load()[stem(rel)];
}

/**
 * Resolve an asset by its path inside kilf-assets/, e.g.
 * `asset('illustrations/cover.jpg')`, falling back to the lake band stand-in.
 */
export function asset(rel: string): ImageSet {
  const found = findImage(rel) ?? findImage('illustrations/lake-band');
  if (!found) throw new Error(`Missing asset ${rel}. Run npm run assets.`);
  return found;
}

/** Optional logo file (kilf-assets/logos/kilf-logo.svg|png), copied to public/logos/. */
export function logoUrl(name: string): string | undefined {
  const dir = path.join(process.cwd(), 'kilf-assets/logos');
  for (const ext of ['svg', 'png']) {
    if (fs.existsSync(path.join(dir, `${name}.${ext}`))) return `/logos/${name}.${ext}`;
  }
  return undefined;
}
