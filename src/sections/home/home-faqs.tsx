import type { BoxProps } from '@mui/material/Box';

import { useState } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { SECTION_PADDING, SECTION_CONTENT_GAP } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { BrandGlow } from './components/brand-glow';
import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

type FAQItem = { question: string; answer: string };

// ----------------------------------------------------------------------

type HomeFAQsProps = BoxProps & {
  /** Indexes of questions a page already answers in full, so the FAQ does not repeat it. */
  omit?: number[];
  /** Namespace holding `faqs.title`, `faqs.description` and `faqs.questions`. */
  ns?: string;
};

export function HomeFAQs({ omit = [], ns = 'home', sx, ...other }: HomeFAQsProps) {
  const { t } = useTranslate(ns);

  // The "still have questions?" card is the same on every page.
  const { t: tHome } = useTranslate('home');

  const questions = (
    (t('faqs.questions', { returnObjects: true, defaultValue: [] }) ?? []) as FAQItem[]
  ).filter((_, index) => !omit.includes(index));

  const [expanded, setExpanded] = useState<string | false>(questions[0]?.question ?? false);

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
        >
          <AccordionSummary
            expandIcon={
              <Iconify
                width={20}
                icon={
                  expanded === item.question
                    ? 'iconmind:minus-outline-thin'
                    : 'iconmind:plus-outline-thin'
                }
              />
            }
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography variant="h6"> {item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );

  const renderContact = (
    <Box sx={{ position: 'relative', mx: 'auto', maxWidth: 720 }}>
      {/* A quieter version of the hero's glow, behind the card. */}
      <BrandGlow
        intensity={0.12}
        sx={{
          top: '50%',
          transform: 'translate(-50%, -50%)',
          // Wider than the card, so the glow spills out around it instead of hiding behind.
          width: { xs: 320, sm: 560, md: 880 },
          height: { xs: 220, sm: 300, md: 380 },
        }}
      />

      <Card
        sx={{
          px: 3,
          py: 8,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <m.div variants={varFade().in}>
          <Typography variant="h4">{tHome('faqs.contact.heading')}</Typography>
        </m.div>

        <m.div variants={varFade().in}>
          <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
            {tHome('faqs.contact.description')}
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
            {tHome('faqs.contact.cta')}
          </Button>
        </m.div>
      </Card>
    </Box>
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
