'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { DashboardContent } from 'src/layouts/dashboard';
import { isModuleUnlocked } from 'src/lib/visibility-utils';
import { 
  getStudentGroups, 
  getStudentCourses, 
  getStudentModuleProgress,
  getCourseVisibleModules,
  getLastAccessedContent 
} from 'src/lib/database';

import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';

import { useAuthContext } from 'src/auth/hooks';
import { CalendarView } from 'src/sections/dashboard/calendar';
import { CONFIG } from 'src/config-global';

import type { Database } from 'src/types/database.types';

// ----------------------------------------------------------------------

type Course = Database['public']['Tables']['courses']['Row'];
type Module = Database['public']['Tables']['modules']['Row'] & {
  is_visible: boolean;
  progress_percentage: number;
};
type Lesson = Database['public']['Tables']['lessons']['Row'] & {
  is_visible: boolean;
};

interface CourseWithModules extends Course {
  modules: Module[];
}

export function DashboardView() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [courses, setCourses] = useState<CourseWithModules[]>([]);
  const [loading, setLoading] = useState(true);
  const [continueData, setContinueData] = useState<any>(null);

  useEffect(() => {
    fetchCourses();
    fetchContinueData();
  }, [user]);

  const fetchContinueData = async () => {
    if (!user?.id) return;

    try {
      const data = await getLastAccessedContent(user.id);
      setContinueData(data);
    } catch (error) {
      console.error('Error fetching continue data:', error);
    }
  };

  const fetchCourses = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      // Use database helper functions
      const userGroups = await getStudentGroups(user.id);

      if (!userGroups?.length) {
        setCourses([]);
        return;
      }

      const groupIds = userGroups.map((ug) => ug.group_id);

      // Get courses assigned to student
      const studentCourses = await getStudentCourses(user.id);

      if (!studentCourses?.length) {
        setCourses([]);
        return;
      }

      // Get modules for each course with visibility and progress
      const coursesWithModules = await Promise.all(
        studentCourses.map(async (course: any) => {
          if (!course?.id) {
            console.error('Course missing id:', course);
            return null;
          }

          // Use database helper for module visibility
          const moduleVisibility = await getCourseVisibleModules(user.id, course.id, groupIds);

          if (!moduleVisibility?.length) {
            return { ...course, modules: [] };
          }

          const moduleIds = moduleVisibility.map((mv) => mv.module_id);

          // Use database helper function for progress
          const progressMap = await getStudentModuleProgress(user.id, moduleIds);

          const modules: Module[] = moduleVisibility
            .map((mv: any) => {
              // Use consistent unlock logic
              const isUnlocked = isModuleUnlocked(mv.unlocked_at, mv.is_visible);
              
              return {
                ...mv.modules,
                is_visible: isUnlocked, // Use this to determine if clickable
                unlocked_at: mv.unlocked_at, // Keep this for display
                progress_percentage: progressMap.get(mv.module_id) || 0,
              };
            })
            .sort((a, b) => a.order_index - b.order_index);

          return {
            ...course,
            modules,
          };
        })
      );

      setCourses(coursesWithModules.filter(Boolean) as CourseWithModules[]);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardContent maxWidth="xl">
        <Grid container spacing={3}>
          {/* Left Column Skeleton */}
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              {/* Greeting skeleton */}
              <Box>
                <Skeleton variant="text" width="40%" height={40} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="30%" height={24} />
              </Box>

              {/* Continue section skeleton */}
              <Box>
                <Skeleton variant="text" width="20%" height={32} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
              </Box>

              {/* Course modules skeleton */}
              <Box>
                <Skeleton variant="text" width="25%" height={32} sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Right Column Skeleton */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Schedule skeleton */}
              <Box>
                <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
                <Stack spacing={1.5}>
                  <Skeleton variant="rectangular" height={72} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="rectangular" height={72} sx={{ borderRadius: 2 }} />
                </Stack>
              </Box>

              {/* Calendar skeleton */}
              <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />

              {/* Lecturer skeleton */}
              <Box>
                <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </DashboardContent>
    );
  }

  console.log('Courses on dashboard:', courses);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Greeting */}
            <Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                Hi, {user?.displayName || user?.email?.split('@')[0] || 'there'} 👋
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Let's learn something today!
              </Typography>
            </Box>

            {/* Continue Section */}
            {continueData && (
              <Box>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Continue...
                </Typography>
                <Card 
                  sx={{ 
                    p: 3,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => {
                    const lesson = continueData.lesson;
                    const moduleId = lesson.module?.id;
                    const courseId = lesson.module?.course?.id;
                    const lessonId = lesson.id;
                    
                    if (courseId && moduleId && lessonId) {
                      router.push(paths.app.courses.lesson(courseId, moduleId, lessonId));
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 0.5 }}>
                        {continueData.lesson?.title}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Iconify icon="solar:book-2-outline" width={16} sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {continueData.lesson?.module?.course?.title} • {continueData.lesson?.module?.title}
                        </Typography>
                      </Stack>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<Iconify icon="eva:arrow-forward-fill" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        const lesson = continueData.lesson;
                        const moduleId = lesson.module?.id;
                        const courseId = lesson.module?.course?.id;
                        const lessonId = lesson.id;
                        
                        if (courseId && moduleId && lessonId) {
                          router.push(paths.app.courses.lesson(courseId, moduleId, lessonId));
                        }
                      }}
                    >
                      Resume
                    </Button>
                  </Stack>
                </Card>
              </Box>
            )}

            {/* Course Modules Section */}
            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Course modules
              </Typography>
              {courses.length === 0 ? (
                <Card sx={{ p: 5, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    No courses assigned yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.disabled', mt: 1 }}>
                    Contact your instructor to get started
                  </Typography>
                </Card>
              ) : (
                <Stack spacing={2}>
                  {courses.map((course) =>
                    course.modules.map((module, index) => (
                      <Card
                        key={module.id}
                        sx={{
                          p: 3,
                          cursor: module.is_visible ? 'pointer' : 'default',
                          bgcolor: module.is_visible
                            ? 'background.paper'
                            : 'action.disabledBackground',
                          opacity: module.is_visible ? 1 : 0.6,
                          position: 'relative',
                          '&:hover': module.is_visible ? { bgcolor: 'action.hover' } : {},
                        }}
                        onClick={() =>
                          module.is_visible && router.push(paths.app.courses.module(course.id, module.id))
                        }
                      >
                        <Stack spacing={2}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">{module.title}</Typography>
                            {!module.is_visible && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 16,
                                  right: 16,
                                  width: 40,
                                  height: 40,
                                  borderRadius: '50%',
                                  bgcolor: 'action.selected',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Iconify icon="solar:lock-bold" width={20} sx={{ color: 'text.disabled' }} />
                              </Box>
                            )}
                            {module.is_visible && module.progress_percentage === 100 && (
                              <Box
                                sx={{
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: 1,
                                  bgcolor: 'success.lighter',
                                  color: 'success.dark',
                                }}
                              >
                                <Typography variant="caption" fontWeight="bold">
                                  Completed
                                </Typography>
                              </Box>
                            )}
                          </Stack>

                          {module.is_visible && (
                            <Box>
                              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={module.progress_percentage}
                                  sx={{
                                    flex: 1,
                                    height: 8,
                                    borderRadius: 1,
                                    bgcolor: 'action.hover',
                                    '& .MuiLinearProgress-bar': {
                                      borderRadius: 1,
                                      bgcolor:
                                        module.progress_percentage === 100
                                          ? 'success.main'
                                          : index === 1
                                          ? 'secondary.main'
                                          : 'primary.main',
                                    },
                                  }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{ color: 'text.secondary', minWidth: 40, textAlign: 'right' }}
                                >
                                  {module.progress_percentage}%
                                </Typography>
                              </Stack>
                            </Box>
                          )}
                        </Stack>
                      </Card>
                    ))
                  )}
                </Stack>
              )}
            </Box>
          </Stack>
        </Grid>

        {/* Right Column - Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Schedule */}
            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Schedule
              </Typography>
              <Stack spacing={1.5}>
                <Card sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'info.lighter',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon="solar:moon-bold" width={20} sx={{ color: 'info.main' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">Wednesdays</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      18:30 – 21:00
                    </Typography>
                  </Stack>
                </Card>

                <Card sx={{ p: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'warning.lighter',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Iconify icon="solar:sun-bold" width={20} sx={{ color: 'warning.main' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2">Saturdays</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      09:00 – 12:00
                    </Typography>
                  </Stack>
                </Card>
              </Stack>
            </Box>

            {/* Calendar */}
            <Box>
              <CalendarView />
            </Box>

            {/* Lecturer */}
            <Box>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Lecturer
              </Typography>
              <Card
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
                onClick={() => window.open('https://unicamplt.slack.com/archives/D07QFV0UJNQ', '_blank')}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Image
                    src={`${CONFIG.assetsDir}/assets/images/home/team/Aiste.png`}
                    alt="Aistė Gerdzevičiūtė"
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Aistė Gerdzevičiūtė</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Contact me on Slack 👍
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
