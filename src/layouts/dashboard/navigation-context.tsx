'use client';

import type { NavSectionProps } from 'src/components/nav-section';

import { useMemo, useState, useEffect, useContext, createContext } from 'react';

import { applyLanguage } from 'src/components/google-translate-embed';

// ----------------------------------------------------------------------

type NavigationContextValue = {
  navData: NavSectionProps['data'] | null;
  setNavData: (data: NavSectionProps['data'] | null) => void;
};

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

// ----------------------------------------------------------------------

type NavigationProviderProps = {
  children: React.ReactNode;
};

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [navData, setNavData] = useState<NavSectionProps['data'] | null>(null);

  const value = useMemo(
    () => ({
      navData,
      setNavData,
    }),
    [navData]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}

// ----------------------------------------------------------------------

export function useNavigationContext() {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }

  return context;
}

// ----------------------------------------------------------------------

/**
 * Hook to set navigation data from pages
 * Clears navigation on unmount
 */
export function useSetNavigation(data: NavSectionProps['data'] | null) {
  const { setNavData } = useNavigationContext();

  // Update nav data whenever it changes (no cleanup between updates)
  useEffect(() => {
    setNavData(data);
    // Re-apply translation after new nav items are rendered — Google Translate only
    // runs once on page load, so dynamically added nav nodes need a nudge.
    if (data && data.length > 0 && /googtrans=\/en\/lt/.test(document.cookie)) {
      setTimeout(() => applyLanguage('lt'), 500);
    }
  }, [data, setNavData]);

  // Clear navigation only on actual unmount (page leaves)
  useEffect(
    () => () => {
      setNavData(null);
    },
    [setNavData]
  );
}
