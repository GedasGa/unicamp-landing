import type { BoxProps } from '@mui/material/Box';

import { keyframes } from '@emotion/react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { SECTION_PADDING } from 'src/theme/styles';

import { useTranslate } from '../../locales';

// ----------------------------------------------------------------------

// A shared height makes wide wordmarks dominate and compact marks look tiny, so each logo
// gets a height that gives it roughly the same visual area (√(area ÷ aspect ratio)),
// nudged down for dense, heavy marks like Kaching. Files are trimmed to their artwork.
const COMPANIES = [
  { file: 'hostinger.png', height: 30 },
  { file: 'kaching.svg', height: 24 },
  { file: 'ovoko.svg', height: 34 },
  { file: 'speechify.svg', height: 26 },
  { file: 'khu.svg', height: 37 },
  { file: 'ipl.svg', height: 30 },
  { file: 'ktu.svg', height: 48 },
  { file: 'vilnius-tech.svg', height: 42 },
];

// The track holds the logos twice, so sliding it by half its width loops seamlessly.
const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

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
        <Typography
          variant="body2"
          sx={{ mb: { xs: 4, md: 5 }, textAlign: 'center', color: 'text.secondary' }}
        >
          {t('companies.caption')}
        </Typography>

        <Box
          sx={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: 'max-content',
              animation: `${scroll} 40s linear infinite`,
              '&:hover': { animationPlayState: 'paused' },
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
                width: 1,
                flexWrap: 'wrap',
                justifyContent: 'center',
                rowGap: 4,
              },
            }}
          >
            {[false, true].map((isCopy) => (
              <Box
                key={String(isCopy)}
                aria-hidden={isCopy || undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0,
                  ...(isCopy && {
                    '@media (prefers-reduced-motion: reduce)': { display: 'none' },
                  }),
                }}
              >
                {COMPANIES.map(({ file, height }) => (
                  <Box
                    key={file}
                    component="img"
                    src={`${CONFIG.assetsDir}/assets/images/home/companies/${file}`}
                    alt={isCopy ? '' : `${file.replace(/\.\w+$/, '')} logo`}
                    sx={{
                      height: { xs: Math.round(height * 0.8), md: height },
                      // Spacing sits on each logo rather than as a flex gap, so both copies
                      // are exactly the same width and the loop has no visible jump.
                      mx: { xs: 3, md: 5 },
                      // The logos come in clashing brand colours; grey lets them read as one set
                      // and keeps the mentors' story, not the badges, in the foreground.
                      filter: 'grayscale(1)',
                      opacity: 0.6,
                    }}
                  />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
