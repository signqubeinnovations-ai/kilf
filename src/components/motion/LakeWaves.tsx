import { useRef } from 'react';
import { m } from 'motion/react';
import { MotionRoot, tide, useCalmMotion } from './shared';

/**
 * A wide band of layered water that drifts at different speeds (parallax),
 * with a small boat and the sun's reflection. Sits above the footer.
 */
const W = 1600;
const H = 260;

/** A filled wave: periodic crests from x=-L to W+L, closed to the bottom. */
function band(y: number, a: number, l: number) {
  let d = `M${-l} ${y}`;
  for (let x = -l; x < W + l * 2; x += l) d += ` q${l / 4} ${-a} ${l / 2} 0 t${l / 2} 0`;
  return `${d} V${H} H${-l}Z`;
}

const layers = [
  { y: 96, a: 10, l: 220, fill: '#C9D4F4', t: 26 },
  { y: 128, a: 12, l: 300, fill: '#98ABEE', t: 20 },
  { y: 160, a: 14, l: 380, fill: '#2448ED', t: 16 },
  { y: 204, a: 10, l: 260, fill: '#0F1C74', t: 12 },
];

function Band() {
  const wrap = useRef<HTMLDivElement>(null);
  const active = useCalmMotion(wrap);
  return (
    <div ref={wrap} className="absolute inset-0">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="size-full" aria-hidden="true" focusable="false">
        {layers.slice(0, 2).map((b, i) => (
          <m.path
            key={i}
            d={band(b.y, b.a, b.l)}
            fill={b.fill}
            animate={active ? { x: [0, i % 2 ? b.l : -b.l] } : { x: 0 }}
            transition={active ? { duration: b.t, repeat: Infinity, ease: 'linear' } : { duration: 1 }}
          />
        ))}
        {/* Boat riding the middle swell */}
        <m.g
          animate={active ? { x: [0, 220, 0] } : { x: 0 }}
          transition={active ? { duration: 60, repeat: Infinity, ease: tide } : { duration: 1 }}
        >
          <m.g
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            animate={active ? { rotate: [-3, 3, -3], y: [0, 3, 0] } : { rotate: 0, y: 0 }}
            transition={active ? { duration: 5, repeat: Infinity, ease: tide } : { duration: 1 }}
          >
            <path d="M1084 70 V124" stroke="#0F1C74" strokeWidth={2.4} />
            <path d="M1087 74 V120 H1120Z" fill="#FFFFFF" />
            <path d="M1081 80 V120 H1054Z" fill="#F47A5E" />
            <path d="M1046 124 h76 l-10 12 h-56Z" fill="#0F1C74" />
          </m.g>
        </m.g>
        {layers.slice(2).map((b, i) => (
          <m.path
            key={i}
            d={band(b.y, b.a, b.l)}
            fill={b.fill}
            animate={active ? { x: [0, i % 2 ? b.l : -b.l] } : { x: 0 }}
            transition={active ? { duration: b.t, repeat: Infinity, ease: 'linear' } : { duration: 1 }}
          />
        ))}
        {[0, 1, 2, 3].map((i) => {
          const w = 150 - i * 30;
          const o = 0.9 - i * 0.18;
          return (
            <m.rect
              key={i}
              x={420 - w / 2}
              y={170 + i * 14}
              width={w}
              height={4}
              rx={2}
              fill="#F47A5E"
              opacity={o}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              animate={active ? { scaleX: [1, 0.6, 1], opacity: [o, o * 0.4, o] } : { scaleX: 1, opacity: o }}
              transition={active ? { duration: 3.5 + i, repeat: Infinity, ease: tide, delay: i * 0.4 } : { duration: 1 }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function LakeWaves() {
  return (
    <MotionRoot>
      <Band />
    </MotionRoot>
  );
}
