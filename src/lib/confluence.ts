// =============================================
// Confluence Types
// =============================================

export interface ConfluenceTopic {
  id: string;
  title: string;
}

export interface ConfluenceTopicDetail {
  id: string;
  title: string;
  content: any; // ADF (Atlassian Document Format) JSON
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
