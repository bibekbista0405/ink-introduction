import ReactMarkdown from 'react-markdown';
import { LEGAL_PAGES } from '../../lib/legal/metadata';
import { LegalLayout } from './LegalLayout';
import { termsMarkdown } from '../../content/legal/terms';
import { privacyMarkdown } from '../../content/legal/privacy';
import { cookiesMarkdown } from '../../content/legal/cookies';
import { communityGuidelinesMarkdown } from '../../content/legal/community-guidelines';
import { disclaimerMarkdown } from '../../content/legal/disclaimer';
import { motion } from 'motion/react';
import { useEffect } from 'react';

// Map slugs to markdown files
const MARKDOWN_MAP: Record<string, string> = {
  terms: termsMarkdown,
  privacy: privacyMarkdown,
  cookies: cookiesMarkdown,
  'community-guidelines': communityGuidelinesMarkdown,
  disclaimer: disclaimerMarkdown,
};

interface LegalPageWrapperProps {
  slug: string;
}

export function LegalPageWrapper({ slug }: LegalPageWrapperProps) {
  const metadata = LEGAL_PAGES[slug];
  const markdown = MARKDOWN_MAP[slug];

  // Scroll to top on navigation/page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!metadata || !markdown) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-center">
        <div>
          <h2 className="text-2xl font-black text-foreground">Document Not Found</h2>
          <p className="text-foreground/50 mt-2 font-medium">The requested legal document could not be located.</p>
        </div>
      </div>
    );
  }

  // Create clean slugs for headers to match table of contents links exactly
  const getHeaderId = (children: any) => {
    if (!children) return '';
    const text = String(children);
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  return (
    <LegalLayout metadata={metadata} markdown={markdown}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => {
            const id = getHeaderId(children);
            return (
              <motion.h2
                id={id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-2xl md:text-3xl font-black text-foreground tracking-tight mt-12 mb-6 scroll-mt-28 flex flex-col gap-1.5"
              >
                <span>{children}</span>
                <span className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </motion.h2>
            );
          },
          h2: ({ children }) => {
            const id = getHeaderId(children);
            return (
              <h3
                id={id}
                className="text-xl md:text-2xl font-black text-foreground/90 tracking-tight mt-10 mb-4 scroll-mt-28"
              >
                {children}
              </h3>
            );
          },
          h3: ({ children }) => {
            const id = getHeaderId(children);
            return (
              <h4
                id={id}
                className="text-lg font-extrabold text-foreground/80 tracking-tight mt-8 mb-3 scroll-mt-28"
              >
                {children}
              </h4>
            );
          },
          p: ({ children }) => (
            <p className="text-base font-semibold leading-relaxed text-foreground/75 mb-6">
              {children}
            </p>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 pl-6 border-l-4 border-primary bg-primary/3 py-4 pr-4 rounded-r-3xl text-foreground/85 font-bold italic shadow-inner shadow-primary/1">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2.5 mb-8 pl-4 font-semibold text-foreground/75">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2.5 mb-8 pl-4 font-semibold text-foreground/75">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="marker:text-primary pl-1">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-black text-foreground/95">
              {children}
            </strong>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 border border-primary/10 rounded-2xl shadow-sm">
              <table className="min-w-full divide-y divide-primary/10 bg-white/40">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#FFF6F7]">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3.5 text-left text-xs font-black uppercase tracking-wider text-primary/80">
              {children}
            </th>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-primary/5">
              {children}
            </tbody>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 text-sm font-semibold text-foreground/85">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover font-bold underline decoration-primary/30 hover:decoration-primary transition-colors cursor-none"
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </LegalLayout>
  );
}
