import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { SECTION_PADDING } from 'src/theme/styles';

import { useTranslate } from '../../locales';

// ----------------------------------------------------------------------

// The programme's Kursuok.lt listing, where the rating and the reviews come from.
const KURSUOK_URL = 'https://www.kursuok.lt/mokymai/programa/ux-ui-web-dizaino-pagrindai-su-figma/';

interface ProgramFactsProps extends BoxProps {
  programId: string;
}

/** The practical numbers and the proof in one band, so neither is repeated further down. */
export function ProgramFacts({ programId, sx, ...other }: ProgramFactsProps) {
  const { t } = useTranslate(programId, { keyPrefix: 'facts' });

  const items = (t('items', { returnObjects: true, defaultValue: [] }) ?? []) as {
    value: string;
    label: string;
    /** Links the label to the Kursuok.lt listing the number can be checked against. */
    link?: boolean;
  }[];

  if (!items.length) {
    return null;
  }

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <Container>
        {/* A grid rather than a wrapping row, so a narrow desktop never leaves one stat alone. */}
        <Box
          sx={{
            rowGap: 4,
            columnGap: { xs: 3, md: 5 },
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: `repeat(${items.length}, 1fr)`,
            },
          }}
        >
          {items.map((item, index) => (
            <Stack
              key={item.label}
              spacing={0.5}
              sx={{
                textAlign: 'center',
                // An odd stat out would sit lopsided in two columns, so it takes the full row.
                ...(index === items.length - 1 &&
                  items.length % 2 === 1 && { gridColumn: { xs: '1 / -1', md: 'auto' } }),
              }}
            >
              <Typography component="p" variant="h3">
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* Numbers that can be checked link to their source. */}
                {item.link ? (
                  <Link
                    href={KURSUOK_URL}
                    target="_blank"
                    rel="noopener"
                    underline="always"
                    color="inherit"
                  >
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
