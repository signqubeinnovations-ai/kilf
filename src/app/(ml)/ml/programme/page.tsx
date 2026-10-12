import Page from '@/components/Page';
import View from '@/views/Programme';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/programme', {
  title: 'Programme',
  description: 'The proposed programme for KILF 2027: five days of conversations, readings, films, music and theatre by Ashtamudi Lake, 31 Dec 2026 – 4 Jan 2027.',
});

export default function Route() {
  return (
    <Page pathname="/ml/programme" event>
      <View lang="ml" />
    </Page>
  );
}
