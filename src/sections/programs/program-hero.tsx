import type { BoxProps } from '@mui/material/Box';

import { m, useReducedMotion } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RADIUS, SECTION_PADDING } from 'src/theme/styles';

import { AiBadge } from 'src/components/ai-badge';
import { ProgramVideo } from 'src/components/program-video';
import { varFade, varFloat, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { PROGRAMS } from '../home/home-programs';

// ----------------------------------------------------------------------

/** Width of the floating clip, and where it sits below the heading. */
const VIDEO_WIDTH = 240;
/** Below this the side columns are too narrow, so the clip moves under the CTA instead. */
const FLOATING_FROM = 'lg';

// ----------------------------------------------------------------------
interface ProgramHeroProps extends BoxProps {
  programId: string;
  openApplyDialog: () => void;
}

export function ProgramHero({ programId, openApplyDialog, sx, ...other }: ProgramHeroProps) {
  const { t } = useTranslate(programId);
  const reduceMotion = useReducedMotion();

  // The same clip the programme's card on the home page plays.
  const program = PROGRAMS.find((item) => item.id === programId);

  const renderVideo = (
    <Box
      sx={(theme) => ({
        width: 1,
        overflow: 'hidden',
        aspectRatio: '4 / 3',
        borderRadius: RADIUS.lg,
        border: `1px solid ${theme.vars.palette.divider}`,
        boxShadow: theme.customShadows.card,
        bgcolor: program?.mediaBackground ?? 'background.neutral',
      })}
    >
      <ProgramVideo src={program?.video ?? ''} />
    </Box>
  );

  const renderCta = (
    <Box display="flex" alignItems="center" flexDirection="column" gap={{ xs: 1.5, md: 2 }}>
      <Button
        color="inherit"
        size="large"
        variant="contained"
        sx={{ width: { xs: '100%' }, maxWidth: { md: '360px' } }}
        onClick={openApplyDialog}
      >
        {t('hero.cta.title')}
      </Button>
      <Typography variant="caption">{t('hero.cta.subtitle')}</Typography>
    </Box>
  );

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <MotionViewport sx={{ position: 'relative' }}>
        <Container sx={{ position: 'relative' }}>
          <Typography component="h1" variant="h1" textAlign="center">
            {t('hero.title')}
          </Typography>

          <Box sx={{ mt: 3, mb: { xs: 5, md: 8 }, display: 'flex', justifyContent: 'center' }}>
            <AiBadge label={t('hero.subtitle')} />
          </Box>
          {renderCta}

          {/* Narrow screens: the clip sits under the CTA rather than beside it. */}
          {program?.video && (
            <Box
              sx={{
                mx: 'auto',
                mt: { xs: 5, md: 6 },
                maxWidth: 320,
                display: { xs: 'block', [FLOATING_FROM]: 'none' },
              }}
            >
              {renderVideo}
            </Box>
          )}

          {/* Wide screens: the clip floats in the column beside the CTA. */}
          {program?.video && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: { xs: 'none', [FLOATING_FROM]: 'block' },
                // Decoration only: let clicks through to the CTA beneath it.
                pointerEvents: 'none',
              }}
            >
              <Box
                component={m.div}
                variants={varFade({ distance: 24 }).in}
                sx={{
                  top: '52%',
                  right: 0,
                  position: 'absolute',
                  width: VIDEO_WIDTH,
                  transform: 'rotate(4deg)',
                }}
              >
                {/* The same gentle bobbing as the home hero's cards. */}
                <Box component={m.div} {...(reduceMotion ? {} : varFloat(0))}>
                  {renderVideo}
                </Box>
              </Box>
            </Box>
          )}
        </Container>
      </MotionViewport>
    </Box>
  );
}
