'use client';
import { useEffect } from 'react';

/**
 * The site's small scripts (menu, countdown, forms, filters…) work on the
 * server-rendered markup directly, as plain DOM code. Each runs once per
 * element, even if its component appears several times on a page or React
 * runs effects twice in development.
 */
const bound = new WeakSet<Element>();

export function bindOnce<T extends Element>(selector: string, setup: (el: T) => void) {
  document.querySelectorAll<T>(selector).forEach((el) => {
    if (bound.has(el)) return;
    bound.add(el);
    setup(el);
  });
}

/** Run `setup` once, after hydration. */
export function useBehavior(setup: () => void) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(setup, []);
}
