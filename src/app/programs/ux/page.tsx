import { ProgramView } from '../../../sections/programs/view';

export const metadata = {
  title: 'Frontend Web programavimo pagrindai su JavaScript ir React',
  description:
    '108 valandų kursas - sužinokite HTML, CSS ir Next.js pagrindus bei įgykite praktinių Frontend programavimo įgūdžių.',
  keywords:
    'IT akademija, UX/UI dizainas, Figma mokymai, web dizaino kursai, web dizainas, UX mokymai, UI mokymai, dizaino kursai Lietuvoje, UX/UI dizaino kursai Lietuvoje, UX/UI dizaino mokymai Lietuvoje',
  author: 'Unicamp IT Akademija',
  robots: 'index, follow',
  openGraph: {
    title: 'Unicamp IT Akademija: Mokykitės Web Programavimo ir UX/UI Dizaino Lietuvoje',
    description: 'Inovatyvūs kursai, tikra praktika ir realūs projektai IT karjeros pradžiai!',
    url: 'https://unicamp.lt',
    type: 'website',
    locale: 'lt_LT',
    site_name: 'Unicamp',
    images: [
      {
        alt: 'Unicamp IT Akademija – Web Programavimas ir UX/UI Dizainas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@unicamplt',
    title: 'Unicamp IT Akademija',
    description:
      'Web programavimo mokymai ir UX/UI dizaino kursai su realia praktika ir projektais!',
  },
};

export default function Page() {
  return <ProgramView programId={'productDesign'} />;
}
