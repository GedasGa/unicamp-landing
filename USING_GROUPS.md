# Using Groups in the Application

The application now uses real user groups from the database instead of hardcoded teams. Here's how to use the group context across your components.

## Setup

The `GroupProvider` is already configured in the root layout and wraps your entire application. It provides:
- `groups`: Array of all groups the current user belongs to
- `selectedGroup`: The currently selected group
- `setSelectedGroup`: Function to change the selected group
- `loading`: Loading state while fetching groups

## Usage Example

### In any component (client-side only):

```tsx
'use client';

import { useGroupContext } from 'src/contexts/group-context';
import { getCoursesByGroup } from 'src/lib/database';

export function CourseList() {
  const { selectedGroup, loading: groupLoading } = useGroupContext();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!selectedGroup) return;
      
      try {
        setLoading(true);
        const data = await getCoursesByGroup(selectedGroup.id);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedGroup?.id]); // Refetch when group changes

  if (groupLoading || loading) {
    return <div>Loading...</div>;
  }

  if (!selectedGroup) {
    return <div>Please select a group</div>;
  }

  return (
    <div>
      <h2>Courses for {selectedGroup.name}</h2>
      {courses.map(course => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
}
```

## Available Database Functions

### Get courses by group:
```ts
import { getCoursesByGroup } from 'src/lib/database';
const courses = await getCoursesByGroup(groupId);
```

### Get user's groups:
```ts
import { getUserGroups } from 'src/lib/database';
const groups = await getUserGroups(userId);
// Or specifically:
import { getStudentGroups, getTeacherGroups } from 'src/lib/database';
const studentGroups = await getStudentGroups(studentId);
const teacherGroups = await getTeacherGroups(teacherId);
```

### Get group members:
```ts
import { getGroupMembers } from 'src/lib/database';
const members = await getGroupMembers(groupId);
```

## Filtering Other Data by Group

When you need to filter other data by group, you can:

1. Add similar functions to `src/lib/database.ts` that join with the appropriate group tables
2. Use the `selectedGroup.id` from the context to filter queries
3. Always check if `selectedGroup` exists before making queries

Example for filtering lessons by group:
```ts
export async function getLessonsByGroup(groupId: string, moduleId: string) {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId)
    .order('order');

  if (error) throw error;
  return data;
}
```

## Group Selection Persistence

The selected group is automatically saved to localStorage and will persist across:
- Page refreshes
- Navigation between pages
- Browser sessions

## Important Notes

1. **Client-side only**: The `useGroupContext` hook can only be used in client components (components with `'use client'` directive)
2. **Check for null**: Always check if `selectedGroup` exists before using it
3. **Loading states**: Handle both `groupLoading` (fetching groups) and your own loading states
4. **Server Components**: For server components, you'll need to pass the group ID as a prop or use route parameters
