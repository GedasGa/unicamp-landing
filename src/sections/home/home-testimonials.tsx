import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
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

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Aleksandra Z.',
    rating: 5,
    content: `Viskas super! Kaip tik ieškojau kursų kur galėčiau pasibandyti. Tikrai tiem kas dar bandotes ir ieškote savęs labai rekomenduoju.`,
    course: 'UX/UI',
  },
  {
    name: 'Monika J.',
    rating: 5,
    content: `Realiai neisivaizdavau, kad taip itrauks:)) Kursai nebuvo sausi, viskas su pavyzdziais ir praktika.`,
    course: 'UX/UI',
  },
  {
    name: 'Simona G.',
    rating: 5,
    content: `Prieš mokymus nežinojau, kad ux yra tokia plati sritis..wow. Supratau, kad svarbu testuoti savo dizainus, o ne tiesiog „gražiai padaryti“.`,
    course: 'Frontend',
  },
  {
    name: 'Edgaras K.',
    rating: 5,
    content: `Didelis ačiū Gedui. Labai patogu, kad viskas buvo online, galėjau mokytis iš namų ir dar dirbt.`,
    course: 'Frontend',
  },
  {
    name: 'Julius V.',
    rating: 5,
    content: `Patiko, kad dirbom prie savo projektų, kam kas įdomu, o ne šiaip sausos užduotėlės kaip kitur.`,
    course: 'Frontend',
  },
  {
    name: 'Justė P.',
    rating: 5,
    content: `Patiko! Ačiū! 😍`,
    course: 'UX/UI',
  },
  {
    name: 'Evelina Ž.',
    rating: 5,
    content: `Kartais būdavo sunku. Tikrai nemeluosiu 😄 Bet dėstytojas Gedas viską ramiai dar kartą paaiškindavo ir pavykdavo. Tas jausmas nerealus 🙏`,
    course: 'Frontend',
  },
  {
    name: 'Giedrius Č.',
    rating: 5,
    content: `Kursai labai geri, bet sakyčiau reikia turėt šiek tiek kantrybės, kol pradedi jaust progresą.`,
    course: 'Frontend',
  },
  {
    name: 'Liepa P.',
    rating: 5,
    content: `Pati pradžia buvo kosmosas, galvojau kad neištempsiu, bet paskui susigaudžiau ir dabar dėkoju sau kad nesustojau:)`,
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
    <Box component="section" sx={{ py: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <SectionTitle
            title={t('testimonials.title')}
            sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}
          />

          <Stack sx={{ position: 'relative', py: { xs: 5, md: 8 } }}>
            <Carousel carousel={carousel}>
              {TESTIMONIALS.map((item) => (
                <Stack key={item.name} component={m.div} variants={varFade().in}>
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
                    {item.content}
                  </Typography>

                  <Stack direction="column" spacing={2}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Label
                      color={item.course === 'UX/UI' ? 'primary' : 'default'}
                      sx={{ alignSelf: 'start', width: 'auto' }}
                    >
                      {item.course}
                    </Label>
                  </Stack>
                </Stack>
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
