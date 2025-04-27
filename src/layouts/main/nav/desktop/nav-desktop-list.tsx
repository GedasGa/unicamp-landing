import { useRef, useState, useEffect, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';
import { isExternalLink, removeLastSlash } from 'src/routes/utils';

import { paper } from 'src/theme/styles';

import { NavLi, navSectionClasses, NavUl } from 'src/components/nav-section';

import { NavItem } from './nav-desktop-item';

import type { NavListProps } from '../types';
import Popover from '@mui/material/Popover';
import { Paper } from '@mui/material';
import { useTranslate } from '../../../../locales';

// ----------------------------------------------------------------------

export function NavList({ data }: NavListProps) {
  const theme = useTheme();
  const pathname = usePathname();
  const { t } = useTranslate('nav');
  const active = useActiveLink(data.path, !!data.children);

  const navItemRef = useRef<HTMLButtonElement | null>(null);

  const [openMenu, setOpenMenu] = useState(false);
  const [clientRect, setClientRect] = useState<Record<string, number>>({ top: 0, height: 0 });

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu(true);
    }
  }, [data.children]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const renderNavItem = (
    <NavItem
      ref={navItemRef}
      // slots
      title={t(data.title)}
      path={data.path}
      // state
      active={active}
      hasChild={!!data.children}
      open={data.children && !!openMenu}
      externalLink={isExternalLink(data.path)}
      // action
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleCloseMenu}
    />
  );

  const handleGetClientRect = useCallback(() => {
    const element = navItemRef.current;

    if (element) {
      const rect = element.getBoundingClientRect();
      setClientRect({ top: rect.top, height: rect.height });
    }
  }, []);

  useEffect(() => {
    handleGetClientRect();

    window.addEventListener('scroll', handleGetClientRect);

    return () => {
      window.removeEventListener('scroll', handleGetClientRect);
    };
  }, [handleGetClientRect]);

  const depth = 2;

  if (data.children) {
    return (
      <NavLi sx={{ height: 1 }}>
        {renderNavItem}

        <Popover
          disableScrollLock
          open={openMenu}
          anchorEl={navItemRef.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          slotProps={{
            paper: {
              onMouseEnter: handleOpenMenu,
              onMouseLeave: handleCloseMenu,
              sx: {
                px: 0.75,
                ml: -0.75,
                boxShadow: 'none',
                overflow: 'unset',
                backdropFilter: 'none',
                background: 'transparent',
                ...(openMenu && { pointerEvents: 'auto' }),
              },
            },
          }}
          sx={{ pointerEvents: 'none' }}
        >
          <Paper
            className={navSectionClasses.paper}
            sx={{ minWidth: 180, ...paper({ theme, isBlur: false, dropdown: true }) }}
          >
            <NavUl sx={{ gap: 1, width: 1, flexWrap: 'wrap', flexDirection: 'column' }}>
              {data.children.map((child) => (
                <NavLi key={child.title} sx={{ my: 1, mx: 2 }}>
                  <NavItem
                    subItem
                    title={t(child.title)}
                    path={child.path}
                    active={child.path === removeLastSlash(pathname)}
                  />
                </NavLi>
              ))}
            </NavUl>
          </Paper>
        </Popover>
      </NavLi>
    );
  }

  return <NavLi sx={{ height: 1 }}>{renderNavItem}</NavLi>;
}
