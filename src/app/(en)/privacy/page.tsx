import Page from '@/components/Page';
import View from '@/views/Privacy';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/privacy', {
  title: 'Privacy',
  description: 'How the KILF 2027 website handles your personal details.',
});

export default function Route() {
  return (
    <Page pathname="/privacy">
      <View lang="en" />
    </Page>
  );
}
