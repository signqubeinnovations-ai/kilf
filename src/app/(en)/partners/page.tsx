import Page from '@/components/Page';
import View from '@/views/Partners';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/partners', {
  title: 'Partner with us',
  description: 'Your brand. Our story. One lake. Partnership tiers, benefits and enquiries for KILF 2027.',
});

export default function Route() {
  return (
    <Page pathname="/partners">
      <View lang="en" />
    </Page>
  );
}
