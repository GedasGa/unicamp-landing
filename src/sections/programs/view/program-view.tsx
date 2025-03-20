'use client';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { ProgramHero } from '../program-hero';
import { ProgramCertificate } from '../program-certificate';
import { ProgramFeatures } from '../program-features';
import { ProgramBanner } from '../program-banner';
import { ProgramSyllabus } from '../program-syllabus';
import { ProgramExpectations } from '../program-expectations';
import { ProgramMentor } from '../program-mentor';
import { ProgramPricing } from '../program-pricing';

// ----------------------------------------------------------------------

export function ProgramView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <ProgramHero />
      <ProgramFeatures />
      <ProgramCertificate />
      <ProgramBanner />
      <ProgramSyllabus />
      <ProgramExpectations />
      <ProgramMentor />
      <ProgramPricing />
    </>
  );
}
