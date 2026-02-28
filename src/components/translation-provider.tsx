'use client';

import { GoogleTranslateEmbed } from './google-translate-embed';

interface TranslationProviderProps {
  children: React.ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  return (
    <>
      <GoogleTranslateEmbed />
      {children}
    </>
  );
}
