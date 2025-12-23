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
  { params }: { params: { id: string; fileId: string } }
) {
  try {
    const { id: topicId, fileId } = params;
    
    console.log('=== Image API Called ===');
    console.log('Topic ID:', topicId);
    console.log('File ID:', fileId);
    console.log('Request URL:', request.url);

    // First, get the attachment list to find the attachment ID
    const attachmentUrl = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}/child/attachment`;
    console.log('Fetching attachments from:', attachmentUrl);
    
    const attachmentResponse = await fetch(
      attachmentUrl,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${CONFLUENCE_CONFIG.accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!attachmentResponse.ok) {
      console.error('Failed to fetch attachments:', attachmentResponse.status, attachmentResponse.statusText);
      throw new Error(`Failed to fetch attachments: ${attachmentResponse.statusText}`);
    }

    const attachmentData = await attachmentResponse.json();
    console.log('Attachments found:', attachmentData.results.length);
    console.log('Looking for fileId:', fileId);
    
    // Log all attachments for debugging
    attachmentData.results.forEach((att: any, index: number) => {
      console.log(`Attachment ${index}:`, {
        id: att.id,
        title: att.title,
        fileId: att.extensions?.fileId,
        mediaType: att.extensions?.mediaType,
      });
    });
    
    const attachment = attachmentData.results.find(
      (result: any) => result.extensions.fileId === fileId
    );

    if (!attachment) {
      console.error('Attachment not found for fileId:', fileId);
      return NextResponse.json({ error: 'Attachment not found' }, { status: 404 });
    }

    console.log('Found attachment:', {
      id: attachment.id,
      title: attachment.title,
      fileId: attachment.extensions?.fileId,
    });

    // Now download the actual file
    const downloadUrl = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}/child/attachment/${attachment.id}/download`;
    console.log('Downloading from:', downloadUrl);
    
    const fileResponse = await fetch(
      downloadUrl,
      {
        method: 'GET',
        headers: {
          Authorization: `Basic ${CONFLUENCE_CONFIG.accessToken}`,
        },
      }
    );

    if (!fileResponse.ok) {
      console.error('Failed to download file:', fileResponse.status, fileResponse.statusText);
      throw new Error(`Failed to download file: ${fileResponse.statusText}`);
    }

    console.log('File download successful');
    console.log('Content-Type:', fileResponse.headers.get('content-type'));
    console.log('Content-Length:', fileResponse.headers.get('content-length'));

    // Get the file content
    const fileBuffer = await fileResponse.arrayBuffer();
    console.log('File buffer size:', fileBuffer.byteLength);

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

    console.log('Returning file with headers:', Object.fromEntries(headers.entries()));
    console.log('=== Image API Complete ===\n');

    return new NextResponse(fileBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('=== Image API Error ===');
    console.error('Error fetching file:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}

export const runtime = 'edge';
