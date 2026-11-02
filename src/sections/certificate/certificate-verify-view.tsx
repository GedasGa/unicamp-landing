'use client';

import type { CertificateData } from 'src/actions/certificate';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { Logo } from 'src/components/logo';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  certificate: CertificateData | null;
  pdfUrl: string | null;
  token: string;
  error: string | null;
};

export function CertificateVerifyView({ certificate, pdfUrl, token, error }: Props) {
  const [copied, setCopied] = useState(false);

  // ----------------------------------------------------------------------

  if (!certificate || error) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Iconify icon="eva:alert-circle-outline" width={64} sx={{ color: 'error.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Certificate Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          This verification link is invalid or the certificate no longer exists.
        </Typography>
      </Container>
    );
  }

  const studentName = certificate.profiles?.full_name ?? 'Student';
  const programName = certificate.groups?.name ?? 'Program';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://unicamp.lt/certificate/${token}`;
  const shareText = `I've completed ${programName} at Unicamp IT Academy! 🎓`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      toast.success('Link copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ----------------------------------------------------------------------

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Logo disableLink />
          <Chip
            icon={<Iconify icon="eva:checkmark-circle-2-fill" />}
            label="Verified Certificate"
            color="success"
            variant="filled"
          />
        </Stack>

        <Divider />

        {/* Certificate info */}
        <Stack spacing={1.5}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Certificate of Completion
          </Typography>
          <Typography variant="h3">{studentName}</Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 'normal' }}>
            {programName}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify icon="eva:calendar-outline" width={18} sx={{ color: 'text.disabled' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Issued {fDate(certificate.issued_at)}
            </Typography>
          </Stack>
        </Stack>

        {/* Social share */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Share this certificate
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Share on LinkedIn">
              <IconButton
                onClick={handleLinkedIn}
                sx={{
                  color: '#0A66C2',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Iconify icon="eva:linkedin-fill" width={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on X (Twitter)">
              <IconButton
                onClick={handleTwitter}
                sx={{
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Iconify icon="ri:twitter-x-fill" width={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title={copied ? 'Copied!' : 'Copy link'}>
              <IconButton
                onClick={handleCopyLink}
                sx={{
                  color: copied ? 'success.main' : 'text.secondary',
                  border: '1px solid',
                  borderColor: copied ? 'success.main' : 'divider',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Iconify icon={copied ? 'eva:checkmark-fill' : 'eva:link-2-fill'} width={20} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Divider />

        {/* PDF viewer */}
        {pdfUrl && (
          <Box>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Certificate Document</Typography>
              <Button
                variant="outlined"
                size="small"
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<Iconify icon="eva:download-fill" />}
              >
                Download PDF
              </Button>
            </Stack>

            {/* iframe embed — desktop; on mobile users use the Download button */}
            <Box
              component="iframe"
              src={pdfUrl}
              title="Certificate PDF"
              sx={{
                width: '100%',
                height: { xs: 0, sm: 600 },
                border: 'none',
                borderRadius: 1,
                display: { xs: 'none', sm: 'block' },
              }}
            />

            {/* Mobile fallback */}
            <Box
              sx={{
                display: { xs: 'flex', sm: 'none' },
                p: 4,
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Iconify icon="eva:file-text-outline" width={40} sx={{ color: 'text.disabled' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                Tap the button above to open or download the certificate PDF.
              </Typography>
            </Box>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
