'use client';

import Stack from '@mui/material/Stack';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeFeatures } from '../home-features';
import { HomePrograms } from '../home-programs';
import { HomeTeam } from '../home-team';
import { HomeContact } from '../home-contact';
import { HomeUnicamp } from '../home-unicamp';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeUnicamp />
        <HomeFeatures />
        {/*<HomeTeam />*/}
        <HomePrograms id="courses" />
        {/*<HomeContact />*/}
        {/*<HomeFAQs />*/}
      </Stack>
    </>
  );
}
