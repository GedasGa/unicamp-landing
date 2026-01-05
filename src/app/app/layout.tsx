import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';
import { NavigationProvider } from 'src/layouts/dashboard/navigation-context';
import { I18nProvider } from 'src/locales/i18n-provider';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return (
      <I18nProvider lang="en">
        <NavigationProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </NavigationProvider>
      </I18nProvider>
    );
  }

  return (
    <AuthGuard>
      <I18nProvider lang="en">
        <NavigationProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </NavigationProvider>
      </I18nProvider>
    </AuthGuard>
  );
}
