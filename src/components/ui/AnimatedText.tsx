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
        staggerChildren: splitBy === "character" ? (mask ? 0.028 : 0.015) : 0.06,
        delayChildren: delay,
      },
    },
  };

  // Premium luxury-brand styled animation variants.
  // Note: the non-mask character entrance previously animated `filter: blur()`
  // on every single character span simultaneously — one of the most expensive
  // properties a browser can rasterize per frame, and here it was multiplied
  // by however many letters were in the heading. Dropped in favor of
  // transform + opacity only, which is compositor-only and stays smooth.
  //
  // Also removed the combined rotate + skewY that used to run alongside the
  // vertical slide on every single character. Three transforms compounding
  // per-letter (translate + rotate + skew) reads as a wobble rather than a
  // clean reveal, especially across a dozen+ characters staggering in quick
  // succession — that compounding was the "not smooth" feeling. A single
  // clean translateY + fade, mask-revealed by the overflow-hidden wrapper,
  // is the actual technique premium sites use and reads as buttery-smooth.
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: mask ? "100%" : (splitBy === "word" ? "100%" : 22),
    },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: mask ? 0.85 : 0.6,
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

