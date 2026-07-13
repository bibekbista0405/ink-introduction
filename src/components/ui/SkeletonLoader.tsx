import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SkeletonLoaderProps {
  onComplete: () => void;
}

export function SkeletonLoader({ onComplete }: SkeletonLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing layout...');

  useEffect(() => {
    // Elegant incremental progress simulation matching the premium theme
    const statusSteps = [
      { threshold: 0, text: 'Waking Giphy engine...' },
      { threshold: 25, text: 'Mapping spring dynamics...' },
      { threshold: 50, text: 'Calibrating intersection observers...' },
      { threshold: 75, text: 'Refining canvas dimensions...' },
      { threshold: 92, text: 'Ready!' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 120); // Snappy exit delay
          return 100;
        }
        
        // Accelerated high-speed steps
        const step = prev < 40 ? 15 : prev < 75 ? 10 : prev < 90 ? 8 : 5;
        const nextProgress = prev + step;
        
        // Update helper text based on progress thresholds
        const currentStatus = statusSteps.find(s => nextProgress >= s.threshold);
        if (currentStatus) {
          setStatusText(currentStatus.text);
        }
        
        return nextProgress > 100 ? 100 : nextProgress;
      });
    }, 12);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Shimmer animation settings
  const shimmerVariants = {
    animate: {
      backgroundPosition: ['200% 0%', '-200% 0%'],
      transition: {
        repeat: Infinity,
        duration: 1.8,
        ease: 'linear' as const,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -15,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }}
      className="fixed inset-0 bg-background z-[9999] flex flex-col justify-between p-6 md:p-12 overflow-hidden pointer-events-auto"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-accent/8 blur-[120px] pointer-events-none" />

      {/* Top Bar / Navbar Skeleton */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-black/[0.04] relative overflow-hidden">
            <motion.div 
              variants={shimmerVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
            />
          </div>
          <div className="w-16 h-4 rounded-lg bg-black/[0.04] relative overflow-hidden">
            <motion.div 
              variants={shimmerVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
            />
          </div>
        </div>

        {/* Center menu capsules */}
        <div className="hidden md:flex items-center gap-2 bg-black/[0.02] p-1 rounded-full border border-black/[0.03]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-20 h-7 rounded-full bg-black/[0.04] relative overflow-hidden">
              <motion.div 
                variants={shimmerVariants}
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
              />
            </div>
          ))}
        </div>

        {/* Action Button placeholder */}
        <div className="w-28 h-9 rounded-full bg-black/[0.04] relative overflow-hidden">
          <motion.div 
            variants={shimmerVariants}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
          />
        </div>
      </div>

      {/* Main Hero & Content Skeleton */}
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center my-12">
        {/* Cute tag placeholder */}
        <div className="w-32 h-6 rounded-full bg-black/[0.03] mb-6 relative overflow-hidden">
          <motion.div 
            variants={shimmerVariants}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
          />
        </div>

        {/* Title Blocks */}
        <div className="w-full max-w-2xl space-y-4 mb-6">
          <div className="w-full h-12 md:h-16 rounded-2xl bg-black/[0.04] relative overflow-hidden">
            <motion.div 
              variants={shimmerVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
            />
          </div>
          <div className="w-[80%] mx-auto h-12 md:h-16 rounded-2xl bg-black/[0.04] relative overflow-hidden">
            <motion.div 
              variants={shimmerVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
            />
          </div>
        </div>

        {/* Description lines */}
        <div className="w-full max-w-xl space-y-2.5 mb-10">
          <div className="w-full h-4 rounded-md bg-black/[0.03] relative overflow-hidden">
            <motion.div 
              variants={shimmerVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
            />
          </div>
          <div className="w-[90%] mx-auto h-4 rounded-md bg-black/[0.03] relative overflow-hidden">
            <motion.div 
              variants={shimmerVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
            />
          </div>
        </div>

        {/* Big visual canvas block skeleton */}
        <div className="w-full max-w-lg aspect-[21/9] bg-black/[0.02] border border-black/[0.03] rounded-3xl p-4 flex items-center justify-between mb-8 relative overflow-hidden">
          <motion.div 
            variants={shimmerVariants}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.02] to-transparent w-[300%]"
          />
          <div className="w-12 h-12 rounded-xl bg-black/[0.04]" />
          <div className="w-[50%] h-8 rounded-lg bg-black/[0.03]" />
          <div className="w-12 h-12 rounded-xl bg-black/[0.04]" />
        </div>

        {/* Buttons placeholders */}
        <div className="flex items-center gap-4">
          <div className="w-40 h-12 rounded-full bg-black/[0.04] relative overflow-hidden">
            <motion.div 
              variants={shimmerVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
            />
          </div>
          <div className="w-32 h-12 rounded-full bg-black/[0.02] border border-black/[0.04] relative overflow-hidden">
            <motion.div 
              variants={shimmerVariants}
              animate="animate"
              className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent w-[300%]"
            />
          </div>
        </div>
      </div>

      {/* Progress & Status Bar Footer */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-2 relative z-10">
        <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-wider uppercase text-foreground/40">
          <span>{statusText}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-1 bg-black/[0.03] rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
