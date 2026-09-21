import type { MetadataRoute } from 'next';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { getPosts } from 'src/actions/blog-ssr';

// ----------------------------------------------------------------------

// Public, indexable pages only. /auth and /app are deliberately left out.
const STATIC_PAGES = [
  '/',
  paths.programs.fe,
  paths.programs.ux,
  paths.blog.root,
  paths.privacyPolicy,
  paths.termsOfService,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toUrl = (path: string) => new URL(path, CONFIG.siteUrl).href;

  const pages = STATIC_PAGES.map((path) => ({ url: toUrl(path) }));

  const posts = getPosts().map((post) => ({
    url: toUrl(paths.blog.details(post.title)),
    lastModified: post.createdAt ? new Date(post.createdAt) : undefined,
  }));

  return [...pages, ...posts];
}
