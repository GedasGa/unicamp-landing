'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { DashboardContent } from 'src/layouts/dashboard';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function DashboardView() {
  const { user } = useAuthContext();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Box
            sx={{
              p: 5,
              borderRadius: 2,
              bgcolor: 'background.neutral',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h3">
              Welcome back 👋 {user?.displayName || user?.email}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              You have successfully signed in to your dashboard.
            </Typography>
            <Box>
              <Button variant="contained" color="primary">
                Get Started
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid xs={12} md={4}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              User Info
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Email: {user?.email}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Role: {user?.role || 'User'}
            </Typography>
          </Box>
        </Grid>

        <Grid xs={12} md={8}>
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Getting Started
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Welcome to your dashboard. Here are some quick actions to get you started:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="outlined" size="small">
                View Profile
              </Button>
              <Button variant="outlined" size="small">
                Settings
              </Button>
              <Button variant="outlined" size="small">
                Help Center
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
