import Page from '@/components/Page';
import View from '@/views/Faq';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/faq', {
  title: 'FAQ',
  description: 'When and where is KILF? Languages, passes, volunteering and more: answers to common questions about KILF 2027.',
});

export default function Route() {
  return (
    <Page pathname="/ml/faq">
      <View lang="ml" />
    </Page>
  );
}
