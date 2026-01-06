'use client';

import Stack from '@mui/material/Stack';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeTeam } from '../home-team';
import { HomeUnicamp } from '../home-unicamp';
import { HomeFeatures } from '../home-features';
import { HomePrograms } from '../home-programs';
import { HomeCompanies } from '../home-companies';
import { HomeTestimonials } from '../home-testimonials';

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
        <HomeCompanies />
        <HomeUnicamp />
        <HomeFeatures />
        <HomePrograms id="courses" />
        <HomeTestimonials />
        <HomeTeam />
        {/* <HomeContact /> */}
        <HomeFAQs />
      </Stack>
    </>
  );
}
