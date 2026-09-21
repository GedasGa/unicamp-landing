import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { getPost, getPostByLegacySlug } from 'src/actions/blog-ssr';

// ----------------------------------------------------------------------

/**
 * Blog URLs are resolved here, before rendering. The root loading.tsx streams a 200
 * before a page runs, so a redirect or notFound() inside the page can't change the
 * status code. Handling it here gives old URLs a real 308 and unknown posts a real 404.
 */
export function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.split('/')[2];

  if (!slug || getPost(slug)) {
    return NextResponse.next();
  }

  const moved = getPostByLegacySlug(slug);

  if (moved) {
    const url = request.nextUrl.clone();
    url.pathname = `/blog/${moved.slug}`;
    return NextResponse.redirect(url, 308);
  }

  // No route matches this path, so Next renders not-found.tsx with a 404,
  // while the address bar keeps the URL the visitor asked for.
  return NextResponse.rewrite(new URL('/_not-found-blog-post', request.url));
}

export const config = {
  // '/blog/:slug' registers as a pattern for '/blog' only in Next 14, so match everything
  // under /blog and let the handler above pass the list page through.
  matcher: '/blog/:path*',
};
