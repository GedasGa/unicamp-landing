import type { Metadata } from 'next';

import { socialMetadata } from 'src/utils/social-metadata';

import { ProgramView } from 'src/sections/programs/view';

// ----------------------------------------------------------------------

const title = 'Frontend programavimo kursai – JavaScript ir React | Unicamp';

const description =
  '108 valandų kursas, skirtas sužinoti HTML, CSS, JavaScript ir React pagrindus bei įgyti praktinių Frontend programavimo įgūdžių su realiais projektais.';

export const metadata: Metadata = {
  title,
  description,
  keywords:
    'IT akademija, Frontend kursai, Web programavimas, JavaScript kursai, React kursai, frontend mokymai, web programavimo mokymai, avaScript mokymai, React mokymai, Frontend programavimo kursai internetu, web programavimo kursai internetu, frontend mokymai internetu, HTML kursai, CSS kursai, React mokymai Lietuvoje, frontend dizainas, web dizaino kursai Lietuvoje',
  authors: [{ name: 'Unicamp IT Akademija' }],
  robots: 'index, follow',
  ...socialMetadata({
    title,
    description,
    path: '/programs/fe',
    image: {
      url: '/assets/images/programs/certificates/frontend.png',
      width: 1060,
      height: 733,
      alt: 'Unicamp Frontend kurso sertifikatas',
    },
  }),
};

export default function Page() {
  return <ProgramView programId="webDevelopment" />;
}
