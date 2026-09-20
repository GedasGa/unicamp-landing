import type { BoxProps } from '@mui/material/Box';

import { m, useReducedMotion } from 'framer-motion';

import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

// Heart shape, drawn in a 24x24 box.
const HEART =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

// Small hearts that float up from the main one: horizontal offset (px), size (px), delay (s).
const FLOATING_HEARTS = [
  { x: -4, size: 8, delay: 0.4 },
  { x: 10, size: 7, delay: 1.3 },
];

function Heart({ size }: { size: number }) {
  return (
    <Box component="svg" viewBox="0 0 24 24" sx={{ width: size, height: size, display: 'block' }}>
      <path fill="currentColor" d={HEART} />
    </Box>
  );
}

export type AnimateHeartsProps = BoxProps & {
  size?: number;
};

/**
 * A heart that gently beats, with little hearts floating up from it,
 * e.g. as a button start icon. Uses the surrounding text colour.
 */
export function AnimateHearts({ size = 20, sx, ...other }: AnimateHeartsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      aria-hidden
      sx={{
        position: 'relative',
        width: size,
        height: size,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <Box
        component={m.div}
        animate={reduceMotion ? undefined : { scale: [1, 1.18, 1, 1.12, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
      >
        <Heart size={size} />
      </Box>

      {!reduceMotion &&
        FLOATING_HEARTS.map((heart) => (
          <Box
            key={heart.x}
            component={m.div}
            animate={{ y: [0, -14], opacity: [0, 1, 0], scale: [0.6, 1, 0.8] }}
            transition={{ duration: 2, delay: heart.delay, repeat: Infinity, ease: 'easeOut' }}
            sx={{
              position: 'absolute',
              left: `calc(50% + ${heart.x}px)`,
              top: 0,
              ml: `${-heart.size / 2}px`,
              pointerEvents: 'none',
            }}
          >
            <Heart size={heart.size} />
          </Box>
        ))}
    </Box>
  );
}
