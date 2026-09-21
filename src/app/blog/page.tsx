import type { Metadata } from 'next';

import { socialMetadata } from 'src/utils/social-metadata';

import { getPosts } from 'src/actions/blog-ssr';

import { PostListHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

const title = 'Straipsniai apie IT karjerą ir mokymąsi | Unicamp';

const description =
  'Patarimai, kaip pradėti IT karjerą, mokytis Frontend programavimo ir UX/UI dizaino bei naudotis DI įrankiais. Rašo Unicamp mentoriai.';

export const metadata: Metadata = {
  title,
  description,
  ...socialMetadata({ title, description, path: '/blog' }),
};

export default async function Page() {
  const posts = await getPosts();

  return <PostListHomeView posts={posts} />;
}
