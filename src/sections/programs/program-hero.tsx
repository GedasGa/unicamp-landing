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
  productDesign: {
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
  webDevelopment: {
    skills: [
      {
        icon: 'mdi:language-javascript',
        text: 'hero.skills.0',
      },
      {
        icon: 'logos:openai-icon',
        text: 'hero.skills.1',
      },
      {
        icon: 'mdi:react',
        text: 'hero.skills.2',
      },
      {
        icon: 'mdi:responsive',
        text: 'hero.skills.3',
      },
      {
        icon: 'material-symbols:domain-verification-outline',
        text: 'hero.skills.4',
      },
    ],
  },
} as const;

// ----------------------------------------------------------------------
interface ProgramHeroProps extends BoxProps {
  programId: string;
  openApplyDialog: () => void;
}

export function ProgramHero({ programId, openApplyDialog, sx, ...other }: ProgramHeroProps) {
  const { t } = useTranslate(programId);

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
      {SKILLS[programId].skills.map((skill) => (
        <Chip
          key={skill.text}
          icon={<Iconify icon={skill.icon} />}
          label={t(skill.text)}
          variant="outlined"
          sx={{ borderRadius: '500px' }}
        />
      ))}
    </Stack>
  );

  const renderCta = (
    <Box display="flex" alignItems="center" flexDirection="column" gap={{ xs: 1.5, md: 2 }}>
      <Button
        color="inherit"
        size="large"
        variant="contained"
        sx={{ width: { xs: '100%' }, maxWidth: { md: '360px' } }}
        onClick={openApplyDialog}
      >
        {t('hero.cta.title')}
      </Button>
      <Typography variant="caption">{t('hero.cta.subtitle')}</Typography>
    </Box>
  );

  return (
    <Box
      component="section"
      sx={{ py: { xs: 4, md: 15 }, px: { xs: 2, md: 15 }, ...sx }}
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
