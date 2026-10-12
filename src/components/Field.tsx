import { cx } from '@/lib/cx';

/** Form field with label, hint and an error slot wired for a11y. */
interface Props {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'url' | 'number';
  required?: boolean;
  options?: string[];
  autoComplete?: string;
  hint?: string;
  full?: boolean;
  formId: string;
  rows?: number;
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'url';
  pattern?: string;
  lang?: string;
}

const control =
  'mt-1.5 block w-full rounded-none border border-line bg-white px-4 py-3.5 text-base text-navy placeholder:text-muted/70 transition-colors hover:border-navy/40 focus:border-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt aria-[invalid=true]:border-coral-ink aria-[invalid=true]:ring-coral-ink/20';
const chevron = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230F1C74' stroke-width='1.5'%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3C/svg%3E")`;

export default function Field({ name, label, type = 'text', required = false, options = [], autoComplete, hint, full = false, formId, rows = 4, inputMode, pattern, lang }: Props) {
  const id = `${formId}-${name}`;
  const describedBy = [hint && `${id}-hint`, `${id}-error`].filter(Boolean).join(' ');
  return (
    <div className={cx(full && 'sm:col-span-2') || undefined}>
      <label htmlFor={id} className="text-sm font-bold text-navy">
        {label}
        {required ? (
          <span className="text-coral-ink" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {type === 'textarea' ? (
        <textarea id={id} name={name} rows={rows} required={required} aria-describedby={describedBy} className={control} lang={lang} />
      ) : type === 'select' ? (
        <select
          id={id}
          name={name}
          required={required}
          aria-describedby={describedBy}
          className={cx(control, 'appearance-none bg-[length:20px] bg-[right_1rem_center] bg-no-repeat pr-10')}
          style={{ backgroundImage: chevron }}
          defaultValue=""
        >
          <option value="">Choose…</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          className={control}
          inputMode={inputMode}
          pattern={pattern}
          lang={lang}
        />
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      <p id={`${id}-error`} className="mt-1.5 hidden text-sm font-semibold text-coral-ink" data-error-for={name}></p>
    </div>
  );
}
