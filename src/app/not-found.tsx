import type { Metadata } from 'next';

import { CONFIG } from 'src/config-global';
import { getServerTranslations } from 'src/locales/server';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getServerTranslations('common');

  return { title: `${t('notFound.title')} | ${CONFIG.appName}` };
}

export default function Page() {
  return <NotFoundView />;
}
