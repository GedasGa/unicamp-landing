'use client';

/**
 * Example Component: Translatable Confluence Content
 * 
 * This component demonstrates how to integrate Google Translate
 * with Confluence content in the Unicamp Landing Page.
 * 
 * Features:
 * - Fetches content from Confluence
 * - Automatically translates content when language changes
 * - Shows loading state during translation
 * - Handles errors gracefully
 * - Preserves HTML formatting
 */

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactRenderer } from '@atlaskit/renderer';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';

import { useTranslateContent } from 'src/hooks/use-translate-content';
import { getConfluenceTopicContent } from 'src/actions/confluence';

// ----------------------------------------------------------------------

interface ConfluenceContentProps {
  topicId: string;
  title?: string;
}

export function TranslatableConfluenceContent({ topicId, title }: ConfluenceContentProps) {
  const { i18n } = useTranslation();
  const [adfContent, setAdfContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch Confluence content
  useEffect(() => {
    async function fetchContent() {
      setIsLoading(true);
      setFetchError(null);

      try {
        const result = await getConfluenceTopicContent(topicId);

        if (result.success && result.data?.content) {
          setAdfContent(result.data.content);
        } else {
          setFetchError(result.error || 'Failed to load content');
        }
      } catch (error) {
        setFetchError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [topicId]);

  // For translation, we need to convert ADF to text/HTML
  // Note: For production, you might want to translate the ADF nodes directly
  // or use a backend service to handle translation
  const contentText = adfContent ? extractTextFromAdf(adfContent) : '';

  // Translate content when language changes
  const { translatedContent, isTranslating, error: translationError } = useTranslateContent(
    contentText,
    {
      isHtml: false, // Set to true if you extract HTML instead of plain text
      sourceLanguage: 'en',
      autoTranslate: true,
    }
  );

  // Show loading state
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Show fetch error
  if (fetchError) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {fetchError}
      </Alert>
    );
  }

  // Show translation error (but still show original content)
  if (translationError) {
    console.error('Translation error:', translationError);
  }

  // If content is in English or translation is in progress, show original Atlassian renderer
  if (i18n.language === 'en' || !translatedContent) {
    return (
      <Box sx={{ py: 2 }}>
        {title && (
          <Typography variant="h4" sx={{ mb: 3 }}>
            {title}
          </Typography>
        )}
        {adfContent && <ReactRenderer document={adfContent} />}
      </Box>
    );
  }

  // Show translated content
  return (
    <Box sx={{ py: 2 }}>
      {title && (
        <Typography variant="h4" sx={{ mb: 3 }}>
          {title}
        </Typography>
      )}

      {isTranslating && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Translating...
          </Typography>
        </Box>
      )}

      {/* Render translated content */}
      <Box sx={{ '& p': { mb: 2 }, '& h1, & h2, & h3, & h4, & h5, & h6': { my: 2 } }}>
        <Typography component="div" sx={{ whiteSpace: 'pre-wrap' }}>
          {translatedContent}
        </Typography>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------------

/**
 * Extract plain text from Atlassian Document Format (ADF)
 * This is a simplified version - you may want to enhance it based on your needs
 */
function extractTextFromAdf(adf: any): string {
  if (!adf) return '';

  let text = '';

  function traverse(node: any) {
    if (!node) return;

    // Extract text from text nodes
    if (node.type === 'text' && node.text) {
      text += node.text;
    }

    // Add line breaks for paragraphs and headings
    if (node.type === 'paragraph' || node.type === 'heading') {
      text += '\n';
    }

    // Recursively traverse child nodes
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  }

  traverse(adf);

  return text.trim();
}

/**
 * Alternative: Extract HTML from ADF
 * You can use this if you want to preserve more formatting
 * Note: This requires additional processing or a library to convert ADF to HTML
 */
function extractHtmlFromAdf(adf: any): string {
  // Implementation would go here
  // You might want to use @atlaskit/adf-utils or similar
  // For now, we use the text extraction above
  return extractTextFromAdf(adf);
}

// ----------------------------------------------------------------------
// Usage Example in a Page Component
// ----------------------------------------------------------------------

/*
'use client';

import { TranslatableConfluenceContent } from 'src/components/translatable-confluence-content';

export default function LessonPage() {
  const topicId = '123456'; // Get from route params or props

  return (
    <div>
      <TranslatableConfluenceContent 
        topicId={topicId}
        title="Lesson Title"
      />
    </div>
  );
}
*/

// ----------------------------------------------------------------------
// Alternative Approach: Translate at Component Level
// ----------------------------------------------------------------------

/*
// If you want finer control, you can translate specific text elements:

'use client';

import { useTranslation } from 'react-i18next';
import { useTranslateContent } from 'src/hooks/use-translate-content';

export function LessonTitle({ title }: { title: string }) {
  const { translatedContent } = useTranslateContent(title, {
    sourceLanguage: 'en',
  });

  return <h1>{translatedContent || title}</h1>;
}

export function LessonDescription({ description }: { description: string }) {
  const { translatedContent, isTranslating } = useTranslateContent(description, {
    sourceLanguage: 'en',
  });

  return (
    <div>
      {isTranslating && <span>Translating...</span>}
      <p>{translatedContent || description}</p>
    </div>
  );
}
*/
