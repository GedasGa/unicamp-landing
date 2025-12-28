'use client';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { TermsOfServiceText } from '../terms-of-service-text';

// ----------------------------------------------------------------------

export function TermsOfServiceView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <TermsOfServiceText />
    </>
  );
}
