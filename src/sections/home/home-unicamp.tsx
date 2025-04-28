import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatTriangleDownIcon } from './components/svg-elements';
import { useTranslate } from '../../locales';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export function HomeUnicamp({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');

  const renderDescription = (
    <SectionTitle
      title={t('unicamp.title')}
      description={t('unicamp.description')}
      sx={{ textAlign: 'center' }}
    />
  );

  const renderContent = (
    <Stack
      spacing={5}
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      sx={{
        mt: 8,
        mx: 'auto',
        mb: { xs: 5, md: 8 },
      }}
    >
      <Stack spacing={1} alignItems={'center'}>
        <Icon icon="material-symbols:military-tech-outline" width={32} />
        <Typography variant="subtitle1">{t('unicamp.reasons.qualityCourses')}</Typography>
      </Stack>
      <Stack spacing={1} alignItems={'center'}>
        <Icon icon="material-symbols:savings-outline" width={32} />
        <Typography variant="subtitle1">{t('unicamp.reasons.getScholarships')}</Typography>
      </Stack>
      <Stack spacing={1} alignItems={'center'}>
        <Icon icon="material-symbols:globe" width={32} />
        <Typography variant="subtitle1">{t('unicamp.reasons.realProjects')}</Typography>
      </Stack>
      <Stack spacing={1} alignItems={'center'}>
        <Icon icon="material-symbols:developer-guide-outline-rounded" width={32} />
        <Stack direction="row" spacing={1}>
          <Icon icon="material-symbols:new-releases" width={20} />
          <Typography variant="subtitle1">{t('unicamp.reasons.certificate')}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <MotionViewport sx={{ pt: 10, position: 'relative' }}>
        <Container>
          {renderDescription}
          {renderContent}
        </Container>
      </MotionViewport>
    </Box>
  );
}
