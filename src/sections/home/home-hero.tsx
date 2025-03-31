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

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { varFade, MotionContainer } from 'src/components/animate';

import { HeroBackground } from './components/hero-background';
import { useTranslate } from '../../locales';
import { paths } from '../../routes/paths';

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

  const y1 = useTransformY(scroll.scrollY, distance * -7);
  const y2 = useTransformY(scroll.scrollY, distance * -6);
  const y3 = useTransformY(scroll.scrollY, distance * -5);

  const opacity: MotionValue<number> = useTransform(
    scroll.scrollY,
    [0, 1],
    [1, mdUp ? Number((1 - scroll.percent / 100).toFixed(1)) : 1]
  );

  const renderHeading = (
    <AnimatedDiv>
      <Box
        component="h1"
        display="flex"
        flexWrap="wrap"
        // justifyContent="center"
        sx={{
          ...theme.typography.h2,
          my: 0,
          fontFamily: theme.typography.fontSecondaryFamily,
          // [theme.breakpoints.up(lgKey)]: { fontSize: 72, lineHeight: '90px' },
        }}
      >
        <Box component="span">{t('hero.heading')} </Box>
      </Box>
    </AnimatedDiv>
  );

  const renderViewCoursesButton = (
    <AnimatedDiv>
      <Button
        size="large"
        variant="contained"
        href="/#courses"
        onClick={() => posthog.capture('hero_cta_clicked')}
        endIcon={<Iconify icon="ic:round-arrow-downward" />}
      >
        {t('hero.cta.viewCourses')}
      </Button>
    </AnimatedDiv>
  );

  const renderFreeConsultation = (
    <Box display="flex" flexWrap="wrap" gap={{ xs: 1.5, md: 2 }}>
      <AnimatedDiv>
        <p>{t('hero.cta.description')}</p>
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          target="_blank"
          href="https://calendly.com/gedas-gardauskas/15min"
          onClick={() => posthog.capture('hero_cta_clicked')}
        >
          {t('hero.cta.text')}
        </Button>
      </AnimatedDiv>
    </Box>
  );

  const renderIllustration = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1 1 100%', // Default: takes full width on smaller screens
        [theme.breakpoints.up(mdKey)]: {
          flex: '1 1 50%', // Takes 50% of the space on larger screens
        },
      }}
    >
      <SvgColor
        src={`${CONFIG.assetsDir}/assets/illustrations/illustration-hero.svg`}
        width="500px"
      />
    </Box>
  );

  return (
    <Box
      ref={scroll.elementRef}
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        [theme.breakpoints.up(mdKey)]: {
          minHeight: 760,
          height: '100vh',
          maxHeight: 1440,
          display: 'block',
          willChange: 'opacity',
          mt: 'calc(var(--layout-header-desktop-height) * -1)',
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        component={m.div}
        style={{ opacity }}
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
              justifyContent: 'center',
              py: 'var(--layout-header-desktop-height)',
            },
          }}
        >
          <Stack spacing={3}>
            <m.div style={{ y: y1 }}>{renderHeading}</m.div>
            <m.div style={{ y: y2 }}>{renderViewCoursesButton}</m.div>
            <m.div style={{ y: y3 }}>{renderFreeConsultation}</m.div>
          </Stack>
          <m.div style={{ y: y2 }}>{renderIllustration}</m.div>
        </Container>
        <HeroBackground />
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
