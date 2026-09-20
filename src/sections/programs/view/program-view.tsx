'use client';

import posthog from 'posthog-js';
import { useState, useCallback } from 'react';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { ProgramHero } from '../program-hero';
import { HomeFAQs } from '../../home/home-faqs';
import { ProgramFacts } from '../program-facts';
import { ProgramMentor } from '../program-mentor';
import { ProgramFormat } from '../program-format';
import { ProgramPricing } from '../program-pricing';
import { ProgramSyllabus } from '../program-syllabus';
import { ProgramComparison } from '../program-comparison';
import { ProgramNextGroups } from '../program-next-groups';
import { ProgramCertificate } from '../program-certificate';
import { ApplyToProgram } from '../../cta/apply-to-program';
import { ProgramConsultation } from '../program-consultation';
import { ProgramRequirements } from '../program-requirements';
import { ProgramExpectations } from '../program-expectations';
import { HomeTestimonials } from '../../home/home-testimonials';

// ----------------------------------------------------------------------

// Reviews quoted in a programme's mentor block, so the carousel does not repeat them.
const MENTOR_REVIEW_INDEX: Record<string, number[]> = {
  productDesign: [2],
};

// Length, schedule, "can a beginner join" and the certificate all have their own section here.
const ANSWERED_ON_PAGE = [2, 3, 5, 6, 8];

interface ProgramViewProps {
  programId: string;
}

export function ProgramView({ programId }: ProgramViewProps) {
  const pageProgress = useScrollProgress();

  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState<boolean>(false);

  const openApplyDialog = useCallback(() => {
    posthog.capture('program_apply_dialog_open', { programId });
    setIsApplyDialogOpen(true);
  }, [programId]);

  const closeApplyDialog = useCallback(() => {
    posthog.capture('program_apply_dialog_close', { programId });
    setIsApplyDialogOpen(false);
  }, [programId]);

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <ApplyToProgram open={isApplyDialogOpen} onClose={closeApplyDialog} course={programId} />

      <ProgramHero programId={programId} openApplyDialog={openApplyDialog} />

      {/* The practical numbers and the proof in one band, while someone is still deciding. */}
      <ProgramFacts programId={programId} />

      <ProgramSyllabus programId={programId} />
      <ProgramRequirements programId={programId} />
      <ProgramFormat programId={programId} />
      <ProgramMentor programId={programId} />

      {/* The same reviews as the home page, minus the one already quoted by the mentor. */}
      <HomeTestimonials omit={MENTOR_REVIEW_INDEX[programId] ?? []} />

      {/* What you walk away with, told in one go rather than either side of the syllabus. */}
      <ProgramCertificate programId={programId} />
      <ProgramExpectations programId={programId} openApplyDialog={openApplyDialog} />

      {/* The case for the price, right before the price. */}
      <ProgramComparison />

      <ProgramPricing programId={programId} />

      {/* The same free-consultation offer as the home page, for anyone still undecided. */}
      <ProgramConsultation />
      <ProgramNextGroups programId={programId} openApplyDialog={openApplyDialog} />

      {/* Questions this page already answers in full are left out of the FAQ. */}
      <HomeFAQs omit={ANSWERED_ON_PAGE} />
    </>
  );
}
