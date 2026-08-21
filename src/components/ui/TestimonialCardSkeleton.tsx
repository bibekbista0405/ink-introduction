import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Skeleton } from './Skeleton';

interface TestimonialCardSkeletonProps {
  isActive?: boolean;
  delay?: number;
}

export function TestimonialCardSkeleton({ isActive = false, delay = 0 }: TestimonialCardSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-[2rem] md:rounded-[2.5rem] border overflow-hidden relative backdrop-blur-md flex flex-col justify-between transition-all duration-500",
        isActive
          ? "row-span-2 md:col-span-2 bg-white/10 border-white/20 h-[516px] md:h-[516px] p-8 md:p-12"
          : "row-span-1 md:col-span-1 bg-white/5 border-white/10 h-[250px] p-6 md:p-8"
      )}
    >
      {/* Background soft pulse for testimonials (which are placed over a dark background) */}
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-5 pointer-events-none",
          isActive ? "from-primary/20 to-secondary/20 opacity-10" : "from-white/5 to-transparent"
        )}
        animate={{
          opacity: isActive ? [0.08, 0.15, 0.08] : [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {isActive ? (
        /* ACTIVE TESTIMONIAL SKELETON STATE */
        <div className="relative z-10 flex flex-col h-full w-full justify-between">
          <div>
            {/* Top row: Star ratings skeleton */}
            <div className="flex gap-2 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton 
                  key={i} 
                  className="w-5 h-5 rounded-full bg-white/10 border-white/5" 
                />
              ))}
            </div>

            {/* Glowing quote content text placeholder */}
            <div className="flex flex-col gap-3.5 mb-8">
              <Skeleton className="h-8 w-11/12 bg-white/10" />
              <Skeleton className="h-8 w-full bg-white/10" />
              <Skeleton className="h-8 w-4/5 bg-white/10" />
            </div>
          </div>

          {/* User info footer: Avatar + Title & Handle */}
          <div className="flex items-center gap-5 mt-auto">
            {/* Pulsing Avatar */}
            <div className="relative">
              <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/10 bg-white/10" />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/25 blur-sm"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Name/handle block */}
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-36 bg-white/10" />
              <Skeleton className="h-4 w-24 bg-white/5" />
            </div>
          </div>
        </div>
      ) : (
        /* INACTIVE TESTIMONIAL SKELETON STATE */
        <div className="relative z-10 flex flex-col h-full w-full justify-between">
          <div className="flex justify-between items-start mb-6">
            {/* Small Avatar bubble */}
            <Skeleton className="w-12 h-12 rounded-full border border-white/10 bg-white/10" />
            
            {/* Shortcut badge icon */}
            <Skeleton className="w-8 h-8 rounded-full bg-white/5" />
          </div>

          {/* Content lines */}
          <div className="flex flex-col gap-2 mb-auto">
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-11/12 bg-white/5" />
            <Skeleton className="h-4 w-4/5 bg-white/5" />
          </div>

          {/* Minimal name placeholder */}
          <Skeleton className="h-4 w-28 bg-white/10 mt-4" />
        </div>
      )}
    </motion.div>
  );
}
