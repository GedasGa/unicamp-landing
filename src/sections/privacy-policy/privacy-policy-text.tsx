import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { MotionViewport } from 'src/components/animate';

import { useTranslate } from '../../locales';
import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

export function PrivacyPolicyText({ sx, ...other }: BoxProps) {
  const { t } = useTranslate('privacy-policy');

  const sections = [
    {
      key: 'whoWeAre',
      header: t('sections.whoWeAre.header'),
      content: t('sections.whoWeAre.content'),
    },
    {
      key: 'informationWeCollect',
      header: t('sections.informationWeCollect.header'),
      content: t('sections.informationWeCollect.content'),
    },
    {
      key: 'howWeUseYourInformation',
      header: t('sections.howWeUseYourInformation.header'),
      content: t('sections.howWeUseYourInformation.content'),
    },
    {
      key: 'legalBasisForProcessing',
      header: t('sections.legalBasisForProcessing.header'),
      content: t('sections.legalBasisForProcessing.content'),
    },
    {
      key: 'cookies',
      header: t('sections.cookies.header'),
      content: t('sections.cookies.content'),
    },
    {
      key: 'dataSharing',
      header: t('sections.dataSharing.header'),
      content: t('sections.dataSharing.content'),
    },
    {
      key: 'dataProtection',
      header: t('sections.dataProtection.header'),
      content: t('sections.dataProtection.content'),
    },
    {
      key: 'dataRetention',
      header: t('sections.dataRetention.header'),
      content: t('sections.dataRetention.content'),
    },
    {
      key: 'useOfAnalyticsTools',
      header: t('sections.useOfAnalyticsTools.header'),
      content: t('sections.useOfAnalyticsTools.content'),
    },
    {
      key: 'yourRights',
      header: t('sections.yourRights.header'),
      content: t('sections.yourRights.content'),
    },
    {
      key: 'childrenPrivacy',
      header: t('sections.childrenPrivacy.header'),
      content: t('sections.childrenPrivacy.content'),
    },
    {
      key: 'policyChanges',
      header: t('sections.policyChanges.header'),
      content: t('sections.policyChanges.content'),
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
        <Typography variant="h6">{t('effectiveDate')}: 2024-11-11</Typography>
        <Typography variant="h6">{t('updatedDate')}: 2025-01-26</Typography>
        <Typography variant="body1" />
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
