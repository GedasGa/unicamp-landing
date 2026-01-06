import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { CONFIG } from 'src/config-global';

import { useTranslate } from '../../locales';

// ----------------------------------------------------------------------

const COMPANIES = [
  'speechify.svg',
  'european-commission.svg',
  'ovoko.svg',
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
        py: { xs: 4, md: 6 },
        ...sx,
      }}
      {...other}
    >
      <Container sx={{ position: 'relative' }} maxWidth="xl">
        <Box component="section" {...other}>
          <Stack
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            sx={{
              flexWrap: 'wrap',
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
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
