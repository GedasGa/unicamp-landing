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
import { CONFIG } from '../../config-global';
import Paper from '@mui/material/Paper';
import { bgBlur, varAlpha } from '../../theme/styles';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function ProgramBanner({ sx, ...other }: BoxProps) {
  const theme = useTheme();
  const { t } = useTranslate('programs');

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        height: '800px', // Adjust as needed
        overflow: 'hidden',
        ...sx,
      }}
      {...other}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={`${CONFIG.assetsDir}/assets/background/ux-ui-designer-image.png`}
        alt="Background"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Ensures the image covers the container
        }}
      />

      {/* Text Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          ...bgBlur({
            color: varAlpha(theme.vars.palette.background.paperChannel, 0.09),
            blur: 10,
          }),
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          color: 'common.white',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h2">About the program</Typography>
          <Typography variant="body1">
            This program guides you through the key stages of UX/UI design, from user needs analysis
            to interactive prototypes. You'll gain both theoretical knowledge and practical skills
            to create modern design solutions, focusing on trends like dark mode, responsive design.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
