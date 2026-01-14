'use client';

import { useEffect } from 'react';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${CONFIG.appName}` : CONFIG.appName;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
