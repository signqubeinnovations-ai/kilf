// Runs before `astro dev` and `astro build`.
// 1. Rasterises the stand-in illustrations in src/placeholders/*.svg, so the
//    image pipeline (AVIF/WebP via <Picture>) works before the real artwork
//    lands in kilf-assets/. Real files in kilf-assets/ always win.
// 2. Makes a blue duotone initials placeholder for any speaker whose photo
//    is missing from kilf-assets/speakers/.
// 3. Builds the 1200×630 Open Graph share image from the cover illustration.
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

// 3. Open Graph image (1200×630)
const cover = (await findReal('illustrations', 'cover')) ?? path.join(out, 'illustrations/cover.jpg');
const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FCFAF3" stop-opacity=".97"/><stop offset=".55" stop-color="#FCFAF3" stop-opacity=".85"/><stop offset="1" stop-color="#FCFAF3" stop-opacity="0"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#f)"/>
  <text x="64" y="120" font-family="sans-serif" font-weight="700" font-size="24" letter-spacing="4" fill="#B8432A">THE FIRST CHAPTER · 2027</text>
  <text font-family="sans-serif" font-weight="800" font-size="76" fill="#0F1C74" letter-spacing="-2">
    <tspan x="60" y="230">Kollam</tspan><tspan x="60" y="310">International</tspan><tspan x="60" y="390">Literature <tspan fill="#D4553A">Festival</tspan></tspan>
  </text>
  <text x="64" y="470" font-family="sans-serif" font-weight="600" font-size="30" fill="#0F1C74">31 Dec 2026 – 4 Jan 2027 · Kollam, Kerala</text>
  <rect x="64" y="510" width="430" height="56" rx="28" fill="#E7EF93"/>
  <text x="279" y="547" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="24" fill="#0F1C74">Where words meet the world</text>
</svg>`);
await sharp(cover)
  .resize(1200, 630, { fit: 'cover', position: 'right' })
  .composite([{ input: overlay }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(root, 'public/og-image.jpg'));

console.log('[prepare-assets] placeholders and og-image ready');

// 4. Apple touch icon from the favicon
const touch = path.join(root, 'public/apple-touch-icon.png');
if (!(await exists(touch))) {
  await sharp(path.join(root, 'public/favicon.svg'), { density: 300 }).resize(180, 180).png().toFile(touch);
}
