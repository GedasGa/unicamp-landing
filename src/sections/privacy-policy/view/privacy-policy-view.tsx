'use client';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { PrivacyPolicyText } from '../privacy-policy-text';

// ----------------------------------------------------------------------

export function PrivacyPolicyView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <PrivacyPolicyText />
    </>
  );
}
