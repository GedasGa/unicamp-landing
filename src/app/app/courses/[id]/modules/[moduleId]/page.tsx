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
import { supabase } from 'src/lib/supabase';
import { DashboardContent } from 'src/layouts/dashboard';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useSetNavigation } from 'src/layouts/dashboard/navigation-context';

import { 
  getCourse,
  getModule,
  getModules,
  getLessons,
  getLessonVisibility,
  getStudentGroups,
  getLessonTopicProgress,
} from 'src/lib/database';

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
  const [lessonProgress, setLessonProgress] = useState<Map<string, number>>(new Map());

  // Memoize navigation to prevent infinite updates
  // Show course modules in navigation
  const navigation = useMemo(
    () => course && modules.length > 0
      ? [{
          subheader: course.title,
          items: modules.map((mod: any) => ({
            title: mod.title,
            path: paths.app.courses.module(params.id, mod.id),
            icon: !accessibleModules.has(mod.id) ? (
              <Iconify icon="eva:lock-fill" sx={{ color: 'text.disabled' }} />
            ) : (
              <Iconify icon="eva:book-outline" sx={{ color: 'primary.main' }} />
            ),
            disabled: !accessibleModules.has(mod.id),
            active: mod.id === params.moduleId,
          })),
        }]
      : null,
    [course, modules, accessibleModules, params.id, params.moduleId]
  );

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
      
      // Get user's groups
      const userGroups = await getStudentGroups(user.id);
      const userGroupIds = userGroups.map((g: any) => g.id);
      
      // Check module visibility for all modules using supabase
      const { data: moduleVisibility } = await supabase
        .from('group_module_visibility')
        .select('module_id, is_visible, unlocked_at')
        .in('group_id', userGroupIds)
        .eq('is_visible', true);

      const accessibleMods = new Set<string>();
      
      if (moduleVisibility) {
        for (const mv of moduleVisibility) {
          // Module is unlocked if:
          // 1. unlocked_at is null (no time restriction) OR
          // 2. unlocked_at is set and the date has passed
          const isUnlocked = !mv.unlocked_at || new Date(mv.unlocked_at) <= new Date();
          
          if (isUnlocked) {
            accessibleMods.add(mv.module_id);
          }
        }
      }
      
      setAccessibleModules(accessibleMods);
      
      // Check lesson visibility for each lesson in current module
      const accessible = new Set<string>();
      
      for (const lesson of lessonsData) {
        // Check visibility across all user's groups
        let hasAccessInAnyGroup = false;
        
        for (const groupId of userGroupIds) {
          const visibility = await getLessonVisibility(groupId, lesson.id);
          
          if (!visibility) {
            // No visibility record means accessible by default
            hasAccessInAnyGroup = true;
            break;
          }
          
          // Check if lesson is visible and unlocked
          if (visibility.is_visible) {
            const isUnlocked = !visibility.unlocked_at || new Date(visibility.unlocked_at) <= new Date();
            if (isUnlocked) {
              hasAccessInAnyGroup = true;
              break;
            }
          }
        }
        
        if (hasAccessInAnyGroup) {
          accessible.add(lesson.id);
        }
      }
      
      setAccessibleLessons(accessible);
      
      // Get progress for each lesson
      const progressMap = new Map<string, number>();
      for (const lesson of lessonsData) {
        if (accessible.has(lesson.id)) {
          const topicProgress = await getLessonTopicProgress(user.id, lesson.id);
          if (topicProgress && topicProgress.length > 0) {
            const completedTopics = topicProgress.filter((p: any) => p.completed).length;
            const progressPercentage = Math.round((completedTopics / topicProgress.length) * 100);
            progressMap.set(lesson.id, progressPercentage);
          } else {
            progressMap.set(lesson.id, 0);
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
            const progress = lessonProgress.get(lesson.id) || 0;
            const isCompleted = progress === 100;
            const isInProgress = progress > 0 && progress < 100;

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

                  {/* Completed - Green checkmark */}
                  {isCompleted && (
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon="eva:checkmark-fill" width={20} sx={{ color: 'white' }} />
                    </Box>
                  )}

                  {/* In Progress - Resume button with avatar */}
                  {isInProgress && (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="contained"
                        endIcon={<Iconify icon="eva:arrow-forward-fill" />}
                        sx={{ textTransform: 'none' }}
                      >
                        Resume
                      </Button>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: 'primary.lighter',
                          color: 'primary.main',
                        }}
                      >
                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </Avatar>
                    </Stack>
                  )}

                  {/* Locked */}
                  {isLocked && (
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
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
