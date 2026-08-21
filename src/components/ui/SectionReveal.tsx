import React, { createContext, useContext } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  yOffset?: number;
  scale?: number;
  once?: boolean;
  margin?: string;
}

const SectionRevealContext = createContext<{
  isInsideReveal: boolean;
}>({ isInsideReveal: false });

export function useSectionReveal() {
  return useContext(SectionRevealContext);
}

export function SectionReveal({
  children,
  className,
  staggerChildren = 0.12,
  delayChildren = 0.05,
  yOffset = 40,
  scale = 0.98,
  once = true,
  margin = "-100px",
}: SectionRevealProps) {
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: yOffset, 
      scale: scale 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.65, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      } 
    }
  };

  return (
    <SectionRevealContext.Provider value={{ isInsideReveal: true }}>
      <div className="w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin }}
          variants={containerVariants}
          className={cn("w-full", className)}
        >
          {children}
        </motion.div>
      </div>
    </SectionRevealContext.Provider>
  );
}

interface SectionRevealListProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

export function SectionRevealList({
  children,
  className,
  staggerChildren = 0.1,
  delayChildren = 0,
}: SectionRevealListProps) {
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      }
    }
  };

  return (
    <motion.div
      variants={listVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionRevealItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  scale?: number;
}

export function SectionRevealItem({
  children,
  className,
  yOffset = 25,
  scale = 0.95,
}: SectionRevealItemProps) {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: yOffset, 
      scale: scale 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 0.8,
      } 
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn("origin-center transform-gpu", className)}
    >
      {children}
    </motion.div>
  );
}

// Add static properties for dotted-access style
SectionReveal.List = SectionRevealList;
SectionReveal.Item = SectionRevealItem;
