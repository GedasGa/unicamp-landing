import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';

import { varAlpha } from 'src/theme/styles';

import { Logo } from '../logo';

// ----------------------------------------------------------------------

export type AnimateLogoProps = BoxProps & {
  logo?: React.ReactNode;
};

export function AnimateLogo({ logo, sx, ...other }: AnimateLogoProps) {
  return (
    <Box
      sx={{
        width: 120,
        height: 120,
        alignItems: 'center',
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <Box
        component={m.div}
        animate={{ scale: [1.4, 1, 1, 1.4, 1.4], opacity: [1, 0.48, 0.48, 1, 1] }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{ display: 'inline-flex' }}
      >
        {logo ?? <Logo disableLink width={64} height={64} />}
      </Box>

      <Box
        component={m.div}
        animate={{
          scale: [1.6, 1, 1, 1.6, 1.6],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['50%', '45%', '40%', '35%', '50%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{
          position: 'absolute',
          width: 'calc(100% - 20px)',
          height: 'calc(100% - 20px)',
          border: (theme) => `solid 3px ${varAlpha(theme.vars.palette.primary.darkChannel, 0.24)}`,
        }}
      />
    </Box>
  );
}
