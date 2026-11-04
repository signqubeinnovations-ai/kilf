// Quick Core Web Vitals check (LCP, CLS) on a throttled phone profile against dist/.
// Usage: npm run build && npm run vitals
import { chromium, devices } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
import { serve } from './serve.mjs';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const server = await serve(path.join(root, 'dist'), 4402);
const exe = ['/opt/pw-browsers/chromium'].find((p) => fs.existsSync(p));
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const pages = (process.env.PAGES || '/,/acp-cladding-kollam/,/projects/,/contact/,/faq/,/journal/acp-cladding-cost-kerala/').split(',');
const rows = [];
for (const p of pages) {
  const ctx = await browser.newContext({ ...devices['Moto G4'] });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await page.addInitScript(() => {
    window.__v = { lcp: 0, cls: 0 };
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__v.lcp = e.startTime))).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__v.cls += e.value; })).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto(`http://localhost:4402${p}`, { waitUntil: 'load' });
  await page.waitForTimeout(3500);
  const v = await page.evaluate(() => window.__v);
  const bytes = await page.evaluate(() => performance.getEntriesByType('resource').reduce((s, r) => s + (r.transferSize || 0), 0) + (performance.getEntriesByType('navigation')[0]?.transferSize || 0));
  rows.push({ page: p, LCP_ms: Math.round(v.lcp), CLS: +v.cls.toFixed(3), KB: Math.round(bytes / 1024) });
  await ctx.close();
}
console.table(rows);
fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports', 'vitals.json'), JSON.stringify(rows, null, 2));
await browser.close();
server.close();
