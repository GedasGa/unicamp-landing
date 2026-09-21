import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RADIUS, SECTION_PADDING } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { BrandGlow } from '../home/components/brand-glow';
import { renderEmphasis } from '../home/components/section-title';

// ----------------------------------------------------------------------

type KursuokHeroProps = BoxProps & {
  openApplyDialog: () => void;
};

export function KursuokHero({ openApplyDialog, sx, ...other }: KursuokHeroProps) {
  const { t } = useTranslate('kursuok', { keyPrefix: 'hero' });

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, overflow: 'hidden', ...sx }} {...other}>
      <MotionViewport sx={{ position: 'relative' }}>
        <BrandGlow intensity={0.18} sx={{ top: '45%', width: { xs: 360, md: 760 } }} />

        <Container sx={{ position: 'relative' }}>
          <Stack
            spacing={3}
            alignItems="center"
            sx={{ mx: 'auto', maxWidth: 760, textAlign: 'center' }}
          >
            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                {t('badge')}
              </Typography>
            </m.div>

            <Typography component={m.h1} variants={varFade({ distance: 24 }).inUp} variant="h1">
              {renderEmphasis(t('title'))}
            </Typography>

            <Typography
              component={m.p}
              variants={varFade({ distance: 24 }).inUp}
              variant="body1"
              sx={{ color: 'text.secondary', fontSize: { md: 18 } }}
            >
              {t('subtitle')}
            </Typography>

            {/* The call isn't open yet, so the date sits above the buttons, not in small print. */}
            <Box
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
              sx={{
                px: 2,
                py: 1,
                gap: 1,
                display: 'inline-flex',
                alignItems: 'center',
                typography: 'subtitle2',
                borderRadius: RADIUS.pill,
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.card,
              }}
            >
              <Iconify icon="iconmind:calendar-clock-outline-thin" width={20} />
              {t('status')}
            </Box>

            <Stack
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              sx={{ pt: 2, width: { xs: 1, sm: 'auto' } }}
            >
              <Button color="inherit" size="large" variant="contained" onClick={openApplyDialog}>
                {t('cta')}
              </Button>
              <Button color="inherit" size="large" variant="outlined" href="#courses">
                {t('secondaryCta')}
              </Button>
            </Stack>

            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {t('ctaCaption')}
            </Typography>
          </Stack>
        </Container>
      </MotionViewport>
    </Box>
  );
}
