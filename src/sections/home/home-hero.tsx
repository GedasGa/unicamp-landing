import type { MotionValue } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';

import posthog from 'posthog-js';
import { useRef, useState } from 'react';
import { m, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { Grainient } from 'src/components/grainient';
import { varFade, AnimateHearts, MotionContainer } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { SaveSpotDialog } from '../cta/save-spot-dialog';
import { renderEmphasis } from './components/section-title';

// ----------------------------------------------------------------------

const smKey = 'sm';
const mdKey = 'md';

// Gradient colours (color1 / color2 / color3 of the Grainient background).
const HERO_COLORS = {
  light: '#7178b5',
  accent: '#c69760',
  base: '#B497CF',
};

export function HomeHero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');
  const theme = useTheme();
  const scroll = useScrollPercent();
  const mdUp = useResponsive('up', mdKey);
  const saveSpotDialog = useBoolean();

  const distance = mdUp ? scroll.percent : 0;

  const renderHeading = (
    <AnimatedDiv>
      <Box
        component="h1"
        sx={{
          ...theme.typography.h2,
          mt: 0,
          mb: 0,
          textAlign: 'center',
          fontFamily: theme.typography.fontSecondaryFamily,
          // Written on the same breakpoint keys as the h2 variant so these sizes replace its own.
          fontSize: 44,
          [theme.breakpoints.up('sm')]: { fontSize: 64 },
          [theme.breakpoints.up(mdKey)]: { fontSize: 80 },
          [theme.breakpoints.up('lg')]: { fontSize: 96 },
          lineHeight: 1.1,
          // Soft shadow lifts the white text off bright parts of the video.
          textShadow: `0 2px 24px ${varAlpha(theme.vars.palette.common.blackChannel, 0.32)}`,
        }}
      >
        {renderEmphasis(t('hero.heading.title'))}
      </Box>
    </AnimatedDiv>
  );

  const renderSaveSpotButton = (
    <AnimatedDiv>
      <Button
        onClick={() => {
          posthog.capture('save_spot_clicked');
          saveSpotDialog.onTrue();
        }}
        size="large"
        startIcon={<AnimateHearts size={18} />}
        endIcon={<Iconify icon="eva:arrow-forward-fill" width={20} />}
        sx={{
          px: 2,
          color: 'common.white',
          border: `1px solid ${varAlpha(theme.vars.palette.common.whiteChannel, 0.24)}`,
          bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.32),
          backdropFilter: 'blur(8px)',
          boxShadow: `0 8px 24px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
          '&:hover': { bgcolor: varAlpha(theme.vars.palette.grey['900Channel'], 0.48) },
        }}
      >
        {t('hero.cta.saveSpot')}
      </Button>
    </AnimatedDiv>
  );

  const renderViewCoursesButton = (
    <AnimatedDiv>
      <Button
        size="large"
        variant="contained"
        href="/#courses"
        onClick={() => posthog.capture('hero_cta_clicked')}
        endIcon={<Iconify icon="eva:arrow-downward-fill" width={20} />}
        sx={{
          color: 'common.black',
          bgcolor: 'common.white',
          boxShadow: `0 8px 24px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
          '&:hover': {
            bgcolor: 'grey.200',
            boxShadow: `0 8px 24px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
          },
        }}
      >
        {t('hero.cta.viewCourses.buttonText')}
      </Button>
    </AnimatedDiv>
  );

  return (
    <Box
      ref={scroll.elementRef}
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        // Fallback colour behind the gradient (e.g. before WebGL starts).
        bgcolor: HERO_COLORS.base,
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
      <Grainient
        aria-hidden
        paused
        color1={HERO_COLORS.light}
        color2={HERO_COLORS.accent}
        color3={HERO_COLORS.base}
        timeSpeed={0.25}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        contrast={1.5}
        zoom={0.9}
        sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      <Box
        component={m.div}
        sx={{
          width: 1,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: theme.transitions.create(['opacity']),
          [theme.breakpoints.up(mdKey)]: {
            // Same height as the section, so the content centres within the hero.
            height: 'clamp(760px, 80vh, 1280px)',
            position: 'fixed',
          },
        }}
      >
        <Container
          component={MotionContainer}
          sx={{
            // Equal space above and below keeps the content centred in the gradient.
            py: 'calc(var(--layout-header-mobile-height) + 48px)',
            gap: 5,
            zIndex: 9,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column-reverse',
            [theme.breakpoints.up(mdKey)]: {
              flexDirection: 'row',
              flex: '1 1 auto',
              justifyContent: 'center',
              alignItems: 'center',
              py: 3,
            },
          }}
        >
          <Stack spacing={3} alignItems="center">
            {renderSaveSpotButton}
            {renderHeading}
            {renderViewCoursesButton}
          </Stack>

          <SaveSpotDialog open={saveSpotDialog.value} onClose={saveSpotDialog.onFalse} />
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
