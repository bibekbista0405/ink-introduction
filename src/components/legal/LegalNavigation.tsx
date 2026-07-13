import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LEGAL_PAGES, LegalMetadata } from '../../lib/legal/metadata';
import { motion } from 'motion/react';

interface LegalNavigationProps {
  currentSlug: string;
}

const SLUGS_ORDER = ['terms', 'privacy', 'cookies', 'community-guidelines', 'disclaimer'];

export function LegalNavigation({ currentSlug }: LegalNavigationProps) {
  const currentIndex = SLUGS_ORDER.indexOf(currentSlug);
  
  const prevSlug = currentIndex > 0 ? SLUGS_ORDER[currentIndex - 1] : null;
  const nextSlug = currentIndex < SLUGS_ORDER.length - 1 ? SLUGS_ORDER[currentIndex + 1] : null;

  const prevMeta: LegalMetadata | null = prevSlug ? LEGAL_PAGES[prevSlug] : null;
  const nextMeta: LegalMetadata | null = nextSlug ? LEGAL_PAGES[nextSlug] : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-primary/10 pt-10 mt-16">
      {/* Previous Link */}
      {prevMeta ? (
        <motion.div whileHover={{ y: -3 }} className="w-full">
          <Link
            to={`/${prevMeta.slug}`}
            className="flex flex-col items-start gap-1 p-5 rounded-2xl bg-white/55 border border-[#FF8BA7]/10 hover:border-[#FF8BA7]/30 shadow-sm hover:shadow-md transition-all h-full cursor-none"
          >
            <div className="flex items-center gap-1 text-xs font-black uppercase text-primary tracking-widest">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Chapter</span>
            </div>
            <span className="text-base font-extrabold text-foreground mt-1">
              {prevMeta.title}
            </span>
            <p className="text-xs text-foreground/50 font-medium line-clamp-1 mt-0.5">
              {prevMeta.description}
            </p>
          </Link>
        </motion.div>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* Next Link */}
      {nextMeta ? (
        <motion.div whileHover={{ y: -3 }} className="w-full">
          <Link
            to={`/${nextMeta.slug}`}
            className="flex flex-col items-end text-right gap-1 p-5 rounded-2xl bg-white/55 border border-[#FF8BA7]/10 hover:border-[#FF8BA7]/30 shadow-sm hover:shadow-md transition-all h-full cursor-none"
          >
            <div className="flex items-center gap-1 text-xs font-black uppercase text-secondary tracking-widest">
              <span>Next Chapter</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
            <span className="text-base font-extrabold text-foreground mt-1">
              {nextMeta.title}
            </span>
            <p className="text-xs text-foreground/50 font-medium line-clamp-1 mt-0.5">
              {nextMeta.description}
            </p>
          </Link>
        </motion.div>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}
