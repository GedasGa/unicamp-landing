import type { BoxProps } from '@mui/material/Box';

import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

// A programme video replays this many times, then stays on its last frame
// until the page reloads, so it never loops at someone forever.
const MAX_PLAYS = 10;

type ProgramVideoProps = BoxProps & {
  src: string;
};

/**
 * The silent clip that shows what a programme produces. Used on the home page
 * cards and in each programme's hero, so both play and stop the same way.
 */
export function ProgramVideo({ src, sx, ...other }: ProgramVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const playCount = useRef(1);

  // Only start loading once the clip is close to the viewport.
  const inView = useInView(ref, { once: true, margin: '200px' });
  const reduceMotion = useReducedMotion();

  return (
    <Box
      ref={ref}
      sx={{ width: 1, height: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {inView && (
        <Box
          component="video"
          src={src}
          muted
          playsInline
          onEnded={(event: React.SyntheticEvent<HTMLVideoElement>) => {
            if (playCount.current >= MAX_PLAYS) return;
            playCount.current += 1;
            const player = event.currentTarget;
            player.currentTime = 0;
            player.play().catch(() => {});
          }}
          // With reduced motion, show the first frame without playing.
          autoPlay={!reduceMotion}
          preload={reduceMotion ? 'metadata' : 'auto'}
          aria-hidden
          // Show the whole clip (no cropping); the frame behind fills any leftover space.
          sx={{ width: 1, height: 1, objectFit: 'contain', ...sx }}
          {...other}
        />
      )}
    </Box>
  );
}
