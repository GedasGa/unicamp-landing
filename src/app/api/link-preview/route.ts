// =============================================
// API Route: Fetch Link Preview Metadata
// =============================================

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    console.log('=== Link Preview API Called ===');
    console.log('URL:', url);

    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();

    // Extract metadata using regex patterns
    const metadata = {
      title: extractMetaTag(html, 'og:title') || extractMetaTag(html, 'twitter:title') || extractTitle(html),
      description: extractMetaTag(html, 'og:description') || extractMetaTag(html, 'twitter:description') || extractMetaTag(html, 'description'),
      image: extractMetaTag(html, 'og:image') || extractMetaTag(html, 'twitter:image'),
      icon: extractIcon(html, url),
    };

    console.log('Extracted metadata:', metadata);
    console.log('=== Link Preview API Complete ===\n');

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('=== Link Preview API Error ===');
    console.error('Error fetching link preview:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'N/A');
    
    // Return basic fallback metadata
    const url = new URL(request.url).searchParams.get('url');
    return NextResponse.json({
      title: url ? new URL(url).hostname : 'Unknown',
      description: undefined,
      image: undefined,
      icon: undefined,
    });
  }
}

// Helper functions to extract metadata from HTML
function extractMetaTag(html: string, property: string): string | undefined {
  // Check if property already has a prefix (og:, twitter:)
  const hasPrefix = property.includes(':');
  
  if (!hasPrefix) {
    // Try Open Graph tags
    const ogMatch = html.match(new RegExp(`<meta\\s+property=["']og:${property}["']\\s+content=["']([^"']+)["']`, 'i'));
    if (ogMatch) return ogMatch[1];

    // Try Twitter tags
    const twitterMatch = html.match(new RegExp(`<meta\\s+name=["']twitter:${property}["']\\s+content=["']([^"']+)["']`, 'i'));
    if (twitterMatch) return twitterMatch[1];

    // Try standard meta tags
    const metaMatch = html.match(new RegExp(`<meta\\s+name=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'));
    if (metaMatch) return metaMatch[1];
  } else {
    // Property already has prefix, use it directly
    const propertyMatch = html.match(new RegExp(`<meta\\s+property=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'));
    if (propertyMatch) return propertyMatch[1];
    
    const nameMatch = html.match(new RegExp(`<meta\\s+name=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'));
    if (nameMatch) return nameMatch[1];
  }

  return undefined;
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match ? match[1].trim() : 'Untitled';
}

function extractIcon(html: string, baseUrl: string): string | undefined {
  // Try to find favicon
  const iconMatch = html.match(/<link[^>]+rel=["'](?:icon|shortcut icon)["'][^>]+href=["']([^"']+)["']/i);
  if (iconMatch) {
    const iconUrl = iconMatch[1];
    // Convert relative URL to absolute
    if (iconUrl.startsWith('http')) {
      return iconUrl;
    }
    const base = new URL(baseUrl);
    if (iconUrl.startsWith('//')) {
      return `${base.protocol}${iconUrl}`;
    }
    if (iconUrl.startsWith('/')) {
      return `${base.protocol}//${base.host}${iconUrl}`;
    }
    return `${base.protocol}//${base.host}/${iconUrl}`;
  }

  // Fallback to /favicon.ico
  try {
    const base = new URL(baseUrl);
    return `${base.protocol}//${base.host}/favicon.ico`;
  } catch {
    return undefined;
  }
}

export const runtime = 'nodejs';
