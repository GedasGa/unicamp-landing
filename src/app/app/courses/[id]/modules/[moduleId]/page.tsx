'use client';

// =============================================
// Module Detail Page - Shows Lessons
// =============================================

import { useRouter } from 'next/navigation';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { fDateTime } from 'src/utils/format-time';

import { supabase } from 'src/lib/supabase';
import { DashboardContent } from 'src/layouts/dashboard';
import { useGroupContext } from 'src/contexts/group-context';
import { useCourseDataContext } from 'src/contexts/course-data-context';
import { getModuleFullNavigation } from 'src/layouts/dashboard/nav-utils';
import { useSetNavigation } from 'src/layouts/dashboard/navigation-context';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';
import { useTranslation } from 'react-i18next';

type Props = {
  params: {
    id: string;
    moduleId: string;
  };
};

export default function ModuleDetailPage({ params }: Props) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { t } = useTranslation('app');
  const { selectedGroup } = useGroupContext();
  const {
    getCourseData,
    getModuleData,
    getModulesForCourse,
    getAccessibleModulesForCourse,
    getLessonData,
    getLessonsForModule,
    getAccessibleLessonsForModule,
    getLessonProgressForModule,
    getTopicsForLesson,
    getLessonTopicProgress,
  } = useCourseDataContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<any>(null);
  const [module, setModule] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [accessibleModules, setAccessibleModules] = useState<Set<string>>(new Set());

  // All lessons/accessibility/progress indexed by moduleId — powers both nav and cards
  const [allLessonsMap, setAllLessonsMap] = useState<Map<string, any[]>>(new Map());
  const [allAccessibleLessonsMap, setAllAccessibleLessonsMap] = useState<Map<string, Set<string>>>(new Map());
  const [allLessonProgressMap, setAllLessonProgressMap] = useState<Map<string, Map<string, { progress: number; completed: boolean }>>>(new Map());

  // Topics and progress per lesson — accumulate as user expands lessons
  const [allTopicsMap, setAllTopicsMap] = useState<Map<string, any[]>>(new Map());
  const [allTopicProgressMap, setAllTopicProgressMap] = useState<Map<string, Map<string, any>>>(new Map());
  const fetchingLessonsRef = useRef<Set<string>>(new Set());

  // Derived convenience refs for the current module (used by card rendering)
  const lessons = useMemo(() => allLessonsMap.get(params.moduleId) ?? [], [allLessonsMap, params.moduleId]);
  const accessibleLessons = useMemo(() => allAccessibleLessonsMap.get(params.moduleId) ?? new Set<string>(), [allAccessibleLessonsMap, params.moduleId]);
  const lessonProgress = useMemo(() => allLessonProgressMap.get(params.moduleId) ?? new Map<string, any>(), [allLessonProgressMap, params.moduleId]);

  // On-demand topic fetching: called when a lesson is expanded in the nav
  const handleLessonExpand = useCallback(
    (lessonId: string) => {
      if (!user?.id) return;
      if (fetchingLessonsRef.current.has(lessonId)) return;
      fetchingLessonsRef.current.add(lessonId);

      // Fetch full lesson data first (list query may not include confluence_parent_page_id)
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

  // Build full 3-level navigation
  const navigation = useMemo(() => {
    if (!course || modules.length === 0) return null;

    return getModuleFullNavigation(
      params.id,
      course.title,
      modules,
      accessibleModules,
      allLessonsMap,
      allAccessibleLessonsMap,
      allLessonProgressMap,
      allTopicsMap,
      allTopicProgressMap,
      handleLessonExpand
    );
  }, [
    course,
    modules,
    accessibleModules,
    allLessonsMap,
    allAccessibleLessonsMap,
    allLessonProgressMap,
    allTopicsMap,
    allTopicProgressMap,
    params.id,
    handleLessonExpand,
  ]);

  useSetNavigation(navigation);

  // Fetch course structure: modules + lessons for ALL modules in parallel
  const fetchModuleData = useCallback(async () => {
    if (!user?.id) {
      setError('Please sign in to access this content');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [courseData, allModules, moduleData, accessibleMods] = await Promise.all([
        getCourseData(params.id),
        getModulesForCourse(params.id),
        getModuleData(params.moduleId),
        getAccessibleModulesForCourse(params.id),
      ]);

      setCourse(courseData);
      setModules(allModules);
      setModule(moduleData);
      setAccessibleModules(accessibleMods);

      // Fetch lessons + accessibility + progress for every module in parallel
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
      const newProgressMap = new Map<string, Map<string, { progress: number; completed: boolean }>>();

      allModules.forEach((mod: any, i: number) => {
        const [modLessons, modAccessible, modProgress] = perModuleResults[i];
        newLessonsMap.set(mod.id, modLessons);
        newAccessibleMap.set(mod.id, modAccessible);
        newProgressMap.set(mod.id, modProgress);
      });

      setAllLessonsMap(newLessonsMap);
      setAllAccessibleLessonsMap(newAccessibleMap);
      setAllLessonProgressMap(newProgressMap);

    } catch (err) {
      console.error('Error fetching module data:', err);
      setError('Failed to load module. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [
    user?.id,
    params.id,
    params.moduleId,
    getCourseData,
    getModulesForCourse,
    getModuleData,
    getAccessibleModulesForCourse,
    getLessonsForModule,
    getAccessibleLessonsForModule,
    getLessonProgressForModule,
  ]);

  useEffect(() => {
    fetchModuleData();
  }, [fetchModuleData]);

  const handleRetry = () => {
    fetchModuleData();
  };

  // Card click: navigate directly to lesson page (topic auto-selected on load)
  const handleLessonClick = async (lessonId: string) => {
    if (accessibleLessons.has(lessonId)) {
      router.push(paths.app.courses.lesson(params.id, params.moduleId, lessonId));
    } else {
      if (!selectedGroup?.id) return;

      const { data: visibilityData } = await supabase
        .from('group_lesson_visibility')
        .select('unlocked_at')
        .eq('group_id', selectedGroup.id)
        .eq('lesson_id', lessonId)
        .single();

      if (visibilityData?.unlocked_at) {
        toast.error(`Lesson is locked. It will be unlocked at ${fDateTime(visibilityData.unlocked_at)}`);
      } else {
        toast.error('Lesson is locked. It will be unlocked by your lecturer when the time comes.');
      }
    }
  };

  if (loading) {
    return (
      <DashboardContent maxWidth="lg">
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="30%" height={20} />
        </Box>
        <Skeleton variant="text" width="50%" height={48} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" height={24} sx={{ mb: 5 }} />
        <Stack spacing={2}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
          ))}
        </Stack>
      </DashboardContent>
    );
  }

  if (error || !module) {
    return (
      <DashboardContent maxWidth="lg">
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Module not found'}
        </Alert>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:refresh-fill" />}
            onClick={handleRetry}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            onClick={() => router.push(paths.app.root)}
          >
            {t('nav.backToHome')}
          </Button>
        </Stack>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth="lg">
      {course && module && (
        <CustomBreadcrumbs
          links={[
            { name: t('nav.home'), href: paths.app.root },
            { name: course.title },
          ]}
          heading={module.title}
          subtitle={module.description}
          backHref={paths.app.root}
          backButtonText={t('nav.backToHome')}
          sx={{ mb: 5 }}
        />
      )}

      {lessons.length === 0 ? (
        <Alert severity="info">No lessons available in this module yet.</Alert>
      ) : (
        <Stack spacing={2}>
          {lessons.map((lesson, index) => {
            const isAccessible = accessibleLessons.has(lesson.id);
            const isLocked = !isAccessible;
            const progressData = lessonProgress.get(lesson.id);
            const progress = progressData?.progress || 0;
            const isCompleted = progressData?.completed || false;
            const isInProgress = !isCompleted && progress > 0;
            const isNotStarted = !isCompleted && !isInProgress && isAccessible;

            return (
              <Card
                key={lesson.id}
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  border: 2,
                  borderColor: isInProgress ? 'primary.main' : 'divider',
                  bgcolor: isLocked ? 'action.hover' : 'background.paper',
                  transition: 'all 0.2s',
                  '&:hover': isAccessible
                    ? {
                        borderColor: isInProgress ? 'primary.dark' : 'primary.main',
                        boxShadow: 1,
                      }
                    : {},
                }}
                onClick={() => handleLessonClick(lesson.id)}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: isLocked ? 'text.disabled' : 'text.primary' }}
                    >
                      Lesson {index + 1}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: isLocked ? 'text.disabled' : 'text.primary' }}
                    >
                      {lesson.title}
                    </Typography>
                  </Box>

                  {isCompleted && (
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'success.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Iconify icon="eva:checkmark-circle-fill" width={24} sx={{ color: 'white' }} />
                    </Box>
                  )}
                  {isInProgress && (
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Iconify icon="eva:clock-fill" width={24} sx={{ color: 'white' }} />
                    </Box>
                  )}
                  {isNotStarted && (
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Iconify icon="eva:radio-button-off-outline" width={24} sx={{ color: 'text.secondary' }} />
                    </Box>
                  )}
                  {isLocked && (
                    <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'action.selected', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Iconify icon="eva:lock-fill" width={20} sx={{ color: 'text.disabled' }} />
                    </Box>
                  )}
                </Stack>
              </Card>
            );
          })}
        </Stack>
      )}
    </DashboardContent>
  );
}
