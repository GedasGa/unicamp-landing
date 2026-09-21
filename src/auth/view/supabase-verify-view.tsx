'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { EmailInboxIcon } from 'src/assets/icons';

import { FormHead } from '../components/form-head';
import { FormReturnLink } from '../components/form-return-link';

// ----------------------------------------------------------------------

export function SupabaseVerifyView() {
  const { t } = useTranslate('auth');

  return (
    <>
      <FormHead
        icon={<EmailInboxIcon />}
        title={t('verify.title')}
        description={t('verify.description')}
      />

      <FormReturnLink href={paths.auth.signIn} sx={{ mt: 0 }} />
    </>
  );
}
