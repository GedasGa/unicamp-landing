import type { Metadata } from 'next';

import { socialMetadata } from 'src/utils/social-metadata';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

const title = 'Unicamp IT akademija – Frontend ir UX/UI dizaino kursai';

const description =
  'Praktinės 12 savaičių Frontend programavimo ir UX/UI dizaino programos su mentoriais, kasdien dirbančiais IT srityje. Galima mokytis nemokamai.';

export const metadata: Metadata = {
  title,
  description,
  keywords:
    'IT akademija, IT kursai internetu, Web programavimas, JavaScript kursai, React kursai, UX/UI dizainas, frontend mokymai, backend mokymai, programavimo kursai Lietuvoje, JavaScript mokymai, dizaino kursai Lietuvoje, UX mokymai, UI mokymai, komandiniai projektai, praktinė IT patirtis, IT karjera, web dizainas, web development, programavimo mokymai, programavimas, mokymai Lietuvoje, Figma kursai, HTML mokymai, CSS mokymai, Next.js mokymai, React.js, Node.js, IT mokymai, skaitmeninė karjera, IT specialistai, web dizaino kursai, UX dizaino kursai, UI dizaino kursai, front-end development, back-end development, JavaScript development, web programming courses, front-end courses, back-end courses',
  authors: [{ name: 'Unicamp IT Akademija' }],
  robots: 'index, follow',
  ...socialMetadata({
    title,
    description,
    path: '/',
    image: {
      url: '/assets/images/home/og-image.jpg',
      width: 1200,
      height: 604,
      alt: 'Unicamp – praktinės IT programos su mentoriais',
    },
  }),
};

export default function Page() {
  return <HomeView />;
}
