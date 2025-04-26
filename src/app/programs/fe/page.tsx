import { ProgramView } from '../../../sections/programs/view';

export const metadata = {
  title: 'Frontend Web Programavimo Pagrindai su JavaScript ir React',
  description:
    '108 valandų kursas, skirtas sužinoti HTML, CSS, JavaScript ir React pagrindus bei įgyti praktinių Frontend programavimo įgūdžių su realiais projektais.',
  keywords:
    'IT akademija, Frontend kursai, Web programavimas, JavaScript kursai, React kursai, frontend mokymai, web programavimo mokymai, avaScript mokymai, React mokymai, Frontend programavimo kursai internetu, web programavimo kursai internetu, frontend mokymai internetu, HTML kursai, CSS kursai, React mokymai Lietuvoje, frontend dizainas, web dizaino kursai Lietuvoje',
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
  return <ProgramView programId={'webDevelopment'} />;
}
