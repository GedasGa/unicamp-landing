// =============================================
// API Route: Get Confluence Media Items
// =============================================

import { NextRequest, NextResponse } from 'next/server';

const CONFLUENCE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_CONFLUENCE_BASE_URL,
  accessToken: process.env.CONFLUENCE_API_TOKEN,
};

export async function POST(request: NextRequest) {
  try {
    // Extract topic ID from request body
    // Body format: { descriptors: [{ collection: "contentId-8486936", ... }] }
    const body = await request.json();
    
    const descriptors = body.descriptors;
    
    if (!Array.isArray(descriptors) || descriptors.length === 0 || !descriptors[0].collection) {
      console.error('[Media Items] Invalid request body format');
      return NextResponse.json({ error: 'Invalid request body format' }, { status: 400 });
    }
    
    // Extract topicId from collection field (e.g., "contentId-8486936" -> "8486936")
    const match = descriptors[0].collection.match(/contentId-(.+)/);
    const topicId = match ? match[1] : null;
    
    if (!topicId) {
      console.error('[Media Items] Missing topicId in collection field');
      return NextResponse.json({ error: 'Missing topicId' }, { status: 400 });
    }
    
    console.log(`[Media Items] Fetching attachments for topic: ${topicId}`);

    const url = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}/child/attachment`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${CONFLUENCE_CONFIG.accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch attachments: ${response.statusText}`);
    }

    const data = await response.json();
    
    const items = data.results.map((result: any) => {
      const item = {
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
      };
      
      return item;
    });

    return NextResponse.json({
      data: {
        items,
      },
    });
  } catch (error) {
    console.error('[Media Items] Error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Failed to fetch attachments' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
