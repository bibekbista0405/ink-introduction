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

// Full registry of premium SEO content per route for the INK experience.
// Copy rewritten to target actual search intent for an anonymous messaging
// product (what people type into Google), rather than describing this
// site's own implementation details — the previous copy leaned heavily on
// phrases like "fluid animations" and "secure Giphy API integration",
// which nobody searches for when looking for an anonymous messaging app.
const SEO_REGISTRY: Record<string, { title: string; description: string; keywords: string; ogImage: string }> = {
  '/': {
    title: 'INK | Send & Receive Anonymous Messages Online',
    description: 'Get honest anonymous messages from friends and followers. Create your free INK link, share it on Instagram, Snapchat or TikTok, and start receiving anonymous feedback, questions, and messages today.',
    keywords: 'anonymous messages, send anonymous message, anonymous messaging app, anonymous feedback, anonymous Q&A, NGL alternative, anonymous Instagram messages, honest anonymous questions, anonymous link for Instagram story',
    ogImage: '/assets/og-home.jpg',
  },
  '/about': {
    title: 'About INK | The Story Behind Anonymous Messaging Done Right',
    description: 'Learn why INK was built: a genuinely private, ad-free way to send and receive anonymous messages, questions, and honest feedback online.',
    keywords: 'about INK, anonymous messaging app story, private feedback platform, honest anonymous questions app',
    ogImage: '/assets/og-about.jpg',
  },
  '/features': {
    title: 'Features | Anonymous Messages, Q&A & Shareable Reply Cards - INK',
    description: 'See everything INK offers: unlimited anonymous messages, spam and hate filtering, custom shareable reply cards for Instagram and TikTok, and a fully private inbox.',
    keywords: 'anonymous message features, anonymous Q&A tool, shareable message cards, anonymous inbox, spam filtering anonymous messages',
    ogImage: '/assets/og-features.jpg',
  },
  '/premium': {
    title: 'INK Premium | Unlock Profile Skins & Message Analytics',
    description: 'Upgrade your anonymous messaging inbox with INK Premium: animated profile skins, visitor analytics, early access to new games, and VIP badges — starting at $4.99/month.',
    keywords: 'INK premium, anonymous messaging upgrade, profile skins, message analytics, VIP badge anonymous app',
    ogImage: '/assets/og-premium.jpg',
  },
  '/faq': {
    title: 'FAQ | Anonymous Messaging Questions Answered - INK',
    description: 'Is INK really anonymous? Can senders be traced? Get clear answers to the most common questions about anonymous messages, privacy, spam filtering, and billing.',
    keywords: 'is INK anonymous, how does anonymous messaging work, can anonymous senders be traced, anonymous message FAQ, anonymous messaging privacy questions',
    ogImage: '/assets/og-faq.jpg',
  },
  '/safety': {
    title: 'Safety | How INK Keeps Anonymous Messaging Respectful',
    description: 'Learn how INK filters out hate, harassment, and spam automatically to keep anonymous messaging a safe, respectful space for everyone.',
    keywords: 'anonymous messaging safety, block harassment anonymous app, report anonymous message, safe anonymous feedback',
    ogImage: '/assets/og-legal.jpg',
  },
  '/contact': {
    title: 'Contact INK | Get Support',
    description: 'Have a question about your INK inbox, billing, or account? Reach out to our support team.',
    keywords: 'contact INK support, anonymous messaging app help, INK customer support',
    ogImage: '/assets/og-legal.jpg',
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
    keywords: 'privacy policy, zero tracking, secure data, client-side encryption, anonymous messaging privacy',
    ogImage: '/assets/og-legal.jpg',
  },
  '/cookies': {
    title: 'Cookie Policy | Transparent Storage & Analytics - INK',
    description: 'Learn about how we utilize browser cookies and secure local storage to safely persist your dashboard preferences and interactive canvas states.',
    keywords: 'cookie policy, local storage, preferences persistence, analytics tracking',
    ogImage: '/assets/og-legal.jpg',
  },
  '/community-guidelines': {
    title: 'Community Guidelines | Respectful Anonymous Messaging - INK',
    description: 'Our core standards for respectful, honest anonymous messaging — what is and isn\'t allowed, and how we keep the community safe.',
    keywords: 'community guidelines, anonymous messaging rules, respectful anonymous feedback, core standards',
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
  title: 'INK | Send & Receive Anonymous Messages Online',
  description: 'INK is a free, private way to send and receive anonymous messages, questions, and honest feedback — with a fully filtered, safe inbox.',
  keywords: 'anonymous messages, anonymous messaging app, anonymous feedback, anonymous Q&A, honest anonymous questions',
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
          },
          {
            "@type": "Question",
            "name": "Do I need to download an app to use INK?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No download required. INK runs entirely in your mobile or desktop browser. Just create your link once and share it anywhere."
            }
          },
          {
            "@type": "Question",
            "name": "Can I delete a message someone sent me?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every message in your inbox has a delete option. Deleting a message removes it permanently from our servers."
            }
          },
          {
            "@type": "Question",
            "name": "Can senders see if I've read their message?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Because senders never create an account or stay connected to a session, there's no read-receipt or online-status system at all."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a limit to how many anonymous messages I can receive?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "None. Your inbox has no cap on the free plan, no matter how many messages you get."
            }
          },
          {
            "@type": "Question",
            "name": "Can I get anonymous messages removed or reported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every message has a report option that flags it for review and immediately hides it from your inbox. Repeat offenders are permanently banned."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use INK for anonymous Q&A instead of just messages?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Definitely. Many people use their INK link for anonymous Q&A sessions on their story, the same way they'd collect anonymous feedback."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use INK on multiple social platforms at once?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Your INK link works everywhere — Instagram, Snapchat, TikTok, X, or your bio anywhere — with one shareable link and one inbox."
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
