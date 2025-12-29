'use client';

// =============================================
// Module Detail Page - Shows Lessons
// =============================================

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { Iconify } from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { paths } from 'src/routes/paths';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useSetNavigation } from 'src/layouts/dashboard/navigation-context';
import { getCourseNavigation } from 'src/layouts/dashboard/nav-utils';
import { 
  getAccessibleModules, 
  getAccessibleLessons, 
} from 'src/lib/visibility-utils';

import { 
  getCourse,
  getModule,
  getModules,
  getLessons,
} from 'src/lib/database';

import { supabase } from 'src/lib/supabase';

type Props = {
  params: { 
    id: string;
    moduleId: string;
  };
};

export default function ModuleDetailPage({ params }: Props) {
  const router = useRouter();
  const { user } = useAuthContext();
  
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
      
      // Get progress for each accessible lesson from student_lesson_progress table
      const progressMap = new Map<string, { progress: number; completed: boolean }>();
      for (const lesson of lessonsData) {
        if (accessibleLess.has(lesson.id)) {
          const { data: lessonProgress } = await supabase
            .from('student_lesson_progress')
            .select('progress_percentage, completed')
            .eq('student_id', user.id)
            .eq('lesson_id', lesson.id)
            .single();
          
          if (lessonProgress) {
            progressMap.set(lesson.id, {
              progress: lessonProgress.progress_percentage || 0,
              completed: lessonProgress.completed || false
            });
          } else {
            progressMap.set(lesson.id, { progress: 0, completed: false });
          }
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

  const handleLessonClick = (lessonId: string) => {
    if (accessibleLessons.has(lessonId)) {
      router.push(paths.app.courses.lesson(params.id, params.moduleId, lessonId));
    }
  };

  if (loading) {
    return (
      <DashboardContent maxWidth="lg">
        <Skeleton variant="text" width="60%" height={60} />
        <Skeleton variant="rectangular" height={400} sx={{ mt: 3 }} />
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
            Back to Dashboard
          </Button>
        </Stack>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth="lg">
      {/* Breadcrumbs */}
      {course && module && (
        <CustomBreadcrumbs
          links={[
            { name: 'My learning', href: paths.app.root },
            { name: course.title },
          ]}
          sx={{ mb: 3 }}
        />
      )}

      {/* Module Title */}
      <Typography variant="h3" sx={{ mb: 2 }}>
        {module?.title}
      </Typography>

      {/* Module Description */}
      {module?.description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 5 }}>
          {module.description}
        </Typography>
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
                  cursor: isAccessible ? 'pointer' : 'default',
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
                onClick={() => !isLocked && handleLessonClick(lesson.id)}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ flex: 1 }}>
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
                        bgcolor: 'action.hover',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon="eva:lock-fill" width={24} sx={{ color: 'text.disabled' }} />
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
