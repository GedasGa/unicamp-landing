import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { bgBlur } from '../../theme/styles';
import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

interface ProgramBannerProps extends BoxProps {
  programId: string;
}

export function ProgramBanner({ sx, programId, ...other }: ProgramBannerProps) {
  const { t } = useTranslate(programId);

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        spacing={2}
        sx={{
          position: 'relative',
          width: '100%',
          maxHeight: '800px', // Adjust as needed
          overflow: 'hidden',
          py: { xs: 4, md: 0 },
          px: { xs: 2, md: 0 },
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={`${CONFIG.assetsDir}/assets/background/ux-ui-designer-image.png`}
          alt="Background"
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Ensures the image covers the container
            borderRadius: { xs: 2, md: 0 },
          }}
        />

        {/* Text Overlay */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            bottom: '120px',
            left: '50%',
            transform: 'translateX(-50%)',
            // FIXME: Might be low contrast
            ...bgBlur({
              color: 'rgba(35, 37, 53, 0.09)',
              blur: 20,
            }),
            p: 3,
            borderRadius: 2,
            textAlign: 'center',
            color: 'common.white',
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h2">{t('banner.title')}</Typography>
            <Typography variant="body1">{t('banner.description')}</Typography>
          </Stack>
        </Box>

        {/* Text Section (Visible Below Image on Mobile) */}
        <Stack
          spacing={2}
          sx={{
            display: { xs: 'flex', md: 'none' }, // Show only on mobile
            paddingX: 2,
          }}
        >
          <Typography variant="h2">{t('banner.title')}</Typography>
          <Typography variant="body1">{t('banner.description')}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
