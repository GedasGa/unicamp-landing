'use client';

// =============================================
// Course Detail Page - Modules & Lessons
// =============================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Iconify } from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';

import { ModuleList } from 'src/sections/learning/module-list';

import { 
  getCourse, 
  getModules, 
  getLessons,
  getStudentGroups,
  getModuleVisibility,
  getLessonVisibility,
} from 'src/lib/database';

type Props = {
  params: { id: string };
};

export default function CourseDetailPage({ params }: Props) {
  const router = useRouter();
  const { user } = useAuthContext();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Fetch course
        const courseData = await getCourse(params.id);
        setCourse(courseData);
        
        // Fetch modules
        const modulesData = await getModules(params.id);
        
        // Get student's groups to check visibility
        const groups = await getStudentGroups(user.id);
        const groupId = groups[0]?.group_id; // Assuming student is in one group
        
        // Fetch lessons and visibility for each module
        const modulesWithLessons = await Promise.all(
          modulesData.map(async (module) => {
            const lessonsData = await getLessons(module.id);
            const moduleVis = await getModuleVisibility(groupId, module.id);
            
            // Check lesson visibility
            const lessonsWithVisibility = await Promise.all(
              lessonsData.map(async (lesson) => {
                const lessonVis = await getLessonVisibility(groupId, lesson.id);
                return {
                  ...lesson,
                  locked: !lessonVis?.is_visible,
                  progress: 0, // TODO: Calculate from progress data
                  completed: false, // TODO: Get from progress data
                };
              })
            );
            
            return {
              ...module,
              locked: !moduleVis?.is_visible,
              progress: 0, // TODO: Calculate from lessons
              lessons: lessonsWithVisibility,
            };
          })
        );
        
        setModules(modulesWithLessons);
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError('Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [params.id, user?.id]);

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    router.push(`/app/courses/${params.id}/modules/${moduleId}/lessons/${lessonId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Skeleton variant="text" width="60%" height={60} />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" height={400} sx={{ mt: 3 }} />
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Alert severity="error">{error || 'Course not found'}</Alert>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={() => router.push('/app')}
          sx={{ mt: 2 }}
        >
          Back to Courses
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button
        variant="text"
        startIcon={<Iconify icon="eva:arrow-back-fill" />}
        onClick={() => router.push('/app')}
        sx={{ mb: 3 }}
      >
        Back to Courses
      </Button>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            {course.title}
          </Typography>
          
          {course.description && (
            <Typography variant="body1" color="text.secondary">
              {course.description}
            </Typography>
          )}
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        Course Content
      </Typography>

      {modules.length === 0 ? (
        <Alert severity="info">No modules available yet.</Alert>
      ) : (
        <ModuleList modules={modules} onLessonClick={handleLessonClick} />
      )}
    </Container>
  );
}
