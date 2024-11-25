import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { SvgColor } from 'src/components/svg-color';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { CircleSvg, FloatLine, FloatPlusIcon } from './components/svg-elements';
import { useTranslate } from '../../locales';
import { Iconify } from '../../components/iconify';

// ----------------------------------------------------------------------

interface HomeContactProps extends BoxProps {}

export function HomeContact({ sx, ...other }: HomeContactProps) {
  const { t } = useTranslate('home');

  return (
    <Box
      id="contact"
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        my: { xs: 10, md: 20 },
        ...sx,
      }}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative' }}>
          <Grid
            container
            columnSpacing={{ xs: 0, md: 8 }}
            sx={{ position: 'relative', zIndex: 9, mb: { xs: 10, md: 20 } }}
          >
            <Grid xs={12} md={6} lg={7} order={{ xs: 1 }}>
              <SectionTitle
                caption={t('features.caption')}
                title={t('feature.title')}
                sx={{
                  mb: { xs: 5, md: 8 },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={5}
              order={{ xs: 2 }}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ width: '100%', maxWidth: 720, position: 'relative' }}
              >
                Or make it quick
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>
    </Box>
  );
}
