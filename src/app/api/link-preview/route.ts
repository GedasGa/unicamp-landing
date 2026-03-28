// =============================================
// API Route: Fetch Link Preview Metadata
// =============================================

import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  console.log('[Link Preview] Fetching:', url);

  // YouTube: use oEmbed API — reliable, public, works everywhere
  const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/))([^?&/]+)/);
  if (youtubeMatch) {
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
      const res = await fetch(oembedUrl);
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json({
          title: data.title,
          description: data.author_name ? `By ${data.author_name}` : undefined,
          image: data.thumbnail_url,
          icon: 'https://www.youtube.com/s/desktop/ce262d3b/img/favicon_32x32.png',
        });
      }
    } catch (error) {
      console.error('[Link Preview] YouTube oEmbed error:', error instanceof Error ? error.message : error);
    }
    return NextResponse.json({ error: 'Failed to fetch YouTube metadata' }, { status: 502 });
  }

  // Generic: scrape OG/twitter meta tags
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();

    const metadata = {
      title:
        extractMetaTag(html, 'og:title') ||
        extractMetaTag(html, 'twitter:title') ||
        extractTitle(html),
      description:
        extractMetaTag(html, 'og:description') ||
        extractMetaTag(html, 'twitter:description') ||
        extractMetaTag(html, 'description'),
      image: extractMetaTag(html, 'og:image') || extractMetaTag(html, 'twitter:image'),
      icon: extractIcon(html, url),
      siteName: extractMetaTag(html, 'og:site_name'),
    };

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('[Link Preview] Error:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 502 });
  }
}

// Helper functions to extract metadata from HTML

/**
 * Extract the content attribute from a <meta> tag that has a matching
 * property or name attribute. Handles any attribute order.
 */
function extractMetaContent(
  html: string,
  attrName: 'property' | 'name',
  attrValue: string
): string | undefined {
  // Match ALL self-closing <meta ... > tags containing the target attribute, return the last one
  const escapedValue = attrValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tagPattern = new RegExp(
    `<meta\\b[^>]*?\\b${attrName}=["']${escapedValue}["'][^>]*?>`,
    'gi'
  );
  const matches = Array.from(html.matchAll(tagPattern));
  if (matches.length === 0) return undefined;
  const lastTag = matches[matches.length - 1][0];
  const contentMatch = lastTag.match(/\bcontent=["']([^"']*)["']/i);
  return contentMatch ? contentMatch[1] : undefined;
}

function extractMetaTag(html: string, property: string): string | undefined {
  const hasPrefix = property.includes(':');

  if (!hasPrefix) {
    return (
      extractMetaContent(html, 'property', `og:${property}`) ??
      extractMetaContent(html, 'name', `twitter:${property}`) ??
      extractMetaContent(html, 'name', property)
    );
  }

  return (
    extractMetaContent(html, 'property', property) ??
    extractMetaContent(html, 'name', property)
  );
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return match ? match[1].trim() : 'Untitled';
}

function extractIcon(html: string, baseUrl: string): string | undefined {
  // Try to find favicon
  const iconMatch = html.match(
    /<link[^>]+rel=["'](?:icon|shortcut icon)["'][^>]+href=["']([^"']+)["']/i
  );
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
