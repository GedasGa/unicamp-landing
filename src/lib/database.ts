// =============================================
// Database Helper Functions
// =============================================

import { supabase } from 'src/lib/supabase';

import type { Database } from 'src/types/database.types';
import type { GroupSchedule, CalendarEvent } from 'src/types/schedule';

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles']['Row'];
type Group = Tables['groups']['Row'];
type Course = Tables['courses']['Row'];
type Module = Tables['modules']['Row'];
type Lesson = Tables['lessons']['Row'];

// =============================================
// PROFILE FUNCTIONS
// =============================================

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAllStudents() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'student')
    .order('full_name');

  if (error) throw error;
  return data;
}

export async function getAllTeachers() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'teacher')
    .order('full_name');

  if (error) throw error;
  return data;
}

// =============================================
// GROUP FUNCTIONS
// =============================================

export async function createGroup(name: string, description?: string, createdBy?: string) {
  const { data, error } = await supabase
    .from('groups')
    .insert({ name, description, created_by: createdBy })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getGroups() {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

export async function getGroup(groupId: string) {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', groupId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateGroup(groupId: string, updates: Partial<Group>) {
  const { data, error } = await supabase
    .from('groups')
    .update(updates)
    .eq('id', groupId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteGroup(groupId: string) {
  const { error } = await supabase
    .from('groups')
    .delete()
    .eq('id', groupId);

  if (error) throw error;
}

// =============================================
// GROUP MEMBER FUNCTIONS
// =============================================

export async function addStudentToGroup(groupId: string, studentIdOrEmail: string) {
  // Check if it's an email or user ID
  const isEmail = studentIdOrEmail.includes('@');
  
  const { data, error } = await supabase
    .from('group_members')
    .insert({ 
      group_id: groupId, 
      student_id: isEmail ? null : studentIdOrEmail,
      email: isEmail ? studentIdOrEmail : null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function inviteStudentToGroupByEmail(groupId: string, email: string) {
  const { data, error } = await supabase
    .from('group_members')
    .insert({ 
      group_id: groupId, 
      email,
      student_id: null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeStudentFromGroup(groupId: string, studentId: string) {
  const { error } = await supabase
    .from('group_members')
    .delete()
    .eq('group_id', groupId)
    .eq('student_id', studentId);

  if (error) throw error;
}

export async function getGroupMembers(groupId: string) {
  const { data, error } = await supabase
    .from('group_members')
    .select(`
      *,
      student:profiles!student_id(*)
    `)
    .eq('group_id', groupId);

  if (error) throw error;
  return data;
}

export async function getStudentGroups(studentId: string) {
  const { data, error } = await supabase
    .from('group_students')
    .select(`
      *,
      group:groups(*)
    `)
    .eq('student_id', studentId);

  if (error) throw error;
  return data;
}

export async function getTeacherGroups(teacherId: string) {
  const { data, error } = await supabase
    .from('group_teachers')
    .select(`
      *,
      group:groups(*)
    `)
    .eq('teacher_id', teacherId);

  if (error) throw error;
  return data;
}

export async function getUserGroups(userId: string) {
  // Try to get groups as student first
  const studentGroups = await getStudentGroups(userId);
  if (studentGroups && studentGroups.length > 0) {
    return studentGroups;
  }
  
  // If no student groups, try as teacher
  const teacherGroups = await getTeacherGroups(userId);
  return teacherGroups || [];
}

// =============================================
// GROUP SCHEDULE FUNCTIONS
// =============================================

export async function getGroupSchedule(groupId: string) {
  const { data, error } = await supabase
    .from('group_schedule')
    .select('*')
    .eq('group_id', groupId)
    .order('start_time', { ascending: true });

  if (error) throw error;
  return data as GroupSchedule[];
}

export async function getUserSchedule(userId: string): Promise<CalendarEvent[]> {
  // Get user's groups
  const userGroups = await getUserGroups(userId);
  if (!userGroups || userGroups.length === 0) {
    return [];
  }

  const groupIds = userGroups.map((ug: any) => ug.group_id);

  // Get all schedule events for these groups
  const { data, error } = await supabase
    .from('group_schedule')
    .select('*')
    .in('group_id', groupIds)
    .order('start_time', { ascending: true });

  if (error) throw error;

  // Convert to CalendarEvent format
  const events: CalendarEvent[] = (data as GroupSchedule[]).map((schedule) => ({
    id: schedule.id,
    title: schedule.title,
    start: new Date(schedule.start_time),
    end: new Date(schedule.end_time),
    description: schedule.description || undefined,
    mode: schedule.mode,
    meetingLink: schedule.meeting_link || undefined,
    address: schedule.address || undefined,
    city: schedule.city || undefined,
    instructions: schedule.instructions || undefined,
    lessonId: schedule.lesson_id,
    color: schedule.mode === 'online' ? '#4CAF50' : '#2196F3',
  }));

  return events;
}

export async function createScheduleEvent(event: Omit<GroupSchedule, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('group_schedule')
    .insert(event)
    .select()
    .single();

  if (error) throw error;
  return data as GroupSchedule;
}

export async function updateScheduleEvent(eventId: string, updates: Partial<GroupSchedule>) {
  const { data, error } = await supabase
    .from('group_schedule')
    .update(updates)
    .eq('id', eventId)
    .select()
    .single();

  if (error) throw error;
  return data as GroupSchedule;
}

export async function deleteScheduleEvent(eventId: string) {
  const { error } = await supabase
    .from('group_schedule')
    .delete()
    .eq('id', eventId);

  if (error) throw error;
}

// =============================================
// COURSE FUNCTIONS
// =============================================

export async function createCourse(
  title: string,
  description?: string,
  thumbnailUrl?: string,
  createdBy?: string
) {
  const { data, error } = await supabase
    .from('courses')
    .insert({ 
      title, 
      description, 
      thumbnail_url: thumbnailUrl,
      created_by: createdBy 
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('title');

  if (error) throw error;
  return data;
}

export async function getCoursesByGroup(groupId: string) {
  const { data, error } = await supabase
    .from('group_courses')
    .select(`
      course:courses(*)
    `)
    .eq('group_id', groupId);

  if (error) throw error;
  return data.map(row => row.course).filter(Boolean);
}

export async function getCourse(courseId: string) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules(*)
    `)
    .eq('id', courseId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateCourse(courseId: string, updates: Partial<Course>) {
  const { data, error } = await supabase
    .from('courses')
    .update(updates)
    .eq('id', courseId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCourse(courseId: string) {
  const { error } = await supabase
    .from('courses')
    .delete()
    .eq('id', courseId);

  if (error) throw error;
}

// =============================================
// MODULE FUNCTIONS
// =============================================

export async function createModule(
  courseId: string,
  title: string,
  description?: string,
  thumbnailUrl?: string,
  orderIndex?: number
) {
  const { data, error } = await supabase
    .from('modules')
    .insert({ 
      course_id: courseId, 
      title, 
      description,
      thumbnail_url: thumbnailUrl,
      order_index: orderIndex ?? 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getModules(courseId: string) {
  const { data, error } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', courseId)
    .order('order_index');

  if (error) throw error;
  return data;
}

export async function getModule(moduleId: string) {
  const { data, error } = await supabase
    .from('modules')
    .select(`
      *,
      lessons(*)
    `)
    .eq('id', moduleId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateModule(moduleId: string, updates: Partial<Module>) {
  const { data, error } = await supabase
    .from('modules')
    .update(updates)
    .eq('id', moduleId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteModule(moduleId: string) {
  const { error } = await supabase
    .from('modules')
    .delete()
    .eq('id', moduleId);

  if (error) throw error;
}

// =============================================
// LESSON FUNCTIONS
// =============================================

export async function createLesson(
  moduleId: string,
  title: string,
  confluenceParentPageId: string,
  description?: string,
  orderIndex?: number
) {
  const { data, error } = await supabase
    .from('lessons')
    .insert({ 
      module_id: moduleId, 
      title, 
      confluence_parent_page_id: confluenceParentPageId,
      description,
      order_index: orderIndex ?? 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getLessons(moduleId: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId)
    .order('order_index');

  if (error) throw error;
  return data;
}

export async function getLesson(lessonId: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateLesson(lessonId: string, updates: Partial<Lesson>) {
  const { data, error } = await supabase
    .from('lessons')
    .update(updates)
    .eq('id', lessonId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLesson(lessonId: string) {
  const { error } = await supabase
    .from('lessons')
    .delete()
    .eq('id', lessonId);

  if (error) throw error;
}

// =============================================
// TOPIC FUNCTIONS
// =============================================
// Topics are fetched dynamically from Confluence using the lesson's confluence_parent_page_id
// No CRUD operations needed - see confluence.ts for fetching functions

// =============================================
// GROUP COURSE ASSIGNMENT
// =============================================

export async function assignCourseToGroup(groupId: string, courseId: string, orderIndex?: number) {
  const { data, error } = await supabase
    .from('group_courses')
    .insert({ 
      group_id: groupId, 
      course_id: courseId,
      order_index: orderIndex ?? 0
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeCourseFromGroup(groupId: string, courseId: string) {
  const { error } = await supabase
    .from('group_courses')
    .delete()
    .eq('group_id', groupId)
    .eq('course_id', courseId);

  if (error) throw error;
}

export async function getGroupCourses(groupId: string) {
  const { data, error } = await supabase
    .from('group_courses')
    .select(`
      *,
      course:courses(*)
    `)
    .eq('group_id', groupId)
    .order('order_index');

  if (error) throw error;
  return data;
}

// =============================================
// VISIBILITY FUNCTIONS
// =============================================

export async function setModuleVisibility(
  groupId: string,
  moduleId: string,
  isVisible: boolean
) {
  const { data, error } = await supabase
    .from('group_module_visibility')
    .upsert({ 
      group_id: groupId, 
      module_id: moduleId,
      is_visible: isVisible,
      unlocked_at: isVisible ? new Date().toISOString() : null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function setLessonVisibility(
  groupId: string,
  lessonId: string,
  isVisible: boolean
) {
  const { data, error } = await supabase
    .from('group_lesson_visibility')
    .upsert({ 
      group_id: groupId, 
      lesson_id: lessonId,
      is_visible: isVisible,
      unlocked_at: isVisible ? new Date().toISOString() : null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getModuleVisibility(groupId: string, moduleId: string) {
  const { data, error } = await supabase
    .from('group_module_visibility')
    .select('*')
    .eq('group_id', groupId)
    .eq('module_id', moduleId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
  return data;
}

export async function getLessonVisibility(groupId: string, lessonId: string) {
  const { data, error } = await supabase
    .from('group_lesson_visibility')
    .select('*')
    .eq('group_id', groupId)
    .eq('lesson_id', lessonId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// Check if user has access to a lesson (based on group assignment and visibility)
export async function checkLessonAccess(userId: string, lessonId: string) {
  try {
    // Get lesson with module and course info
    const { data: lessonData, error: lessonError } = await supabase
      .from('lessons')
      .select(`
        *,
        module:modules!inner(
          *,
          course:courses!inner(*)
        )
      `)
      .eq('id', lessonId)
      .single();

    if (lessonError) throw lessonError;
    if (!lessonData) return { accessible: false, reason: 'Lesson not found' };

    const courseId = lessonData.module.course.id;

    // Get user's groups
    const { data: userGroups, error: groupError } = await supabase
      .from('group_students')
      .select('group_id')
      .eq('student_id', userId);

    if (groupError) throw groupError;
    if (!userGroups || userGroups.length === 0) {
      return { accessible: false, reason: 'Not assigned to any groups' };
    }

    const groupIds = userGroups.map(g => g.group_id);

    // Check if course is assigned to any of user's groups
    const { data: groupCourses, error: courseError } = await supabase
      .from('group_courses')
      .select('*')
      .in('group_id', groupIds)
      .eq('course_id', courseId);

    if (courseError) throw courseError;
    if (!groupCourses || groupCourses.length === 0) {
      return { accessible: false, reason: 'Course not assigned to your groups' };
    }

    // Check if lesson is visible to any of user's groups
    const { data: lessonVisibility, error: visError } = await supabase
      .from('group_lesson_visibility')
      .select('*')
      .in('group_id', groupIds)
      .eq('lesson_id', lessonId)
      .eq('is_visible', true);

    if (visError) throw visError;
    if (!lessonVisibility || lessonVisibility.length === 0) {
      return { accessible: false, reason: 'Lesson not unlocked' };
    }

    return { 
      accessible: true, 
      lesson: lessonData,
      course: lessonData.module.course,
      module: lessonData.module
    };
  } catch (error) {
    console.error('Error checking lesson access:', error);
    return { accessible: false, reason: 'Error checking access' };
  }
}

// =============================================
// STUDENT PROGRESS FUNCTIONS
// =============================================

export async function markTopicComplete(
  studentId: string, 
  lessonId: string,
  confluencePageId: string, 
  completed: boolean
) {
  const { data, error } = await supabase
    .from('student_topic_progress')
    .upsert({ 
      student_id: studentId, 
      lesson_id: lessonId,
      confluence_page_id: confluencePageId,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
      last_accessed_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTopicProgress(studentId: string, lessonId: string, confluencePageId: string) {
  const { data, error } = await supabase
    .from('student_topic_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId)
    .eq('confluence_page_id', confluencePageId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getLessonTopicProgress(studentId: string, lessonId: string) {
  const { data, error } = await supabase
    .from('student_topic_progress')
    .select('*')
    .eq('student_id', studentId)
    .eq('lesson_id', lessonId);

  if (error) throw error;
  return data;
}

export async function updateLessonProgress(
  studentId: string,
  lessonId: string,
  progressPercentage: number,
  completed: boolean
) {
  const { data, error } = await supabase
    .from('student_lesson_progress')
    .upsert({ 
      student_id: studentId, 
      lesson_id: lessonId,
      progress_percentage: progressPercentage,
      completed,
      completed_at: completed ? new Date().toISOString() : null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateModuleProgress(
  studentId: string,
  moduleId: string,
  progressPercentage: number,
  completed: boolean
) {
  const { data, error } = await supabase
    .from('student_module_progress')
    .upsert({ 
      student_id: studentId, 
      module_id: moduleId,
      progress_percentage: progressPercentage,
      completed,
      completed_at: completed ? new Date().toISOString() : null
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getStudentCourseProgress(studentId: string, courseId: string) {
  const { data, error } = await supabase
    .from('student_module_progress')
    .select(`
      *,
      module:modules!inner(
        *,
        course:courses!inner(id)
      )
    `)
    .eq('student_id', studentId)
    .eq('module.course.id', courseId);

  if (error) throw error;
  return data;
}
