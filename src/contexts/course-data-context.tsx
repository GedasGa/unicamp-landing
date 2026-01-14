'use client';

import type { ReactNode } from 'react';
import type { Database } from 'src/types/database.types';

import { useRef, useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { supabase } from 'src/lib/supabase';
import { getConfluenceLessonTopics, getConfluenceTopicContent } from 'src/actions/confluence';
import { isModuleUnlocked, getAccessibleModules, getAccessibleLessons } from 'src/lib/visibility-utils';
import {
  getCourse,
  getLesson,
  getModule,
  getModules,
  getLessons,
  getStudentGroups,
  getStudentCourses,
  getContinueLesson,
  getCourseVisibleModules,
  getStudentModuleProgress,
} from 'src/lib/database';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

type Course = Database['public']['Tables']['courses']['Row'];
type Module = Database['public']['Tables']['modules']['Row'] & {
  is_visible: boolean;
  progress_percentage: number;
  unlocked_at?: string | null;
  locked?: boolean;
};

interface CourseWithModules extends Course {
  modules: Module[];
}

interface LessonData {
  id: string;
  title: string;
  order_index: number;
  confluence_parent_page_id?: string | null;
  [key: string]: any;
}

interface ModuleData {
  id: string;
  title: string;
  description?: string | null;
  course_id: string;
  order_index: number;
  [key: string]: any;
}

interface LessonProgressData {
  progress: number;
  completed: boolean;
}

interface TopicData {
  id: string;
  title: string;
  [key: string]: any;
}

interface TopicContentData {
  [key: string]: any;
}

export type CourseDataContextValue = {
  // Courses data (for dashboard)
  courses: CourseWithModules[];
  coursesLoading: boolean;
  continueData: any;
  refetchCourses: () => Promise<void>;
  
  // Course detail data (for course/module pages)
  getCourseData: (courseId: string) => Promise<Course | null>;
  getModuleData: (moduleId: string) => Promise<ModuleData | null>;
  getModulesForCourse: (courseId: string) => Promise<ModuleData[]>;
  getAccessibleModulesForCourse: (courseId: string) => Promise<Set<string>>;
  
  // Module detail data (for module/lesson pages)
  getLessonsForModule: (moduleId: string) => Promise<LessonData[]>;
  getAccessibleLessonsForModule: (moduleId: string) => Promise<Set<string>>;
  getLessonProgressForModule: (moduleId: string) => Promise<Map<string, LessonProgressData>>;
  
  // Lesson data
  getLessonData: (lessonId: string) => Promise<LessonData | null>;
  getTopicsForLesson: (lessonId: string, confluencePageId: string) => Promise<TopicData[]>;
  getTopicContent: (topicId: string) => Promise<TopicContentData | null>;
  
  // Cache invalidation
  invalidateModuleProgress: (moduleId: string) => void;
  invalidateLessonProgress: (lessonId: string) => void;
  invalidateAll: () => void;
};

export const CourseDataContext = createContext<CourseDataContextValue | undefined>(undefined);

export const useCourseDataContext = () => {
  const context = useContext(CourseDataContext);

  if (!context) {
    throw new Error('useCourseDataContext must be used within CourseDataProvider');
  }

  return context;
};

// ----------------------------------------------------------------------
// Provider
// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export function CourseDataProvider({ children }: Props) {
  const { user } = useAuthContext();
  
  // Dashboard-level data
  const [courses, setCourses] = useState<CourseWithModules[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [continueData, setContinueData] = useState<any>(null);
  
  // Caches for course/module/lesson data (using refs to avoid re-renders on cache updates)
  const courseCacheRef = useRef<Map<string, Course>>(new Map());
  const moduleCacheRef = useRef<Map<string, ModuleData>>(new Map());
  const modulesForCourseCacheRef = useRef<Map<string, ModuleData[]>>(new Map());
  const accessibleModulesCacheRef = useRef<Map<string, Set<string>>>(new Map());
  const lessonsCacheRef = useRef<Map<string, LessonData[]>>(new Map());
  const lessonCacheRef = useRef<Map<string, LessonData>>(new Map());
  const accessibleLessonsCacheRef = useRef<Map<string, Set<string>>>(new Map());
  const lessonProgressCacheRef = useRef<Map<string, Map<string, LessonProgressData>>>(new Map());
  const topicsCacheRef = useRef<Map<string, TopicData[]>>(new Map());
  const topicContentCacheRef = useRef<Map<string, TopicContentData>>(new Map());

  // ----------------------------------------------------------------------
  // Dashboard data fetching
  // ----------------------------------------------------------------------

  const fetchContinueData = useCallback(async () => {
    if (!user?.id) return;

    try {
      const userGroups = await getStudentGroups(user.id);
      const groupIds = userGroups?.map((ug) => ug.group_id) || [];
      const data = await getContinueLesson(user.id, groupIds);
      setContinueData(data);
    } catch (error) {
      console.error('Error fetching continue data:', error);
    }
  }, [user?.id]);

  const fetchCourses = useCallback(async () => {
    if (!user?.id) return;

    try {
      setCoursesLoading(true);

      const userGroups = await getStudentGroups(user.id);

      if (!userGroups?.length) {
        setCourses([]);
        return;
      }

      const groupIds = userGroups.map((ug) => ug.group_id);

      const studentCourses = await getStudentCourses(user.id);

      if (!studentCourses?.length) {
        setCourses([]);
        return;
      }

      const coursesWithModules = await Promise.all(
        studentCourses.map(async (course: any) => {
          if (!course?.id) {
            console.error('Course missing id:', course);
            return null;
          }

          const moduleVisibility = await getCourseVisibleModules(user.id, course.id, groupIds);

          if (!moduleVisibility?.length) {
            return { ...course, modules: [] };
          }

          const moduleIds = moduleVisibility.map((mv) => mv.module_id);
          const progressMap = await getStudentModuleProgress(user.id, moduleIds);

          const modules: Module[] = moduleVisibility
            .map((mv: any) => {
              const isUnlocked = isModuleUnlocked(mv.unlocked_at, mv.is_visible);

              return {
                ...mv.modules,
                is_visible: isUnlocked,
                unlocked_at: mv.unlocked_at,
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
      setCoursesLoading(false);
    }
  }, [user?.id]);

  const refetchCourses = useCallback(async () => {
    await Promise.all([fetchCourses(), fetchContinueData()]);
  }, [fetchCourses, fetchContinueData]);

  // Initial fetch
  useEffect(() => {
    if (user?.id) {
      refetchCourses();
    } else {
      setCourses([]);
      setContinueData(null);
    }
  }, [user?.id, refetchCourses]);

  // ----------------------------------------------------------------------
  // Course data getters (with caching)
  // ----------------------------------------------------------------------

  const getCourseData = useCallback(async (courseId: string): Promise<Course | null> => {
    // Check cache first
    if (courseCacheRef.current.has(courseId)) {
      return courseCacheRef.current.get(courseId)!;
    }

    try {
      const courseData = await getCourse(courseId);
      if (courseData) {
        courseCacheRef.current.set(courseId, courseData);
      }
      return courseData;
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }, []);

  const getModuleData = useCallback(async (moduleId: string): Promise<ModuleData | null> => {
    if (moduleCacheRef.current.has(moduleId)) {
      return moduleCacheRef.current.get(moduleId)!;
    }

    try {
      const moduleData = await getModule(moduleId);
      if (moduleData) {
        moduleCacheRef.current.set(moduleId, moduleData);
      }
      return moduleData;
    } catch (error) {
      console.error('Error fetching module:', error);
      return null;
    }
  }, []);

  const getModulesForCourse = useCallback(async (courseId: string): Promise<ModuleData[]> => {
    if (modulesForCourseCacheRef.current.has(courseId)) {
      return modulesForCourseCacheRef.current.get(courseId)!;
    }

    try {
      const modulesData = await getModules(courseId);
      modulesForCourseCacheRef.current.set(courseId, modulesData || []);
      return modulesData || [];
    } catch (error) {
      console.error('Error fetching modules:', error);
      return [];
    }
  }, []);

  const getAccessibleModulesForCourse = useCallback(async (courseId: string): Promise<Set<string>> => {
    if (!user?.id) return new Set();

    if (accessibleModulesCacheRef.current.has(courseId)) {
      return accessibleModulesCacheRef.current.get(courseId)!;
    }

    try {
      const accessibleMods = await getAccessibleModules(user.id, courseId);
      accessibleModulesCacheRef.current.set(courseId, accessibleMods);
      return accessibleMods;
    } catch (error) {
      console.error('Error fetching accessible modules:', error);
      return new Set();
    }
  }, [user?.id]);

  // ----------------------------------------------------------------------
  // Module data getters (with caching)
  // ----------------------------------------------------------------------

  const getLessonsForModule = useCallback(async (moduleId: string): Promise<LessonData[]> => {
    if (lessonsCacheRef.current.has(moduleId)) {
      return lessonsCacheRef.current.get(moduleId)!;
    }

    try {
      const lessonsData = await getLessons(moduleId);
      lessonsCacheRef.current.set(moduleId, lessonsData || []);
      return lessonsData || [];
    } catch (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }
  }, []);

  const getAccessibleLessonsForModule = useCallback(async (moduleId: string): Promise<Set<string>> => {
    if (!user?.id) return new Set();

    if (accessibleLessonsCacheRef.current.has(moduleId)) {
      return accessibleLessonsCacheRef.current.get(moduleId)!;
    }

    try {
      const accessibleLess = await getAccessibleLessons(user.id, moduleId);
      accessibleLessonsCacheRef.current.set(moduleId, accessibleLess);
      return accessibleLess;
    } catch (error) {
      console.error('Error fetching accessible lessons:', error);
      return new Set();
    }
  }, [user?.id]);

  const getLessonProgressForModule = useCallback(async (moduleId: string): Promise<Map<string, LessonProgressData>> => {
    if (!user?.id) return new Map();

    if (lessonProgressCacheRef.current.has(moduleId)) {
      return lessonProgressCacheRef.current.get(moduleId)!;
    }

    try {
      const accessibleLess = await getAccessibleLessonsForModule(moduleId);
      const accessibleLessonIds = Array.from(accessibleLess);

      if (accessibleLessonIds.length === 0) {
        return new Map();
      }

      const { data: allLessonProgress } = await supabase
        .from('student_lesson_progress')
        .select('lesson_id, progress_percentage, completed')
        .eq('student_id', user.id)
        .in('lesson_id', accessibleLessonIds);

      const progressMap = new Map<string, LessonProgressData>();
      
      const progressLookup = new Map(
        (allLessonProgress || []).map((lp) => [
          lp.lesson_id,
          {
            progress: lp.progress_percentage || 0,
            completed: lp.completed || false,
          },
        ])
      );

      accessibleLessonIds.forEach((lessonId) => {
        progressMap.set(
          lessonId,
          progressLookup.get(lessonId) || { progress: 0, completed: false }
        );
      });

      lessonProgressCacheRef.current.set(moduleId, progressMap);
      return progressMap;
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
      return new Map();
    }
  }, [user?.id, getAccessibleLessonsForModule]);

  // ----------------------------------------------------------------------
  // Lesson data getters (with caching)
  // ----------------------------------------------------------------------

  const getLessonData = useCallback(async (lessonId: string): Promise<LessonData | null> => {
    if (lessonCacheRef.current.has(lessonId)) {
      return lessonCacheRef.current.get(lessonId)!;
    }

    try {
      const lessonData = await getLesson(lessonId);
      if (lessonData) {
        lessonCacheRef.current.set(lessonId, lessonData);
      }
      return lessonData;
    } catch (error) {
      console.error('Error fetching lesson:', error);
      return null;
    }
  }, []);

  const getTopicsForLesson = useCallback(async (lessonId: string, confluencePageId: string): Promise<TopicData[]> => {
    // Cache key is lessonId (more stable than confluencePageId)
    if (topicsCacheRef.current.has(lessonId)) {
      return topicsCacheRef.current.get(lessonId)!;
    }

    try {
      const topicsResult = await getConfluenceLessonTopics(confluencePageId);
      
      if (!topicsResult.success || !topicsResult.data) {
        console.error('Error fetching topics:', topicsResult.error);
        return [];
      }
      
      const topics = topicsResult.data;
      topicsCacheRef.current.set(lessonId, topics);
      return topics;
    } catch (error) {
      console.error('Error fetching topics:', error);
      return [];
    }
  }, []);

  const getTopicContent = useCallback(async (topicId: string): Promise<TopicContentData | null> => {
    // Check cache first - only fetch on demand
    if (topicContentCacheRef.current.has(topicId)) {
      return topicContentCacheRef.current.get(topicId)!;
    }

    try {
      const result = await getConfluenceTopicContent(topicId);
      
      if (!result.success || !result.data) {
        console.error('Error fetching topic content:', result.error);
        return null;
      }
      
      const contentData = result.data;
      topicContentCacheRef.current.set(topicId, contentData);
      return contentData;
    } catch (error) {
      console.error('Error fetching topic content:', error);
      return null;
    }
  }, []);

  // ----------------------------------------------------------------------
  // Cache invalidation
  // ----------------------------------------------------------------------

  const invalidateModuleProgress = useCallback((moduleId: string) => {
    lessonProgressCacheRef.current.delete(moduleId);
    // Also invalidate dashboard courses to refresh progress
    fetchCourses();
  }, [fetchCourses]);

  const invalidateLessonProgress = useCallback((lessonId: string) => {
    // Find which module this lesson belongs to and invalidate that module's cache
    // For simplicity, we'll invalidate all lesson progress caches
    lessonProgressCacheRef.current.clear();
    fetchCourses();
  }, [fetchCourses]);

  const invalidateAll = useCallback(() => {
    courseCacheRef.current.clear();
    moduleCacheRef.current.clear();
    modulesForCourseCacheRef.current.clear();
    accessibleModulesCacheRef.current.clear();
    lessonsCacheRef.current.clear();
    lessonCacheRef.current.clear();
    accessibleLessonsCacheRef.current.clear();
    lessonProgressCacheRef.current.clear();
    topicsCacheRef.current.clear();
    topicContentCacheRef.current.clear();
    refetchCourses();
  }, [refetchCourses]);

  // ----------------------------------------------------------------------
  // Memoized value
  // ----------------------------------------------------------------------

  const memoizedValue = useMemo(
    () => ({
      // Dashboard data
      courses,
      coursesLoading,
      continueData,
      refetchCourses,
      
      // Course data
      getCourseData,
      getModuleData,
      getModulesForCourse,
      getAccessibleModulesForCourse,
      
      // Module data
      getLessonsForModule,
      getAccessibleLessonsForModule,
      getLessonProgressForModule,
      
      // Lesson data
      getLessonData,
      getTopicsForLesson,
      getTopicContent,
      
      // Cache invalidation
      invalidateModuleProgress,
      invalidateLessonProgress,
      invalidateAll,
    }),
    [
      courses,
      coursesLoading,
      continueData,
      refetchCourses,
      getCourseData,
      getModuleData,
      getModulesForCourse,
      getAccessibleModulesForCourse,
      getLessonsForModule,
      getAccessibleLessonsForModule,
      getLessonProgressForModule,
      getLessonData,
      getTopicsForLesson,
      getTopicContent,
      invalidateModuleProgress,
      invalidateLessonProgress,
      invalidateAll,
    ]
  );

  return <CourseDataContext.Provider value={memoizedValue}>{children}</CourseDataContext.Provider>;
}
