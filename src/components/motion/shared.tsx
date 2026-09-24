import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { LazyMotion, domAnimation, useInView, useReducedMotion } from 'motion/react';

/** Calm, decelerating curve used across the site (matches --ease-calm). */
export const calm = [0.22, 1, 0.36, 1] as const;
/** Slow in-and-out for looping water movement. */
export const tide = [0.45, 0, 0.55, 1] as const;

export const MOTION_EVENT = 'kilf:motion';

/** True while the page-level "Pause motion" toggle is on. */
function usePagePaused() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const read = () => setPaused(document.documentElement.dataset.motion === 'paused');
    read();
    window.addEventListener(MOTION_EVENT, read);
    return () => window.removeEventListener(MOTION_EVENT, read);
  }, []);
  return paused;
}

/**
 * Whether looping animation should run: the visitor hasn't asked for reduced
 * motion or paused it, and the element is on screen (saves battery).
 */
export function useCalmMotion(ref: RefObject<Element | null>) {
  const reduce = useReducedMotion();
  const paused = usePagePaused();
  const visible = useInView(ref, { margin: '120px 0px' });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated && !reduce && !paused && visible;
}

/** Loads Motion's DOM animation features once per island (keeps bundles small). */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/** Converts a pointer position into SVG user units. */
export function toSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const p = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse());
  return { x: p.x, y: p.y };
}

/** Small deterministic random so server and client render the same scene. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function useStableId() {
  const ref = useRef(0);
  return () => ++ref.current;
}

/** A soft sine-like wave path, `w` wide, starting at x0, amplitude `a`, wavelength `l`. */
export function wavePath(x0: number, y: number, w: number, a: number, l: number) {
  let d = `M${x0} ${y}`;
  for (let x = x0; x < x0 + w; x += l) {
    d += ` q${l / 4} ${-a} ${l / 2} 0 t${l / 2} 0`;
  }
  return d;
}
