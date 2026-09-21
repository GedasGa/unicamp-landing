import type { Metadata } from 'next';

import { PrivacyPolicyView } from '../../sections/privacy-policy/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Privatumo politika | Unicamp',
  description:
    'Kaip Unicamp renka, naudoja ir saugo jūsų asmens duomenis, kokius slapukus naudojame ir kokias teises turite pagal BDAR.',
};

export default function Page() {
  return <PrivacyPolicyView />;
}
