import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card, { type CardProps } from '@mui/material/Card';

import { SECTION_PADDING } from 'src/theme/styles';

import { useTranslate } from '../../locales';
import { Iconify } from '../../components/iconify';
import { renderEmphasis } from '../home/components/section-title';

// ---------------------------------------------------------------------
const EXPECTATIONS = [
  {
    icon: 'iconmind:cash-outline-thin',
    title: 'expectations.cards.0.title',
    description: 'expectations.cards.0.description',
    link: {
      text: 'expectations.cards.0.link.text',
      url: 'expectations.cards.0.link.url',
    },
  },
  {
    icon: 'iconmind:home-office-outline-thin',
    title: 'expectations.cards.1.title',
    description: 'expectations.cards.1.description',
  },
  {
    icon: 'iconmind:beach-outline-thin',
    title: 'expectations.cards.2.title',
    description: 'expectations.cards.2.description',
  },
];

// ----------------------------------------------------------------------

interface ProgramExpectationsProps extends BoxProps {
  programId: string;
  openApplyDialog: () => void;
}

export function ProgramExpectations({
  programId,
  openApplyDialog,
  sx,
  ...other
}: ProgramExpectationsProps) {
  const { t } = useTranslate(programId);

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <Container>
        <Stack spacing={{ xs: 2, md: 7 }} alignItems="center">
          <Stack spacing={2} textAlign={{ xs: 'left', md: 'center' }}>
            <Typography variant="h2">{renderEmphasis(t('expectations.title'))}</Typography>
            <Typography variant="body1" color="text.secondary">
              {t('expectations.description')}
            </Typography>
          </Stack>
          <Stack
            spacing={3}
            flexDirection={{ xs: 'column', md: 'row' }}
            sx={{ width: { xs: '100%', md: 'inherit' } }}
          >
            {EXPECTATIONS.map((expectation) => (
              <ExpectationsCard
                key={expectation.title}
                expectation={expectation}
                programId={programId}
              />
            ))}
          </Stack>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, width: { xs: '100%', md: 'fit-content' } }}
            onClick={openApplyDialog}
          >
            {t('expectations.cta')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ExpectationsCardProps = CardProps & {
  programId: string;
  expectation: (typeof EXPECTATIONS)[number];
};

const ExpectationsCard = ({ expectation, programId, sx, ...other }: ExpectationsCardProps) => {
  const { t } = useTranslate(programId);

  return (
    <Card sx={{ p: 3, bgcolor: 'grey.100', ...sx }} {...other}>
      <Stack spacing={2}>
        <Iconify icon={expectation.icon} width={32} />
        <Stack spacing={0.75} alignItems="flex-start">
          <Typography variant="h4">{t(expectation.title)}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t(expectation.description)}
          </Typography>
          {expectation?.link && (
            <Button
              color="inherit"
              size="large"
              href={t(expectation.link.url)}
              target="_blank"
              rel="noopener"
              endIcon={<Iconify icon="solar:arrow-right-up-linear" />}
            >
              {t(expectation.link.text)}
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
