'use client';

import type { IPostItem } from 'src/types/blog';

import Stack from '@mui/material/Stack';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../home-faqs';
import { HomeBlog } from '../home-blog';
import { HomeTeam } from '../home-team';
import { HomeTools } from '../home-tools';
import { HomeFeatures } from '../home-features';
import { HomePrograms } from '../home-programs';
import { HomeCompanies } from '../home-companies';
import { HomeTestimonials } from '../home-testimonials';

// ----------------------------------------------------------------------

type Props = {
  /** Latest articles, newest first. */
  posts: IPostItem[];
};

export function HomeView({ posts }: Props) {
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
        <HomeBlog posts={posts} />
        {/* <HomeContact /> */}
        <HomeFAQs />
      </Stack>
    </>
  );
}
