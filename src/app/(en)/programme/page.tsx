import Page from '@/components/Page';
import View from '@/views/Programme';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/programme', {
  title: 'Programme',
  description: 'The proposed programme for KILF 2027: five days of conversations, readings, films, music and theatre by Ashtamudi Lake, 31 Dec 2026 – 4 Jan 2027.',
});

export default function Route() {
  return (
    <Page pathname="/programme" event>
      <View lang="en" />
    </Page>
  );
}
