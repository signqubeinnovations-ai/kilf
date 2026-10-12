'use client';
import { useBehavior } from './once';

/** Visit page: load a venue map only when asked (no third-party requests until then). */
let started = false;

export default function MapBehavior() {
  useBehavior(() => {
    if (started) return;
    started = true;
    document.querySelectorAll<HTMLButtonElement>('[data-map-load]').forEach((btn) =>
      btn.addEventListener('click', () => {
        const box = btn.parentElement as HTMLElement;
        const f = document.createElement('iframe');
        f.src = box.dataset.map!;
        f.title = box.dataset.mapTitle!;
        f.className = 'absolute inset-0 h-full w-full border-0';
        f.referrerPolicy = 'no-referrer-when-downgrade';
        btn.replaceWith(f);
        f.focus();
      }),
    );
  });
  return null;
}
