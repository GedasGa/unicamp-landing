import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { CONFIG } from '../../../config-global';

// ----------------------------------------------------------------------

export function Lines({ strokeCount }: { strokeCount: number }) {
  const draw = {
    x: {
      hidden: { x2: 0, strokeOpacity: 0 },
      visible: (i: number) => {
        const delay = 1 + i * 0.5;
        return {
          x2: '100%',
          strokeOpacity: 1,
          transition: {
            strokeOpacity: { delay, duration: 0.01 },
            x2: {
              delay,
              bounce: 0,
              duration: 1.5,
              type: 'spring',
            },
          },
        };
      },
    },
    y: {
      hidden: { y2: 0, strokeOpacity: 0 },
      visible: (i: number) => {
        const delay = 1 + i * 0.5;
        return {
          y2: '100%',
          strokeOpacity: 1,
          transition: {
            strokeOpacity: { delay, duration: 0.01 },
            y2: {
              delay,
              bounce: 0,
              duration: 1.5,
              type: 'spring',
            },
          },
        };
      },
    },
  };

  const translateY = (index: number) =>
    strokeCount / 2 > index
      ? `translateY(calc(((${index} * var(--stroke-spacing)) + var(--stroke-spacing) / 2) * -1))`
      : `translateY(calc(((${strokeCount - (index + 1)} * var(--stroke-spacing)) + var(--stroke-spacing) / 2)))`;

  const linesX = (
    <>
      {[...Array(strokeCount)].map((_, index) => (
        <m.line
          key={index}
          x1="0"
          x2="100%"
          y1="50%"
          y2="50%"
          variants={draw.x}
          style={{
            transform: translateY(index),
            stroke: 'var(--hero-line-stroke-color)',
            strokeDasharray: 'var(--stroke-dasharray)',
            strokeWidth: 'var(--hero-line-stroke-width)',
          }}
        />
      ))}
    </>
  );

  const translateX = (index: number) =>
    strokeCount / 2 > index
      ? `translateX(calc(((${index} * var(--stroke-spacing)) + var(--stroke-spacing) / 2) * -1))`
      : `translateX(calc(((${strokeCount - (index + 1)} * var(--stroke-spacing)) + var(--stroke-spacing) / 2)))`;

  const linesY = (
    <>
      {[...Array(strokeCount)].map((_, index) => (
        <m.line
          key={index}
          x1="50%"
          x2="50%"
          y1="0%"
          y2="100%"
          variants={draw.y}
          style={{
            transform: translateX(index),
            stroke: 'var(--hero-line-stroke-color)',
            strokeDasharray: 'var(--stroke-dasharray)',
            strokeWidth: 'var(--hero-line-stroke-width)',
          }}
        />
      ))}
    </>
  );

  return (
    <>
      {linesX}
      {linesY}
    </>
  );
}

// ----------------------------------------------------------------------

export function Circles() {
  const drawCircle = {
    hidden: { opacity: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5;
      return { opacity: 1, transition: { opacity: { delay, duration: 0.01 } } };
    },
  };

  return (
    <>
      <m.path
        variants={drawCircle}
        d="M1 41C1 63.0914 18.9086 81 41 81C63.0914 81 81 63.0914 81 41C81 18.9086 63.0914 1 41 1"
        style={{
          strokeDasharray: 'var(--stroke-dasharray)',
          stroke: 'var(--hero-circle-stroke-color)',
          strokeWidth: 'var(--hero-circle-stroke-width)',
          transform: 'translate(calc(50% - 480px), calc(50% - 80px))',
        }}
      />

      <m.path
        variants={drawCircle}
        d="M1 41C1 63.0914 18.9086 81 41 81C63.0914 81 81 63.0914 81 41C81 18.9086 63.0914 1 41 1"
        style={{
          strokeDasharray: 'var(--stroke-dasharray)',
          stroke: 'var(--hero-circle-stroke-color)',
          strokeWidth: 'var(--hero-circle-stroke-width)',
          transform: 'translate(calc(50% + 400px), calc(50% + 80px))',
        }}
      />

      <m.circle
        cx="50%"
        cy="50%"
        fill="var(--hero-circle-stroke-color)"
        style={{ transform: 'translate(calc(0% - 200px), calc(0% + 200px))' }}
        initial={{ r: 0 }}
        animate={{ r: 5 }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function PlusIcon() {
  const drawPlus = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => {
      const delay = 1 + i * 0.5;
      return {
        opacity: 1,
        pathLength: 1,
        transition: {
          opacity: { delay, duration: 0.01 },
          pathLength: {
            delay,
            bounce: 0,
            duration: 1.5,
            type: 'spring',
          },
        },
      };
    },
  };

  return (
    <>
      <m.path
        variants={drawPlus}
        d="M8 0V16M16 8.08889H0"
        stroke="var(--hero-plus-stroke-color)"
        style={{ transform: 'translate(calc(50% - 448px), calc(50% - 128px))' }}
      />

      <m.path
        variants={drawPlus}
        d="M8 0V16M16 8.08889H0"
        stroke="var(--hero-plus-stroke-color)"
        style={{ transform: 'translate(calc(50% + 432px), calc(50% + 192px))' }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function Companies({ sx, ...other }: BoxProps) {
  const logos = [
    'speechify.svg',
    'european-commission.svg',
    'ovoko.svg',
    'eeas.svg',
    'khu.svg',
    'ipl.svg',
    'ktu.svg',
    'vilnius-tech.svg',
  ];

  return (
    <Box
      component="section"
      sx={{
        left: 0,
        width: 1,
        bottom: 0,
        height: 150,
        position: 'absolute',
        ...sx,
      }}
      {...other}
    >
      <m.div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
        }}
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          duration: 64,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {/* Render the logo images */}
        {[...logos, ...logos].map((logo, index) => (
          <Box
            key={index}
            component="img"
            src={`${CONFIG.assetsDir}/assets/images/home/companies/${logo}`}
            alt={`${logo.replace('.svg', '')} logo`}
            sx={{
              height: 48,
              marginRight: 6, // Adjust spacing as needed
            }}
          />
        ))}
      </m.div>
    </Box>
  );
}
