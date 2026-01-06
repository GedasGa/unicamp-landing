'use client';

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { MotionViewport } from 'src/components/animate';

import { SectionTitle } from '../privacy-policy/components/section-title';

// ----------------------------------------------------------------------

export function TermsOfServiceText({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('terms');

  const sections = [
    {
      key: 'acceptanceOfTerms',
      header: t('sections.acceptanceOfTerms.header'),
      content: t('sections.acceptanceOfTerms.content'),
    },
    {
      key: 'useLicense',
      header: t('sections.useLicense.header'),
      content: t('sections.useLicense.content'),
    },
    {
      key: 'userAccount',
      header: t('sections.userAccount.header'),
      content: t('sections.userAccount.content'),
    },
    {
      key: 'userContent',
      header: t('sections.userContent.header'),
      content: t('sections.userContent.content'),
    },
    {
      key: 'prohibitedActivities',
      header: t('sections.prohibitedActivities.header'),
      content: t('sections.prohibitedActivities.content'),
    },
    {
      key: 'intellectualProperty',
      header: t('sections.intellectualProperty.header'),
      content: t('sections.intellectualProperty.content'),
    },
    {
      key: 'disclaimer',
      header: t('sections.disclaimer.header'),
      content: t('sections.disclaimer.content'),
    },
    {
      key: 'limitations',
      header: t('sections.limitations.header'),
      content: t('sections.limitations.content'),
    },
    {
      key: 'modificationsToTerms',
      header: t('sections.modificationsToTerms.header'),
      content: t('sections.modificationsToTerms.content'),
    },
    {
      key: 'contact',
      header: t('sections.contact.header'),
      content: t('sections.contact.content'),
    },
  ];

  const renderDescription = <SectionTitle title={t('title')} sx={{ textAlign: 'center' }} />;

  const renderContent = (
    <Stack spacing={4} mt={10}>
      <Stack spacing={2}>
        <Typography variant="h6">{t('effectiveDate')}: 2025-01-26</Typography>
        <Typography variant="h6">{t('updatedDate')}: 2025-10-09</Typography>
      </Stack>

      <Stack spacing={4}>
        {sections.map((section) => (
          <Stack spacing={2} key={section.key}>
            <Typography variant="h6">{section.header}</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {section.content}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );

  return (
    <Box component="section" sx={{ ...sx }} {...other}>
      <MotionViewport sx={{ my: 10, position: 'relative' }}>
        <Container>
          {renderDescription}
          {renderContent}
        </Container>
      </MotionViewport>
    </Box>
  );
}
