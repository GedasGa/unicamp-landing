'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Tooltip } from '@mui/material';

import { Iconify } from './iconify';

/**
 * Returns true if the googtrans=/en/lt cookie is set (page is currently translated).
 */
function isPageTranslated(): boolean {
  return /googtrans=\/en\/lt/.test(document.cookie);
}

/**
 * AI Translate Button
 * - "AI vertimas": sets cookie + reloads so Google Translate auto-applies on load.
 * - "Rodyti originalą": resets the combo select back to English and clears the cookie.
 *
 * Only visible when the UI language is Lithuanian.
 */
export function AITranslateButton() {
  const { i18n } = useTranslation();
  const [translated, setTranslated] = useState(false);

  useEffect(() => {
    setTranslated(isPageTranslated());
  }, []);

  if (i18n.language !== 'lt') return null;

  const handleTranslate = () => {
    document.cookie = 'googtrans=/en/lt; path=/';
    window.location.reload();
  };

  const handleRestore = () => {
    // Clear the translation cookie
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'googtrans=/en/en; path=/';

    // Try to restore via the hidden combo select
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = 'en';
      combo.dispatchEvent(new Event('change', { bubbles: true }));
      setTranslated(false);
    } else {
      // Fallback: reload without the translation cookie
      window.location.reload();
    }
  };

  if (translated) {
    return (
      <Tooltip title="Rodyti originalų turinį anglų kalba">
        <Button
          onClick={handleRestore}
          variant="outlined"
          color="secondary"
          size="small"
          startIcon={<Iconify icon="mdi:translate-off" width={18} />}
        >
          Rodyti originalą
        </Button>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="Versti puslapį į lietuvių kalbą">
      <Button
        onClick={handleTranslate}
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<Iconify icon="mdi:google-translate" width={18} />}
      >
        AI vertimas
      </Button>
    </Tooltip>
  );
}
