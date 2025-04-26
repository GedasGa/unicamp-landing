import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Unicamp IT Akademija: IT Kursai ir Karjeros Galimybės Internetu',
  description:
    'Unicamp IT Akademija siūlo platų praktinių IT kursų pasirinkimą – Web programavimas, UX/UI dizainas, JavaScript, React, Frontend, Backend, ir kitų technologijų mokymai. Pasiruoškite IT karjerai su realiais projektais ir komandiniais darbais.',
  keywords:
    'IT akademija, IT kursai internetu, Web programavimas, JavaScript kursai, React kursai, UX/UI dizainas, frontend mokymai, backend mokymai, programavimo kursai Lietuvoje, JavaScript mokymai, dizaino kursai Lietuvoje, UX mokymai, UI mokymai, komandiniai projektai, praktinė IT patirtis, IT karjera, web dizainas, web development, programavimo mokymai, programavimas, mokymai Lietuvoje, Figma kursai, HTML mokymai, CSS mokymai, Next.js mokymai, React.js, Node.js, IT mokymai, skaitmeninė karjera, IT specialistai, web dizaino kursai, UX dizaino kursai, UI dizaino kursai, front-end development, back-end development, JavaScript development, web programming courses, front-end courses, back-end courses',
  authors: 'Unicamp IT Akademija',
  robots: 'index, follow',
  openGraph: {
    title: 'Unicamp IT Akademija: UX/UI Dizaino ir Web Programavimo Kursai',
    description:
      'Sužinokite UX/UI dizainą ir web programavimą su realiais projektais bei praktiniais užsiėmimais.',
    url: 'https://unicamp.lt',
    type: 'website',
    locale: 'lt_LT',
    site_name: 'Unicamp',
    images: [
      {
        alt: 'Unicamp IT Akademija – Web Programavimas ir UX/UI Dizainas su Figma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@unicamplt',
    title: 'Unicamp IT Akademija',
    description:
      'Web programavimo mokymai ir UX/UI dizaino kursai su realia praktika, AI įrankais ir projektais!',
  },
};

export default function Page() {
  return <HomeView />;
}
