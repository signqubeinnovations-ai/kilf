import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const lenis = (window as unknown as { __lenis?: { on: (e: string, f: () => void) => void } }).__lenis;
lenis?.on('scroll', ScrollTrigger.update);

/* Signature: the cladding scene. Panels of the facade render flip into place as you scroll.
   0.00–0.20 skeleton rises, columns and slabs draw, aluminium rails · 0.20–0.72 12 panels · 0.72–0.86 street and sky take colour
   0.86–1.00 lights on, LED outline traces the building */
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const expoOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const band = (a: number, b: number, v: number) => clamp((v - a) / (b - a));
document.querySelectorAll<HTMLElement>('[data-cladding]').forEach((scene) => {
  const stage = scene.querySelector<HTMLElement>('[data-cs-stage]');
  const tiles = [...scene.querySelectorAll<HTMLElement>('.cs-tile')];
  const count = scene.querySelector<HTMLElement>('[data-cs-count]');
  if (!stage || !tiles.length) return;
  // Install order: top row first, left to right, like a crew working down the scaffold.
  const order = tiles.map((t, k) => ({ t, k, i: +t.dataset.i!, j: +t.dataset.j! })).sort((a, b) => a.j - b.j || a.i - b.i);
  const n = order.length;
  const set = (p: number) => {
    stage.style.setProperty('--sk', expoOut(band(0, 0.1, p)).toFixed(3));
    stage.style.setProperty('--frame', band(0.04, 0.16, p).toFixed(3));
    stage.style.setProperty('--rails', band(0.12, 0.2, p).toFixed(3));
    let done = 0;
    order.forEach((o, idx) => {
      const t0 = 0.2 + (idx / n) * 0.46;
      const e = expoOut(band(t0, t0 + 0.1, p));
      o.t.style.setProperty('--t', e.toFixed(3));
      if (e > 0.98) done++;
    });
    stage.style.setProperty('--color', band(0.72, 0.86, p).toFixed(3));
    stage.style.setProperty('--glow', band(0.86, 1, p).toFixed(3));
    if (count) count.textContent = String(Math.max(1, done)).padStart(2, '0');
  };
  stage.classList.add('is-anim');
  set(0);
  ScrollTrigger.create({
    trigger: scene,
    start: 'top top',
    end: () => '+=' + Math.round(innerHeight * 1.1),
    pin: scene.querySelector('[data-pin]') || scene,
    scrub: 0.5,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => set(self.progress),
  });
});

/* Project gallery: horizontal pinned scroll on desktop. Mobile keeps native swipe. */
const mm = gsap.matchMedia();
mm.add('(min-width: 64rem)', () => {
  document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-htrack]');
    if (!track) return;
    const dist = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
    if (dist() < 40) return;
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 12%', end: () => '+=' + dist(), scrub: 0.6, pin: true, invalidateOnRefresh: true },
    });
  });
});

addEventListener('load', () => ScrollTrigger.refresh());
