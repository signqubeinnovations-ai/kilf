# Open [FILL] items

Every missing fact on the site is marked `[FILL: …]` and shows as a **yellow striped marker** on the page.
Nothing was invented. Fill these before going live, then search the repo for `[FILL` to confirm none are left.

## 1. Business facts (NAP) — `src/lib/site.ts`
These must match your Google Business Profile **exactly**. Schema markup leaves a field out until it is filled.

| Field | Where it shows |
|---|---|
| ~~`address.street`~~ ✅ filled from the brochure: Opposite Court Complex, Railway Station Road | Footer, contact, CTA band, schema |
| `officePhones` (+91 79026 44001 / 44002, from the brochure) | Footer, contact. **Confirm which number is on your Google Business Profile**; schema uses the WhatsApp number +91 81130 13556 |
| `address.postalCode` (PIN) | Footer, contact, CTA band, schema |
| `email` | Footer, contact, privacy, schema |
| `hoursDisplay` + `hoursSchema` (e.g. Mon–Sat 9:30–18:30) | Footer, contact, schema `openingHours` |
| `geo` (lat/lng of the office) | Schema, map embed |
| `mapsUrl` (Google Maps link) | Directions buttons, sticky mobile bar, schema `sameAs` |
| `reviewUrl` + `public/_redirects` `/review` line | `/review` redirect for post-handover review requests |
| `social.instagram`, `social.facebook` | Footer icons (hidden until filled), schema `sameAs` |
| `areasServed` + `areasNote` (other districts) | Footer, schema `areaServed` |
| `priceRange` (e.g. ₹₹) | Schema |
| `founded` | About |

## 1b. Brochure images — `src/assets/brochure/`
Nine reference images from the brochure are used on the homepage tiles, materials, service pages and About, each tagged **Illustrative**. They are not shown as FACADO projects. If any of them **is** your own completed work, tell us and it can move into a case study labelled "Completed". Replace the rest with your own photos when you can (`src/lib/images.ts`). One brochure image (white curved building) was left out because it carries another company's watermark.

## 2. Studio — `src/pages/about.astro`
- Founders, year started and why (2–3 short paragraphs)
- Team size and roles, plus real team/workshop photos if you have them

## 3. Pochayil case study — `src/content/projects/pochayil-karunagappally.md`
- Confirm client name and location
- Scope, materials/finishes, framework and fixings
- Brief, challenge, solution, result (no invented numbers)
- ✅ Design render added (`src/assets/projects/pochayil-render.jpg`), used as the case-study cover and in the homepage cladding animation. The skeleton drawing (`pochayil-skeleton.jpg`) is generated from it.
- **Completed site photos**: put them in `src/assets/projects/` and add `cover:` / `gallery:` entries. Label each `Design render` or `Completed`.
- Before/after photos only if real (`beforeAfter:`)
- Then set `confirmed: true`. Until then the page is `noindex` and left out of the sitemap.
- More real projects: copy the file, one Markdown file per project.

## 4. Service pages — `src/content/services/*.md`
- ACP brands you usually use (ACP cladding FAQ)
- Other towns/districts served (ACP cladding, commercial)
- Number of 3D concepts and revision rounds; is the 3D concept free? (3D design FAQ)
- Gates / compound walls in scope? (villa FAQ)

## 5. FAQ — `src/content/faq.json`
- Typical installation timelines
- Price range per sq ft by finish (or keep the "depends + free site visit" answer)
- Workmanship warranty
- Is the 3D concept free?
- Other districts served
- Signage: in-house or partner?

## 6. Journal — `src/content/journal/*`
- Cost article: price ranges with the date they were valid (optional)
- Author box: named author and role (optional; `author:` in frontmatter)

## 7. Contact & legal
- Reply time you can promise (`src/pages/contact.astro`)
- Privacy policy review with your adviser (`src/pages/privacy.astro`)

## 8. Settings (environment variables in Netlify)
| Variable | Purpose |
|---|---|
| `SITE_URL` | Your real domain. Canonicals, sitemap, OG images. **Required before launch.** |
| `PUBLIC_FORM_ENDPOINT` | n8n / Make / Formspree webhook. Empty = form opens WhatsApp only. |
| `PUBLIC_GA4_ID` | GA4 measurement ID. Empty = no analytics, no cookie banner. |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel ID. |

## 9. Reviews
Only add a rating or review count when it is real and shown on the page. No `Review` / `AggregateRating` schema until then.
