'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { Logo } from 'src/components/logo';

import { Main } from './main';
import { NavDesktop } from './nav/desktop';
import { Footer, HomeFooter } from './footer';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

import type { NavMainProps } from './nav/types';

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

export function MainLayout({ sx, data, children, header }: MainLayoutProps) {
  const theme = useTheme();

  const pathname = usePathname();

  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery: Breakpoint = 'md';

  const navData = data?.nav ?? [];

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: <Logo isSingle={false} width={160} />,
            rightArea: (
              <NavDesktop
                data={navData}
                sx={{
                  display: 'none',
                  [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
                }}
              />
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={homePage ? <HomeFooter /> : <Footer layoutQuery={layoutQuery} />}
      /** **************************************
       * Style
       *************************************** */
      sx={sx}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
