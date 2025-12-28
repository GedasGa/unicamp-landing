'use client';

import type { NavSectionProps } from 'src/components/nav-section';

import { createContext, useContext, useState, useMemo, useEffect, useRef } from 'react';

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
  const dataRef = useRef(data);

  // Update ref
  dataRef.current = data;

  // Set navigation data on mount and when data reference changes
  useEffect(() => {
    setNavData(dataRef.current);

    // Clear on unmount
    return () => {
      setNavData(null);
    };
  }, [data, setNavData]);
}
