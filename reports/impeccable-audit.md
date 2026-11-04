# Impeccable audit — FACADO website

Impeccable 4.8.0 (`/impeccable audit`), 4 November 2026. Technical audit only: findings documented, nothing fixed.

**How it was run**
- `impeccable context`: loaded PRODUCT.md and DESIGN.md (no surface brief).
- `impeccable detect src/`: regex rules on 47 source files. 0 findings.
- `impeccable detect dist/`: built HTML, all 18 pages. 1 advisory, repeated.
- `impeccable detect <url> --viewport 1280x800` and `390x844`: rendered scan of 8 pages (home, ACP cladding, villa, about, contact, FAQ, journal index, cost article).
- Supporting checks: axe-core WCAG 2.2 AA on all pages (0 violations), Playwright overflow and tap-target sweep at 360 px and 768 px, Core Web Vitals on a throttled phone profile.

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3 | Sand-ink eyebrows and counters measure 4.4:1 over the paper grain (need 4.5:1) |
| 2 | Performance | 3 | Cladding scroll scene repaints `filter` + `box-shadow` on 12 large tiles every frame |
| 3 | Theming | 3 | Strong token and surface system; about 15 hard-coded colours in the cladding scene |
| 4 | Responsive Design | 4 | No overflow at 360/768 px, all targets ≥ 24 px, phone-specific scene layout |
| 5 | Implementation Integrity | 3 | Coherent brand system; the eyebrow motif repeats on nearly every section; dead code |
| **Total** | | **16/20** | **Good** |

## Implementation Integrity Verdict

**Pass.** The site expresses one product-specific system:
- Signature motifs from the brand brief are used consistently: rust/charcoal/paper surfaces, crop marks, dimension lines, section counters, thin/bold caps headlines.
- A real project (the Pochayil render) drives the signature animation.
- Image labels are honest: "Design render" and "Illustrative".

The detector's "slop" flags mostly hit things the brief pins, and Impeccable's own rule is "the brief wins":
- `cream-palette`: `--paper #ECE7D7` is a brand-kit token.
- `kicker-above-heading` / `hero-eyebrow-chip`: the brief specifies `—— WHY ACP` eyebrow labels as a signature motif.
- `radial-spotlight-glow`: the dusk-sky background you asked for.

These are noted as false positives. The genuine integrity issues:
- **Frequency.** The eyebrow + headline pattern appears above almost every section (6–7 times on the service and About pages), which makes sections feel interchangeable.
- **Dead code.** `Picker.astro`, and `claddingScene()` / `swatches` in `src/lib/facade.ts`, are no longer used.

## Executive Summary

- Audit Health Score: **16/20 (Good)**
- Issues: **P0: 0 · P1: 1 · P2: 4 · P3: 5**
- Top issues:
  1. **[P1]** Small sand-ink text measures 4.4:1 against the textured paper background (WCAG AA needs 4.5:1).
  2. **[P2]** Contact form placeholders are 3.1:1.
  3. **[P2]** Image tags ("Illustrative", "Design render") render at 10.6 px, below the 11 px floor.
  4. **[P2]** The cladding animation repaints filters and shadows on 12 tiles every scroll frame.
  5. **[P2]** About-page quote set as 100 characters of all-caps body text.
- Next steps: fix contrast and tag sizes (`/impeccable typeset`), lighten the scroll animation (`/impeccable optimize`), remove dead code and thin out eyebrows (`/impeccable distill`), then `/impeccable polish`.

## Detailed Findings by Severity

### P1 Major

**[P1] Sand-ink small text below 4.5:1 on grained paper**
- **Location:** `.eyebrow` and `.counter` on `.s-paper` surfaces (e.g. home "About FACADO", "/ 04"; About "Philosophy"; Contact "Studio"; article "Contents" and TOC numbers). Token `--color-sand-ink` in `src/styles/global.css`.
- **Category:** Accessibility
- **Impact:** Small, bold, letter-spaced labels sit just under the contrast floor. They are harder to read in sunlight on phones, which is common for this audience.
- **Evidence:** the detector's pixel contrast reads 4.4:1 (median), measured over the rendered surface with the `--grain-light` texture. The flat colour pair is 4.74:1, so the texture tips it under. axe-core passed because it does not read textures.
- **WCAG/Standard:** 1.4.3 Contrast (Minimum), AA.
- **Recommendation:** darken `--color-sand-ink` to about `#7A4E28` (5.8:1 flat, leaving headroom for the grain), or reduce the grain tint under text.
- **Suggested command:** `/impeccable typeset`

### P2 Minor

**[P2] Placeholder text contrast 3.1:1**
- **Location:** `src/pages/contact.astro`, Location ("e.g. Karunagappally") and Message ("Size, timeline, anything else") placeholders. Colour `#878279` on `#ECE7D7`.
- **Category:** Accessibility
- **Impact:** The hint text is hard to read, and older users may miss what to type.
- **WCAG/Standard:** 1.4.3 (placeholder text that carries information).
- **Recommendation:** set `::placeholder { color: var(--muted); opacity: 1 }` (≈7:1).
- **Suggested command:** `/impeccable harden`

**[P2] Image tags below the 11 px floor**
- **Location:**
  - `.ref-tag` in `src/components/RefImage.astro` ("Illustrative", 10.56 px)
  - `.cs-tag` in `src/components/CladdingScene.astro` ("Design render", 10.88 px)
- **Category:** Accessibility / Typography
- **Impact:** These labels carry an honesty signal (render vs photo). At this size they are hard to read on phones.
- **Recommendation:** raise both to at least 0.75 rem (12 px).
- **Suggested command:** `/impeccable typeset`

**[P2] Scroll animation repaints expensive properties on 12 tiles**
- **Location:** `src/components/CladdingScene.astro` `.cs-tile` (box-shadow and filter driven by `--t` / `--glow`). `.cs-led rect` and `.cs-frame line` carry `drop-shadow` filters. All are updated from `src/scripts/motion.ts` on every ScrollTrigger tick.
- **Category:** Performance
- **Impact:** Each tile is a large image layer. Changing `box-shadow` and `filter` per frame forces repaints, and on mid-range Android phones this can drop frames while scrolling. Transforms and opacity are already compositor-friendly.
- **Recommendation:**
  - Replace the per-tile animated shadow with one static shadow on a pseudo-element whose opacity animates.
  - Move the brightness change to one overlay layer for the whole stage.
  - Keep `drop-shadow` static.
- **Suggested command:** `/impeccable optimize`

**[P2] All-caps body text in the About quote**
- **Location:** `.cm-q` blockquote in `src/pages/about.astro` (100 characters, uppercase).
- **Category:** Accessibility / Typography
- **Impact:** Long uppercase lines read slower. Caps suit short headlines, not sentences.
- **Recommendation:** sentence case, at Rajdhani 300 and a larger size.
- **Suggested command:** `/impeccable typeset`

### P3 Polish

**[P3] Eyebrow + headline on almost every section**
- **Location:** service pages (7 per page), About (6), homepage (4).
- **Category:** Implementation Integrity
- **Recommendation:** keep the brief's eyebrow motif where it orients (hero, first section). Drop it where the headline already says the same thing ("Questions" → "ASKED OFTEN.").
- **Suggested command:** `/impeccable distill`

**[P3] Dead code**
- **Location:**
  - `src/components/Picker.astro` (no longer imported)
  - `claddingScene()` and `swatches` in `src/lib/facade.ts`
- **Category:** Implementation Integrity
- **Impact:** None on the shipped site, but it misleads future editors.
- **Suggested command:** `/impeccable distill`

**[P3] Oversized article H1**
- **Location:** `src/pages/journal/[slug].astro`, `.ar-h` (76 px, 51 characters, 29% of the viewport height).
- **Category:** Typography
- **Recommendation:** use `--step-3` for titles over about 35 characters.
- **Suggested command:** `/impeccable typeset`

**[P3] Tight leading in the proof thumbnail and stragglers in lists**
- **Location:**
  - `.proof-txt` in `src/components/ProofThumb.astro` (line-height 1.25)
  - Single-word last lines in `.prose li` on the ACP cladding page and the cost article
- **Recommendation:** line-height 1.35, and add `text-wrap: pretty` to `.prose li`.
- **Suggested command:** `/impeccable polish`

**[P3] `will-change: transform` left on at rest**
- **Location:** `.ln > span` in `src/styles/global.css`, applied to every headline line on every page.
- **Category:** Performance
- **Recommendation:** remove it. The reveal is a one-off transition and does not need a permanent layer.
- **Suggested command:** `/impeccable optimize`

### Verified false positives (not counted)

| Detector rule | Why it is not an issue |
|---|---|
| `buried-raster` (cladding tiles at opacity 0) | Intentional: tiles start hidden and fly in on scroll. The finished image is shown without JavaScript or with reduced motion. |
| `cream-palette` | `--paper #ECE7D7` is a brand-kit token (brief wins). |
| `kicker-above-heading`, `hero-eyebrow-chip` | The eyebrow label is a signature motif in the brief. Frequency is covered under P3 above. |
| `radial-spotlight-glow` (cladding sky) | The dusk-sky background you asked for. |
| `repeating-stripes-gradient` | Sources: the `[FILL]` marker (temporary, removed when facts are filled), the contact map placeholder grid, the proof-thumb placeholder and the cladding floor grid. Deliberate textures, not surface stripes. |

## Patterns & Systemic Issues

- **Texture vs contrast.** The generated grain on every surface darkens or lightens the background enough to push borderline text pairs under AA. Any text token used on a textured surface needs about 0.5:1 of headroom over its flat-colour ratio.
- **Hard-coded colours in one-off components.** Most of the site uses surface tokens (`--fg`, `--muted`, `--accent`). The cladding scene, slide-in and consent banner carry about 20 literal `rgb()`/hex values that will not follow future token changes.

## Positive Findings

- **Accessibility:**
  - 0 axe-core WCAG 2.2 AA violations across all 18 pages at 390 and 1440 px.
  - Skip link, visible sand focus rings, and a Popover-API mobile menu that works without JavaScript.
- **Reduced motion is handled properly.** Every movement swaps to a fade or a static final state; nothing is just killed.
- **Performance:**
  - LCP 0.6–0.8 s and CLS ≤ 0.005 on a throttled phone.
  - About 52 KB of JavaScript, with GSAP and Lenis loaded lazily after first paint.
  - AVIF/WebP images with explicit sizes.
- **Responsive:** no horizontal overflow at 360 px or 768 px, every tap target at least 24 px (most at least 44 px), and a phone-specific layout for the pinned scene.
- **Honest content:** missing facts are marked `[FILL]`, never invented, and every image is labelled "Design render" or "Illustrative".

## Recommended Actions

1. **[P1] `/impeccable typeset`**: darken `--color-sand-ink` for small text on grained paper. Raise `.ref-tag` / `.cs-tag` to 12 px. Sentence-case the About quote. Smaller H1 for long article titles.
2. **[P2] `/impeccable harden`**: contact-form placeholder contrast.
3. **[P2] `/impeccable optimize`**: replace per-frame `box-shadow` / `filter` on the cladding tiles with opacity-driven layers; remove the resting `will-change`.
4. **[P3] `/impeccable distill`**: remove `Picker.astro` and the unused `facade.ts` exports; drop eyebrows that repeat their headline.
5. **[P3] `/impeccable polish`**: proof-thumb leading, `text-wrap: pretty` on list items, final pass.

You can ask me to run these one at a time, all at once, or in any order you prefer.

Re-run `/impeccable audit` after fixes to see your score improve.

---

## Re-audit after fixes (same day)

All recommended actions were applied, then the same scans were re-run on the same 8 pages at 1280×800 and 390×844.

| # | Dimension | Before | After | What changed |
|---|-----------|--------|-------|--------------|
| 1 | Accessibility | 3 | **4** | `--color-sand-ink` darkened to `#7A4E28` (5.8:1 flat). Placeholders use `--muted`. Image tags 12 px. About quote in sentence case. Detector `low-contrast` / `undersized-ui-text` / `all-caps-body`: **0**. axe-core: **0 violations** |
| 2 | Performance | 3 | **4** | Cladding tiles now animate only `transform` and `opacity`: the flight shadow is a fading pseudo-element, and brightness is one overlay instead of per-tile filters. Resting `will-change` removed. LCP 0.66–0.83 s, CLS ≤ 0.005 |
| 3 | Theming | 3 | **3** | Cladding scene colours moved into named scene tokens (`--cs-night`, `--cs-ember`, `--cs-led` …). No dark theme, by design: the brand alternates fixed rust / charcoal / paper surfaces |
| 4 | Responsive Design | 4 | **4** | Unchanged: no overflow at 360/768 px, targets ≥ 24 px |
| 5 | Implementation Integrity | 3 | **4** | Eyebrows reduced from 26 to 1 (the homepage hero, part of the H1 keyword). Journal date and case-study location became plain detail lines under the title. `Picker.astro`, `claddingScene()`, `swatches` and `pickerStyles` removed |
| **Total** | | **16/20** | **19/20** | **Excellent** |

**Remaining detector output, all verified as not issues:**

| Rule | Why it is not an issue |
|---|---|
| `buried-raster` | Cladding tiles start at opacity 0 and fly in on scroll (intentional). |
| `cream-palette` | Brand-kit paper token. |
| `radial-spotlight-glow` | Requested dusk-sky background. |
| `repeating-stripes-gradient` | `[FILL]` marker, map placeholder and floor grid. |
| `hero-eyebrow-chip` | Now matches the breadcrumb ("Home / Studio"), which is navigation, not a label. |
| `kicker-above-heading` ×1 | The "Illustrative" image tag stacking above a heading on phones. |

Also fixed: proof-thumb line-height 1.35, `text-wrap: pretty` on prose list items, and an article H1 one step smaller.
