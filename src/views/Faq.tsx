import { byOrder, getFaqs } from '@/lib/content';
import PageHero from '@/components/PageHero';
import Section from '@/components/Section';
import LimeButton from '@/components/LimeButton';
import { site } from '@/lib/site';
import Rings from '@/components/Rings';
import { localizePath, headings, type Lang } from '@/i18n/ui';

interface Props {
  lang: Lang;
}

export default function Faq(props: Props) {
  const { lang } = props;
  const h = headings(lang);
  const faqs = byOrder(getFaqs());
  const groups = [
    ['festival', h('The festival', 'ഉത്സവം')],
    ['tickets', h('Tickets and passes', 'ടിക്കറ്റുകളും പാസുകളും')],
    ['visiting', h('Visiting', 'സന്ദർശനം')],
    ['taking-part', h('Taking part', 'പങ്കാളിത്തം')],
  ] as const;
  return (
    <>
      <PageHero
        label={h('FAQ', 'ചോദ്യങ്ങൾ')}
        text={h('Questions,', 'ചോദ്യങ്ങൾ,')}
        accent={h('answered.', 'ഉത്തരങ്ങൾ.')}
        lang={h.lang}
        lead="Everything you need to know before the first chapter. Can’t find it? Write to us."
      />

      <Section tone="cream" className="!overflow-visible !pt-0" labelledby="faq-list-h">
        <h2 id="faq-list-h" className="sr-only" lang={h.lang}>
          {h('Frequently asked questions', 'പതിവു ചോദ്യങ്ങൾ')}
        </h2>
        <nav aria-label="Question topics" className="mb-14 flex flex-wrap gap-2">
          {groups.map(([id, label], i) => (
            <a
              key={i}
              href={`#${id}`}
              lang={h.lang}
              className="inline-flex min-h-11 items-center px-5 text-sm font-bold text-navy ring-1 ring-inset ring-navy/30 transition-colors hover:bg-navy hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="space-y-16">
          {groups.map(([id, label], gi) => (
            <section key={gi} id={id} aria-labelledby={`${id}-h`} className="grid gap-6 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h3 id={`${id}-h`} lang={h.lang} className="eyebrow flex items-center gap-3 text-navy lg:sticky lg:top-[calc(var(--hh)+2rem)]">
                  <Rings n={1} size={26} tone="cobalt" />
                  {label}
                </h3>
              </div>
              <div className="border-t border-line lg:col-span-8">
                {faqs
                  .filter((f) => f.data.group === id)
                  .map((f, i) => (
                    <details key={i} className="group border-b border-line" open={gi === 0 && i === 0} name="faq">
                      <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-[1.2rem] font-extrabold tracking-[-0.02em] text-navy transition-colors hover:text-cobalt sm:text-[1.3rem] [&::-webkit-details-marker]:hidden">
                        {f.data.question}
                        <span className="relative size-5 shrink-0" aria-hidden="true">
                          <span className="absolute left-0 top-1/2 h-px w-5 bg-current"></span>
                          <span className="absolute left-1/2 top-0 h-5 w-px bg-current transition-transform duration-300 group-open:rotate-90"></span>
                        </span>
                      </summary>
                      <div className="max-w-3xl pb-7 text-lg leading-relaxed text-muted">{f.data.answer}</div>
                    </details>
                  ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-start gap-5 bg-lake-soft p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <p className="text-lg">
            Still wondering?{' '}
            <a href={`mailto:${site.email}`} className="font-bold text-cobalt underline decoration-1 underline-offset-4">
              {site.email}
            </a>
          </p>
          <LimeButton href={localizePath('/contact', lang)} label="Contact us" />
        </div>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.data.question, acceptedAnswer: { '@type': 'Answer', text: f.data.answer } })),
          }).replace(/</g, '\\u003c'),
        }}
      />
    </>
  );
}
