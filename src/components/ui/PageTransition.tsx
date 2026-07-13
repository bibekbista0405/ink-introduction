import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint } from 'lucide-react';

// Fast, snappy floating organic droplets that spray outwards during route changes
const transitionDroplets = [
  { x: -120, y: -80, size: 12, delay: 0.02, color: '#C3AED6', speed: 0.8 },
  { x: 140, y: -90, size: 16, delay: 0.05, color: '#FF8BA7', speed: 0.9 },
  { x: -80, y: 110, size: 14, delay: 0.08, color: '#FFC6C7', speed: 0.85 },
  { x: 100, y: 120, size: 10, delay: 0.01, color: '#C3AED6', speed: 0.75 },
  { x: -160, y: 40, size: 18, delay: 0.1, color: '#FF8BA7', speed: 0.95 },
  { x: 170, y: -40, size: 12, delay: 0.04, color: '#FFC6C7', speed: 0.8 },
  { x: -50, y: -150, size: 14, delay: 0.06, color: '#C3AED6', speed: 0.82 },
  { x: 70, y: -130, size: 8, delay: 0.09, color: '#FF8BA7', speed: 0.92 },
];

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Scroll to top immediately when a new route mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    
    // Support Lenis smooth scroll top alignment
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
    
    // Deactivate transitioning state fast
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Snappy liquid curve SVG variants - Layer 1 (Lavender Accent)
  const layer1Variants = {
    initial: {
      d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
    },
    enter: {
      d: [
        "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z", // Covered
        "M 0 0 L 100 0 L 100 30 Q 50 75 0 30 Z",    // Liquid peel wave
        "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"        // Snapped up
      ],
      transition: {
        times: [0, 0.4, 1],
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1] as any, // Faster, springy feel
        delay: 0.08
      }
    },
    exit: {
      d: [
        "M 0 100 L 100 100 L 100 100 Q 50 100 0 100 Z", // Open
        "M 0 100 L 100 100 L 100 50 Q 50 10 0 50 Z",   // Rising scoop wave
        "M 0 100 L 100 100 L 100 0 Q 50 0 0 0 Z"        // Covered
      ],
      transition: {
        times: [0, 0.4, 1],
        duration: 0.55,
        ease: [0.76, 0, 0.24, 1] as any,
        delay: 0
      }
    }
  };

  // Snappy liquid curve SVG variants - Layer 2 (Soft Pink Accent)
  const layer2Variants = {
    initial: {
      d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
    },
    enter: {
      d: [
        "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z",
        "M 0 0 L 100 0 L 100 30 Q 50 75 0 30 Z",
        "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"
      ],
      transition: {
        times: [0, 0.4, 1],
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1] as any,
        delay: 0.04
      }
    },
    exit: {
      d: [
        "M 0 100 L 100 100 L 100 100 Q 50 100 0 100 Z",
        "M 0 100 L 100 100 L 100 50 Q 50 10 0 50 Z",
        "M 0 100 L 100 100 L 100 0 Q 50 0 0 0 Z"
      ],
      transition: {
        times: [0, 0.4, 1],
        duration: 0.55,
        ease: [0.76, 0, 0.24, 1] as any,
        delay: 0.04
      }
    }
  };

  // Snappy liquid curve SVG variants - Layer 3 (Primary Pink)
  const layer3Variants = {
    initial: {
      d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z"
    },
    enter: {
      d: [
        "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z",
        "M 0 0 L 100 0 L 100 30 Q 50 75 0 30 Z",
        "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z"
      ],
      transition: {
        times: [0, 0.4, 1],
        duration: 0.65,
        ease: [0.25, 1, 0.5, 1] as any,
        delay: 0
      }
    },
    exit: {
      d: [
        "M 0 100 L 100 100 L 100 100 Q 50 100 0 100 Z",
        "M 0 100 L 100 100 L 100 50 Q 50 10 0 50 Z",
        "M 0 100 L 100 100 L 100 0 Q 50 0 0 0 Z"
      ],
      transition: {
        times: [0, 0.4, 1],
        duration: 0.55,
        ease: [0.76, 0, 0.24, 1] as any,
        delay: 0.08
      }
    }
  };

  // Cinematic flat entrance - snappier & faster with reduced delay
  const contentVariants = {
    initial: {
      opacity: 0,
      y: 45,
      scale: 0.96,
      filter: "blur(12px)",
    },
    enter: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: 0.25, // Syncs with the snappier swoop
        ease: [0.16, 1, 0.3, 1] as any, // Snappy elastic curve
        staggerChildren: 0.08,
        delayChildren: 0.35
      }
    },
    exit: {
      opacity: 0,
      y: -45, 
      scale: 0.96, 
      filter: "blur(8px)",
      transition: {
        duration: 0.45,
        ease: [0.76, 0, 0.24, 1] as any,
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    }
  };

  const childVariants = {
    initial: {
      opacity: 0,
      y: 30,
      filter: "blur(4px)",
    },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(4px)",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as any
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-background relative overflow-x-hidden">
      {/* 1. Curved Liquid Page Wipe - Layer 1 (Lavender Accent) */}
      <svg
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[997]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          variants={layer1Variants}
          initial="initial"
          animate="enter"
          exit="exit"
          fill="#C3AED6"
        />
      </svg>

      {/* 2. Curved Liquid Page Wipe - Layer 2 (Soft Brand Pink) */}
      <svg
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[998]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          variants={layer2Variants}
          initial="initial"
          animate="enter"
          exit="exit"
          fill="#FFC6C7"
        />
      </svg>

      {/* 3. Curved Liquid Page Wipe - Layer 3 (Primary Pink) */}
      <svg
        className="fixed inset-0 w-screen h-screen pointer-events-none z-[999]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          variants={layer3Variants}
          initial="initial"
          animate="enter"
          exit="exit"
          fill="#FF8BA7"
        />
      </svg>

      {/* 4. Snappy Motion Graphic Overlays */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 pointer-events-none z-[1001] flex items-center justify-center overflow-hidden">
            {/* Elegant holographic central HUD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 0.9], y: [15, 0, 0, -10] }}
              transition={{ duration: 0.8, times: [0, 0.25, 0.8, 1], ease: "easeInOut" }}
              className="absolute flex flex-col items-center justify-center bg-white/45 border border-primary/25 backdrop-blur-xl rounded-[2.5rem] px-8 py-6 shadow-2xl z-[1002]"
            >
              <div className="relative mb-3 flex items-center justify-center">
                {/* Scanning/sonar wave ring */}
                <motion.div 
                  className="absolute rounded-full border-2 border-primary/40 bg-primary/5"
                  animate={{
                    width: [32, 64],
                    height: [32, 64],
                    opacity: [0.6, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary relative z-10">
                  <Fingerprint className="w-6 h-6 animate-pulse" />
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">INK Secure Tunnel</span>
              <span className="text-xs font-mono text-dark/70 mt-1 font-semibold">ESTABLISHING CONNECTION...</span>
            </motion.div>

            {/* Snap ripple 1 */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 2.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
              className="absolute w-40 h-40 rounded-full border-3 border-[#C3AED6]/40 bg-gradient-to-r from-[#FF8BA7]/10 to-[#C3AED6]/10 backdrop-blur-[1px]"
            />
            {/* Snap ripple 2 */}
            <motion.div
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="absolute w-24 h-24 rounded-full bg-[#FF8BA7]/20"
            />

            {/* Quick ink droplet burst */}
            <div className="relative w-8 h-8">
              {transitionDroplets.map((droplet, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: droplet.x,
                    y: droplet.y,
                    scale: [0, 1.4, 0.6, 0],
                    opacity: [1, 1, 0.6, 0]
                  }}
                  transition={{
                    duration: 0.65 * droplet.speed,
                    ease: [0.16, 1, 0.3, 1],
                    delay: droplet.delay + 0.1,
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: droplet.size,
                    height: droplet.size,
                    backgroundColor: droplet.color,
                    boxShadow: `0 0 10px ${droplet.color}88`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Main page content wrapper with cinematic fast flat entrance */}
      <motion.div
        initial="initial"
        animate="enter"
        exit="exit"
        variants={contentVariants}
        className="w-full min-h-screen origin-center transform-gpu"
      >
        {React.Children.map(children, (child, idx) => {
          if (!child) return null;
          return (
            <motion.div key={idx} variants={childVariants} className="w-full">
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
