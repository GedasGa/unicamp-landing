import { useRef, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import { RADIUS, varAlpha } from 'src/theme/styles';

import { NavUl } from 'src/components/nav-section';

import { NavList } from './nav-desktop-list';
import { TAB_EASING, TAB_HEIGHT, TAB_DURATION, TAB_BAR_PADDING } from './nav-desktop-tabs';

import type { NavMainProps } from '../types';

// ----------------------------------------------------------------------

export function NavDesktop({ data, sx }: NavMainProps) {
  const pathname = usePathname();

  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  /**
   * Put the pill on a tab. Measured against the bar, so it does not depend on
   * how the items are nested. `animate: false` snaps it into place (first
   * paint, resize) instead of sliding from wherever it was.
   */
  const movePill = useCallback((tab: HTMLElement | null, animate = true) => {
    const bar = barRef.current;
    const pill = pillRef.current;

    if (!bar || !pill) return;

    if (!animate) {
      pill.style.transition = 'none';
    }

    if (tab) {
      const barRect = bar.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();

      pill.style.transform = `translateX(${tabRect.left - barRect.left}px)`;
      pill.style.width = `${tabRect.width}px`;
      pill.style.opacity = '1';
    } else {
      // Nothing to point at (a page that is not in the nav): keep the pill hidden.
      pill.style.opacity = '0';
    }

    if (!animate) {
      // Reading the layout forces a reflow, so the snap lands before
      // transitions come back and there is nothing left to animate from.
      pill.getBoundingClientRect();
      pill.style.transition = '';
    }
  }, []);

  const getActiveTab = useCallback(
    () => barRef.current?.querySelector<HTMLElement>('[data-nav-tab][data-active]') ?? null,
    []
  );

  const resetPill = useCallback(() => movePill(getActiveTab()), [getActiveTab, movePill]);

  // Follow the current page, and re-measure whenever the bar changes size
  // (window resize, a font finishing loading, a language with longer labels).
  useEffect(() => {
    const bar = barRef.current;

    if (!bar) return undefined;

    const snapToActive = () => movePill(getActiveTab(), false);

    snapToActive();

    const observer = new ResizeObserver(snapToActive);
    observer.observe(bar);

    return () => observer.disconnect();
  }, [getActiveTab, movePill, pathname]);

  const handlePointTo = (event: React.SyntheticEvent) => {
    const tab = (event.target as HTMLElement).closest<HTMLElement>('[data-nav-tab]');

    if (tab) {
      movePill(tab);
    }
  };

  return (
    <Box
      component="nav"
      ref={barRef}
      onMouseOver={handlePointTo}
      onMouseLeave={resetPill}
      onFocus={handlePointTo}
      onBlur={resetPill}
      sx={[
        (theme) => ({
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          p: `${TAB_BAR_PADDING}px`,
          borderRadius: RADIUS.pill,
          // A tint of its own, so the white pill reads on any page behind the header.
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* The pill sits under the labels; JS writes its position and width. */}
      <Box
        component="span"
        ref={pillRef}
        aria-hidden
        sx={(theme) => ({
          position: 'absolute',
          top: `${TAB_BAR_PADDING}px`,
          left: 0,
          zIndex: 0,
          width: 0,
          opacity: 0,
          height: TAB_HEIGHT,
          borderRadius: RADIUS.pill,
          bgcolor: 'background.paper',
          boxShadow: theme.customShadows.z1,
          pointerEvents: 'none',
          willChange: 'transform, width',
          transition: `transform ${TAB_DURATION} ${TAB_EASING}, width ${TAB_DURATION} ${TAB_EASING}, opacity ${TAB_DURATION} ${TAB_EASING}`,
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        })}
      />

      <NavUl
        sx={{
          gap: 0.5,
          zIndex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {data.map((list) => (
          <NavList key={list.title} data={list} />
        ))}
      </NavUl>
    </Box>
  );
}
