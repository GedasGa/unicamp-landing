// =============================================
// Link Preview Client for Smart Cards
// =============================================

import type { JsonLd } from '@atlaskit/json-ld-types';

import { CardClient } from '@atlaskit/link-provider';

type SupportedProviders = 'YouTube' | 'CodeSandbox' | 'JSitor' | 'Figma';

type ProvidersImages = {
  [key in SupportedProviders]: string;
};

const ICONS: ProvidersImages = {
  YouTube: 'https://www.youtube.com/s/desktop/ce262d3b/img/favicon_32x32.png',
  CodeSandbox: 'https://codesandbox.io/csb-ios.svg',
  JSitor: 'https://jsitor.com/jsitor-logo.svg',
  Figma: 'https://static.figma.com/app/icon/1/touch-76.png',
};

const IMAGES: ProvidersImages = {
  YouTube: 'https://www.youtube.com/s/desktop/ce262d3b/img/favicon_32x32.png',
  CodeSandbox: 'https://codesandbox.io/csb-ios.svg',
  JSitor: 'https://jsitor.com/jsitor-logo.svg',
  Figma: 'https://static.figma.com/app/icon/1/touch-76.png',
};

// Helper function to fetch link metadata
async function fetchLinkMetadata(url: string): Promise<{
  title: string;
  description?: string;
  image?: string;
  icon?: string;
}> {
  try {
    const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch link metadata');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching link metadata:', error);
    // Fallback to basic metadata
    return {
      title: new URL(url).hostname,
    };
  }
}

// Setup custom client which handles YouTube and other embed providers
export class LinkPreviewClient extends CardClient {
  private static getProvider(url: string): SupportedProviders | undefined {
    if (url.match(/youtu.be|youtube.com/)) {
      return 'YouTube';
    }
    if (url.match(/codesandbox.io/)) {
      return 'CodeSandbox';
    }
    if (url.match(/jsitor.com/)) {
      return 'JSitor';
    }
    if (url.match(/figma.com/)) {
      return 'Figma';
    }
    return undefined;
  }

  private static extractYouTubeVideoId(url: string): string | null {
    // Handle various YouTube URL formats:
    // - https://www.youtube.com/watch?v=VIDEO_ID
    // - https://www.youtube.com/watch?v=VIDEO_ID&other=params
    // - https://youtu.be/VIDEO_ID
    // - https://www.youtube.com/embed/VIDEO_ID
    
    // Try watch URL format first
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch && watchMatch[1]) {
      return watchMatch[1];
    }
    
    // Try short URL or embed format
    const shortMatch = url.match(/(?:youtu\.be\/|youtube\.com\/embed\/)([^?&/]+)/);
    if (shortMatch && shortMatch[1]) {
      return shortMatch[1];
    }
    
    return null;
  }

  private static generateEmbedUrl = (provider: SupportedProviders, url: string): string => {
    const urlParts = url.split('/');
    switch (provider) {
      case 'YouTube': {
        const videoId = LinkPreviewClient.extractYouTubeVideoId(url);
        return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : url;
      }
      case 'Figma':
        return `https://www.figma.com/embed?embed_host=share&url=${url}`;
      case 'JSitor':
        return `https://jsitor.com/embed/${urlParts[urlParts.length - 1]}`;
      case 'CodeSandbox':
      default:
        return url;
    }
  };

  private static async generateLinkPreviewResponse(
    provider: SupportedProviders,
    url: string
  ): Promise<JsonLd.Response> {
    const embedUrl = LinkPreviewClient.generateEmbedUrl(provider, url);
    
    // Fetch actual metadata for YouTube to get video title and thumbnail
    if (provider === 'YouTube') {
      try {
        // Convert to watch URL for metadata fetching
        const videoId = LinkPreviewClient.extractYouTubeVideoId(url);
        const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
        const metadata = await fetchLinkMetadata(watchUrl);
        return {
          meta: {
            access: 'granted',
            visibility: 'public',
            auth: [],
            definitionId: 'custom-embed-provider',
            key: 'custom-embed-provider',
          },
          data: {
            '@type': 'Object',
            '@context': {
              '@vocab': 'https://www.w3.org/ns/activitystreams#',
              atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
              schema: 'http://schema.org/',
            },
            url,
            name: metadata.title || provider,
            summary: metadata.description,
            generator: {
              '@type': 'Object',
              name: provider,
              icon: {
                '@type': 'Image',
                url: ICONS[provider],
              },
            },
            icon: {
              '@type': 'Image',
              url: ICONS[provider],
            },
            image: metadata.image ? {
              '@type': 'Image',
              url: metadata.image,
            } : {
              '@type': 'Image',
              url: IMAGES[provider],
            },
            preview: {
              '@type': 'Link',
              href: embedUrl,
              'atlassian:supportedPlatforms': ['web', 'mobile'],
              'atlassian:aspectRatio': 2,
            },
          },
        } as JsonLd.Response;
      } catch (error) {
        console.error('Error fetching YouTube metadata:', error);
        // Fallback to basic response
      }
    }
    
    // Default response for other providers or YouTube fallback
    return {
      meta: {
        access: 'granted',
        visibility: 'public',
        auth: [],
        definitionId: 'custom-embed-provider',
        key: 'custom-embed-provider',
      },
      data: {
        '@type': 'Object',
        '@context': {
          '@vocab': 'https://www.w3.org/ns/activitystreams#',
          atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
          schema: 'http://schema.org/',
        },
        url,
        name: provider,
        generator: {
          '@type': 'Object',
          name: provider,
          icon: {
            '@type': 'Image',
            url: ICONS[provider],
          },
        },
        icon: {
          '@type': 'Image',
          url: ICONS[provider],
        },
        image: {
          '@type': 'Image',
          url: IMAGES[provider],
        },
        preview: {
          '@type': 'Link',
          href: embedUrl,
          'atlassian:supportedPlatforms': ['web', 'mobile'],
          'atlassian:aspectRatio': 2,
        },
      },
    } as JsonLd.Response;
  }

  private static async generateGenericLinkResponse(url: string): Promise<JsonLd.Response> {
    const metadata = await fetchLinkMetadata(url);
    
    return {
      meta: {
        access: 'granted',
        visibility: 'public',
        auth: [],
        definitionId: 'generic-link',
        key: 'generic-link',
      },
      data: {
        '@type': 'Object',
        '@context': {
          '@vocab': 'https://www.w3.org/ns/activitystreams#',
          atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
          schema: 'http://schema.org/',
        },
        url,
        name: metadata.title,
        summary: metadata.description,
        generator: {
          '@type': 'Object',
          name: new URL(url).hostname,
          icon: metadata.icon ? {
            '@type': 'Image',
            url: metadata.icon,
          } : undefined,
        },
        icon: metadata.icon ? {
          '@type': 'Image',
          url: metadata.icon,
        } : undefined,
        image: metadata.image ? {
          '@type': 'Image',
          url: metadata.image,
        } : undefined,
      },
    } as JsonLd.Response;
  }

  async fetchData(url: string): Promise<JsonLd.Response> {
    const provider = LinkPreviewClient.getProvider(url);
    if (provider) {
      return LinkPreviewClient.generateLinkPreviewResponse(provider, url);
    }
    
    // For generic URLs, fetch actual metadata
    try {
      return await LinkPreviewClient.generateGenericLinkResponse(url);
    } catch (error) {
      console.error('Error fetching link preview:', error);
      // Fallback to parent class implementation
      return super.fetchData(url);
    }
  }

  async prefetchData(url: string): Promise<JsonLd.Response | undefined> {
    const provider = LinkPreviewClient.getProvider(url);
    if (provider) {
      return LinkPreviewClient.generateLinkPreviewResponse(provider, url);
    }
    
    // For generic URLs, try to fetch metadata
    try {
      return await LinkPreviewClient.generateGenericLinkResponse(url);
    } catch (error) {
      console.error('Error prefetching link preview:', error);
      // Fallback to parent class implementation
      return super.prefetchData(url);
    }
  }
}
