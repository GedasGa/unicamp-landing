import type { MetadataRoute } from 'next';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', CONFIG.siteUrl).href,
  };
}
