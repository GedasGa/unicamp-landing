// Hook for translating content dynamically based on current language
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { translateText, translateHtml } from 'src/utils/google-translate';

interface UseTranslateContentOptions {
  /**
   * Whether the content is HTML (default: false)
   */
  isHtml?: boolean;
  /**
   * Source language (default: 'en')
   */
  sourceLanguage?: string;
  /**
   * Whether to automatically translate when language changes (default: true)
   */
  autoTranslate?: boolean;
}

interface UseTranslateContentResult {
  /**
   * The translated content (or original if translation hasn't happened yet)
   */
  translatedContent: string | null;
  /**
   * Whether translation is in progress
   */
  isTranslating: boolean;
  /**
   * Any error that occurred during translation
   */
  error: Error | null;
  /**
   * Manually trigger translation
   */
  translate: () => Promise<void>;
}

/**
 * Hook to translate content dynamically based on current language
 * @param content - Original content to translate
 * @param options - Translation options
 * @returns Translation state and functions
 */
export function useTranslateContent(
  content: string | null | undefined,
  options: UseTranslateContentOptions = {}
): UseTranslateContentResult {
  const { isHtml = false, sourceLanguage = 'en', autoTranslate = true } = options;
  const { i18n } = useTranslation();
  
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const currentLanguage = i18n.language;

  const translate = useCallback(async () => {
    if (!content) {
      setTranslatedContent(null);
      return;
    }

    // If source language matches current language, no translation needed
    if (currentLanguage === sourceLanguage) {
      setTranslatedContent(content);
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const translated = isHtml
        ? await translateHtml(content, currentLanguage, sourceLanguage)
        : await translateText(content, currentLanguage, sourceLanguage);

      setTranslatedContent(translated);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Translation failed');
      setError(error);
      // Fallback to original content on error
      setTranslatedContent(content);
    } finally {
      setIsTranslating(false);
    }
  }, [content, currentLanguage, sourceLanguage, isHtml]);

  useEffect(() => {
    if (autoTranslate) {
      translate();
    }
  }, [autoTranslate, translate]);

  return {
    translatedContent,
    isTranslating,
    error,
    translate,
  };
}

/**
 * Hook to translate multiple pieces of content at once
 * @param contents - Array of content strings to translate
 * @param options - Translation options
 * @returns Translation state and functions
 */
export function useTranslateMultipleContent(
  contents: (string | null | undefined)[],
  options: UseTranslateContentOptions = {}
) {
  const { sourceLanguage = 'en', autoTranslate = true } = options;
  const { i18n } = useTranslation();
  
  const [translatedContents, setTranslatedContents] = useState<(string | null)[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const currentLanguage = i18n.language;

  const translate = useCallback(async () => {
    if (!contents || contents.length === 0) {
      setTranslatedContents([]);
      return;
    }

    // If source language matches current language, no translation needed
    if (currentLanguage === sourceLanguage) {
      setTranslatedContents(contents.map(c => c || null));
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      // Translate only non-null/undefined contents
      const validContents = contents.filter((c): c is string => !!c);
      
      const translations = await Promise.all(
        validContents.map(content =>
          translateText(content, currentLanguage, sourceLanguage)
        )
      );

      // Map translations back to original positions
      let translationIndex = 0;
      const result = contents.map(content => {
        if (!content) return null;
        return translations[translationIndex++];
      });

      setTranslatedContents(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Translation failed');
      setError(error);
      // Fallback to original contents on error
      setTranslatedContents(contents.map(c => c || null));
    } finally {
      setIsTranslating(false);
    }
  }, [contents, currentLanguage, sourceLanguage]);

  useEffect(() => {
    if (autoTranslate) {
      translate();
    }
  }, [autoTranslate, translate]);

  return {
    translatedContents,
    isTranslating,
    error,
    translate,
  };
}
