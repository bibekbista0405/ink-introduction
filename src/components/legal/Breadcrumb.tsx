import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface BreadcrumbProps {
  currentPageTitle: string;
}

export function Breadcrumb({ currentPageTitle }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-foreground/50 mb-6 select-none">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1 group">
        <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-foreground/40 font-medium">Legal</span>
      <ChevronRight className="w-3.5 h-3.5" />
      <motion.span 
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-primary truncate max-w-[180px] sm:max-w-none"
      >
        {currentPageTitle}
      </motion.span>
    </nav>
  );
}
