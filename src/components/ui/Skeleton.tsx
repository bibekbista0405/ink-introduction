import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  // Parse dimensions or context from classes to decide on rendering the detailed centerpiece or the fluid ribbon
  const isCircle = className?.includes('rounded-full') && !className?.includes('w-full');
  const isLargeBlock = className?.includes('w-16') || className?.includes('h-16') || className?.includes('h-full') || className?.includes('h-16') || className?.includes('h-[400px]') || className?.includes('h-8');
  const isThinBar = !isLargeBlock && !isCircle;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[#FFF6F7] border border-[#FF8BA7]/15 shadow-inner shadow-primary/2 flex items-center justify-center",
        className
      )}
      {...props}
    >
      {/* Subtle organic background gradient pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
      />

      {isThinBar ? (
        /* 1. FLUID RIBBON WAVE: Wavy organic bezier path simulating ink bleed */
        <div className="absolute inset-0 w-full h-full">
          <svg className="w-[300%] h-full absolute inset-y-0 left-0" viewBox="0 0 300 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="ink-bleed-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,139,167,0)" />
                <stop offset="25%" stopColor="rgba(255,139,167,0.06)" />
                <stop offset="50%" stopColor="rgba(195,174,214,0.32)" />
                <stop offset="75%" stopColor="rgba(255,139,167,0.06)" />
                <stop offset="100%" stopColor="rgba(255,139,167,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 20 Q 37.5 10, 75 20 T 150 20 T 225 20 T 300 20 L 300 40 L 0 40 Z"
              fill="url(#ink-bleed-gradient)"
              initial={{ x: "-66.6%" }}
              animate={{ x: "0%" }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "linear",
              }}
              className="opacity-90"
            />
          </svg>
        </div>
      ) : (
        /* 2. BRANDED SVG CENTERPIECE: Elegant blossom & ink droplet motion */
        <div className="relative flex items-center justify-center w-full h-full p-2">
          {/* Shimmer backdrop */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />

          {/* SVG Branded Graphics */}
          <svg 
            className="w-1/2 h-1/2 max-w-[40px] max-h-[40px] text-primary/30" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="blossom-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF8BA7" />
                <stop offset="100%" stopColor="#C3AED6" />
              </linearGradient>
            </defs>

            {/* Rotating glowing flower backing */}
            <motion.path
              d="M12 2.69l.79 1.4a2 2 0 001.65.95l1.6-.08a2 2 0 011.66 1.15l.8 1.4a2 2 0 001.2 1.2l1.4.8a2 2 0 011.15 1.66l-.08 1.6a2 2 0 00.95 1.65l1.4.79a2 2 0 010 3.32l-1.4.79a2 2 0 00-.95 1.65l.08 1.6a2 2 0 01-1.15 1.66l-1.4.8a2 2 0 00-1.2 1.2l-.8 1.4a2 2 0 01-1.66 1.15l-1.6-.08a2 2 0 00-1.65.95l-.79 1.4a2 2 0 01-3.32 0l-.79-1.4a2 2 0 00-1.65-.95l-1.6.08a2 2 0 01-1.66-1.15l-.8-1.4a2 2 0 00-1.2-1.2l-1.4-.8a2 2 0 01-1.15-1.66l.08-1.6a2 2 0 00-.95-1.65l-1.4-.79a2 2 0 010-3.32l1.4-.79a2 2 0 00.95-1.65l-.08-1.6a2 2 0 011.15-1.66l1.4-.8a2 2 0 001.2-1.2l.8-1.4a2 2 0 011.66-1.15l1.6.08a2 2 0 001.65-.95l.79-1.4a2 2 0 013.32 0z"
              stroke="url(#blossom-glow)"
              strokeWidth="1"
              strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="origin-center opacity-65"
            />

            {/* Central elegant fountain pen nib / ink drop silhouette */}
            <motion.path
              d="M12 2C12 2 6 9 6 13a6 6 0 0012 0c0-4-6-11-6-11zm0 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
              fill="url(#blossom-glow)"
              animate={{
                scale: [0.85, 1.05, 0.85],
                opacity: [0.6, 0.95, 0.6],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="origin-center"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

