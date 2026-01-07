'use client';

import type { CalendarEvent } from 'src/types/schedule';
import type { Database } from 'src/types/database.types';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { paths } from 'src/routes/paths';

import { fDateTime } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { supabase } from 'src/lib/supabase';
import { DashboardContent } from 'src/layouts/dashboard';
import { isModuleUnlocked } from 'src/lib/visibility-utils';
import { useGroupContext } from 'src/contexts/group-context';
import { 
  getUserSchedule, 
  getStudentGroups, 
  getStudentCourses,
  getContinueLesson,
  getCourseVisibleModules,
  getStudentModuleProgress
} from 'src/lib/database';

import { Image } from 'src/components/image';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

import { CalendarView } from 'src/sections/dashboard/calendar';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

type Course = Database['public']['Tables']['courses']['Row'];
type Module = Database['public']['Tables']['modules']['Row'] & {
  is_visible: boolean;
  progress_percentage: number;
};

interface CourseWithModules extends Course {
  modules: Module[];
}

export function DashboardView() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { selectedGroup, groups } = useGroupContext();
  const [courses, setCourses] = useState<CourseWithModules[]>([]);
  const [loading, setLoading] = useState(false);
  const [continueData, setContinueData] = useState<any>(null);
  const [activeMeeting, setActiveMeeting] = useState<CalendarEvent | null>(null);
  
  const hasNoGroups = groups.length === 0;

  useEffect(() => {
    fetchCourses();
    fetchContinueData();
    fetchActiveMeeting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchActiveMeeting = async () => {
    if (!user?.id) return;

    try {
      const schedule = await getUserSchedule(user.id);
      const now = new Date();
      const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000);
      
      // Find meeting that is currently active or starting within 10 minutes
      const active = schedule.find((event) => {
        const start = new Date(event.start);
        const end = new Date(event.end);
        // Show if meeting is active (started but not ended) or starts within 10 minutes
        return (start <= now && end >= now) || (start > now && start <= tenMinutesFromNow);
      });
      
      setActiveMeeting(active || null);
    } catch (error) {
      console.error('Error fetching active meeting:', error);
    }
  };

  const fetchContinueData = async () => {
    if (!user?.id) return;

    try {
      // Get user's groups first
      const userGroups = await getStudentGroups(user.id);
      const groupIds = userGroups?.map((ug) => ug.group_id) || [];
      
      // Get continue lesson (with next lesson logic if current is complete)
      const data = await getContinueLesson(user.id, groupIds);
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
                Let&apos;s learn something today!
              </Typography>
            </Box>

            {/* Active Meeting Section */}
            {activeMeeting && (() => {
              const now = new Date();
              const startTime = new Date(activeMeeting.start);
              const isStartingSoon = startTime > now;
              const minutesUntilStart = isStartingSoon ? Math.round((startTime.getTime() - now.getTime()) / (1000 * 60)) : 0;
              
              return (
                <Box>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {isStartingSoon ? 'Meeting starting soon' : 'Meeting in progress'}
                  </Typography>
                  <Card 
                    sx={{ 
                      p: 3,
                      background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      color: 'common.white',
                    }}
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify 
                          icon={activeMeeting.mode === 'online' ? 'mdi:monitor' : 'mdi:map-marker'} 
                          width={24}
                        />
                        <Typography variant="h6">
                          {activeMeeting.title}
                        </Typography>
                      </Stack>
                      
                      {activeMeeting.description && (
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {activeMeeting.description}
                        </Typography>
                      )}
                      
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="eva:clock-outline" width={20} />
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {isStartingSoon 
                            ? `Starts in ${minutesUntilStart} minute${minutesUntilStart !== 1 ? 's' : ''} at ${fDateTime(activeMeeting.start, 'HH:mm')}`
                            : `${fDateTime(activeMeeting.start, 'HH:mm')} - ${fDateTime(activeMeeting.end, 'HH:mm')}`
                          }
                        </Typography>
                      </Stack>

                      {activeMeeting.mode === 'online' && activeMeeting.meetingLink && (
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<Iconify icon="eva:video-fill" />}
                          href={activeMeeting.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ 
                            mt: 1,
                            bgcolor: 'common.white',
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'grey.100',
                            },
                          }}
                        >
                          {isStartingSoon ? 'Join Meeting' : 'Join Meeting Now'}
                        </Button>
                      )}

                      {activeMeeting.mode === 'live' && activeMeeting.address && (
                        <Stack spacing={0.5}>
                          <Typography variant="subtitle2">Location:</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {activeMeeting.address}
                            {activeMeeting.city && `, ${activeMeeting.city}`}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Card>
                </Box>
              );
            })()}

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
                    const {lesson} = continueData;
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
                        const {lesson} = continueData;
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
                    Explore our available programs and contact us to get started. If you&apos;ve already purchased a course, please reach out to your lecturer to be added to a group.
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
                          cursor: 'pointer',
                          bgcolor: module.is_visible
                            ? 'background.paper'
                            : 'action.disabledBackground',
                          opacity: module.is_visible ? 1 : 0.6,
                          position: 'relative',
                          '&:hover': module.is_visible ? { bgcolor: 'action.hover' } : {},
                        }}
                        onClick={async () => {
                          if (module.is_visible) {
                            router.push(paths.app.courses.module(course.id, module.id));
                          } else {
                            // Module is locked, fetch visibility data to get unlocked_at
                            if (!selectedGroup?.id) return;
                            
                            const { data: visibilityData } = await supabase
                              .from('group_module_visibility')
                              .select('unlocked_at')
                              .eq('group_id', selectedGroup.id)
                              .eq('module_id', module.id)
                              .single();
                            
                            if (visibilityData?.unlocked_at) {
                              toast.error(`Module is locked. It will be unlocked at ${fDateTime(visibilityData.unlocked_at)}`);
                            } else {
                              toast.error('Module is locked. It will be unlocked by your lecturer when the time comes.');
                            }
                          }
                        }}
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
                                <Iconify icon="eva:lock-fill" width={20} sx={{ color: 'text.disabled' }} />
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
            {/* If user has no groups, show course registration cards */}
            {hasNoGroups ? (
              <Box>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Available Programs
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Choose a program to start your learning journey
                </Typography>
                <Stack spacing={3}>
                  {/* Web Development Card */}
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: (theme) => theme.customShadows.z20,
                      },
                    }}
                  >
                    <Stack spacing={2.5}>
                      {/* Icon and Level */}
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <SvgColor 
                          src={`${CONFIG.assetsDir}/assets/icons/programs/web-development.svg`}
                          width={56}
                          sx={{ color: 'primary.main' }}
                        />
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Image 
                            alt="Beginner icon" 
                            src={`${CONFIG.assetsDir}/assets/icons/programs/beginner.svg`}
                            width={20} 
                            height={20} 
                          />
                          <Typography variant="caption" color="text.secondary">
                            Beginner
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Rating */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Rating size="small" value={5} precision={0.5} readOnly />
                        <Typography variant="caption" color="text.secondary">
                          (5 reviews)
                        </Typography>
                      </Stack>

                      {/* Title and Description */}
                      <Stack spacing={1}>
                        <Typography variant="h6">
                          Web Development
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Frontend & Full-Stack Development
                        </Typography>
                      </Stack>

                      {/* Chips */}
                      <Stack spacing={1}>
                        <Chip
                          icon={<Iconify icon="solar:shield-check-bold" />}
                          label="Money-back guarantee"
                          color="success"
                          size="small"
                          sx={{ maxWidth: 'fit-content' }}
                        />
                        <Chip
                          icon={<Iconify icon="solar:verified-check-bold" />}
                          label="Approved by Kursuok.lt"
                          color="primary"
                          size="small"
                          sx={{ maxWidth: 'fit-content' }}
                        />
                      </Stack>

                      {/* Price */}
                      <Stack spacing={1}>
                        <Stack direction="row" alignItems="flex-end" spacing={1}>
                          <Box
                            sx={(theme) => ({
                              px: 1,
                              py: 0.5,
                              borderRight: `2px solid ${theme.palette.error.main}`,
                              borderBottom: `2px solid ${theme.palette.error.main}`,
                              background: theme.palette.warning.light,
                            })}
                          >
                            <Typography variant="h4">180€</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            / month
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* CTA Buttons */}
                      <Stack spacing={1.5}>
                        <Button 
                          fullWidth 
                          variant="contained"
                          onClick={() => window.open(paths.programs.fe, '_blank')}
                        >
                          Apply Now
                        </Button>
                        <Button 
                          fullWidth 
                          variant="outlined"
                          href={paths.programs.fe}
                        >
                          View Program
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>

                  {/* UX/UI Design Card */}
                  <Card
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      transition: 'all 0.3s',
                      '&:hover': {
                        boxShadow: (theme) => theme.customShadows.z20,
                      },
                    }}
                  >
                    <Stack spacing={2.5}>
                      {/* Icon and Level */}
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <SvgColor 
                          src={`${CONFIG.assetsDir}/assets/icons/programs/product-design.svg`}
                          width={56}
                          sx={{ color: 'primary.main' }}
                        />
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Image 
                            alt="Beginner icon" 
                            src={`${CONFIG.assetsDir}/assets/icons/programs/beginner.svg`}
                            width={20} 
                            height={20} 
                          />
                          <Typography variant="caption" color="text.secondary">
                            Beginner
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* Rating */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Rating size="small" value={5} precision={0.5} readOnly />
                        <Typography variant="caption" color="text.secondary">
                          (4 reviews)
                        </Typography>
                      </Stack>

                      {/* Title and Description */}
                      <Stack spacing={1}>
                        <Typography variant="h6">
                          UX/UI Design
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          User Experience & Interface Design
                        </Typography>
                      </Stack>

                      {/* Chips */}
                      <Stack spacing={1}>
                        <Chip
                          icon={<Iconify icon="solar:shield-check-bold" />}
                          label="Money-back guarantee"
                          color="success"
                          size="small"
                          sx={{ maxWidth: 'fit-content' }}
                        />
                        <Chip
                          icon={<Iconify icon="solar:verified-check-bold" />}
                          label="Approved by Kursuok.lt"
                          color="primary"
                          size="small"
                          sx={{ maxWidth: 'fit-content' }}
                        />
                      </Stack>

                      {/* Price */}
                      <Stack spacing={1}>
                        <Stack direction="row" alignItems="flex-end" spacing={1}>
                          <Box
                            sx={(theme) => ({
                              px: 1,
                              py: 0.5,
                              borderRight: `2px solid ${theme.palette.error.main}`,
                              borderBottom: `2px solid ${theme.palette.error.main}`,
                              background: theme.palette.warning.light,
                            })}
                          >
                            <Typography variant="h4">180€</Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            / month
                          </Typography>
                        </Stack>
                      </Stack>

                      {/* CTA Buttons */}
                      <Stack spacing={1.5}>
                        <Button 
                          fullWidth 
                          variant="contained"
                          onClick={() => window.open(paths.programs.ux, '_blank')}
                        >
                          Apply Now
                        </Button>
                        <Button 
                          fullWidth 
                          variant="outlined"
                          href={paths.programs.ux}
                        >
                          View Program
                        </Button>
                      </Stack>
                    </Stack>
                  </Card>
                </Stack>
              </Box>
            ) : (
              <>
                {/* Schedule - Only shown if user has groups */}
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
                          18:30 – 21:45
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
                          09:00 – 13:30
                        </Typography>
                      </Stack>
                    </Card>
                  </Stack>
                </Box>

                {/* Calendar */}
                <Box>
                  <CalendarView />
                </Box>

                {/* Lecturer - Only shown if user has groups */}
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
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
