import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { useTranslate } from '../../locales';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Iconify } from '../../components/iconify';
import Card, { type CardProps } from '@mui/material/Card';
import Link from '@mui/material/Link';

// ---------------------------------------------------------------------
const EXPECTATIONS = [
  {
    icon: 'material-symbols:analytics-outline',
    title: 'ux.expectations.0.title',
    description: 'ux.expectations.0.description',
    link: {
      text: 'ux.expectations.0.link.text',
      url: 'ux.expectations.0.link.url',
    },
  },
  {
    icon: 'material-symbols:analytics-outline',
    title: 'ux.expectations.1.title',
    description: 'ux.expectations.1.description',
  },
  {
    icon: 'material-symbols:analytics-outline',
    title: 'ux.expectations.2.title',
    description: 'ux.expectations.2.description',
  },
];

// ----------------------------------------------------------------------

export function ProgramMentor({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('programs');

  return (
    <Box
      component="section"
      sx={{ py: { xs: 4, sm: 10 }, px: { xs: 2, sm: 15 }, ...sx }}
      {...other}
    >
      <Stack spacing={{ xs: 2, sm: 7 }} alignItems={{ xs: 'flex-start', sm: 'center' }}>
        <Stack spacing={2} textAlign={{ xs: 'left', sm: 'center' }}>
          <Typography variant="h2">What expect after courses?</Typography>
          <Typography variant="body1" color="text.secondary">
            Hipster ipsum tattooed brunch I'm baby. Echo santo next coffee kombucha pin.
          </Typography>
        </Stack>
        <Stack spacing={3} flexDirection={{ xs: 'column', sm: 'row' }}>
          {EXPECTATIONS.map((expectation) => (
            <ExpectationsCard key={expectation.title} expectation={expectation} />
          ))}
        </Stack>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 4, width: { xs: '100%', sm: 'fit-content' } }}
        >
          Register to program
        </Button>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ExpectationsCardProps = CardProps & {
  expectation: (typeof EXPECTATIONS)[number];
};

const ExpectationsCard = ({ expectation, sx, ...other }: ExpectationsCardProps) => {
  const { t } = useTranslate('programs');

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
            <Link
              component={Button}
              sx={{ color: 'primary.main' }}
              size="large"
              href={t(expectation.link.url)}
              target="_blank"
            >
              <Stack direction="row" spacing={0.75}>
                {t(expectation.link.text)} <Iconify icon="solar:arrow-right-up-linear" />
              </Stack>
            </Link>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
