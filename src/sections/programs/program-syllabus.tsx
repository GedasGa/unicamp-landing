import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { useTranslate } from '../../locales';
import { Chip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Card, { type CardProps } from '@mui/material/Card';
import { Image } from '../../components/image';
import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

const MODULES = {
  productDesign: [
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-foundation.png`,
      title: 'modules.0.title',
      description: 'modules.0.description',
      skills: ['modules.0.skills.0', 'modules.0.skills.1'],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-seamless-experiences.png`,
      title: 'modules.1.title',
      description: 'modules.1.description',
      skills: ['modules.1.skills.0', 'modules.1.skills.1', 'modules.1.skills.2'],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-visual-language.png`,
      title: 'modules.2.title',
      description: 'modules.2.description',
      skills: ['modules.2.skills.0', 'modules.2.skills.1', 'modules.2.skills.2'],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-from-concept-to-creation.png`,
      title: 'modules.3.title',
      description: 'modules.3.description',
      skills: ['modules.3.skills.0', 'modules.3.skills.1'],
    },
  ],
  webDevelopment: [
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-foundation.png`,
      title: 'modules.0.title',
      description: 'modules.0.description',
      skills: [
        'modules.0.skills.0',
        'modules.0.skills.1',
        'modules.0.skills.2',
        'modules.0.skills.3',
      ],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-seamless-experiences.png`,
      title: 'modules.1.title',
      description: 'modules.1.description',
      skills: [
        'modules.1.skills.0',
        'modules.1.skills.1',
        'modules.1.skills.2',
        'modules.1.skills.3',
      ],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-visual-language.png`,
      title: 'modules.2.title',
      description: 'modules.2.description',
      skills: [
        'modules.2.skills.0',
        'modules.2.skills.1',
        'modules.2.skills.2',
        'modules.2.skills.3',
      ],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/fe-course/fe-accessibility.png`,
      title: 'modules.3.title',
      description: 'modules.3.description',
      skills: ['modules.3.skills.0', 'modules.3.skills.1'],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/fe-course/fe-blank.png`,
      title: 'modules.4.title',
      description: 'modules.4.description',
      skills: [
        'modules.4.skills.0',
        'modules.4.skills.1',
        'modules.4.skills.2',
        'modules.4.skills.3',
      ],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/fe-course/fe-blank.png`,
      title: 'modules.5.title',
      description: 'modules.5.description',
      skills: [
        'modules.5.skills.0',
        'modules.5.skills.1',
        'modules.5.skills.2',
        'modules.5.skills.3',
      ],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/fe-course/fe-blank.png`,
      title: 'modules.6.title',
      description: 'modules.6.description',
      skills: [
        'modules.6.skills.0',
        'modules.6.skills.1',
        'modules.6.skills.2',
        'modules.6.skills.3',
      ],
    },

    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/fe-course/fe-blank.png`,
      title: 'modules.7.title',
      description: 'modules.7.description',
      skills: [
        'modules.7.skills.0',
        'modules.7.skills.1',
        'modules.7.skills.2',
        'modules.7.skills.3',
      ],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/fe-course/fe-blank.png`,
      title: 'modules.8.title',
      description: 'modules.8.description',
      skills: [
        'modules.8.skills.0',
        'modules.8.skills.1',
        'modules.8.skills.2',
        'modules.8.skills.3',
      ],
    },
    {
      illustrationUrl: `${CONFIG.assetsDir}/assets/illustrations/ux-course/ux-from-concept-to-creation.png`,
      title: 'modules.9.title',
      description: 'modules.9.description',
      skills: [
        'modules.9.skills.0',
        'modules.9.skills.1',
        'modules.9.skills.2',
        'modules.9.skills.3',
      ],
    },
  ],
};

// ----------------------------------------------------------------------
interface ProgramSyllabusProps extends BoxProps {
  programId: string;
}

export function ProgramSyllabus({ programId, sx, ...other }: ProgramSyllabusProps) {
  const { t } = useTranslate(programId);

  return (
    <Box
      component="section"
      sx={{ py: { xs: 4, md: 20 }, px: { xs: 2, md: 15 }, backgroundColor: 'grey.100', ...sx }}
      {...other}
    >
      <Stack spacing={{ xs: 2, md: 7 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h1">{t('syllabus.title')}</Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ width: { xs: '100%', sm: 'inherit' } }}
          >
            {/* TODO: Re-enable once ready*/}
            {/*<Button*/}
            {/*  variant="outlined"*/}
            {/*  size="large"*/}
            {/*  startIcon={<Iconify icon="solar:download-bold" />}*/}
            {/*  sx={{ px: 4 }}*/}
            {/*>*/}
            {/*  {t('syllabus.cta.download')}*/}
            {/*</Button>*/}
            {/*<Button variant="contained" size="large" sx={{ px: 4 }}>*/}
            {/*  {t('syllabus.cta.register')}*/}
            {/*</Button>*/}
          </Stack>
        </Stack>
        <Stack spacing={4}>
          {/* @ts-ignore */}
          {MODULES[programId].map((module) => (
            <ModuleCard key={module.title} module={module} programId={programId} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ModuleCardProps = CardProps & {
  module: (typeof MODULES)[keyof typeof MODULES][number];
  programId: string;
};

const ModuleCard = ({ module, programId, sx, ...other }: ModuleCardProps) => {
  const { t } = useTranslate(programId);

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Image
          alt={`${t(module.title)} illustration`}
          src={module.illustrationUrl}
          ratio="1/1"
          sx={{ borderRadius: 2, maxWidth: { xs: '100%', md: '160px' } }}
          flex={1}
        />
        <Stack spacing={1.5} flex={4}>
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
