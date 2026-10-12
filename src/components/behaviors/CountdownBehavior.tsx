'use client';
import { bindOnce, useBehavior } from './once';

/** Keeps the small countdown current; once the festival starts it says so. */
export default function CountdownBehavior() {
  useBehavior(() =>
    bindOnce<HTMLElement>('[data-countdown]', (el) => {
      const target = new Date(el.dataset.target!).getTime();
      const tick = () => {
        const left = target - Date.now();
        if (left <= 0) {
          el.textContent = el.dataset.live!;
          return;
        }
        el.querySelector('[data-d]')!.textContent = String(Math.floor(left / 86400000));
        el.querySelector('[data-h]')!.textContent = String(Math.floor((left % 86400000) / 3600000));
        el.querySelector('[data-m]')!.textContent = String(Math.floor((left % 3600000) / 60000));
      };
      tick();
      setInterval(tick, 30000);
    }),
  );
  return null;
}
