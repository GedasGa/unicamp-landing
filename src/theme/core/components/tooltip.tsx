import type { Theme, Components } from '@mui/material/styles';

import { tooltipClasses } from '@mui/material/Tooltip';

import { stylesMode } from '../../styles';

// ----------------------------------------------------------------------

const MuiTooltip: Components<Theme>['MuiTooltip'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    tooltip: ({ theme }) => ({
      backgroundColor: theme.vars.palette.grey[800],
      [stylesMode.dark]: {
        backgroundColor: theme.vars.palette.grey[700],
      },
    }),
    // Tooltips are shown without the pointer triangle.
    arrow: {
      display: 'none',
    },
    popper: {
      [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
        marginTop: 8,
      },
      [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
        marginBottom: 8,
      },
      [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
        marginLeft: 8,
      },
      [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
        marginRight: 8,
      },
    },
  },
};

// ----------------------------------------------------------------------

export const tooltip = { MuiTooltip };
