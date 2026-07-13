import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, HelpCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LegalMetadata } from '../../lib/legal/metadata';
import { ReadingProgress } from './ReadingProgress';
import { LegalHeader } from './LegalHeader';
import { TableOfContents } from './TableOfContents';
import { TOCDrawer } from './TOCDrawer';
import { LegalNavigation } from './LegalNavigation';
import { generateToc } from '../../lib/legal/toc';
import { calculateReadingTime } from '../../lib/legal/reading-time';

interface LegalLayoutProps {
  metadata: LegalMetadata;
  markdown: string;
  children: React.ReactNode;
}

export function LegalLayout({ metadata, markdown, children }: LegalLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const toc = generateToc(markdown);
  const readingTime = calculateReadingTime(markdown);

  // Filter TOC or highlight matches in document if user searches
  const filteredToc = searchQuery
    ? toc.filter((item) => item.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : toc;

  return (
    <div className="min-h-screen bg-transparent relative pt-8 pb-16">
      {/* 1. Sticky/glowing reading progress bar */}
      <ReadingProgress />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Sticky back/navigation panel */}
        <div className="sticky top-28 z-30 mb-8 pointer-events-none flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-primary/20 shadow-sm hover:shadow-md text-sm font-extrabold text-foreground hover:text-primary transition-all cursor-none"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>

        {/* 2. Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
          
          {/* Main content slot (span 3 on lg screens) */}
          <main className="lg:col-span-3 bg-white/40 backdrop-blur-xl border border-[#FF8BA7]/10 p-6 sm:p-10 md:p-14 rounded-[2.5rem] shadow-xl shadow-primary/2">
            
            {/* Header section */}
            <LegalHeader metadata={metadata} readingTime={readingTime} />

            {/* Document Content */}
            <div className="prose prose-pink max-w-[760px] mx-auto text-foreground/80 leading-relaxed font-medium">
              <AnimatePresence mode="wait">
                <motion.div
                  key={metadata.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Pagination navigation */}
            <LegalNavigation currentSlug={metadata.slug} />
          </main>

          {/* Right Sidebar - Sticky Table of Contents (visible on desktop) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-36 space-y-8">
            
            {/* Dynamic Search Box */}
            <div className="p-5 rounded-3xl bg-white/55 border border-primary/10 shadow-sm">
              <label htmlFor="legal-search" className="text-xs font-black uppercase text-foreground/40 tracking-wider block mb-2">
                Quick Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                <input
                  id="legal-search"
                  type="text"
                  placeholder="Find section..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white/80 border border-primary/15 text-xs font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-none"
                />
              </div>
            </div>

            {/* TOC Panel */}
            <div className="p-6 rounded-3xl bg-white/55 border border-primary/10 shadow-sm max-h-[60vh] overflow-y-auto">
              <TableOfContents toc={filteredToc} />
              {filteredToc.length === 0 && (
                <div className="text-center py-4 text-xs text-foreground/40 font-bold flex flex-col items-center gap-1.5">
                  <HelpCircle className="w-5 h-5 text-primary/40" />
                  <span>No sections found matching "{searchQuery}"</span>
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10 flex gap-3 text-xs font-semibold text-primary/80">
              <AlertCircle className="w-5 h-5 shrink-0 text-primary" />
              <p>These legal pages apply specifically to this introductory website and are managed under version 1.0.</p>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating chapters drawer button for mobile */}
      <TOCDrawer toc={toc} />
    </div>
  );
}
