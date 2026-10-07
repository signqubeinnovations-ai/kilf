// Runs before `astro dev` and `astro build`.
// 1. Rasterises the stand-in illustrations in src/placeholders/*.svg, so the
//    image pipeline (AVIF/WebP via <Picture>) works before the real artwork
//    lands in kilf-assets/. Real files in kilf-assets/ always win.
// 2. Makes a grey-blue duotone initials placeholder for any speaker whose photo
//    is missing from kilf-assets/speakers/.
// 3. Builds the 1200×630 Open Graph share image: the title panel beside the
//    cover illustration.
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
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8E9EA8"/><stop offset="1" stop-color="#3C4850"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <circle cx="300" cy="300" r="210" fill="none" stroke="#D9DCD8" stroke-opacity=".3" stroke-width="2"/>
    <path d="M60 470c40-14 80-14 120 0s80 14 120 0 80-14 120 0 80 14 120 0" fill="none" stroke="#A80E0E" stroke-width="6" stroke-linecap="round" opacity=".9"/>
    <text x="300" y="345" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="150" fill="#F3EFE8" letter-spacing="-4">${initials}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(target);
}

// 3. Open Graph image (1200×630): the title panel (logo, "Pause. Turn a
//    page." and the dates, on canvas) beside the lake illustration (or the
//    real cover, if supplied). The panel, scripts/og-panel.png, is drawn by
//    `node scripts/draw-brand.mjs`; redraw it if the title or dates change.
const cover = (await findReal('illustrations', 'cover')) ?? path.join(root, 'src/assets/art/lake-hero.jpg');
const art = await sharp(cover).resize(640, 630, { fit: 'cover', position: 'right' }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#E8E1D7' } })
  .composite([
    { input: art, left: 560, top: 0 },
    // The panel is drawn at 2× for sharpness; it fills the left 700 × 630.
    { input: await sharp(path.join(root, 'scripts/og-panel.png')).resize(700, 630).toBuffer(), left: 0, top: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'));

console.log('[prepare-assets] placeholders and og-image ready');

// 4. Apple touch icon from the favicon (redrawn whenever the favicon changes)
const touch = path.join(root, 'public/apple-touch-icon.png');
const favStat = await fs.stat(path.join(root, 'public/favicon.svg'));
const touchStat = await fs.stat(touch).catch(() => null);
if (!touchStat || touchStat.mtimeMs < favStat.mtimeMs) {
  await sharp(path.join(root, 'public/favicon.svg'), { density: 300 }).resize(180, 180).png().toFile(touch);
}
