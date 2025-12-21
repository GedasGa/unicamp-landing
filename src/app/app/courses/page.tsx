'use client';

// =============================================
// Student Dashboard - My Courses
// =============================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';

import { useAuthContext } from 'src/auth/hooks';

import { CourseCard } from 'src/sections/learning/course-card';

import { getStudentGroups, getGroupCourses } from 'src/lib/database';

export default function StudentCoursesPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Get student's groups
        const groups = await getStudentGroups(user.id);
        console.log('Student groups:', groups);
        
        // Get all courses from all groups
        const allCourses = [];
        for (const group of groups) {
          const groupCourses = await getGroupCourses(group.group_id);
          allCourses.push(...groupCourses);
        }
        console.log('All group courses:', allCourses);
        
        // Remove duplicates and add mock progress (you'll calculate this from actual progress data)
        const uniqueCourses = Array.from(
          new Map(allCourses.map(item => [item.course.id, item])).values()
        );
        console.log('Unique courses:', uniqueCourses);
        
        setCourses(uniqueCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user?.id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h3" gutterBottom>
          My Courses
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom>
        My Courses
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        Continue your learning journey
      </Typography>

      {courses.length === 0 ? (
        <Alert severity="info" sx={{ mt: 3 }}>
          No courses assigned yet. Please contact your teacher.
        </Alert>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {courses.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.course.id}>
              <CourseCard
                id={item.course.id}
                title={item.course.title}
                description={item.course.description}
                thumbnailUrl={item.course.thumbnail_url}
                progress={0} // TODO: Calculate from progress data
                moduleCount={0} // TODO: Get module count
                onClick={() => router.push(`/learning/courses/${item.course.id}`)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
