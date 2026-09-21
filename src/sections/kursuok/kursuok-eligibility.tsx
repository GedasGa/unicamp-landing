import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { SECTION_PADDING, SECTION_CONTENT_GAP } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { SectionTitle } from '../home/components/section-title';

// ----------------------------------------------------------------------

// The ministry announcement the conditions below are taken from.
const SOURCE_URL =
  'https://smsm.lrv.lt/lt/naujienos-1/pranesimai-ziniasklaidai-1/atnaujintas-kursuoklt-finansavimas-pretenduoti-galima-iki-gruodzio-7-d-pirmenybe-teikiama-jautresnems-grupems-JKAJ/';

export function KursuokEligibility({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('kursuok', { keyPrefix: 'eligibility' });

  const items = (t('items', { returnObjects: true, defaultValue: [] }) ?? []) as string[];
  const priority = (t('priority.items', { returnObjects: true, defaultValue: [] }) ??
    []) as string[];

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <SectionTitle
            title={t('title')}
            description={t('description')}
            sx={{ mx: 'auto', maxWidth: 720, textAlign: 'center' }}
          />

          <Box
            sx={{
              gap: 3,
              display: 'grid',
              mt: SECTION_CONTENT_GAP,
              gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
            }}
          >
            {/* The conditions, as a checklist people can tick off in their head. */}
            <Card
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
              sx={{ p: { xs: 3, md: 5 } }}
            >
              <Stack component="ul" spacing={2.5} sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {items.map((item) => (
                  <Stack
                    key={item}
                    component="li"
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                  >
                    <Iconify
                      icon="iconmind:check-outline-thin"
                      width={24}
                      sx={{ flexShrink: 0, color: 'success.main' }}
                    />
                    <Typography variant="body1">{item}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>

            <Card
              component={m.div}
              variants={varFade({ distance: 24 }).inUp}
              sx={{ p: { xs: 3, md: 5 }, bgcolor: 'background.neutral', boxShadow: 'none' }}
            >
              <Typography variant="h5">{t('priority.title')}</Typography>
              <Typography variant="body2" sx={{ mt: 1.5, mb: 2, color: 'text.secondary' }}>
                {t('priority.description')}
              </Typography>

              <Stack component="ul" spacing={1.5} sx={{ m: 0, pl: 2.5, listStyle: 'disc' }}>
                {priority.map((item) => (
                  <Typography key={item} component="li" variant="body2">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Card>
          </Box>

          {/* Rules change between calls, so say where these come from and when. */}
          <Typography
            variant="caption"
            component="p"
            sx={{ mt: 3, textAlign: 'center', color: 'text.secondary' }}
          >
            <Link
              href={SOURCE_URL}
              target="_blank"
              rel="noopener"
              color="inherit"
              underline="always"
            >
              {t('source')}
            </Link>
          </Typography>
        </Container>
      </MotionViewport>
    </Box>
  );
}
