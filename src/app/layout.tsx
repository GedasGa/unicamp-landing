import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { LocalizationProvider } from 'src/locales';
import { detectLanguage } from 'src/locales/server';
import { schemeConfig } from 'src/theme/scheme-config';
import { I18nProvider } from 'src/locales/i18n-provider';
import { ThemeProvider } from 'src/theme/theme-provider';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';
import { CSPostHogProvider } from './providers';
import { GoogleTagManager } from '@next/third-parties/google';

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

export const runtime = 'edge';

export default async function RootLayout({ children }: Props) {
  const lang = CONFIG.isStaticExport ? 'lt' : await detectLanguage();

  return (
    <html lang={lang ?? 'lt'} dir="ltr" suppressHydrationWarning>
      <GoogleTagManager gtmId="AW-16868873802" />

      <body>
        <InitColorSchemeScript
          defaultMode={schemeConfig.defaultMode}
          // modeStorageKey={schemeConfig.modeStorageKey} Force light theme
        />

        <CSPostHogProvider>
          <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}>
            <LocalizationProvider>
              <SettingsProvider settings={defaultSettings}>
                <ThemeProvider>
                  <MotionLazy>
                    <Snackbar />
                    <ProgressBar />
                    <SettingsDrawer />
                    {children}
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </I18nProvider>
        </CSPostHogProvider>

        {/* OpenWidget Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.__ow = window.__ow || {};
            window.__ow.organizationId = "ce2e459e-4f09-45ea-b5d6-30bca71720cf";
            window.__ow.integration_name = "manual_settings";
            window.__ow.product_name = "openwidget";   
            (function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}
            var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},
            once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},
            get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");
            return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},
            init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",
            n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};
            !n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice));
          `,
          }}
        />
      </body>
    </html>
  );
}
