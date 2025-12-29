import { useSearchParams } from 'next/navigation';

import { usePathname } from './use-pathname';
import { hasParams, removeParams, isExternalLink, removeLastSlash } from '../utils';

// ----------------------------------------------------------------------

export function useActiveLink(itemPath: string, deep: boolean = true): boolean {
  const pathname = removeLastSlash(usePathname());
  const searchParams = useSearchParams();

  const pathHasParams = hasParams(itemPath);

  /* Start check */
  const notValid = itemPath.startsWith('#') || isExternalLink(itemPath);

  if (notValid) {
    return false;
  }
  /* End check */

  /**
   * Special case: Topic query parameter matching
   * For paths like /courses/.../modules/.../lessons/...?topic=123
   * Only match when the topic query parameter matches exactly
   */
  if (itemPath.includes('?topic=')) {
    const [itemPathBase, itemQuery] = itemPath.split('?');
    const itemTopicMatch = itemQuery.match(/topic=([^&]+)/);
    const currentTopic = searchParams.get('topic');
    
    if (itemTopicMatch && itemTopicMatch[1]) {
      const itemTopic = itemTopicMatch[1];
      // Match if pathname matches and topic parameter matches
      return pathname === itemPathBase && currentTopic === itemTopic;
    }
  }

  /**
   * [1] Apply for Item has children or has params.
   */
  const isDeep = deep || pathHasParams;

  // console.info(isDeep ? '[deep]   :' : '[normal] :', itemPath, '-?-', pathname);

  if (isDeep) {
    /**
     * [1] Deep: default
     * @itemPath 			 = '/dashboard/user'
     * @match pathname = '/dashboard/user'
     * @match pathname = '/dashboard/user/list'
     * @match pathname = '/dashboard/user/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15/edit'
     */
    const defaultActive = pathname.includes(itemPath);

    /**
     * [1] Deep: has params
     * @itemPath 			 = '/dashboard/test?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1'
     * @match pathname = '/dashboard/test'
     */

    const originItemPath = removeParams(itemPath);

    const hasParamsActive = pathHasParams && originItemPath === pathname;

    return defaultActive || hasParamsActive;
  }

  /**
   * [1] Normal: active
   * @itemPath 			 = '/dashboard/calendar'
   * @match pathname = '/dashboard/calendar'
   */
  return pathname === itemPath;
}
