'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Link from 'next/link';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { useBoolean } from 'src/hooks/use-boolean';

import { bgBlur, RADIUS, varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';

import { Main } from './main';
import { Footer } from './footer';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { paths } from '../../routes/paths';
import { defaultNavData } from './nav/config';
import { useAuthContext } from '../../auth/hooks';
import { Iconify } from '../../components/iconify';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { MenuButton } from '../components/menu-button';
import { allLangs, useTranslate } from '../../locales';
import { LanguagePopover } from '../components/language-popover';

import type { NavMainProps } from './nav/types';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
    /** Let page content start underneath the floating header. */
    overlay?: boolean;
  };
  data?: {
    nav?: NavMainProps['data'];
  };
};

export type LayoutState = {
  showAlert: boolean;
};

export function MainLayout({ sx, data, children, header }: MainLayoutProps) {
  const theme = useTheme();
  const mobileNavOpen = useBoolean();
  const { t } = useTranslate('nav');
  const { authenticated } = useAuthContext();

  // Disabled until next kursuok.lt financing round
  const [showAlert, setShowAlert] = useState(false);

  const layoutQuery: Breakpoint = 'md';
  const navData = data?.nav ?? defaultNavData;

  const dismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <LayoutSection
      cssVars={{
        '--layout-header-mobile-height': '72px',
        '--layout-header-desktop-height': '88px',
      }}
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          disableOffset
          disableElevation
          sx={{
            bgcolor: 'transparent',
            ...(header?.overlay && {
              mb: 'calc(var(--layout-header-mobile-height) * -1)',
              [theme.breakpoints.up(layoutQuery)]: {
                mb: 'calc(var(--layout-header-desktop-height) * -1)',
              },
            }),
            ...header?.sx,
          }}
          slotProps={{
            toolbar: {
              sx: { alignItems: 'center' },
            },
            container: {
              sx: {
                width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 48px)' },
                height: { xs: 56, [layoutQuery]: 64 },
                // Set per breakpoint so Container's own gutters (24px from sm up) don't win.
                pl: { xs: 1, sm: 1, [layoutQuery]: 2 },
                pr: { xs: 1, sm: 1 },
                borderRadius: RADIUS.pill,
                border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
                boxShadow: `0 8px 24px -8px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
                ...bgBlur({
                  color: varAlpha(theme.vars.palette.background.neutralChannel, 0.8),
                  blur: 12,
                }),
              },
            },
          }}
          slots={{
            bottomArea: showAlert && (
              <Container>
                <Alert
                  icon={<Iconify icon="ic:outline-campaign" />}
                  severity="warning"
                  action={
                    <Button color="inherit" size="small" onClick={dismissAlert}>
                      {t('dismiss')}
                    </Button>
                  }
                >
                  {t('kursuok.description')}{' '}
                  <Link
                    href="https://kursuok.lt/mokymai/list/provider/view/uab-unicamp"
                    target="_blank"
                  >
                    {t('here')}
                  </Link>
                  {', '}
                  {t('email')}{' '}
                  <Link href="mailto:info@unicamp.lt?subject=Kursuok">info@unicamp.lt</Link>{' '}
                  {t('or')} {t('phone')} <Link href="tel:+37061008080">+370 610 08080</Link>
                </Alert>
              </Container>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={mobileNavOpen.onTrue}
                  sx={{
                    mr: 1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={mobileNavOpen.value}
                  onClose={mobileNavOpen.onFalse}
                  slots={{
                    bottomArea: (
                      <Box gap={1.5} display="flex" sx={{ px: 2.5, py: 3 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          href={authenticated ? paths.app.root : paths.auth.signIn}
                        >
                          {authenticated ? t('cta.goToPlatform') : t('cta.signIn')}
                        </Button>
                      </Box>
                    ),
                  }}
                />
                <Logo onlyLogo={false} width={160} />
              </>
            ),
            centerArea: (
              <NavDesktop
                data={navData}
                sx={{
                  display: 'none',
                  [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
                }}
              />
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                <LanguagePopover data={allLangs} />
                <Button
                  size="large"
                  variant="contained"
                  color="inherit"
                  rel="noopener"
                  href={authenticated ? paths.app.root : paths.auth.signIn}
                  sx={{
                    px: 2.5,
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
                  }}
                >
                  {authenticated ? t('cta.goToPlatform') : t('cta.signIn')}
                </Button>
              </Box>
            ),
          }}
        />
      }
      footerSection={<Footer layoutQuery={layoutQuery} />}
      sx={sx}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
