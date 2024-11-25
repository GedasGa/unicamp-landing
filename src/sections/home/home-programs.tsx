import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import type { CardProps } from '@mui/material/Card';

import Link from '@mui/material/Link';

import { stylesMode } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { varAlpha } from 'src/theme/styles';
import { Iconify } from 'src/components/iconify';
import { MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { useTranslate } from '../../locales';
import { CONFIG } from '../../config-global';
import { SvgColor } from '../../components/svg-color';
import SvgIcon from '@mui/material/SvgIcon';

// ----------------------------------------------------------------------

export const PROGRAMS = [
  {
    id: 'webDevelopment',
    title: 'programs.programs.webDevelopment.title',
    caption: 'programs.programs.webDevelopment.caption',
    icon: `${CONFIG.assetsDir}/assets/icons/programs/web-development.svg`,
    levelIcon: `${CONFIG.assetsDir}/assets/icons/programs/beginner.svg`,
    level: 'programs.levels.beginner',
    price: 0,
    originalPrice: 500,
    specializations: [
      'programs.programs.webDevelopment.specializations.0',
      'programs.programs.webDevelopment.specializations.1',
      'programs.programs.webDevelopment.specializations.2',
    ],
    tools: [
      'programs.programs.webDevelopment.tools.0',
      'programs.programs.webDevelopment.tools.1',
      'programs.programs.webDevelopment.tools.2',
      'programs.programs.webDevelopment.tools.3',
      'programs.programs.webDevelopment.tools.4',
      'programs.programs.webDevelopment.tools.5',
      'programs.programs.webDevelopment.tools.6',
      'programs.programs.webDevelopment.tools.7',
      'programs.programs.webDevelopment.tools.8',
      'programs.programs.webDevelopment.tools.9',
    ],
    topics: [
      'programs.programs.webDevelopment.topics.0',
      'programs.programs.webDevelopment.topics.1',
      'programs.programs.webDevelopment.topics.2',
      'programs.programs.webDevelopment.topics.3',
      'programs.programs.webDevelopment.topics.4',
      'programs.programs.webDevelopment.topics.5',
      'programs.programs.webDevelopment.topics.6',
      'programs.programs.webDevelopment.topics.7',
      'programs.programs.webDevelopment.topics.8',
      'programs.programs.webDevelopment.topics.9',
      'programs.programs.webDevelopment.topics.10',
      'programs.programs.webDevelopment.topics.11',
    ],
  },
  {
    id: 'productDesign',
    title: 'programs.programs.productDesign.title',
    caption: 'programs.programs.productDesign.caption',
    icon: `${CONFIG.assetsDir}/assets/icons/programs/product-design.svg`,
    levelIcon: `${CONFIG.assetsDir}/assets/icons/programs/beginner.svg`,
    level: 'programs.levels.beginner',
    price: 0,
    originalPrice: 500,
    specializations: [
      'programs.programs.productDesign.specializations.0',
      'programs.programs.productDesign.specializations.1',
      'programs.programs.productDesign.specializations.2',
    ],
    tools: [
      'programs.programs.productDesign.tools.0',
      'programs.programs.productDesign.tools.1',
      'programs.programs.productDesign.tools.2',
    ],
    topics: [
      'programs.programs.productDesign.topics.0',
      'programs.programs.productDesign.topics.1',
      'programs.programs.productDesign.topics.2',
      'programs.programs.productDesign.topics.3',
      'programs.programs.productDesign.topics.4',
      'programs.programs.productDesign.topics.5',
      'programs.programs.productDesign.topics.6',
      'programs.programs.productDesign.topics.7',
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
    price: number;
    originalPrice: number;
    specializations: string[];
    tools: string[];
    topics: string[];
  };
};

export function ProgramCard({ program, sx, ...other }: Props) {
  const { t } = useTranslate('home');

  const {
    id,
    title,
    caption,
    icon,
    price,
    originalPrice,
    specializations,
    tools,
    topics,
    levelIcon,
    level,
  } = program;

  const renderIcon = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <SvgColor src={icon} width={76} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Box alt={`${t(level)} icon`} component="img" src={levelIcon} width={24} height={24} />
        <Typography variant="subtitle1" color="text.secondary" autoCapitalize="on">
          {t(level)}
        </Typography>
      </Stack>
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
    </Stack>
  );

  const renderPrice = (
    <Stack direction="row">
      <Typography variant="h2" color="error.main">
        {price}€
      </Typography>

      <Typography
        component="span"
        sx={{
          alignSelf: 'flex-end',
          color: 'text.disabled',
          textDecoration: 'line-through',
          ml: 1,
          typography: 'h3',
        }}
      >
        {originalPrice}€
      </Typography>
    </Stack>
  );

  const renderSpecializations = (
    <Stack direction="column" spacing={1}>
      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
        {t('programs.list.specializations')}
      </Typography>
      <Stack direction="row" spacing={2}>
        {specializations.map((specialization) => (
          <Label key={specialization}>{t(specialization)}</Label>
        ))}
      </Stack>
    </Stack>
  );

  const renderTools = (
    <Stack direction="column" spacing={1}>
      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
        {t('programs.list.tools')}
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {tools.map((tool) => (
          <Label key={tool}>{t(tool)}</Label>
        ))}
      </Stack>
    </Stack>
  );

  const renderTopics = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          {t('programs.list.topics')}
        </Box>
      </Stack>

      {topics.map((topic) => (
        <Stack
          key={topic}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
          {t(topic)}
        </Stack>
      ))}
    </Stack>
  );

  const renderCTA = (
    <Stack spacing={2}>
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={() => {
          // @ts-ignore Injected to document object
          OpenWidget.call('maximize', { feature: 'form-contact' });
        }}
      >
        {t('programs.cta.apply')}
      </Button>

      {/*TODO: Add view programs later*/}
      {/*<Button fullWidth size="large" variant="outlined">*/}
      {/*  {t('programs.cta.viewProgram')}*/}
      {/*</Button>*/}
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

      {renderSubscription}

      {renderPrice}

      {renderSpecializations}

      {renderTools}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderTopics}

      {renderCTA}
    </Stack>
  );
}
