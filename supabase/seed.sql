-- =============================================
-- UNICAMP LEARNING PLATFORM - SEED DATA
-- =============================================
-- This file contains initial data for testing and development
-- Run this AFTER schema.sql has been executed
-- =============================================

-- =============================================
-- 1. CREATE GROUP
-- =============================================

INSERT INTO groups (name, description, created_at)
VALUES 
  ('UXUI202601', 'UX/UI Design cohort starting January 2026', NOW());

-- =============================================
-- 2. CREATE COURSE
-- =============================================

INSERT INTO courses (title, description, created_at)
VALUES 
  ('UX/UI Web Design basics with Figma', 
   'Learn the fundamentals of UX/UI design using Figma',
   NOW());

-- =============================================
-- 3. CREATE MODULES, LESSONS, AND CONFIGURE GROUP
-- =============================================

-- Get the course ID from the previous insert
DO $$
DECLARE
  v_course_id UUID;
  v_group_id UUID;
  v_module1_id UUID;
  v_module2_id UUID;
  v_module3_id UUID;
  v_lesson1_id UUID;
  v_lesson2_id UUID;
BEGIN
  -- Get the course and group IDs
  SELECT id INTO v_course_id FROM courses WHERE title = 'UX/UI Web Design basics with Figma';
  SELECT id INTO v_group_id FROM groups WHERE name = 'UXUI202601';

  -- Insert modules and capture their IDs
  INSERT INTO modules (course_id, title, description, order_index, created_at)
  VALUES 
    (v_course_id, 'Foundations of Digital Design (101)', 
     'Learn the core principles and foundations of digital design', 0, NOW())
  RETURNING id INTO v_module1_id;

  INSERT INTO modules (course_id, title, description, order_index, created_at)
  VALUES 
    (v_course_id, 'Crafting Seamless Experiences (UX)', 
     'Master user experience design principles and methodologies', 1, NOW())
  RETURNING id INTO v_module2_id;

  INSERT INTO modules (course_id, title, description, order_index, created_at)
  VALUES 
    (v_course_id, 'Designing the Visual Language (UI)', 
     'Create beautiful and functional user interfaces', 2, NOW())
  RETURNING id INTO v_module3_id;

  -- Insert sample lessons for module 1 (with actual Confluence page IDs)
  -- Note: Replace these placeholder IDs with actual Confluence parent page IDs
  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Introduction to Digital Design', 
     'Overview of digital design principles and tools', 'confluence-page-id-1', 0, NOW())
  RETURNING id INTO v_lesson1_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Design Fundamentals', 
     'Core concepts of color, typography, and layout', 'confluence-page-id-2', 1, NOW())
  RETURNING id INTO v_lesson2_id;

  -- Assign course to group
  INSERT INTO group_courses (group_id, course_id, order_index, created_at)
  VALUES (v_group_id, v_course_id, 0, NOW());

  -- Set module visibility
  INSERT INTO group_module_visibility (group_id, module_id, is_visible, unlocked_at, created_at)
  VALUES 
    (v_group_id, v_module1_id, true, NOW(), NOW()),
    (v_group_id, v_module2_id, false, NULL, NOW()),
    (v_group_id, v_module3_id, false, NULL, NOW());

  -- Set lesson visibility for the visible module
  INSERT INTO group_lesson_visibility (group_id, lesson_id, is_visible, unlocked_at, created_at)
  VALUES 
    (v_group_id, v_lesson1_id, true, NOW(), NOW()),
    (v_group_id, v_lesson2_id, true, NOW(), NOW());

  -- Invite student to group (will be linked when they sign up)
  INSERT INTO invitations (email, role, group_id, invited_at)
  VALUES ('gedas.gardauskas@gmail.com', 'student', v_group_id, NOW());

  -- Insert sample schedule events for the group
  -- Lessons scheduled for January-February 2026
  INSERT INTO group_schedule (group_id, lesson_id, title, description, start_time, end_time, mode, meeting_link, created_at)
  VALUES 
    -- Week 1
    (v_group_id, v_lesson1_id, 
     'Introduction to Digital Design', 
     'Welcome session and introduction to the course',
     '2026-01-15 18:00:00+00'::timestamptz,
     '2026-01-15 20:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/example-1',
     NOW()),
    
    -- Week 2
    (v_group_id, v_lesson1_id, 
     'Design Fundamentals - Part 1', 
     'Core concepts of color and typography',
     '2026-01-22 18:00:00+00'::timestamptz,
     '2026-01-22 20:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/example-2',
     NOW()),
    
    -- Week 3
    (v_group_id, v_lesson2_id, 
     'Design Fundamentals - Part 2', 
     'Layout principles and composition',
     '2026-01-29 18:00:00+00'::timestamptz,
     '2026-01-29 20:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/example-3',
     NOW()),
    
    -- Week 4
    (v_group_id, v_lesson2_id, 
     'Workshop: Applying Design Fundamentals', 
     'Hands-on practice with design principles',
     '2026-02-05 18:00:00+00'::timestamptz,
     '2026-02-05 20:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/example-4',
     NOW()),
    
    -- Week 5
    (v_group_id, NULL, 
     'Q&A and Review Session', 
     'Open discussion and review of Module 1',
     '2026-02-12 18:00:00+00'::timestamptz,
     '2026-02-12 20:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/example-5',
     NOW());

END $$;
