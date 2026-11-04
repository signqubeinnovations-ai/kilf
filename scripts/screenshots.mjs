// Full-page screenshots of key pages. Usage: npm run build && npm run screenshots
// Env: PAGES=/,/faq  WIDTHS=390,1440  MOTION=1 (play animations)  OUT_DIR=screenshots
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { serve } from './serve.mjs';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const out = process.env.OUT_DIR || path.join(root, 'screenshots');
fs.mkdirSync(out, { recursive: true });
const server = await serve(path.join(root, 'dist'), 4399);
const pages = (process.env.PAGES || '/').split(',');
const widths = (process.env.WIDTHS || '390,1440').split(',').map(Number);
const exe = process.env.CHROMIUM_PATH || ['/opt/pw-browsers/chromium'].find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 844 : 900 }, deviceScaleFactor: Number(process.env.DPR || 1), reducedMotion: process.env.MOTION ? 'no-preference' : 'reduce' });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('pageerror', p, e.message));
  for (const p of pages) {
    await page.goto(`http://localhost:4399${p}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      document.querySelectorAll('[data-hl],[data-reveal],[data-draw],[data-stamp]').forEach((e) => e.classList.add('is-in'));
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);
    const name = (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '--')) + `-${w}.png`;
    await page.screenshot({ path: path.join(out, name), fullPage: !process.env.VIEWPORT });
    console.log('saved', name);
  }
  await ctx.close();
}
await browser.close();
server.close();
