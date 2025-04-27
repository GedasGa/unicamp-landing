import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';

import { useTranslate } from '../../locales';
import { Chip, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Iconify } from '../../components/iconify';
import Card, { type CardProps } from '@mui/material/Card';

// ---------------------------------------------------------------------
const PRICES = [
  {
    title: 'prices.0.title',
    description: 'prices.0.description',
    price: 'prices.0.price',
    discount: {
      originalPrice: 'prices.0.originalPrice',
      percentage: '-50%',
    },
  },
  {
    title: 'prices.1.title',
    description: 'prices.1.description',
    price: 'prices.1.price',
    discount: {
      originalPrice: 'prices.1.originalPrice',
      percentage: '-50%',
    },
  },
  // TODO: Uncomment once financial aid is available
  // {
  //   title: 'prices.2.title',
  //   description: 'prices.2.description',
  //   price: 'prices.2.price',
  // },
];

// ----------------------------------------------------------------------
interface ProgramPricingProps extends BoxProps {
  programId: string;
}

export function ProgramPricing({ programId, sx, ...other }: ProgramPricingProps) {
  const { t } = useTranslate(programId, { keyPrefix: 'pricing' });

  return (
    <Box
      component="section"
      sx={{ py: { xs: 4, md: 20 }, px: { xs: 2, md: 15 }, ...sx }}
      {...other}
    >
      <Stack spacing={{ xs: 2, md: 7 }} alignItems="center">
        <Stack spacing={2} alignSelf="start">
          <Typography variant="h2">{t('title')}</Typography>
          <Chip
            icon={<Iconify icon="solar:shield-check-bold" />}
            label={t('chip')}
            color="success"
            sx={{ maxWidth: 'fit-content' }}
          />
        </Stack>
        <Stack
          spacing={3}
          flexDirection={{ xs: 'column', md: 'row' }}
          sx={{ width: { xs: '100%' } }}
        >
          {PRICES.map((price) => (
            <PriceCardProps
              key={price.title}
              price={price}
              programId={programId}
              sx={{ flex: 1 }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type PriceCardProps = CardProps & {
  price: (typeof PRICES)[number];
  programId: string;
};

const PriceCardProps = ({ price, programId, sx, ...other }: PriceCardProps) => {
  const { t } = useTranslate(programId, { keyPrefix: 'pricing' });

  return (
    <Card sx={{ p: 3, bgcolor: 'grey.100', ...sx }} {...other}>
      <Stack spacing={1.5} alignItems={'flex-start'}>
        <Stack flexDirection={'row'} justifyContent={'space-between'} sx={{ width: '100%' }}>
          <Typography variant="h4">{t(price.title)}</Typography>
          {price.discount && <Chip label={price.discount.percentage} color="error" />}
        </Stack>
        <Stack spacing={1} flexDirection={'row'} alignItems={'end'}>
          <Box
            sx={(theme) => ({
              px: 1,
              borderRight: `3px solid ${theme.palette.error.main}`,
              borderBottom: `3px solid ${theme.palette.error.main}`,
              background: theme.palette.warning.light,
            })}
          >
            <Typography variant="h5">{t(price.price)}</Typography>
          </Box>
          {price.discount && (
            <Typography variant="h6" color="error" sx={{ textDecoration: 'line-through' }}>
              {t(price.discount.originalPrice)}
            </Typography>
          )}
        </Stack>

        <Typography variant="body1" color="text.secondary">
          {t(price.description)}
        </Typography>
      </Stack>
    </Card>
  );
};
