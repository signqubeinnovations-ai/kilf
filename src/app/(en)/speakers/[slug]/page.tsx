import { notFound } from 'next/navigation';
import Page from '@/components/Page';
import SpeakerDetail from '@/views/SpeakerDetail';
import { getSpeakers } from '@/lib/content';
import { pageMetadata } from '@/lib/meta';
import { hasBio, NO_BIO } from '@/lib/speakers';

// A detail page is generated only once a speaker's Markdown file has a bio.
export const dynamicParams = false;
const withBio = () => getSpeakers().filter((s) => hasBio(s.body));

export function generateStaticParams() {
  const params = withBio().map((s) => ({ slug: s.id }));
  // A static export needs at least one page here; until the first bio lands, a
  // placeholder is built and then removed (scripts/postbuild.mjs).
  return params.length ? params : [{ slug: NO_BIO }];
}

const find = async (params: Promise<{ slug: string }>) => {
  const { slug } = await params;
  return withBio().find((s) => s.id === slug);
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const entry = await find(params);
  if (!entry) return {};
  return pageMetadata(`/speakers/${entry.id}`, {
    title: entry.data.name,
    description: `${entry.data.name}, ${entry.data.role}. Proposed speaker at KILF 2027, Kollam.`,
  });
}

export default async function Route({ params }: { params: Promise<{ slug: string }> }) {
  const entry = await find(params);
  if (!entry) notFound();
  return (
    <Page pathname={`/speakers/${entry.id}`}>
      <SpeakerDetail lang="en" entry={entry} />
    </Page>
  );
}
