# DESIGN.md — FACADO design system (web)

The source of truth for tokens is `src/styles/global.css` (`@theme` and the surface classes).
Brand assets live in `/brand` (logos, fonts). Web-ready copies are in `public/brand` and `public/fonts`.

## Direction
An architecture studio's portfolio: calm, precise, material-rich, confident.
Square corners, generous negative space, asymmetric editorial layouts, full-bleed sections alternating **rust → charcoal → paper**.

## Colour tokens
| Token | Value | Use |
|---|---|---|
| `--color-rust` | `#6B3022` | Primary surface, always with generated grain (`.s-rust`) |
| `--color-rust-deep` | `#552519` | Depth in gradients and drawings |
| `--color-cream` | `#F2F0DA` | Logo and type on dark |
| `--color-charcoal` | `#221D1A` | Secondary dark surface; body text on paper |
| `--color-paper` | `#ECE7D7` | Light surface (`.s-paper`, light grain) |
| `--color-paper-deep` | `#E2DBC7` | Image wells, map placeholder |
| `--color-sand` | `#C9A27A` | Accent only (≤5% of a screen): eyebrows, numbers, active states. On charcoal. |
| `--color-sand-hi` | `#D6B48E` | Sand for **small text on rust** (5.1:1). Brand sand is 4.3:1 on rust, below AA. |
| `--color-sand-ink` | `#8A5A2E` | Sand for **text and focus rings on paper** (4.7:1). Brand sand is 1.9:1 on paper. |
| `--color-wa` | `#25D366` | WhatsApp icon only |

Contrast (WCAG AA): cream on rust 8.8:1 · cream on charcoal 14.5:1 · charcoal on paper 13.5:1 · rust on paper 8.2:1.

**Surfaces** set `--fg`, `--muted`, `--accent`, `--rule`, `--focus`, `--btn-bg`, `--btn-fg`, `--crop-c`. Use `.s-rust`, `.s-charcoal` or `.s-paper` on a section and every child adapts.

**Grain:** the kit had no `bg_rust.jpg` / `bg_cream.jpg`, so the grain is an SVG noise tile (about 400 bytes, no request). To use the real textures, replace `--grain` / `--grain-light` with `url('/brand/textures/bg_rust.jpg')`.

## Typography
- **Rajdhani** 300 / 400 / 500 / 600 / 700, self-hosted, `font-display: swap`, 300 and 700 preloaded. Headlines, labels, nav, buttons, short copy.
- **Hanken Grotesk** (variable, self-hosted) for long paragraphs (`.body-copy`, `.prose`). Rajdhani's small x-height tires the eye in long reading. Not Inter.
- Headlines in CAPS, tracking +0.02 to +0.04em, mixing **thin 300 and bold 700** in one headline (`Headline` component, prefix a line with `*` for bold).
- Fluid scale, ratio ~1.333: `--step--1` … `--step-4`, `--step-hero: clamp(3.1rem, 1.2rem + 8vw, 9rem)`.
- Body copy max 65ch, line-height 1.55–1.7.

## Signature motifs
| Motif | Class / component |
|---|---|
| Architectural crop marks (L-corners) | `.crop` (+ `.crop-hover` grows them on hover) |
| Dimension line with end ticks and centred caps label | `<Dim label="ACP FACADE / COMMERCIAL SHOWROOM" />` |
| Eyebrow `—— WHY ACP` | `.eyebrow` |
| Section counter `03 / 11` | `<Counter n={3} of={11} />` |
| Numbered rule lists `01 / 02 / 03` | `.rule-list` + `.num` |
| Building cut-out bleeding off the viewport | `<Art kind="hero" />` in the home hero |

## Logo
Vector-traced from the supplied logo files (`src/assets/brand/logo-paths.json`, `public/brand/*.svg`). Cream on dark, rust on paper. Never recolour or stretch it. The wordmark is split into six letter paths so it can draw in letter by letter.

## Shape, space, elevation
- Radius 0–2px (buttons 2px). Architecture is square.
- 12-column grid (`.grid-12`), gutter `clamp(1rem, 4vw, 4rem)` (16px on phones), max width 92rem.
- Sections: `clamp(4.5rem, 9vw, 9.5rem)` vertical padding.
- No shadows except the floating slide-in and the cookie banner.

## Motion
Easing `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). Durations 0.5–0.9s. Stagger 60–90ms. No bounce.
Only `transform`, `opacity`, `clip-path` and `mask` are animated.

| # | Moment | How |
|---|---|---|
| 1 | Hero intro | Wordmark letters clip in (CSS), headline lines slide up behind a mask, building rises and bleeds off-frame, LED and dimension lines draw |
| 2 | Cladding scene | `components/CladdingScene.astro`. GSAP ScrollTrigger pins the section over a dusk sky. The facade image starts as bare grey concrete, aluminium rails draw, then 48 panels of the real image flip down in 3D (CSS perspective) one by one, the street takes colour, facade lights come on and an LED outline traces the building. Counter `PANEL 01 → 48`. Drop `src/assets/projects/pochayil-render.jpg` in and it is used automatically |
| 3 | Page transitions | Native cross-document View Transitions: six vertical panels wipe in with cream seams (CSS `mask` + `@property`) |
| 4 | Headlines | IntersectionObserver adds `.is-in`; masked line slide-up |
| 5 | Project gallery | Horizontal pinned scroll on desktop (GSAP), scroll-snap swipe on mobile; crop marks grow on hover |
| 6 | Before / after | `BeforeAfter` component, handle styled as a dimension line. Only renders with real before photos |
| 7 | Process timeline | Vertical line fills with scroll; number circles stamp in |
| 8 | Category marquee | CSS, 48s loop, pauses on hover |
| 9 | Magnetic CTA | WhatsApp buttons move up to 6px toward the cursor (desktop); pulse every 6s, 3 times |
| 10 | CAD cursor | Crosshair with live X/Y in sand, desktop only, over project images (`data-cad`) |

**Reduced motion:** `html.rm` swaps every movement for a simple fade; GSAP and Lenis never load. **No JS:** everything is visible in its final state.
**Loading:** GSAP + ScrollTrigger load only on pages with `[data-gsap]`, after `load` + idle. Lenis loads on desktop only.

## Component inventory
| Component | File | Notes |
|---|---|---|
| Base layout | `src/layouts/Base.astro` | SEO meta, OG/Twitter, canonical, JSON-LD, font preload, motion-mode class |
| Header | `components/Header.astro` | Sticky rust bar, hides on scroll down; mobile menu uses the Popover API (works without JS) |
| Footer | `components/Footer.astro` | NAP, services, studio links, socials (hidden until filled) |
| MobileBar | `components/MobileBar.astro` | Sticky WhatsApp · Call · Directions under 768px |
| WaButton | `components/WaButton.astro` | Pre-filled WhatsApp link, `magnetic`, `pulse`, `size` |
| Headline | `components/Headline.astro` | Thin/bold caps lines with masked reveal |
| Logo | `components/Logo.astro` | Inline vector wordmark, optional letter animation |
| Dim, Counter, Crumbs, Fill, Icon | `components/*` | Motifs and helpers. `Fill` renders a yellow `[FILL]` marker |
| Art | `components/Art.astro` + `lib/facade.ts` | Generated SVG elevations (stand-ins until real photos) |
| Process | `components/Process.astro` | 9 steps in 3 groups, `detailed` prop for /about |
| Picker | `components/Picker.astro` | 3-step project picker → style board → WhatsApp with all answers |
| FaqList | `components/FaqList.astro` | Native `<details>` accordion |
| CtaBand | `components/CtaBand.astro` | Final rust CTA with phone, address, proof thumbnail |
| ProofThumb | `components/ProofThumb.astro` | "Recent work" micro-proof near CTAs |
| BeforeAfter | `components/BeforeAfter.astro` | Real before/after photos only |
| LeadSlideIn | `components/LeadSlideIn.astro` | Exit intent (desktop) / 60% scroll (mobile), once per session |
| Consent | `components/Consent.astro` | Only rendered when GA4 or Pixel IDs are set |

## Don'ts
Purple/blue gradients, glassmorphism, neon glows, pure black or grey, nested cards, rounded icon tiles, bounce easing, stock-photo heroes, emoji in UI, Inter/Arial/system fonts, large border-radius, the old brochure logo.
