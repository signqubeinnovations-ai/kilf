import Page from '@/components/Page';
import View from '@/views/Privacy';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/privacy', {
  title: 'Privacy',
  description: 'How the KILF 2027 website handles your personal details.',
});

export default function Route() {
  return (
    <Page pathname="/ml/privacy">
      <View lang="ml" />
    </Page>
  );
}
