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
    
    console.log('=== Lesson Topics API Called ===');
    console.log('Lesson ID:', lessonId);
    console.log('Request URL:', request.url);

    const url = `${CONFLUENCE_CONFIG.baseUrl}/content/${lessonId}/child/page`;
    console.log('Fetching topics from:', url);

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
      console.error('Failed to fetch topics:', response.status, response.statusText);
      throw new Error(`Failed to fetch topics: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Topics found:', data.results.length);
    
    const topics = data.results.map((result: any) => ({
      id: result.id,
      title: result.title,
    }));

    console.log('Returning topics:', topics.length);
    console.log('=== Lesson Topics API Complete ===\n');

    return NextResponse.json(topics);
  } catch (error) {
    console.error('=== Lesson Topics API Error ===');
    console.error('Error fetching lesson topics:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    return NextResponse.json(
      { error: 'Failed to fetch topics' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
