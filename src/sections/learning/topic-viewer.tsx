'use client';

// =============================================
// Topic Viewer Component (Confluence Content)
// =============================================

import type { FC } from 'react';
import type { MediaClientConfig } from '@atlaskit/media-core';

import { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl-next';
import { setGlobalTheme } from '@atlaskit/tokens';
import { ReactRenderer } from '@atlaskit/renderer';
import { SmartCardProvider } from '@atlaskit/link-provider';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { fDate } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { LinkPreviewClient } from 'src/lib/link-preview-client';
import { getConfluenceTopicContent } from 'src/actions/confluence';

import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

interface TopicViewerProps {
  confluencePageId: string;
  topicTitle: string;
  onComplete?: () => void;
  onBack?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isCompleted?: boolean;
}

export const TopicViewer: FC<TopicViewerProps> = ({
  confluencePageId,
  topicTitle,
  onComplete,
  onBack,
  onPrevious,
  onNext,
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
    baseUrl: `${CONFIG.serverUrl}/api/media`,
  };
  const mediaClientConfig: MediaClientConfig = {
    initialAuth,
    authProvider: () => Promise.resolve(initialAuth),
    authProviderTimeoutMs: 10000,
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
        <Box sx={{ display: 'flex', alignItems: 'top', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <Typography variant="h4">
            {content?.title || topicTitle}
            {content?.lastUpdated && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
                Last updated: {fDate(content.lastUpdated.when)} by{' '}
                {content.lastUpdated.by.displayName}
              </Typography>
            )}
          </Typography>
          {isCompleted && (
            <Chip 
              label="Completed" 
              color="success" 
              icon={<Iconify icon="eva:checkmark-circle-2-fill" />}
            />
          )}
        </Box>

        {/* Render Confluence content using Atlassian ReactRenderer */}
        {content?.content && (
          <IntlProvider locale="en">
            <SmartCardProvider client={new LinkPreviewClient()} >
              <ReactRenderer
                document={content.content}
                appearance="full-width"
                annotationProvider={null}
                allowAnnotations={false}
                allowHeadingAnchorLinks={false}
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
                eventHandlers={{
                  link: {
                    onClick: (event, url) => {
                      if (url) {
                        event.preventDefault();
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    },
                  },
                  smartCard: {
                    onClick: (event, url) => {
                      if (url) {
                        event.preventDefault();
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    },
                  },
                }}
                media={{
                  allowLinking: true,
                  allowCaptions: true,
                  enableDownloadButton: true,
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

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          {onPrevious ? (
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<Iconify icon="eva:arrow-back-fill" />}
              onClick={onPrevious}
            >
              Previous
            </Button>
          ) : (
            <Box sx={{ width: 140 }} />
          )}
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {onComplete && !isCompleted && (
              <Button
                variant="contained"
                color="success"
                endIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
                onClick={onComplete}
              >
                Mark as Complete
              </Button>
            )}
            
            {isCompleted && onNext && (
              <Button
                variant="contained"
                color="primary"
                endIcon={<Iconify icon="eva:arrow-forward-fill" />}
                onClick={onNext}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
