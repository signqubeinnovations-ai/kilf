// Draws the brand files from the ripple mark in src/lib/ripple.mjs:
//   public/favicon.svg             the mark on an ink tile (legible at 16–32px)
//   public/brand/kilf-mark.svg     the mark alone, ink with the red sun
//   public/brand/kilf-mark-light.svg  the mark for dark backgrounds
//   public/brand/kilf-logo.png     the full lockup (mark, divider, wordmark), transparent
//   public/brand/kilf-logo-light.png  the lockup for dark backgrounds
//   scripts/og-panel.png           the share image's title panel (see prepare-assets.mjs)
//
// The lockups and the panel are set in Plus Jakarta Sans by headless
// Chromium, so run this locally (not on the build server) after changing the
// mark, the wordmark, the tagline or the dates, and commit the results.
//
//   node scripts/draw-brand.mjs
//
// Set CHROMIUM_PATH if Chromium is not at the default Playwright location.
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { markSvg, ripplePaths, SUN, MARK } from '../src/lib/ripple.mjs';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const C = { canvas: '#E8E1D7', ink: '#1A1A1A', red: '#A80E0E', redBright: '#D42A1F', muted: '#57524B' };

fs.mkdirSync(path.join(root, 'public/brand'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'public/favicon.svg'),
  markSvg({ pad: 4, square: true, bg: C.ink, ink: C.canvas, sun: C.redBright, radius: 20, weight: 1.45 }) + '\n',
);
fs.writeFileSync(path.join(root, 'public/brand/kilf-mark.svg'), markSvg({ pad: 2 }) + '\n');
fs.writeFileSync(path.join(root, 'public/brand/kilf-mark-light.svg'), markSvg({ pad: 2, ink: C.canvas, sun: C.redBright }) + '\n');

const font = fs
  .readFileSync(path.join(root, 'node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2'))
  .toString('base64');
const mark = (ink, sun) =>
  `<svg viewBox="0 0 ${MARK.width} ${MARK.height}" style="aspect-ratio:${MARK.width}/${MARK.height}"><path fill="${ink}" d="${ripplePaths().join('')}"/><circle cx="${SUN.cx}" cy="${SUN.cy}" r="${SUN.r}" fill="${sun}"/></svg>`;
const lockup = (ink, sun) =>
  `<div class="lock" style="color:${ink}">${mark(ink, sun)}<i></i><span>KOLLAM INTERNATIONAL<br>LITERATURE FESTIVAL<br>2027</span></div>`;
const css = `@font-face{font-family:PJ;src:url(data:font/woff2;base64,${font});font-weight:200 800}
*{margin:0;box-sizing:border-box}
body{font-family:PJ;background:transparent}
.lock{--h:150px;display:inline-flex;align-items:center;gap:calc(var(--h)*.24);height:var(--h)}
.lock svg{height:calc(var(--h)*.6);width:auto;display:block}
.lock i{width:3px;align-self:stretch;background:currentColor}
.lock span{font-weight:700;font-size:calc(var(--h)/3.75);line-height:1.22;letter-spacing:.13em;white-space:nowrap}`;

const executablePath =
  process.env.CHROMIUM_PATH ||
  ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', '/opt/pw-browsers/chromium'].find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ deviceScaleFactor: 2 });

for (const [file, ink, sun] of [
  ['kilf-logo.png', C.ink, C.red],
  ['kilf-logo-light.png', C.canvas, C.redBright],
]) {
  await page.setContent(`<style>${css} body{padding:40px;display:inline-block}</style>${lockup(ink, sun)}`);
  await page.evaluate(() => document.fonts.ready);
  const box = await page.locator('body').boundingBox();
  await page.setViewportSize({ width: Math.ceil(box.width), height: Math.ceil(box.height) });
  await page.screenshot({ path: path.join(root, 'public/brand', file), omitBackground: true });
}

// The share image's title panel: 700 × 630, on canvas.
await page.setViewportSize({ width: 700, height: 630 });
await page.setContent(`<style>${css}
body{width:700px;height:630px;background:${C.canvas};color:${C.ink};padding:64px 64px 60px;display:flex;flex-direction:column}
.lock{--h:62px}
h1{margin-top:auto;font-size:76px;line-height:1;font-weight:800;letter-spacing:-.045em}
h1 em{font-style:normal;color:${C.red}}
h1 b{font-weight:inherit;margin-left:-.1em}
p{margin-top:22px;font-size:27px;font-weight:500;line-height:1.3;letter-spacing:-.01em}
small{display:block;margin-top:14px;font-size:21px;font-weight:600;color:${C.muted}}
</style>
${lockup(C.ink, C.red)}
<h1><em>Pause<b>.</b></em><br>Turn a page<b>.</b></h1>
<p>Five days by the stillness of Ashtamudi.</p>
<small>31 December 2026 – 4 January 2027 · Kollam, Kerala</small>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'scripts/og-panel.png') });
await browser.close();
console.log('[draw-brand] favicon, brand files and share panel drawn');
