# KILF 2027 website

Official website for the **Kollam International Literature Festival (KILF) 2027**: 31 December 2026 – 4 January 2027, Kollam, Kerala.

Built with [Astro](https://astro.build) and Tailwind CSS. It is a fully static site: fast, SEO-friendly and hostable anywhere. The design is **Chapter 1: The Pause**: calm, intimate and still, like Ashtamudi Lake in the morning. Its one moment of motion is pure CSS; the only React island is the theatre ticket card on the Khasak page (with [Motion](https://motion.dev)). Everything else is plain HTML with a few tiny scripts (menu, countdown, speaker filters, schedule tabs, map loader, forms).

- **English** at `/` (default), **Malayalam** at `/ml/`. Home, About and Our cause are fully translated; every other `/ml/` page has its headlines in Malayalam over the English text, with a notice.
- Content (speakers, FAQs, passes, strands, programme, sponsors) lives in `src/content/` and can be edited without touching code.

---

## 1. Run it locally

Requires **Node 22.12+**.

```bash
npm install
cp .env.example .env     # optional: fill in the form endpoint etc.
npm run dev              # http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload. `[PLACEHOLDERS]` are highlighted in yellow. |
| `npm run build` | Production build into `dist/` (plain static files). |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run check` | Type-check content and components. |
| `npm run assets` | Regenerate stand-in images and the share image (also runs before `dev`/`build`). |
| `npm run screenshots` | After a build: screenshots of key pages at mobile + desktop into `screenshots/`. |

## 2. Artwork and photos: `kilf-assets/`

Put the brochure artwork here, using these names:

```
kilf-assets/
  logos/kilf-logo.svg            # main logo (cobalt), used in the header
  logos/kilf-logo-white.svg      # logo for dark backgrounds (footer)
  illustrations/p4_stage.jpg     # Khasakkinte Ithihasam stage (home, /khasak)
  illustrations/cover.jpg        # optional: replaces the art in the social share image
  speakers/<file>.jpg            # illustrated speaker portraits, e.g. m-mukundan.jpg
  reference-brochure.pdf         # design reference (not published)
```

Until a file is present, the site uses an on-brand **stand-in**: flat SVG illustrations in `src/placeholders/`, and, for speakers, a drawn figure by the water (no initials). A real file with the same name (any of `.jpg .png .webp .avif`) replaces its stand-in automatically on the next build. Images are resized and served as AVIF/WebP with `<picture>`; portraits load lazily.

**Speaker portraits:** the home page's eight featured voices (and the Speakers page) are waiting for illustrated portraits. Save each as `kilf-assets/speakers/<slug>.jpg`, where `<slug>` is the speaker's file name in `src/content/speakers/` (for example `m-mukundan.jpg`). 4:5, at least 640 × 800 px.

The lake illustrations (`src/assets/art/lake-hero.jpg`, the open book on the jetty, and `lake-jetty.jpg`, the wide jetty scene) are part of the design and stay still, apart from the home hero's one moment (see Motion below). Both were upscaled 4× from 1241 px originals with Real-ESRGAN; higher-resolution originals of the same scenes can replace them. The hero's ripple is clipped to the water's outline (`mask` in `src/lib/lake-art.ts`): if you change the picture's composition, update the outline.

The home hero is full-bleed on desktop (the illustration covers the whole section, with a soft "mist" behind the words) and stacked on phones and tablets (words on the cream sky, the lake below). Its crop at each screen size is set with `object-[…]` classes and the matching `[--px:…]` values on `HeroLake` in `src/views/Home.astro`, so the ripple and the karimeen stay pinned to the picture.

The 1200×630 social share image (`public/og-image.jpg`) is built on every build: the title panel (`scripts/og-panel.png`, "Chapter 1: The Pause." with the dates, drawn once in the site's type) beside the lake-and-book art, or `kilf-assets/illustrations/cover.jpg` if present. Redraw the panel if the title or dates change.

## 3. Editing content

All content is validated at build time, so a typo in a field name fails the build with a clear message.

| What | Where |
|---|---|
| Festival facts (dates, venues, email, social handle, organiser) | `src/lib/site.ts` |
| Speakers | `src/content/speakers/*.md` |
| FAQs | `src/content/faqs.json` |
| Passes | `src/content/passes.json` |
| The nine strands (EN + ML) | `src/content/strands.json` |
| Programme teasers | `src/content/teasers.json` |
| Programme, day by day (proposed) | `src/content/schedule.json` |
| Sponsors / partner logos | `src/content/sponsors.json` |
| Partnership page (why, audience, tiers, benefits) | `src/data/partnership.json` |
| UI text + Malayalam translations | `src/i18n/ui.ts`, `src/i18n/about-qa.ts` |
| Malayalam headlines on the other `/ml/` pages | Beside the English, in each view: `h('English', 'മലയാളം')` |
| Our cause (commitments, clean-up) | `src/i18n/ui.ts` (`cause.*`, `home.cause.*`) |

### Add a speaker

1. Put the illustrated portrait (4:5) in `kilf-assets/speakers/`, e.g. `kilf-assets/speakers/k-r-meera.jpg`.
2. Create `src/content/speakers/k-r-meera.md`:

   ```md
   ---
   name: "K. R. Meera"
   role: "Novelist · Malayalam literature"
   photo: k-r-meera.jpg
   categories: [literature]          # any of: literature, cinema, music, history-ideas
   order: 175                        # lower = earlier in the grid
   featured: false                   # the home page's eight voices are chosen in src/views/Home.astro
   status: proposed                  # change to "confirmed" once confirmed
   ---

   Optional bio in Markdown. If you write one, the speaker gets a page at /speakers/k-r-meera.
   ```

3. Commit. The speakers page, filters and home preview update automatically.

To remove a speaker, delete their `.md` file.

### The programme

`src/content/schedule.json` holds the day-by-day programme (a proposed one for now: 31 December to 4 January, 45 sessions). The Programme page shows it as tabs, one per day, with a strand filter; with `[]` it falls back to the six teasers and a "Notify me" banner.

Each day has a `theme` ("First light.") and `theme_ml` (its Malayalam title, for `/ml/`), a `blurb` and `allDay` lines (book fair, food festival, exhibition). Each session has `start`/`end`, `title`, `description`, `venue` (`sngcc`, `8point` or `ashramam`), `strand` (an id from `strands.json`, or `youth`), `format` (conversation, panel, reading, workshop, performance, screening, walk or ceremony), `speakers` (speaker file names), `guests` (other participants as text, e.g. "Malayalam poets (invited)"), `language`, `highlight` (a ★ must-see) and an optional `link` (e.g. theatre tickets). Speaker chips link to the speaker's note on `/speakers`.

```json
[
  {
    "id": "2027-01-01",
    "date": "2027-01-01",
    "label": "Day 2",
    "theme": "First light.",
    "blurb": "One or two sentences about the day.",
    "allDay": ["Book fair · Ashramam Maidan · 10:00–21:00"],
    "sessions": [
      {
        "start": "10:00",
        "end": "11:00",
        "title": "The Malayali in the mirror",
        "description": "Optional one-liner.",
        "venue": "sngcc",
        "strand": "literature",
        "format": "conversation",
        "speakers": ["subhash-chandran"],
        "guests": ["A moderator (to be announced)"],
        "language": "Malayalam",
        "highlight": true
      }
    ]
  }
]
```

- `venue` is one of `sngcc` (Sreenarayana Guru Cultural Centre, venue code 1), `8point` (8 Point Art Cafe, code 2) or `ashramam` (Ashramam Maidan, code 3). Venues and their ring codes are defined in `src/lib/site.ts`.
- `speakers` are speaker file names without `.md`.
- `language` (optional) is one of `Malayalam`, `English`, `Tamil` or `Bilingual`.

(The build prints a harmless "No items found" warning while `sponsors.json` is empty.)

### Open ticketing

Prices are already in `src/content/passes.json` (`"price"`, with `"priceNote"` saying what it covers). When sales open, add `"buyUrl"` to each pass and the "Notify me" button becomes a "Buy" button. Theatre ticket prices and dates for Khasakkinte Ithihasam are in `src/components/motion/TicketCard.tsx` and `src/views/Khasak.astro`.

### Translate another page into Malayalam

1. Move the page's English strings into `src/i18n/ui.ts` (the `en` block) and add the Malayalam strings to the `ml` block, as Home, About and Our cause do. Use `t('key')` in the view in `src/views/`. (Its headlines are already in Malayalam, via `headings()`.)
2. Add the path (e.g. `'/programme'`) to `translatedPaths` in `src/i18n/ui.ts`.
3. Add the path to the sitemap filter in `astro.config.mjs`.

Untranslated `/ml/` pages show a notice, are `noindex`, and point their canonical URL at the English page. Their headlines are set in Malayalam with `lang="ml"`.

## 4. Forms

Every form (Register, Volunteer, Exhibit, College, Partner enquiry, Contact and the "Notify me" banners) sends a JSON POST to **`PUBLIC_FORM_ENDPOINT`**. Each submission carries a `form` field naming the form (`register`, `volunteer`, `exhibit`, `partner`, `contact`, `college`, `passes-notify`, `khasak-tickets`, and `programme-notify` while the programme is empty) and the `page` it came from. Volunteers can choose the Ashtamudi clean-up.

- **Formspree** (simplest): create a form, then set `PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx`.
- **Google Sheets**: deploy an Apps Script web app whose `doPost(e)` appends `JSON.parse(e.postData.contents)` to a sheet, then set the endpoint to its `https://script.google.com/macros/s/…/exec` URL. The site sends a CORS-safe request for Apps Script automatically.
- Optional overrides: `PUBLIC_FORM_ENDPOINT_PARTNER` and `PUBLIC_FORM_ENDPOINT_NEWSLETTER`.

Spam protection: a hidden honeypot field (`_gotcha`) and a minimum fill time. Bots see a fake success and nothing is sent. In `npm run dev` with no endpoint set, forms simulate success. In production with no endpoint, forms show an error with the festival email.

## 5. Environment variables

See `.env.example`. Set them in Vercel/Netlify under *Settings → Environment variables*.

| Variable | Purpose |
|---|---|
| `SITE_URL` | Public URL, used for canonical links, sitemap, Open Graph and the footer QR code. **Set this once the domain is known.** |
| `PUBLIC_FORM_ENDPOINT` | Form backend (see above). |
| `PUBLIC_GA4_ID` *or* `PUBLIC_PLAUSIBLE_DOMAIN` | Analytics. Nothing loads if both are empty. The privacy page adapts automatically. |
| `PUBLIC_PARTNER_CALL_URL` | Link for "Book a partnership call" (Calendly, Cal.com…). Falls back to an email link. |
| `PUBLIC_WHATSAPP_URL` | WhatsApp channel/community link (not shown anywhere at the moment). |

## 6. Deploy

**Vercel**: import the repo. `vercel.json` sets the build (`npm run build`, output `dist`). Add the env variables and deploy.

**Netlify**: import the repo. `netlify.toml` is included.

**Any static host**: run `npm run build` and upload `dist/`.

The partnership proposal PDF: put it at `public/downloads/kilf-2027-partnership-proposal.pdf` and the Partners page shows a download link.

## 7. What's where

```
src/
  components/     Header, Footer, ChapterLabel, Headline, Rings, Divider,
                  HeroLake, Karimeen, CauseArt, MiniCountdown, LakeArt,
                  SpeakerCard, Portrait, Section, Form/Field, MotionToggle, Icon …
  components/motion/  The theatre ticket card (TicketCard, a React island with Motion)
  components/blocks/  Larger reusable sections (strands, notify banner, schedule)
  assets/art/     The lake illustrations used across the site
  views/          Page bodies, shared by the English and /ml/ routes
  pages/          Routes (thin wrappers around views) + robots.txt
  layouts/        BaseLayout: SEO, Open Graph, JSON-LD, fonts, analytics
  content/        Editable content collections
  i18n/           Translations, and headings() for Malayalam headlines
  lib/            Site facts (venues and ring codes), lake-art outlines, image lookup
  styles/         Design tokens (colours, type) in global.css
  placeholders/   Stand-in SVG illustrations
scripts/          Asset preparation (and the share image's title panel), screenshots
kilf-assets/      Real artwork (see section 2)
```

### Motion

One orchestrated moment on its own, and one that follows your scroll:

| Where | What moves | Component |
|---|---|---|
| Home hero | The lake is still. Soon after the page opens, a karimeen (a small line drawing) leaps once from the water and slips back in; every six seconds a single ripple spreads from the open book, over the water only | `src/components/HeroLake.astro` (pure CSS), `Karimeen.astro` |
| "Keep the waters alive" artwork (home and `/cause`) | The karimeen swims with the page: as the card scrolls into view it swims in from the left, tail swishing and bubbles rising, settles in the middle, and drifts on as you keep scrolling. Scrolling back reverses it | `src/components/CauseArt.astro` (a small scroll script) |
| Khasakkinte Ithihasam tickets | Ticket type and preview transitions, when you use the card | `motion/TicketCard.tsx` (Motion) |
| Buttons | A ring spreads once on hover | `global.css` |

- **Pause the lake** buttons (hero and footer) stop both and remember the choice (WCAG 2.2.2). The operating system's *reduce motion* setting shows the lake still and the fish resting in the middle of its card.
- There are no scroll reveals, marquees or count-ups.

### Layout and colour

- Calm surfaces: cream pages, pale lake-blue bands, and night navy for the evenings (New Year's Eve, the theatre). Generous space, one idea per screen, hairlines instead of boxes.
- **Ripple rings** are the system motif (`Rings.astro`): one ring beside every section label (`ChapterLabel`), three between sections (`Divider`), and the **venue codes**: Sreenarayana Guru Cultural Centre 1 ring, 8 Point Art Cafe 2, Ashramam Maidan 3, on the home page, the Programme and Visit.
- Headlines (`Headline`) are Plus Jakarta Sans 800 with tight tracking; a second line in cobalt, and at most **one coral word** per headline (`coral="word"`). Coral text on light surfaces uses `coral-text` (#DB5A3B) to pass WCAG AA for large text.
- Section labels have no numbers; only real sequences (steps, times) are numbered.
- Buttons are square. Primary buttons are cobalt on light surfaces and cream on night navy (`LimeButton`, default `primary`). Secondary actions are underlined text links with a ↗ (`TextLink`).
- Speaker portraits are 4:5 rounded rectangles (`Portrait.astro`), lazy-loaded.

### Brand notes

- **Type:** Plus Jakarta Sans (800 for headlines, 500 for text), Noto Sans Malayalam for Malayalam. Both self-hosted.
- **Colours** (Tailwind tokens in `src/styles/global.css`): cream `#FCFAF3`, navy `#13207A`, cobalt `#1F3FD8`, coral `#F2785A`, lake `#A9C4EA`, night `#101B62`. No lime or green.
- **Voice:** calm, short sentences; no hype, no exclamation marks, no unverified numbers. Taglines: "Chapter 1: The Pause.", "Pause. Turn a page.", and to close, "Come for a story. Stay for the connection." The cause: "Keep the waters alive."
- The previous design is kept on the branch `archive/design-2026-09-astra`.
