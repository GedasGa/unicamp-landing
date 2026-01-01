// =============================================
// API Route: Get Lesson Topics (Child Pages)
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
    const lessonId = params.id;
    
    console.log(`[Lesson Topics] Fetching for lesson: ${lessonId}`);

    const url = `${CONFLUENCE_CONFIG.baseUrl}/content/${lessonId}/child/page`;

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

    return NextResponse.json(topics);
  } catch (error) {
    console.error('[Lesson Topics] Error:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
