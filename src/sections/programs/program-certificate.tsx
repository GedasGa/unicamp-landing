import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

interface ProgramCertificateProps extends BoxProps {
  programId: string;
}

export function ProgramCertificate({ sx, programId, ...other }: ProgramCertificateProps) {
  const { t } = useTranslate(programId);

  return (
    <Box
      component="section"
      sx={{ py: { xs: 4, md: 20 }, pl: { xs: 2, md: 15 }, backgroundColor: 'grey.100', ...sx }}
      {...other}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={{ xs: 2, md: 9 }}>
        <Stack spacing={2} flex={1}>
          <Typography variant="h2">{t('certificate.title')}</Typography>
          <Typography variant="body1">{t('certificate.description')}</Typography>
        </Stack>
        <Box
          component="img"
          src={`${CONFIG.assetsDir}/assets/illustrations/${programId}-certificate.png`}
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
