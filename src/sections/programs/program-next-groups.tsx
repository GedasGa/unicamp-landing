import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { useTranslate } from '../../locales';
import { Stack, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Iconify } from '../../components/iconify';
import Card, { type CardProps } from '@mui/material/Card';
import Link from '@mui/material/Link';
import { paths } from '../../routes/paths';
import { bgBlur, varAlpha } from '../../theme/styles';

// ---------------------------------------------------------------------
const NEXT_GROUPS = [
  {
    date: 'ux.nextGroups.0.date',
    deadline: '2025-03-03',
  },
  {
    date: 'ux.nextGroups.1.date',
    deadline: '2025-03-20',
  },
];

// ----------------------------------------------------------------------

export function ProgramNextGroups({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('programs');

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, sm: 20 },
        px: { xs: 2, sm: 15 },
        background: 'linear-gradient(96deg, #F84B9F 2.48%, #FF6A35 98.13%)',
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={{ xs: 2, sm: 7 }} alignItems="center">
        <Stack spacing={2} textAlign={{ xs: 'left', sm: 'center' }}>
          <Typography variant="h2" color="common.white">
            Limited seats. Apply now!
          </Typography>
          <Typography variant="body1" color="common.white">
            Reserver your seat before group closes.
          </Typography>
        </Stack>
        <Stack
          spacing={3}
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ width: { xs: '100%', sm: 'inherit' } }}
        >
          {NEXT_GROUPS.map((group) => (
            <NextGroupCard key={group.date} group={group} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type NextGroupCardProps = CardProps & {
  group: (typeof NEXT_GROUPS)[number];
};

const NextGroupCard = ({ group, sx, ...other }: NextGroupCardProps) => {
  const { t } = useTranslate('programs');
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        ...bgBlur({
          color: varAlpha(theme.vars.palette.background.paperChannel, 0.09),
          blur: 20,
        }),
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={4}>
        <Stack spacing={0.75} alignItems="flex-start">
          <Typography variant="h4" color="common.white">
            {t(group.date)}
          </Typography>
          <Typography variant="body1" color="common.white">
            {t('deadlineForApplication')}: {t(group.deadline)}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            width: '100%',
            color: 'common.black',
            bgcolor: 'common.white',
            '&:hover': { bgcolor: 'grey.200' },
          }}
        >
          Apply now!
        </Button>
      </Stack>
    </Card>
  );
};
