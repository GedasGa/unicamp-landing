import { useState, useCallback } from 'react';

import Collapse from '@mui/material/Collapse';

import { isExternalLink, removeLastSlash } from 'src/routes/utils';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import { NavLi, navSectionClasses, NavSectionVertical, NavUl } from 'src/components/nav-section';

import { NavItem } from './nav-mobile-item';

import type { NavListProps } from '../types';
import { useTranslate } from '../../../../locales';
import { usePathname } from '../../../../routes/hooks';

// ----------------------------------------------------------------------

export function NavList({ data }: NavListProps) {
  const pathname = usePathname();
  const { t } = useTranslate('nav');
  const active = useActiveLink(data.path, !!data.children);

  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  const renderNavItem = (
    <NavItem
      // slots
      path={data.path}
      icon={data.icon}
      title={t(data.title)}
      // state
      active={active}
      hasChild={!!data.children}
      open={data.children && !!openMenu}
      externalLink={isExternalLink(data.path)}
      // actions
      onClick={handleToggleMenu}
    />
  );

  if (data.children) {
    return (
      <NavLi>
        {renderNavItem}
        <Collapse in={openMenu}>
          <NavUl
            sx={{
              px: 1.5,
            }}
          >
            {data.children.map((child) => (
              <NavLi key={child.title} sx={{ my: 1 }}>
                <NavItem
                  subItem
                  title={t(child.title)}
                  path={child.path}
                  active={child.path === removeLastSlash(pathname)}
                />
              </NavLi>
            ))}
          </NavUl>
        </Collapse>
      </NavLi>
    );
  }

  return <NavLi>{renderNavItem}</NavLi>;
}
