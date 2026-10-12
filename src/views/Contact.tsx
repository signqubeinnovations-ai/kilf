import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import Icon from '@/components/Icon';
import Placeholder from '@/components/Placeholder';
import Form from '@/components/Form';
import Field from '@/components/Field';
import { site, isPlaceholder } from '@/lib/site';
import ChapterLabel from '@/components/ChapterLabel';
import Headline from '@/components/Headline';
import { localizePath, headings, type Lang } from '@/i18n/ui';

interface Props {
  lang: Lang;
}

export default function Contact(props: Props) {
  const { lang } = props;
  const lp = (p: string) => localizePath(p, lang);
  const h = headings(lang);
  const mail = (subject: string) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
  const topics = [
    ['Media & press', 'Interviews, press passes and images.', mail('KILF 2027: media'), 'Email the team'],
    ['Partnerships', 'Tiers, benefits and the full proposal.', lp('/partners#enquire'), 'Partner with KILF'],
    ['Volunteering', 'Hospitality, stage and guest care.', lp('/get-involved#volunteer'), 'Volunteer'],
    ['Speakers & ideas', 'Suggest a speaker, a session or a book.', mail('KILF 2027: speaker or session idea'), 'Send an idea'],
    ['Tickets & passes', 'Passes, theatre tickets and group bookings.', lp('/passes'), 'See passes'],
    ['Access', 'Anything that would make your visit easier.', mail('KILF 2027: access needs'), 'Tell us'],
  ];
  return (
    <>
      <PageHero
        label={h('Contact', 'ബന്ധപ്പെടാൻ')}
        text={h('Say', 'ഞങ്ങൾക്ക്')}
        accent={h('hello.', 'എഴുതൂ.')}
        lang={h.lang}
        lead="Questions, ideas, invitations, a story you think we should hear. We read everything."
      />

      <Section tone="cream" className="!pt-0" labelledby="contact-h">
        <h2 id="contact-h" className="sr-only" lang={h.lang}>
          {h('Contact details and form', 'ബന്ധപ്പെടാനുള്ള വിവരങ്ങളും ഫോമും')}
        </h2>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <ul className="self-start border-t border-line">
            <li className="flex items-start gap-5 border-b border-line py-6">
              <Icon name="mail" size={26} className="mt-1 shrink-0 text-cobalt" />
              <div className="min-w-0">
                <p className="eyebrow text-muted">Email</p>
                <a href={`mailto:${site.email}`} className="mt-1 block break-all font-display text-xl font-extrabold tracking-[-0.02em] text-navy hover:text-cobalt">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-5 border-b border-line py-6">
              <Icon name="at" size={26} className="mt-1 shrink-0 text-cobalt" />
              <div>
                <p className="eyebrow text-muted">Social</p>
                {site.socialUrl && !isPlaceholder(site.socialHandle) ? (
                  <a href={site.socialUrl} className="mt-1 block font-display text-xl font-extrabold tracking-[-0.02em] text-navy hover:text-cobalt" target="_blank" rel="noopener">
                    {site.socialHandle}
                  </a>
                ) : (
                  <p className="mt-1 font-display text-xl font-extrabold">
                    <Placeholder value={site.socialHandle} />
                  </p>
                )}
              </div>
            </li>
            <li className="flex items-start gap-5 border-b border-line py-6">
              <Icon name="star" size={26} className="mt-1 shrink-0 text-cobalt" />
              <div>
                <p className="eyebrow text-muted">Organiser</p>
                <p className="mt-1 font-display text-xl font-extrabold tracking-[-0.02em]">{site.organiser}</p>
              </div>
            </li>
            <li className="flex items-start gap-5 border-b border-line py-6">
              <Icon name="pin" size={26} className="mt-1 shrink-0 text-cobalt" />
              <div>
                <p className="eyebrow text-muted">Where</p>
                <p className="mt-1 font-display text-xl font-extrabold tracking-[-0.02em]">{site.city}</p>
              </div>
            </li>
          </ul>
          <Form id="contact-form" name="contact" lang={lang} className="card p-6 sm:p-9" successText="Thanks for writing. We’ll reply as soon as we can.">
            <Field formId="contact-form" name="name" label="Name" autoComplete="name" required />
            <Field formId="contact-form" name="email" type="email" label="Email" autoComplete="email" required />
            <Field formId="contact-form" name="phone" type="tel" label="Phone" autoComplete="tel" inputMode="tel" />
            <Field formId="contact-form" name="organisation" label="Organisation" autoComplete="organization" />
            <Field
              formId="contact-form"
              name="topic"
              type="select"
              label="Topic"
              options={['General question', 'Media & press', 'Speaker / programme', 'Tickets & passes', 'Partnership', 'Volunteering', 'Accessibility', 'Other']}
              full
            />
            <Field formId="contact-form" name="message" type="textarea" label="Message" full rows={5} required />
          </Form>
        </div>
      </Section>

      {/* Write to us about */}
      <Section tone="cream" rule labelledby="topics-h">
        <ChapterLabel label={h('Write to us about', 'എന്തിനെക്കുറിച്ചും എഴുതാം')} lang={h.lang} />
        <Headline id="topics-h" text={h('The quickest way', 'ശരിയായ ആളിലേക്കുള്ള')} accent={h('to the right person.', 'എളുപ്പവഴി.')} lang={h.lang} className="mt-6" />
        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map(([title, line, href, cta], i) => (
            <li key={i} className="border-t border-line">
              <a href={href} className="group flex h-full flex-col py-7">
                <h3 className="font-display text-[1.3rem] tracking-[-0.03em] transition-colors group-hover:text-cobalt">{title}</h3>
                <p className="mt-2 text-muted">{line}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 font-bold text-cobalt">
                  {cta}{' '}
                  <span aria-hidden="true" className="transition-transform duration-500 ease-[var(--ease-calm)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
