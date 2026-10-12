// Runs before `next dev` and `next build`.
// 1. Rasterises the stand-in illustrations in src/placeholders/*.svg, so the
//    image pipeline (AVIF/WebP via <picture>) works before the real artwork
//    lands in kilf-assets/. Real files in kilf-assets/ always win.
// 2. Makes a blue duotone initials placeholder for any speaker whose photo
//    is missing from kilf-assets/speakers/.
// 3. Builds the 1200×630 Open Graph share image: the title panel beside the
//    cover illustration.
// 4. Makes the Apple touch icon from the favicon.
// 5. Resizes every picture the site shows (the lake art, illustrations and
//    real speaker portraits) into AVIF/WebP/JPG widths under public/img/, and
//    writes src/assets/generated/images.json for the <picture> components.
//    File names carry a content hash, so they can be cached forever.
// 6. Copies any logos in kilf-assets/logos/ to public/logos/.
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const out = path.join(root, 'src/assets/generated');
const assetsDir = path.join(root, 'kilf-assets');
const exists = (p) => fs.access(p).then(() => true, () => false);

async function findReal(dir, stem) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'avif']) {
    const p = path.join(assetsDir, dir, `${stem}.${ext}`);
    if (await exists(p)) return p;
  }
  return null;
}

await fs.mkdir(path.join(out, 'illustrations'), { recursive: true });
await fs.mkdir(path.join(out, 'speakers'), { recursive: true });

// 1. Illustrations
const phDir = path.join(root, 'src/placeholders');
for (const file of await fs.readdir(phDir)) {
  if (!file.endsWith('.svg')) continue;
  const stem = file.replace(/\.svg$/, '');
  const target = path.join(out, 'illustrations', `${stem}.jpg`);
  const srcStat = await fs.stat(path.join(phDir, file));
  const outStat = await fs.stat(target).catch(() => null);
  if (outStat && outStat.mtimeMs >= srcStat.mtimeMs) continue;
  await sharp(path.join(phDir, file), { density: 144 })
    .resize({ width: 1600 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(target);
}

// 2. Speaker placeholders
const speakersDir = path.join(root, 'src/content/speakers');
for (const file of await fs.readdir(speakersDir)) {
  if (!file.endsWith('.md')) continue;
  const src = await fs.readFile(path.join(speakersDir, file), 'utf8');
  const name = src.match(/^name:\s*"?(.+?)"?\s*$/m)?.[1] ?? file;
  const photo = src.match(/^photo:\s*"?(.+?)"?\s*$/m)?.[1] ?? `${file}.jpg`;
  const stem = photo.replace(/\.[a-z]+$/i, '');
  const target = path.join(out, 'speakers', `${stem}.jpg`);
  const mdStat = await fs.stat(path.join(speakersDir, file));
  const tStat = await fs.stat(target).catch(() => null);
  if (tStat && tStat.mtimeMs >= Math.max(mdStat.mtimeMs, (await fs.stat(new URL(import.meta.url))).mtimeMs)) continue;
  const initials = name
    .replace(/\./g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 || /[A-Z]/.test(w))
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0].toUpperCase())
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2448ED"/><stop offset="1" stop-color="#0F1C74"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <circle cx="300" cy="300" r="210" fill="none" stroke="#B8C3F0" stroke-opacity=".25" stroke-width="2"/>
    <path d="M60 470c40-14 80-14 120 0s80 14 120 0 80-14 120 0 80 14 120 0" fill="none" stroke="#F47A5E" stroke-width="6" stroke-linecap="round" opacity=".9"/>
    <text x="300" y="345" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="150" fill="#E4ECF9" letter-spacing="-4">${initials}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(target);
}

// 3. Open Graph image (1200×630): "Chapter 1: The Pause." on cream beside the
//    lake illustration (or the real cover, if supplied). The title panel,
//    scripts/og-panel.png, is drawn once in the site's type (Plus Jakarta
//    Sans); redraw it if the title or dates change.
const cover = (await findReal('illustrations', 'cover')) ?? path.join(root, 'src/assets/art/lake-hero.jpg');
const art = await sharp(cover).resize(640, 630, { fit: 'cover', position: 'right' }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#FCFAF3' } })
  .composite([
    { input: art, left: 560, top: 0 },
    { input: path.join(root, 'scripts/og-panel.png'), left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'));

console.log('[prepare-assets] placeholders and og-image ready');

// 4. Apple touch icon from the favicon
const touch = path.join(root, 'public/apple-touch-icon.png');
if (!(await exists(touch))) {
  await sharp(path.join(root, 'public/favicon.svg'), { density: 300 }).resize(180, 180).png().toFile(touch);
}

// 5. Responsive image variants
const imgOut = path.join(root, 'public/img');
await fs.mkdir(imgOut, { recursive: true });
const sets = {
  art: { widths: [640, 960, 1280, 1920, 2560, 3200], formats: ['avif', 'webp', 'jpg'] },
  illustrations: { widths: [480, 768, 1024, 1440, 1920], formats: ['avif', 'webp', 'jpg'] },
  speakers: { widths: [320, 480, 640], formats: ['webp'] },
};
const IMG_EXT = /\.(jpe?g|png|webp|avif)$/i;
const sources = new Map(); // key ("art/lake-hero") → file
const addDir = async (dir, prefix) => {
  const files = await fs.readdir(dir).catch(() => []);
  for (const f of files) if (IMG_EXT.test(f)) sources.set(`${prefix}/${f.replace(IMG_EXT, '').toLowerCase()}`, path.join(dir, f));
};
await addDir(path.join(root, 'src/assets/art'), 'art');
// Stand-ins first, so real artwork with the same name replaces them.
await addDir(path.join(out, 'illustrations'), 'illustrations');
await addDir(path.join(assetsDir, 'illustrations'), 'illustrations');
await addDir(path.join(assetsDir, 'speakers'), 'speakers');

const manifest = {};
const wanted = new Set();
for (const [key, file] of sources) {
  const set = sets[key.split('/')[0]];
  const buf = await fs.readFile(file);
  const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
  const meta = await sharp(buf).metadata();
  const widths = set.widths.filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);
  const base = key.replace('/', '-');
  const entry = { width: meta.width, height: meta.height, placeholder: file.startsWith(out), widths, formats: set.formats, src: {} };
  for (const fmt of set.formats) {
    entry.src[fmt] = widths.map((w) => `/img/${base}.${hash}-${w}.${fmt}`);
    for (const w of widths) {
      const name = `${base}.${hash}-${w}.${fmt}`;
      wanted.add(name);
      const target = path.join(imgOut, name);
      if (await exists(target)) continue;
      const img = sharp(buf).resize({ width: w });
      if (fmt === 'avif') await img.avif({ quality: 50, effort: 4 }).toFile(target);
      else if (fmt === 'webp') await img.webp({ quality: 80 }).toFile(target);
      else await img.jpeg({ quality: 80, mozjpeg: true }).toFile(target);
    }
  }
  manifest[key] = entry;
}
// Drop variants of pictures that changed or went away.
for (const f of await fs.readdir(imgOut)) if (!wanted.has(f)) await fs.rm(path.join(imgOut, f));
await fs.writeFile(path.join(out, 'images.json'), JSON.stringify(manifest, null, 2));
console.log(`[prepare-assets] ${Object.keys(manifest).length} responsive images ready`);

// 6. Logos (kilf-assets/logos/*.svg|png) are served as they are, from /logos/.
const logoOut = path.join(root, 'public/logos');
await fs.rm(logoOut, { recursive: true, force: true });
const logoFiles = (await fs.readdir(path.join(assetsDir, 'logos')).catch(() => [])).filter((f) => /\.(svg|png)$/i.test(f));
if (logoFiles.length) {
  await fs.mkdir(logoOut, { recursive: true });
  for (const f of logoFiles) await fs.copyFile(path.join(assetsDir, 'logos', f), path.join(logoOut, f));
}
