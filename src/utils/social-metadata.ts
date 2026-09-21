import type { Metadata } from 'next';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type Props = {
  title: string;
  description: string;
  /** Page path, e.g. '/programs/fe'. Resolved against metadataBase. */
  path: string;
  image?: SocialImage;
};

/**
 * Open Graph and Twitter tags for a page, so link previews show the page's own
 * title, description, URL and image instead of site-wide defaults.
 */
export function socialMetadata({
  title,
  description,
  path,
  image,
}: Props): Pick<Metadata, 'openGraph' | 'twitter'> {
  const images = image ? [image] : undefined;

  return {
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      locale: 'lt_LT',
      siteName: CONFIG.appName,
      images,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      site: '@unicamplt',
      title,
      description,
      images,
    },
  };
}
