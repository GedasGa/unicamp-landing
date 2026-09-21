import type { IDateValue } from './common';

// ----------------------------------------------------------------------

export type IPostFilters = {
  publish: string;
};

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: IDateValue;
  author?: { name: string; avatarUrl: string };
};

export type IPostItem = {
  id: string;
  /**
   * URL segment for /blog/[slug]. Set once and don't change it: lowercase ASCII and
   * hyphens only, with Lithuanian letters written plainly (ė -> e, š -> s, ū -> u).
   */
  slug: string;
  /** Old URL segments that should permanently redirect to `slug`. */
  legacySlugs?: string[];
  title: string;
  tags: string[];
  publish: string;
  content: string;
  coverUrl: string;
  metaTitle: string;
  description: string;
  metaKeywords: string[];
  metaDescription: string;
  createdAt: IDateValue;
  author: { name: string; avatarUrl: string };
};
