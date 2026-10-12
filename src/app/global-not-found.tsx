import type { Metadata } from 'next';
import Document from '@/components/Document';
import Page from '@/components/Page';
import Headline from '@/components/Headline';
import LimeButton from '@/components/LimeButton';
import TextLink from '@/components/TextLink';
import Rings from '@/components/Rings';
import { pageMetadata } from '@/lib/meta';

// Any URL the site doesn't have (out/404.html on a static host).
export const metadata: Metadata = pageMetadata('/404', {
  title: 'Page not found',
  description: 'This page seems to have drifted out onto the lake.',
  noindex: true,
});

export default function GlobalNotFound() {
  return (
    <Document lang="en">
      <Page pathname="/404">
        <section className="bg-cream pb-24 pt-16 sm:pb-32 sm:pt-24">
          <div className="container-kilf text-center">
            <Rings n={3} size={120} tone="lake" className="mx-auto" />
            <p className="numeral mt-6 text-7xl text-cobalt sm:text-8xl">404</p>
            <Headline as="h1" text="This page drifted out onto the" accent="lake." className="mx-auto mt-6 max-w-3xl" />
            <p className="mx-auto mt-5 max-w-lg text-lg text-muted">Some stories go missing. Let’s get you back to the shore.</p>
            <p className="mt-3 text-lg text-muted" lang="ml">
              ഈ പേജ് കണ്ടെത്താനായില്ല.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <LimeButton href="/" label="Back to the home page" />
              <TextLink href="/programme/" label="Explore the programme" />
            </div>
          </div>
        </section>
      </Page>
    </Document>
  );
}
