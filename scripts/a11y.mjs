// axe-core WCAG 2.2 AA scan of every built page. Usage: npm run build && npm run a11y
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { serve } from './serve.mjs';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const dist = path.join(root, 'dist');
const axe = fs.readFileSync(path.join(root, 'node_modules/axe-core/axe.min.js'), 'utf8');
const pages = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f === 'index.html') pages.push('/' + path.relative(dist, d).split(path.sep).join('/')); } })(dist);
const server = await serve(dist, 4403);
const exe = ['/opt/pw-browsers/chromium'].find((p) => fs.existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
let total = 0;
for (const w of [390, 1440]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  for (const p of pages) {
    await page.goto(`http://localhost:4403${p.replace(/\/?$/, '/')}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('[data-hl],[data-reveal],[data-draw],[data-stamp]').forEach((e) => e.classList.add('is-in')));
    await page.waitForTimeout(700);
    await page.addScriptTag({ content: axe });
    const res = await page.evaluate(() => window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }));
    for (const v of res.violations) {
      total++;
      console.log(`${w}px ${p}  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`);
      v.nodes.slice(0, 3).forEach((n) => console.log('     ', n.target.join(' '), n.failureSummary?.split('\n')[1]?.trim() || ''));
    }
  }
  await page.close();
}
console.log(total ? `${total} violation groups` : 'No axe violations');
await browser.close();
server.close();
process.exit(total ? 1 : 0);
