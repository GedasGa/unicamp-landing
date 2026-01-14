import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import { GoogleTagManager } from '@next/third-parties/google';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { schemeConfig } from 'src/theme/scheme-config';
import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';
import { GroupProvider } from 'src/contexts/group-context';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { ThirdPartyScripts } from 'src/components/third-party-scripts';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context';

import { CSPostHogProvider } from './providers';

// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const lang = CONFIG.isStaticExport ? 'lt' : await detectLanguage();

  return (
    <html lang={lang ?? 'lt'} dir="ltr" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-MFMRN6WN" />

      <body>
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          // modeStorageKey={schemeConfig.modeStorageKey} Force light theme
        />

        <CSPostHogProvider>
          <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
            <AuthProvider>
              <GroupProvider>
                <LocalizationProvider>
                  <SettingsProvider settings={defaultSettings}>
                    <ThemeProvider>
                      <MotionLazy>
                        <Snackbar />
                        <ProgressBar />
                        <SettingsDrawer />
                        <ThirdPartyScripts />
                        {children}
                      </MotionLazy>
                    </ThemeProvider>
                  </SettingsProvider>
                </LocalizationProvider>
              </GroupProvider>
            </AuthProvider>
          </I18nProvider>
        </CSPostHogProvider>
      </body>
    </html>
  );
}
