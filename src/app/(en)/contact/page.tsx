import Page from '@/components/Page';
import View from '@/views/Contact';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/contact', {
  title: 'Contact',
  description: 'Contact the Kollam International Literature Festival team: kilf2027@gmail.com. Organised by Capital Media.',
});

export default function Route() {
  return (
    <Page pathname="/contact">
      <View lang="en" />
    </Page>
  );
}
