import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { SECTION_PADDING } from 'src/theme/styles';

import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { renderEmphasis } from '../home/components/section-title';

// ----------------------------------------------------------------------

// The certificate each programme hands out. The home hero floats the UX/UI one,
// so both places read it from here.
export const CERTIFICATES: Record<string, string> = {
  productDesign: `${CONFIG.assetsDir}/assets/images/programs/certificates/ux.png`,
  webDevelopment: `${CONFIG.assetsDir}/assets/images/programs/certificates/frontend.png`,
};

interface ProgramCertificateProps extends BoxProps {
  programId: string;
}

export function ProgramCertificate({ sx, programId, ...other }: ProgramCertificateProps) {
  const { t } = useTranslate(programId);

  return (
    <Box
      component="section"
      sx={{ py: SECTION_PADDING, backgroundColor: 'grey.100', ...sx }}
      {...other}
    >
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          spacing={{ xs: 2, md: 9 }}
        >
          <Stack spacing={2} flex={1}>
            <Typography variant="h2">{renderEmphasis(t('certificate.title'))}</Typography>
            <Typography variant="body1">{t('certificate.description')}</Typography>
          </Stack>
          <Box
            component="img"
            src={CERTIFICATES[programId]}
            alt="Certificate"
            sx={{
              width: '100%',
              maxWidth: '600px',
              flex: 1,
              overflow: 'hidden',
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
