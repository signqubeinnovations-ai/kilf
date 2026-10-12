import Page from '@/components/Page';
import View from '@/views/Speakers';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/speakers', {
  title: 'Speakers',
  description: 'Voices without borders: the proposed line-up for KILF 2027, from M. Mukundan and Sara Joseph to Manu S. Pillai, Vairamuthu and Lijo Jose Pellissery.',
});

export default function Route() {
  return (
    <Page pathname="/speakers">
      <View lang="en" />
    </Page>
  );
}
