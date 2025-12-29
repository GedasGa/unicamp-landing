'use client';

import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import LinearProgress from '@mui/material/LinearProgress';

import { Logo } from 'src/components/logo';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  portal?: boolean;
};

export function SplashScreen({ portal = true, sx, ...other }: Props) {
  const content = (
    <Box sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          right: 0,
          width: 1,
          bottom: 0,
          height: 1,
          zIndex: 9998,
          display: 'flex',
          position: 'fixed',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          ...sx,
        }}
        {...other}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Logo 
              disableLink 
              onlyLogo={false}
              width={240} 
              height={72}
            />
          </m.div>
          
          <Box sx={{ width: 240 }}>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <LinearProgress 
                color="primary"
                sx={{
                  height: 2,
                  borderRadius: 1,
                }}
              />
            </m.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  if (portal) {
    return <Portal>{content}</Portal>;
  }

  return content;
}

