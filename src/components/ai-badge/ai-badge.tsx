import type { BoxProps } from '@mui/material/Box';

import { useId } from 'react';
import { m, useReducedMotion } from 'framer-motion';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha as hexAlpha } from '@mui/material/styles';

import { BRAND, RADIUS } from 'src/theme/styles';

// ----------------------------------------------------------------------

/** A four-point sparkle, drawn from its centre so it can scale in place. */
function sparkle(cx: number, cy: number, r: number) {
  const waist = r * 0.26;

  return [
    `M${cx} ${cy - r}`,
    `C${cx} ${cy - waist} ${cx + waist} ${cy} ${cx + r} ${cy}`,
    `C${cx + waist} ${cy} ${cx} ${cy + waist} ${cx} ${cy + r}`,
    `C${cx} ${cy + waist} ${cx - waist} ${cy} ${cx - r} ${cy}`,
    `C${cx - waist} ${cy} ${cx} ${cy - waist} ${cx} ${cy - r}`,
    'Z',
  ].join('');
}

// One large sparkle with two smaller ones twinkling out of step with it.
const SPARKLES = [
  { d: sparkle(9, 13, 7), delay: 0 },
  { d: sparkle(18, 6, 4), delay: 0.7 },
  { d: sparkle(19, 17, 2.6), delay: 1.4 },
];

type AiBadgeProps = BoxProps & {
  label: string;
};

/** The "built with AI tools" pill: quiet chip, brand-gradient sparkles that twinkle. */
export function AiBadge({ label, sx, ...other }: AiBadgeProps) {
  const reduceMotion = useReducedMotion();

  // Scoped so several badges on one page cannot share a gradient definition.
  const gradientId = useId();

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        gap: 1,
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: RADIUS.pill,
        bgcolor: 'background.paper',
        border: `1px solid ${hexAlpha(BRAND.pink, 0.16)}`,
        boxShadow: (theme) => theme.customShadows.card,
        // A whisper of the brand gradient over the card surface.
        backgroundImage: `linear-gradient(90deg, ${hexAlpha(BRAND.pink, 0.06)}, ${hexAlpha(
          BRAND.orange,
          0.06
        )})`,
        ...sx,
      }}
      {...other}
    >
      <Box
        component="svg"
        viewBox="0 0 24 24"
        aria-hidden
        sx={{ width: 20, height: 20, flexShrink: 0, display: 'block' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={BRAND.pink} />
            <stop offset="100%" stopColor={BRAND.orange} />
          </linearGradient>
        </defs>

        {SPARKLES.map((spark) => (
          <m.path
            key={spark.d}
            d={spark.d}
            fill={`url(#${gradientId})`}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            {...(reduceMotion
              ? {}
              : {
                  animate: { scale: [1, 0.55, 1], opacity: [1, 0.45, 1] },
                  transition: {
                    duration: 2.6,
                    delay: spark.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                })}
          />
        ))}
      </Box>

      <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Box>
  );
}
