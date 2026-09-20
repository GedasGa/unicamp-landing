import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { BRAND } from 'src/theme/styles';

// ----------------------------------------------------------------------

type BrandGlowProps = BoxProps & {
  /** How strongly the glow reads; the hero uses the default, quieter spots less. */
  intensity?: number;
};

/**
 * A soft blurred ellipse in the logo gradient, pink at the top fading to orange.
 * Sits behind content as decoration, so give the content `position: relative`.
 */
export function BrandGlow({ intensity = 0.24, sx, ...other }: BrandGlowProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: { xs: 340, sm: 520, md: 720 },
        height: { xs: 200, sm: 260, md: 320 },
        borderRadius: '50%',
        backgroundImage: `linear-gradient(180deg, ${BRAND.pink} 0%, ${BRAND.orange} 100%)`,
        opacity: intensity,
        filter: 'blur(80px)',
        pointerEvents: 'none',
        ...sx,
      }}
      {...other}
    />
  );
}
