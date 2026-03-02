'use client';

// =============================================
// Lesson Page - Topics handled via ?topic= query param
// =============================================

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { getCourseNavigation } from 'src/layouts/dashboard/nav-utils';
import { useCourseDataContext } from 'src/contexts/course-data-context';
import { useSetNavigation } from 'src/layouts/dashboard/navigation-context';
import {
  trackTopicAccess,
  checkLessonAccess,
  markTopicCompleteWithCascade,
} from 'src/lib/database';

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
  const {
    getCourseData,
    getModulesForCourse,
    getAccessibleModulesForCourse,
    getLessonData,
    getLessonsForModule,
    getAccessibleLessonsForModule,
    getLessonProgressForModule,
    getTopicsForLesson,
    getLessonTopicProgress,
    invalidateLessonProgress,
  } = useCourseDataContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [accessibleModules, setAccessibleModules] = useState<Set<string>>(new Set());
  const [lesson, setLesson] = useState<any>(null);

  // All lessons/accessibility/progress indexed by moduleId — powers the full nav
  const [allLessonsMap, setAllLessonsMap] = useState<Map<string, any[]>>(new Map());
  const [allAccessibleLessonsMap, setAllAccessibleLessonsMap] = useState<Map<string, Set<string>>>(
    new Map()
  );
  const [allLessonProgressMap, setAllLessonProgressMap] = useState<
    Map<string, Map<string, { progress: number; completed: boolean }>>
  >(new Map());
  const [hasAccess, setHasAccess] = useState(false);

  // Topics and progress per lesson — current lesson seeded on load, others fetched on demand
  const [allTopicsMap, setAllTopicsMap] = useState<Map<string, any[]>>(new Map());
  const [allTopicProgressMap, setAllTopicProgressMap] = useState<Map<string, Map<string, any>>>(
    new Map()
  );
  const fetchingLessonsRef = useRef<Set<string>>(new Set());

  // Topic from URL is the source of truth
  const topicFromUrl = searchParams.get('topic');

  // Fallback state only used when auto-selecting (no topic in URL)
  const [autoSelectedTopicId, setAutoSelectedTopicId] = useState<string | null>(null);

  // Use URL topic if present, otherwise use auto-selected
  const selectedTopicId = topicFromUrl || autoSelectedTopicId;

  // Derived: current lesson's topics and progress from the maps
  const topics = useMemo(
    () => allTopicsMap.get(params.lessonId) ?? [],
    [allTopicsMap, params.lessonId]
  );
  const topicProgress = useMemo(
    () => allTopicProgressMap.get(params.lessonId) ?? new Map(),
    [allTopicProgressMap, params.lessonId]
  );

  // On-demand: fetch lessons for a module when its lessons aren't loaded yet
  const fetchingModulesRef = useRef<Set<string>>(new Set());
  const handleModuleExpand = useCallback(
    async (moduleId: string) => {
      if (fetchingModulesRef.current.has(moduleId)) return;
      fetchingModulesRef.current.add(moduleId);

      const [lessonsData, accessibleLess, progressMap] = await Promise.all([
        getLessonsForModule(moduleId),
        getAccessibleLessonsForModule(moduleId),
        getLessonProgressForModule(moduleId),
      ]);

      setAllLessonsMap((prev) => new Map(prev).set(moduleId, lessonsData));
      setAllAccessibleLessonsMap((prev) => new Map(prev).set(moduleId, accessibleLess));
      setAllLessonProgressMap((prev) => new Map(prev).set(moduleId, progressMap));
    },
    [getLessonsForModule, getAccessibleLessonsForModule, getLessonProgressForModule]
  );

  // On-demand topic fetching: called when a lesson is expanded in the nav
  const handleLessonExpand = useCallback(
    (lessonId: string) => {
      if (!user?.id) return;
      if (fetchingLessonsRef.current.has(lessonId)) return;
      fetchingLessonsRef.current.add(lessonId);

      getLessonData(lessonId)
        .then(async (lessonData) => {
          if (!lessonData?.confluence_parent_page_id) return;

          const [topicsList, progressData] = await Promise.all([
            getTopicsForLesson(lessonId, lessonData.confluence_parent_page_id),
            getLessonTopicProgress(lessonId),
          ]);

          const progressMap = new Map<string, any>();
          progressData.forEach((p: any) => progressMap.set(p.confluence_page_id, p));

          setAllTopicsMap((prev) => new Map(prev).set(lessonId, topicsList));
          setAllTopicProgressMap((prev) => new Map(prev).set(lessonId, progressMap));
        })
        .catch((err) => {
          console.error('Error fetching topics for lesson:', err);
          fetchingLessonsRef.current.delete(lessonId);
        });
    },
    [user?.id, getLessonData, getTopicsForLesson, getLessonTopicProgress]
  );

  // Memoize navigation to prevent infinite updates
  const navigation = useMemo(
    () =>
      course && modules.length > 0 && lesson
        ? getCourseNavigation(
            params.id,
            course.title,
            modules,
            accessibleModules,
            allLessonsMap,
            allAccessibleLessonsMap,
            allLessonProgressMap,
            allTopicsMap,
            allTopicProgressMap,
            selectedTopicId,
            handleLessonExpand,
            handleModuleExpand
          )
        : null,
    [
      course,
      modules,
      accessibleModules,
      allLessonsMap,
      allAccessibleLessonsMap,
      allLessonProgressMap,
      lesson,
      allTopicsMap,
      allTopicProgressMap,
      selectedTopicId,
      params.id,
      handleLessonExpand,
      handleModuleExpand,
    ]
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

      // Fetch all data in parallel
      const [courseData, allModules, accessibleMods, lessonData] = await Promise.all([
        getCourseData(params.id),
        getModulesForCourse(params.id),
        getAccessibleModulesForCourse(params.id),
        getLessonData(params.lessonId),
      ]);

      setCourse(courseData);
      setModules(allModules);
      setAccessibleModules(accessibleMods);
      setLesson(lessonData);

      // Fetch lessons/accessibility/progress for ALL modules in parallel
      const perModuleResults = await Promise.all(
        allModules.map((mod: any) =>
          Promise.all([
            getLessonsForModule(mod.id),
            getAccessibleLessonsForModule(mod.id),
            getLessonProgressForModule(mod.id),
          ])
        )
      );

      const newLessonsMap = new Map<string, any[]>();
      const newAccessibleMap = new Map<string, Set<string>>();
      const newProgressMap = new Map<
        string,
        Map<string, { progress: number; completed: boolean }>
      >();

      allModules.forEach((mod: any, i: number) => {
        const [modLessons, modAccessible, modProgress] = perModuleResults[i];
        newLessonsMap.set(mod.id, modLessons);
        newAccessibleMap.set(mod.id, modAccessible);
        newProgressMap.set(mod.id, modProgress);
      });

      setAllLessonsMap(newLessonsMap);
      setAllAccessibleLessonsMap(newAccessibleMap);
      setAllLessonProgressMap(newProgressMap);

      if (!lessonData) {
        throw new Error('Lesson not found');
      }

      // Fetch topics from Confluence (now cached in context)
      if (!lessonData.confluence_parent_page_id) {
        throw new Error('Lesson has no Confluence page configured');
      }
      const topicsList = await getTopicsForLesson(
        params.lessonId,
        lessonData.confluence_parent_page_id
      );

      if (!topicsList.length) {
        throw new Error('Failed to fetch topics');
      }

      // Seed the current lesson's topics into the maps
      const progressData = await getLessonTopicProgress(params.lessonId);
      const progressMap = new Map();
      progressData.forEach((progress) => {
        progressMap.set(progress.confluence_page_id, progress);
      });

      setAllTopicsMap((prev) => new Map(prev).set(params.lessonId, topicsList));
      setAllTopicProgressMap((prev) => new Map(prev).set(params.lessonId, progressMap));

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
  }, [
    user?.id,
    params.lessonId,
    params.moduleId,
    params.id,
    getCourseData,
    getModulesForCourse,
    getAccessibleModulesForCourse,
    getLessonData,
    getLessonsForModule,
    getAccessibleLessonsForModule,
    getLessonProgressForModule,
    getTopicsForLesson,
    getLessonTopicProgress,
    router,
    searchParams,
  ]);

  useEffect(() => {
    fetchLessonData();
  }, [fetchLessonData]);

  const handleTopicComplete = async () => {
    if (!user?.id || !lesson || !selectedTopicId) return;

    const currentTopic = topics.find((t) => t.id === selectedTopicId);
    if (!currentTopic) return;

    try {
      // Use cascade function to automatically update lesson/module progress
      // Pass topics array to avoid redundant Confluence API call
      await markTopicCompleteWithCascade(user.id, params.lessonId, currentTopic.id, topics);

      // Update local state - this will trigger re-render and show "Next" button
      setAllTopicProgressMap((prev) => {
        const lessonMap = new Map(prev.get(params.lessonId) ?? new Map());
        lessonMap.set(currentTopic.id, {
          completed: true,
          completed_at: new Date().toISOString(),
        });
        return new Map(prev).set(params.lessonId, lessonMap);
      });

      // Invalidate cache so dashboard shows updated progress
      invalidateLessonProgress(params.lessonId);

      // Check if this was the last topic
      const currentIndex = topics.findIndex((t) => t.id === selectedTopicId);
      const isLastTopic = currentIndex === topics.length - 1;

      // If last topic, redirect to home after a short delay
      if (isLastTopic) {
        setTimeout(() => {
          router.push(paths.app.root);
        }, 1500);
      }
      // Don't auto-navigate to next topic - let user click "Next" button
    } catch (err) {
      console.error('Error marking topic complete:', err);
    }
  };

  const handlePreviousTopic = () => {
    if (!selectedTopicId) return;

    const currentIndex = topics.findIndex((t) => t.id === selectedTopicId);
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

    const currentIndex = topics.findIndex((t) => t.id === selectedTopicId);
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
        {/* Content area skeleton */}
        <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1, mb: 3 }} />
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

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);
  const currentTopicIndex = selectedTopicId
    ? topics.findIndex((t) => t.id === selectedTopicId)
    : -1;
  const hasPreviousTopic = currentTopicIndex > 0;
  const hasNextTopic = currentTopicIndex !== -1 && currentTopicIndex < topics.length - 1;

  return (
    <DashboardContent maxWidth="lg">
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
        <Alert severity="info">Select a topic from the navigation to begin</Alert>
      ) : (
        <Alert severity="info">No topics available in this lesson yet</Alert>
      )}
    </DashboardContent>
  );
}
