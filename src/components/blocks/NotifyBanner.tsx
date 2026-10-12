import Headline from '../Headline';
import Form from '../Form';
import Field from '../Field';
import Rings from '../Rings';
import type { Lang } from '@/i18n/ui';
import { cx } from '@/lib/cx';

interface Props {
  id: string;
  formName: string;
  text: string;
  accent: string;
  lead?: string;
  kicker?: string;
  submitLabel?: string;
  lang?: Lang;
  /** Language of the headline, when it differs from the page (Malayalam headlines on /ml/). */
  headingLang?: string;
  extraField?: { name: string; label: string; options: string[] };
  extraFields?: { name: string; label: string; options: string[] }[];
  /** lake (default) is pale lake blue; night is the evening navy. `lime`, `sky` and `blue` are older names. */
  tone?: 'lake' | 'night' | 'lime' | 'blue' | 'sky';
}

/** A calm band with a compact "Notify me" form in a cream box. */
export default function NotifyBanner(props: Props) {
  const { id, formName, text, accent, lead, kicker, submitLabel = 'Notify me', lang = 'en', headingLang, extraField, extraFields = [], tone = 'lake' } = props;
  const dark = tone === 'night' || tone === 'blue';
  const selects = [...(extraField ? [extraField] : []), ...extraFields];
  return (
    <>
      <section
        id={id}
        className={cx('relative overflow-hidden py-24 sm:py-28 lg:py-32', dark ? 'on-dark bg-night text-white' : 'bg-lake-soft text-navy')}
        aria-labelledby={`${id}-h`}
      >
        <div className="container-kilf relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            {kicker && (
              <p className={cx('eyebrow inline-flex items-center gap-3', dark ? 'text-white/85' : 'text-navy')}>
                <Rings n={1} size={26} tone={dark ? 'lake' : 'cobalt'} />
                {kicker}
              </p>
            )}
            <Headline id={`${id}-h`} text={text} accent={accent} lang={headingLang} tone={dark ? 'dark' : 'light'} size="lg" className={cx(kicker && 'mt-6')} />
            {lead && <p className={cx('mt-6 max-w-md text-lg leading-relaxed', dark ? 'text-white/85' : 'text-navy/80')}>{lead}</p>}
          </div>
          <Form
            id={`${id}-form`}
            name={formName}
            lang={lang}
            submitLabel={submitLabel}
            className="on-light border border-navy/10 bg-cream p-6 text-navy sm:p-9"
            successText="We’ll let you know the moment it opens."
          >
            <Field formId={`${id}-form`} name="name" label="Name" autoComplete="name" required />
            <Field formId={`${id}-form`} name="contact" label="Email or WhatsApp number" autoComplete="email" required />
            {selects.map((f) => (
              <Field key={f.name} formId={`${id}-form`} type="select" name={f.name} label={f.label} options={f.options} full={selects.length === 1} />
            ))}
          </Form>
        </div>
      </section>
    </>
  );
}
