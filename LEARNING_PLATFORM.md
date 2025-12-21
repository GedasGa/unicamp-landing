# Unicamp Learning Platform

A comprehensive learning platform built with Next.js, Supabase, and Confluence integration.

## Features

- **Role-Based Access Control**: Separate interfaces for teachers and students
- **Course Management**: Organize content into Courses → Modules → Lessons
- **Dynamic Confluence Integration**: Topics are fetched directly from Confluence (not stored in database)
- **Email-Based Invitations**: Invite students to groups by email, even before they create accounts
- **Group-Based Learning**: Assign students to groups with custom visibility controls
- **Progress Tracking**: Monitor student progress at topic and lesson levels
- **Flexible Visibility**: Control which modules and lessons are visible per group
- **Module Thumbnails**: Visual representation for each module

## Architecture

### Database Schema

The platform uses Supabase PostgreSQL with the following key tables:

- `profiles`: User profiles with ro (supports email invitations for non-registered users)
- `courses`: Top-level course containers
- `modules`: Course modules with thumbnails (ordered)
- `lessons`: Module lessons with Confluence parent page references (ordered)
- **Topics**: Fetched dynamically from Confluence as child pages (not stored in DB)
- `group_module_visibility`: Control module visibility per group
- `group_lesson_visibility`: Control lesson visibility per group
- `student_topic_progress`: Track topic completion (using Confluence page IDs)lity per group
- `group_lesson_visibility`: Control lesson visibility per group
- `student_topic_progress`: Track topic completion
- `student_lesson_progress`: Track lesson progress
- `student_module_progress`: Track module progress

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Library**: Material-UI (MUI)
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **CMS Integration**: Confluence API
- **Styling**: Emotion, Material-UI

## Getting Started

### Prerequisites

- Node.js 20.x
- Supabase account
- Confluence workspace with API access

### Installation

1. **Clone the repository**
   ```bash
   cd unicamp-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your values:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `CONFLUENCE_API_TOKEN`: Base64-encoded Confluence credentials (email:token)
   - `NEXT_PUBLIC_CONFLUENCE_BASE_URL`: Your Confluence API base URL

4. **Set up Supabase database**

   a. Create a new Supabase project
   
   b. Run the schema migration:
   ```sql
   -- Copy and execute the contents of supabase/schema.sql
   -- in your Supabase SQL editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:8082](http://localhost:8082)

## Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key to `.env.local`

### 2. Run Migrations

Execute the SQL in `supabase/schema.sql` in your Supabase SQL Editor.

This will create:
- All tables with proper relationships
- Row Level Security (RLS) policies
- Indexes for performance
- Helper functions and triggers
- Views for querying student content

### 3. Configure Confluence API

1. Get your Confluence API token:
   - Go to Confluence Settings → API tokens
   - Generate a new token

2. Create Base64 token:
   ```bash
   echo -n "your-email@domain.com:your-api-token" | base64
   ```

3. Add to `.env.local`:
   ```
   CONFLUENCE_API_TOKEN=your-base64-token
   ```

## Usage

### For Teachers

Teachers can manage the learning platform through direct database access (SQL) or by building an admin interface:

#### 1. Create a Course
```sql
INSERT INTO courses (title, description, created_by)
VALUES ('Introduction to Programming', 'Learn programming basics', 'teacher-user-id');
```

#### 2. Create Modules
```sql
INSERT INTO modules (course_id, title, thumbnail_url, order_index)
VALUES 
  ('course-id', 'Module 1: Basics', 'https://example.com/thumb1.jpg', 0),
  ('course-id', 'Module 2: Advanced', 'https://example.com/thumb2.jpg', 1);
```

#### 3. Create Lessons (with Confluence Parent Page)
```sql
-- Each lesson points to a parent page in Confluence
-- Topics are automatically fetched as child pages
INSERT INTO lessons (module_id, title, confluence_parent_page_id, order_index)
VALUES 
  ('module-id', 'Lesson 1: Variables', '123456', 0), -- 123456 is Confluence page ID
  ('module-id', 'Lesson 2: Functions', '123457', 1);
```

#### 4. Invite Students to Group (by Email)
```sql
-- Students can be invited even before they have accounts
INSERT INTO group_members (group_id, email)
VALUES ('group-id', 'student@example.com');

-- Or add existing users directly
INSERT INTO group_members (group_id, student_id)
VALUES ('group-id', 'existing-user-id');
```

**Note**: When a user signs up with an invited email, they are automatically linked to their group memberships.
```sql
INSERT INTO group_courses (group_id, course_id, order_index)
VALUES ('group-id', 'course-id', 0);
```

#### 8. Set Module Visibility
```sql
-- Make first module visible
INSERT INTO group_module_visibility (group_id, module_id, is_visible)
VALUES ('group-id', 'module-id', true);
```5. Create a Group
```sql
INSERT INTO groups (name, description, created_by)
VALUES ('Fall 2024 Cohort', 'Students starting in Fall 2024', 'teacher-user-id');
```

#### 6. Assign Course to Group
7. Set Module
#### 9. Set Lesson Visibility
```sql
-- Make first lesson visible
INSERT INTO group_lesson_visibility (group_id, lesson_id, is_visible)
VALUES ('group-id', 'lesson-id', true);
```
# 8.How Topics Work

Topics are **not stored in the database**. Instead:
1. Each lesson has a `confluence_parent_page_id` field
2. When viewing a lesson, topics are fetched from Confluence as child pages
3. Progress is tracked using the Confluence page ID
4. This ensures content is always up-to-date with Confluence

###  Set Lesson Visibility
### For Students

Students access the platform through the web interface:

1. **Login**: Sign in with Supabase Auth
2. **View Courses**: See all assigned courses at `/learning/courses`
3. **Browse Modules**: Click a course to see modules and lessons
4. **Study Topics**: Click a lesson to view Confluence content
5. **Track Progress**: Mark topics as complete

## Project Structure

```
unicamp-landing/
├── supabase/
│   └── schema.sql              # Database schema
├── src/
│   ├── actions/
│   │   └── confluence.ts       # Server actions for Confluence
│   ├── app/
│   │   └── learning/
│   │       └── courses/        # Student course pages
│   ├── auth/                   # Authentication context & guards
│   ├── lib/
│   │   ├── supabase.ts        # Supabase client
│   │   ├── database.ts        # Database helper functions
│   │   └── confluence.ts      # Confluence API integration
│   ├── sections/
│   │   └── learning/          # Learning components
│   └── types/
│       └── database.types.ts  # TypeScript types
└── .env.example               # Environment variables template
```

## Key Features

### Role-Based Access

The platform supports two roles:
- **Teachers**: Full CRUD access to courses, modules, lessons, topics, groups
- **Students**: Read-only access to assigned content based on group visibility

### Row Level Security

All tables use Supabase RLS policies to ensure:
- Students only see content in their groups
- Students only see visible modules/lessons
- Teachers have full access to manage content
- Users can only update their own progress

### Confluence Integration

Topics are stored as references to Confluence pages:
- Fetch topic list from parent page
- Display full page content with formatting
- Support for attachments and images
- Last updated metadata

### Progress Tracking

The platform tracks student progress at multiple levels:
- **Topic Level**: Completed/incomplete status
- **Lesson Level**: Percentage based on topics completed
- **Module Level**: Percentage based on lessons completed

## API Reference

### Database Helpers

See `src/lib/database.ts` for all available functions:
OrEmail) // Accepts email or user ID
inviteStudentToGroupByEmail(groupId, email)  // Explicitly invite by email

// Courses
createCourse(title, description, thumbnailUrl, createdBy)
getCourses()
getCourse(courseId)

// Modules, Lessons
createModule(courseId, title, description, thumbnailUrl, orderIndex)
createLesson(moduleId, title, confluenceParentPageId, description, orderIndex)

// Topics (fetched from Confluence, not stored in DB)
// See confluence.ts and actions/confluence.ts

// Visibility
setModuleVisibility(groupId, moduleId, isVisible)
setLessonVisibility(groupId, lessonId, isVisible)

// Progress
markTopicComplete(studentId, lessonId, confluencePageId, completed)
getTopicProgress(studentId, lessonId, confluencePageId)
getLessonTopicProgress(studentId, lessonIerIndex)
createLesson(moduleId, title, description, orderIndex)
createTopic(lessonId, confluencePageId, title, orderIndex)

// Visibility
setModuleVisibility(groupId, moduleId, isVisible)
setLessonVisibility(groupId, lessonId, isVisible)

// Progress
markTopicComplete(studentId, topicId, completed)
updateLessonProgress(studentId, lessonId, percentage, completed)
```

### Server Actions

See `src/actions/confluence.ts`:

```typescript
getConfluenceLessonTopics(lessonConfluenceId)
getConfluenceTopicContent(topicId)
getConfluenceTopicAttachments(topicId)
```

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Security

- All API tokens stored server-side (never exposed to client)
- Row Level Security enforces access control at database level
- Supabase Auth handles authentication
- HTTPS required in production

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Proprietary - UAB Unicamp

## Support

For questions or issues, contact the development team.
