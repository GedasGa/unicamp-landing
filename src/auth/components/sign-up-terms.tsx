import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export function SignUpTerms({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('auth');

  return (
    <Box
      component="span"
      sx={{
        mt: 3,
        display: 'block',
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
        ...sx,
      }}
      {...other}
    >
      {`${t('signUp.terms.prefix')} `}
      <Link
        component={RouterLink}
        href={paths.termsOfService}
        underline="always"
        color="text.primary"
      >
        {t('signUp.terms.termsOfService')}
      </Link>
      {` ${t('signUp.terms.and')} `}
      <Link
        component={RouterLink}
        href={paths.privacyPolicy}
        underline="always"
        color="text.primary"
      >
        {t('signUp.terms.privacyPolicy')}
      </Link>
      .
    </Box>
  );
}
