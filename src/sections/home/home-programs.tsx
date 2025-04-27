import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import type { CardProps } from '@mui/material/Card';

import { stylesMode } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { varAlpha } from 'src/theme/styles';
import { Iconify } from 'src/components/iconify';
import { MotionViewport } from 'src/components/animate';
import { Image } from 'src/components/image';

import { SectionTitle } from './components/section-title';
import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { SvgColor } from '../../components/svg-color';
import { paths } from '../../routes/paths';
import { useCallback, useState } from 'react';
import { ApplyToProgram } from '../cta/apply-to-program';
import Rating from '@mui/material/Rating';
import { Chip } from '@mui/material';

// ----------------------------------------------------------------------

export const PROGRAMS = [
  {
    id: 'webDevelopment',
    title: 'programs.programs.webDevelopment.title',
    caption: 'programs.programs.webDevelopment.caption',
    icon: `${CONFIG.assetsDir}/assets/icons/programs/web-development.svg`,
    levelIcon: `${CONFIG.assetsDir}/assets/icons/programs/beginner.svg`,
    level: 'programs.levels.beginner',
    link: paths.programs.fe,
    monthlyPrice: 90,
    price: 250,
    originalPrice: 500,
    reviews: 6,
    features: [
      'programs.programs.webDevelopment.features.0',
      'programs.programs.webDevelopment.features.1',
      'programs.programs.webDevelopment.features.2',
      'programs.programs.webDevelopment.features.3',
      'programs.programs.webDevelopment.features.4',
    ],
  },
  {
    id: 'productDesign',
    title: 'programs.programs.productDesign.title',
    caption: 'programs.programs.productDesign.caption',
    icon: `${CONFIG.assetsDir}/assets/icons/programs/product-design.svg`,
    levelIcon: `${CONFIG.assetsDir}/assets/icons/programs/beginner.svg`,
    level: 'programs.levels.beginner',
    link: paths.programs.ux,
    monthlyPrice: 90,
    price: 250,
    originalPrice: 500,
    reviews: 4,
    features: [
      'programs.programs.webDevelopment.features.0',
      'programs.programs.webDevelopment.features.1',
      'programs.programs.webDevelopment.features.2',
      'programs.programs.webDevelopment.features.3',
      'programs.programs.webDevelopment.features.4',
    ],
  },
];

// ----------------------------------------------------------------------

export function HomePrograms({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');

  return (
    <Box
      component="section"
      sx={{ my: { xs: 10, md: 15 }, position: 'relative', ...sx }}
      {...other}
    >
      <MotionViewport>
        <Container sx={{ position: 'relative' }}>
          <SectionTitle
            title={t('programs.title')}
            description={t('programs.description')}
            sx={{ mb: 8, textAlign: 'center' }}
          />

          <Box
            gap={{ xs: 3, md: 0 }}
            display="grid"
            alignItems={{ md: 'center' }}
            gridTemplateColumns={{ md: 'repeat(2, 1fr)' }}
          >
            {PROGRAMS.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} />
            ))}
          </Box>
        </Container>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

type Props = CardProps & {
  index: number;
  program: {
    id: string;
    title: string;
    caption: string;
    icon: string;
    levelIcon: string;
    level: string;
    link: string;
    price: number;
    monthlyPrice: number;
    reviews: number;
    originalPrice: number;
    features: string[];
  };
};

export function ProgramCard({ program, sx, ...other }: Props) {
  const { t } = useTranslate('home');

  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState<boolean>(false);

  const openApplyDialog = useCallback(() => {
    setIsApplyDialogOpen(true);
  }, []);

  const closeApplyDialog = useCallback(() => {
    setIsApplyDialogOpen(false);
  }, []);

  const {
    id,
    title,
    caption,
    icon,
    price,
    monthlyPrice,
    originalPrice,
    features,
    levelIcon,
    level,
    link,
    reviews,
  } = program;

  const renderIcon = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <SvgColor src={icon} width={76} bgcolor={'primary'} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Image alt={`${t(level)} icon`} src={levelIcon} width={24} height={24} />
        <Typography variant="subtitle1" color="text.secondary" autoCapitalize="on">
          {t(level)}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderRating = (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ typography: 'subtitle2' }}>
      <Rating size="small" name="read-only" value={5} precision={0.5} readOnly />
      <Typography variant="subtitle2" color="text.secondary">
        ({reviews} {t('programs.reviews')})
      </Typography>
    </Stack>
  );

  const renderSubscription = (
    <Stack spacing={1}>
      <Typography variant="h3" autoCapitalize="on">
        {t(title)}
      </Typography>
      <Typography variant="h5" color="text.secondary">
        {t(caption)}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Chip
          icon={<Iconify icon="solar:shield-check-bold" />}
          label={t('programs.chips.moneyBackGuarantee')}
          color="success"
          sx={{ maxWidth: 'fit-content' }}
        />
        <Chip
          icon={<Iconify icon="solar:verified-check-bold" />}
          label={t('programs.chips.approvedByKursuok')}
          color="primary"
          sx={{ maxWidth: 'fit-content' }}
        />
      </Stack>
    </Stack>
  );

  const renderPrice = (
    <Stack direction="column" spacing={1.5}>
      <Stack direction="row">
        <Box
          sx={(theme) => ({
            px: 1,
            borderRight: `3px solid ${theme.palette.error.main}`,
            borderBottom: `3px solid ${theme.palette.error.main}`,
            background: theme.palette.warning.light,
          })}
        >
          <Typography variant="h2">{monthlyPrice}€</Typography>
        </Box>

        <Typography
          component="span"
          sx={{
            alignSelf: 'flex-end',
            color: 'text.secondary',
            ml: 1,
            typography: 'h5',
          }}
        >
          {t('programs.pricing.paidMonthly')}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        {id === 'productDesign' && (
          <Label
            variant="filled"
            color="error"
            startIcon={<Iconify icon="eva:checkmark-fill" />}
            sx={{ maxWidth: 'fit-content' }}
          >
            {t('programs.chips.limitedSpaces')}
          </Label>
        )}
        <Label
          variant="soft"
          color="success"
          startIcon={<Iconify icon="eva:checkmark-fill" />}
          sx={{ maxWidth: 'fit-content' }}
        >
          {t('programs.chips.compatibleWithHolidays')}
        </Label>
      </Stack>
    </Stack>
  );

  const renderFeatures = (
    <Stack spacing={2}>
      {features.map((feature) => (
        <Stack
          key={feature}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
          {t(feature)}
        </Stack>
      ))}
    </Stack>
  );

  const renderCTA = (
    <Stack spacing={2}>
      <ApplyToProgram open={isApplyDialogOpen} onClose={closeApplyDialog} course={program.id} />
      <Button fullWidth size="large" variant="contained" onClick={openApplyDialog}>
        {t('programs.cta.apply')}
      </Button>

      <Button fullWidth size="large" variant="outlined" href={link}>
        {t('programs.cta.viewProgram')}
      </Button>
    </Stack>
  );

  return (
    <Stack
      spacing={4}
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.default',
        borderTopRightRadius: { md: 0 },
        borderBottomRightRadius: { md: 0 },
        boxShadow: (theme) => ({
          xs: theme.customShadows.card,
          md: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
        }),
        [stylesMode.dark]: {
          boxShadow: (theme) => ({
            xs: theme.customShadows.card,
            md: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
          }),
        },
        ...sx,
      }}
      {...other}
    >
      {renderIcon}

      {renderRating}

      {renderSubscription}

      {renderPrice}

      {renderFeatures}

      {renderCTA}
    </Stack>
  );
}
