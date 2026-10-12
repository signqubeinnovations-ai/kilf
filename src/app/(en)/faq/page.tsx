import Page from '@/components/Page';
import View from '@/views/Faq';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/faq', {
  title: 'FAQ',
  description: 'When and where is KILF? Languages, passes, volunteering and more: answers to common questions about KILF 2027.',
});

export default function Route() {
  return (
    <Page pathname="/faq">
      <View lang="en" />
    </Page>
  );
}
