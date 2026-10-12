import Page from '@/components/Page';
import View from '@/views/Youth';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/youth', {
  title: 'Youth',
  description: 'Youth. This stage is yours. Poetry slams, open mics, reels, rap nights and campus ambassadors at KILF 2027.',
});

export default function Route() {
  return (
    <Page pathname="/ml/youth">
      <View lang="ml" />
    </Page>
  );
}
