import type { Metadata } from 'next';

import { socialMetadata } from 'src/utils/social-metadata';

import { getPosts } from 'src/actions/blog-ssr';

import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

const title = 'Unicamp IT akademija – Frontend ir UX/UI dizaino kursai';

const description =
  'Praktinės 12 savaičių Frontend programavimo ir UX/UI dizaino programos su mentoriais, kasdien dirbančiais IT srityje. Galima mokytis nemokamai.';

export const metadata: Metadata = {
  title,
  description,
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
  // Only what the cards show, so post bodies are not sent to the browser.
  const posts = [...getPosts()]
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 3)
    .map((post) => ({ ...post, content: '' }));

  return <HomeView posts={posts} />;
}
