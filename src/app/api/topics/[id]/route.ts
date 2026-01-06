// =============================================
// API Route: Get Confluence Topic Content
// =============================================

import type { NextRequest} from 'next/server';

import { NextResponse } from 'next/server';

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
    
    console.log(`[Topic Content] Fetching topic: ${topicId}`);

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

    return NextResponse.json(result);
  } catch (error) {
    console.error('[Topic Content] Error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Failed to fetch topic content' },
      { status: 500 }
    );
  }
}
