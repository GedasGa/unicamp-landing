'use client';

import posthog from 'posthog-js';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PostHogProvider } from 'posthog-js/react';

type Props = {
  children: React.ReactNode;
};

export function CSPostHogProvider({ children }: Props) {
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);

  const isAppRoute = pathname?.startsWith('/app') 

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname && !pathname.startsWith('/api')) {
      if (!isInitialized) {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || '',
          person_profiles: 'identified_only',
          // Use cookie-less mode for public routes
          persistence: isAppRoute ? 'localStorage+cookie' : 'memory',
          disable_session_recording: !isAppRoute,
        });
        setIsInitialized(true);
      }
    }
  }, [pathname, isAppRoute, isInitialized]);

  if (!isInitialized || pathname?.startsWith('/api')) {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
