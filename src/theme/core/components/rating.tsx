import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { Theme, Components } from '@mui/material/styles';

import { ratingClasses } from '@mui/material/Rating';
import SvgIcon, { svgIconClasses } from '@mui/material/SvgIcon';

import { varAlpha } from '../../styles';

// ----------------------------------------------------------------------

/**
 * Icons
 *
 * Iconoir `star` and `star-solid`, inlined rather than fetched through Iconify:
 * a rating draws five of these, and they should not wait on a network request.
 * The two share one outline; only the fill differs.
 */
const STAR_PATH =
  'm8.587 8.236l2.598-5.232a.911.911 0 0 1 1.63 0l2.598 5.232l5.808.844a.902.902 0 0 1 .503 1.542l-4.202 4.07l.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75l-4.202-4.07a.902.902 0 0 1 .503-1.54z';

export const RatingIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path
      d={STAR_PATH}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);

export const RatingIconEmpty = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <path
      d={STAR_PATH}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);

// ----------------------------------------------------------------------

const MuiRating: Components<Theme>['MuiRating'] = {
  /** **************************************
   * DEFAULT PROPS
   *************************************** */
  defaultProps: { emptyIcon: <RatingIconEmpty />, icon: <RatingIcon /> },

  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: { [`&.${ratingClasses.disabled}`]: { opacity: 0.48 } },
    // Neutral stars: MUI's default amber is the only warm accent left on the page.
    iconFilled: ({ theme }) => ({ color: theme.vars.palette.text.primary }),
    iconEmpty: ({ theme }) => ({ color: varAlpha(theme.vars.palette.grey['500Channel'], 0.48) }),
    sizeSmall: { [`& .${svgIconClasses.root}`]: { width: 20, height: 20 } },
    sizeMedium: { [`& .${svgIconClasses.root}`]: { width: 24, height: 24 } },
    sizeLarge: { [`& .${svgIconClasses.root}`]: { width: 28, height: 28 } },
  },
};

// ----------------------------------------------------------------------

export const rating = { MuiRating };
