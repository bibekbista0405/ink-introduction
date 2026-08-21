import { useEffect, useState } from 'react';
import { TocItem } from '../../lib/legal/toc';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { AlignLeft } from 'lucide-react';

interface TableOfContentsProps {
  toc: TocItem[];
  className?: string;
}

export function TableOfContents({ toc, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingElements = toc.map((item) => document.getElementById(item.id));
    
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Set the first visible heading as active
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-10% 0px -75% 0px', // Trigger when section is near top
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      headingElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [toc]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky navigation or headers
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      // Use native smooth scroll or window scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-foreground/40 mb-3">
        <AlignLeft className="w-3.5 h-3.5" />
        <span>In This Document</span>
      </div>

      <div className="relative border-l border-foreground/5 py-1 space-y-2">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              className={cn(
                "relative pl-4 transition-all",
                item.level === 2 ? "ml-3" : "",
                item.level === 3 ? "ml-6" : ""
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="tocIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block text-sm font-semibold transition-all cursor-none",
                  isActive
                    ? "text-primary scale-[1.02] origin-left"
                    : "text-foreground/50 hover:text-foreground/80 hover:pl-0.5"
                )}
              >
                {item.text}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
