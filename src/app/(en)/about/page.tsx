import Page from '@/components/Page';
import View from '@/views/About';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/about', {
  title: 'About',
  description: 'About KILF: why Ashtamudi, why Kollam matters, and the first Kollam International Literature Festival in brief, in English and Malayalam.',
});

export default function Route() {
  return (
    <Page pathname="/about">
      <View lang="en" />
    </Page>
  );
}
