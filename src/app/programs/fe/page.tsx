import type { Metadata } from 'next';

import { socialMetadata } from 'src/utils/social-metadata';
import { JsonLd, courseSchema, breadcrumbSchema } from 'src/utils/json-ld';

import { ProgramView } from 'src/sections/programs/view';

// ----------------------------------------------------------------------

const title = 'Frontend programavimo kursai – JavaScript ir React | Unicamp';

const description =
  '108 valandų kursas, skirtas sužinoti HTML, CSS, JavaScript ir React pagrindus bei įgyti praktinių Frontend programavimo įgūdžių su realiais projektais.';

export const metadata: Metadata = {
  title,
  description,
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

const jsonLd = [
  courseSchema({
    name: 'Frontend programavimo kursas',
    description,
    path: '/programs/fe',
    price: 500,
    hours: 108,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Git'],
  }),
  breadcrumbSchema([
    { name: 'Unicamp', path: '/' },
    { name: 'Frontend programavimas', path: '/programs/fe' },
  ]),
];

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ProgramView programId="webDevelopment" />
    </>
  );
}
