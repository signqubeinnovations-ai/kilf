import Page from '@/components/Page';
import View from '@/views/Visit';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/visit', {
  title: 'Plan your visit',
  description: 'Plan your visit to KILF 2027: three venues in Kollam city close to Ashtamudi Lake, with maps and directions.',
});

export default function Route() {
  return (
    <Page pathname="/visit">
      <View lang="en" />
    </Page>
  );
}
