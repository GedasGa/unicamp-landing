import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from '../../locales';
import { Chip } from '@mui/material';

// ----------------------------------------------------------------------

interface ProgramFeaturesProps extends BoxProps {
  programName: string;
}

export function ProgramFeatures({ programName, sx, ...other }: ProgramFeaturesProps) {
  const { t } = useTranslate(programName);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 2, md: 6 },
        px: { xs: 2, md: 15 },
        ...sx,
      }}
      {...other}
    >
      <Container disableGutters>
        <Stack
          spacing={3}
          direction={{ xs: 'column', md: 'row' }}
          flexWrap="wrap"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack alignItems={{ xs: 'flex-start', md: 'center' }} flex={1}>
            <Typography variant="h4">{t('hero.features.courseDuration.description')}</Typography>
            <Typography variant="caption">{t('hero.features.courseDuration.title')}</Typography>
          </Stack>
          <Stack alignItems={{ xs: 'flex-start', md: 'center' }} flex={1}>
            <Typography variant="h4">{t('hero.features.groupSize.description')}</Typography>
            <Typography variant="caption">{t('hero.features.groupSize.title')}</Typography>
          </Stack>
          <Stack alignItems={{ xs: 'flex-start', md: 'center' }} flex={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight="bold">
                {t('hero.features.project.description')}
              </Typography>
              <Chip
                size="small"
                label={t('hero.features.project.chip')}
                sx={{ transform: 'translateY(-2px)' }}
                color="primary"
              />
            </Stack>
            <Typography variant="caption">{t('hero.features.project.title')}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
