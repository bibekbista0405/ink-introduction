import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

// Full registry of premium SEO content per route for the luxury INK experience
const SEO_REGISTRY: Record<string, { title: string; description: string; keywords: string; ogImage: string }> = {
  '/': {
    title: 'INK | Premium Dynamic Digital Identity & Invisible Platform',
    description: 'Experience the invisible digital identity platform of tomorrow. Redefine digital aesthetics with fluid motion, custom layouts, secure Giphy API, and absolute client-side privacy.',
    keywords: 'digital identity, fluid animations, premium web design, interactive canvas, secure privacy, minimalist branding',
    ogImage: '/assets/og-home.jpg',
  },
  '/about': {
    title: 'About INK | Fluid Motion & Digital Aesthetic Minimalist Design',
    description: 'Learn about the philosophy behind INK—redefining digital identity aesthetics with hand-crafted fluid animations, luxury layouts, and user-centric kinetic motion.',
    keywords: 'motion philosophy, minimalist aesthetic, design principles, canvas dynamics, web motion design',
    ogImage: '/assets/og-about.jpg',
  },
  '/features': {
    title: 'Features | Cutting-Edge Dynamic Interactive Capabilities - INK',
    description: 'Explore the advanced interactive features of INK: modular performance tracking, secure Giphy key integration, live workspace metrics, and immersive scroll milestones.',
    keywords: 'interactive features, performance monitoring, API security, custom Giphy, scroll milestones',
    ogImage: '/assets/og-features.jpg',
  },
  '/premium': {
    title: 'Go Premium | Elevate Your Digital Workspace & Experiences - INK',
    description: 'Unleash the full potential of your digital identity. Upgrade to INK Premium for unlimited custom layouts, high-fidelity processing, bespoke motion themes, and priority support.',
    keywords: 'premium upgrade, custom workspace, high-fidelity themes, luxury digital identity',
    ogImage: '/assets/og-premium.jpg',
  },
  '/faq': {
    title: 'FAQ | Frequently Asked Questions & Support Hub - INK',
    description: 'Find clear answers to common questions about the INK platform, custom Giphy key configurations, local storage encryption, and technical performance specifications.',
    keywords: 'support hub, common questions, local storage, API configuration, canvas help',
    ogImage: '/assets/og-faq.jpg',
  },
  '/terms': {
    title: 'Terms of Service | Legal, Licensing & Fair Use - INK',
    description: 'Read the terms of service, software license agreements, and standard usage rules regarding the interactive INK digital experience.',
    keywords: 'terms of service, legal agreement, licensing, fair use',
    ogImage: '/assets/og-legal.jpg',
  },
  '/privacy': {
    title: 'Privacy Policy | Zero-Track Absolute Data Privacy - INK',
    description: 'Your privacy is our standard. Read how INK ensures complete client-side security and data confidentiality with absolute zero-tracking systems.',
    keywords: 'privacy policy, zero tracking, secure data, client-side encryption',
    ogImage: '/assets/og-legal.jpg',
  },
  '/cookies': {
    title: 'Cookie Policy | Transparent Storage & Analytics - INK',
    description: 'Learn about how we utilize browser cookies and secure local storage to safely persist your dashboard preferences and interactive canvas states.',
    keywords: 'cookie policy, local storage, preferences persistence, analytics tracking',
    ogImage: '/assets/og-legal.jpg',
  },
  '/community-guidelines': {
    title: 'Community Guidelines | Respectful Spaces & Core Standards - INK',
    description: 'Our core standards and guidelines for interactive sharing, respectful digital collaboration, and community safety guidelines on INK.',
    keywords: 'community guidelines, core standards, respectful spaces, collaboration rules',
    ogImage: '/assets/og-legal.jpg',
  },
  '/disclaimer': {
    title: 'Legal Disclaimer | General Legal Terms & Limits - INK',
    description: 'Read the general legal limitations, informational disclaimers, and warranty boundaries of the INK interactive digital experience.',
    keywords: 'legal disclaimer, warranty limits, information disclosure',
    ogImage: '/assets/og-legal.jpg',
  },
};

const DEFAULT_SEO = {
  title: 'INK | Premium Dynamic Digital Experiences',
  description: 'Welcome to INK—redefining digital aesthetics with fluid, high-fidelity motion, dynamic key integrations, and luxury minimalist layouts.',
  keywords: 'digital experiences, design aesthetics, creative frontend, fluid physics, elegant web',
  ogImage: '/assets/og-default.jpg',
};

export function SEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonicalUrl,
}: SEOProps) {
  const location = useLocation();
  const path = location.pathname;

  // Resolve matching metadata from registry or defaults
  const matchedSEO = SEO_REGISTRY[path] || DEFAULT_SEO;

  const finalTitle = title || matchedSEO.title;
  const finalDescription = description || matchedSEO.description;
  const finalKeywords = keywords || matchedSEO.keywords;
  const finalOgImage = ogImage || matchedSEO.ogImage;

  // Dynamically resolve base URL for social shares and canonical links
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const baseUrl = import.meta.env.VITE_APP_URL || origin || 'https://ink.digital';
  const finalCanonicalUrl = canonicalUrl || `${baseUrl}${path}`;
  const absoluteOgImageUrl = finalOgImage.startsWith('http') ? finalOgImage : `${baseUrl}${finalOgImage}`;

  // Log elegant SEO updates for transparency during preview
  useEffect(() => {
    console.log(`[SEO Engine] Inscribing metadata for ${path} -> Title: "${finalTitle}"`);
  }, [path, finalTitle]);

  // Generate JSON-LD Schema Markup depending on route for ultimate search ranking impact
  const getSchemaMarkup = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "INK",
      "url": baseUrl,
      "description": finalDescription,
    };

    if (path === '/') {
      return {
        ...baseSchema,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
    }

    if (path === '/faq') {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is INK truly anonymous?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, absolutely. We do not track IP addresses, require logins to send feedback, or collect location details. The system is designed to be technically untraceable so senders can speak their raw minds."
            }
          },
          {
            "@type": "Question",
            "name": "How does INK filter out spam and hate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We have built-in real-time content safety filters. Profanity, cyberbullying, and harassment are blocked automatically. Repeated bad actors are permanently IP banned."
            }
          },
          {
            "@type": "Question",
            "name": "Can anyone hack or pay to see sender names?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Security and absolute privacy is our core promise. It is mathematically and architecturally impossible to trace sender profiles. Senders remain 100% unseen."
            }
          },
          {
            "@type": "Question",
            "name": "Can I share anonymous cards on Instagram?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Any message you receive can be formatted into a gorgeous, highly styled custom graphic card and shared directly to your Instagram, Snapchat, or TikTok stories with a single tap."
            }
          },
          {
            "@type": "Question",
            "name": "How does Premium billing work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "INK remains 100% free for core features. Premium is optional at $4.99/month and unlocks gorgeous animated profile skins, visitor traffic analytics, early access to new games, and VIP badges."
            }
          }
        ]
      };
    }

    if (path === '/about') {
      return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About INK",
        "url": `${baseUrl}/about`,
        "description": finalDescription,
        "publisher": {
          "@type": "Organization",
          "name": "INK Team",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/assets/logo.png`
          }
        }
      };
    }

    return baseSchema;
  };

  const schemaJson = JSON.stringify(getSchemaMarkup());

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="INK Team" />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Structured JSON-LD Data for SEO Rich Snippets */}
      <script type="application/ld+json">
        {schemaJson}
      </script>

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={absoluteOgImageUrl} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="INK" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteOgImageUrl} />
      <meta name="twitter:site" content="@INK_experiences" />
      <meta name="twitter:creator" content="@INK_experiences" />
    </Helmet>
  );
}
