import type { Metadata } from 'next';

import { notFound, permanentRedirect } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getPost, getPosts, getLatestPosts, getPostByLegacySlug } from 'src/actions/blog-ssr';

import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug);

  // Unknown and moved posts are handled by the page (404 or redirect).
  if (!post) {
    return {};
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeywords,
    authors: post.author,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: paths.blog.details(post.slug),
      images: post.coverUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: post.coverUrl,
    },
  };
}

// Direct requests are redirected or 404'd by src/middleware.ts with real status codes;
// this covers client-side navigation, where the response has already started streaming.
export default function Page({ params }: Props) {
  const post = getPost(params.slug);

  if (!post) {
    const moved = getPostByLegacySlug(params.slug);

    if (moved) {
      permanentRedirect(paths.blog.details(moved.slug));
    }

    notFound();
  }

  const latestPosts = getLatestPosts(post.slug);

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
    return getPosts().map((post) => ({ slug: post.slug }));
  }
  return [];
}
