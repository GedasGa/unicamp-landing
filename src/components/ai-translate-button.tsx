'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Tooltip } from '@mui/material';

import { Iconify } from './iconify';

function isPageTranslated(): boolean {
  return /googtrans=\/en\/lt/.test(document.cookie);
}

function clearTranslationCookies() {
  document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'googtrans=/en/en; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

/**
 * Only visible when the UI language is Lithuanian.
 * Both translate and restore use a page reload — the only reliable way to
 * apply/remove the Google Translate banner and content changes.
 */
export function AITranslateButton() {
  const { i18n } = useTranslation();

  // When language switches back to English while translation is active, clear and reload.
  useEffect(() => {
    if (i18n.language !== 'lt' && isPageTranslated()) {
      clearTranslationCookies();
      window.location.reload();
    }
  }, [i18n.language]);

  if (i18n.language !== 'lt') return null;

  // Stable for the page lifetime — safe to read synchronously.
  const translated = isPageTranslated();

  const handleTranslate = () => {
    document.cookie = 'googtrans=/en/lt; path=/';
    window.location.reload();
  };

  const handleRestore = () => {
    clearTranslationCookies();
    window.location.reload();
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
    <Tooltip title="Versti puslapio turinį į lietuvių kalbą">
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
