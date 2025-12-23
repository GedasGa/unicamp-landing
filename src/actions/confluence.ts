'use server';

// =============================================
// Server Actions for Confluence Content
// =============================================

/**
 * Server action to fetch topics for a lesson from Confluence
 */
export async function getConfluenceLessonTopics(lessonConfluenceId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/${lessonConfluenceId}/topics`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch topics: ${response.statusText}`);
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
 * Server action to fetch topic content from Confluence
 */
export async function getConfluenceTopicContent(topicId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/topics/${topicId}`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch topic content: ${response.statusText}`);
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

/**
 * Server action to fetch topic attachments from Confluence
 */
export async function getConfluenceTopicAttachments(topicId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/topics/${topicId}/attachments`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch attachments: ${response.statusText}`);
    }

    const attachments = await response.json();
    return { success: true, data: attachments };
  } catch (error) {
    console.error('Error fetching topic attachments:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch attachments' 
    };
  }
}
