import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Skeleton } from './Skeleton';

interface FeatureCardSkeletonProps {
  colSpan?: string;
}

export function FeatureCardSkeleton({ colSpan }: FeatureCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "h-[400px] rounded-[2rem] bg-white/70 border border-primary/10 shadow-sm p-8 md:p-10 flex flex-col justify-between overflow-hidden relative backdrop-blur-md",
        colSpan
      )}
    >
      {/* Background ambient gradient drift */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/2 to-accent/5 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top Section */}
      <div className="flex justify-between items-start mb-12 relative z-10">
        {/* Holographic glowing icon placeholder */}
        <div className="relative group/icon">
          <Skeleton className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-primary/10 to-secondary/15 border border-primary/20" />
          <motion.div
            className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-tr from-primary/20 to-secondary/20 blur-md opacity-50"
            animate={{
              scale: [0.95, 1.1, 0.95],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Arrow shortcut placeholder */}
        <Skeleton className="w-10 h-10 rounded-full bg-primary/5" />
      </div>

      {/* Text Lines with organic shimmer curves */}
      <div className="mt-auto relative z-10 flex flex-col gap-3">
        {/* Title block */}
        <div className="w-2/3 h-8 relative overflow-hidden rounded-lg">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Description lines */}
        <div className="w-full h-4 relative overflow-hidden rounded-md mt-2">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="w-5/6 h-4 relative overflow-hidden rounded-md">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    </motion.div>
  );
}
