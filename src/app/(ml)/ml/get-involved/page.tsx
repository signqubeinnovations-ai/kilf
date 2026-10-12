import Page from '@/components/Page';
import View from '@/views/GetInvolved';
import { pageMetadata } from '@/lib/meta';

// TODO(i18n): Malayalam translation pending. This page renders the English
// view with a notice; its canonical points to the English URL.
export const metadata = pageMetadata('/ml/get-involved', {
  title: 'Get involved',
  description: 'Register, volunteer, exhibit, partner or attend: five ways to be part of the first Kollam International Literature Festival.',
});

export default function Route() {
  return (
    <Page pathname="/ml/get-involved">
      <View lang="ml" />
    </Page>
  );
}
