import type { Metadata } from 'next';

import { socialMetadata } from 'src/utils/social-metadata';

import { ProgramView } from 'src/sections/programs/view';

// ----------------------------------------------------------------------

const title = 'UX/UI dizaino kursai su Figma ir DI įrankiais | Unicamp';

const description =
  '108 valandų UX/UI dizaino kursas: naudotojų tyrimai, Figma, prototipai ir prieinamumas. Per 12 savaičių sukursite savo projektą su mentore.';

export const metadata: Metadata = {
  title,
  description,
  keywords:
    'IT akademija, UX dizainas, UX kursai, UX mokymai, UI dizainas, UI kursai, UI mokymai, Figma kursai, web dizaino kursai internetu, UX/UI dizainas internetu, dizaino kursai internetu, dizaino mokymai, dizaino sistemos, prototipavimas, skaitmeninis dizainas, naudotojų testavimai, web programavimas, UX/UI dizaino kursai Lietuvoje, naudotojų patirtis',
  authors: [{ name: 'Unicamp IT Akademija' }],
  robots: 'index, follow',
  ...socialMetadata({
    title,
    description,
    path: '/programs/ux',
    image: {
      url: '/assets/images/programs/certificates/ux.png',
      width: 1060,
      height: 733,
      alt: 'Unicamp UX/UI dizaino kurso sertifikatas',
    },
  }),
};

export default function Page() {
  return <ProgramView programId="productDesign" />;
}
