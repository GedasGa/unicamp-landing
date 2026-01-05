'use server';

// =============================================
// Server Actions for Confluence Content
// SECURITY: These functions run ONLY on the server
// The CONFLUENCE_API_TOKEN is never exposed to the client
// =============================================

// Server-side only configuration
// IMPORTANT: CONFLUENCE_API_TOKEN must NOT have NEXT_PUBLIC_ prefix
const CONFLUENCE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_CONFLUENCE_BASE_URL, // Public - just the Confluence URL
  accessToken: process.env.CONFLUENCE_API_TOKEN,        // Private - server-side only
};

/**
 * Server action to fetch topics for a lesson from Confluence
 */
export async function getConfluenceLessonTopics(lessonConfluenceId: string) {
  try {
    if (!CONFLUENCE_CONFIG.baseUrl || !CONFLUENCE_CONFIG.accessToken) {
      throw new Error('Confluence configuration is missing');
    }

    const url = `${CONFLUENCE_CONFIG.baseUrl}/content/${lessonConfluenceId}/child/page`;

    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${CONFLUENCE_CONFIG.accessToken}`,
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch topics: ${response.statusText}`);
    }

    const data = await response.json();
    
    const topics = data.results.map((result: any) => ({
      id: result.id,
      title: result.title,
    }));

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
    if (!CONFLUENCE_CONFIG.baseUrl || !CONFLUENCE_CONFIG.accessToken) {
      throw new Error('Confluence configuration is missing');
    }

    const url = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}?expand=body.atlas_doc_format,history.lastUpdated`;

    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${CONFLUENCE_CONFIG.accessToken}`,
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch topic content: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the ADF content - Confluence returns it as a JSON string
    const adfContent = typeof data.body.atlas_doc_format.value === 'string' 
      ? JSON.parse(data.body.atlas_doc_format.value)
      : data.body.atlas_doc_format.value;
    
    const result = {
      id: data.id,
      title: data.title,
      content: adfContent,
      lastUpdated: data.history.lastUpdated,
    };

    return { success: true, data: result };
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
    if (!CONFLUENCE_CONFIG.baseUrl || !CONFLUENCE_CONFIG.accessToken) {
      throw new Error('Confluence configuration is missing');
    }

    const url = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}/child/attachment`;

    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${CONFLUENCE_CONFIG.accessToken}`,
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch attachments: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data: data.results };
  } catch (error) {
    console.error('Error fetching topic attachments:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch attachments' 
    };
  }
}
