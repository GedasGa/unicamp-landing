import type { Metadata } from 'next';

import { CONFIG } from 'src/config-global';
import { getServerTranslations } from 'src/locales/server';

// ----------------------------------------------------------------------

type AuthPage = 'signIn' | 'signUp' | 'resetPassword' | 'updatePassword' | 'verify';

/** Tab title for an auth page, in the visitor's language (Lithuanian by default). */
export async function authPageMetadata(page: AuthPage): Promise<Metadata> {
  const { t } = await getServerTranslations('auth');

  return { title: `${t(`pageTitles.${page}`)} | ${CONFIG.appName}` };
}
