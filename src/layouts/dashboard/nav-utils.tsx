import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  module: icon('ic-course'),
  lesson: icon('ic-kanban'),
  topic: icon('ic-file'),
};

// ----------------------------------------------------------------------

/**
 * Generate navigation for course page (showing modules)
 */
export function getCourseNavigation(
  courseId: string, 
  courseName: string, 
  modules: any[],
  currentModuleId?: string
) {
  return [
    {
      subheader: courseName,
      items: modules.map((module) => ({
        title: module.title,
        path: paths.app.courses.module(courseId, module.id),
        icon: module.locked ? (
          <Iconify icon="eva:lock-fill" sx={{ color: 'text.disabled' }} />
        ) : (
          ICONS.module
        ),
        disabled: module.locked,
      })),
    },
  ];
}

/**
 * Generate navigation for module page (showing lessons)
 */
export function getModuleNavigation(
  courseId: string,
  moduleId: string,
  courseName: string,
  moduleName: string,
  lessons: any[],
  accessibleLessons?: Set<string>
) {
  return [
    {
      subheader: courseName,
      items: lessons.map((lesson) => {
        const isLocked = accessibleLessons ? !accessibleLessons.has(lesson.id) : lesson.locked;
        
        return {
          title: lesson.title,
          path: paths.app.courses.lesson(courseId, moduleId, lesson.id),
          icon: isLocked ? (
            <Iconify icon="eva:lock-fill" sx={{ color: 'text.disabled' }} />
          ) : (
            ICONS.lesson
          ),
          disabled: isLocked,
        };
      }),
    },
  ];
}

/**
 * Generate navigation for lesson page (showing topics)
 * Topics use query params, so path includes ?topic=
 */
export function getLessonNavigation(
  courseId: string,
  moduleId: string,
  lessonId: string,
  lessonName: string,
  topics: any[],
  topicProgress?: Map<string, any>,
  selectedTopicId?: string | null
) {
  return [
    {
      subheader: lessonName,
      items: topics.map((topic) => {
        const isCompleted = topicProgress?.get(topic.id)?.completed;
        const isActive = topic.id === selectedTopicId;
        
        return {
          title: topic.title,
          path: `${paths.app.courses.lesson(courseId, moduleId, lessonId)}?topic=${topic.id}`,
          active: isActive,
          icon: (
            <Iconify 
              icon={
                isCompleted 
                  ? 'eva:checkmark-circle-2-fill' 
                  : 'eva:radio-button-off-outline'
              }
              sx={{
                color: isCompleted ? 'success.main' : 'text.secondary',
              }}
            />
          ),
        };
      }),
    },
  ];
}
