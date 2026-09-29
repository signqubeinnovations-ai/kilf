import type { ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'motion/react';

/** Calm, decelerating curve used across the site (matches --ease-calm). */
export const calm = [0.22, 1, 0.36, 1] as const;

/** Loads Motion's DOM animation features once per island (keeps bundles small). */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
