import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { useTranslate } from '../../locales';
import { Iconify } from '../../components/iconify';

// ----------------------------------------------------------------------

const FEATURES = [
  {
    illustration: `${CONFIG.assetsDir}/assets/illustrations/illustration-real-projects.png`,
    title: 'features.sections.realProjects.heading',
    items: [
      {
        icon: 'material-symbols:globe',
        title: 'features.sections.realProjects.items.0.title',
        description: 'features.sections.realProjects.items.0.description',
      },
      {
        icon: `material-symbols:graphic-eq-rounded`,
        title: 'features.sections.realProjects.items.1.title',
        description: 'features.sections.realProjects.items.1.description',
      },
      {
        icon: `material-symbols:kid-star-outline`,
        title: 'features.sections.realProjects.items.2.title',
        description: 'features.sections.realProjects.items.2.description',
      },
    ],
  },
  {
    illustration: `${CONFIG.assetsDir}/assets/illustrations/illustration-team-work.png`,
    title: 'features.sections.teamWork.heading',
    items: [
      {
        icon: `material-symbols:emoji-objects-outline`,
        title: 'features.sections.teamWork.items.0.title',
        description: 'features.sections.teamWork.items.0.description',
      },
      {
        icon: `material-symbols:workspaces-outline`,
        title: 'features.sections.teamWork.items.1.title',
        description: 'features.sections.teamWork.items.1.description',
      },
      {
        icon: `material-symbols:rocket-launch-outline`,
        title: 'features.sections.teamWork.items.2.title',
        description: 'features.sections.teamWork.items.2.description',
      },
    ],
  },
  {
    illustration: `${CONFIG.assetsDir}/assets/illustrations/illustration-1-on-1.png`,
    title: 'features.sections.1on1.heading',
    items: [
      {
        icon: `material-symbols:communication`,
        title: 'features.sections.1on1.items.0.title',
        description: 'features.sections.1on1.items.0.description',
      },
      {
        icon: `material-symbols:chat-bubble-outline`,
        title: 'features.sections.1on1.items.1.title',
        description: 'features.sections.1on1.items.1.description',
      },
    ],
  },
];

// ----------------------------------------------------------------------

interface HomeFeaturesProps extends BoxProps {}

export function HomeFeatures({ sx, ...other }: HomeFeaturesProps) {
  const { t } = useTranslate('home');

  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        pt: { xs: 10, md: 20 },
        ...sx,
      }}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative' }}>
          {FEATURES.map((feature, index) => {
            const isEven = index % 2 === 0;
            return (
              <Grid
                container
                key={feature.title}
                columnSpacing={{ xs: 0, md: 8 }}
                sx={{ position: 'relative', zIndex: 9, mb: { xs: 10, md: 20 } }}
              >
                <Grid xs={12} md={6} lg={7} order={{ xs: 1, md: isEven ? 1 : 2 }}>
                  <SectionTitle
                    caption={t('features.caption')}
                    title={t(feature.title)}
                    sx={{
                      mb: { xs: 5, md: 8 },
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  />
                  <Stack spacing={6}>
                    {feature.items.map((item) => (
                      <Box
                        component={m.div}
                        key={item.title}
                        variants={varFade({ distance: 24 }).inUp}
                        display="flex"
                        gap={3}
                      >
                        <Iconify icon={item.icon} width={40} />
                        <Stack spacing={1}>
                          <Typography variant="h5" component="h6">
                            {t(item.title)}
                          </Typography>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {t(item.description)}
                          </Typography>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                  lg={5}
                  order={{ xs: 2, md: isEven ? 2 : 1 }}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Stack
                    component={m.div}
                    variants={
                      isEven ? varFade({ distance: 24 }).inRight : varFade({ distance: 24 }).inLeft
                    }
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: '100%', maxWidth: 720, position: 'relative' }}
                  >
                    <Box
                      component="img"
                      alt={t(feature.title)}
                      src={feature.illustration}
                      sx={{ width: '100%' }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            );
          })}
        </Container>
      </MotionViewport>
    </Box>
  );
}
