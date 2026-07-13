import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function ProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start progress on location change
    setIsVisible(true);
    setProgress(15);

    // Initial rapid climb
    const climbTimer = setTimeout(() => {
      setProgress(45);
    }, 100);

    // Slower mid-climb
    const midTimer = setTimeout(() => {
      setProgress(75);
    }, 300);

    // Final stretch and fade out
    const completeTimer = setTimeout(() => {
      setProgress(100);
      // Wait for the width animation to finish before hiding
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 400);
      return () => clearTimeout(hideTimer);
    }, 600);

    return () => {
      clearTimeout(climbTimer);
      clearTimeout(midTimer);
      clearTimeout(completeTimer);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-0 left-0 right-0 h-[4px] z-[9999] pointer-events-none overflow-visible">
          {/* Base bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent relative"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            exit={{ opacity: 0 }}
            transition={{
              width: { type: 'spring', stiffness: 80, damping: 15 },
              opacity: { duration: 0.25, ease: 'easeOut' }
            }}
          >
            {/* Ink drop glow element at the tip */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/80 blur-[6px] shadow-[0_0_12px_#FF8BA7]"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            {/* Intense light bead right at the leading edge */}
            <div className="absolute right-0 top-0 h-full w-[8px] bg-white rounded-r-full shadow-[0_0_8px_#fff]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
