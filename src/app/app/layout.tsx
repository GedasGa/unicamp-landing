import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';
import { NavigationProvider } from 'src/layouts/dashboard/navigation-context';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return (
      <NavigationProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </NavigationProvider>
    );
  }

  return (
    <AuthGuard>
      <NavigationProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </NavigationProvider>
    </AuthGuard>
  );
}
