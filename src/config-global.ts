import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  siteUrl: string;
  serverUrl: string;
  assetsDir: string;
  isStaticExport: boolean;
  auth: {
    method: 'supabase';
    redirectPath: string;
  };
  supabase: { url: string; key: string };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: 'Unicamp',
  appVersion: packageJson.version,
  // Public origin used for canonical URLs and absolute social preview links.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unicamp.lt',
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
  assetsDir: process.env.NEXT_PUBLIC_ASSETS_DIR ?? '',
  isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),
  /**
   * Auth
   * @method supabase
   */
  auth: {
    method: 'supabase',
    redirectPath: paths.app.root,
  },
  /**
   * Supabase
   */
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
};
