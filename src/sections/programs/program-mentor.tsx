import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { useTranslate } from '../../locales';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CONFIG } from '../../config-global';

// ----------------------------------------------------------------------

const MENTORS = {
  productDesign: {
    background: '#0E100F',
    image: `${CONFIG.assetsDir}/assets/images/programs/mentors/Aiste.png`,
  },
  webDevelopment: {
    background: 'linear-gradient(270deg, #929C9D 0%, #888D91 62.02%, #90989A 100%)',
    image: `${CONFIG.assetsDir}/assets/images/programs/mentors/Gedas.png`,
  },
};

// ----------------------------------------------------------------------
interface ProgramMentorProps extends BoxProps {
  programId: string;
}

export function ProgramMentor({ programId, sx, ...other }: ProgramMentorProps) {
  const { t } = useTranslate(programId);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 10 },
        px: { xs: 2, md: 15 },
        // @ts-ignore
        background: MENTORS[programId].background,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'bottom',
        gap: 4,
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={{ xs: 2, md: 3 }} alignItems="flex-start" flex={1}>
        <Typography variant="h2" color="common.white">
          {t('mentor.title')}
        </Typography>
        <Stack spacing={1}>
          <Typography variant="subtitle1" color="common.white">
            {t('mentor.name')}
          </Typography>
          {/* @ts-ignore */}
          <Typography variant="body2" color="common.white">
            {t('mentor.role')}
          </Typography>
          {/* @ts-ignore */}
          <Typography variant="body1" color="common.white">
            {t('mentor.description')}
          </Typography>
        </Stack>
        <Button
          size="large"
          target="_blank"
          href={t('mentor.cta.link')}
          sx={{
            color: 'common.black',
            bgcolor: 'common.white',
            '&:hover': { bgcolor: 'grey.200' },
          }}
        >
          {t('mentor.cta.text')}
        </Button>
      </Stack>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: { xs: '100%' },
          maxWidth: { xs: 'inherit', md: '600px' },
          height: 'auto',
          my: { xs: -4, md: -10 },
          mr: { xs: -2, md: -15 },
          overflow: 'hidden',
        }}
        flex={1}
      >
        <Box
          component="img"
          // @ts-ignore
          src={MENTORS[programId].image}
          alt={t('mentor.name')}
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  );
}
