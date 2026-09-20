import type { Theme, Components } from '@mui/material/styles';

import { accordionClasses } from '@mui/material/Accordion';
import { typographyClasses } from '@mui/material/Typography';
import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { RADIUS } from '../../styles';

// ----------------------------------------------------------------------

// Accordions are styled like the shared Card, so a list of them sits with the
// other cards on a page rather than looking like a different component.
const MuiAccordion: Components<Theme>['MuiAccordion'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => {
      const surface = {
        borderRadius: theme.shape.borderRadius * RADIUS.lg,
        boxShadow: theme.customShadows.card,
      };

      return {
        ...surface,
        backgroundColor: theme.vars.palette.background.paper,
        // The default divider between items; the cards have their own spacing.
        '&::before': { display: 'none' },
        '&:first-of-type, &:last-of-type': { borderRadius: surface.borderRadius },
        [`&.${accordionClasses.expanded}`]: { ...surface, margin: 0 },
        [`&.${accordionClasses.disabled}`]: { backgroundColor: 'transparent' },
      };
    },
  },
};

// ----------------------------------------------------------------------

const MuiAccordionSummary: Components<Theme>['MuiAccordionSummary'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      minHeight: 'auto',
      padding: theme.spacing(3, 2.5),
      [`& .${accordionSummaryClasses.content}`]: {
        margin: 0,
        [`&.${accordionSummaryClasses.expanded}`]: { margin: 0 },
      },
      [`&.${accordionSummaryClasses.disabled}`]: {
        opacity: 1,
        color: theme.vars.palette.action.disabled,
        [`& .${typographyClasses.root}`]: { color: 'inherit' },
      },
    }),
    expandIconWrapper: { color: 'inherit' },
  },
};

// ----------------------------------------------------------------------

const MuiAccordionDetails: Components<Theme>['MuiAccordionDetails'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({ padding: theme.spacing(0, 2.5, 3) }),
  },
};

// ----------------------------------------------------------------------

export const accordion = { MuiAccordion, MuiAccordionSummary, MuiAccordionDetails };
