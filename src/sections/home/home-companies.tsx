import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { SECTION_PADDING } from 'src/theme/styles';

import { useTranslate } from '../../locales';

// ----------------------------------------------------------------------

const COMPANIES = [
  'european-commission.svg',
  'eeas.svg',
  'khu.svg',
  'ipl.svg',
  'ktu.svg',
  'vilnius-tech.svg',
];

// ----------------------------------------------------------------------

interface HomeCompaniesProps extends BoxProps {}

export function HomeCompanies({ sx, ...other }: HomeCompaniesProps) {
  const { t } = useTranslate('home');

  return (
    <Box
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        py: SECTION_PADDING,
        ...sx,
      }}
      {...other}
    >
      <Container sx={{ position: 'relative' }} maxWidth="xl">
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: { xs: 4, md: 5 }, textAlign: 'center', color: 'text.secondary' }}
          >
            {t('companies.caption')}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              // Column counts divide the 6 logos evenly, so no row is left with a single logo.
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                lg: 'repeat(6, 1fr)',
              },
              alignItems: 'center',
              justifyItems: 'center',
              rowGap: 4,
              columnGap: 8,
            }}
          >
            {COMPANIES.map((logo, index) => (
              <Box
                key={index}
                component="img"
                src={`${CONFIG.assetsDir}/assets/images/home/companies/${logo}`}
                alt={`${logo.replace('.svg', '')} logo`}
                sx={{
                  height: 36,
                  // The logos come in clashing brand colours; grey lets them read as one set
                  // and keeps the mentors' story, not the badges, in the foreground.
                  filter: 'grayscale(1)',
                  opacity: 0.6,
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
