import Page from '@/components/Page';
import View from '@/views/Home';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/ml/', {
  title: 'KILF 2027 · കൊല്ലം അന്താരാഷ്ട്ര സാഹിത്യോത്സവം',
  description: 'ഒന്നാം അധ്യായം: ഇടവേള — ആദ്യ കൊല്ലം അന്താരാഷ്ട്ര സാഹിത്യോത്സവം, 2026 ഡിസംബർ 31 – 2027 ജനുവരി 4, അഷ്ടമുടിക്കായലിനരികെ.',
});

export default function Route() {
  return (
    <Page pathname="/ml/" event overlayHeader>
      <View lang="ml" />
    </Page>
  );
}
