import type { TFunction } from 'i18next';
import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';

import { RADIUS } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { SectionTitle } from './components/section-title';
import { SECTION_PADDING, SECTION_CONTENT_GAP } from './components/section-spacing';

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
      title={t('faqs.title')}
      description={t('faqs.description')}
      sx={{ textAlign: 'center' }}
    />
  );

  const renderContent = (
    <Stack
      spacing={2}
      sx={{
        mx: 'auto',
        maxWidth: 720,
        mt: SECTION_CONTENT_GAP,
        mb: { xs: 5, md: 10 },
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
            // Styled like the shared Card so FAQ items match the other cards on the page.
            borderRadius: RADIUS.lg,
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.card,
            '&::before': { display: 'none' },
            '&:first-of-type, &:last-of-type': { borderRadius: RADIUS.lg },
            [`&.${accordionClasses.expanded}`]: {
              m: 0,
              borderRadius: RADIUS.lg,
              boxShadow: (theme) => theme.customShadows.card,
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
    <Card
      sx={{
        px: 3,
        py: 8,
        mx: 'auto',
        maxWidth: 720,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
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
          size="large"
          variant="contained"
          onClick={() => {
            // @ts-ignore Injected to document object
            OpenWidget.call('maximize', { feature: 'form-contact' });
          }}
        >
          {t('faqs.contact.cta')}
        </Button>
      </m.div>
    </Card>
  );

  return (
    <Box component="section" sx={{ py: SECTION_PADDING, ...sx }} {...other}>
      <MotionViewport sx={{ position: 'relative' }}>
        <Container>
          {renderDescription}
          {renderContent}
        </Container>

        {renderContact}
      </MotionViewport>
    </Box>
  );
}
