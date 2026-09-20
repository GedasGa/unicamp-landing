import { forwardRef } from 'react';

import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { RADIUS } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { useNavItem } from 'src/components/nav-section/hooks';

import { TAB_EASING, TAB_HEIGHT, TAB_DURATION } from './nav-desktop-tabs';

import type { NavItemProps, NavItemStateProps } from '../types';

// ----------------------------------------------------------------------

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  ({ title, path, open, active, hasChild, externalLink, subItem, ...other }, ref) => {
    const navItem = useNavItem({ path, hasChild, externalLink });

    return (
      <StyledNavItem
        disableRipple
        ref={ref}
        aria-label={title}
        open={open}
        active={active}
        subItem={subItem}
        // The tab bar reads these to find and follow the tabs.
        {...(!subItem && { 'data-nav-tab': '', ...(active && { 'data-active': '' }) })}
        {...navItem.baseProps}
        {...other}
      >
        {title}

        {hasChild && <Iconify width={16} icon="iconmind:chevron-down-outline-thin" sx={{ ml: 0.75 }} />}
      </StyledNavItem>
    );
  }
);

// ----------------------------------------------------------------------

const StyledNavItem = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open' && prop !== 'subItem',
})<NavItemStateProps>(({ active, open, subItem, theme }) => {
  const rootItem = !subItem;

  const baseStyles = {
    item: {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightMedium,
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.shorter,
      }),
    },
  };

  return {
    /**
     * Root item — a tab in the sliding tab bar. The pill behind it is drawn by
     * NavDesktop, so the tab itself only animates its label colour.
     */
    ...(rootItem && {
      ...baseStyles.item,
      zIndex: 1,
      height: TAB_HEIGHT,
      padding: theme.spacing(0, 1.5),
      borderRadius: RADIUS.pill,
      whiteSpace: 'nowrap',
      color: theme.vars.palette.text.secondary,
      transition: `color ${TAB_DURATION} ${TAB_EASING}`,
      '&:hover': { color: theme.vars.palette.text.primary },
      // Weight only on the current page: an open menu must not change the
      // label's width, or the pill measured for it would no longer fit.
      ...(open && { color: theme.vars.palette.text.primary }),
      ...(active && {
        // Neutral accent: the current page is marked with weight, not colour.
        color: theme.vars.palette.text.primary,
        fontWeight: theme.typography.fontWeightBold,
      }),
    }),

    /**
     * Sub item
     */
    ...(subItem && {
      ...baseStyles.item,
      justifyContent: 'flex-start',
      color: theme.vars.palette.text.secondary,
      fontSize: theme.typography.pxToRem(13),
      '&:hover': { color: theme.vars.palette.text.primary },
      ...(active && {
        color: theme.vars.palette.text.primary,
        fontWeight: theme.typography.fontWeightBold,
      }),
    }),
  };
});
