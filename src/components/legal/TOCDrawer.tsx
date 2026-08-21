import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X } from 'lucide-react';
import { TocItem } from '../../lib/legal/toc';
import { cn } from '../../lib/utils';

interface TOCDrawerProps {
  toc: TocItem[];
}

export function TOCDrawer({ toc }: TOCDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setIsOpen(false);
      setTimeout(() => {
        const offset = 120;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 300); // Wait for sheet close animation
    }
  };

  if (toc.length === 0) return null;

  return (
    <>
      {/* Floating Trigger Button (visible only on mobile) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{
            scale: 1.05,
            filter: "brightness(1.15) contrast(1.05)",
            boxShadow: "0px 8px 24px rgba(255, 139, 167, 0.45)",
          }}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-xl ring-4 ring-white/50 cursor-none"
        >
          <BookOpen className="w-4 h-4" />
          <span>Chapters</span>
        </motion.button>
      </div>

      {/* Backdrop & Drawer Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            {/* Bottom Drawer Sheet */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.85 }}
              onDragEnd={(event, info) => {
                if (info.offset.y > 110 || info.velocity.y > 350) {
                  setIsOpen(false);
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-[2.5rem] border-t border-primary/10 shadow-2xl z-50 md:hidden overflow-y-auto px-6 pt-5 pb-10 cursor-grab active:cursor-grabbing touch-none select-none"
            >
              {/* Notch line with subtle pulse indication */}
              <div className="w-16 h-1.5 bg-foreground/15 rounded-full mx-auto mb-6 pointer-events-none" />

              <div className="flex items-center justify-between mb-6 pointer-events-none">
                <div className="flex flex-col">
                  <h3 className="text-lg font-black text-foreground">Document Outline</h3>
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Swipe down to close</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-dark/5 text-foreground/60 transition-colors cursor-none pointer-events-auto"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-4 pointer-events-auto">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={cn(
                      "block text-base font-semibold py-2.5 px-4 rounded-2xl hover:bg-primary/5 transition-all cursor-none",
                      item.level === 1 ? "text-foreground font-black bg-foreground/3" : "text-foreground/70 pl-8",
                      item.level === 3 ? "pl-12 text-sm text-foreground/50" : ""
                    )}
                  >
                    {item.text}
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
