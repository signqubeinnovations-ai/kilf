import Page from '@/components/Page';
import View from '@/views/Speakers';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/speakers', {
  title: 'Speakers',
  description: 'Voices without borders: the proposed line-up for KILF 2027, from M. Mukundan and Sara Joseph to Manu S. Pillai, Vairamuthu and Lijo Jose Pellissery.',
});

export default function Route() {
  return (
    <Page pathname="/ml/speakers">
      <View lang="ml" />
    </Page>
  );
}
