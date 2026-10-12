'use client';
import { useBehavior } from './once';

/** Speakers page: filter the grid by category. */
let started = false;

export default function SpeakerFilterBehavior() {
  useBehavior(() => {
    if (started) return;
    started = true;
    const buttons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const items = document.querySelectorAll<HTMLElement>('[data-speaker-grid] > li');
    const status = document.querySelector('[data-filter-status]');
    buttons.forEach((btn) =>
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter!;
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        let n = 0;
        items.forEach((li) => {
          const cats = li.dataset.categories || '';
          const show = f === 'all' || cats === 'always' || cats.split(' ').includes(f);
          li.hidden = !show;
          if (show && cats !== 'always') n++;
        });
        if (status) status.textContent = `${n} speakers shown`;
      }),
    );
  });
  return null;
}
