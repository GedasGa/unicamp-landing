// =============================================
// Client-side Confluence Actions
// These call API routes which securely handle Confluence API tokens
// =============================================

/**
 * Fetch topics for a lesson from Confluence
 */
export async function getConfluenceLessonTopics(lessonConfluenceId: string) {
  try {
    const response = await fetch(
      `/api/lessons/${lessonConfluenceId}/topics`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch topics: ${response.statusText}`);
    }

    const topics = await response.json();
    return { success: true, data: topics };
  } catch (error) {
    console.error('Error fetching lesson topics:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch topics' 
    };
  }
}

/**
 * Fetch topic content from Confluence
 */
export async function getConfluenceTopicContent(topicId: string) {
  try {
    const response = await fetch(
      `/api/topics/${topicId}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch topic content: ${response.statusText}`);
    }

    const content = await response.json();
    return { success: true, data: content };
  } catch (error) {
    console.error('Error fetching topic content:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch topic content' 
    };
  }
}
