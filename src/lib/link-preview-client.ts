// =============================================
// Link Preview Client for Smart Cards
// =============================================

import { CardClient } from '@atlaskit/link-provider';
import type { JsonLd } from '@atlaskit/linking-common';

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

  private static generateEmbedUrl = (provider: SupportedProviders, url: string): string => {
    const urlParts = url.split('/');
    switch (provider) {
      case 'YouTube':
        return `https://www.youtube.com/embed/${urlParts[urlParts.length - 1]}?rel=0`;
      case 'Figma':
        return `https://www.figma.com/embed?embed_host=share&url=${url}`;
      case 'JSitor':
        return `https://jsitor.com/embed/${urlParts[urlParts.length - 1]}`;
      case 'CodeSandbox':
      default:
        return url;
    }
  };

  private static generateLinkPreviewResponse(
    provider: SupportedProviders,
    url: string
  ): JsonLd.Response {
    const embedUrl = LinkPreviewClient.generateEmbedUrl(provider, url);
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

  fetchData(url: string): Promise<JsonLd.Response> {
    const provider = LinkPreviewClient.getProvider(url);
    if (provider) {
      return Promise.resolve(LinkPreviewClient.generateLinkPreviewResponse(provider, url));
    }
    // Fallback to parent class implementation for other URLs
    return super.fetchData(url);
  }

  prefetchData(url: string): Promise<JsonLd.Response | undefined> {
    const provider = LinkPreviewClient.getProvider(url);
    if (provider) {
      return Promise.resolve(LinkPreviewClient.generateLinkPreviewResponse(provider, url));
    }
    // Fallback to parent class implementation for other URLs
    return super.prefetchData(url);
  }
}
