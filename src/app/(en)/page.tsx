import Page from '@/components/Page';
import View from '@/views/Home';
import { pageMetadata } from '@/lib/meta';
import { site } from '@/lib/site';

export const metadata = pageMetadata('/', {
  title: 'KILF 2027 · Kollam International Literature Festival',
  description: site.description,
});

export default function Route() {
  return (
    <Page pathname="/" event overlayHeader>
      <View lang="en" />
    </Page>
  );
}
