import { paramCase } from 'src/utils/change-case';
import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';
import { getPost, getLatestPosts, getPosts } from 'src/actions/blog-ssr';

import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Blog - ${CONFIG.appName}` };

type Props = {
  params: { title: string };
};

export default async function Page({ params }: Props) {
  const { title } = params;

  const post = await getPost(title);
  const latestPosts = await getLatestPosts(title);

  return <PostDetailsHomeView post={post} latestPosts={latestPosts} />;
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    const posts = await getPosts();
    return posts.map((post: { title: string }) => ({ title: paramCase(post.title) }));
  }
  return [];
}
