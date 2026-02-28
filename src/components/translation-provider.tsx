'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { GoogleTranslateEmbed } from './google-translate-embed';

/**
 * Translation Provider Wrapper
 * Combines i18n language selection with Google Translate embed for content
 * 
 * How it works:
 * 1. User selects language from language selector
 * 2. i18n translates UI elements (buttons, labels, etc.)
 * 3. Google Translate embed translates Confluence content dynamically
 * 
 * No API key required - completely free!
 */

interface TranslationProviderProps {
  children: React.ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Sync Google Translate with i18n language changes
    const handleLanguageChange = () => {
      const currentLang = i18n.language;
      console.log(`📝 Language changed to: ${currentLang}`);
      
      // Trigger Google Translate for the new language
      triggerGoogleTranslate(currentLang);
    };

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return (
    <>
      <GoogleTranslateEmbed />
      {children}
    </>
  );
}

/**
 * Sets the Google Translate language cookie.
 * The actual page translation requires a reload — triggered by the AI translate button.
 */
function triggerGoogleTranslate(lang: string) {
  if (lang === 'lt') {
    document.cookie = 'googtrans=/en/lt; path=/';
  } else {
    document.cookie = 'googtrans=/en/en; path=/';
  }
}

