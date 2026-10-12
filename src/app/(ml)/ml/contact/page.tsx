import Page from '@/components/Page';
import View from '@/views/Contact';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/contact', {
  title: 'Contact',
  description: 'Contact the Kollam International Literature Festival team: kilf2027@gmail.com. Organised by Capital Media.',
});

export default function Route() {
  return (
    <Page pathname="/ml/contact">
      <View lang="ml" />
    </Page>
  );
}
