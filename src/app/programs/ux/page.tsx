import type { Metadata } from 'next';

import { socialMetadata } from 'src/utils/social-metadata';
import { JsonLd, courseSchema, breadcrumbSchema } from 'src/utils/json-ld';

import { ProgramView } from 'src/sections/programs/view';

// ----------------------------------------------------------------------

const title = 'UX/UI dizaino kursai su Figma ir DI įrankiais | Unicamp';

const description =
  '108 valandų UX/UI dizaino kursas: naudotojų tyrimai, Figma, prototipai ir prieinamumas. Per 12 savaičių sukursite savo projektą su mentore.';

export const metadata: Metadata = {
  title,
  description,
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

const jsonLd = [
  courseSchema({
    name: 'UX/UI dizaino kursas',
    description,
    path: '/programs/ux',
    price: 500,
    hours: 108,
    skills: ['UX tyrimai', 'UI dizainas', 'Figma', 'Prototipavimas', 'Prieinamumas'],
  }),
  breadcrumbSchema([
    { name: 'Unicamp', path: '/' },
    { name: 'UX/UI dizainas', path: '/programs/ux' },
  ]),
];

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ProgramView programId="productDesign" />
    </>
  );
}
