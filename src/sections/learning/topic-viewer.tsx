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

import { Iconify } from 'src/components/iconify';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<any>(null);

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

        {/* Render Confluence content */}
        <Box
          sx={{
            '& img': { maxWidth: '100%', height: 'auto' },
            '& pre': { 
              bgcolor: 'grey.900', 
              color: 'common.white',
              p: 2, 
              borderRadius: 1,
              overflow: 'auto',
            },
            '& code': {
              bgcolor: 'grey.100',
              px: 0.5,
              py: 0.25,
              borderRadius: 0.5,
              fontSize: '0.875rem',
            },
          }}
          dangerouslySetInnerHTML={{ __html: content?.content || '' }}
        />

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
