# SEO checklist report

Status at handover. ✅ done and verified · ⚠️ done, needs your input · ❌ not done.
Re-run the checks any time: `npm run build && npm run seo && npm run a11y && npm run vitals`.

## Test results (local build)

**`npm run seo`:** 18 pages, all checks passed (title ≤ 60, description ≤ 155, one H1, canonical, OG image exists, JSON-LD parses with no `[FILL]` inside, alt on every image, `lang="en-IN"`).

**`npm run a11y`** (axe-core, WCAG 2.2 AA + best practice, every page at 390px and 1440px): **0 violations.**

**`npm run vitals`** (Moto G4 profile, 4× CPU throttle, 150 ms latency, 1.6 Mbps):

| Page | LCP | CLS | Transfer |
|---|---|---|---|
| `/` | 788 ms | 0.005 | 421 KB |
| `/acp-cladding-kollam/` | 716 ms | 0.001 | 231 KB |
| `/projects/` | 592 ms | 0 | 175 KB |
| `/contact/` | 600 ms | 0 | 174 KB |
| `/faq/` | 660 ms | 0 | 180 KB |
| `/journal/acp-cladding-cost-kerala/` | 616 ms | 0 | 180 KB |

Targets: LCP < 2.0 s ✅ · CLS < 0.05 ✅. Measured locally; confirm on the live domain with PageSpeed Insights.

**JavaScript (gzipped):** shared UI 2.3 KB · analytics 0.9 KB · picker 1.3 KB · Lenis 5.4 KB (desktop only) · GSAP + ScrollTrigger 44.4 KB (only on pages with scroll scenes, after load). Homepage total ≈ 54 KB, under the 90 KB budget ✅.

## Technical
| Item | Status |
|---|---|
| Complete static HTML on every page (Astro static output) | ✅ |
| Core Web Vitals targets (see above) | ✅ local · ⚠️ confirm live |
| Lighthouse 95+ on all four scores | ❌ Lighthouse would not finish in the build sandbox. The axe and vitals checks above cover most of it. Run PageSpeed Insights after deploy. |
| Images: AVIF/WebP `<picture>`, width/height, lazy loading, `srcset` | ✅ wired for project photos (`astro:assets`). ⚠️ no real photos supplied yet |
| `fetchpriority="high"` on the hero image only | ✅ home hero photo, service-page hero photos and case-study cover |
| Self-hosted fonts, preload 300/700, `font-display: swap` | ✅ |
| Critical CSS inlined (`inlineStylesheets: 'always'`) | ✅ |
| `sitemap-index.xml` (excludes 404, privacy, unconfirmed case studies) | ✅ |
| `robots.txt` with sitemap | ✅ |
| Canonical URLs, clean slugs, trailing slash consistent | ✅ |
| 301 redirect map (`public/_redirects`) | ✅ starter map. ⚠️ add old URLs if a previous site existed |
| Custom 404 with WhatsApp CTA | ✅ |
| One 1200×630 OG image per page, brand style | ✅ 17 images in `public/og/` |
| Twitter cards | ✅ |
| `lang="en-IN"` | ✅ · Malayalam (`hreflang`) later |
| `SITE_URL` set to the real domain | ⚠️ currently `https://facado.netlify.app` |

## On-page
| Item | Status |
|---|---|
| Unique `<title>` ≤ 60 and meta description ≤ 155 with location + benefit | ✅ |
| One H1 per page containing the primary keyword | ✅ (home H1 includes "ACP facade design · Kollam, Kerala") |
| Descriptive alt text | ✅ for logos. ⚠️ write alt text for each project photo you add |
| Internal linking: home → services → projects → FAQ → contact | ✅ |
| Breadcrumbs on every inner page (visible + `BreadcrumbList`) | ✅ |
| Service pages ≥ 600 words of unique copy | ✅ 717–847 words each, plus 5 page-specific FAQs |
| Journal: TOC, author box, related services, CTA | ✅ 3 starter articles |

## Structured data
| Type | Where | Status |
|---|---|---|
| `HomeAndConstructionBusiness` | Every page (`@id …/#business`) | ✅ ⚠️ street, PIN, email, hours, geo, socials, priceRange are left out until filled |
| `Service` | Each service page | ✅ |
| `FAQPage` | `/faq` + each service page | ✅ |
| `BreadcrumbList` | Every inner page | ✅ |
| `CreativeWork` / `ImageObject` | Case studies | ✅ (images added automatically when photos exist) |
| `Article` | Journal posts | ✅ |
| No `Review` / `AggregateRating` | — | ✅ none, by design |
| Google Rich Results Test | — | ❌ needs a public URL. Test after deploy |

## Local SEO
| Item | Status |
|---|---|
| NAP identical in footer, contact, CTA and schema (single source: `src/lib/site.ts`) | ✅ ⚠️ street, PIN, email and hours are still `[FILL]` |
| Embedded map (loads on click) | ✅ |
| "Areas we serve" with real towns only, no doorway pages | ✅ Karunagappally, Kollam. ⚠️ add other districts |
| `/review` redirect to the Google review link | ⚠️ points to a Maps search until you add the GBP review URL |

## AI search / GEO
| Item | Status |
|---|---|
| Quotable answer in the first paragraph of every service page and FAQ | ✅ |
| Consistent entity line "FACADO LLP, an ACP facade and exterior design studio in Karunagappally, Kerala" | ✅ footer, about, schema |

## Not done from the brief
- `npx impeccable detect` and the `/impeccable` workflow: the Impeccable skill was not installed in the build environment. The design rules from the brief (no Inter, no glassmorphism, no bounce, square corners, etc.) were followed by hand.
- Lighthouse report and Rich Results screenshots: see above.
- Real textures (`bg_rust.jpg`, `bg_cream.jpg`) were not in the kit; the grain is generated in CSS. Brochure images are used as illustrative images (tagged "Illustrative"); real project photos are still needed.
