'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { Logo } from 'src/components/logo';

import { Main } from './main';
import { NavDesktop } from './nav/desktop';
import { Footer } from './footer';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { MenuButton } from '../components/menu-button';

import type { NavMainProps } from './nav/types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavMobile } from './nav/mobile';
import { LanguagePopover } from '../components/language-popover';
import { allLangs, useTranslate } from '../../locales';
import { Iconify } from '../../components/iconify';
import Link from 'next/link';
import { paths } from '../../routes/paths';
import { useLocalStorage } from '../../hooks/use-local-storage';
import type { SettingsState } from '../../components/settings';
import { STORAGE_KEY } from '../../components/settings';
import type { ThemeColorScheme } from '../../theme/types';
import Container from '@mui/material/Container';
import { defaultNavData } from './nav/config';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
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
  const pathname = usePathname();
  const mobileNavOpen = useBoolean();
  const { t } = useTranslate('nav');

  const [showAlert, setShowAlert] = useState(true);

  const homePage = pathname === '/';
  const layoutQuery: Breakpoint = 'md';
  const navData = data?.nav ?? defaultNavData;

  const dismissAlert = () => {
    setShowAlert(false);
  };

  return (
    <LayoutSection
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          sx={header?.sx}
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
                    href={'https://kursuok.lt/mokymai/list/provider/view/uab-unicamp'}
                    target="_blank"
                  >
                    {t('here')}
                  </Link>
                  {', '}
                  {t('email')}{' '}
                  <Link
                    href={'mailto:info@unicamp.lt?subject=Kursuok'}
                  >
                    info@unicamp.lt
                  </Link>{' '}
                  {t('or')} {t('phone')} <Link href={'tel:+37061008080'}>+370 610 08080</Link>
                </Alert>
              </Container>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={mobileNavOpen.onTrue}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={mobileNavOpen.value}
                  onClose={mobileNavOpen.onFalse}
                />
                <Logo onlyLogo={false} width={160} />
              </>
            ),
            rightArea: (
              <>
                <NavDesktop
                  data={navData}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
                  }}
                />
                <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                  <LanguagePopover data={allLangs} />
                  <Button
                    variant="outlined"
                    rel="noopener"
                    href="/#courses"
                    sx={{
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
                    }}
                  >
                    {t('cta.text')}
                  </Button>
                </Box>
              </>
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
