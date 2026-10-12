import Page from '@/components/Page';
import View from '@/views/Passes';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/passes', {
  title: 'Passes',
  description: 'Day, Festival and Young Reader passes for KILF 2027, and separate theatre tickets for Khasakkinte Ithihasam. Ticketing opens soon — register early.',
});

export default function Route() {
  return (
    <Page pathname="/passes" event>
      <View lang="en" />
    </Page>
  );
}
