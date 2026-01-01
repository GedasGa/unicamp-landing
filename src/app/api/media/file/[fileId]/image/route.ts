// =============================================
// API Route: Get Confluence Image/File
// =============================================

import { NextRequest, NextResponse } from 'next/server';

const CONFLUENCE_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_CONFLUENCE_BASE_URL,
  accessToken: process.env.CONFLUENCE_API_TOKEN,
};

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;
    
    // Extract topic ID from query params
    const { searchParams } = new URL(request.url);
    const topicId = searchParams.get('collection')?.replace('contentId-', '');
    
    if (!topicId) {
      console.error('[Media Image] Missing topicId in query params');
      return NextResponse.json({ error: 'Missing collection/topicId' }, { status: 400 });
    }
    
    console.log(`[Media Image] Fetching file ${fileId} for topic ${topicId}`);

    // First, get the attachment list to find the attachment ID
    const attachmentUrl = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}/child/attachment`;
    
    const attachmentResponse = await fetch(attachmentUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${CONFLUENCE_CONFIG.accessToken}`,
        Accept: 'application/json',
      },
    });

    if (!attachmentResponse.ok) {
      throw new Error(`Failed to fetch attachments: ${attachmentResponse.statusText}`);
    }

    const attachmentData = await attachmentResponse.json();
    
    const attachment = attachmentData.results.find(
      (result: any) => result.extensions.fileId === fileId
    );

    if (!attachment) {
      console.error(`[Media Image] Attachment not found: ${fileId}`);
      return NextResponse.json({ error: 'Attachment not found' }, { status: 404 });
    }

    // Now download the actual file
    const downloadUrl = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}/child/attachment/${attachment.id}/download`;
    
    const fileResponse = await fetch(downloadUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${CONFLUENCE_CONFIG.accessToken}`,
      },
    });

    if (!fileResponse.ok) {
      throw new Error(`Failed to download file: ${fileResponse.statusText}`);
    }

    // Get the file content
    const fileBuffer = await fileResponse.arrayBuffer();

    // Create response with appropriate headers
    const headers = new Headers();
    const contentType = fileResponse.headers.get('content-type');
    if (contentType) {
      headers.set('Content-Type', contentType);
    }
    
    const contentLength = fileResponse.headers.get('content-length');
    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }

    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('[Media Image] Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}

export const runtime = 'edge';
