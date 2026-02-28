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
};

// ----------------------------------------------------------------------

function getLessonIcon(locked: boolean, progress?: { progress: number; completed: boolean }) {
  if (locked) {
    return <Iconify icon="eva:lock-fill" sx={{ color: 'text.disabled' }} />;
  }
  if (progress?.completed) {
    return <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main' }} />;
  }
  if (progress && progress.progress > 0) {
    return <Iconify icon="eva:clock-fill" sx={{ color: 'primary.main' }} />;
  }
  return <Iconify icon="eva:radio-button-off-outline" sx={{ color: 'text.secondary' }} />;
}

// ----------------------------------------------------------------------

/**
 * Full 3-level navigation for the module page.
 * Level 1: modules — click navigates to module page.
 * Level 2: lessons — click expands/collapses only (topics fetched on demand via onExpand).
 * Level 3: topics — click navigates to lesson page with ?topic= query param.
 */
export function getModuleFullNavigation(
  courseId: string,
  courseName: string,
  modules: any[],
  accessibleModules: Set<string>,
  allLessonsMap: Map<string, any[]>,
  allAccessibleLessonsMap: Map<string, Set<string>>,
  allLessonProgressMap: Map<string, Map<string, { progress: number; completed: boolean }>>,
  allTopicsMap: Map<string, any[]>,
  allTopicProgressMap: Map<string, Map<string, any>>,
  onLessonExpand?: (lessonId: string) => void
) {
  return [
    {
      subheader: courseName,
      items: modules.map((module) => {
        const isLocked = !accessibleModules.has(module.id);
        const lessons = allLessonsMap.get(module.id) ?? [];
        const accessibleLessons = allAccessibleLessonsMap.get(module.id) ?? new Set<string>();
        const lessonProgress = allLessonProgressMap.get(module.id) ?? new Map<string, any>();

        const lessonChildren =
          !isLocked && lessons.length > 0
            ? lessons.map((lesson) => {
                const isLessonLocked = !accessibleLessons.has(lesson.id);
                const progress = lessonProgress.get(lesson.id);
                const topicsList = allTopicsMap.get(lesson.id) ?? [];
                const topicProgressForLesson = allTopicProgressMap.get(lesson.id) ?? new Map();

                const topicChildren =
                  topicsList.length > 0
                    ? topicsList.map((topic) => {
                        const isCompleted = topicProgressForLesson.get(topic.id)?.completed;

                        return {
                          title: topic.title,
                          path: `${paths.app.courses.lesson(courseId, module.id, lesson.id)}?topic=${topic.id}`,
                          icon: (
                            <Iconify
                              icon={
                                isCompleted
                                  ? 'eva:checkmark-circle-outline'
                                  : 'eva:radio-button-off-outline'
                              }
                              sx={{ color: isCompleted ? 'success.main' : 'text.secondary' }}
                            />
                          ),
                        };
                      })
                    : undefined;

                // All lessons are expandable — topics load on demand when expanded
                return {
                  title: lesson.title,
                  path: paths.app.courses.lesson(courseId, module.id, lesson.id),
                  icon: getLessonIcon(isLessonLocked, progress),
                  disabled: isLessonLocked,
                  children: topicChildren ?? [],
                  onExpand: !isLessonLocked
                    ? () => onLessonExpand?.(lesson.id)
                    : undefined,
                };
              })
            : undefined;

        return {
          title: module.title,
          path: paths.app.courses.module(courseId, module.id),
          icon: isLocked ? (
            <Iconify icon="eva:lock-fill" sx={{ color: 'text.disabled' }} />
          ) : (
            ICONS.module
          ),
          disabled: isLocked,
          children: lessonChildren,
        };
      }),
    },
  ];
}

// ----------------------------------------------------------------------

/**
 * 3-level navigation for the lesson page.
 * Level 1: all course modules (locked ones disabled).
 * Level 2: lessons under the active module — click expands/collapses (topics fetched on demand).
 * Level 3: topics — click navigates with ?topic= query param.
 */
export function getLessonPageNavigation(
  courseId: string,
  courseName: string,
  modules: any[],
  accessibleModules: Set<string>,
  currentModuleId: string,
  lessons: any[],
  accessibleLessons: Set<string>,
  lessonProgress: Map<string, { progress: number; completed: boolean }>,
  allTopicsMap: Map<string, any[]>,
  allTopicProgressMap: Map<string, Map<string, any>>,
  selectedTopicId: string | null,
  onLessonExpand?: (lessonId: string) => void
) {
  return [
    {
      subheader: courseName,
      items: modules.map((module) => {
        const isLocked = !accessibleModules.has(module.id);
        const isCurrentModule = module.id === currentModuleId;

        const lessonChildren =
          isCurrentModule && !isLocked
            ? lessons.map((lesson) => {
                const isLessonLocked = !accessibleLessons.has(lesson.id);
                const progress = lessonProgress.get(lesson.id);
                const topicsList = allTopicsMap.get(lesson.id) ?? [];
                const topicProgressForLesson = allTopicProgressMap.get(lesson.id) ?? new Map();

                const topicChildren =
                  topicsList.length > 0
                    ? topicsList.map((topic) => {
                        const isCompleted = topicProgressForLesson.get(topic.id)?.completed;

                        return {
                          title: topic.title,
                          path: `${paths.app.courses.lesson(courseId, currentModuleId, lesson.id)}?topic=${topic.id}`,
                          active: topic.id === selectedTopicId,
                          icon: (
                            <Iconify
                              icon={
                                isCompleted
                                  ? 'eva:checkmark-circle-outline'
                                  : 'eva:radio-button-off-outline'
                              }
                              sx={{ color: isCompleted ? 'success.main' : 'text.secondary' }}
                            />
                          ),
                        };
                      })
                    : undefined;

                return {
                  title: lesson.title,
                  path: paths.app.courses.lesson(courseId, currentModuleId, lesson.id),
                  icon: getLessonIcon(isLessonLocked, progress),
                  disabled: isLessonLocked,
                  children: topicChildren ?? [],
                  onExpand: !isLessonLocked
                    ? () => onLessonExpand?.(lesson.id)
                    : undefined,
                };
              })
            : undefined;

        return {
          title: module.title,
          path: paths.app.courses.module(courseId, module.id),
          icon: isLocked ? (
            <Iconify icon="eva:lock-fill" sx={{ color: 'text.disabled' }} />
          ) : (
            ICONS.module
          ),
          disabled: isLocked,
          children: lessonChildren,
        };
      }),
    },
  ];
}
