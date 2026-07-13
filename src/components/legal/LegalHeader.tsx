import { motion } from 'motion/react';
import { LegalMetadata } from '../../lib/legal/metadata';
import { Breadcrumb } from './Breadcrumb';
import { CopyLinkButton } from './CopyLinkButton';
import { Calendar, Layers, ShieldAlert } from 'lucide-react';

interface LegalHeaderProps {
  metadata: LegalMetadata;
  readingTime: number;
}

export function LegalHeader({ metadata, readingTime }: LegalHeaderProps) {
  return (
    <header className="border-b border-primary/10 pb-8 mb-10">
      {/* Breadcrumb path */}
      <Breadcrumb currentPageTitle={metadata.title} />

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          {/* Animated decorative tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary mb-4"
          >
            <ShieldAlert className="w-3 h-3" />
            <span>Official Legal Statement</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4"
          >
            {metadata.title}
          </motion.h1>

          {/* Metadata badges row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold text-foreground/50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary/60" />
              <span>Effective: {metadata.effectiveDate}</span>
            </div>
            <div className="hidden sm:block text-foreground/20">•</div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-secondary/60" />
              <span>Last Updated: {metadata.lastUpdated}</span>
            </div>
            <div className="hidden sm:block text-foreground/20">•</div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-accent/60" />
              <span>Version {metadata.version}</span>
            </div>
            <div className="hidden sm:block text-foreground/20">•</div>
            <div className="bg-primary/5 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
              {readingTime} min read
            </div>
          </div>
        </div>

        {/* Copy / Print Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-3 shrink-0 self-start md:self-end"
        >
          <CopyLinkButton />
        </motion.div>
      </div>
    </header>
  );
}
