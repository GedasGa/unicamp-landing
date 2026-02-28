'use client';

import { useEffect } from 'react';

// Module-level flags survive React StrictMode's double-mount and prevent double init
let scriptLoaded = false;
let widgetInitialized = false;

export function GoogleTranslateEmbed() {
  useEffect(() => {
    // Only load the script once for the lifetime of the page
    if (scriptLoaded) return;
    scriptLoaded = true;

    (window as any).googleTranslateElementInit = () => {
      if (widgetInitialized) return;
      widgetInitialized = true;

      try {
        // eslint-disable-next-line no-new
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,lt',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.HORIZONTAL,
            autoDisplay: false,
          },
          'google_translate_element'
        );

        // If the page was reloaded with a googtrans cookie, apply it now
        const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
        const cookieLang = match?.[1];
        if (cookieLang && cookieLang !== 'en') {
          applyLanguage(cookieLang);
        }
      } catch (error) {
        console.error('Google Translate init error:', error);
      }
    };

    const script = document.createElement('script');
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
    // Do NOT remove the script on cleanup — removing a still-executing script
    // causes "Maximum call stack size exceeded" in React StrictMode
  }, []);

  // Must remain in the DOM (not display:none) so Google Translate renders its select.
  // Positioned off-screen so it's invisible.
  return (
    <div
      id="google_translate_element"
      style={{ position: 'fixed', left: '-9999px', top: 0 }}
    />
  );
}

/**
 * Programmatically selects a language in the hidden widget.
 * Retries up to `tries` times waiting for .goog-te-combo to appear.
 */
export function applyLanguage(lang: string, tries = 15) {
  const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event('change', { bubbles: true }));
  } else if (tries > 0) {
    setTimeout(() => applyLanguage(lang, tries - 1), 300);
  }
}
