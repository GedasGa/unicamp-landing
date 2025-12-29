import { paths } from 'src/routes/paths';
import { supabase } from 'src/lib/supabase';
import { getAccessibleModules, getAccessibleLessons } from 'src/lib/visibility-utils';
import { getStudentCourses, getModules, getLessons } from 'src/lib/database';

// ----------------------------------------------------------------------

export type SearchableItem = {
  id: string;
  title: string;
  description?: string | null;
  path: string;
  type: 'module' | 'lesson';
  courseName: string;
  moduleId?: string;
  courseId: string;
};

/**
 * Get all searchable modules and lessons for a student
 * This includes only visible/unlocked content
 */
export async function getSearchableContent(userId: string): Promise<SearchableItem[]> {
  try {
    const items: SearchableItem[] = [];

    // Get all courses assigned to the student
    const courses = await getStudentCourses(userId);

    // For each course, get accessible modules and their lessons
    for (const course of courses) {
      // Get all modules in this course
      const modules = await getModules(course.id);
      
      // Get accessible modules for this student
      const accessibleModuleIds = await getAccessibleModules(userId, course.id);

      // Add accessible modules to search
      for (const module of modules) {
        if (accessibleModuleIds.has(module.id)) {
          items.push({
            id: module.id,
            title: module.title,
            description: module.description,
            path: paths.app.courses.module(course.id, module.id),
            type: 'module',
            courseName: course.title,
            courseId: course.id,
          });

          // Get lessons for this module
          const lessons = await getLessons(module.id);
          
          // Get accessible lessons for this module
          const accessibleLessonIds = await getAccessibleLessons(userId, module.id);

          // Add accessible lessons to search
          for (const lesson of lessons) {
            if (accessibleLessonIds.has(lesson.id)) {
              items.push({
                id: lesson.id,
                title: lesson.title,
                description: lesson.description,
                path: paths.app.courses.lesson(course.id, module.id, lesson.id),
                type: 'lesson',
                courseName: course.title,
                moduleId: module.id,
                courseId: course.id,
              });
            }
          }
        }
      }
    }

    return items;
  } catch (error) {
    console.error('Error fetching searchable content:', error);
    return [];
  }
}
