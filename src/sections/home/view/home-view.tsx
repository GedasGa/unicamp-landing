'use client';

import Stack from '@mui/material/Stack';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeMinimal } from '../home-minimal';
import { HomeHugePackElements } from '../home-hugepack-elements';
import { HomeAdvertisement } from '../home-advertisement';
import { HomePricing } from '../home-pricing';

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
        <HomeMinimal />
        <HomePricing />
        <HomeFAQs />
        <HomeAdvertisement />
      </Stack>
    </>
  );
}
