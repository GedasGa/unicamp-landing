import type { Theme, CSSObject } from '@mui/material/styles';

import { useMemo } from 'react';

import { styled } from '@mui/material/styles';

import { varAlpha, stylesMode } from 'src/theme/styles';

// ----------------------------------------------------------------------

export const StyledDivider = styled('span')(({ theme }) => ({
  width: 1,
  height: 10,
  flexShrink: 0,
  display: 'none',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  backgroundColor: 'currentColor',
  color: theme.vars.palette.divider,
  '&::before, &::after': {
    top: -5,
    width: 3,
    height: 3,
    content: '""',
    flexShrink: 0,
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'currentColor',
  },
  '&::after': { bottom: -5, top: 'auto' },
}));

// ----------------------------------------------------------------------

export function useNavColorVars(
  theme: Theme
): Record<'layout' | 'section', CSSObject> {
  const {
    vars: { palette },
  } = theme;

  return useMemo(() => ({
      layout: {
        '--layout-nav-bg': palette.background.default,
        '--layout-nav-horizontal-bg': varAlpha(palette.background.defaultChannel, 0.8),
        '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.12),
        '--layout-nav-text-primary-color': palette.text.primary,
        '--layout-nav-text-secondary-color': palette.text.secondary,
        '--layout-nav-text-disabled-color': palette.text.disabled,
        [stylesMode.dark]: {
          '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.08),
          '--layout-nav-horizontal-bg': varAlpha(palette.background.defaultChannel, 0.96),
        },
      },
      section: {},
    }), [
    palette.background.default,
    palette.background.defaultChannel,
    palette.grey,
    palette.text.disabled,
    palette.text.primary,
    palette.text.secondary,
  ]);
}
