'use client';

// =============================================
// Lesson Detail Page - Redirects to First Topic
// =============================================

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

import { useAuthContext } from 'src/auth/hooks';

import { 
  getLesson,
  getLessonTopicProgress,
  checkLessonAccess,
} from 'src/lib/database';

import { getConfluenceLessonTopics } from 'src/actions/confluence';

type Props = {
  params: { 
    id: string; 
    moduleId: string; 
    lessonId: string; 
  };
};

export default function LessonDetailPage({ params }: Props) {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    const redirectToTopic = async () => {
      if (!user?.id) {
        router.push('/auth/login');
        return;
      }
      
      try {
        // Check lesson access
        const accessCheck = await checkLessonAccess(user.id, params.lessonId);
        
        if (!accessCheck.accessible) {
          router.push(`/app/courses/${params.id}`);
          return;
        }
        
        // Fetch lesson
        const lessonData = await getLesson(params.lessonId);
        
        // Fetch topics from Confluence
        const topicsResult = await getConfluenceLessonTopics(lessonData.confluence_parent_page_id);
        
        if (!topicsResult.success || !topicsResult.data || topicsResult.data.length === 0) {
          router.push(`/app/courses/${params.id}`);
          return;
        }
        
        // Fetch progress to find first incomplete topic
        const progressData = await getLessonTopicProgress(user.id, params.lessonId);
        const progressMap = new Map();
        progressData.forEach((progress) => {
          progressMap.set(progress.confluence_page_id, progress);
        });
        
        // Find first incomplete topic or default to first topic
        const firstIncomplete = topicsResult.data.find(
          (topic) => !progressMap.get(topic.id)?.completed
        );
        const targetTopic = firstIncomplete || topicsResult.data[0];
        
        // Redirect to topic page
        router.push(
          `/app/courses/${params.id}/modules/${params.moduleId}/lessons/${params.lessonId}/topics/${targetTopic.id}`
        );
      } catch (err) {
        console.error('Error redirecting to topic:', err);
        router.push(`/app/courses/${params.id}`);
      }
    };

    redirectToTopic();
  }, [params.lessonId, params.id, params.moduleId, user?.id, router]);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Skeleton variant="text" width="60%" height={60} />
      <Skeleton variant="rectangular" height={600} sx={{ mt: 3 }} />
    </Container>
  );
}
