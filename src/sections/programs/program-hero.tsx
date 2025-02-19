import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { MotionViewport } from 'src/components/animate';

import { SectionTitle } from '../home/components/section-title';
import { FloatLine, FloatTriangleDownIcon } from '../home/components/svg-elements';
import { useTranslate } from '../../locales';
import { Icon } from '@iconify/react';
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
        label="Figma"
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
      <Chip
        icon={<Iconify icon="logos:openai-icon" />}
        label="OpenAI"
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
      <Chip
        icon={<Iconify icon="mdi:clipboard-text-outline" />}
        label="UX Research"
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
      <Chip
        icon={<Iconify icon="mdi:accessibility" />}
        label="Accessiblity"
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
      <Chip
        icon={<Iconify icon="mdi:puzzle-outline" />}
        label="Design Systems"
        variant="outlined"
        sx={{ borderRadius: '500px' }}
      />
    </Stack>
  );

  const renderCta = (
    <Box display="flex" alignItems="center" flexDirection="column" gap={{ xs: 1.5, sm: 2 }}>
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

  const renderFeatures = (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      flexWrap="wrap"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      sx={{
        my: { xs: 2, sm: 6 },
        mx: { xs: 2, sm: 15 },
      }}
    >
      <Stack alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Typography variant="h4">104h</Typography>
        <Typography variant="caption">Course duration</Typography>
      </Stack>
      <Stack alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Typography variant="h4">20</Typography>
        <Typography variant="caption">Group size</Typography>
      </Stack>
      <Stack alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h4" fontWeight="bold">
            1
          </Typography>
          <Chip
            size="small"
            label="Share on LinkedIn"
            sx={{ transform: 'translateY(-2px)' }}
            color="primary"
          />
        </Stack>
        <Typography variant="caption">Project</Typography>
      </Stack>
    </Stack>
  );

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <MotionViewport sx={{ position: 'relative' }}>
        <Container sx={{ py: { xs: 4, sm: 15 } }}>
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
