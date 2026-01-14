'use client';

// =============================================
// Module Detail Page - Shows Lessons
// =============================================

import { useRouter } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

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
import { getCourseNavigation } from 'src/layouts/dashboard/nav-utils';
import { useSetNavigation } from 'src/layouts/dashboard/navigation-context';
import { 
  getCourse,
  getModule,
  getModules,
  getLessons,
} from 'src/lib/database';
import { 
  getAccessibleModules, 
  getAccessibleLessons, 
} from 'src/lib/visibility-utils';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useAuthContext } from 'src/auth/hooks';

type Props = {
  params: { 
    id: string;
    moduleId: string;
  };
};

export default function ModuleDetailPage({ params }: Props) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { selectedGroup } = useGroupContext();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<any>(null);
  const [module, setModule] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [accessibleModules, setAccessibleModules] = useState<Set<string>>(new Set());
  const [lessons, setLessons] = useState<any[]>([]);
  const [accessibleLessons, setAccessibleLessons] = useState<Set<string>>(new Set());
  const [lessonProgress, setLessonProgress] = useState<Map<string, { progress: number; completed: boolean }>>(new Map());
  
  // Show course modules in navigation
  const navigation = useMemo(() => {
    if (!course || modules.length === 0) return null;
    
    // Add locked status to modules based on accessibility
    const modulesWithLockStatus = modules.map((mod: any) => ({
      ...mod,
      locked: !accessibleModules.has(mod.id),
    }));
    
    return getCourseNavigation(params.id, course.title, modulesWithLockStatus, params.moduleId);
  }, [course, modules, accessibleModules, params.id, params.moduleId]);

  // Set navigation: Course modules list
  useSetNavigation(navigation);

  const fetchModuleData = async () => {
    if (!user?.id) {
      setError('Please sign in to access this content');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Fetch course for breadcrumbs
      const courseData = await getCourse(params.id);
      setCourse(courseData);
      
      // Fetch all modules in the course for navigation
      const allModules = await getModules(params.id);
      setModules(allModules);
      
      // Fetch current module
      const moduleData = await getModule(params.moduleId);
      setModule(moduleData);
      
      // Fetch lessons for this module
      const lessonsData = await getLessons(params.moduleId);
      setLessons(lessonsData);
      
      // Use centralized visibility logic
      const accessibleMods = await getAccessibleModules(user.id, params.id);
      setAccessibleModules(accessibleMods);
      
      const accessibleLess = await getAccessibleLessons(user.id, params.moduleId);
      setAccessibleLessons(accessibleLess);
      
      // Get progress for all accessible lessons in a single batch query
      const progressMap = new Map<string, { progress: number; completed: boolean }>();
      const accessibleLessonIds = Array.from(accessibleLess);
      
      if (accessibleLessonIds.length > 0) {
        const { data: allLessonProgress } = await supabase
          .from('student_lesson_progress')
          .select('lesson_id, progress_percentage, completed')
          .eq('student_id', user.id)
          .in('lesson_id', accessibleLessonIds);
        
        // Create a map of lesson progress
        const progressLookup = new Map(
          (allLessonProgress || []).map(lp => [
            lp.lesson_id,
            {
              progress: lp.progress_percentage || 0,
              completed: lp.completed || false
            }
          ])
        );
        
        // Add progress for each accessible lesson (including 0 progress for new lessons)
        for (const lessonId of accessibleLessonIds) {
          progressMap.set(
            lessonId,
            progressLookup.get(lessonId) || { progress: 0, completed: false }
          );
        }
      }
      setLessonProgress(progressMap);
      
    } catch (err) {
      console.error('Error fetching module data:', err);
      setError('Failed to load module. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModuleData();
  }, [params.moduleId, params.id, user?.id]);

  const handleRetry = () => {
    fetchModuleData();
  };

  const handleLessonClick = async (lessonId: string) => {
    if (accessibleLessons.has(lessonId)) {
      router.push(paths.app.courses.lesson(params.id, params.moduleId, lessonId));
    } else {
      // Lesson is locked, fetch visibility data to get unlocked_at
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
        {/* Breadcrumbs skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton variant="text" width="30%" height={20} />
        </Box>
        
        {/* Heading skeleton */}
        <Skeleton variant="text" width="50%" height={48} sx={{ mb: 1 }} />
        
        {/* Description skeleton */}
        <Skeleton variant="text" width="70%" height={24} sx={{ mb: 5 }} />
        
        {/* Lesson cards skeleton */}
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
        <Alert 
          severity="error"
          sx={{ mb: 3 }}
        >
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
            Back to Home
          </Button>
        </Stack>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth="lg">
      {/* Breadcrumbs with heading and subtitle */}
      {course && module && (
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: paths.app.root },
            { name: course.title },
          ]}
          heading={module.title}
          subtitle={module.description}
          backButtonText='Back to Home'
          sx={{ mb: 5 }}
        />
      )}

      {lessons.length === 0 ? (
        <Alert severity="info">
          No lessons available in this module yet.
        </Alert>
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
                    <Typography variant="subtitle2"           sx={{
                        color: isLocked ? 'text.disabled' : 'text.primary',
                      }}>
                      Lesson {index + 1}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: isLocked ? 'text.disabled' : 'text.primary',
                      }}
                    >
                      {lesson.title}
                    </Typography>
                  </Box>

                  {/* Completed */}
                  {isCompleted && (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon="eva:checkmark-circle-fill" width={24} sx={{ color: 'white' }} />
                    </Box>
                  )}

                  {/* In Progress */}
                  {isInProgress && (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon="eva:clock-fill" width={24} sx={{ color: 'white' }} />
                    </Box>
                  )}

                  {/* Not Started */}
                  {isNotStarted && (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'action.hover',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon="eva:radio-button-off-outline" width={24} sx={{ color: 'text.secondary' }} />
                    </Box>
                  )}

                  {/* Locked */}
                  {isLocked && (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'action.selected',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
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
