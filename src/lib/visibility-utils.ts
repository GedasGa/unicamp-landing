// =============================================
// Visibility & Access Control Utilities
// Consistent logic for module/lesson visibility and locking
// =============================================

import { supabase } from 'src/lib/supabase';
import { getStudentGroups, getLessons } from 'src/lib/database';

/**
 * Check if a module is unlocked based on visibility settings
 * @param unlocked_at - The unlock timestamp from group_module_visibility
 * @param is_visible - Whether the module is marked as visible
 * @returns true if module is unlocked and accessible
 */
export function isModuleUnlocked(unlocked_at: string | null, is_visible: boolean | null): boolean {
  if (!is_visible) return false;
  // If no unlock date is set, module is visible but locked
  if (!unlocked_at) return false;
  // Only unlocked if unlock date has passed
  return new Date(unlocked_at) <= new Date();
}

/**
 * Check if a lesson is unlocked based on visibility settings
 * @param unlocked_at - The unlock timestamp from group_lesson_visibility
 * @param is_visible - Whether the lesson is marked as visible
 * @returns true if lesson is unlocked and accessible
 */
export function isLessonUnlocked(unlocked_at: string | null, is_visible: boolean | null): boolean {
  if (!is_visible) return false;
  // If no unlock date is set, lesson is visible but locked
  if (!unlocked_at) return false;
  // Only unlocked if unlock date has passed
  return new Date(unlocked_at) <= new Date();
}

/**
 * Get accessible modules for a user across all their groups
 * Returns a Set of module IDs that are unlocked
 */
export async function getAccessibleModules(
  userId: string,
  courseId: string
): Promise<Set<string>> {
  try {
    // Use database helper function
    const userGroups = await getStudentGroups(userId);

    if (!userGroups?.length) {
      return new Set();
    }

    const groupIds = userGroups.map((ug) => ug.group_id);

    // Get module visibility for all user's groups in this course
    const { data: moduleVisibility } = await supabase
      .from('group_module_visibility')
      .select('module_id, is_visible, unlocked_at, modules(*)')
      .in('group_id', groupIds)
      .eq('modules.course_id', courseId)
      .eq('is_visible', true);

    const accessibleModules = new Set<string>();

    if (moduleVisibility) {
      for (const mv of moduleVisibility) {
        if (isModuleUnlocked(mv.unlocked_at, mv.is_visible)) {
          accessibleModules.add(mv.module_id);
        }
      }
    }

    return accessibleModules;
  } catch (error) {
    console.error('Error getting accessible modules:', error);
    return new Set();
  }
}

/**
 * Get accessible lessons for a user in a specific module
 * Returns a Set of lesson IDs that are unlocked
 */
export async function getAccessibleLessons(
  userId: string,
  moduleId: string
): Promise<Set<string>> {
  try {
    // Use database helper functions
    const userGroups = await getStudentGroups(userId);

    if (!userGroups?.length) {
      return new Set();
    }

    const groupIds = userGroups.map((ug) => ug.group_id);

    // Get all lessons in the module
    const lessons = await getLessons(moduleId);

    if (!lessons?.length) {
      return new Set();
    }

    const lessonIds = lessons.map((l) => l.id);
    const accessibleLessons = new Set<string>();

    // Check visibility for each lesson across all user's groups
    for (const lessonId of lessonIds) {
      let hasAccessInAnyGroup = false;

      for (const groupId of groupIds) {
        const { data: visibility } = await supabase
          .from('group_lesson_visibility')
          .select('*')
          .eq('group_id', groupId)
          .eq('lesson_id', lessonId)
          .single();

        if (!visibility) {
          // No visibility record means not accessible
          continue;
        }

        // Check if lesson is visible and unlocked
        if (isLessonUnlocked(visibility.unlocked_at, visibility.is_visible)) {
          hasAccessInAnyGroup = true;
          break;
        }
      }

      if (hasAccessInAnyGroup) {
        accessibleLessons.add(lessonId);
      }
    }

    return accessibleLessons;
  } catch (error) {
    console.error('Error getting accessible lessons:', error);
    return new Set();
  }
}

/**
 * Get user's group IDs
 * Helper function used across multiple pages
 */
export async function getUserGroupIds(userId: string): Promise<string[]> {
  const userGroups = await getStudentGroups(userId);
  return userGroups?.map((ug) => ug.group_id) || [];
}
