import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 bg-primary/10 z-[60] origin-left pointer-events-none">
      <motion.div 
        className="h-full bg-gradient-to-r from-primary via-[#FFC6C7] to-secondary shadow-[0_2px_10px_rgba(255,139,167,0.5)]"
        style={{ scaleX }}
      />
    </div>
  );
}
