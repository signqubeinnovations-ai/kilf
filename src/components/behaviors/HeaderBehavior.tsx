'use client';
import { bindOnce, useBehavior } from './once';

/** The header: turns solid once the page scrolls (over the hero), and opens/closes the menu. */
export default function HeaderBehavior() {
  useBehavior(() =>
    bindOnce<HTMLElement>('[data-header]', (header) => {
      const btn = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
      const menu = header.querySelector<HTMLElement>('[data-menu]');

      if (header.hasAttribute('data-overlay')) {
        const solid = () => header.toggleAttribute('data-solid', window.scrollY > 24);
        solid();
        window.addEventListener('scroll', solid, { passive: true });
      }

      if (btn && menu) {
        const set = (open: boolean) => {
          btn.setAttribute('aria-expanded', String(open));
          menu.toggleAttribute('data-open', open);
          header.toggleAttribute('data-menu-open', open);
          btn.querySelector('.menu-icon')?.classList.toggle('hidden', open);
          btn.querySelector('.close-icon')?.classList.toggle('hidden', !open);
          btn.querySelector('[data-open-text]')?.classList.toggle('lg:inline', !open);
          btn.querySelector('[data-open-label]')?.classList.toggle('hidden', open);
          btn.querySelector('[data-close-label]')?.classList.toggle('hidden', !open);
          document.documentElement.classList.toggle('overflow-hidden', open);
          if (open) setTimeout(() => menu.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true }), 150);
        };
        btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
            set(false);
            btn.focus();
          }
        });
        menu.addEventListener('click', (e) => {
          if ((e.target as HTMLElement).closest('a')) set(false);
        });
      }
    }),
  );
  return null;
}
