// ----------------------------------------------------------------------

export type LanguageValue = 'lt' | 'en';

export const fallbackLng = 'lt';
export const languages = ['lt', 'en', 'fr'];
export const defaultNS = 'common';
export const cookieName = 'i18next';

// ----------------------------------------------------------------------

export function i18nOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    lng,
    fallbackLng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    supportedLngs: languages,
  };
}

// ----------------------------------------------------------------------

export const changeLangMessages: Record<
  LanguageValue,
  { success: string; error: string; loading: string }
> = {
  en: {
    success: 'Language has been changed!',
    error: 'Error changing language!',
    loading: 'Loading...',
  },
  lt: {
    success: 'Kalba pakeista!',
    error: 'Klaida keičiant kalbą!',
    loading: 'Kraunama...',
  },
};
