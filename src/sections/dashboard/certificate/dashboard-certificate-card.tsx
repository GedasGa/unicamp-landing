import type { CertificateData } from 'src/actions/certificate';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  certificate: CertificateData;
};

export function DashboardCertificateCard({ certificate }: Props) {
  const router = useRouter();

  const programName = certificate.groups?.name ?? 'Program';
  const verifyPath = paths.certificate.verify(certificate.verification_token);

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {programName}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Iconify icon="eva:calendar-outline" width={16} sx={{ color: 'text.disabled' }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Issued {fDate(certificate.issued_at)}
              </Typography>
            </Stack>
          </Box>
          <Chip
            size="small"
            icon={<Iconify icon="eva:award-fill" />}
            label="Certificate"
            color="success"
            variant="soft"
          />
        </Stack>

        <Button
          variant="contained"
          endIcon={<Iconify icon="eva:external-link-fill" />}
          onClick={() => router.push(verifyPath)}
          fullWidth
        >
          View Certificate
        </Button>
      </Stack>
    </Card>
  );
}
