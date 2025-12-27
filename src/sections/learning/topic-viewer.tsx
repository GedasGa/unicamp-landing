'use client';

// =============================================
// Topic Viewer Component (Confluence Content)
// =============================================

import type { FC } from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';

import { ReactRenderer } from '@atlaskit/renderer';
import { SmartCardProvider } from '@atlaskit/link-provider';
import type { MediaClientConfig } from '@atlaskit/media-core';
import { setGlobalTheme } from '@atlaskit/tokens';
import { IntlProvider } from 'react-intl-next';

import { Iconify } from 'src/components/iconify';
import { LinkPreviewClient } from 'src/lib/link-preview-client';
import { useSettingsContext } from 'src/components/settings';

import { getConfluenceTopicContent } from 'src/actions/confluence';

interface TopicViewerProps {
  confluencePageId: string;
  topicTitle: string;
  onComplete?: () => void;
  onBack?: () => void;
  isCompleted?: boolean;
}

export const TopicViewer: FC<TopicViewerProps> = ({
  confluencePageId,
  topicTitle,
  onComplete,
  onBack,
  isCompleted = false,
}) => {
  const settings = useSettingsContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<any>(null);

  // Set up media client configuration for Confluence attachments
  const initialAuth = {
    clientId: 'f41dff68-9c65-4def-803a-13a0b73f3986',
    token: 'confluence-media-token',
    baseUrl: 'http://localhost:8082/api/media',
  };
  const mediaClientConfig: MediaClientConfig = {
    initialAuth,
    authProvider: () => Promise.resolve(initialAuth),
  };

  // Sync Atlassian theme with app theme
  useEffect(() => {
    setGlobalTheme({
      colorMode: settings.colorScheme === 'dark' ? 'dark' : 'light',
    });
  }, [settings.colorScheme]);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getConfluenceTopicContent(confluencePageId);
        if (result.success && result.data) {
          setContent(result.data);
        } else {
          setError(result.error || 'Failed to load content');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [confluencePageId]);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={400} />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          {onBack && (
            <Button
              variant="outlined"
              startIcon={<Iconify icon="eva:arrow-back-fill" />}
              onClick={onBack}
            >
              Go Back
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            {onBack && (
              <IconButton onClick={onBack} sx={{ mr: 1 }}>
                <Iconify icon="eva:arrow-back-fill" />
              </IconButton>
            )}
          </Box>
          
          {isCompleted && (
            <Chip 
              label="Completed" 
              color="success" 
              icon={<Iconify icon="eva:checkmark-circle-2-fill" />}
            />
          )}
        </Box>

        <Typography variant="h4" gutterBottom>
          {content?.title || topicTitle}
        </Typography>

        {content?.lastUpdated && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
            Last updated: {new Date(content.lastUpdated.when).toLocaleDateString()} by{' '}
            {content.lastUpdated.by.displayName}
          </Typography>
        )}

        {/* Render Confluence content using Atlassian ReactRenderer */}
        {content?.content && (
          <IntlProvider locale="en">
            <SmartCardProvider client={new LinkPreviewClient()}>
              <ReactRenderer
                document={content.content}
                appearance="full-width"
                annotationProvider={null}
                allowAnnotations={false}
                allowHeadingAnchorLinks
                allowPlaceholderText
                allowCopyToClipboard
                allowCustomPanels
                shouldOpenMediaViewer={false}
                allowUgcScrubber={false}
                allowSelectAllTrap={false}
                analyticsEventSeverityTracking={{
                    enabled: false,
                    severityNormalThreshold: 0,
                    severityDegradedThreshold: 0,
                }}
                enableSsrInlineScripts={false}
                noOpSSRInlineScript={false}
                unsupportedContentLevelsTracking={{
                    enabled: false,
                }}
                media={{
                  allowLinking: true,
                  allowCaptions: true,
                  ssr: {
                    mode: 'client',
                    config: mediaClientConfig,
                  },
                }}
                smartLinks={{
                  ssr: false,
                }}
              />
            </SmartCardProvider>
          </IntlProvider>
        )}

        {onComplete && !isCompleted && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
              onClick={onComplete}
            >
              Mark as Complete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
