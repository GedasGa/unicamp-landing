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

export function ProgramFeatures({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('programs');

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <Container>
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
          <Stack alignItems={{ xs: 'flex-start', sm: 'center' }} flex={1}>
            <Typography variant="h4">104h</Typography>
            <Typography variant="caption">Course duration</Typography>
          </Stack>
          <Stack alignItems={{ xs: 'flex-start', sm: 'center' }} flex={1}>
            <Typography variant="h4">20</Typography>
            <Typography variant="caption">Group size</Typography>
          </Stack>
          <Stack alignItems={{ xs: 'flex-start', sm: 'center' }} flex={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h4" fontWeight="bold">
                1 <span></span>
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
      </Container>
    </Box>
  );
}
