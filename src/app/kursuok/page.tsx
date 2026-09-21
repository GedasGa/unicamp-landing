import type { Metadata } from 'next';

import { socialMetadata } from 'src/utils/social-metadata';

import { KursuokView } from 'src/sections/kursuok/view';

// ----------------------------------------------------------------------

const title = 'Nemokami IT kursai su Kursuok.lt finansavimu | Unicamp';

const description =
  'Gaukite iki 500 € Kursuok.lt finansavimą ir mokykitės Frontend programavimo ar UX/UI dizaino nemokamai. Sąlygos, registracijos datos ir pagalba teikiant paraišką.';

export const metadata: Metadata = {
  title,
  description,
  ...socialMetadata({
    title,
    description,
    path: '/kursuok',
    image: {
      url: '/assets/images/home/og-image.jpg',
      width: 1200,
      height: 604,
      alt: 'Unicamp – praktinės IT programos su mentoriais',
    },
  }),
};

export default function Page() {
  return <KursuokView />;
}
