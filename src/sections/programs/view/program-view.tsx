'use client';

import posthog from 'posthog-js';
import { useState, useCallback } from 'react';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { ProgramHero } from '../program-hero';
import { HomeFAQs } from '../../home/home-faqs';
import { ProgramBanner } from '../program-banner';
import { ProgramMentor } from '../program-mentor';
import { ProgramPricing } from '../program-pricing';
import { ProgramFeatures } from '../program-features';
import { ProgramSyllabus } from '../program-syllabus';
import { ProgramNextGroups } from '../program-next-groups';
import { ProgramCertificate } from '../program-certificate';
import { ApplyToProgram } from '../../cta/apply-to-program';
import { ProgramExpectations } from '../program-expectations';

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
