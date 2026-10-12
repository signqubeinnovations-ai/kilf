import Page from '@/components/Page';
import View from '@/views/GetInvolved';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/get-involved', {
  title: 'Get involved',
  description: 'Register, volunteer, exhibit, partner or attend: five ways to be part of the first Kollam International Literature Festival.',
});

export default function Route() {
  return (
    <Page pathname="/get-involved">
      <View lang="en" />
    </Page>
  );
}
