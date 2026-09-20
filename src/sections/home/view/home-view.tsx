'use client';

import Stack from '@mui/material/Stack';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeTeam } from '../home-team';
import { HomeTools } from '../home-tools';
import { HomeFeatures } from '../home-features';
import { HomePrograms } from '../home-programs';
import { HomeCompanies } from '../home-companies';
import { HomeTestimonials } from '../home-testimonials';

// ----------------------------------------------------------------------

export function HomeView() {
  return (
    <>
      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <HomeCompanies />
        <HomeTools />
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
