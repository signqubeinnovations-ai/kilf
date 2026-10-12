'use client';
import { bindOnce, useBehavior } from './once';

/** "Pause the lake" buttons: pause or resume every moving thing, remembered on this device. */
export default function MotionBehavior() {
  useBehavior(() => {
    const root = document.documentElement;
    const sync = () => {
      const paused = root.dataset.motion === 'paused';
      document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]').forEach((b) => {
        b.setAttribute('aria-pressed', String(paused));
        b.querySelector('[data-label]')!.textContent = paused ? b.dataset.play! : b.dataset.pause!;
        b.querySelector('[data-icon-pause]')!.classList.toggle('hidden', paused);
        b.querySelector('[data-icon-play]')!.classList.toggle('hidden', !paused);
      });
    };
    bindOnce<HTMLButtonElement>('[data-motion-toggle]', (b) =>
      b.addEventListener('click', () => {
        const paused = root.dataset.motion !== 'paused';
        if (paused) root.dataset.motion = 'paused';
        else delete root.dataset.motion;
        try {
          localStorage.setItem('kilf-motion', paused ? 'paused' : 'on');
        } catch {}
        window.dispatchEvent(new Event('kilf:motion'));
      }),
    );
    bindOnce('html', () => window.addEventListener('kilf:motion', sync));
    sync();
  });
  return null;
}
