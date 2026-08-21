import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LifeBuoy } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

export function ContactSupportButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const lenis = (window as any).lenis;
    
    const handleScroll = () => {
      // Show after scrolling past the hero section (approx 90vh)
      if (window.scrollY > window.innerHeight * 0.9) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (lenis) {
      lenis.on('scroll', handleScroll);
      handleScroll();
      return () => {
        lenis.off('scroll', handleScroll);
      };
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <MagneticButton 
            whileTap={{
              scale: 1.05,
              filter: "brightness(1.15) contrast(1.05)",
              boxShadow: "0px 8px 24px rgba(255, 139, 167, 0.45)",
            }}
            onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
            className="flex items-center justify-center bg-dark text-white shadow-2xl rounded-full h-14 overflow-hidden group tracking-wide cursor-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center h-full px-4 gap-0">
              <LifeBuoy className="w-6 h-6 flex-shrink-0" />
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: "auto", opacity: 1, marginLeft: 8 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <span className="font-bold text-sm pr-1">Contact Support</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
