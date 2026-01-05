-- =============================================
-- UNICAMP LEARNING PLATFORM - DATABASE SCHEMA
-- =============================================
-- This schema supports a learning platform with:
-- - Teacher and Student roles
-- - Groups with ordered modules and lessons
-- - Confluence content integration (topics fetched dynamically)
-- - Progress tracking
-- - Email-based invitations for both teachers and students
-- =============================================

-- =============================================
-- CLEANUP: Drop all existing objects
-- =============================================
-- Run this section first to start fresh

-- Drop triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_user_signup_link_groups ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_groups_updated_at ON groups;
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
DROP TRIGGER IF EXISTS update_modules_updated_at ON modules;
DROP TRIGGER IF EXISTS update_lessons_updated_at ON lessons;

-- Drop functions
DROP FUNCTION IF EXISTS public.is_teacher() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.link_invitations_on_signup() CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- Drop tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS student_lesson_progress CASCADE;
DROP TABLE IF EXISTS student_topic_progress CASCADE;
DROP TABLE IF EXISTS group_lesson_visibility CASCADE;
DROP TABLE IF EXISTS group_module_visibility CASCADE;
DROP TABLE IF EXISTS group_courses CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS modules CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS group_schedule CASCADE;
DROP TABLE IF EXISTS group_teachers CASCADE;
DROP TABLE IF EXISTS group_students CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS invitations CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop types
DROP TYPE IF EXISTS user_role CASCADE;

-- =============================================
-- SCHEMA CREATION
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. USER PROFILES & ROLES
-- =============================================

-- User roles enum
CREATE TYPE user_role AS ENUM ('teacher', 'student');

-- Extended user profiles (linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. GROUPS
-- =============================================

CREATE TABLE groups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. INVITATIONS
-- =============================================

-- Unified invitations table for both teachers and students
CREATE TABLE invitations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  invited_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  CHECK ((role = 'teacher' AND group_id IS NULL) OR (role = 'student' AND group_id IS NOT NULL))
);

-- Group teachers (teachers assigned to groups)
CREATE TABLE group_teachers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  teacher_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, teacher_id)
);

-- Group students (confirmed members who have signed up)
CREATE TABLE group_students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, student_id)
);

-- =============================================
-- 4. COURSES, MODULES, LESSONS
-- =============================================

-- Courses (top-level container)
CREATE TABLE courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modules (belong to courses)
CREATE TABLE modules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, order_index)
);

-- Lessons (belong to modules) - Each lesson points to a Confluence parent page
-- Topics are fetched dynamically as child pages from Confluence
CREATE TABLE lessons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  confluence_parent_page_id TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(module_id, order_index),
  UNIQUE(module_id, confluence_parent_page_id)
);

-- =============================================
-- 3.1. GROUP SCHEDULE
-- =============================================

-- Group schedule for lessons (individual events)
CREATE TABLE group_schedule (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  mode TEXT NOT NULL DEFAULT 'online' CHECK (mode IN ('online', 'live')),
  meeting_link TEXT,
  address TEXT,
  city TEXT,
  instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_group_schedule_group_id ON group_schedule(group_id);
CREATE INDEX idx_group_schedule_lesson_id ON group_schedule(lesson_id);
CREATE INDEX idx_group_schedule_start_time ON group_schedule(start_time);
CREATE INDEX idx_group_schedule_end_time ON group_schedule(end_time);

-- =============================================
-- 5. GROUP-COURSE ASSIGNMENTS & VISIBILITY
-- =============================================

-- Assign courses to groups with visibility control
CREATE TABLE group_courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, course_id),
  UNIQUE(group_id, order_index)
);

-- Module visibility per group (controls how many modules are unlocked)
CREATE TABLE group_module_visibility (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
  is_visible BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, module_id)
);

-- Lesson visibility per group (controls how many lessons are unlocked)
CREATE TABLE group_lesson_visibility (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  is_visible BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, lesson_id)
);

-- =============================================
-- 6. STUDENT PROGRESS TRACKING
-- =============================================

-- Track student progress on topics (using Confluence page IDs)
CREATE TABLE student_topic_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  confluence_page_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id, confluence_page_id)
);

-- Track student progress on lessons (auto-calculated from topics)
CREATE TABLE student_lesson_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, lesson_id)
);

-- =============================================
-- 7. INDEXES FOR PERFORMANCE
-- =============================================

-- Profile indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- Invitations indexes
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_group_id ON invitations(group_id);
CREATE INDEX idx_invitations_role ON invitations(role);

-- Group indexes
CREATE INDEX idx_group_teachers_group_id ON group_teachers(group_id);
CREATE INDEX idx_group_teachers_teacher_id ON group_teachers(teacher_id);
CREATE INDEX idx_group_students_group_id ON group_students(group_id);
CREATE INDEX idx_group_students_student_id ON group_students(student_id);

-- Course/Module/Lesson indexes
CREATE INDEX idx_modules_course_id ON modules(course_id);
CREATE INDEX idx_lessons_module_id ON lessons(module_id);
CREATE INDEX idx_lessons_confluence_parent_page_id ON lessons(confluence_parent_page_id);

-- Group course indexes
CREATE INDEX idx_group_courses_group_id ON group_courses(group_id);
CREATE INDEX idx_group_courses_course_id ON group_courses(course_id);

-- Visibility indexes
CREATE INDEX idx_group_module_visibility_group_id ON group_module_visibility(group_id);
CREATE INDEX idx_group_module_visibility_module_id ON group_module_visibility(module_id);
CREATE INDEX idx_group_lesson_visibility_group_id ON group_lesson_visibility(group_id);
CREATE INDEX idx_group_lesson_visibility_lesson_id ON group_lesson_visibility(lesson_id);

-- Progress indexes
CREATE INDEX idx_student_topic_progress_student_id ON student_topic_progress(student_id);
CREATE INDEX idx_student_topic_progress_lesson_id ON student_topic_progress(lesson_id);
CREATE INDEX idx_student_topic_progress_confluence_page_id ON student_topic_progress(confluence_page_id);
CREATE INDEX idx_student_lesson_progress_student_id ON student_lesson_progress(student_id);
CREATE INDEX idx_student_lesson_progress_lesson_id ON student_lesson_progress(lesson_id);

-- =============================================
-- 8. HELPER FUNCTIONS
-- =============================================

-- Helper function to check if current user is a teacher
-- Uses SECURITY DEFINER to bypass RLS and avoid infinite recursion
CREATE OR REPLACE FUNCTION public.is_teacher()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'teacher'
  );
END;
$$;

-- =============================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_module_visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_lesson_visibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_lesson_progress ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile, teachers can read all
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Teachers can view all profiles" ON profiles
  FOR SELECT USING (is_teacher());

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND role = (SELECT role FROM profiles WHERE id = auth.uid())
  );

-- Invitations: Only teachers can manage
CREATE POLICY "Teachers manage invitations" ON invitations
  FOR ALL USING (is_teacher());

-- Groups: Teachers can manage, students can view their groups
CREATE POLICY "Teachers can manage groups" ON groups
  FOR ALL USING (is_teacher());

CREATE POLICY "Teachers can view their assigned groups" ON groups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_teachers
      WHERE group_id = groups.id AND teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view their groups" ON groups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_students 
      WHERE group_id = groups.id AND student_id = auth.uid()
    )
  );

-- Group teachers: Teachers manage
CREATE POLICY "Teachers manage group teachers" ON group_teachers
  FOR ALL USING (is_teacher());

CREATE POLICY "Teachers view own group assignments" ON group_teachers
  FOR SELECT USING (teacher_id = auth.uid());

-- Group students: Teachers manage, students view
CREATE POLICY "Teachers manage group students" ON group_students
  FOR ALL USING (is_teacher());

CREATE POLICY "Students view own membership" ON group_students
  FOR SELECT USING (student_id = auth.uid());

-- Group schedule: Teachers manage, students view their group schedules
CREATE POLICY "Teachers manage group schedule" ON group_schedule
  FOR ALL USING (is_teacher());

CREATE POLICY "Students view their group schedules" ON group_schedule
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_students 
      WHERE group_id = group_schedule.group_id AND student_id = auth.uid()
    )
  );

CREATE POLICY "Teachers view their group schedules" ON group_schedule
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_teachers
      WHERE group_id = group_schedule.group_id AND teacher_id = auth.uid()
    )
  );

-- Courses: Teachers manage, students view assigned courses
CREATE POLICY "Teachers manage courses" ON courses
  FOR ALL USING (is_teacher());

CREATE POLICY "Students view assigned courses" ON courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_courses gc
      JOIN group_students gs ON gc.group_id = gs.group_id
      WHERE gc.course_id = courses.id AND gs.student_id = auth.uid()
    )
  );

-- Modules: Similar to courses
CREATE POLICY "Teachers manage modules" ON modules
  FOR ALL USING (is_teacher());

CREATE POLICY "Students view visible modules" ON modules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_module_visibility gmv
      JOIN group_students gs ON gmv.group_id = gs.group_id
      WHERE gmv.module_id = modules.id 
        AND gs.student_id = auth.uid()
        AND gmv.is_visible = true
    )
  );

-- Lessons: Similar to modules
CREATE POLICY "Teachers manage lessons" ON lessons
  FOR ALL USING (is_teacher());

CREATE POLICY "Students view visible lessons" ON lessons
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_lesson_visibility glv
      JOIN group_students gs ON glv.group_id = gs.group_id
      WHERE glv.lesson_id = lessons.id 
        AND gs.student_id = auth.uid()
        AND glv.is_visible = true
    )
  );

-- Progress: Students manage their own progress
CREATE POLICY "Students manage own topic progress" ON student_topic_progress
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers view all topic progress" ON student_topic_progress
  FOR SELECT USING (is_teacher());

CREATE POLICY "Students manage own lesson progress" ON student_lesson_progress
  FOR ALL USING (student_id = auth.uid());

CREATE POLICY "Teachers view all lesson progress" ON student_lesson_progress
  FOR SELECT USING (is_teacher());

-- Visibility tables: Teachers manage
CREATE POLICY "Teachers manage module visibility" ON group_module_visibility
  FOR ALL USING (is_teacher());

CREATE POLICY "Students view visible modules in their groups" ON group_module_visibility
  FOR SELECT USING (
    is_visible = true AND EXISTS (
      SELECT 1 FROM group_students
      WHERE group_id = group_module_visibility.group_id AND student_id = auth.uid()
    )
  );

CREATE POLICY "Teachers manage lesson visibility" ON group_lesson_visibility
  FOR ALL USING (is_teacher());

CREATE POLICY "Students view visible lessons in their groups" ON group_lesson_visibility
  FOR SELECT USING (
    is_visible = true AND EXISTS (
      SELECT 1 FROM group_students
      WHERE group_id = group_lesson_visibility.group_id AND student_id = auth.uid()
    )
  );

-- Group courses: Teachers manage
CREATE POLICY "Teachers manage group courses" ON group_courses
  FOR ALL USING (is_teacher());

CREATE POLICY "Students view own group courses" ON group_courses
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM group_students 
      WHERE group_id = group_courses.group_id AND student_id = auth.uid()
    )
  );

-- =============================================
-- 10. TRIGGERS FOR USER MANAGEMENT
-- =============================================

-- Function to create profile on user signup
-- Simplified version using jsonb_extract_path_text
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  SELECT
    NEW.id,
    NEW.email,
    COALESCE(
      jsonb_extract_path_text(NEW.raw_user_meta_data, 'full_name'),
      jsonb_extract_path_text(NEW.raw_user_meta_data, 'name'),
      jsonb_extract_path_text(NEW.raw_user_meta_data, 'first_name') || ' ' || jsonb_extract_path_text(NEW.raw_user_meta_data, 'last_name'),
      NEW.email
    ),
    COALESCE(
      jsonb_extract_path_text(NEW.raw_user_meta_data, 'picture'),
      jsonb_extract_path_text(NEW.raw_user_meta_data, 'avatar_url')
    ),
    CASE 
      WHEN EXISTS (SELECT 1 FROM public.invitations WHERE email = NEW.email AND role = 'teacher') 
      THEN 'teacher'::public.user_role
      ELSE 'student'::public.user_role
    END;

  -- Mark invitation as accepted
  UPDATE public.invitations 
  SET accepted_at = NOW() 
  WHERE email = NEW.email AND accepted_at IS NULL;

  RETURN NEW;
END;
$$;

-- Trigger for new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_groups_updated_at BEFORE UPDATE ON groups
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_group_schedule_updated_at BEFORE UPDATE ON group_schedule
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to link pending invitations when user signs up
CREATE OR REPLACE FUNCTION public.link_invitations_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Create group_students records from student invitations
  INSERT INTO public.group_students (group_id, student_id, joined_at, created_at)
  SELECT 
    group_id,
    NEW.id,
    NOW(),
    NOW()
  FROM public.invitations
  WHERE email = NEW.email AND role = 'student' AND group_id IS NOT NULL
  ON CONFLICT (group_id, student_id) DO NOTHING;

  -- Create group_teachers records from teacher invitations with group assignments
  INSERT INTO public.group_teachers (group_id, teacher_id, joined_at, created_at)
  SELECT 
    group_id,
    NEW.id,
    NOW(),
    NOW()
  FROM public.invitations
  WHERE email = NEW.email AND role = 'teacher' AND group_id IS NOT NULL
  ON CONFLICT (group_id, teacher_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Trigger to link invitations on user signup
DROP TRIGGER IF EXISTS on_user_signup_link_groups ON auth.users;
CREATE TRIGGER on_user_signup_link_groups
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.link_invitations_on_signup();
