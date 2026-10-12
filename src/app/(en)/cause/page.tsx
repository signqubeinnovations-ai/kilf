import Page from '@/components/Page';
import View from '@/views/Cause';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/cause', {
  title: 'Our cause',
  description: 'Keep the waters alive. Ashtamudi Lake is a Ramsar wetland: KILF 2027’s commitments to it, and how to join the Ashtamudi clean-up.',
});

export default function Route() {
  return (
    <Page pathname="/cause">
      <View lang="en" />
    </Page>
  );
}
