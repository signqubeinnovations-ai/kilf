'use client';
import { useBehavior } from './once';

/**
 * Swim with the scroll (CauseArt). `d` is where the card's centre is: 1 as it
 * enters at the bottom of the screen, 0 in the middle, -1 as it leaves at the top.
 */
let started = false;

export default function SwimBehavior() {
  useBehavior(() => {
    if (started) return;
    started = true;
    const cards = [...document.querySelectorAll<HTMLElement>('[data-swim]')];
    if (!cards.length) return;
    const root = document.documentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const still = () => reduce.matches || root.dataset.motion === 'paused';
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    let queued = false;
    const rest = (card: HTMLElement) => {
      for (const k of ['--sx', '--sy', '--sr', '--st', '--rings']) card.style.removeProperty(k);
      card.querySelectorAll<SVGElement>('.bubble').forEach((b) => {
        b.style.transform = '';
        b.style.opacity = '';
      });
    };
    const update = () => {
      queued = false;
      const vh = innerHeight;
      for (const card of cards) {
        if (still()) {
          rest(card);
          continue;
        }
        const r = card.getBoundingClientRect();
        if (r.bottom < -40 || r.top > vh + 40) continue;
        const d = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)));
        // Swimming in: from off the card on the left to the middle, easing out.
        const s = clamp((1 - d) / 0.85);
        const e = 1 - (1 - s) ** 3;
        const drift = d < 0.15 ? (0.15 - d) * 12 : 0;
        const x = (e - 1) * 125 + drift;
        const y = Math.sin(d * Math.PI * 4) * 4;
        const tilt = Math.cos(d * Math.PI * 4) * 3 + (1 - e) * -6;
        const tail = Math.sin(d * Math.PI * 22) * (6 + 12 * (1 - e));
        card.style.setProperty('--sx', `${x.toFixed(2)}%`);
        card.style.setProperty('--sy', `${y.toFixed(2)}%`);
        card.style.setProperty('--sr', `${tilt.toFixed(2)}deg`);
        card.style.setProperty('--st', `${tail.toFixed(2)}deg`);
        card.style.setProperty('--rings', (0.9 + 0.1 * e).toFixed(3));
        // Bubbles rise from the mouth in a stream, once the fish is nearly there.
        card.querySelectorAll<SVGElement>('.bubble').forEach((b, i) => {
          const f = ((((1 - d) * 1.6 + i / 3) % 1) + 1) % 1;
          b.style.transform = `translateY(${(-f * 30).toFixed(1)}px)`;
          b.style.opacity = (clamp((e - 0.6) / 0.4) * (1 - f)).toFixed(2);
        });
      }
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    addEventListener('scroll', queue, { passive: true });
    addEventListener('resize', queue);
    addEventListener('kilf:motion', queue);
    reduce.addEventListener('change', queue);
    update();
  });
  return null;
}
