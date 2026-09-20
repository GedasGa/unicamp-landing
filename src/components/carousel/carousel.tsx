import type { BoxProps } from '@mui/material/Box';

import { Children, isValidElement } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { carouselClasses } from './classes';
import { CarouselSlide } from './components/carousel-slide';

import type { CarouselProps, CarouselOptions } from './types';

// ----------------------------------------------------------------------

type StyledProps = Pick<CarouselOptions, 'axis' | 'slideSpacing'>;

export const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'axis',
})<StyledProps>(({ axis }) => ({
  margin: 'auto',
  maxWidth: '100%',
  overflow: 'hidden',
  position: 'relative',
  ...(axis === 'y' && {
    height: '100%',
  }),
}));

export const StyledContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'axis' && prop !== 'slideSpacing',
})<StyledProps>(({ axis, slideSpacing }) => ({
  display: 'flex',
  backfaceVisibility: 'hidden',
  ...(axis === 'x' && {
    touchAction: 'pan-y pinch-zoom',
    marginLeft: `calc(${slideSpacing} * -1)`,
  }),
  ...(axis === 'y' && {
    height: '100%',
    flexDirection: 'column',
    touchAction: 'pan-x pinch-zoom',
    marginTop: `calc(${slideSpacing} * -1)`,
  }),
}));

// ----------------------------------------------------------------------

/**
 * The root clips its content (`overflow: hidden`), which cuts the shadow off any card
 * inside it. Pass this as the carousel's `sx` to open up room for that shadow without
 * moving the carousel: the padding holds the shadow, the negative margins take the
 * space back. Sized for `theme.customShadows.card` — 8px above, 32px below.
 *
 * Vertical only: the root is capped at `maxWidth: 100%`, so a negative side margin
 * would shift it out of line with the rest of the page rather than widen it.
 */
export const carouselShadowRoom = {
  pt: '8px',
  pb: '32px',
  mt: '-8px',
  mb: '-32px',
} as const;

// ----------------------------------------------------------------------

export function Carousel({
  carousel,
  children,
  slotProps,
  sx,
  className,
  ...other
}: BoxProps & CarouselProps) {
  const { mainRef, options } = carousel;

  const axis = options?.axis ?? 'x';

  const slideSpacing = options?.slideSpacing ?? '0px';

  const direction = options?.direction ?? 'ltr';

  const renderChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const reactChild = child as React.ReactElement<{ key?: React.Key }>;

      return (
        <CarouselSlide key={reactChild.key} options={carousel.options} sx={slotProps?.slide}>
          {child}
        </CarouselSlide>
      );
    }
    return null;
  });

  return (
    <StyledRoot
      sx={sx}
      axis={axis}
      ref={mainRef}
      dir={direction}
      className={carouselClasses.root.concat(className ? ` ${className}` : '')}
      {...other}
    >
      <StyledContainer
        component="ul"
        axis={axis}
        slideSpacing={slideSpacing}
        className={carouselClasses.container}
        sx={{
          ...(carousel.pluginNames?.includes('autoHeight') && {
            alignItems: 'flex-start',
            transition: (theme) =>
              theme.transitions.create(['height'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }),
          ...slotProps?.container,
        }}
      >
        {renderChildren}
      </StyledContainer>
    </StyledRoot>
  );
}
