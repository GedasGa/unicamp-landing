import { paramCase } from 'src/utils/change-case';

import { CONFIG } from 'src/config-global';
import { getPost, getLatestPosts, getPosts } from 'src/actions/blog-ssr';

import { PostDetailsHomeView } from 'src/sections/blog/view';
import { Metadata, ResolvingMetadata } from 'next';

// ----------------------------------------------------------------------

type Props = {
  params: { title: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { title } = params;

  const post = await getPost(title);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post?.metaTitle,
    description: post?.metaDescription,
    keywords: post?.metaKeywords,
    author: 'Unicamp IT Akademija',
    openGraph: {
      title: post?.metaTitle,
      description: post?.metaDescription,
      images: post?.coverUrl || '',
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.metaTitle,
      description: post?.metaDescription || 'Default blog post description',
      images: post?.coverUrl,
    },
  };
}

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
    const posts = getPosts();
    return posts.map((post: { title: string }) => ({ title: paramCase(post.title) }));
  }
  return [];
}
