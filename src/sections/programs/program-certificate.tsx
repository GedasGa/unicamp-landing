import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTranslate } from '../../locales';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

export function ProgramCertificate({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('programs');

  return (
    <Box
      component="section"
      sx={{ py: { xs: 4, sm: 20 }, pl: { xs: 2, sm: 15 }, backgroundColor: 'grey.100', ...sx }}
      {...other}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={{ xs: 2, sm: 9 }}>
        <Stack spacing={2} flex={1}>
          <Typography variant="h2">{t('ux.certificate.title')}</Typography>
          <Typography variant="body1">{t('ux.certificate.description')}</Typography>
        </Stack>
        <Box
          component="img"
          src={`${CONFIG.assetsDir}/assets/illustrations/illustration-certificate.png`}
          alt="Certificate"
          sx={{
            width: '100%',
            maxWidth: '600px',
            flex: 1,
            overflow: 'hidden',
          }}
        />
      </Stack>
    </Box>
  );
}
