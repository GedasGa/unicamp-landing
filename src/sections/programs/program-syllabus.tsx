import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { useTranslate } from '../../locales';
import { Chip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Iconify } from '../../components/iconify';
import Card, { type CardProps } from '@mui/material/Card';
import { Image } from '../../components/image';
import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

const MODULES = [
  {
    illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-foundation.png`,
    title: 'ux.modules.0.title',
    description: 'ux.modules.0.description',
    skills: ['ux.modules.0.skills.0', 'ux.modules.0.skills.1'],
  },
  {
    illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-seamless-experiences.png`,
    title: 'ux.modules.1.title',
    description: 'ux.modules.1.description',
    skills: ['ux.modules.1.skills.0', 'ux.modules.1.skills.1', 'ux.modules.1.skills.2'],
  },
  {
    illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-visual-language.png`,
    title: 'ux.modules.2.title',
    description: 'ux.modules.2.description',
    skills: ['ux.modules.2.skills.0', 'ux.modules.2.skills.1', 'ux.modules.2.skills.2'],
  },
  {
    illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-from-concept-to-creation.png`,
    title: 'ux.modules.3.title',
    description: 'ux.modules.3.description',
    skills: ['ux.modules.3.skills.0', 'ux.modules.3.skills.1'],
  },
];

// ----------------------------------------------------------------------

export function ProgramSyllabus({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('programs');

  return (
    <Box
      component="section"
      sx={{ py: { xs: 4, sm: 20 }, px: { xs: 2, sm: 15 }, backgroundColor: 'grey.100', ...sx }}
      {...other}
    >
      <Stack spacing={{ xs: 2, sm: 7 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h1">{t('ux.syllabus.title')}</Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ width: { xs: '100%', sm: 'inherit' } }}
          >
            <Button
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:download-bold" />}
              sx={{ px: 4 }}
            >
              {t('ux.syllabus.cta.download')}
            </Button>
            <Button variant="contained" size="large" sx={{ px: 4 }}>
              {t('ux.syllabus.cta.register')}
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={4}>
          {MODULES.map((module) => (
            <ModuleCard key={module.title} module={module} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ModuleCardProps = CardProps & {
  module: (typeof MODULES)[number];
};

const ModuleCard = ({ module, sx, ...other }: ModuleCardProps) => {
  const { t } = useTranslate('programs');

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Image
          alt={`${t(module.title)} illustration`}
          src={module.illustrationUrl}
          ratio="1/1"
          sx={{ borderRadius: 2, maxWidth: { xs: '100%', sm: '160px' } }}
        />
        <Stack spacing={1.5}>
          <Typography variant="h6">{t(module.title)}</Typography>
          <Stack spacing={2} direction="row" flexWrap="wrap">
            {module.skills.map((skill) => (
              <Chip key={skill} label={t(skill)} variant="outlined" />
            ))}
          </Stack>
          <Typography variant="body1">{t(module.description)}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
