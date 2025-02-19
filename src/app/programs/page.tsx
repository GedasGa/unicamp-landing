import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Unicamp IT Akademija: Mokykitės Web Programavimo ir UX/UI Dizaino Lietuvoje',
  description:
    'Unicamp – tai inovatyvi IT akademija Lietuvoje, siūlanti kursus apie Web Frontend ir Backend programavimą su JavaScript, UX/UI dizainą, IT specializacijų pasirinkimą ir AI produktyvumo įrankius. Mes išsiskiriame tuo, kad mūsų studentai dirba komandose, kuria realius produktus ir paleidžia juos į rinką. Pasiruoškite IT karjerai su tikra praktine patirtimi ir profesionalų pagalba!',
  keywords:
    'IT akademija, Web programavimas, UX/UI dizainas, JavaScript mokymai, IT karjera, kursai Lietuvoje, frontend mokymai, backend mokymai, komandiniai projektai, praktinė IT patirtis',
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
  return <HomeView />;
}
