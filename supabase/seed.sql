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
END $$;
