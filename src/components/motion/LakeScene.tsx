import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { MotionRoot, calm, seeded, tide, toSvgPoint, useCalmMotion, useStableId, wavePath } from './shared';

/**
 * The home-page hero: Ashtamudi Lake at first light. The water drifts, the
 * sun's reflection shimmers, rings spread slowly around a floating book, and
 * touching the water sends out a ripple. Purely decorative (aria-hidden).
 * Renders a still frame on the server and whenever motion is off.
 */

const W = 800;
const H = 1000;
const HORIZON = 430;
const BOOK = { x: 400, y: 790 };

const fill = { transformBox: 'fill-box', transformOrigin: 'center' } as const;
const base = { transformBox: 'fill-box', transformOrigin: '50% 100%' } as const;

type Drop = { id: number; x: number; y: number; big: boolean };

function Palm({ x, y, h, lean, sway, active, delay }: { x: number; y: number; h: number; lean: number; sway: number; active: boolean; delay: number }) {
  const cx = x + lean;
  const cy = y - h;
  const leaves = [
    [-78, 12], [-58, -18], [-22, -34], [22, -34], [58, -16], [80, 14], [-34, 26], [36, 28],
  ];
  return (
    <g>
      <path d={`M${x} ${y} C${x + lean * 0.2} ${y - h * 0.45} ${x + lean * 0.75} ${y - h * 0.8} ${cx} ${cy}`} stroke="#0F1C74" strokeWidth={6} fill="none" strokeLinecap="round" />
      <m.g
        style={{ transformBox: 'view-box', transformOrigin: `${cx}px ${cy}px` }}
        animate={active ? { rotate: [0, sway, 0, -sway * 0.6, 0] } : { rotate: 0 }}
        transition={active ? { duration: 9, repeat: Infinity, ease: tide, delay } : { duration: 0.8 }}
      >
        {leaves.map(([dx, dy], i) => (
          <path
            key={i}
            d={`M${cx} ${cy} q${dx * 0.45} ${dy * 0.5 - 22} ${dx} ${dy} q${-dx * 0.42} ${-dy * 0.2 + 4} ${-dx} ${-dy}Z`}
            fill="#0F1C74"
          />
        ))}
      </m.g>
    </g>
  );
}

function Ring({ cx, cy, rx, ry, delay, active, still, stroke = '#FFFFFF', width = 2, duration = 7.5 }: { cx: number; cy: number; rx: number; ry: number; delay: number; active: boolean; still: [number, number]; stroke?: string; width?: number; duration?: number }) {
  return (
    <m.ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      vectorEffect="non-scaling-stroke"
      style={fill}
      initial={{ scale: still[0], opacity: still[1] }}
      animate={active ? { scale: [0.55, 2.5], opacity: [0, 0.6, 0] } : { scale: still[0], opacity: still[1] }}
      transition={active ? { duration, repeat: Infinity, ease: 'easeOut', delay, times: [0, 0.18, 1] } : { duration: 1.2, ease: calm }}
    />
  );
}

function Scene() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const active = useCalmMotion(wrap);
  const [drops, setDrops] = useState<Drop[]>([]);
  const nextId = useStableId();

  // Short glinting wave strokes scattered over the water, smaller near the horizon.
  const glints = useMemo(() => {
    const rnd = seeded(7);
    return Array.from({ length: 26 }, (_, i) => {
      const depth = rnd(); // 0 = far, 1 = near
      const y = HORIZON + 24 + depth * depth * (H - HORIZON - 60);
      const w = 40 + depth * 150 + rnd() * 40;
      const x = rnd() * (W + 80) - 60;
      return {
        i,
        d: wavePath(x, y, w, 2 + depth * 5, 24 + depth * 40),
        width: 1 + depth * 1.8,
        o: 0.22 + depth * 0.38,
        dx: 10 + depth * 26,
        dur: 7 + rnd() * 6,
        delay: rnd() * 5,
      };
    });
  }, []);

  const twinkles = useMemo(() => {
    const rnd = seeded(21);
    return Array.from({ length: 9 }, (_, i) => ({ i, x: 470 + (rnd() - 0.5) * 220, y: HORIZON + 20 + rnd() * 260, r: 1.6 + rnd() * 2, delay: rnd() * 4, dur: 2.4 + rnd() * 2.4 }));
  }, []);

  // Now and then a fish or a falling leaf breaks the surface.
  useEffect(() => {
    if (!active) return;
    let t: ReturnType<typeof setTimeout>;
    const drop = () => {
      const x = 80 + Math.random() * (W - 160);
      const y = HORIZON + 90 + Math.random() * (H - HORIZON - 160);
      add(x, y, false);
      t = setTimeout(drop, 3800 + Math.random() * 3200);
    };
    t = setTimeout(drop, 2200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function add(x: number, y: number, big: boolean) {
    const id = nextId();
    setDrops((d) => [...d.slice(-5), { id, x, y, big }]);
    setTimeout(() => setDrops((d) => d.filter((p) => p.id !== id)), big ? 3400 : 3000);
  }

  function touch(e: PointerEvent<SVGSVGElement>) {
    if (!svg.current || !active) return;
    const p = toSvgPoint(svg.current, e.clientX, e.clientY);
    if (p && p.y > HORIZON + 12) add(p.x, p.y, true);
  }

  const reflection = Array.from({ length: 10 }, (_, i) => ({ i, y: HORIZON + 16 + i * 21, w: 150 - i * 11, o: 0.95 - i * 0.07 }));

  return (
    <div ref={wrap} className="absolute inset-0">
      <svg
        ref={svg}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="size-full touch-manipulation select-none"
        aria-hidden="true"
        focusable="false"
        onPointerDown={touch}
        style={{ cursor: active ? 'pointer' : undefined }}
      >
        <defs>
          <linearGradient id="ls-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FCFAF3" />
            <stop offset=".58" stopColor="#EEF2FB" />
            <stop offset="1" stopColor="#FCDCCF" />
          </linearGradient>
          <linearGradient id="ls-lake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4A67F2" />
            <stop offset=".3" stopColor="#2448ED" />
            <stop offset=".75" stopColor="#1B37E6" />
            <stop offset="1" stopColor="#0F1C74" />
          </linearGradient>
          <radialGradient id="ls-glow" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#F47A5E" stopOpacity=".42" />
            <stop offset="1" stopColor="#F47A5E" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ls-page" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#E4ECF9" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width={W} height={HORIZON + 2} fill="url(#ls-sky)" />
        <m.circle
          cx={520}
          cy={292}
          r={170}
          fill="url(#ls-glow)"
          style={fill}
          animate={active ? { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] } : { scale: 1, opacity: 0.9 }}
          transition={active ? { duration: 8, repeat: Infinity, ease: tide } : { duration: 1 }}
        />
        <m.circle
          cx={520}
          cy={292}
          r={70}
          fill="#F47A5E"
          animate={active ? { y: [0, -8, 0] } : { y: 0 }}
          transition={active ? { duration: 14, repeat: Infinity, ease: tide } : { duration: 1 }}
        />
        {[
          [118, 150, 150, 0],
          [540, 176, 110, 3],
        ].map(([x, y, w, d]) => (
          <m.rect
            key={x}
            x={x}
            y={y}
            width={w}
            height={5}
            rx={2.5}
            fill="#FFFFFF"
            opacity={0.85}
            animate={active ? { x: [0, 26, 0] } : { x: 0 }}
            transition={active ? { duration: 26, repeat: Infinity, ease: tide, delay: d } : { duration: 1 }}
          />
        ))}
        <m.g
          fill="none"
          stroke="#0F1C74"
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.55}
          animate={active ? { x: [0, 34, 0], y: [0, -8, 0] } : { x: 0, y: 0 }}
          transition={active ? { duration: 22, repeat: Infinity, ease: tide } : { duration: 1 }}
        >
          <path d="M190 214q7-7 14 0q7-7 14 0" />
          <path d="M228 240q5-5 10 0q5-5 10 0" />
          <path d="M160 246q4-4 8 0q4-4 8 0" />
        </m.g>

        {/* Far shore */}
        <path d={`M0 ${HORIZON} L0 398 C90 378 170 392 250 402 S420 380 500 396 S660 410 ${W} 390 L${W} ${HORIZON}Z`} fill="#C9D4F4" />
        <path d={`M0 ${HORIZON} L0 414 C120 404 230 420 340 420 S560 408 680 418 S770 412 ${W} 410 L${W} ${HORIZON}Z`} fill="#98ABEE" />

        {/* Chinese fishing net, dipping slowly */}
        <m.g
          style={{ transformBox: 'view-box', transformOrigin: '78px 438px' }}
          animate={active ? { rotate: [0, 2.2, 0] } : { rotate: 0 }}
          transition={active ? { duration: 12, repeat: Infinity, ease: tide } : { duration: 1 }}
          stroke="#0F1C74"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M78 438 L262 262" strokeWidth={4.5} />
          <path d="M78 438 L40 292 L262 262" strokeWidth={2.2} />
          <path d="M262 262 L206 352 M262 262 L318 352 M262 262 L262 366" strokeWidth={1.6} opacity={0.8} />
          <path d="M206 352 Q262 382 318 352" strokeWidth={2} />
          <path d="M218 356 L240 300 M234 364 L250 290 M250 368 L258 280 M274 368 L266 280 M290 364 L274 290 M306 356 L284 300" strokeWidth={1} opacity={0.55} />
        </m.g>
        <path d="M40 438 h120" stroke="#0F1C74" strokeWidth={5} strokeLinecap="round" />

        {/* Palms on the far bank */}
        <Palm x={668} y={436} h={128} lean={-18} sway={2.4} active={active} delay={0} />
        <Palm x={724} y={438} h={172} lean={10} sway={-2} active={active} delay={1.2} />
        <Palm x={780} y={434} h={110} lean={22} sway={2.8} active={active} delay={2.1} />

        {/* Lake */}
        <rect y={HORIZON} width={W} height={H - HORIZON} fill="url(#ls-lake)" />
        <rect y={HORIZON} width={W} height={2} fill="#FFFFFF" opacity={0.55} />

        {/* Sun's reflection */}
        {reflection.map((r) => (
          <m.rect
            key={r.i}
            x={520 - r.w / 2}
            y={r.y}
            width={r.w}
            height={4.5}
            rx={2.25}
            fill="#F47A5E"
            opacity={r.o}
            style={fill}
            animate={active ? { scaleX: [1, 0.62, 1], opacity: [r.o, r.o * 0.45, r.o] } : { scaleX: 1, opacity: r.o }}
            transition={active ? { duration: 3.6 + (r.i % 3), repeat: Infinity, ease: tide, delay: r.i * 0.28 } : { duration: 1 }}
          />
        ))}

        {/* Glints */}
        <g fill="none" stroke="#FFFFFF" strokeLinecap="round">
          {glints.map((g) => (
            <m.path
              key={g.i}
              d={g.d}
              strokeWidth={g.width}
              initial={{ opacity: g.o }}
              animate={active ? { x: [0, g.dx, 0], opacity: [g.o, g.o * 0.35, g.o] } : { x: 0, opacity: g.o }}
              transition={active ? { duration: g.dur, repeat: Infinity, ease: tide, delay: g.delay } : { duration: 1 }}
            />
          ))}
        </g>
        {twinkles.map((s) => (
          <m.circle
            key={s.i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#FFFFFF"
            initial={{ opacity: 0.5 }}
            animate={active ? { opacity: [0, 1, 0] } : { opacity: 0.5 }}
            transition={active ? { duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay } : { duration: 1 }}
          />
        ))}

        {/* A sailboat crossing, very slowly */}
        <m.g
          animate={active ? { x: [0, 56, 0] } : { x: 0 }}
          transition={active ? { duration: 40, repeat: Infinity, ease: tide } : { duration: 1 }}
        >
          <m.g
            style={base}
            animate={active ? { rotate: [-2.5, 2.5, -2.5], y: [0, 2, 0] } : { rotate: 0, y: 0 }}
            transition={active ? { duration: 5.5, repeat: Infinity, ease: tide } : { duration: 1 }}
          >
            <path d="M318 402 L318 452" stroke="#0F1C74" strokeWidth={2} />
            <path d="M320 404 L320 448 L350 448Z" fill="#FFFFFF" />
            <path d="M316 410 L316 448 L292 448Z" fill="#F47A5E" />
            <path d="M286 452 h66 l-9 10 h-48Z" fill="#0F1C74" />
          </m.g>
        </m.g>
        <m.ellipse
          cx={320}
          cy={466}
          rx={36}
          ry={3}
          fill="#FFFFFF"
          opacity={0.35}
          animate={active ? { x: [0, 56, 0] } : { x: 0 }}
          transition={active ? { duration: 40, repeat: Infinity, ease: tide } : { duration: 1 }}
        />

        {/* Rings spreading around the book */}
        {[0, 2.5, 5].map((d, i) => (
          <Ring key={i} cx={BOOK.x} cy={BOOK.y + 30} rx={150} ry={30} delay={d} active={active} still={[[1, 1.55, 2.1][i], [0.5, 0.32, 0.16][i]]} />
        ))}

        {/* The book, afloat */}
        <m.g
          animate={active ? { y: [0, -7, 0], rotate: [-1.2, 1.2, -1.2] } : { y: 0, rotate: 0 }}
          transition={active ? { y: { duration: 6.5, repeat: Infinity, ease: tide }, rotate: { duration: 9, repeat: Infinity, ease: tide } } : { duration: 1 }}
          style={fill}
        >
          <ellipse cx={BOOK.x} cy={BOOK.y + 34} rx={150} ry={14} fill="#0A1454" opacity={0.35} />
          <g transform={`translate(${BOOK.x} ${BOOK.y})`}>
            <path d="M0 6 C-46 -12 -104 -12 -150 2 L-150 32 C-104 20 -46 20 0 38Z" fill="#0F1C74" />
            <path d="M0 6 C46 -12 104 -12 150 2 L150 32 C104 20 46 20 0 38Z" fill="#0F1C74" />
            <path d="M0 0 C-44 -20 -102 -22 -146 -6 L-146 26 C-102 12 -44 14 0 32Z" fill="url(#ls-page)" />
            <path d="M0 0 C44 -20 102 -22 146 -6 L146 26 C102 12 44 14 0 32Z" fill="url(#ls-page)" />
            <g fill="none" stroke="#1B37E6" strokeWidth={1.6} strokeLinecap="round" opacity={0.35}>
              <path d="M-24 2 C-54 -8 -92 -9 -124 -1" />
              <path d="M-24 10 C-54 0 -92 -1 -124 7" />
              <path d="M-24 18 C-54 8 -84 7 -108 13" />
              <path d="M24 2 C54 -8 92 -9 124 -1" />
              <path d="M24 10 C54 0 92 -1 124 7" />
              <path d="M24 18 C54 8 84 7 108 13" />
            </g>
            <path d="M0 0 L0 32" stroke="#0F1C74" strokeWidth={2} />
          </g>
        </m.g>

        {/* Ripples from touches and the odd fish */}
        <AnimatePresence>
          {drops.flatMap((p) =>
            [0, 0.28, 0.56].map((delay, i) => (
              <m.ellipse
                key={`${p.id}-${i}`}
                cx={p.x}
                cy={p.y}
                rx={p.big ? 46 : 26}
                ry={(p.big ? 46 : 26) * (0.16 + ((p.y - HORIZON) / (H - HORIZON)) * 0.12)}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth={p.big ? 2 : 1.4}
                vectorEffect="non-scaling-stroke"
                style={fill}
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: p.big ? 3.2 : 2.4, opacity: [0, p.big ? 0.85 : 0.5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: p.big ? 2.8 : 2.4, ease: 'easeOut', delay, times: [0, 0.15, 1] }}
              />
            )),
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

export default function LakeScene() {
  return (
    <MotionRoot>
      <Scene />
    </MotionRoot>
  );
}
