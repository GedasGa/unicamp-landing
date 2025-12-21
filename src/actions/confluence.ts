'use server';

// =============================================
// Server Actions for Confluence Content
// =============================================

import { fetchLessonTopics, fetchTopicContent, fetchTopicAttachments } from 'src/lib/confluence';

const CONFLUENCE_ACCESS_TOKEN = process.env.CONFLUENCE_API_TOKEN || '';

/**
 * Server action to fetch topics for a lesson from Confluence
 */
export async function getConfluenceLessonTopics(lessonConfluenceId: string) {
  try {
    const topics = await fetchLessonTopics(lessonConfluenceId, CONFLUENCE_ACCESS_TOKEN);
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
    const content = await fetchTopicContent(topicId, CONFLUENCE_ACCESS_TOKEN);
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
    const attachments = await fetchTopicAttachments(topicId, CONFLUENCE_ACCESS_TOKEN);
    return { success: true, data: attachments };
  } catch (error) {
    console.error('Error fetching topic attachments:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch attachments' 
    };
  }
}
