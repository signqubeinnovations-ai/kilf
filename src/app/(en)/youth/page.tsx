import Page from '@/components/Page';
import View from '@/views/Youth';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/youth', {
  title: 'Youth',
  description: 'Youth. This stage is yours. Poetry slams, open mics, reels, rap nights and campus ambassadors at KILF 2027.',
});

export default function Route() {
  return (
    <Page pathname="/youth">
      <View lang="en" />
    </Page>
  );
}
