import type { BoxProps } from '@mui/material/Box';

import { z as zod } from 'zod';
import posthog from 'posthog-js';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { m, useReducedMotion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { submitSaveSpot } from 'src/actions/save-spot';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import { varFade, varFloat, MotionContainer } from 'src/components/animate';

import { paths } from '../../routes/paths';
import { CONFIG } from '../../config-global';
import { useTranslate } from '../../locales';
import { BrandGlow } from './components/brand-glow';
import { renderEmphasis } from './components/section-title';

// ----------------------------------------------------------------------

const mdKey = 'md';

const HERO_IMAGES_DIR = `${CONFIG.assetsDir}/assets/images/home/hero`;

/** Width of the text column; the floating cards are kept outside it. */
const CONTENT_WIDTH = 640;
/** Smallest gap between the text column and a floating card. */
const CARD_GUTTER = 40;
const CARD_WIDTH = 220;
/** Below this the side columns are too narrow, so the cards move under the text instead. */
const FLOATING_FROM = 'lg';

type FloatingCard = {
  id: string;
  icon: string;
  /** Shown instead of the icon + label pill; falls back to the pill if it fails to load. */
  image?: string;
  side: 'left' | 'right';
  /** Vertical anchor, as a share of the section height. */
  top?: string;
  bottom?: string;
  rotate: number;
};

// Cards floating beside the heading: which side they sit on, where, and their tilt.
const FLOATING_CARDS: FloatingCard[] = [
  {
    id: 'certificate',
    icon: 'iconmind:share-certificate-outline-thin',
    image: `${HERO_IMAGES_DIR}/certificate.png`,
    side: 'left',
    top: '12%',
    rotate: -6,
  },
  {
    id: 'mentor',
    icon: 'iconmind:personal-trainer-outline-thin',
    side: 'right',
    top: '16%',
    rotate: 5,
  },
  {
    id: 'project',
    icon: 'iconmind:assignment-outline-thin',
    image: `${HERO_IMAGES_DIR}/project.png`,
    side: 'right',
    bottom: '12%',
    rotate: 4,
  },
  {
    id: 'format',
    icon: 'iconmind:video-outline-thin',
    side: 'left',
    bottom: '18%',
    rotate: -4,
  },
];

const SaveSpotSchema = zod.object({
  email: zod
    .string()
    // Namespaced so the shared field can translate them with the home bundle.
    .min(1, { message: 'home:hero.form.emailRequired' })
    .email({ message: 'home:hero.form.emailInvalid' }),
});

type SaveSpotSchemaType = zod.infer<typeof SaveSpotSchema>;

// ----------------------------------------------------------------------

export function HomeHero({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        // Extra top padding leaves room for the floating header.
        pt: 'calc(var(--layout-header-mobile-height) + 48px)',
        pb: { xs: 8, md: 14 },
        [theme.breakpoints.up(mdKey)]: {
          pt: 'calc(var(--layout-header-desktop-height) + 112px)',
        },
        ...sx,
      }}
      {...other}
    >
      <Container component={MotionContainer} sx={{ position: 'relative' }}>
        {/* Soft glow behind the heading, in the brand gradient. */}
        <BrandGlow sx={{ top: { xs: -32, md: -48 }, opacity: { xs: 0.18, md: 0.24 } }} />

        <Stack
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          sx={{ position: 'relative', textAlign: 'center', maxWidth: 640, mx: 'auto' }}
        >
          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Box
              component="h1"
              sx={{
                ...theme.typography.h2,
                m: 0,
                fontFamily: theme.typography.fontSecondaryFamily,
                fontSize: 36,
                lineHeight: 1.15,
                [theme.breakpoints.up('sm')]: { fontSize: 48 },
                [theme.breakpoints.up(mdKey)]: { fontSize: 60 },
              }}
            >
              {renderEmphasis(t('hero.heading.title'))}
            </Box>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Typography sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto' }}>
              {t('hero.subtitle')}
            </Typography>
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp} sx={{ width: 1 }}>
            <SaveSpotForm />
          </Box>

          <Box component={m.div} variants={varFade({ distance: 24 }).inUp}>
            <Button
              color="inherit"
              href="/#courses"
              onClick={() => posthog.capture('hero_cta_clicked')}
              endIcon={<Iconify icon="iconmind:arrow-down-outline-thin" width={20} />}
            >
              {t('hero.cta.viewCourses.buttonText')}
            </Button>
          </Box>

          {/* Narrow screens: the same four points, in a row under the text. */}
          <Stack
            component={m.div}
            variants={varFade({ distance: 24 }).inUp}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            spacing={1}
            justifyContent="center"
            sx={{ display: { xs: 'flex', [FLOATING_FROM]: 'none' } }}
          >
            {FLOATING_CARDS.map((card) => (
              <HeroCardPill key={card.id} card={card} />
            ))}
          </Stack>
        </Stack>

        {/* Wide screens: cards float in the columns beside the text. */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: { xs: 'none', [FLOATING_FROM]: 'block' },
            // This layer covers the whole section, so let clicks through to the form.
            pointerEvents: 'none',
          }}
        >
          {FLOATING_CARDS.map((card, index) => (
            <FloatingCardItem key={card.id} card={card} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

function HeroCardPill({ card }: { card: FloatingCard }) {
  const { t } = useTranslate('home');

  return (
    <Card sx={{ px: 1.5, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
      <Iconify icon={card.icon} width={20} sx={{ color: 'text.primary' }} />
      <Typography variant="subtitle2">{t(`hero.cards.${card.id}`)}</Typography>
    </Card>
  );
}

// ----------------------------------------------------------------------

function FloatingCardItem({ card, index }: { card: FloatingCard; index: number }) {
  const { t } = useTranslate('home');
  const reduceMotion = useReducedMotion();

  // Until the image is uploaded (or if it fails), keep the icon + label pill.
  const [imageFailed, setImageFailed] = useState(false);

  const showImage = !!card.image && !imageFailed;

  // Anchored to the edge of the text column, so a card can never reach the text,
  // and it shrinks instead of overlapping when the side column gets tight.
  const inset = `calc(50% + ${CONTENT_WIDTH / 2 + CARD_GUTTER}px)`;

  return (
    <Box
      component={m.div}
      variants={varFade({ distance: 24 }).in}
      sx={{
        position: 'absolute',
        ...(card.side === 'left' ? { right: inset } : { left: inset }),
        ...(card.top ? { top: card.top } : { bottom: card.bottom }),
        display: 'flex',
        justifyContent: card.side === 'left' ? 'flex-end' : 'flex-start',
        width: `min(${CARD_WIDTH}px, calc(50% - ${CONTENT_WIDTH / 2 + CARD_GUTTER}px))`,
        transform: `rotate(${card.rotate}deg)`,
      }}
    >
      {/* Same gentle bobbing as the tool logos. */}
      <Box component={m.div} {...(reduceMotion ? {} : varFloat(index))} sx={{ lineHeight: 0 }}>
        {showImage ? (
          // No card frame: these images already have their own rounded corners and shadow.
          <Box
            component="img"
            src={card.image}
            alt={t(`hero.cards.${card.id}`)}
            loading="lazy"
            onError={() => setImageFailed(true)}
            // Landscape images keep their own ratio; taller ones are capped and cropped.
            sx={{ width: 1, height: 'auto', maxHeight: 200, objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <Card
            sx={{
              px: 2,
              py: 1.5,
              gap: 1.5,
              display: 'flex',
              alignItems: 'center',
              // Keep the label on one line even if it is wider than the side column.
              flexShrink: 0,
            }}
          >
            <Iconify icon={card.icon} width={24} sx={{ color: 'text.primary' }} />
            <Typography variant="subtitle2" noWrap>
              {t(`hero.cards.${card.id}`)}
            </Typography>
          </Card>
        )}
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function SaveSpotForm() {
  const { t } = useTranslate('home');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<SaveSpotSchemaType>({
    resolver: zodResolver(SaveSpotSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async ({ email }) => {
    setErrorMsg('');

    const result = await submitSaveSpot(email);

    if (!result.success) {
      setErrorMsg(result.error || t('hero.form.error'));
      return;
    }

    posthog.capture('save_spot_submitted');
    setIsSubmitted(true);
  });

  if (isSubmitted) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Iconify icon="iconmind:check-outline-thin" width={22} sx={{ color: 'success.main' }} />
        <Typography variant="subtitle1">{t('hero.form.success')}</Typography>
      </Stack>
    );
  }

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack
        spacing={1.5}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ maxWidth: 460, mx: 'auto' }}
      >
        <Field.Text
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t('hero.form.placeholder')}
          sx={{ flex: '1 1 auto' }}
        />

        <LoadingButton
          type="submit"
          size="large"
          color="inherit"
          variant="contained"
          loading={isSubmitting}
          onClick={() => posthog.capture('save_spot_clicked')}
          sx={{ flexShrink: 0 }}
        >
          {t('hero.form.submit')}
        </LoadingButton>
      </Stack>

      <Typography
        variant="caption"
        sx={{ mt: 1.5, display: 'block', textAlign: 'center', color: 'text.secondary' }}
      >
        {errorMsg || (
          <>
            {t('hero.form.note')}{' '}
            <Link underline="always" color="text.secondary" href={paths.privacyPolicy}>
              {t('hero.form.privacyPolicy')}
            </Link>
          </>
        )}
      </Typography>
    </Form>
  );
}
