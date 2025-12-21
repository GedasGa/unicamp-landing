import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  APP: '/app',
};

// ----------------------------------------------------------------------

export const paths = {
  lecturers: '#lecturers',
  privacyPolicy: '/privacy-policy',

  programs: {
    root: '/programs',
    ux: `/programs/ux`,
    fe: `/programs/fe`,
  },

  // FIXME: unused
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',

  blog: {
    root: `/blog`,
    details: (title: string) => `/blog/${paramCase(title)}`,
  },
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    verify: `${ROOTS.AUTH}/verify`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    updatePassword: `${ROOTS.AUTH}/update-password`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },

  // APP
  app: {
    root: ROOTS.APP,
    // Learning paths - using existing structure
    courses: {
      root: `${ROOTS.APP}/courses`,
      details: (id: string) => `${ROOTS.APP}/courses/${id}`,
      lesson: (courseId: string, moduleId: string, lessonId: string) => 
        `${ROOTS.APP}/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
    },
  },
};
