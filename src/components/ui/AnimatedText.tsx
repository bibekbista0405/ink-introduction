import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../../lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "word" | "character";
  once?: boolean;
  mask?: boolean;
}

export function AnimatedText({ 
  text, 
  className, 
  delay = 0, 
  splitBy = "character", 
  once = true,
  mask = true
}: AnimatedTextProps) {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: mask ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: splitBy === "character" ? (mask ? 0.035 : 0.015) : 0.08,
        delayChildren: delay,
      },
    },
  };

  // Premium luxury-brand styled animation variants
  const itemVariants = {
    hidden: {
      opacity: mask ? 0 : 0,
      y: mask ? "115%" : (splitBy === "word" ? "120%" : 40),
      rotateX: mask ? 0 : (splitBy === "word" ? 12 : 20),
      rotate: mask ? (splitBy === "character" ? 6 : 3) : 0,
      skewY: mask ? (splitBy === "character" ? 4 : 2) : (splitBy === "word" ? 4 : 0),
      scale: mask ? 1 : (splitBy === "word" ? 1 : 0.9),
      filter: (!mask && splitBy === "character") ? "blur(8px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      rotate: 0,
      skewY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: mask ? 1.25 : 0.85,
        // Premium out-expo/out-quart custom bezier for a weighted, smooth deceleration feel
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap select-none leading-[1.1] transform-gpu", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-5%" }}
      style={{ display: "inline-flex", flexWrap: "wrap", perspective: "1000px" }}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className={cn(
            "inline-flex whitespace-nowrap",
            splitBy === "word" && !mask ? "overflow-hidden py-2 -my-2" : ""
          )}
          style={{ marginRight: "0.24em", display: "inline-flex" }}
        >
          {splitBy === "character" ? (
            word.split("").map((char, charIdx) => {
              if (mask) {
                return (
                  <span
                    key={charIdx}
                    className="inline-block overflow-hidden pt-2 -mt-2 pb-5 -mb-5 px-[0.02em] relative"
                    style={{ verticalAlign: "bottom" }}
                  >
                    <motion.span
                      variants={itemVariants}
                      className="inline-block origin-bottom-left transform-gpu"
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  </span>
                );
              }
              return (
                <motion.span
                  key={charIdx}
                  variants={itemVariants}
                  className="inline-block origin-bottom transform-gpu"
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              );
            })
          ) : (
            mask ? (
              <span
                className="inline-block overflow-hidden pt-2 -mt-2 pb-5 -mb-5 px-[0.04em] relative"
                style={{ verticalAlign: "bottom" }}
              >
                <motion.span
                  variants={itemVariants}
                  className="inline-block transform-gpu origin-left"
                  style={{ display: "inline-block" }}
                >
                  {word}
                </motion.span>
              </span>
            ) : (
              <motion.span
                variants={itemVariants}
                className="inline-block transform-gpu origin-left"
                style={{ display: "inline-block" }}
              >
                {word}
              </motion.span>
            )
          )}
        </span>
      ))}
    </motion.span>
  );
}

