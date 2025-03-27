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
import { ProgramNextGroups } from '../program-next-groups';
import { HomeFAQs } from '../../home/home-faqs';

// ----------------------------------------------------------------------

interface ProgramViewProps {
  programName: string;
}

export function ProgramView({ programName }: ProgramViewProps) {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <ProgramHero programName={programName} />
      <ProgramFeatures programName={programName} />
      <ProgramCertificate programName={programName} />
      <ProgramBanner programName={programName} />
      <ProgramSyllabus programName={programName} />
      <ProgramExpectations programName={programName} />
      <ProgramMentor programName={programName} />
      <ProgramPricing programName={programName} />
      <ProgramNextGroups programName={programName} />
      <HomeFAQs />
    </>
  );
}
