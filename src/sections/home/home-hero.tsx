import type { MotionValue } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import { useRef, useState } from 'react';
import { m, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
import posthog from 'posthog-js';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionContainer } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const smKey = 'sm';
const mdKey = 'md';
const lgKey = 'lg';

export function HomeHero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');
  const theme = useTheme();
  const scroll = useScrollPercent();
  const mdUp = useResponsive('up', mdKey);

  const distance = mdUp ? scroll.percent : 0;

  const renderHeading = (
    <AnimatedDiv>
      <Box
        component="h1"
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        sx={{
          ...theme.typography.h2,
          mt: 10,
          mb: 0,
          fontFamily: theme.typography.fontSecondaryFamily,
          [theme.breakpoints.up(lgKey)]: { fontSize: 72, lineHeight: '90px' },
        }}
      >
        <Box component="span">{t('hero.heading.firstLine')}</Box>
        <Box component="span">{t('hero.heading.secondLine')}</Box>
      </Box>
    </AnimatedDiv>
  );

  const renderViewCoursesButton = (
    <AnimatedDiv>
      <Typography variant={'subtitle2'} gutterBottom>
        {t('hero.cta.viewCourses.description')}
      </Typography>
      <Button
        size="large"
        variant="contained"
        href="/#courses"
        onClick={() => posthog.capture('hero_cta_clicked')}
        endIcon={<Iconify icon="ic:round-arrow-downward" />}
        sx={{
          color: 'common.black',
          bgcolor: 'common.white',
          '&:hover': { bgcolor: 'grey.200' },
        }}
      >
        {t('hero.cta.viewCourses.buttonText')}
      </Button>
    </AnimatedDiv>
  );

  const renderFreeConsultation = (
    <Box display="flex" flexWrap="wrap" gap={{ xs: 1.5, md: 2 }}>
      <AnimatedDiv>
        <Typography variant={'subtitle2'} gutterBottom>
          {t('hero.cta.consultation.description')}
        </Typography>
        <Button
          color="inherit"
          size="large"
          variant="contained"
          target="_blank"
          href="https://calendly.com/gedas-gardauskas/15min"
          onClick={() => posthog.capture('hero_cta_clicked')}
          sx={{
            color: 'common.black',
            bgcolor: 'common.white',
            '&:hover': { bgcolor: 'grey.200' },
          }}
        >
          {t('hero.cta.consultation.buttonText')}
        </Button>
      </AnimatedDiv>
    </Box>
  );

  return (
    <Box
      ref={scroll.elementRef}
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: `url(${CONFIG.assetsDir}/assets/illustrations/illustration-hero.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        color: 'common.white',
        [theme.breakpoints.up(mdKey)]: {
          minHeight: 760,
          height: '80vh',
          maxHeight: 1280,
          display: 'block',
          willChange: 'opacity',
          pt: 'calc(var(--layout-header-desktop-height) * -1)',
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        component={m.div}
        sx={{
          width: 1,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: theme.transitions.create(['opacity']),
          [theme.breakpoints.up(mdKey)]: { height: 1, position: 'fixed', maxHeight: 'inherit' },
        }}
      >
        <Container
          component={MotionContainer}
          sx={{
            py: 3,
            gap: 5,
            zIndex: 9,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column-reverse',
            [theme.breakpoints.up(mdKey)]: {
              flexDirection: 'row',
              flex: '1 1 auto',
              justifyContent: 'start',
              alignItems: 'start',
              my: 'var(--layout-header-desktop-height)',
            },
          }}
        >
          <Stack spacing={3}>
            {renderHeading}
            {renderViewCoursesButton}
            {renderFreeConsultation}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function AnimatedDiv({ children, component = m.div }: BoxProps & { children: React.ReactNode }) {
  return (
    <Box component={component} variants={varFade({ distance: 24 }).inUp}>
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

function useTransformY(value: MotionValue<number>, distance: number) {
  const physics = {
    mass: 0.1,
    damping: 20,
    stiffness: 300,
    restDelta: 0.001,
  };

  return useSpring(useTransform(value, [0, 1], [0, distance]), physics);
}

function useScrollPercent() {
  const elementRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollY, 'change', (scrollHeight) => {
    let heroHeight = 0;

    if (elementRef.current) {
      heroHeight = elementRef.current.offsetHeight;
    }

    const scrollPercent = Math.floor((scrollHeight / heroHeight) * 100);

    if (scrollPercent >= 100) {
      setPercent(100);
    } else {
      setPercent(Math.floor(scrollPercent));
    }
  });

  return { elementRef, percent, scrollY };
}
