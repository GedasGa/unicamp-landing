import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import { Chip, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card, { type CardProps } from '@mui/material/Card';

import { SECTION_PADDING, SECTION_CONTENT_GAP } from 'src/theme/styles';

import { useTranslate } from '../../locales';
import { Iconify } from '../../components/iconify';
import { renderEmphasis } from '../home/components/section-title';

// ---------------------------------------------------------------------
const PRICES = [
  {
    title: 'prices.0.title',
    description: 'prices.0.description',
    price: 'prices.0.price',
  },
  {
    title: 'prices.1.title',
    description: 'prices.1.description',
    price: 'prices.1.price',
  },
  {
    title: 'prices.2.title',
    description: 'prices.2.description',
    price: 'prices.2.price',
    // The option we point people to; marked rather than reordered.
    recommended: true,
  },
];

// ----------------------------------------------------------------------
interface ProgramPricingProps extends BoxProps {
  programId: string;
}

export function ProgramPricing({ programId, sx, ...other }: ProgramPricingProps) {
  const { t } = useTranslate(programId, { keyPrefix: 'pricing' });

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <Container>
        <Stack spacing={2} alignItems="flex-start" sx={{ mb: SECTION_CONTENT_GAP }}>
          <Typography component="h2" variant="h2">
            {renderEmphasis(t('title'))}
          </Typography>
          <Chip
            variant="outlined"
            icon={<Iconify icon="iconmind:shield-check-outline-thin" />}
            label={t('chip')}
          />
        </Stack>

        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {PRICES.map((price) => (
            <PriceCard key={price.title} price={price} programId={programId} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

type PriceCardProps = CardProps & {
  price: (typeof PRICES)[number];
  programId: string;
};

const PriceCard = ({ price, programId, sx, ...other }: PriceCardProps) => {
  const { t } = useTranslate(programId, { keyPrefix: 'pricing' });

  return (
    <Card
      sx={{
        p: 3,
        // The recommended card is outlined in the same near-black as the primary
        // buttons, so "this is the one" reads the way it does everywhere else.
        // Its padding gives back the 2px the border takes, so the three prices
        // stay on exactly the same line.
        ...(price.recommended && {
          p: 2.75,
          border: '2px solid',
          borderColor: 'text.primary',
          boxShadow: 'none',
          // Card clips its children by default; the label sits on the border.
          overflow: 'visible',
        }),
        ...sx,
      }}
      {...other}
    >
      <Stack spacing={1} alignItems="flex-start">
        {/* Centred on the top border, so the other cards need no room for it. */}
        {price.recommended && (
          <Chip
            size="small"
            label={t('recommended')}
            sx={{
              // Absolute offsets start inside the border, so -1px straddles its 2px.
              top: '-1px',
              left: '50%',
              zIndex: 1,
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        {/* The option is the label; the number is what the card is really saying. */}
        <Typography component="h3" variant="overline" sx={{ color: 'text.secondary' }}>
          {t(price.title)}
        </Typography>

        <Typography component="p" variant="h3">
          {t(price.price)}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t(price.description)}
        </Typography>
      </Stack>
    </Card>
  );
};
