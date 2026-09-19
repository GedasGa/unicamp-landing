import posthog from 'posthog-js';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RADIUS, varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { varFade } from 'src/components/animate';
import { Iconify } from 'src/components/iconify';

import { useTranslate } from '../../locales';

// ----------------------------------------------------------------------

export function ConsultationCard() {
  const { t } = useTranslate('home');

  return (
    <Card
      component={m.div}
      variants={varFade({ distance: 24 }).inUp}
      sx={{
        p: { xs: 3, md: 4 },
        gap: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
      }}
    >
      <Box
        sx={(theme) => ({
          width: 56,
          height: 56,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: RADIUS.md,
          color: 'text.primary',
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        })}
      >
        <Iconify icon="solar:calendar-mark-bold-duotone" width={28} />
      </Box>

      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        gap={1.5}
        sx={{ flex: '1 1 auto' }}
      >
        <Typography variant="h5">{t('hero.cta.consultation.description')}</Typography>
        <Label color="default" variant="soft">
          {t('hero.cta.consultation.free')}
        </Label>
      </Stack>

      <Button
        size="large"
        variant="contained"
        target="_blank"
        rel="noopener"
        href="https://calendly.com/gedas-gardauskas/15min"
        onClick={() => posthog.capture('hero_cta_clicked')}
        sx={{ flexShrink: 0 }}
      >
        {t('hero.cta.consultation.buttonText')}
      </Button>
    </Card>
  );
}
