import Page from '@/components/Page';
import View from '@/views/Khasak';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/khasak', {
  title: 'Khasakkinte Ithihasam',
  description: 'Khasakkinte Ithihasam (proposed) at KILF 2027: O. V. Vijayan’s 1969 novel staged by Deepan Sivaraman. Choose a theatre ticket, or theatre + Festival Pass.',
});

export default function Route() {
  return (
    <Page pathname="/ml/khasak">
      <View lang="ml" />
    </Page>
  );
}
