'use client';
import { bindOnce, useBehavior } from './once';

/**
 * Static-hosting forms: client-side validation, a honeypot and a minimum fill
 * time against spam, then a JSON POST to the form's endpoint.
 */
const MIN_FILL_MS = 2500;
type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export default function FormBehavior() {
  useBehavior(() =>
    bindOnce<HTMLFormElement>('form[data-kilf-form]', (form) => {
      const started = Date.now();
      const fields = form.querySelector<HTMLElement>('[data-fields]')!;
      const success = form.querySelector<HTMLElement>('[data-success]')!;
      const errorBox = form.querySelector<HTMLElement>('[data-form-error]')!;
      const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
      const submitText = submit.querySelector('span')!;
      const originalLabel = submitText.textContent;

      const controls = () => Array.from(form.querySelectorAll<Control>('input:not([type=hidden]):not([name=_gotcha]), textarea, select'));

      const showError = (el: Control) => {
        const msg = form.querySelector<HTMLElement>(`[data-error-for="${el.name}"]`);
        const valid = el.checkValidity();
        el.setAttribute('aria-invalid', String(!valid));
        if (msg) {
          msg.textContent = valid ? '' : el.validity.valueMissing ? form.dataset.required || 'Required' : el.validationMessage;
          msg.classList.toggle('hidden', valid);
        }
        return valid;
      };

      controls().forEach((el) => {
        el.addEventListener('blur', () => el.value && showError(el));
        el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && showError(el));
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorBox.classList.add('hidden');
        const invalid = controls().filter((el) => !showError(el));
        if (invalid.length) {
          invalid[0].focus();
          return;
        }
        const data: Record<string, FormDataEntryValue> = Object.fromEntries(new FormData(form).entries());
        const done = () => {
          fields.classList.add('hidden');
          success.classList.remove('hidden');
          success.focus();
        };
        // Bots: filled honeypot or inhumanly fast → pretend success, send nothing.
        if (data._gotcha || Date.now() - started < MIN_FILL_MS) return done();
        delete data._gotcha;

        const endpoint = form.dataset.endpoint;
        if (!endpoint) {
          if (form.dataset.dev) {
            console.warn('[KILF] PUBLIC_FORM_ENDPOINT is not set; simulating success in dev.', data);
            return done();
          }
          errorBox.classList.remove('hidden');
          return;
        }
        submit.disabled = true;
        submitText.textContent = form.dataset.sending || 'Sending…';
        try {
          const body = JSON.stringify({ ...data, submittedAt: new Date().toISOString() });
          if (endpoint.includes('script.google.com')) {
            // Google Apps Script web apps don't answer CORS preflights: send a
            // "simple" request and trust it (the script parses e.postData.contents).
            await fetch(endpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body });
          } else {
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body,
            });
            if (!res.ok) throw new Error(String(res.status));
          }
          done();
        } catch {
          errorBox.classList.remove('hidden');
        } finally {
          submit.disabled = false;
          submitText.textContent = originalLabel;
        }
      });
    }),
  );
  return null;
}
