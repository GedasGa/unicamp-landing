import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import Button from '@mui/material/Button';
import posthog from 'posthog-js';
import { Chip } from '@mui/material';
import { Iconify } from '../../components/iconify';

// ----------------------------------------------------------------------

export function ProgramHero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('programs');

  const renderChips = (
    <Stack
      spacing={1.5}
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      sx={{
        mt: 8,
        mx: 'auto',
        mb: { xs: 5, md: 8 },
      }}
    >
      <Chip
        icon={<Iconify icon="logos:figma" />}
        label={t('ux.skills.figma')}
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
      <Chip
        icon={<Iconify icon="logos:openai-icon" />}
        label={t('ux.skills.openai')}
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
      <Chip
        icon={<Iconify icon="mdi:clipboard-text-outline" />}
        label={t('ux.skills.uxResearch')}
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
      <Chip
        icon={<Iconify icon="mdi:accessibility" />}
        label={t('ux.skills.accessibility')}
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
      <Chip
        icon={<Iconify icon="mdi:puzzle-outline" />}
        label={t('ux.skills.designSystems')}
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
    </Stack>
  );

  const renderCta = (
    <Box display="flex" alignItems="center" flexDirection="column" gap={{ xs: 1.5, sm: 2 }}>
      {/* @ts-ignore Complain about target */}
      <Button
        color="inherit"
        size="large"
        variant="contained"
        target="_blank"
        sx={{ width: { xs: '100%' }, maxWidth: { sm: '360px' } }}
        onClick={() => posthog.capture('hero_cta_clicked')}
      >
        {t('hero.cta.title')}
      </Button>
      <Typography variant="caption">{t('hero.cta.subtitle')}</Typography>
    </Box>
  );

  return (
    <Box
      component="section"
      sx={{ py: { xs: 4, sm: 15 }, px: { xs: 2, sm: 15 }, ...sx }}
      {...other}
    >
      <MotionViewport sx={{ position: 'relative' }}>
        <Container disableGutters>
          <Typography component="h1" variant="h1" textAlign="center">
            {t('ux.title')}
          </Typography>
          {renderChips}
          {renderCta}
        </Container>
      </MotionViewport>
    </Box>
  );
}
