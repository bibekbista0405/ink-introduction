import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  blur?: number;
  staggerChildren?: number;
  once?: boolean;
  margin?: string;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  yOffset = 30,
  xOffset = 0,
  scale = 1,
  blur = 0,
  staggerChildren,
  once = true,
  margin = "-10%",
}: RevealProps) {
  // Container variants to coordinate children stagger animation if defined
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    },
  };

  // Item variants mapping to props
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      x: xOffset,
      scale: scale,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1] as any, // Smooth custom ease-out-quart
      },
    },
  };

  const isContainer = typeof staggerChildren === 'number' && staggerChildren > 0;

  if (isContainer) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
        variants={containerVariants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("origin-center transform-gpu", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={itemVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealChildProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  blur?: number;
}

export function RevealChild({
  children,
  className,
  yOffset = 25,
  xOffset = 0,
  scale = 1,
  blur = 0,
}: RevealChildProps) {
  const childVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      x: xOffset,
      scale: scale,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <motion.div variants={childVariants} className={cn("origin-center transform-gpu", className)}>
      {children}
    </motion.div>
  );
}
