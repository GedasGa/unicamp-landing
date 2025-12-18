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
import { useCallback, useState } from 'react';
import { ApplyToProgram } from '../../cta/apply-to-program';
import posthog from 'posthog-js';

// ----------------------------------------------------------------------

interface ProgramViewProps {
  programId: string;
}

export function ProgramView({ programId }: ProgramViewProps) {
  const pageProgress = useScrollProgress();

  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState<boolean>(false);

  const openApplyDialog = useCallback(() => {
    posthog.capture('program_apply_dialog_open', { programId });
    setIsApplyDialogOpen(true);
  }, []);

  const closeApplyDialog = useCallback(() => {
    posthog.capture('program_apply_dialog_close', { programId });
    setIsApplyDialogOpen(false);
  }, []);

  console.log('programId', programId);

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <ApplyToProgram open={isApplyDialogOpen} onClose={closeApplyDialog} />

      <ProgramHero programId={programId} openApplyDialog={openApplyDialog} />
      <ProgramFeatures programId={programId} />
      <ProgramCertificate programId={programId} />
      <ProgramBanner programId={programId} />
      <ProgramSyllabus programId={programId} />
      <ProgramExpectations programId={programId} openApplyDialog={openApplyDialog} />
      <ProgramMentor programId={programId} />
      <ProgramPricing programId={programId} />
      <ProgramNextGroups programId={programId} openApplyDialog={openApplyDialog} />
      <HomeFAQs />
    </>
  );
}
