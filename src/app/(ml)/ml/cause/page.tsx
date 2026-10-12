import Page from '@/components/Page';
import View from '@/views/Cause';
import { pageMetadata } from '@/lib/meta';

export const metadata = pageMetadata('/ml/cause', {
  title: 'ഞങ്ങളുടെ ദൗത്യം',
  description: 'ജലം ജീവനോടെ കാക്കാം. റാംസർ തണ്ണീർത്തടമായ അഷ്ടമുടിക്കായലിനോടുള്ള KILF 2027-ന്റെ വാഗ്ദാനങ്ങൾ, അഷ്ടമുടി ശുചീകരണത്തിൽ പങ്കുചേരാനുള്ള വഴി.',
});

export default function Route() {
  return (
    <Page pathname="/ml/cause">
      <View lang="ml" />
    </Page>
  );
}
