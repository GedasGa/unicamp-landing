import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { useTranslate } from '../../locales';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Iconify } from '../../components/iconify';
import Card, { type CardProps } from '@mui/material/Card';
import Link from '@mui/material/Link';
import { paths } from '../../routes/paths';
import posthog from 'posthog-js';

// ---------------------------------------------------------------------
const EXPECTATIONS = [
  {
    icon: 'mdi:google-analytics',
    title: 'expectations.cards.0.title',
    description: 'expectations.cards.0.description',
    link: {
      text: 'expectations.cards.0.link.text',
      url: 'expectations.cards.0.link.url',
    },
  },
  {
    icon: 'mdi:company',
    title: 'expectations.cards.1.title',
    description: 'expectations.cards.1.description',
  },
  {
    icon: 'mdi:island',
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
    <Box
      component="section"
      sx={{ py: { xs: 4, md: 20 }, px: { xs: 2, md: 15 }, ...sx }}
      {...other}
    >
      <Stack spacing={{ xs: 2, md: 7 }} alignItems="center">
        <Stack spacing={2} textAlign={{ xs: 'left', md: 'center' }}>
          <Typography variant="h2">{t('expectations.title')}</Typography>
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
        <Iconify icon={expectation.icon} />
        <Stack spacing={0.75} alignItems="flex-start">
          <Typography variant="h4">{t(expectation.title)}</Typography>
          <Typography variant="body1" color="text.secondary">
            {t(expectation.description)}
          </Typography>
          {expectation?.link && (
            <Button
              component={Button}
              sx={{ color: 'primary.main' }}
              size="large"
              href={t(expectation.link.url)}
              // target="_blank"
            >
              <Stack direction="row" spacing={0.75}>
                {t(expectation.link.text)} <Iconify icon="solar:arrow-right-up-linear" />
              </Stack>
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
