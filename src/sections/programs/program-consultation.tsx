import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { SECTION_PADDING } from 'src/theme/styles';

import { MotionViewport } from 'src/components/animate';

import { ConsultationCard } from '../home/consultation-card';

// ----------------------------------------------------------------------

/** The home page's free-consultation card, for people weighing up one programme. */
export function ProgramConsultation({ sx, ...other }: BoxProps) {
  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <MotionViewport>
        <Container>
          <ConsultationCard />
        </Container>
      </MotionViewport>
    </Box>
  );
}
