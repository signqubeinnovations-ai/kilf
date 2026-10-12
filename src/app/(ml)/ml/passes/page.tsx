import Page from '@/components/Page';
import View from '@/views/Passes';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/passes', {
  title: 'Passes',
  description: 'Day, Festival and Young Reader passes for KILF 2027, and separate theatre tickets for Khasakkinte Ithihasam. Ticketing opens soon — register early.',
});

export default function Route() {
  return (
    <Page pathname="/ml/passes" event>
      <View lang="ml" />
    </Page>
  );
}
