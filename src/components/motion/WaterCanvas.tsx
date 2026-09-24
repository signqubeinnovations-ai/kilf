import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { Water, palettes, type PaletteName } from './water';
import { useCalmMotion } from './shared';

/**
 * A living patch of Ashtamudi: calm water with drops falling now and then.
 * Moving over it leaves a gentle wake; a tap sends out a ring. It stops when
 * off screen or when motion is paused, and shows a still surface for
 * visitors who prefer reduced motion. Decorative only.
 */
interface Props {
  palette?: PaletteName;
  /** Respond to the pointer. */
  interactive?: boolean;
  /** Average seconds between ambient drops. */
  rain?: number;
  /** CSS pixels per simulation cell (bigger = softer and cheaper). */
  cell?: number;
  className?: string;
}

const STEP = 1000 / 40; // simulation ticks per second

export default function WaterCanvas({ palette = 'day', interactive = true, rain = 1.3, cell = 3.6, className = '' }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sim = useRef<{ water: Water; img: ImageData; ctx: CanvasRenderingContext2D } | null>(null);
  const active = useCalmMotion(wrap);
  const reduce = useReducedMotion();

  // Size the simulation to the element, and rebuild it when that changes a lot.
  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    const build = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const w = Math.max(40, Math.min(240, Math.round(width / cell)));
      const h = Math.max(40, Math.min(240, Math.round(height / cell)));
      if (sim.current && sim.current.water.w === w && sim.current.water.h === h) return;
      cv.width = w;
      cv.height = h;
      const ctx = cv.getContext('2d');
      if (!ctx) return;
      const water = new Water(w, h, palettes[palette]);
      // Start with a few settled rings so the still frame looks like water.
      for (const [x, y, r, s] of [[0.32, 0.6, 3, 10], [0.7, 0.35, 2, 8], [0.52, 0.82, 4, 12]] as const) water.drop(x, y, r, s);
      for (let i = 0; i < 26; i++) water.step();
      const img = ctx.createImageData(w, h);
      water.render(img);
      ctx.putImageData(img, 0, 0);
      sim.current = { water, img, ctx };
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, [palette, cell]);

  // Run while visible and allowed to move.
  useEffect(() => {
    if (!active || reduce) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let nextDrop = last + 600;
    const loop = (now: number) => {
      const s = sim.current;
      if (s) {
        acc += Math.min(now - last, 100);
        last = now;
        if (now > nextDrop) {
          s.water.drop(0.08 + Math.random() * 0.84, 0.08 + Math.random() * 0.84, Math.random() < 0.2 ? 3 : 2, 5 + Math.random() * 6);
          nextDrop = now + rain * 1000 * (0.5 + Math.random());
        }
        let n = 0;
        while (acc >= STEP && n < 3) {
          s.water.step();
          acc -= STEP;
          n++;
        }
        if (n) {
          s.water.render(s.img);
          s.ctx.putImageData(s.img, 0, 0);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce, rain]);

  // Pointer: a soft wake while moving, a ring on tap.
  useEffect(() => {
    const el = wrap.current;
    if (!el || !interactive || !active || reduce) return;
    let lastMove = 0;
    const at = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height] as const;
    };
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 32 || e.pointerType === 'touch') return;
      lastMove = now;
      const [x, y] = at(e);
      sim.current?.water.drop(x, y, 2, 2.2);
    };
    const down = (e: PointerEvent) => {
      const [x, y] = at(e);
      sim.current?.water.drop(x, y, 4, 16);
    };
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerdown', down, { passive: true });
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerdown', down);
    };
  }, [interactive, active, reduce]);

  return (
    <div ref={wrap} className={`absolute inset-0 ${interactive ? 'cursor-pointer touch-manipulation' : ''} ${className}`} aria-hidden="true">
      <canvas ref={canvas} className="block size-full" />
    </div>
  );
}
