'use client';

import { useState } from 'react';

import { HomeFAQs } from 'src/sections/home/home-faqs';
import { HomePrograms } from 'src/sections/home/home-programs';
import { ApplyToProgram } from 'src/sections/cta/apply-to-program';
import { ProgramFacts } from 'src/sections/programs/program-facts';
import { HomeTestimonials } from 'src/sections/home/home-testimonials';
import { ProgramNextGroups } from 'src/sections/programs/program-next-groups';

import { KursuokHero } from '../kursuok-hero';
import { KursuokEligibility } from '../kursuok-eligibility';

// ----------------------------------------------------------------------

export function KursuokView() {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  const openApplyDialog = () => setIsApplyDialogOpen(true);

  return (
    <>
      {/* No course preselected: visitors pick one of the two programs in the form. */}
      <ApplyToProgram open={isApplyDialogOpen} onClose={() => setIsApplyDialogOpen(false)} />

      <KursuokHero openApplyDialog={openApplyDialog} />

      {/* The program sections read their copy from a namespace, so the Kursuok page reuses them. */}
      <ProgramFacts programId="kursuok" />
      <HomePrograms id="courses" />
      <KursuokEligibility />
      <ProgramNextGroups programId="kursuok" openApplyDialog={openApplyDialog} />

      {/* These reviews were left on Kursuok.lt by funded participants. */}
      <HomeTestimonials />

      <HomeFAQs ns="kursuok" />
    </>
  );
}
