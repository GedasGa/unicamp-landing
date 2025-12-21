'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { supabase } from 'src/lib/supabase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { useAuthContext } from 'src/auth/hooks';

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
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      // Get user's groups
      const { data: groupStudents } = await supabase
        .from('group_students')
        .select('group_id')
        .eq('student_id', user.id);

      if (!groupStudents?.length) {
        setCourses([]);
        return;
      }

      const groupIds = groupStudents.map((gs) => gs.group_id);

      // Get courses assigned to these groups
      const { data: groupCourses } = await supabase
        .from('group_courses')
        .select('course_id, courses(*)')
        .in('group_id', groupIds)
        .order('order_index', { ascending: true });

      if (!groupCourses) {
        setCourses([]);
        return;
      }

      // Get modules for each course with visibility and progress
      const coursesWithModules = await Promise.all(
        groupCourses.map(async (gc: any) => {
          const course = gc.courses;

          // Get modules with visibility through group_module_visibility
          // Fetch all visible modules, then determine locked/unlocked state based on unlocked_at
          const { data: moduleVisibility, error: modulesError } = await supabase
            .from('group_module_visibility')
            .select('module_id, is_visible, unlocked_at, modules(*)')
            .in('group_id', groupIds)
            .eq('modules.course_id', course.id)
            .eq('is_visible', true);

          console.log('Fetching modules for course:', course.id);
          console.log('Module visibility:', moduleVisibility);
          console.log('Modules error:', modulesError);

          if (!moduleVisibility?.length) {
            return { ...course, modules: [] };
          }

          const moduleIds = moduleVisibility.map((mv) => mv.module_id);

          // Get module progress
          const { data: moduleProgress } = await supabase
            .from('student_module_progress')
            .select('module_id, progress_percentage')
            .eq('student_id', user.id)
            .in('module_id', moduleIds);

          const progressMap = new Map(
            moduleProgress?.map((mp) => [mp.module_id, mp.progress_percentage]) || []
          );

          const modules: Module[] = moduleVisibility
            .map((mv: any) => {
              // Module is unlocked if unlocked_at is set and in the past
              const isUnlocked = mv.unlocked_at && new Date(mv.unlocked_at) <= new Date();
              
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

      setCourses(coursesWithModules);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLessons = async (moduleId: string) => {
    if (!user?.id) return;

    try {
      // Get user's groups
      const { data: groupStudents } = await supabase
        .from('group_students')
        .select('group_id')
        .eq('student_id', user.id);

      if (!groupStudents?.length) return;

      const groupIds = groupStudents.map((gs) => gs.group_id);

      // Get lessons with visibility
      // Fetch all visible lessons, then determine locked/unlocked state based on unlocked_at
      const { data: lessonVisibility } = await supabase
        .from('group_lesson_visibility')
        .select('lesson_id, is_visible, unlocked_at, lessons(*)')
        .in('group_id', groupIds)
        .eq('lessons.module_id', moduleId)
        .eq('is_visible', true);

      console.log('Fetching lessons for module:', moduleId);
      console.log('Lesson visibility:', lessonVisibility);

      const lessons: Lesson[] =
        lessonVisibility?.map((lv: any) => {
          // Lesson is unlocked if unlocked_at is set and in the past
          const isUnlocked = lv.unlocked_at && new Date(lv.unlocked_at) <= new Date();
          
          return {
            ...lv.lessons,
            is_visible: isUnlocked, // Use this to determine if clickable
            unlocked_at: lv.unlocked_at, // Keep this for display
          };
        })
        .sort((a: any, b: any) => a.order_index - b.order_index) || [];

      setLessons(lessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleModuleClick = (courseId: string, moduleId: string) => {
    if (selectedModule === moduleId) {
      setSelectedModule(null);
      setSelectedCourse(null);
      setLessons([]);
    } else {
      setSelectedCourse(courseId);
      setSelectedModule(moduleId);
      fetchLessons(moduleId);
    }
  };

  const handleLessonClick = (lesson: Lesson, isVisible: boolean) => {
    if (isVisible && selectedCourse && lesson.module_id) {
      router.push(paths.app.courses.lesson(selectedCourse, lesson.module_id, lesson.id));
    }
  };

  if (loading) {
    return (
      <DashboardContent maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  console.log('Courses on dashboard:', courses);

  return (
    <DashboardContent maxWidth="xl">
      <Stack spacing={3}>
        <Box>
          <Typography variant="h3" sx={{ mb: 1 }}>
            Welcome back 👋 {user?.displayName || user?.email}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Continue your learning journey
          </Typography>
        </Box>

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
          courses.map((course) => (
            <Card key={course.id} sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                {course.title}
              </Typography>
              {course.description && (
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  {course.description}
                </Typography>
              )}

              <Stack spacing={2}>
                {course.modules.map((module) => (
                  <Box key={module.id}>
                    <Card
                      sx={{
                        p: 2,
                        cursor: module.is_visible ? 'pointer' : 'default',
                        bgcolor: module.is_visible ? 'background.paper' : 'action.hover',
                        opacity: module.is_visible ? 1 : 0.6,
                        '&:hover': module.is_visible
                          ? { bgcolor: 'action.hover' }
                          : {},
                      }}
                      onClick={() => module.is_visible && handleModuleClick(course.id, module.id)}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1.5,
                            bgcolor: module.is_visible ? 'primary.lighter' : 'action.selected',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify
                            icon={module.is_visible ? 'solar:book-bold' : 'solar:lock-bold'}
                            width={24}
                            sx={{ color: module.is_visible ? 'primary.main' : 'text.disabled' }}
                          />
                        </Box>

                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1">{module.title}</Typography>
                          {module.description && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {module.description}
                            </Typography>
                          )}
                          {module.is_visible && module.progress_percentage > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                <LinearProgress
                                  variant="determinate"
                                  value={module.progress_percentage}
                                  sx={{ flex: 1, height: 6, borderRadius: 1 }}
                                />
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                  {module.progress_percentage}%
                                </Typography>
                              </Stack>
                            </Box>
                          )}
                        </Box>

                        {module.is_visible && (
                          <Iconify
                            icon={
                              selectedModule === module.id
                                ? 'eva:arrow-up-fill'
                                : 'eva:arrow-down-fill'
                            }
                            width={20}
                          />
                        )}
                      </Stack>
                    </Card>

                    {/* Lessons dropdown */}
                    {selectedModule === module.id && module.is_visible && (
                      <Stack spacing={1.5} sx={{ pl: 9, pr: 2, pt: 2 }}>
                        {lessons.map((lesson) => (
                          <Card
                            key={lesson.id}
                            sx={{
                              p: 2,
                              cursor: lesson.is_visible ? 'pointer' : 'default',
                              bgcolor: lesson.is_visible ? 'background.neutral' : 'action.hover',
                              opacity: lesson.is_visible ? 1 : 0.6,
                              '&:hover': lesson.is_visible
                                ? { bgcolor: 'action.selected' }
                                : {},
                            }}
                            onClick={() => handleLessonClick(lesson, lesson.is_visible)}
                          >
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Iconify
                                icon={
                                  lesson.is_visible
                                    ? 'solar:play-circle-bold'
                                    : 'solar:lock-bold'
                                }
                                width={20}
                                sx={{
                                  color: lesson.is_visible ? 'success.main' : 'text.disabled',
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: lesson.is_visible
                                    ? 'text.primary'
                                    : 'text.disabled',
                                }}
                              >
                                {lesson.title}
                              </Typography>
                            </Stack>
                          </Card>
                        ))}
                      </Stack>
                    )}
                  </Box>
                ))}
              </Stack>
            </Card>
          ))
        )}
      </Stack>
    </DashboardContent>
  );
}
