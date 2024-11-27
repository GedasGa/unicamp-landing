import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './components/section-title';
import { FloatLine, FloatPlusIcon, FloatTriangleDownIcon } from './components/svg-elements';
import { useTranslate } from '../../locales';
import Divider from '@mui/material/Divider';
import { TFunction } from 'i18next';

// ----------------------------------------------------------------------

const FAQs = (t: TFunction<string | 'translation', undefined>) => [
  {
    question: t('faqs.questions.0.question'),
    answer: <Typography>{t('faqs.questions.0.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.1.question'),
    answer: <Typography>{t('faqs.questions.1.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.2.question'),
    answer: <Typography>{t('faqs.questions.2.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.3.question'),
    answer: <Typography>{t('faqs.questions.3.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.4.question'),
    answer: <Typography>{t('faqs.questions.4.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.5.question'),
    answer: <Typography>{t('faqs.questions.5.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.6.question'),
    answer: <Typography>{t('faqs.questions.6.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.7.question'),
    answer: <Typography>{t('faqs.questions.7.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.8.question'),
    answer: <Typography>{t('faqs.questions.8.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.9.question'),
    answer: <Typography>{t('faqs.questions.9.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.10.question'),
    answer: <Typography>{t('faqs.questions.10.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.11.question'),
    answer: <Typography>{t('faqs.questions.11.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.12.question'),
    answer: <Typography>{t('faqs.questions.12.answer')}</Typography>,
  },
  {
    question: t('faqs.questions.13.question'),
    answer: <Typography>{t('faqs.questions.13.answer')}</Typography>,
  },
];

// ----------------------------------------------------------------------

export function HomeFAQs({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('home');

  const questions = FAQs(t);

  const [expanded, setExpanded] = useState<string | false>(questions[0].question);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderDescription = (
    <SectionTitle
      caption={t('faqs.caption')}
      title={t('faqs.title')}
      sx={{ textAlign: 'center' }}
    />
  );

  const renderContent = (
    <Stack
      spacing={1}
      sx={{
        mx: 'auto',
        maxWidth: 720,
        my: { xs: 5, md: 10 },
      }}
    >
      {questions.map((item, index) => (
        <Accordion
          key={item.question}
          component={m.div}
          variants={varFade({ distance: 24 }).inUp}
          expanded={expanded === item.question}
          onChange={handleChange(item.question)}
          sx={{
            borderRadius: 2,
            transition: (theme) =>
              theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.short,
              }),
            '&::before': { display: 'none' },
            '&:hover': {
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
            },
            '&:first-of-type, &:last-of-type': { borderRadius: 2 },
            [`&.${accordionClasses.expanded}`]: {
              m: 0,
              borderRadius: 2,
              boxShadow: 'none',
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            },
            [`& .${accordionSummaryClasses.root}`]: {
              py: 3,
              px: 2.5,
              minHeight: 'auto',
              [`& .${accordionSummaryClasses.content}`]: {
                m: 0,
                [`&.${accordionSummaryClasses.expanded}`]: { m: 0 },
              },
            },
            [`& .${accordionDetailsClasses.root}`]: { px: 2.5, pt: 0, pb: 3 },
          }}
        >
          <AccordionSummary
            expandIcon={
              <Iconify
                width={20}
                icon={expanded === item.question ? 'mingcute:minimize-line' : 'mingcute:add-line'}
              />
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography variant="h6"> {item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>{item.answer}</AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );

  const renderContact = (
    <Stack
      alignItems="center"
      sx={{
        px: 3,
        py: 8,
        textAlign: 'center',
        background: (theme) =>
          `linear-gradient(270deg, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}, ${varAlpha(theme.vars.palette.grey['500Channel'], 0)})`,
      }}
    >
      <m.div variants={varFade().in}>
        <Typography variant="h4">{t('faqs.contact.heading')}</Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          {t('faqs.contact.description')}
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Button
          color="inherit"
          variant="contained"
          onClick={() => {
            // @ts-ignore Injected to document object
            OpenWidget.call('maximize', { feature: 'form-contact' });
          }}
          startIcon={<Iconify icon="fluent:mail-24-filled" />}
        >
          {t('faqs.contact.cta')}
        </Button>
      </m.div>
    </Stack>
  );

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <MotionViewport sx={{ py: 10, position: 'relative' }}>
        <TopLines />

        <Container>
          {renderDescription}
          {renderContent}
        </Container>

        <Stack sx={{ position: 'relative' }}>
          <BottomLines />
          {renderContact}
        </Stack>
      </MotionViewport>
    </Box>
  );
}

// ----------------------------------------------------------------------

function TopLines() {
  return (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          position: 'absolute',
          transform: 'translateX(-15px)',
        }}
      >
        <FloatTriangleDownIcon sx={{ position: 'static', opacity: 0.12 }} />
        <FloatTriangleDownIcon
          sx={{
            position: 'static',
            opacity: 0.24,
            width: 30,
            height: 15,
          }}
        />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );
}

function BottomLines() {
  return (
    <>
      <FloatLine sx={{ top: 0, left: 0 }} />
      <FloatLine sx={{ bottom: 0, left: 0 }} />
      <FloatPlusIcon sx={{ top: -8, left: 72 }} />
      <FloatPlusIcon sx={{ bottom: -8, left: 72 }} />
    </>
  );
}
