'use client';

// =============================================
// Lesson Page - Topics handled via ?topic= query param
// =============================================

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

import { useAuthContext } from 'src/auth/hooks';
import { TopicViewer } from 'src/sections/learning/topic-viewer';
import { paths } from 'src/routes/paths';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useSetNavigation } from 'src/layouts/dashboard/navigation-context';
import { getLessonNavigation } from 'src/layouts/dashboard/nav-utils';

import { 
  getModule,
  getLesson,
  getLessonTopicProgress,
  markTopicComplete,
  checkLessonAccess,
} from 'src/lib/database';

import { getConfluenceLessonTopics } from 'src/actions/confluence';

type Props = {
  params: { 
    id: string; 
    moduleId: string; 
    lessonId: string;
  };
};

export default function LessonPage({ params }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthContext();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [module, setModule] = useState<any>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [topicProgress, setTopicProgress] = useState<Map<string, any>>(new Map());
  const [hasAccess, setHasAccess] = useState(false);
  
  // Local state for selected topic (doesn't trigger refetch)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Memoize navigation to prevent infinite updates
  const navigation = useMemo(
    () => lesson && topics.length > 0
      ? getLessonNavigation(params.id, params.moduleId, params.lessonId, lesson.title, topics, topicProgress, selectedTopicId)
      : null,
    [lesson, topics, topicProgress, selectedTopicId, params.id, params.moduleId, params.lessonId]
  );

  // Set navigation: Lesson name + topics list
  useSetNavigation(navigation);

  // Initialize selected topic from URL on mount
  useEffect(() => {
    const topicFromUrl = searchParams.get('topic');
    if (topicFromUrl) {
      setSelectedTopicId(topicFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!user?.id) {
        setError('Please sign in to access this content');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        
        // Check lesson access first
        const accessCheck = await checkLessonAccess(user.id, params.lessonId);
        
        if (!accessCheck.accessible) {
          setError(accessCheck.reason || 'You do not have access to this lesson');
          setHasAccess(false);
          setLoading(false);
          return;
        }
        
        setHasAccess(true);
        
        // Fetch module for breadcrumbs
        const moduleData = await getModule(params.moduleId);
        setModule(moduleData);
        
        // Fetch lesson
        const lessonData = await getLesson(params.lessonId);
        setLesson(lessonData);
        
        // Fetch topics from Confluence
        const topicsResult = await getConfluenceLessonTopics(lessonData.confluence_parent_page_id);
        
        if (!topicsResult.success || !topicsResult.data) {
          throw new Error(topicsResult.error || 'Failed to fetch topics');
        }
        
        const topicsList = topicsResult.data;
        setTopics(topicsList);
        
        // Fetch progress for all topics
        const progressData = await getLessonTopicProgress(user.id, params.lessonId);
        const progressMap = new Map();
        progressData.forEach((progress) => {
          progressMap.set(progress.confluence_page_id, progress);
        });
        setTopicProgress(progressMap);
        
        // Auto-select first topic if none selected
        const topicFromUrl = searchParams.get('topic');
        if (!topicFromUrl && topicsList.length > 0) {
          // Find first incomplete topic or default to first
          const firstIncomplete = topicsList.find(
            (topic: any) => !progressMap.get(topic.id)?.completed
          );
          const defaultTopic = firstIncomplete || topicsList[0];
          
          // Set local state and update URL without navigation
          setSelectedTopicId(defaultTopic.id);
          const url = `${paths.app.courses.lesson(params.id, params.moduleId, params.lessonId)}?topic=${defaultTopic.id}`;
          window.history.replaceState({}, '', url);
        }
        
      } catch (err) {
        console.error('Error fetching lesson data:', err);
        setError('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [params.lessonId, user?.id, params.id, params.moduleId, searchParams]);

  const handleTopicComplete = async () => {
    if (!user?.id || !lesson || !selectedTopicId) return;
    
    const currentTopic = topics.find(t => t.id === selectedTopicId);
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
      const currentIndex = topics.findIndex(t => t.id === selectedTopicId);
      if (currentIndex !== -1 && currentIndex < topics.length - 1) {
        const nextTopic = topics[currentIndex + 1];
        setSelectedTopicId(nextTopic.id);
        // Update URL without navigation
        const url = `${paths.app.courses.lesson(params.id, params.moduleId, params.lessonId)}?topic=${nextTopic.id}`;
        window.history.pushState({}, '', url);
      }
    } catch (err) {
      console.error('Error marking topic complete:', err);
    }
  };

  const handlePreviousTopic = () => {
    if (!selectedTopicId) return;
    
    const currentIndex = topics.findIndex(t => t.id === selectedTopicId);
    if (currentIndex > 0) {
      const previousTopic = topics[currentIndex - 1];
      setSelectedTopicId(previousTopic.id);
      // Update URL without navigation
      const url = `${paths.app.courses.lesson(params.id, params.moduleId, params.lessonId)}?topic=${previousTopic.id}`;
      window.history.pushState({}, '', url);
    }
  };

  const handleNextTopic = () => {
    if (!selectedTopicId) return;
    
    const currentIndex = topics.findIndex(t => t.id === selectedTopicId);
    if (currentIndex !== -1 && currentIndex < topics.length - 1) {
      const nextTopic = topics[currentIndex + 1];
      setSelectedTopicId(nextTopic.id);
      // Update URL without navigation
      const url = `${paths.app.courses.lesson(params.id, params.moduleId, params.lessonId)}?topic=${nextTopic.id}`;
      window.history.pushState({}, '', url);
    }
  };

  if (loading) {
    return (
      <DashboardContent maxWidth="lg">
        <Skeleton variant="text" width="60%" height={60} />
        <Skeleton variant="rectangular" height={600} sx={{ mt: 3 }} />
      </DashboardContent>
    );
  }

  if (error || !hasAccess) {
    return (
      <DashboardContent maxWidth="lg">
        <Alert 
          severity="error"
          action={
            !user?.id ? (
              <Button color="inherit" size="small" onClick={() => router.push('/auth/sign-in')}>
                Sign In
              </Button>
            ) : (
              <Button color="inherit" size="small" onClick={() => router.push(paths.app.root)}>
                Back to Dashboard
              </Button>
            )
          }
        >
          {error || 'Access denied'}
        </Alert>
      </DashboardContent>
    );
  }

  if (!lesson) {
    return (
      <DashboardContent maxWidth="lg">
        <Alert severity="error">Lesson not found</Alert>
      </DashboardContent>
    );
  }

  const selectedTopic = topics.find(t => t.id === selectedTopicId);
  const currentTopicIndex = selectedTopicId ? topics.findIndex(t => t.id === selectedTopicId) : -1;
  const hasPreviousTopic = currentTopicIndex > 0;
  const hasNextTopic = currentTopicIndex !== -1 && currentTopicIndex < topics.length - 1;

  return (
    <DashboardContent maxWidth="lg">
      {/* Breadcrumbs */}
      {module && lesson && (
        <CustomBreadcrumbs
          heading={lesson.title}
          links={[
            { name: 'My learning', href: paths.app.root },
            { name: module.title, href: paths.app.courses.module(params.id, params.moduleId) },
            { name: lesson.title }
          ]}
          sx={{ mb: 5 }}
        />
      )}

      {/* Topic Content */}
      {selectedTopic ? (
        <TopicViewer
          confluencePageId={selectedTopic.id}
          topicTitle={selectedTopic.title}
          isCompleted={topicProgress.get(selectedTopic.id)?.completed || false}
          onComplete={handleTopicComplete}
          onPrevious={hasPreviousTopic ? handlePreviousTopic : undefined}
          onNext={hasNextTopic ? handleNextTopic : undefined}
        />
      ) : topics.length > 0 ? (
        <Alert severity="info">
          Select a topic from the navigation to begin
        </Alert>
      ) : (
        <Alert severity="info">
          No topics available in this lesson yet
        </Alert>
      )}
    </DashboardContent>
  );
}
