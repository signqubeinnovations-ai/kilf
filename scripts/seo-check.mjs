// Static SEO checks on dist/. Usage: npm run build && npm run seo
import fs from 'node:fs';
import path from 'node:path';
const dist = path.resolve(new URL('../dist', import.meta.url).pathname);
const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) files.push(p); } })(dist);
let problems = 0;
const bad = (f, m) => { problems++; console.log('✗', path.relative(dist, f), '-', m); };
const types = new Set();
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const t = title.replace(/&amp;/g, '&'); const ds = desc.replace(/&amp;/g, '&').replace(/&#39;/g, "'");
  if (!t || t.length > 60) bad(f, `title ${t.length} chars: ${t}`);
  if (!ds || ds.length > 155) bad(f, `description ${ds.length} chars`);
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) bad(f, `${h1} h1 elements`);
  if (!f.endsWith('404.html') && !/rel="canonical"/.test(h)) bad(f, 'no canonical');
  const og = (h.match(/property="og:image" content="[^"]*\/og\/([^"]+)"/) || [])[1];
  if (!og || !fs.existsSync(path.join(dist, 'og', og))) bad(f, `missing OG image ${og}`);
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) bad(f, 'img without alt');
  for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const o = JSON.parse(m[1]); types.add(o['@type']); if (/\[FILL/.test(m[1])) bad(f, `[FILL] inside ${o['@type']} schema`); } catch (e) { bad(f, 'invalid JSON-LD'); }
  }
  if (!/<html lang="en-IN"/.test(h)) bad(f, 'lang not en-IN');
}
console.log(`${files.length} pages checked. Schema types: ${[...types].join(', ')}`);
console.log(problems ? `${problems} problems` : 'All SEO checks passed');
process.exit(problems ? 1 : 0);
