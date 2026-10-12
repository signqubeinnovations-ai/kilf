import type { ReactNode } from 'react';
import LimeButton from './LimeButton';
import Icon from './Icon';
import FormBehavior from './behaviors/FormBehavior';
import { site, env } from '@/lib/site';
import { getPage } from '@/lib/page';
import { cx } from '@/lib/cx';
import { useTranslations, type Lang } from '@/i18n/ui';

/**
 * Static-hosting form. POSTs JSON to PUBLIC_FORM_ENDPOINT (Formspree,
 * Getform, a Google Apps Script web app…). Includes a honeypot field and a
 * minimum fill time for spam protection, client-side validation and a
 * success state. Put <Field formId={id} …/> components inside.
 */
interface Props {
  id: string;
  name: string; // sent as the "form" field, e.g. "volunteer"
  submitLabel?: string;
  endpoint?: string;
  lang?: Lang;
  className?: string;
  successTitle?: string;
  successText?: string;
  tone?: 'light' | 'dark';
  grid?: boolean;
  children?: ReactNode;
}

export default function Form({
  id,
  name,
  lang = 'en',
  submitLabel,
  endpoint = env.formEndpoint,
  className = '',
  successTitle,
  successText,
  tone = 'light',
  grid = true,
  children,
}: Props) {
  const t = useTranslations(lang);
  const dark = tone === 'dark';
  return (
    <form
      id={id}
      data-kilf-form
      data-endpoint={endpoint}
      data-dev={env.dev ? 'true' : undefined}
      data-sending={t('form.sending')}
      data-required={t('form.required')}
      noValidate
      className={cx('relative', className)}
    >
      <input type="hidden" name="form" value={name} />
      <input type="hidden" name="page" value={getPage().pathname} />
      {/* honeypot: humans never see or fill this */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>
          Leave this field empty <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div data-fields>
        <div className={cx(grid && 'grid gap-5 sm:grid-cols-2') || undefined}>{children}</div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <LimeButton type="submit" label={submitLabel ?? t('form.submit')} data-submit />
          <p className={cx('text-sm', dark ? 'text-mist' : 'text-muted')}>
            {lang === 'ml' ? 'നിങ്ങളുടെ വിവരങ്ങൾ KILF-നു മാത്രം.' : 'We only use your details for KILF.'}{' '}
            <a href={lang === 'ml' ? '/ml/privacy' : '/privacy'} className="underline decoration-1 underline-offset-4">
              {lang === 'ml' ? 'സ്വകാര്യത' : 'Privacy'}
            </a>
          </p>
        </div>
        <p
          data-form-error
          role="alert"
          className={cx('mt-4 hidden border-l-2 px-4 py-3 text-sm font-semibold', dark ? 'border-coral bg-white/10 text-cream' : 'border-coral-ink bg-coral-soft text-coral-ink')}
        >
          {t('form.error')}{' '}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      </div>

      <div data-success className={cx('hidden p-6 sm:p-8', dark ? 'bg-white/10' : 'bg-lake-soft')} tabIndex={-1} role="status">
        <div className="flex items-start gap-4">
          <span className="inline-grid size-12 shrink-0 place-items-center rounded-full bg-cobalt text-white">
            <Icon name="check" size={26} />
          </span>
          <div>
            <p className="font-display text-2xl font-extrabold tracking-[-0.03em]">{successTitle ?? (lang === 'ml' ? 'നന്ദി.' : 'Thank you.')}</p>
            <p className={cx('mt-1', dark ? 'text-cream/90' : 'text-muted')}>{successText ?? t('form.success')}</p>
          </div>
        </div>
      </div>
      <FormBehavior />
    </form>
  );
}
