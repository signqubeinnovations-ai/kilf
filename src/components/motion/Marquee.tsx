import { useEffect, useRef, useState } from 'react';
import { animate, m, useAnimationFrame, useMotionValue } from 'motion/react';
import { MotionRoot, useCalmMotion } from './shared';

/**
 * A slow ribbon of strand names on the coral band, set in capitals with a
 * small star between them. It eases to a stop on hover or focus, has its own
 * pause button (WCAG 2.2.2), and stays still for reduced motion.
 */
interface Props {
  items: string[];
  pauseLabel: string;
  playLabel: string;
  listLabel: string;
  lang?: string;
  /** Pixels per second. */
  speed?: number;
}

function Star() {
  return (
    <svg viewBox="0 0 12 12" className="mx-8 size-2.5 shrink-0 opacity-70 sm:mx-14" aria-hidden="true">
      <path d="M6 0v12M0 6h12M1.8 1.8l8.4 8.4M10.2 1.8l-8.4 8.4" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Ribbon({ items, pauseLabel, playLabel, listLabel, lang, speed = 42 }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const active = useCalmMotion(wrap);
  const [hold, setHold] = useState(false);
  const [stopped, setStopped] = useState(false);
  const x = useMotionValue(0);
  const pace = useMotionValue(1);

  useEffect(() => {
    const c = animate(pace, hold || stopped ? 0 : 1, { duration: hold ? 1.1 : 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [hold, stopped, pace]);

  useAnimationFrame((_, delta) => {
    if (!active || !row.current) return;
    const half = row.current.scrollWidth / 2;
    if (!half) return;
    let next = x.get() - (speed * pace.get() * Math.min(delta, 64)) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  const copy = (key: string) =>
    [...items, ...items].map((item, i) => (
      <span key={`${key}-${i}`} className="flex shrink-0 items-center">
        <span>{item}</span>
        <Star />
      </span>
    ));

  return (
    <div
      ref={wrap}
      className="relative flex items-center"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <ul className="sr-only" aria-label={listLabel} lang={lang}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)]" aria-hidden="true">
        <m.div ref={row} style={{ x }} className="flex w-max items-center whitespace-nowrap text-[1.05rem] font-semibold uppercase tracking-[0.06em] sm:text-[1.3rem]" lang={lang}>
          {copy('a')}
          {copy('b')}
        </m.div>
      </div>
      <button
        type="button"
        onClick={() => setStopped((s) => !s)}
        aria-pressed={stopped}
        className="relative z-10 ml-4 inline-grid size-11 shrink-0 place-items-center text-navy ring-1 ring-inset ring-navy/30 transition-colors hover:bg-navy/10"
      >
        <span className="sr-only">{stopped ? playLabel : pauseLabel}</span>
        {stopped ? (
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5Z" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" /></svg>
        )}
      </button>
    </div>
  );
}

export default function Marquee(props: Props) {
  return (
    <MotionRoot>
      <Ribbon {...props} />
    </MotionRoot>
  );
}
