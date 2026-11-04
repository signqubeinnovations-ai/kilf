import { initAnalytics, track } from './analytics';

const d = document;
const root = d.documentElement;
const motion = root.classList.contains('m');
const fine = matchMedia('(pointer: fine) and (min-width: 64rem)').matches;
const raf = (fn: () => void) => { let t = 0; return () => { if (!t) t = requestAnimationFrame(() => { t = 0; fn(); }); }; };

initAnalytics();

/* Reveal on scroll: headlines, dimension lines, fades, process stamps. */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
  { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
);
d.querySelectorAll('[data-hl],[data-reveal],[data-draw],[data-stamp]').forEach((el) => io.observe(el));

/* Header: hide on scroll down, show on scroll up. */
const header = d.querySelector<HTMLElement>('[data-header]');
let lastY = scrollY;
const onScroll = raf(() => {
  const y = scrollY;
  if (header) {
    header.toggleAttribute('data-scrolled', y > 8);
    header.toggleAttribute('data-hidden', y > 480 && y > lastY + 2 && !d.querySelector('#menu:popover-open'));
    if (y < lastY - 2) header.removeAttribute('data-hidden');
  }
  lastY = y;
  procUpdate();
  slideScroll();
});
addEventListener('scroll', onScroll, { passive: true });

/* Process timeline: the vertical line fills as you scroll. */
const procs = [...d.querySelectorAll<HTMLElement>('[data-proc]')];
function procUpdate() {
  if (!motion) return;
  for (const p of procs) {
    const r = p.getBoundingClientRect();
    const v = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
    p.querySelector<HTMLElement>('[data-proc-fill]')?.style.setProperty('--p', v.toFixed(3));
  }
}
procUpdate();

/* Event tracking. */
d.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLElement>('a, button');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  const name = a.dataset.track || (href.includes('wa.me') ? 'whatsapp_click' : href.startsWith('tel:') ? 'call_click' : '');
  if (name) track(name, { link_text: a.textContent?.trim().slice(0, 80) });
});

/* Magnetic WhatsApp CTA (desktop): moves up to 6px toward the cursor. */
if (fine && motion) {
  d.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 12;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}

/* CAD cursor over project images (desktop): crosshair with live X/Y. */
const cadTargets = d.querySelectorAll<HTMLElement>('[data-cad]');
if (fine && cadTargets.length) {
  const cur = d.createElement('div');
  cur.className = 'cad';
  cur.setAttribute('aria-hidden', 'true');
  cur.innerHTML = '<span class="cad-x"></span><span class="cad-y"></span><span class="cad-t"></span>';
  d.body.appendChild(cur);
  const t = cur.querySelector<HTMLElement>('.cad-t')!;
  cadTargets.forEach((el) => {
    el.classList.add('cad-on');
    el.addEventListener('pointerenter', () => cur.classList.add('on'));
    el.addEventListener('pointerleave', () => cur.classList.remove('on'));
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      cur.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      t.textContent = `X ${String(Math.round(e.clientX - r.left)).padStart(4, '0')}  Y ${String(Math.round(e.clientY - r.top)).padStart(4, '0')}`;
    });
  });
}

/* Slide-in offer: exit intent on desktop, 60% scroll on mobile. Once per session. */
const slide = d.querySelector<HTMLElement>('[data-slide]');
const seen = () => { try { return sessionStorage.getItem('facado-slide'); } catch { return '1'; } };
const start = Date.now();
function showSlide() {
  if (!slide || seen() || Date.now() - start < 6000) return;
  if (d.querySelector('[data-consent]:not([hidden])')) return;
  try { sessionStorage.setItem('facado-slide', '1'); } catch {}
  slide.hidden = false;
}
function slideScroll() {
  if (fine || !slide || seen()) return;
  const p = scrollY / Math.max(1, d.documentElement.scrollHeight - innerHeight);
  if (p > 0.6) showSlide();
}
if (fine) d.addEventListener('mouseout', (e) => { if (!e.relatedTarget && e.clientY <= 0) showSlide(); });
slide?.querySelector('[data-slide-close]')?.addEventListener('click', () => (slide.hidden = true));
d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && slide && !slide.hidden) slide.hidden = true; });

/* Heavy motion (GSAP + ScrollTrigger, Lenis) loads after first paint, only when needed. */
if (motion) {
  const idle = (cb: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200));
  const go = () => idle(async () => {
    if (fine) await import('./smooth');
    if (d.querySelector('[data-gsap]')) await import('./motion');
  });
  d.readyState === 'complete' ? go() : addEventListener('load', go, { once: true });
}

/* Wide tables scroll sideways on phones: make them reachable by keyboard. */
d.querySelectorAll<HTMLTableElement>('.prose table').forEach((t) => {
  if (t.scrollWidth > t.clientWidth + 1) t.tabIndex = 0;
});
