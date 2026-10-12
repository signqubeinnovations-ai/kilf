import Page from '@/components/Page';
import View from '@/views/Partners';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/partners', {
  title: 'Partner with us',
  description: 'Your brand. Our story. One lake. Partnership tiers, benefits and enquiries for KILF 2027.',
});

export default function Route() {
  return (
    <Page pathname="/ml/partners">
      <View lang="ml" />
    </Page>
  );
}
