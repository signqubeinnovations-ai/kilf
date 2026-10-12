import Page from '@/components/Page';
import View from '@/views/Visit';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/visit', {
  title: 'Plan your visit',
  description: 'Plan your visit to KILF 2027: three venues in Kollam city close to Ashtamudi Lake, with maps and directions.',
});

export default function Route() {
  return (
    <Page pathname="/ml/visit">
      <View lang="ml" />
    </Page>
  );
}
