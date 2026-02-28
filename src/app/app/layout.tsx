'use client';

import { DashboardLayout } from 'src/layouts/dashboard';
import { I18nProvider } from 'src/locales/i18n-provider';
import { CourseDataProvider } from 'src/contexts/course-data-context';
import { NavigationProvider } from 'src/layouts/dashboard/navigation-context';
import { TranslationProvider } from 'src/components/translation-provider';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <I18nProvider>
        <CourseDataProvider>
          <NavigationProvider>
            <TranslationProvider>
              <DashboardLayout>{children}</DashboardLayout>
            </TranslationProvider>
          </NavigationProvider>
        </CourseDataProvider>
      </I18nProvider>
    </AuthGuard>
  );
}
