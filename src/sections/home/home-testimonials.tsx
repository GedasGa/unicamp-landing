import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { maxLine } from 'src/theme/styles';

import { varFade, MotionViewport } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { useTranslate } from '../../locales';
import { Label } from '../../components/label';
import { SectionTitle } from './components/section-title';
import { SECTION_PADDING, SECTION_CONTENT_GAP } from './components/section-spacing';

// ----------------------------------------------------------------------

// Quotes live in the translations (`testimonials.items`), in the same order as this list.
const TESTIMONIALS = [
  {
    name: 'Aleksandra Z.',
    rating: 5,
    course: 'UX/UI',
  },
  {
    name: 'Monika J.',
    rating: 5,
    course: 'UX/UI',
  },
  {
    name: 'Simona G.',
    rating: 5,
    course: 'Frontend',
  },
  {
    name: 'Edgaras K.',
    rating: 5,
    course: 'Frontend',
  },
  {
    name: 'Julius V.',
    rating: 5,
    course: 'Frontend',
  },
  {
    name: 'Justė P.',
    rating: 5,
    course: 'UX/UI',
  },
  {
    name: 'Evelina Ž.',
    rating: 5,
    course: 'Frontend',
  },
  {
    name: 'Giedrius Č.',
    rating: 5,
    course: 'Frontend',
  },
  {
    name: 'Liepa P.',
    rating: 5,
    course: 'UX/UI',
  },
];

// ----------------------------------------------------------------------

export function HomeTestimonials({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');

  const carousel = useCarousel({
    align: 'start',
    slidesToShow: { xs: 1, sm: 2, md: 3, lg: 4 },
    breakpoints: {
      [carouselBreakpoints.sm]: { slideSpacing: '24px' },
      [carouselBreakpoints.md]: { slideSpacing: '40px' },
      [carouselBreakpoints.lg]: { slideSpacing: '64px' },
    },
  });

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <SectionTitle
            title={t('testimonials.title')}
            description={t('testimonials.description')}
            sx={{ mb: SECTION_CONTENT_GAP, textAlign: 'center' }}
          />

          <Stack sx={{ position: 'relative' }}>
            <Carousel carousel={carousel}>
              {TESTIMONIALS.map((item, index) => (
                <Card
                  key={item.name}
                  component={m.div}
                  variants={varFade().in}
                  sx={{ p: 3, height: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Stack spacing={1} sx={{ typography: 'subtitle2' }}>
                    <Rating
                      size="small"
                      name="read-only"
                      value={item.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>

                  <Typography
                    sx={(theme) => ({
                      ...maxLine({ line: 4, persistent: theme.typography.body1 }),
                      mt: 2,
                      mb: 3,
                    })}
                  >
                    {t(`testimonials.items.${index}`)}
                  </Typography>

                  <Stack direction="column" spacing={2}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Label color="default" sx={{ alignSelf: 'start', width: 'auto' }}>
                      {item.course}
                    </Label>
                  </Stack>
                </Card>
              ))}
            </Carousel>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mt: { xs: 5, md: 8 } }}
            >
              <CarouselDotButtons
                variant="rounded"
                scrollSnaps={carousel.dots.scrollSnaps}
                selectedIndex={carousel.dots.selectedIndex}
                onClickDot={carousel.dots.onClickDot}
              />

              <CarouselArrowBasicButtons {...carousel.arrows} options={carousel.options} />
            </Stack>
          </Stack>
        </Container>
      </MotionViewport>
    </Box>
  );
}
