import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RADIUS, textEmphasis, SECTION_PADDING } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { renderEmphasis } from '../home/components/section-title';

// ----------------------------------------------------------------------

const MENTORS = {
  productDesign: {
    image: `${CONFIG.assetsDir}/assets/images/programs/mentors/Aiste.png`,
  },
  webDevelopment: {
    image: `${CONFIG.assetsDir}/assets/images/programs/mentors/Gedas.jpg`,
  },
};

// ----------------------------------------------------------------------

interface ProgramMentorProps extends BoxProps {
  programId: string;
}

export function ProgramMentor({ programId, sx, ...other }: ProgramMentorProps) {
  const { t } = useTranslate(programId, { keyPrefix: 'mentor' });

  // Where the mentor has done this work, read as a path rather than a list.
  const credentials = (t('credentials', { returnObjects: true, defaultValue: [] }) ??
    []) as string[];

  // A student's words about this mentor; shown only where one has been added.
  const review = t('review', { defaultValue: '' });

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <Card
            component={m.div}
            variants={varFade({ distance: 24 }).inUp}
            sx={{ p: { xs: 3, md: 5 } }}
          >
            <Stack spacing={{ xs: 3, md: 5 }}>
              {/* Who she is: the portrait sits with the name it belongs to. */}
              <Box
                sx={{
                  gap: { xs: 3, md: 5 },
                  display: 'grid',
                  alignItems: 'center',
                  gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
                }}
              >
                <Box
                  component="img"
                  // @ts-ignore
                  src={MENTORS[programId].image}
                  alt={t('name')}
                  sx={{
                    width: 1,
                    display: 'block',
                    objectFit: 'cover',
                    aspectRatio: '4 / 5',
                    borderRadius: RADIUS.md,
                    objectPosition: 'top center',
                  }}
                />

                <Stack spacing={2} alignItems="flex-start">
                  <Typography component="h2" variant="h2">
                    {renderEmphasis(t('title'))}
                  </Typography>

                  <Stack spacing={0.5}>
                    <Typography variant="subtitle1">{t('name')}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t('role')}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {t('description')}
                  </Typography>

                  <Button
                    size="large"
                    color="inherit"
                    target="_blank"
                    rel="noopener"
                    href={t('cta.link')}
                    endIcon={<Iconify icon="iconoir:linkedin" />}
                    sx={{ ml: -1 }}
                  >
                    {t('cta.text')}
                  </Button>
                </Stack>
              </Box>

              {/* Where she has done it, and what a student made of it. */}
              {(credentials.length > 0 || review) && (
                <Box
                  sx={{
                    gap: { xs: 3, md: 5 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  }}
                >
                  {credentials.length > 0 && (
                    <Stack spacing={1.5}>
                      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                        {t('credentialsTitle')}
                      </Typography>

                      <Stack component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                        {credentials.map((credential, index) => (
                          <Stack key={credential} component="li" direction="row" spacing={2}>
                            {/* A dot per role, joined by a line, so the career reads as a path. */}
                            <Stack alignItems="center" sx={{ alignSelf: 'stretch' }}>
                              <Box
                                sx={{
                                  mt: 0.75,
                                  width: 8,
                                  height: 8,
                                  flexShrink: 0,
                                  borderRadius: '50%',
                                  bgcolor: 'text.primary',
                                }}
                              />
                              {index < credentials.length - 1 && (
                                <Box sx={{ my: 0.5, flex: 1, width: '1px', bgcolor: 'divider' }} />
                              )}
                            </Stack>

                            <Typography
                              variant="body2"
                              sx={{ pb: index < credentials.length - 1 ? 2 : 0 }}
                            >
                              {credential}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  )}

                  {review && (
                    <Box
                      component="blockquote"
                      sx={{ m: 0, p: 3, bgcolor: 'grey.100', borderRadius: RADIUS.lg }}
                    >
                      <Box
                        aria-hidden
                        sx={{
                          ...textEmphasis,
                          fontSize: 40,
                          lineHeight: 1,
                          display: 'block',
                          color: 'text.disabled',
                        }}
                      >
                        “
                      </Box>

                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {review}
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ mt: 2, display: 'block', color: 'text.secondary' }}
                      >
                        {t('reviewLabel')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Stack>
          </Card>
        </Container>
      </MotionViewport>
    </Box>
  );
}
