# FACADO LLP — website

Marketing site for **FACADO LLP — Exterior Design Studio**, ACP facade design, fabrication and installation in Karunagappally, Kollam, Kerala.

Built with **Astro 7** (static HTML, no framework runtime), **Tailwind CSS 4**, TypeScript, GSAP + ScrollTrigger and Lenis (loaded lazily).
Every page ships as complete HTML and works without JavaScript.

> **Before launch:** fill every item in [`FILLS.md`](FILLS.md) and set `SITE_URL`. Never publish invented numbers, reviews or projects.

## 1. Run it

Requires Node 22.12+.

```bash
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | Type-check |
| `npm run og` | Regenerate the 1200×630 share image for every page into `public/og/` (run after a build, then build again) |
| `npm run seo` | Check titles, descriptions, H1s, canonicals, OG images, JSON-LD and alt text on every built page |
| `npm run a11y` | axe-core WCAG 2.2 AA scan of every page at 390px and 1440px |
| `npm run vitals` | LCP and CLS on a throttled phone profile |
| `npm run screenshots` | Screenshots (`PAGES=/,/faq WIDTHS=390,1440`) |

## 2. Edit content (no code)

| What | Where |
|---|---|
| Phone, address, hours, email, map, socials, areas served | `src/lib/site.ts` |
| Service pages (one file each, file name = URL) | `src/content/services/*.md` |
| Projects / case studies | `src/content/projects/*.md` + photos in `src/assets/projects/` |
| FAQ | `src/content/faq.json` (`preview: true` = shown on the homepage) |
| Journal articles | `src/content/journal/*.md` |
| Process steps, Why ACP, materials, quality, styles | `src/lib/content.ts` |
| Redirects and `/review` link | `public/_redirects` |

**Add a project**
1. Copy `src/content/projects/pochayil-karunagappally.md` to a new file, e.g. `my-project.md`. It will appear at `/projects/my-project`.
2. Put photos in `src/assets/projects/` (JPG, at least 1600px wide). Astro makes AVIF/WebP in several sizes.
3. List them under `cover:` and `gallery:` with descriptive `alt` text and a `label` of `Design render` or `Completed`.
4. Set `confirmed: true` when every detail is checked. Until then the page is `noindex` and left out of the sitemap.

**Add an article:** add a Markdown file to `src/content/journal/` with the same frontmatter as the others. Use `##` headings; they become the table of contents.

Text in `[FILL: …]` shows as a yellow marker on the page until you replace it.

## 3. Deploy (Netlify)

1. Push to GitHub and import the repo in Netlify. `netlify.toml` sets the build (`npm run build`, publish `dist`).
2. Set environment variables: `SITE_URL` (required), and optionally `PUBLIC_FORM_ENDPOINT`, `PUBLIC_GA4_ID`, `PUBLIC_META_PIXEL_ID`. See `.env.example`.
3. After the domain is live, run `npm run build && npm run og` locally and commit `public/og/` if headlines changed.
4. Submit `https://<domain>/sitemap-index.xml` in Google Search Console.

Vercel also works: framework preset Astro, output `dist`. Add the `public/_redirects` rules to `vercel.json`.

## 4. How it works

- **WhatsApp first.** Every page has a WhatsApp CTA with a pre-filled message naming the page (`waContext`). The picker sends all three answers. The contact form opens WhatsApp with the details and also POSTs JSON to `PUBLIC_FORM_ENDPOINT` if set.
- **Analytics** (GA4 + Meta Pixel) load only after cookie consent. Events: `whatsapp_click`, `call_click`, `directions_click`, `picker_complete`, `form_submit`, `project_view`. UTM and click IDs are kept for the session and sent with each event.
- **SEO:** unique titles and descriptions, one H1 per page, canonicals, breadcrumbs, sitemap, robots.txt, per-page OG images, and JSON-LD (`HomeAndConstructionBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `CreativeWork`, `Article`). Fields still marked `[FILL]` are left out of schema automatically.
- **Motion** is described in `DESIGN.md`. Reduced-motion users get fades only.

## 5. Project docs

- [`PRODUCT.md`](PRODUCT.md): product context
- [`DESIGN.md`](DESIGN.md): tokens, motifs, motion and component inventory
- [`FILLS.md`](FILLS.md): every missing fact
- [`SEO-REPORT.md`](SEO-REPORT.md): SEO checklist and test results
- `brand/`: original logo files and fonts from the brand kit
