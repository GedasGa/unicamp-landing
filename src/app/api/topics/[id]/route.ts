// =============================================
// API Route: Get Confluence Topic Content
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
    
    console.log('=== Topic Content API Called ===');
    console.log('Topic ID:', topicId);
    console.log('Request URL:', request.url);

    const url = `${CONFLUENCE_CONFIG.baseUrl}/content/${topicId}?expand=body.atlas_doc_format,history.lastUpdated`;
    console.log('Fetching topic from:', url);

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
      console.error('Failed to fetch topic:', response.status, response.statusText);
      throw new Error(`Failed to fetch topic content: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Topic fetched:', data.id, data.title);
    
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

    console.log('Returning topic content');
    console.log('=== Topic Content API Complete ===\n');

    return NextResponse.json(result);
  } catch (error) {
    console.error('=== Topic Content API Error ===');
    console.error('Error fetching topic content:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    return NextResponse.json(
      { error: 'Failed to fetch topic content' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
