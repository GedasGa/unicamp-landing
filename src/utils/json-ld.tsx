import type { IPostItem } from 'src/types/blog';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

/**
 * schema.org structured data, so search engines can tell this Unicamp (the Lithuanian
 * IT academy) apart from the Brazilian university and understand what each page offers.
 */

type Schema = Record<string, unknown>;

const absoluteUrl = (path: string) => new URL(path, CONFIG.siteUrl).href;

const ORGANIZATION_ID = absoluteUrl('/#organization');
const WEBSITE_ID = absoluteUrl('/#website');

/** Renders schema objects as a JSON-LD script tag. */
export function JsonLd({ data }: { data: Schema | Schema[] }) {
  // Escape '<' so text inside the data can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  // eslint-disable-next-line react/no-danger -- serialized JSON with "<" escaped above.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

// ----------------------------------------------------------------------

export function organizationSchema(): Schema[] {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      '@id': ORGANIZATION_ID,
      name: 'Unicamp',
      alternateName: ['Unicamp IT akademija', 'Unicamp IT Academy'],
      legalName: 'UAB Unicamp',
      url: absoluteUrl('/'),
      logo: absoluteUrl('/logo/logo-single.png'),
      description:
        'Lietuvos IT akademija: praktiniai Frontend programavimo ir UX/UI dizaino kursai su mentoriais.',
      areaServed: { '@type': 'Country', name: 'Lithuania' },
      sameAs: [
        'https://www.linkedin.com/company/105553068',
        'https://www.facebook.com/profile.php?id=61568514785007',
        'https://www.instagram.com/unicamplt',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      // Google reads the site name shown in results from here.
      name: 'Unicamp IT akademija',
      alternateName: 'Unicamp',
      url: absoluteUrl('/'),
      inLanguage: 'lt-LT',
      publisher: { '@id': ORGANIZATION_ID },
    },
  ];
}

// ----------------------------------------------------------------------

type CourseProps = {
  name: string;
  description: string;
  path: string;
  /** Price in euros for the one-off payment. */
  price: number;
  /** Teaching hours in the whole programme. */
  hours: number;
  skills: string[];
};

export function courseSchema({ name, description, path, price, hours, skills }: CourseProps) {
  const url = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url,
    inLanguage: 'lt',
    provider: { '@id': ORGANIZATION_ID },
    teaches: skills,
    educationalCredentialAwarded: 'Unicamp sertifikatas',
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      price,
      priceCurrency: 'EUR',
      url,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: `PT${hours}H`,
    },
  };
}

// ----------------------------------------------------------------------

export function blogPostingSchema(post: IPostItem) {
  const url = absoluteUrl(paths.blog.details(post.slug));

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    url,
    mainEntityOfPage: url,
    image: absoluteUrl(post.coverUrl),
    datePublished: post.createdAt ? new Date(post.createdAt).toISOString() : undefined,
    inLanguage: 'lt',
    keywords: post.metaKeywords.join(', ') || undefined,
    author: { '@type': 'Person', name: post.author.name },
    publisher: { '@id': ORGANIZATION_ID },
  };
}

// ----------------------------------------------------------------------

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
