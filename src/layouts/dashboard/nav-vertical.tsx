import type { Breakpoint } from '@mui/material/styles';
import type { NavSectionProps } from 'src/components/nav-section';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

// ----------------------------------------------------------------------

export type NavVerticalProps = NavSectionProps & {
  layoutQuery: Breakpoint;
  onToggleNav: () => void;
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavVertical({
  sx,
  data,
  slots,
  layoutQuery,
  onToggleNav,
  ...other
}: NavVerticalProps) {
  const theme = useTheme();
  const pathname = usePathname();
  
  // Redirect to /app if user is on any /app page, otherwise redirect to home
  const logoHref = pathname?.startsWith('/app') ? paths.app.root : '/';

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        transition: theme.transitions.create(['width'], {
          easing: 'var(--layout-transition-easing)',
          duration: 'var(--layout-transition-duration)',
        }),
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <>
        {slots?.topArea ?? (
          <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
            <Logo onlyLogo={false} href={logoHref} />
          </Box>
        )}

        <Scrollbar fillContent>
          <NavSectionVertical data={data} sx={{ px: 2, flex: '1 1 auto' }} {...other} />

          {slots?.bottomArea}
        </Scrollbar>
      </>
    </Box>
  );
}
