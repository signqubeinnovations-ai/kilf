// Generates one 1200×630 Open Graph image per page in the brand style
// (rust texture, logo, page H1) into public/og/. Run after a build:
//   npm run build && npm run og && npm run build
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(new URL('..', import.meta.url).pathname);
const dist = path.join(root, 'dist');
const out = path.join(root, 'public/og');
fs.mkdirSync(out, { recursive: true });
const pages = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') pages.push(p);
  }
})(dist);
const font = (w) => `data:font/woff2;base64,${fs.readFileSync(path.join(root, `public/fonts/rajdhani-${w}.woff2`)).toString('base64')}`;
const logo = fs.readFileSync(path.join(root, 'public/brand/wordmark-cream.svg'), 'utf8');
const tag = fs.readFileSync(path.join(root, 'public/brand/tagline-cream.svg'), 'utf8');
const exe = ['/opt/pw-browsers/chromium'].find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, path.dirname(file)).split(path.sep).join('--');
  const slug = rel || 'home';
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, 'FACADO'])[1];
  const lines = [...h1.matchAll(/<span class="(thin|bold)"[^>]*>([^<]+)<\/span>/g)].map((m) => [m[1], m[2]]);
  const text = lines.length ? lines : [['bold', h1.replace(/<[^>]+>/g, ' ').trim()]];
  const eyebrow = slug === 'home' ? 'ACP FACADE DESIGN · KOLLAM, KERALA' : slug.split('--')[0].replace(/-/g, ' ').toUpperCase();
  const size = text.map((t) => t[1]).join(' ').length > 34 ? 70 : 92;
  await page.setContent(`<html><head><style>
    @font-face{font-family:R;src:url(${font(300)});font-weight:300}@font-face{font-family:R;src:url(${font(700)});font-weight:700}
    body{margin:0;width:1200px;height:630px;font-family:R;color:#F2F0DA;background:#6B3022;position:relative;overflow:hidden}
    .g{position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .42 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"),radial-gradient(120% 90% at 20% 0%,#7a3828,transparent 60%),radial-gradient(100% 80% at 100% 100%,#552519,transparent 65%)}
    .in{position:absolute;inset:64px 72px}.logo{width:230px}.tag{width:230px;margin-top:8px}
    .eb{margin-top:64px;font-weight:700;letter-spacing:.22em;font-size:20px;color:#d6b48e;display:flex;gap:16px;align-items:center}.eb:before{content:'';width:44px;height:1px;background:currentColor}
    h1{margin:22px 0 0;font-size:${size}px;line-height:.92;letter-spacing:.02em;text-transform:uppercase;max-width:980px}.thin{font-weight:300}.bold{font-weight:700}
    .dim{position:absolute;left:72px;right:72px;bottom:52px;display:flex;align-items:center;gap:16px;color:#d6b48e;font-weight:700;letter-spacing:.22em;font-size:16px}
    .dim i{flex:1;height:11px;background:linear-gradient(currentColor,currentColor) center/100% 1px no-repeat;border-left:1px solid;border-right:1px solid}
    .crop{position:absolute;right:40px;top:40px;width:26px;height:26px;border-top:2px solid #d6b48e;border-right:2px solid #d6b48e}
  </style></head><body><div class="g"></div><span class="crop"></span><div class="in">
    <div class="logo">${logo}</div><div class="tag">${tag}</div>
    <div class="eb">${eyebrow}</div>
    <h1>${text.map(([w, t]) => `<span class="${w}">${t.trim()}</span>`).join('<br>')}</h1></div>
    <div class="dim"><i></i>+91 81130 13556 · WHATSAPP FOR A FREE FACADE DESIGN<i></i></div></body></html>`);
  await page.screenshot({ path: path.join(out, `${slug}.jpg`), type: 'jpeg', quality: 82 });
  console.log('og', slug);
}
await browser.close();
