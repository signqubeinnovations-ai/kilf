/**
 * GA4 + Meta Pixel, loaded only after consent.
 * Events: whatsapp_click, call_click, directions_click, picker_complete, form_submit, project_view.
 */
declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: ((...a: unknown[]) => void) & { q?: unknown[] }; }
}
const KEY = 'facado-consent';
let loaded = false;

const store = {
  get: (k: string, s: Storage = localStorage) => { try { return s.getItem(k); } catch { return null; } },
  set: (k: string, v: string, s: Storage = localStorage) => { try { s.setItem(k, v); } catch {} },
};

/** UTM / click IDs from the landing URL, kept for the session so ad traffic is attributed. */
export function utm(): Record<string, string> {
  try { return JSON.parse(store.get('facado-utm', sessionStorage) || '{}'); } catch { return {}; }
}
function captureUtm() {
  const p = new URLSearchParams(location.search);
  const o: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'].forEach((k) => { const v = p.get(k); if (v) o[k] = v.slice(0, 120); });
  if (Object.keys(o).length) store.set('facado-utm', JSON.stringify(o), sessionStorage);
}

function load(ga4?: string, pixel?: string) {
  if (loaded) return;
  loaded = true;
  if (ga4) {
    const s = document.createElement('script');
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ga4, { anonymize_ip: true, ...utm() });
  }
  if (pixel) {
    const f = (window.fbq = function (...a: unknown[]) { (f.q = f.q || []).push(a); } as Window['fbq']) as NonNullable<Window['fbq']>;
    const s = document.createElement('script');
    s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    s.onload = () => { /* real fbq replaces the stub and replays the queue */ };
    document.head.appendChild(s);
    f('init', pixel); f('track', 'PageView');
  }
}

const META_EVENTS: Record<string, string> = { whatsapp_click: 'Contact', call_click: 'Contact', form_submit: 'Lead', picker_complete: 'Lead' };

export function track(name: string, params: Record<string, unknown> = {}) {
  const p = { page_path: location.pathname, ...utm(), ...params };
  window.gtag?.('event', name, p);
  if (window.fbq) META_EVENTS[name] ? window.fbq('track', META_EVENTS[name], p) : window.fbq('trackCustom', name, p);
}

export function initAnalytics() {
  captureUtm();
  const el = document.querySelector<HTMLElement>('[data-consent]');
  const ga4 = el?.dataset.ga4, pixel = el?.dataset.pixel;
  const choice = store.get(KEY);
  if (choice === 'granted') load(ga4, pixel);
  if (el && !choice) el.hidden = false;
  el?.querySelector('[data-consent-yes]')?.addEventListener('click', () => { store.set(KEY, 'granted'); el.hidden = true; load(ga4, pixel); });
  el?.querySelector('[data-consent-no]')?.addEventListener('click', () => { store.set(KEY, 'denied'); el.hidden = true; });
  document.querySelectorAll('[data-consent-open]').forEach((b) => b.addEventListener('click', () => { if (el) el.hidden = false; }));
}
