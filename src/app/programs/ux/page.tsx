import { ProgramView } from '../../../sections/programs/view';

export const metadata = {
  title: 'UX/UI Web Dizaino Pagrindai su Figma - tapkite sertifikuotu UX dizaino profesionalu',
  description:
    '108 valandų kursas, apimantis UX/UI dizaino pagrindus, Figma įrankio naudojimą, prototipų kūrimą ir prieinamumo geriausias praktikas. Įgykite praktinių įgūdžių kuriant sklandžias ir patogias naudotojo patirtis.',
  keywords:
    'IT akademija, UX dizainas, UX kursai, UX mokymai, UI dizainas, UI kursai, UI mokymai, Figma kursai, web dizaino kursai internetu, UX/UI dizainas internetu, dizaino kursai internetu, dizaino mokymai, dizaino sistemos, prototipavimas, skaitmeninis dizainas, naudotojų testavimai, web programavimas, UX/UI dizaino kursai Lietuvoje, naudotojų patirtis',
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
  return <ProgramView programId={'productDesign'} />;
}
