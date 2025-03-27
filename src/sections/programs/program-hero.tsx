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
const SKILLS = {
  ux: {
    skills: [
      {
        icon: 'logos:figma',
        text: 'hero.skills.0',
      },
      {
        icon: 'logos:openai-icon',
        text: 'hero.skills.1',
      },
      {
        icon: 'mdi:clipboard-text-outline',
        text: 'hero.skills.2',
      },
      {
        icon: 'mdi:accessibility',
        text: 'hero.skills.3',
      },
      {
        icon: 'mdi:puzzle-outline',
        text: 'hero.skills.4',
      },
    ],
  },
  fe: {
    skills: [
      {
        icon: 'logos:figma',
        text: 'hero.skills.0',
      },
      {
        icon: 'logos:openai-icon',
        text: 'hero.skills.1',
      },
      {
        icon: 'mdi:clipboard-text-outline',
        text: 'hero.skills.2',
      },
      {
        icon: 'mdi:accessibility',
        text: 'hero.skills.3',
      },
      {
        icon: 'mdi:puzzle-outline',
        text: 'hero.skills.4',
      },
    ],
  },
} as const;

// ----------------------------------------------------------------------
interface ProgramHeroProps extends BoxProps {
  programName: string;
}

export function ProgramHero({ programName, sx, ...other }: ProgramHeroProps) {
  const { t } = useTranslate(programName);

  console.log(t('skills'));

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
      {/* @ts-ignore */}
      {SKILLS[programName].skills.map((skill) => (
        <Chip
          icon={<Iconify icon={skill.icon} />}
          label={t(skill.text)}
          variant="outlined"
          sx={{ borderRadius: '500px' }}
        />
      ))}
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
            {t('hero.title')}
          </Typography>
          {renderChips}
          {renderCta}
        </Container>
      </MotionViewport>
    </Box>
  );
}
