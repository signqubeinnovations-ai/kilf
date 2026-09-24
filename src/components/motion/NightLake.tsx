import { useMemo, useRef } from 'react';
import { m } from 'motion/react';
import { MotionRoot, seeded, tide, useCalmMotion, wavePath } from './shared';

/**
 * New Year's Eve on the lake: stars, a lime moon, lanterns afloat and
 * rings widening under them. Decorative; a still frame when motion is off.
 */
const W = 800;
const H = 720;
const HORIZON = 420;
const fill = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

function Scene() {
  const wrap = useRef<HTMLDivElement>(null);
  const active = useCalmMotion(wrap);

  const stars = useMemo(() => {
    const rnd = seeded(11);
    return Array.from({ length: 34 }, (_, i) => ({ i, x: rnd() * W, y: rnd() * (HORIZON - 80), r: 0.8 + rnd() * 1.8, d: rnd() * 5, t: 2.5 + rnd() * 3.5, lime: rnd() > 0.8 }));
  }, []);
  const lights = useMemo(() => {
    const rnd = seeded(5);
    return Array.from({ length: 16 }, (_, i) => ({ i, x: 30 + i * 48 + rnd() * 20, y: HORIZON - 6 - rnd() * 16, d: rnd() * 4 }));
  }, []);
  const glints = useMemo(() => {
    const rnd = seeded(3);
    return Array.from({ length: 18 }, (_, i) => {
      const depth = rnd();
      const y = HORIZON + 20 + depth * depth * (H - HORIZON - 40);
      return { i, d: wavePath(rnd() * W - 40, y, 40 + depth * 130, 2 + depth * 4, 24 + depth * 34), w: 1 + depth * 1.4, o: 0.18 + depth * 0.3, dx: 8 + depth * 22, t: 7 + rnd() * 6, delay: rnd() * 4 };
    });
  }, []);
  const lanterns = [
    { x: 180, y: 520, s: 1 },
    { x: 330, y: 610, s: 1.25 },
    { x: 470, y: 500, s: 0.85 },
    { x: 620, y: 580, s: 1.1 },
    { x: 720, y: 470, s: 0.7 },
    { x: 90, y: 640, s: 1.3 },
  ];
  const reflection = Array.from({ length: 9 }, (_, i) => ({ i, y: HORIZON + 14 + i * 20, w: 110 - i * 9, o: 0.85 - i * 0.07 }));

  return (
    <div ref={wrap} className="absolute inset-0">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="nl-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0A1454" />
            <stop offset="1" stopColor="#1B2A9A" />
          </linearGradient>
          <linearGradient id="nl-lake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#15248C" />
            <stop offset="1" stopColor="#0A1454" />
          </linearGradient>
          <radialGradient id="nl-moon" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#E7EF93" stopOpacity=".35" />
            <stop offset="1" stopColor="#E7EF93" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="nl-lantern" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#F47A5E" stopOpacity=".55" />
            <stop offset="1" stopColor="#F47A5E" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={HORIZON + 2} fill="url(#nl-sky)" />
        {stars.map((s) => (
          <m.circle
            key={s.i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill={s.lime ? '#E7EF93' : '#FFFFFF'}
            initial={{ opacity: 0.6 }}
            animate={active ? { opacity: [0.15, 0.9, 0.15] } : { opacity: 0.6 }}
            transition={active ? { duration: s.t, repeat: Infinity, ease: 'easeInOut', delay: s.d } : { duration: 1 }}
          />
        ))}
        {/* Two slow sparkles for the new year */}
        {[
          { x: 170, y: 120, c: '#F47A5E', s: 1 },
          { x: 330, y: 70, c: '#E7EF93', s: 0.7 },
        ].map((p, i) => (
          <m.g
            key={i}
            style={fill}
            animate={active ? { rotate: [0, 90], scale: [p.s, p.s * 1.15, p.s], opacity: [0.9, 0.5, 0.9] } : { rotate: 0, scale: p.s, opacity: 0.9 }}
            transition={active ? { duration: 10 + i * 3, repeat: Infinity, ease: tide } : { duration: 1 }}
          >
            <g transform={`translate(${p.x} ${p.y})`} stroke={p.c} strokeWidth={3} strokeLinecap="round">
              <path d="M0 -26V26M-26 0H26M-18 -18L18 18M18 -18L-18 18" />
            </g>
          </m.g>
        ))}
        <m.circle cx={590} cy={150} r={120} fill="url(#nl-moon)" style={fill} animate={active ? { scale: [1, 1.1, 1] } : { scale: 1 }} transition={active ? { duration: 9, repeat: Infinity, ease: tide } : { duration: 1 }} />
        <circle cx={590} cy={150} r={52} fill="#E7EF93" />

        {/* Far shore, lights coming on */}
        <path d={`M0 ${HORIZON} L0 392 C120 372 220 388 330 394 S520 376 620 388 S740 396 ${W} 384 L${W} ${HORIZON}Z`} fill="#0F1C74" />
        {lights.map((l) => (
          <m.circle
            key={l.i}
            cx={l.x}
            cy={l.y}
            r={2}
            fill="#E7EF93"
            initial={{ opacity: 0.8 }}
            animate={active ? { opacity: [0.35, 1, 0.35] } : { opacity: 0.8 }}
            transition={active ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: l.d } : { duration: 1 }}
          />
        ))}

        <rect y={HORIZON} width={W} height={H - HORIZON} fill="url(#nl-lake)" />
        <rect y={HORIZON} width={W} height={1.5} fill="#B8C3F0" opacity={0.5} />
        {reflection.map((r) => (
          <m.rect
            key={r.i}
            x={590 - r.w / 2}
            y={r.y}
            width={r.w}
            height={4}
            rx={2}
            fill="#E7EF93"
            opacity={r.o}
            style={fill}
            animate={active ? { scaleX: [1, 0.6, 1], opacity: [r.o, r.o * 0.4, r.o] } : { scaleX: 1, opacity: r.o }}
            transition={active ? { duration: 3.4 + (r.i % 3), repeat: Infinity, ease: tide, delay: r.i * 0.3 } : { duration: 1 }}
          />
        ))}
        <g fill="none" stroke="#B8C3F0" strokeLinecap="round">
          {glints.map((g) => (
            <m.path
              key={g.i}
              d={g.d}
              strokeWidth={g.w}
              initial={{ opacity: g.o }}
              animate={active ? { x: [0, g.dx, 0], opacity: [g.o, g.o * 0.3, g.o] } : { x: 0, opacity: g.o }}
              transition={active ? { duration: g.t, repeat: Infinity, ease: tide, delay: g.delay } : { duration: 1 }}
            />
          ))}
        </g>

        {/* Lanterns afloat, each with its own slow ring */}
        {lanterns.map((l, i) => (
          <g key={i}>
            <m.ellipse
              cx={l.x}
              cy={l.y + 10 * l.s}
              rx={34 * l.s}
              ry={7 * l.s}
              fill="none"
              stroke="#F47A5E"
              strokeWidth={1.4}
              vectorEffect="non-scaling-stroke"
              style={fill}
              initial={{ scale: 1.2, opacity: 0.35 }}
              animate={active ? { scale: [0.4, 2.2], opacity: [0, 0.55, 0] } : { scale: 1.2, opacity: 0.35 }}
              transition={active ? { duration: 6, repeat: Infinity, ease: 'easeOut', delay: i * 1.1, times: [0, 0.2, 1] } : { duration: 1 }}
            />
            <m.g
              animate={active ? { y: [0, -4 * l.s, 0] } : { y: 0 }}
              transition={active ? { duration: 4.5 + i * 0.4, repeat: Infinity, ease: tide, delay: i * 0.5 } : { duration: 1 }}
            >
              <circle cx={l.x} cy={l.y} r={26 * l.s} fill="url(#nl-lantern)" />
              <path d={`M${l.x - 9 * l.s} ${l.y + 8 * l.s} L${l.x - 6 * l.s} ${l.y - 9 * l.s} Q${l.x} ${l.y - 13 * l.s} ${l.x + 6 * l.s} ${l.y - 9 * l.s} L${l.x + 9 * l.s} ${l.y + 8 * l.s}Z`} fill="#F47A5E" />
              <rect x={l.x - 10 * l.s} y={l.y + 7 * l.s} width={20 * l.s} height={3.5 * l.s} rx={1.5} fill="#FCFAF3" opacity={0.9} />
            </m.g>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function NightLake() {
  return (
    <MotionRoot>
      <Scene />
    </MotionRoot>
  );
}
