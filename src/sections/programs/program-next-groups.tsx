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
import posthog from 'posthog-js';

// ---------------------------------------------------------------------
const NEXT_GROUPS = [
  {
    date: 'groups.0.date',
    deadline: 'groups.0.deadline',
  },
  {
    date: 'groups.1.date',
    deadline: 'groups.0.deadline',
  },
];

// ----------------------------------------------------------------------

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

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 20 },
        px: { xs: 2, md: 15 },
        background: 'linear-gradient(96deg, #F84B9F 2.48%, #FF6A35 98.13%)',
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={{ xs: 2, md: 7 }} alignItems="center">
        <Stack spacing={2} textAlign={{ xs: 'left', md: 'center' }}>
          <Typography variant="h2" color="common.white">
            {t('title')}
          </Typography>
          <Typography variant="body1" color="common.white">
            {t('subtitle')}
          </Typography>
        </Stack>
        <Stack
          spacing={3}
          flexDirection={{ xs: 'column', md: 'row' }}
          sx={{ width: { xs: '100%', md: 'inherit' } }}
        >
          {NEXT_GROUPS.map((group) => (
            <NextGroupCard
              key={group.date}
              group={group}
              programId={programId}
              openApplyDialog={openApplyDialog}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type NextGroupCardProps = CardProps & {
  group: (typeof NEXT_GROUPS)[number];
  programId: string;
  openApplyDialog: () => void;
};

const NextGroupCard = ({ group, programId, openApplyDialog, sx, ...other }: NextGroupCardProps) => {
  const { t } = useTranslate(programId, { keyPrefix: 'nextGroups' });
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
            {t(group.deadline)}
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
          onClick={openApplyDialog}
        >
          {t('cta')}
        </Button>
      </Stack>
    </Card>
  );
};
