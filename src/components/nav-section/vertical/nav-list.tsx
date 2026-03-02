import { useRef, useState, useEffect, useCallback } from 'react';

import { isExternalLink } from 'src/routes/utils';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import { NavItem } from './nav-item';
import { navSectionClasses } from '../classes';
import { NavUl, NavLi, NavCollapse } from '../styles';

import type { NavListProps, NavSubListProps } from '../types';

// ----------------------------------------------------------------------

export function NavList({ data, render, depth, slotProps, enabledRootRedirect }: NavListProps) {
  // Only use deep (prefix) matching for modules (depth 1 with children)
  const active = useActiveLink(data.path, depth === 1 && !!data.children);

  const [openMenu, setOpenMenu] = useState(active);

  // Keep a ref to onExpand callback so the effect always has the latest version
  const onExpandRef = useRef<(() => void) | undefined>((data as any).onExpand);
  onExpandRef.current = (data as any).onExpand;

  // Sync open state with active state (open when active, close when no longer active)
  useEffect(() => {
    setOpenMenu(active);
  }, [active]);

  // Fire onExpand callback when opened (for on-demand data fetching)
  useEffect(() => {
    if (openMenu) {
      onExpandRef.current?.();
    }
  }, [openMenu]);

  // Parent items: single click = toggle expand/collapse
  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  // All parent items render as div (expand only). Only leaf items render as RouterLink.
  const isLeafItem = !data.children;

  const renderNavItem = (
    <NavItem
      render={render}
      // slots
      path={data.path}
      icon={data.icon}
      info={data.info}
      title={data.title}
      caption={data.caption}
      // state
      depth={depth}
      active={active}
      disabled={data.disabled}
      hasChild={!!data.children}
      open={data.children && openMenu}
      externalLink={isExternalLink(data.path)}
      // Leaf items: RouterLink. Parent items: div (expand only, no navigation).
      enabledRootRedirect={isLeafItem ? enabledRootRedirect : false}
      // styles
      slotProps={depth === 1 ? slotProps?.rootItem : slotProps?.subItem}
      // Parent items: click toggles expand/collapse
      // Leaf items: default RouterLink click navigation
      onClick={data.children ? handleToggleMenu : undefined}
    />
  );

  // Hidden item by role
  if (data.roles && slotProps?.currentRole) {
    if (!data?.roles?.includes(slotProps?.currentRole)) {
      return null;
    }
  }

  // Has children
  if (data.children) {
    return (
      <NavLi
        disabled={data.disabled}
        sx={{
          [`& .${navSectionClasses.li}`]: {
            '&:first-of-type': { mt: 'var(--nav-item-gap)' },
          },
        }}
      >
        {renderNavItem}

        <NavCollapse data-group={data.title} in={openMenu} depth={depth} unmountOnExit mountOnEnter>
          <NavSubList
            data={data.children}
            render={render}
            depth={depth}
            slotProps={slotProps}
            enabledRootRedirect={enabledRootRedirect}
          />
        </NavCollapse>
      </NavLi>
    );
  }

  // Default
  return <NavLi disabled={data.disabled}>{renderNavItem}</NavLi>;
}

// ----------------------------------------------------------------------

function NavSubList({ data, render, depth, slotProps, enabledRootRedirect }: NavSubListProps) {
  return (
    <NavUl sx={{ gap: 'var(--nav-item-gap)' }}>
      {data.map((list) => (
        <NavList
          key={list.title}
          data={list}
          render={render}
          depth={depth + 1}
          slotProps={slotProps}
          enabledRootRedirect={enabledRootRedirect}
        />
      ))}
    </NavUl>
  );
}
