import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { useTranslate } from '../../locales';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Iconify } from '../../components/iconify';
import Card, { type CardProps } from '@mui/material/Card';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------
interface ProgramMentorProps extends BoxProps {
  programName: string;
}

export function ProgramMentor({ programName, sx, ...other }: ProgramMentorProps) {
  const { t } = useTranslate(programName);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, sm: 10 },
        px: { xs: 2, sm: 15 },
        bgcolor: 'common.black',
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={{ xs: 2, sm: 3 }} alignItems={{ xs: 'center', sm: 'flex-start' }}>
        <Typography variant="h2" color="common.white">
          {t('mentor.title')}
        </Typography>
        <Stack spacing={1}>
          <Typography variant="subtitle1" color="common.white">
            {t('mentor.name')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('mentor.role')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t('mentor.description')}
          </Typography>
        </Stack>
        <Button
          size="large"
          sx={{
            color: 'common.black',
            bgcolor: 'common.white',
            '&:hover': { bgcolor: 'grey.200' },
          }}
        >
          {t('mentor.cta')}
        </Button>
      </Stack>
    </Box>
  );
}
