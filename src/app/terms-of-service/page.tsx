import type { Metadata } from 'next';

import { TermsOfServiceView } from '../../sections/terms-of-service/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Paslaugų teikimo sąlygos | Unicamp',
  description:
    'Unicamp svetainės ir mokymosi platformos naudojimo sąlygos: paskyra, naudotojo turinys, intelektinė nuosavybė ir atsakomybės apribojimai.',
};

export default function Page() {
  return <TermsOfServiceView />;
}
