import { useState } from 'react';
import { Copy, Check, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-3">
      {/* Copy Link Button */}
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#FF8BA7]/20 shadow-sm text-xs font-bold text-foreground/80 hover:bg-white hover:text-primary transition-colors cursor-none"
        title="Copy page link"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex items-center gap-1 text-primary"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Print Button */}
      <motion.button
        onClick={handlePrint}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#FF8BA7]/20 shadow-sm text-xs font-bold text-foreground/80 hover:bg-white hover:text-primary transition-colors cursor-none"
        title="Print document"
      >
        <Printer className="w-3.5 h-3.5" />
        <span>Print</span>
      </motion.button>
    </div>
  );
}
