import type { BoxProps } from '@mui/material/Box';
import type { CardProps } from '@mui/material/Card';

import { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { RADIUS, varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { paths } from '../../routes/paths';
import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { ConsultationCard } from './consultation-card';
import { SectionTitle } from './components/section-title';
import { SECTION_PADDING, SECTION_CONTENT_GAP } from './components/section-spacing';

// ----------------------------------------------------------------------

type Program = {
  id: 'webDevelopment' | 'productDesign';
  link: string;
  // Card media; a placeholder is shown until one is added.
  video?: string;
  image?: string;
  // Background of the media itself, so the frame blends with it when the media is letterboxed.
  mediaBackground?: string;
};

const VIDEOS_DIR = `${CONFIG.assetsDir}/assets/videos/programs`;

// Card videos replay this many times, then stay on their last frame until the page reloads.
const MAX_VIDEO_PLAYS = 10;

export const PROGRAMS: Program[] = [
  {
    id: 'webDevelopment',
    link: paths.programs.fe,
    video: `${VIDEOS_DIR}/web-development.mp4`,
    mediaBackground: '#FFFFFF',
  },
  {
    id: 'productDesign',
    link: paths.programs.ux,
    video: `${VIDEOS_DIR}/product-design.mp4`,
    mediaBackground: '#E7E9ED',
  },
];

// ----------------------------------------------------------------------

export function HomePrograms({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <Stack gap={SECTION_CONTENT_GAP}>
            <SectionTitle
              title={t('programs.title')}
              description={t('programs.description')}
              sx={{ textAlign: 'center' }}
            />

            <Stack gap={3}>
              {PROGRAMS.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </Stack>

            <ConsultationCard />
          </Stack>
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ProgramCardProps = CardProps & {
  program: Program;
};

export function ProgramCard({ program, sx, ...other }: ProgramCardProps) {
  const { t } = useTranslate('home');

  const { id, link, video, image, mediaBackground } = program;

  const mediaRef = useRef<HTMLDivElement>(null);
  const playCount = useRef(1);
  // Only start loading the video once the card is close to the viewport.
  const mediaInView = useInView(mediaRef, { once: true, margin: '200px' });
  const reduceMotion = useReducedMotion();

  const renderImage = (
    <Box
      ref={mediaRef}
      sx={(theme) => ({
        flexShrink: 0,
        width: { xs: 1, sm: 200, md: 240 },
        aspectRatio: '4 / 3',
        borderRadius: RADIUS.md,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.disabled',
        border: `1px solid ${theme.vars.palette.divider}`,
        bgcolor: mediaBackground ?? varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
      })}
    >
      {video && mediaInView ? (
        <Box
          component="video"
          src={video}
          muted
          playsInline
          onEnded={(event: React.SyntheticEvent<HTMLVideoElement>) => {
            if (playCount.current >= MAX_VIDEO_PLAYS) return;
            playCount.current += 1;
            const player = event.currentTarget;
            player.currentTime = 0;
            player.play().catch(() => {});
          }}
          // With reduced motion, show the first frame without playing.
          autoPlay={!reduceMotion}
          preload={reduceMotion ? 'metadata' : 'auto'}
          aria-hidden
          // Show the whole video (no cropping); the frame background fills any leftover space.
          sx={{ width: 1, height: 1, objectFit: 'contain' }}
        />
      ) : image ? (
        <Box component="img" src={image} alt="" sx={{ width: 1, height: 1, objectFit: 'cover' }} />
      ) : (
        <Iconify icon="solar:gallery-wide-bold-duotone" width={40} />
      )}
    </Box>
  );

  const renderContent = (
    <Stack spacing={1} sx={{ flex: '1 1 auto', minWidth: 0 }}>
      <Typography variant="overline" sx={{ color: 'text.disabled' }}>
        {[t('programs.meta.duration'), t('programs.meta.format'), t('programs.meta.group')].join(
          ' · '
        )}
      </Typography>

      <Typography variant="h4" component="h3">
        {t(`programs.programs.${id}.outcome`)}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ typography: 'body2', color: 'text.secondary' }}
      >
        <Iconify icon="solar:wallet-money-bold-duotone" width={20} sx={{ color: 'text.primary' }} />
        <span>{t('programs.pricing.financing')}</span>
      </Stack>
    </Stack>
  );

  return (
    <Card component={m.div} variants={varFade({ distance: 24 }).inUp} sx={sx} {...other}>
      <CardActionArea
        href={link}
        sx={{
          p: { xs: 2, md: 2.5 },
          gap: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          '&:hover .program-card-arrow': { transform: 'translateX(4px)' },
        }}
      >
        {renderImage}
        {renderContent}

        {/* Decorative: the whole card is the link */}
        <Fab
          component="span"
          color="inherit"
          size="medium"
          tabIndex={-1}
          aria-hidden
          className="program-card-arrow"
          sx={(theme) => ({
            flexShrink: 0,
            alignSelf: { xs: 'flex-end', sm: 'center' },
            transition: theme.transitions.create('transform'),
          })}
        >
          <Iconify icon="eva:arrow-forward-fill" width={22} />
        </Fab>
      </CardActionArea>
    </Card>
  );
}
