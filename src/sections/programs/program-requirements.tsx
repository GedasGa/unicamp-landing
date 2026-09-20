import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { SECTION_PADDING, SECTION_CONTENT_GAP } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { renderEmphasis } from '../home/components/section-title';

// ----------------------------------------------------------------------

// One icon per requirement, in the order the translations list them.
const ICONS = ['iconmind:rocket-outline-thin', 'iconmind:globe-outline-thin'];

interface ProgramRequirementsProps extends BoxProps {
  programId: string;
}

export function ProgramRequirements({ programId, sx, ...other }: ProgramRequirementsProps) {
  const { t } = useTranslate(programId, { keyPrefix: 'requirements' });

  const items = (t('items', { returnObjects: true, defaultValue: [] }) ?? []) as {
    title: string;
    description: string;
  }[];

  if (!items.length) {
    return null;
  }

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <Typography component="h2" variant="h2" sx={{ mb: SECTION_CONTENT_GAP }}>
            {renderEmphasis(t('title'))}
          </Typography>

          <Box
            sx={{
              gap: 3,
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            }}
          >
            {items.map((item, index) => (
              <Card
                key={item.title}
                component={m.div}
                variants={varFade({ distance: 24 }).inUp}
                sx={{ p: 3, display: 'flex', gap: 2, alignItems: 'flex-start' }}
              >
                <Iconify
                  icon={ICONS[index % ICONS.length]}
                  width={28}
                  sx={{ flexShrink: 0, color: 'text.primary' }}
                />

                <Stack spacing={0.5}>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </Stack>
              </Card>
            ))}
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}
