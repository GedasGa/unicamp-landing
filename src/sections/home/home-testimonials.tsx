import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { maxLine, SECTION_PADDING, SECTION_CONTENT_GAP } from 'src/theme/styles';

import { varFade, MotionViewport } from 'src/components/animate';
import {
  Carousel,
  useCarousel,
  CarouselDotButtons,
  carouselShadowRoom,
  carouselBreakpoints,
  CarouselArrowBasicButtons,
} from 'src/components/carousel';

import { useTranslate } from '../../locales';
import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

// The programme page on Kursuok.lt, where these reviews were posted.
const KURSUOK_REVIEWS_URL =
  'https://www.kursuok.lt/mokymai/programa/ux-ui-web-dizaino-pagrindai-su-figma/';

// Quotes live in the translations (`testimonials.items`), in the same order as these ratings.
const TESTIMONIAL_RATINGS = [5, 5, 5, 4, 5, 5, 4];

// ----------------------------------------------------------------------

type HomeTestimonialsProps = BoxProps & {
  /** Reviews to leave out here, by index, when they are already quoted on the page. */
  omit?: number[];
};

export function HomeTestimonials({ omit = [], sx, ...other }: HomeTestimonialsProps) {
  const { t } = useTranslate('home');

  const reviews = TESTIMONIAL_RATINGS.map((rating, index) => ({ rating, index })).filter(
    (review) => !omit.includes(review.index)
  );

  const carousel = useCarousel({
    align: 'start',
    // Three across at most: the reviews are long, and narrower cards cut them short.
    slidesToShow: { xs: 1, sm: 2, md: 3 },
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
            description={
              <>
                {/* "Real reviews" links out, so a visitor can check them at the source. */}
                <Link
                  href={KURSUOK_REVIEWS_URL}
                  target="_blank"
                  rel="noopener"
                  underline="always"
                  color="inherit"
                >
                  {t('testimonials.descriptionLink')}
                </Link>{' '}
                {t('testimonials.description')}
              </>
            }
            sx={{ mb: SECTION_CONTENT_GAP, textAlign: 'center' }}
          />

          <Stack sx={{ position: 'relative' }}>
            <Carousel carousel={carousel} sx={carouselShadowRoom}>
              {reviews.map(({ rating, index }) => (
                <Card
                  key={index}
                  component={m.div}
                  variants={varFade().in}
                  sx={{ p: 3, height: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Rating size="small" name="read-only" value={rating} precision={0.5} readOnly />

                  <Typography
                    sx={(theme) => ({
                      ...maxLine({ line: 10, persistent: theme.typography.body1 }),
                      mt: 2,
                    })}
                  >
                    {t(`testimonials.items.${index}`)}
                  </Typography>
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
