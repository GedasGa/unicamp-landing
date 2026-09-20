import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RADIUS, varAlpha, SECTION_PADDING } from 'src/theme/styles';

import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { BrandGlow } from '../home/components/brand-glow';
import { renderEmphasis } from '../home/components/section-title';

// ----------------------------------------------------------------------

// Text on the dark card: full white for what matters, dimmed for supporting lines.
const WHITE = {
  body: varAlpha('255 255 255', 0.88),
  muted: varAlpha('255 255 255', 0.64),
  line: varAlpha('255 255 255', 0.12),
  panel: varAlpha('255 255 255', 0.06),
};

interface ProgramNextGroupsProps extends BoxProps {
  programId: string;
  openApplyDialog: () => void;
}

export function ProgramNextGroups({
  programId,
  openApplyDialog,
  sx,
  ...other
}: ProgramNextGroupsProps) {
  const { t } = useTranslate(programId, { keyPrefix: 'nextGroups' });

  // When registration opens and when the classes start.
  const dates = (t('dates', { returnObjects: true, defaultValue: [] }) ?? []) as {
    label: string;
    value: string;
  }[];

  // What happens after someone reserves a spot.
  const steps = (t('steps.items', { returnObjects: true, defaultValue: [] }) ?? []) as string[];

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <Card
            component={m.div}
            variants={varFade({ distance: 24 }).inUp}
            sx={{
              p: { xs: 3, md: 6 },
              color: 'common.white',
              bgcolor: 'text.primary',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* The brand colour as a glow in one corner rather than across the whole surface. */}
            <BrandGlow
              intensity={0.4}
              sx={{
                top: -180,
                left: 'auto',
                right: -120,
                transform: 'none',
                width: { xs: 320, md: 560 },
                height: { xs: 240, md: 380 },
              }}
            />

            <Box
              sx={{
                gap: { xs: 4, md: 6 },
                display: 'grid',
                position: 'relative',
                alignItems: 'start',
                gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' },
              }}
            >
              <Stack spacing={3} alignItems="flex-start">
                <Stack spacing={2}>
                  <Typography component="h2" variant="h2">
                    {renderEmphasis(t('title'))}
                  </Typography>
                  <Typography variant="body1" sx={{ color: WHITE.body }}>
                    {t('subtitle')}
                  </Typography>
                </Stack>

                {/* The dates read as facts, not as a sentence to parse. */}
                {dates.length > 0 && (
                  <Stack sx={{ width: 1 }}>
                    {dates.map((date, index) => (
                      <Stack
                        key={date.label}
                        spacing={2}
                        direction="row"
                        alignItems="baseline"
                        justifyContent="space-between"
                        sx={{
                          py: 2,
                          ...(index > 0 && { borderTop: '1px solid', borderColor: WHITE.line }),
                        }}
                      >
                        <Typography variant="body2" sx={{ color: WHITE.muted }}>
                          {date.label}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ textAlign: 'right' }}>
                          {date.value}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                )}

                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    width: { xs: 1, sm: 'auto' },
                    color: 'common.black',
                    bgcolor: 'common.white',
                    '&:hover': { bgcolor: 'grey.200' },
                  }}
                  onClick={openApplyDialog}
                >
                  {t('cta')}
                </Button>
              </Stack>

              {steps.length > 0 && (
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    border: '1px solid',
                    bgcolor: WHITE.panel,
                    borderColor: WHITE.line,
                    borderRadius: RADIUS.lg,
                  }}
                >
                  <Typography variant="overline" sx={{ color: WHITE.muted }}>
                    {t('steps.title')}
                  </Typography>

                  <Stack component="ol" spacing={2.5} sx={{ m: 0, mt: 2, p: 0, listStyle: 'none' }}>
                    {steps.map((step, index) => (
                      <Stack
                        key={step}
                        component="li"
                        spacing={2}
                        direction="row"
                        alignItems="flex-start"
                      >
                        <Box
                          sx={{
                            width: 28,
                            height: 28,
                            flexShrink: 0,
                            display: 'grid',
                            borderRadius: '50%',
                            placeItems: 'center',
                            typography: 'caption',
                            bgcolor: WHITE.line,
                          }}
                        >
                          {index + 1}
                        </Box>

                        <Typography variant="body2" sx={{ color: WHITE.body }}>
                          {step}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Card>
        </Container>
      </MotionViewport>
    </Box>
  );
}
