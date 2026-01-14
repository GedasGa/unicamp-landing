'use client';

// =============================================
// Lesson Page - Topics handled via ?topic= query param
// =============================================

import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { getLessonNavigation } from 'src/layouts/dashboard/nav-utils';
import { useCourseDataContext } from 'src/contexts/course-data-context';
import { useSetNavigation } from 'src/layouts/dashboard/navigation-context';
import { 
  trackTopicAccess,
  checkLessonAccess,
  getLessonTopicProgress,
  markTopicCompleteWithCascade,
} from 'src/lib/database';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { TopicViewer } from 'src/sections/learning/topic-viewer';

import { useAuthContext } from 'src/auth/hooks';

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
  const { getModuleData, getLessonData, getTopicsForLesson, invalidateLessonProgress } = useCourseDataContext();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [module, setModule] = useState<any>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [topicProgress, setTopicProgress] = useState<Map<string, any>>(new Map());
  const [hasAccess, setHasAccess] = useState(false);
  
  // Topic from URL is the source of truth
  const topicFromUrl = searchParams.get('topic');
  
  // Fallback state only used when auto-selecting (no topic in URL)
  const [autoSelectedTopicId, setAutoSelectedTopicId] = useState<string | null>(null);
  
  // Use URL topic if present, otherwise use auto-selected
  const selectedTopicId = topicFromUrl || autoSelectedTopicId;

  // Memoize navigation to prevent infinite updates
  const navigation = useMemo(
    () => lesson && topics.length > 0
      ? getLessonNavigation(params.id, params.moduleId, params.lessonId, lesson.title, topics, topicProgress, selectedTopicId)
      : null,
    [lesson, topics, topicProgress, selectedTopicId, params.id, params.moduleId, params.lessonId]
  );

  // Set navigation: Lesson name + topics list
  useSetNavigation(navigation);
  
  // Track topic access when topic changes
  useEffect(() => {
    if (selectedTopicId && user?.id && params.lessonId) {
      trackTopicAccess(user.id, params.lessonId, selectedTopicId);
    }
  }, [selectedTopicId, user?.id, params.lessonId]);

  const fetchLessonData = useCallback(async () => {
    if (!user?.id) {
      setError('Please sign in to access this content');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Check lesson access first (this is lesson-specific, not cached)
      const accessCheck = await checkLessonAccess(user.id, params.lessonId);
      
      if (!accessCheck.accessible) {
        setError(accessCheck.reason || 'You do not have access to this lesson');
        setHasAccess(false);
        setLoading(false);
        return;
      }
      
      setHasAccess(true);
      
      // Fetch module and lesson using context (with caching)
      const [moduleData, lessonData] = await Promise.all([
        getModuleData(params.moduleId),
        getLessonData(params.lessonId),
      ]);
      
      setModule(moduleData);
      setLesson(lessonData);
      
      if (!lessonData) {
        throw new Error('Lesson not found');
      }
      
      // Fetch topics from Confluence (now cached in context)
      if (!lessonData.confluence_parent_page_id) {
        throw new Error('Lesson has no Confluence page configured');
      }
      const topicsList = await getTopicsForLesson(params.lessonId, lessonData.confluence_parent_page_id);
      
      if (!topicsList.length) {
        throw new Error('Failed to fetch topics');
      }
      
      setTopics(topicsList);
      
      // Fetch progress for all topics (lesson-specific)
      const progressData = await getLessonTopicProgress(user.id, params.lessonId);
      const progressMap = new Map();
      progressData.forEach((progress) => {
        progressMap.set(progress.confluence_page_id, progress);
      });
      setTopicProgress(progressMap);
      
      // Auto-select first topic if none in URL
      const currentTopicFromUrl = searchParams.get('topic');
      if (!currentTopicFromUrl && topicsList.length > 0) {
        // Find first incomplete topic or default to first
        const firstIncomplete = topicsList.find(
          (topic: any) => !progressMap.get(topic.id)?.completed
        );
        const defaultTopic = firstIncomplete || topicsList[0];
        
        // Set fallback state (URL will be updated, then topicFromUrl takes over)
        setAutoSelectedTopicId(defaultTopic.id);
        router.replace(
          `${paths.app.courses.lesson(params.id, params.moduleId, params.lessonId)}?topic=${defaultTopic.id}`,
          { scroll: false }
        );
      }
      
    } catch (err) {
      console.error('Error fetching lesson data:', err);
      setError('Failed to load lesson');
    } finally {
      setLoading(false);
    }
  }, [user?.id, params.lessonId, params.moduleId, params.id, getModuleData, getLessonData, getTopicsForLesson, router, searchParams]);

  useEffect(() => {
    fetchLessonData();
  }, [fetchLessonData]);

  const handleTopicComplete = async () => {
    if (!user?.id || !lesson || !selectedTopicId) return;
    
    const currentTopic = topics.find(t => t.id === selectedTopicId);
    if (!currentTopic) return;
    
    try {
      // Use cascade function to automatically update lesson/module progress
      // Pass topics array to avoid redundant Confluence API call
      await markTopicCompleteWithCascade(user.id, params.lessonId, currentTopic.id, topics);
      
      // Update local state - this will trigger re-render and show "Next" button
      setTopicProgress(prev => {
        const newMap = new Map(prev);
        newMap.set(currentTopic.id, { 
          completed: true, 
          completed_at: new Date().toISOString() 
        });
        return newMap;
      });
      
      // Invalidate cache so dashboard/module pages show updated progress
      invalidateLessonProgress(params.lessonId);
      
      // Check if this was the last topic
      const currentIndex = topics.findIndex(t => t.id === selectedTopicId);
      const isLastTopic = currentIndex === topics.length - 1;
      
      // If last topic, redirect to module page after a short delay
      if (isLastTopic) {
        setTimeout(() => {
          router.push(paths.app.courses.module(params.id, params.moduleId));
        }, 1500);
      }
      // Don't auto-navigate to next topic - let user click "Next" button
    } catch (err) {
      console.error('Error marking topic complete:', err);
    }
  };

  const handlePreviousTopic = () => {
    if (!selectedTopicId) return;
    
    const currentIndex = topics.findIndex(t => t.id === selectedTopicId);
    if (currentIndex > 0) {
      const previousTopic = topics[currentIndex - 1];
      router.replace(
        `${paths.app.courses.lesson(params.id, params.moduleId, params.lessonId)}?topic=${previousTopic.id}`,
        { scroll: false }
      );
    }
  };

  const handleNextTopic = () => {
    if (!selectedTopicId) return;
    
    const currentIndex = topics.findIndex(t => t.id === selectedTopicId);
    if (currentIndex !== -1 && currentIndex < topics.length - 1) {
      const nextTopic = topics[currentIndex + 1];
      router.replace(
        `${paths.app.courses.lesson(params.id, params.moduleId, params.lessonId)}?topic=${nextTopic.id}`,
        { scroll: false }
      );
    }
  };

  if (loading) {
    return (
      <DashboardContent maxWidth="lg">
        {/* Breadcrumbs skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="40%" height={20} />
        </Box>
        
        {/* Heading skeleton */}
        <Skeleton variant="text" width="60%" height={48} sx={{ mb: 3 }} />
        
        {/* Topic selector skeleton */}
        <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, mb: 3 }} />
        
        {/* Content area skeleton */}
        <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 2 }} />
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
                Back to Home
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
            { name: 'Home', href: paths.app.root },
            { name: module.title, href: paths.app.courses.module(params.id, params.moduleId) },
            { name: lesson.title }
          ]}
          backHref={paths.app.courses.module(params.id, params.moduleId)}
          backButtonText='Back to Module'
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
