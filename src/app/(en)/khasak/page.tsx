import Page from '@/components/Page';
import View from '@/views/Khasak';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/khasak', {
  title: 'Khasakkinte Ithihasam',
  description: 'Khasakkinte Ithihasam (proposed) at KILF 2027: O. V. Vijayan’s 1969 novel staged by Deepan Sivaraman. Choose a theatre ticket, or theatre + Festival Pass.',
});

export default function Route() {
  return (
    <Page pathname="/khasak">
      <View lang="en" />
    </Page>
  );
}
