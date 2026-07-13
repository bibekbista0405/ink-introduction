export interface LegalMetadata {
  title: string;
  description: string;
  lastUpdated: string;
  effectiveDate: string;
  version: string;
  slug: string;
}

export const LEGAL_PAGES: Record<string, LegalMetadata> = {
  terms: {
    title: 'Terms & Conditions',
    description: 'The official terms governing your use of the INK introduction website and preview services.',
    lastUpdated: 'July 2026',
    effectiveDate: 'July 2026',
    version: '1.0',
    slug: 'terms',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Learn how INK values and protects your privacy, with an offline-first and secure-by-design baseline.',
    lastUpdated: 'July 2026',
    effectiveDate: 'July 2026',
    version: '1.0',
    slug: 'privacy',
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'Understand how and why we use cookies on the INK introduction platform.',
    lastUpdated: 'July 2026',
    effectiveDate: 'July 2026',
    version: '1.0',
    slug: 'cookies',
  },
  'community-guidelines': {
    title: 'Community Guidelines',
    description: 'Our core standards for maintaining authentic, kind, and safe communication within INK.',
    lastUpdated: 'July 2026',
    effectiveDate: 'July 2026',
    version: '1.0',
    slug: 'community-guidelines',
  },
  disclaimer: {
    title: 'Legal Disclaimer',
    description: 'Important legal notices regarding information accuracy, external links, and preview features.',
    lastUpdated: 'July 2026',
    effectiveDate: 'July 2026',
    version: '1.0',
    slug: 'disclaimer',
  },
};
