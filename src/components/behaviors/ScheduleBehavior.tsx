'use client';
import { useBehavior } from './once';

/** Programme: days as tabs (arrow keys move between them), and the strand filter. */
let started = false;

export default function ScheduleBehavior() {
  useBehavior(() => {
    if (started) return;
    started = true;
    document.querySelectorAll<HTMLElement>('[data-schedule]').forEach((root) => {
      const tabs = [...root.querySelectorAll<HTMLAnchorElement>('[data-tab]')];
      const panels = [...root.querySelectorAll<HTMLElement>('[data-day]')];
      const list = root.querySelector<HTMLElement>('[data-tablist]');
      if (!list || !tabs.length) return;

      // Days as tabs.
      list.setAttribute('role', 'tablist');
      list.querySelectorAll('li').forEach((li) => li.setAttribute('role', 'presentation'));
      tabs.forEach((tab) => {
        tab.setAttribute('role', 'tab');
        tab.id = `tab-${tab.dataset.tab}`;
        tab.setAttribute('aria-controls', `day-${tab.dataset.tab}`);
      });
      panels.forEach((p) => {
        p.setAttribute('role', 'tabpanel');
        p.setAttribute('aria-labelledby', `tab-${p.dataset.day}`);
        p.tabIndex = -1;
      });
      const select = (id: string, focus = false) => {
        tabs.forEach((tab) => {
          const on = tab.dataset.tab === id;
          tab.setAttribute('aria-selected', String(on));
          tab.tabIndex = on ? 0 : -1;
          if (on) {
            tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            if (focus) tab.focus();
          }
        });
        panels.forEach((p) => (p.hidden = p.dataset.day !== id));
      };
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          select(tab.dataset.tab!);
          history.replaceState(null, '', `#day-${tab.dataset.tab}`);
        });
        tab.addEventListener('keydown', (e) => {
          const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
          if (to === undefined) return;
          e.preventDefault();
          const next = tabs[(to + tabs.length) % tabs.length];
          select(next.dataset.tab!, true);
          history.replaceState(null, '', `#day-${next.dataset.tab}`);
        });
      });
      // Open on the linked day, today during the festival, or the first day.
      const fromHash = location.hash.replace('#day-', '');
      const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
      const ids = tabs.map((t) => t.dataset.tab!);
      select(ids.includes(fromHash) ? fromHash : ids.includes(today) ? today : ids[0]);

      // Strand filter.
      const bar = root.querySelector<HTMLElement>('[data-filter-bar]');
      const status = root.querySelector<HTMLElement>('[data-filter-status]');
      const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-strand-filter]')];
      if (!bar) return;
      bar.hidden = false;
      const all = status?.textContent ?? '';
      chips.forEach((chip) =>
        chip.addEventListener('click', () => {
          const id = chip.dataset.strandFilter!;
          chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
          let shown = 0;
          panels.forEach((p) => {
            let n = 0;
            p.querySelectorAll<HTMLElement>('.session').forEach((s) => {
              const on = id === 'all' || s.dataset.strand === id;
              s.hidden = !on;
              if (on) n++;
            });
            p.querySelector('[data-empty]')?.classList.toggle('hidden', n > 0);
            shown += n;
          });
          if (status) status.textContent = id === 'all' ? all : `${shown} ${chip.textContent?.trim()} sessions over the five days`;
        }),
      );
    });
  });
  return null;
}
