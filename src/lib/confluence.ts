// =============================================
// Confluence API Integration
// =============================================

const CONFLUENCE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_CONFLUENCE_BASE_URL,
};

export interface ConfluenceTopic {
  id: string;
  title: string;
}

export interface ConfluenceTopicDetail {
  id: string;
  title: string;
  content: string;
  lastUpdated: {
    when: string;
    by: {
      displayName: string;
    };
  };
}

export interface ConfluenceAttachment {
  id: string;
  type: 'file';
  collection: string;
  details: {
    mediaType: string;
    mimeType: string;
    name: string;
    size: number;
    processingStatus: string;
    artifacts: Record<string, { url: string; processingStatus: string }>;
    representations: {
      image: Record<string, any>;
    };
    createdAt: number;
  };
}

// =============================================
// API FUNCTIONS (to be called from server actions)
// =============================================

/**
 * Fetch topics (child pages) for a lesson
 * @param lessonConfluenceId - The Confluence page ID of the lesson
 * @param token - The Confluence API token (passed from server action)
 */
export async function fetchLessonTopics(lessonConfluenceId: string, token: string): Promise<ConfluenceTopic[]> {
  
  const response = await fetch(
    `${CONFLUENCE_CONFIG.baseUrl}/content/${lessonConfluenceId}/child/page`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch topics: ${response.statusText}`);
  }

  const data = await response.json();
  
  return data.results.map((result: any) => ({
    id: result.id,
    title: result.title,
  }));
}

/**
 * Fetch topic content by ID
 * @param topicId - The Confluence page ID of the topic
 * @param token - The Confluence API token (passed from server action)
 */
export async function fetchTopicContent(topicId: string, token: string): Promise<ConfluenceTopicDetail> {
  
  const response = await fetch(
    `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}?expand=body.atlas_doc_format,history.lastUpdated`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch topic content: ${response.statusText}`);
  }

  const data = await response.json();
  
  return {
    id: data.id,
    title: data.title,
    content: data.body.atlas_doc_format.value,
    lastUpdated: data.history.lastUpdated,
  };
}

/**
 * Fetch attachments for a topic
 * @param topicId - The Confluence page ID of the topic
 * @param token - The Confluence API token (passed from server action)
 */
export async function fetchTopicAttachments(topicId: string, token: string): Promise<ConfluenceAttachment[]> {
  
  const response = await fetch(
    `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}/child/attachment`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch attachments: ${response.statusText}`);
  }

  const data = await response.json();
  
  return data.results.map((result: any) => ({
    id: result.extensions.fileId,
    type: 'file',
    collection: result.extensions.collectionName,
    details: {
      mediaType: result.extensions.mediaType.split('/')[0],
      mimeType: result.extensions.mediaType,
      name: result.title,
      size: result.extensions.fileSize,
      processingStatus: 'succeeded',
      artifacts: {
        [result.extensions.mediaType.replace('/', '.')]: {
          url: `/file/${result.extensions.fileId}/artifact/${result.extensions.mediaType.replace('/', '.')}/binary`,
          processingStatus: 'succeeded',
        },
      },
      representations: {
        image: {},
      },
      createdAt: Date.now(),
    },
  }));
}

/**
 * Get attachment download URL
 */
export function getAttachmentDownloadUrl(topicId: string, attachmentId: string): string {
  return `/api/confluence/topics/${topicId}/attachments/${attachmentId}`;
}
