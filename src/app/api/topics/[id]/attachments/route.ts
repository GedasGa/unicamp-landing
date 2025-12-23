// =============================================
// API Route: Get Topic Attachments
// =============================================

import { NextRequest, NextResponse } from 'next/server';

const CONFLUENCE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_CONFLUENCE_BASE_URL,
  accessToken: process.env.CONFLUENCE_API_TOKEN,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topicId = params.id;
    
    console.log('=== Topic Attachments API Called ===');
    console.log('Topic ID:', topicId);
    console.log('Request URL:', request.url);

    const url = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}/child/attachment`;
    console.log('Fetching attachments from:', url);

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
      console.error('Failed to fetch attachments:', response.status, response.statusText);
      throw new Error(`Failed to fetch attachments: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Attachments found:', data.results.length);
    
    const attachments = data.results.map((result: any) => {
      const attachment = {
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
      
      console.log('Mapped attachment:', {
        id: attachment.id,
        name: attachment.details.name,
        mediaType: attachment.details.mediaType,
        mimeType: attachment.details.mimeType,
      });
      
      return attachment;
    });

    console.log('Returning attachments:', attachments.length);
    console.log('=== Topic Attachments API Complete ===\n');

    return NextResponse.json(attachments);
  } catch (error) {
    console.error('=== Topic Attachments API Error ===');
    console.error('Error fetching attachments:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    return NextResponse.json(
      { error: 'Failed to fetch attachments' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
