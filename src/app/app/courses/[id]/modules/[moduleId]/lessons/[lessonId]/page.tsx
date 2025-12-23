'use client';

// =============================================
// Lesson Detail Page - Topics Viewer
// =============================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';

import { Iconify } from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';

import { TopicViewer } from 'src/sections/learning/topic-viewer';

import { 
  getLesson,
  getLessonTopicProgress,
  markTopicComplete,
} from 'src/lib/database';

import { getConfluenceLessonTopics } from 'src/actions/confluence';

type Props = {
  params: { 
    id: string; 
    moduleId: string; 
    lessonId: string; 
  };
};

export default function LessonDetailPage({ params }: Props) {
  const router = useRouter();
  const { user } = useAuthContext();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [topicProgress, setTopicProgress] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Fetch lesson
        const lessonData = await getLesson(params.lessonId);
        setLesson(lessonData);
        
        // Fetch topics from Confluence using the lesson's parent page ID
        const topicsResult = await getConfluenceLessonTopics(lessonData.confluence_parent_page_id);
        
        if (!topicsResult.success || !topicsResult.data) {
          throw new Error(topicsResult.error || 'Failed to fetch topics');
        }
        
        setTopics(topicsResult.data);
        
        // Fetch progress for all topics using confluence_page_id
        const progressData = await getLessonTopicProgress(user.id, params.lessonId);
        const progressMap = new Map();
        progressData.forEach((progress) => {
          progressMap.set(progress.confluence_page_id, progress);
        });
        setTopicProgress(progressMap);
        
        // Find first incomplete topic
        const firstIncomplete = topicsResult.data.findIndex(
          (topic) => !progressMap.get(topic.id)?.completed
        );
        if (firstIncomplete !== -1) {
          setSelectedTopicIndex(firstIncomplete);
        }
      } catch (err) {
        console.error('Error fetching lesson data:', err);
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [params.lessonId, user?.id]);

  const handleTopicComplete = async () => {
    if (!user?.id || !lesson) return;
    
    const currentTopic = topics[selectedTopicIndex];
    if (!currentTopic) return;
    
    try {
      await markTopicComplete(user.id, params.lessonId, currentTopic.id, true);
      
      // Update local state
      setTopicProgress(prev => {
        const newMap = new Map(prev);
        newMap.set(currentTopic.id, { 
          completed: true, 
          completed_at: new Date().toISOString() 
        });
        return newMap;
      });
      
      // Move to next topic if available
      if (selectedTopicIndex < topics.length - 1) {
        setSelectedTopicIndex(selectedTopicIndex + 1);
      }
    } catch (err) {
      console.error('Error marking topic complete:', err);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Skeleton variant="text" width="60%" height={60} />
        <Skeleton variant="rectangular" height={600} sx={{ mt: 3 }} />
      </Container>
    );
  }

  if (error || !lesson) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Alert severity="error">{error || 'Lesson not found'}</Alert>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={() => router.push(`/app/courses/${params.id}`)}
          sx={{ mt: 2 }}
        >
          Back to Course
        </Button>
      </Container>
    );
  }

  const selectedTopic = topics[selectedTopicIndex];

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Button
        variant="text"
        startIcon={<Iconify icon="eva:arrow-back-fill" />}
        onClick={() => router.push(`/app/courses/${params.id}`)}
        sx={{ mb: 3 }}
      >
        Back to Course
      </Button>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Topics Sidebar */}
        <Card sx={{ width: 300, flexShrink: 0, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              {lesson.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {topics.filter(t => topicProgress.get(t.id)?.completed).length} / {topics.length} completed
            </Typography>
          </Box>
          
          <List>
            {topics.map((topic, index) => {
              const isCompleted = topicProgress.get(topic.id)?.completed;
              const isSelected = index === selectedTopicIndex;
              
              return (
                <ListItemButton
                  key={topic.id}
                  selected={isSelected}
                  onClick={() => setSelectedTopicIndex(index)}
                >
                  <ListItemIcon>
                    <Iconify 
                      icon={
                        isCompleted 
                          ? 'eva:checkmark-circle-2-fill' 
                          : 'eva:radio-button-off-outline'
                      }
                      color={isCompleted ? 'success.main' : 'text.secondary'}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={topic.title}
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: isCompleted ? 'text.secondary' : 'text.primary',
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Card>

        {/* Topic Content */}
        <Box sx={{ flexGrow: 1 }}>
          {selectedTopic ? (
            <TopicViewer
              confluencePageId={selectedTopic.id}
              topicTitle={selectedTopic.title}
              isCompleted={topicProgress.get(selectedTopic.id)?.completed || false}
              onComplete={handleTopicComplete}
            />
          ) : (
            <Alert severity="info">No topics available</Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}
