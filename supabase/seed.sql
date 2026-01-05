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
  ('UX/UI Web Design basics with Figma', 'Learn the fundamentals of UX/UI design using Figma', NOW());

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
  v_module4_id UUID;
  v_lesson1_id UUID;
  v_lesson2_id UUID;
  v_lesson3_id UUID;
  v_lesson4_id UUID;
  v_lesson5_id UUID;
  v_lesson6_id UUID;
  v_lesson7_id UUID;
  v_lesson8_id UUID;
  v_lesson9_id UUID;
BEGIN
  -- Get the course and group IDs
  SELECT id INTO v_course_id FROM courses WHERE title = 'UX/UI Web Design basics with Figma';
  SELECT id INTO v_group_id FROM groups WHERE name = 'UXUI202601';

  -- Insert modules and capture their IDs
  INSERT INTO modules (course_id, title, description, order_index, created_at)
  VALUES 
    (v_course_id, 'Foundations of Digital Design (101)', 'Learn the core principles and foundations of digital design', 0, NOW())
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

  INSERT INTO modules (course_id, title, description, order_index, created_at)
  VALUES 
    (v_course_id, 'From Concept to Creation (Project)', 
     'Apply your skills to create a complete design project', 3, NOW())
  RETURNING id INTO v_module4_id;

  -- Insert lessons for Foundations of Digital Design (101)
  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Let''s get started', 
     'Welcome to the course and getting started with digital design', '8520003', 0, NOW())
  RETURNING id INTO v_lesson1_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'UX vs. UI', 
     'Understanding the difference between UX and UI design', '8520108', 1, NOW())
  RETURNING id INTO v_lesson2_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Exploring Figma', 
     'Introduction to Figma and its core features', '8520051', 2, NOW())
  RETURNING id INTO v_lesson3_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'The Design Process', 
     'Understanding the design thinking process', '8520098', 3, NOW())
  RETURNING id INTO v_lesson4_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Principles of Design (Gestalt)', 
     'Learn the fundamental Gestalt principles of design', '8585312', 4, NOW())
  RETURNING id INTO v_lesson5_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Typography', 
     'Master typography and font selection', '8520087', 5, NOW())
  RETURNING id INTO v_lesson6_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Color Psychology', 
     'Understanding color theory and psychology in design', '17236009', 6, NOW())
  RETURNING id INTO v_lesson7_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Introduction to Layouts', 
     'Learn the basics of layout design', '8520123', 7, NOW())
  RETURNING id INTO v_lesson8_id;

  INSERT INTO lessons (module_id, title, description, confluence_parent_page_id, order_index, created_at)
  VALUES 
    (v_module1_id, 'Layout', 
     'Advanced layout techniques and best practices', '49971204', 8, NOW())
  RETURNING id INTO v_lesson9_id;

  -- Assign course to group
  INSERT INTO group_courses (group_id, course_id, order_index, created_at)
  VALUES (v_group_id, v_course_id, 0, NOW());

  -- Set module visibility
  -- Only Foundations of Digital Design (101) is visible and unlocked
  INSERT INTO group_module_visibility (group_id, module_id, is_visible, unlocked_at, created_at)
  VALUES 
    (v_group_id, v_module1_id, true, NOW(), NOW()),
    (v_group_id, v_module2_id, false, NULL, NOW()),
    (v_group_id, v_module3_id, false, NULL, NOW()),
    (v_group_id, v_module4_id, false, NULL, NOW());

  -- Set lesson visibility
  -- All lessons are visible, but only the first one is unlocked
  INSERT INTO group_lesson_visibility (group_id, lesson_id, is_visible, unlocked_at, created_at)
  VALUES 
    (v_group_id, v_lesson1_id, true, NOW(), NOW()),
    (v_group_id, v_lesson2_id, true, NULL, NOW()),
    (v_group_id, v_lesson3_id, true, NULL, NOW()),
    (v_group_id, v_lesson4_id, true, NULL, NOW()),
    (v_group_id, v_lesson5_id, true, NULL, NOW()),
    (v_group_id, v_lesson6_id, true, NULL, NOW()),
    (v_group_id, v_lesson7_id, true, NULL, NOW()),
    (v_group_id, v_lesson8_id, true, NULL, NOW()),
    (v_group_id, v_lesson9_id, true, NULL, NOW());

  -- Invite student to group (will be linked when they sign up)
  INSERT INTO invitations (email, role, group_id, invited_at)
  VALUES ('gedas.gardauskas@gmail.com', 'student', v_group_id, NOW());

  -- Insert schedule events for the group
  -- Lectures: Wednesdays 18:30-20:00 and Saturdays 9:30-13:30 (Lithuanian time, UTC+2)
  -- Period: 2026-01-07 to 2026-03-28
  INSERT INTO group_schedule (group_id, lesson_id, title, description, start_time, end_time, mode, meeting_link, created_at)
  VALUES 
    -- Week 1
    (v_group_id, v_lesson1_id, 
     'Let''s get started', 
     'Welcome session and introduction to the course',
     '2026-01-07 16:30:00+00'::timestamptz,
     '2026-01-07 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/tpm-fpfr-vio',
     NOW()),
    
    (v_group_id, v_lesson2_id, 
     'UX vs. UI', 
     'Understanding the difference between UX and UI design',
     '2026-01-10 07:30:00+00'::timestamptz,
     '2026-01-10 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 2
    (v_group_id, v_lesson3_id, 
     'Exploring Figma', 
     'Introduction to Figma and its core features',
     '2026-01-14 16:30:00+00'::timestamptz,
     '2026-01-14 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, v_lesson4_id, 
     'The Design Process', 
     'Understanding the design thinking process',
     '2026-01-17 07:30:00+00'::timestamptz,
     '2026-01-17 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 3
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-01-21 16:30:00+00'::timestamptz,
     '2026-01-21 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-01-24 07:30:00+00'::timestamptz,
     '2026-01-24 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 4
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-01-28 16:30:00+00'::timestamptz,
     '2026-01-28 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-01-31 07:30:00+00'::timestamptz,
     '2026-01-31 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 5
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-02-04 16:30:00+00'::timestamptz,
     '2026-02-04 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-02-07 07:30:00+00'::timestamptz,
     '2026-02-07 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 6
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-02-11 16:30:00+00'::timestamptz,
     '2026-02-11 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-02-14 07:30:00+00'::timestamptz,
     '2026-02-14 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 7
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-02-18 16:30:00+00'::timestamptz,
     '2026-02-18 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-02-21 07:30:00+00'::timestamptz,
     '2026-02-21 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 8
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-02-25 16:30:00+00'::timestamptz,
     '2026-02-25 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-02-28 07:30:00+00'::timestamptz,
     '2026-02-28 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 9
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-03-04 16:30:00+00'::timestamptz,
     '2026-03-04 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-03-07 07:30:00+00'::timestamptz,
     '2026-03-07 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 10
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-03-12 16:30:00+00'::timestamptz,
     '2026-03-12 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-03-14 07:30:00+00'::timestamptz,
     '2026-03-14 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 11
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-03-18 16:30:00+00'::timestamptz,
     '2026-03-18 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-03-21 07:30:00+00'::timestamptz,
     '2026-03-21 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW()),
    
    -- Week 12
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-03-25 16:30:00+00'::timestamptz,
     '2026-03-25 18:00:00+00'::timestamptz,
     'online',
     'https://meet.google.com/pcw-vqvi-aem',
     NOW()),
    
    (v_group_id, NULL, 
     'UX/UI paskaita', 
     NULL,
     '2026-03-28 07:30:00+00'::timestamptz,
     '2026-03-28 11:30:00+00'::timestamptz,
     'online',
     'https://meet.google.com/eoi-upht-agj',
     NOW());

END $$;
