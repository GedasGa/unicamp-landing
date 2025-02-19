'use client';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { ProgramHero } from '../program-hero';
import { ProgramCertificate } from '../program-certificate';
import { ProgramFeatures } from '../program-features';
import { ProgramBanner } from '../program-banner';

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

      {/*<Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>*/}
      {/*  <HomeUnicamp />*/}
      {/*  <HomeFeatures />*/}
      {/*  <HomeTeam />*/}
      {/*  <HomePrograms id="courses" />*/}
      {/*  /!*<HomeContact />*!/*/}
      {/*  <HomeFAQs />*/}
      {/*</Stack>*/}
    </>
  );
}
