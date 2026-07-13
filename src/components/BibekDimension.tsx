import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useVelocity, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { fireConfetti } from '../lib/confetti';
import bibekPortrait from '../assets/images/bibek_back_portrait_1783882641879.jpg';

// Extremely elegant, subtle, low-volume synth beep engine
const playMinimalChime = (frequency: number, type: OscillatorType = 'sine', duration = 0.5, volume = 0.02) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    // Graceful fallback if audio context is blocked
  }
};

// High performance full-screen canvas film-grain texture overlay
function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Optimize performance: pre-generate noise patterns
    // This avoids generating random values across millions of pixels on every frame
    const patternSize = 256;
    const patternCount = 8;
    const patterns: CanvasPattern[] = [];

    for (let p = 0; p < patternCount; p++) {
      const offscreen = document.createElement('canvas');
      offscreen.width = patternSize;
      offscreen.height = patternSize;
      const oCtx = offscreen.getContext('2d');
      if (oCtx) {
        const imgData = oCtx.createImageData(patternSize, patternSize);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const val = Math.floor(Math.random() * 255);
          data[i] = val;     // R
          data[i + 1] = val; // G
          data[i + 2] = val; // B
          // Extremely subtle alpha for natural, non-distracting documentary texture
          data[i + 3] = Math.floor(Math.random() * 10) + 5; // range 5 - 14 (~2% to 5.5% opacity)
        }
        oCtx.putImageData(imgData, 0, 0);
        const pattern = ctx.createPattern(offscreen, 'repeat');
        if (pattern) {
          patterns.push(pattern);
        }
      }
    }

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.width = window.innerWidth;
      height = canvasRef.current.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const fpsInterval = 1000 / 12; // Throttled to 12fps to create an authentic, flickering 'cinematic' documentary look
    let lastTime = performance.now();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      const elapsed = time - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = time - (elapsed % fpsInterval);

      if (patterns.length > 0) {
        ctx.clearRect(0, 0, width, height);
        // Select a random pattern frame
        const currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
        ctx.fillStyle = currentPattern;
        ctx.fillRect(0, 0, width, height);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="film-grain-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-[5] mix-blend-overlay opacity-90 select-none"
    />
  );
}

// Interactive typography component for fleeting, ephemeral thoughts
interface FleetingTextProps {
  children: React.ReactNode;
  className?: string;
}

function FleetingText({ children, className = "" }: FleetingTextProps) {
  const processNode = (node: React.ReactNode): React.ReactNode => {
    if (!node) return null;

    if (typeof node === 'string') {
      const words = node.split(/(\s+)/);
      return words.map((word, i) => {
        if (/^\s+$/.test(word)) {
          return <span key={i}>{word}</span>;
        }
        
        // Generate pseudo-random targets that give an organic, unique feel to each word instance
        const seedX = (Math.sin(i * 1.5) * 12); // stable pseudo-random hover horizontal drift (-12px to 12px)
        const seedY = (Math.cos(i * 2.3) * 10) - 3; // stable pseudo-random hover floating vertical drift (-13px to 7px)
        const seedRotate = (Math.sin(i * 3.7) * 8); // stable pseudo-random hover tilt (-8deg to 8deg)
        
        return (
          <span key={i} className="relative inline-block group whitespace-nowrap select-none">
            {/* Red Channel Shift Layer for Analog Projection Distortion */}
            <motion.span
              className="absolute inset-0 pointer-events-none select-none text-[#ff3366] mix-blend-screen"
              initial={{ x: -0.5, y: 0.2, opacity: 0.15, filter: "blur(0.2px)" }}
              whileHover={{
                x: [-1.5, -3, -0.5, -2, -1.5],
                y: [0.5, -0.8, 0.6, -0.4, 0.5],
                opacity: [0.65, 0.85, 0.5, 0.75, 0.65],
                transition: {
                  x: { repeat: Infinity, duration: 0.25, ease: "linear" },
                  y: { repeat: Infinity, duration: 0.25, ease: "linear" },
                  opacity: { repeat: Infinity, duration: 0.2, ease: "linear" }
                }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {word}
            </motion.span>

            {/* Blue Channel Shift Layer for Analog Projection Distortion */}
            <motion.span
              className="absolute inset-0 pointer-events-none select-none text-[#00e1ff] mix-blend-screen"
              initial={{ x: 0.5, y: -0.2, opacity: 0.15, filter: "blur(0.2px)" }}
              whileHover={{
                x: [1.5, 3, 0.5, 2, 1.5],
                y: [-0.5, 0.8, -0.6, 0.4, -0.5],
                opacity: [0.65, 0.85, 0.5, 0.75, 0.65],
                transition: {
                  x: { repeat: Infinity, duration: 0.25, ease: "linear" },
                  y: { repeat: Infinity, duration: 0.25, ease: "linear" },
                  opacity: { repeat: Infinity, duration: 0.2, ease: "linear" }
                }
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {word}
            </motion.span>

            {/* Main Typographic Element */}
            <motion.span
              className="inline-block cursor-default whitespace-nowrap origin-center relative z-10"
              whileHover={{
                x: seedX,
                y: seedY,
                rotate: seedRotate,
                opacity: 0.9,
                filter: "blur(0.4px)",
                scale: 0.98,
                transition: {
                  type: "spring",
                  stiffness: 140,
                  damping: 12,
                  mass: 0.3
                }
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
                mass: 0.8
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      });
    }

    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: React.ReactNode }>;
      if (element.props && element.props.children) {
        return React.cloneElement(
          element,
          {
            ...element.props,
            children: React.Children.map(element.props.children, processNode)
          }
        );
      }
      return node;
    }

    return node;
  };

  return (
    <span className={`inline-block ${className}`}>
      {React.Children.map(children, processNode)}
    </span>
  );
}

interface BreathingContainerProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

function BreathingContainer({ children, className = "", duration = 7 }: BreathingContainerProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.015, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Subtle, high-performance physical magnetic pull engine
interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

function Magnetic({ children, range = 65, strength = 0.38 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.55 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      // Elastic pull factor: increases as pointer moves closer to center
      const factor = (1 - distance / range) * strength;
      x.set(distanceX * factor * 1.4);
      y.set(distanceY * factor * 1.4);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

interface ScatteredTextProps {
  text: string;
  isActive: boolean;
  className?: string;
  isGlitching?: boolean;
}

function ScatteredText({ text, isActive, className = "", isGlitching = false }: ScatteredTextProps) {
  const words = text.split(" ");

  const containerVariants = {
    scattered: {
      transition: {
        staggerChildren: 0.002,
        staggerDirection: -1 as const,
      }
    },
    active: {
      transition: {
        staggerChildren: 0.038, // Exquisite real-time typewriter speed
        delayChildren: 0.04,
      }
    },
    glitch: {
      transition: {
        staggerChildren: 0.001,
      }
    }
  };

  let charGlobalIndex = 0;

  return (
    <motion.span
      className={`inline ${className}`}
      variants={containerVariants}
      animate={isGlitching && isActive ? "glitch" : (isActive ? "active" : "scattered")}
      initial="scattered"
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split("");
        
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const index = charGlobalIndex++;
              // Stable pseudo-random coordinates
              const angle = (index * 0.95) % (2 * Math.PI);
              const radius = 25 + (index % 6) * 6;
              const randomX = Math.cos(angle) * radius;
              const randomY = Math.sin(angle) * radius;
              const randomRotate = ((index % 5) - 2) * 15; // -30deg to +30deg
              const randomScale = 0.7 + (index % 4) * 0.08; // 0.7 to 0.94

              const charVariants = {
                scattered: {
                  opacity: 0,
                  x: randomX,
                  y: randomY,
                  rotate: randomRotate,
                  scale: randomScale,
                  filter: "blur(4px)",
                  transition: {
                    type: "spring" as const,
                    stiffness: 45,
                    damping: 12,
                  }
                },
                active: {
                  opacity: [0, 0.45, 0.9, 1],
                  x: 0,
                  y: 0,
                  rotate: 0,
                  // Ink-bleed effect: expands slightly with blur like liquid ink, then settles sharp
                  scale: [1.38, 1.2, 0.96, 1],
                  filter: [
                    "blur(7px)",
                    "blur(3px)",
                    "blur(0.8px)",
                    "blur(0px)"
                  ],
                  transition: {
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // fluid buttery curves
                  }
                },
                glitch: {
                  opacity: [1, 0.7, 1, 0.4, 1],
                  x: [0, (index % 3 - 1) * 6, (index % 5 - 2) * -4, (index % 3 - 1) * 3, 0],
                  y: [0, (index % 2 - 0.5) * -7, (index % 4 - 2) * 5, (index % 2 - 0.5) * 6, 0],
                  skewX: [0, (index % 3 - 1) * 25, 0, (index % 3 - 1) * -20, 0],
                  skewY: [0, (index % 4 - 2) * 15, 0, (index % 4 - 2) * -15, 0],
                  scaleX: [1, 1.25, 0.85, 1.15, 1],
                  scaleY: [1, 0.75, 1.2, 0.8, 1],
                  filter: ["blur(0px)", "blur(1.5px)", "blur(0px)", "blur(2px)", "blur(0px)"],
                  transition: {
                    duration: 0.22 + (index % 5) * 0.03,
                    repeat: Infinity,
                    repeatType: "reverse" as const,
                    ease: "linear" as const,
                  }
                }
              };

              return (
                <motion.span
                  key={index}
                  variants={charVariants}
                  className="inline-block origin-center"
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </motion.span>
  );
}

interface NoiseSubtractorFieldProps {
  scrollProgress: any;
  textContrastColor: any;
}

function NoiseSubtractorField({ scrollProgress, textContrastColor }: NoiseSubtractorFieldProps) {
  const particles = React.useMemo(() => {
    const noiseTerms = [
      "COOKIE_ALERT", "BOUNCE_RATE", "POP_UP", "TRACKER.JS", "CPM_BID",
      "METRIC_ROI", "BUY_NOW_BUTTON", "SPAM_LOOP", "REVENUES", "RETARGETING",
      "ANALYTICS_V4", "BANNER_AD", "NEWSLETTER", "AUTOPLAY_AD", "SPAM_GRID",
      "CONVERSION_FUNNEL", "ENGAGEMENT_LOOP", "AUTOPLAY_SOUND", "NOTIFICATION_BELL"
    ];
    const temp = [];
    for (let i = 0; i < 40; i++) {
      const isWord = i % 2 === 0;
      const text = isWord ? noiseTerms[(i / 2) % noiseTerms.length] : undefined;
      temp.push({
        id: i,
        text,
        isWord,
        size: isWord ? 8 : 2 + (i % 3),
        initialLeft: 5 + (i * 2.3) % 90, // percentage left
        initialTop: 5 + (i * 3.7) % 90,   // percentage top
        driftX: ((i % 7) - 3) * 60,       // pixels drift X
        driftY: -150 - (i % 5) * 80,      // pixels upward rise
        delay: (i % 4) * 0.05,
      });
    }
    return temp;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Chaotic noise particles field which fades and drifts away as scroll progresses */}
      {particles.map((p) => {
        // Opacity mapping: starts visible, fades to 0 by 0.72 scroll progress
        const opacity = useTransform(
          scrollProgress,
          [0 + p.delay, 0.45 + p.delay, 0.72],
          [p.isWord ? 0.16 : 0.26, p.isWord ? 0.08 : 0.14, 0]
        );

        // Motion drift mapping
        const driftX = useTransform(scrollProgress, [0, 0.8], [0, p.driftX]);
        const driftY = useTransform(scrollProgress, [0, 0.8], [0, p.driftY]);
        
        // Scale down to 0
        const scale = useTransform(scrollProgress, [0.1, 0.7], [1.0, 0.4]);

        // Blur out as they dissolve
        const blur = useTransform(scrollProgress, [0.2, 0.72], ["blur(0px)", "blur(4px)"]);

        return (
          <motion.div
            key={p.id}
            style={{
              left: `${p.initialLeft}%`,
              top: `${p.initialTop}%`,
              opacity,
              x: driftX,
              y: driftY,
              scale,
              filter: blur,
              color: textContrastColor,
            }}
            className="absolute font-mono text-[9px] tracking-wider transition-colors duration-500 whitespace-nowrap animate-pulse"
          >
            {p.isWord ? (
              <span className="flex items-center gap-1 opacity-70">
                <span className="inline-block w-1.5 h-1.5 bg-neutral-500/50 rounded-full animate-ping" />
                {p.text}
              </span>
            ) : (
              <span 
                className="block rounded-full bg-current opacity-40" 
                style={{ width: p.size, height: p.size }} 
              />
            )}
          </motion.div>
        );
      })}

      {/* Pristine architectural compass/order blueprint that slowly manifests in the center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer radial light ring */}
        <motion.div
          style={{
            opacity: useTransform(scrollProgress, [0.2, 0.75, 1], [0, 0.04, 0.08]),
            scale: useTransform(scrollProgress, [0.2, 0.85], [0.8, 1.15]),
            borderColor: textContrastColor,
          }}
          className="w-[75vw] h-[75vw] max-w-[650px] max-h-[650px] rounded-full border border-dashed transition-colors duration-500"
        />

        {/* Inner solid circular coordinate ring with neat ticks */}
        <motion.div
          style={{
            opacity: useTransform(scrollProgress, [0.35, 0.8, 1], [0, 0.05, 0.12]),
            scale: useTransform(scrollProgress, [0.35, 0.8], [0.7, 1]),
            borderColor: textContrastColor,
          }}
          className="absolute w-[50vw] h-[50vw] max-w-[420px] max-h-[420px] rounded-full border border-current transition-colors duration-500 flex items-center justify-center"
        >
          {/* Faint crosshairs representing focus & structure */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[110%] h-[1px] bg-current opacity-20" />
            <div className="h-[110%] w-[1px] bg-current opacity-20" />
          </div>

          {/* Core blueprint coordinate indicators */}
          <span className="absolute -top-6 font-mono text-[7px] uppercase tracking-[0.4em] opacity-40">
            ALIGNMENT_GRID_V2
          </span>
          <span className="absolute -bottom-6 font-mono text-[7px] uppercase tracking-[0.4em] opacity-40">
            Z_INDEX_RESTORED
          </span>
          <span className="absolute -right-12 font-mono text-[7px] uppercase tracking-[0.4em] opacity-40 vertical-text-editorial">
            SOUL_OF_IDEA // 0.00ms
          </span>
        </motion.div>

        {/* Ambient glowing breathing center core representing the "raw soul of the idea" */}
        <motion.div
          style={{
            opacity: useTransform(scrollProgress, [0.65, 0.9, 1], [0, 0.08, 0.18]),
            scale: useTransform(scrollProgress, [0.65, 0.9], [0.5, 1.2]),
          }}
          className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-neutral-300/20 via-neutral-100/10 to-transparent blur-[35px]"
        />
      </div>
    </div>
  );
}

export function BibekDimension() {
  const [audioActive, setAudioActive] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const narrativeSectionRef = useRef<HTMLDivElement>(null);
  const portraitSectionRef = useRef<HTMLDivElement>(null);

  // States for interactive moments
  const [activePhilosophy, setActivePhilosophy] = useState<string | null>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [eggCount, setEggCount] = useState(0);

  // Secret typographic Easter egg
  const [typoClickCount, setTypoClickCount] = useState(0);
  const [showSecretQuote, setShowSecretQuote] = useState(false);

  useEffect(() => {
    if (showSecretQuote) {
      const timer = setTimeout(() => {
        setShowSecretQuote(false);
        setTypoClickCount(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSecretQuote]);

  // Selection-triggered glitch state
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setIsSelecting(true);
      } else {
        setIsSelecting(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  // Scroll tracking
  const { scrollY, scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end']
  });

  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

  const [scrollPercent, setScrollPercent] = useState(0);
  useEffect(() => {
    const unsubscribe = smoothScrollY.on("change", (latest) => {
      setScrollPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
    });
    return () => unsubscribe();
  }, [smoothScrollY]);

  const needleRotation = useTransform(smoothScrollY, [0, 1], [-120, 120]);

  // Compute scroll velocity and map to a dynamic motion blur value for the text
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 80, damping: 25 });
  const motionBlurVal = useTransform(smoothVelocity, (val) => {
    const absVal = Math.abs(val);
    // Dynamic mapping: higher speed = more blur (max 6px blur)
    const blurAmount = Math.min(6, absVal / 400);
    return `blur(${blurAmount}px)`;
  });

  // Specific local tracking for Scroll-linked narrative with custom springs
  const { scrollYProgress: narrativeScroll } = useScroll({
    target: narrativeSectionRef,
    offset: ['start start', 'end end']
  });
  const smoothNarrativeScroll = useSpring(narrativeScroll, { stiffness: 40, damping: 18 });
  const progressY = useTransform(smoothNarrativeScroll, [0, 1], ["0%", "100%"]);

  // Dynamic 3D rotational tilt & perspective mapped directly to scroll inertia for a hyper-realistic response
  const dynamicTiltX = useTransform(smoothVelocity, [-1500, 1500], [-5, 5]);
  const dynamicRotate = useTransform(smoothVelocity, [-1500, 1500], [-1.2, 1.2]);
  const dynamicSkewX = useTransform(smoothVelocity, [-1500, 1500], [-1.5, 1.5]);
  const dynamicPerspective = useTransform(smoothNarrativeScroll, [0, 0.5, 1], ["1200px", "1600px", "1200px"]);

  const [activeLine, setActiveLine] = useState<number>(-1);

  useEffect(() => {
    const unsubscribe = smoothNarrativeScroll.on("change", (latest) => {
      if (latest < 0.05) {
        setActiveLine(-1);
      } else if (latest >= 0.05 && latest < 0.25) {
        setActiveLine(0);
      } else if (latest >= 0.25 && latest < 0.50) {
        setActiveLine(1);
      } else if (latest >= 0.50 && latest < 0.75) {
        setActiveLine(2);
      } else if (latest >= 0.75) {
        setActiveLine(3);
      }
    });
    return () => unsubscribe();
  }, [smoothNarrativeScroll]);

  const lastActiveLineRef = useRef(-1);
  useEffect(() => {
    if (activeLine !== -1 && activeLine !== lastActiveLineRef.current) {
      // Elegant, micro-tuned chime sequence
      const chimeFreqs = [293.66, 329.63, 440.00, 587.33];
      triggerChime(chimeFreqs[activeLine], 'sine', 0.85, 0.015);
      lastActiveLineRef.current = activeLine;
    } else if (activeLine === -1 && lastActiveLineRef.current !== -1) {
      lastActiveLineRef.current = -1;
    }
  }, [activeLine]);

  // Specific local tracking for portraits
  const { scrollYProgress: portraitScroll } = useScroll({
    target: portraitSectionRef,
    offset: ['start end', 'end start']
  });
  const smoothPortraitScroll = useSpring(portraitScroll, { stiffness: 40, damping: 18 });

  // Scroll-linked typography reveal sequence values (Staggered for each line with dynamic 3D physical zoom-in)
  // --- SENTENCE 1 ---
  // Label Opacity: reveals at 0.05, peaks at 0.15, fades to 0.25 at 0.35, and fades completely as it zooms past at 0.48
  const s1LabelOpacity = useTransform(smoothNarrativeScroll, [0.05, 0.15, 0.32, 0.45], [0, 1, 0.25, 0]);
  // Label Y: starts at 35, reveals to 0 at 0.15, continues to drift up to -120 as scroll goes to 1.0 (parallax + camera fly-through)
  const s1LabelY = useTransform(smoothNarrativeScroll, [0.05, 0.15, 0.45, 1.0], [35, 0, -85, -150]);
  
  // Quote Opacity: reveals at 0.11, peaks at 0.18, fades to 0.35 at 0.38, and vanishes as it moves past camera at 0.50
  const s1QuoteOpacity = useTransform(smoothNarrativeScroll, [0.11, 0.18, 0.35, 0.48], [0, 1, 0.35, 0]);
  // Quote Y: starts at 50, reveals to 0 at 0.18, then drifts up and expands out of frame
  const s1QuoteY = useTransform(smoothNarrativeScroll, [0.11, 0.18, 0.48, 1.0], [50, 0, -55, -110]);

  // Sentence 1 Depth Focus & Blur (Fly-through 3D effect: starts far away, comes to focus, then zooms past camera/viewer)
  const s1Z = useTransform(smoothNarrativeScroll, [0.05, 0.15, 0.35, 0.48], [-280, 0, 480, 1100]);
  const s1DOFBlur = useTransform(smoothNarrativeScroll, [0.05, 0.15, 0.35, 0.48], ["blur(4.5px)", "blur(0px)", "blur(4.5px)", "blur(18px)"]);

  // --- SENTENCE 2 ---
  // Label Opacity: reveals at 0.22, peaks at 0.375, fades to 0.25 at 0.55, and fades out as it zooms past at 0.68
  const s2LabelOpacity = useTransform(smoothNarrativeScroll, [0.22, 0.375, 0.55, 0.68], [0, 1, 0.25, 0]);
  // Label Y: starts at 35, reveals to 0 at 0.375, then drifts out of frame
  const s2LabelY = useTransform(smoothNarrativeScroll, [0.22, 0.375, 0.68, 1.0], [35, 0, -65, -120]);

  // Quote Opacity: reveals at 0.28, peaks at 0.41, fades to 0.35 at 0.58, and vanishes at 0.70
  const s2QuoteOpacity = useTransform(smoothNarrativeScroll, [0.28, 0.41, 0.58, 0.70], [0, 1, 0.35, 0]);
  // Quote Y: starts at 50, reveals to 0 at 0.41, then drifts out of frame
  const s2QuoteY = useTransform(smoothNarrativeScroll, [0.28, 0.41, 0.70, 1.0], [50, 0, -40, -90]);

  // Sentence 2 Depth Focus & Blur (3D Depth zoom-in)
  const s2Z = useTransform(smoothNarrativeScroll, [0.22, 0.39, 0.58, 0.70], [-280, 0, 480, 1100]);
  const s2DOFBlur = useTransform(smoothNarrativeScroll, [0.22, 0.39, 0.58, 0.70], ["blur(4.5px)", "blur(0px)", "blur(4.5px)", "blur(18px)"]);

  // --- SENTENCE 3 ---
  // Label Opacity: reveals at 0.45, peaks at 0.625, fades to 0.25 at 0.80, and fades out as it zooms past at 0.90
  const s3LabelOpacity = useTransform(smoothNarrativeScroll, [0.45, 0.625, 0.80, 0.90], [0, 1, 0.25, 0]);
  // Label Y: starts at 35, reveals to 0 at 0.625, then drifts out of frame
  const s3LabelY = useTransform(smoothNarrativeScroll, [0.45, 0.625, 0.90, 1.0], [35, 0, -45, -95]);

  // Quote Opacity: reveals at 0.50, peaks at 0.66, fades to 0.35 at 0.82, and vanishes at 0.92
  const s3QuoteOpacity = useTransform(smoothNarrativeScroll, [0.50, 0.66, 0.82, 0.92], [0, 1, 0.35, 0]);
  // Quote Y: starts at 50, reveals to 0 at 0.66, then drifts out of frame
  const s3QuoteY = useTransform(smoothNarrativeScroll, [0.50, 0.66, 0.92, 1.0], [50, 0, -25, -70]);

  // Sentence 3 Depth Focus & Blur (3D Depth zoom-in)
  const s3Z = useTransform(smoothNarrativeScroll, [0.45, 0.64, 0.82, 0.92], [-280, 0, 480, 1100]);
  const s3DOFBlur = useTransform(smoothNarrativeScroll, [0.45, 0.64, 0.82, 0.92], ["blur(4.5px)", "blur(0px)", "blur(4.5px)", "blur(18px)"]);

  // --- SENTENCE 4 ---
  // Label Opacity: reveals at 0.68, peaks at 0.875, then gracefully fades down as it expands near the camera at the end
  const s4LabelOpacity = useTransform(smoothNarrativeScroll, [0.68, 0.875, 1.0], [0, 1, 0.3]);
  // Label Y: starts at 35, reveals to 0 at 0.875, drifts up at transition end
  const s4LabelY = useTransform(smoothNarrativeScroll, [0.68, 0.875, 1.0], [35, 0, -45]);

  // Quote Opacity: reveals at 0.73, peaks at 0.92, fades slightly as it expands past
  const s4QuoteOpacity = useTransform(smoothNarrativeScroll, [0.73, 0.92, 1.0], [0, 1, 0.4]);
  // Quote Y: starts at 50, reveals to 0 at 0.92, drifts up at transition end
  const s4QuoteY = useTransform(smoothNarrativeScroll, [0.73, 0.92, 1.0], [50, 0, -25]);

  // Sentence 4 Depth Focus & Blur (3D Depth zoom-in pulling user into the next chapter)
  const s4Z = useTransform(smoothNarrativeScroll, [0.68, 0.90, 1.0], [-280, 0, 380]);
  const s4DOFBlur = useTransform(smoothNarrativeScroll, [0.68, 0.90, 1.0], ["blur(4.5px)", "blur(0px)", "blur(4px)"]);

  // Scroll-dependent backdrop blur for the pinned narrative section (depth of field effect)
  const narrativeBlur = useTransform(
    smoothNarrativeScroll,
    [0, 0.15, 0.85, 1.0],
    ["blur(0px)", "blur(10px)", "blur(10px)", "blur(0px)"]
  );

  // Mask-reveal clipPaths for developer portraits
  const portraitMask1 = useTransform(
    smoothPortraitScroll,
    [0.15, 0.48],
    ['inset(100% 0% 0% 0% rounded 2.5rem)', 'inset(0% 0% 0% 0% rounded 2.5rem)']
  );

  const portraitMask2 = useTransform(
    smoothPortraitScroll,
    [0.22, 0.55],
    ['inset(0% 100% 0% 0% rounded 2rem)', 'inset(0% 0% 0% 0% rounded 2rem)']
  );

  // Multi-layered subtle background parallax definitions
  const bgLayer1Y = useTransform(smoothScrollY, [0, 1], [0, -450]);
  const bgLayer2Y = useTransform(smoothScrollY, [0, 1], [150, -800]);
  const bgLayer3Y = useTransform(smoothScrollY, [0, 1], [-50, -250]);
  const bgLayer1Rotate = useTransform(smoothScrollY, [0, 1], [0, 35]);
  const bgLayer2Rotate = useTransform(smoothScrollY, [0, 1], [15, -45]);
  
  // Subtle fading animations to make the layout feel deeply atmospheric and integrated
  const layer1Opacity = useTransform(smoothScrollY, [0, 0.3, 0.7, 1], [0.08, 0.12, 0.05, 0.02]);
  const layer2Opacity = useTransform(smoothScrollY, [0.15, 0.45, 0.75, 1], [0.02, 0.06, 0.04, 0.01]);
  const layer3Opacity = useTransform(smoothScrollY, [0.3, 0.6, 0.9, 1], [0.05, 0.09, 0.04, 0]);

  // Smooth scaling values for a zoom-in spatial effect as the reader advances
  const scaleLayer1 = useTransform(smoothScrollY, [0, 1], [1, 1.15]);
  const scaleLayer2 = useTransform(smoothScrollY, [0, 1], [1.1, 0.95]);

  // Custom visual parallax values
  const textTranslateY = useTransform(smoothScrollY, [0, 0.15], [0, -80]);
  const imgParallaxY = useTransform(smoothScrollY, [0.1, 0.4], [50, -100]);
  const imgScale = useTransform(smoothScrollY, [0.1, 0.4], [1.02, 1.15]);
  const secondImgY = useTransform(smoothScrollY, [0.15, 0.45], [100, -150]);
  
  // Dynamic background color morph (from luxury dark to pure premium gallery white, and back to absolute silence black)
  const bgTransition = useTransform(
    smoothScrollY,
    [0, 0.4, 0.45, 0.62, 0.68, 0.85],
    ['#0a0a0a', '#0a0a0a', '#f5f4f0', '#f5f4f0', '#0a0a0a', '#050505']
  );

  const textContrastColor = useTransform(
    smoothScrollY,
    [0, 0.4, 0.45, 0.62, 0.68, 0.85],
    ['#f5f4f0', '#f5f4f0', '#121211', '#121211', '#f5f4f0', '#f5f4f0']
  );

  const borderContrastColor = useTransform(
    smoothScrollY,
    [0, 0.4, 0.45, 0.62, 0.68, 0.85],
    ['rgba(245,244,240,0.08)', 'rgba(245,244,240,0.08)', 'rgba(18,18,17,0.08)', 'rgba(18,18,17,0.08)', 'rgba(245,244,240,0.08)', 'rgba(245,244,240,0.08)']
  );

  // Dynamic, scroll-responsive cinematic vignette effect that shifts from dark velvet shadow to paper edges
  const vignetteBg = useTransform(
    smoothScrollY,
    [0, 0.22, 0.4, 0.45, 0.62, 0.68, 0.82, 1],
    [
      "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.78) 100%)",      // deep, focusing dark at start
      "radial-gradient(circle, transparent 40%, rgba(0,0,0,0.62) 100%)",      // lighter focus as journey begins
      "radial-gradient(circle, transparent 48%, rgba(0,0,0,0.68) 100%)",      // holding focus before flash
      "radial-gradient(circle, transparent 52%, rgba(214,208,194,0.48) 100%)", // soft warm parchment edge vignette in light gallery
      "radial-gradient(circle, transparent 52%, rgba(214,208,194,0.48) 100%)", // holding parchment vignette
      "radial-gradient(circle, transparent 45%, rgba(0,0,0,0.72) 100%)",      // returning to dark
      "radial-gradient(circle, transparent 32%, rgba(0,0,0,0.85) 100%)",      // deep focus for portrait
      "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.92) 100%)"       // ultra intense theatrical vignetting for the raw soul
    ]
  );

  const triggerChime = (freq: number, type: OscillatorType = 'sine', dur = 0.5, vol = 0.02) => {
    if (audioActive) {
      playMinimalChime(freq, type, dur, vol);
    }
  };

  const handleEggClick = () => {
    const nextCount = eggCount + 1;
    setEggCount(nextCount);
    
    // Play ascending soft acoustic chord
    const freqs = [261.63, 329.63, 392.00, 523.25, 659.25];
    triggerChime(freqs[Math.min(nextCount - 1, 4)], 'sine', 0.6, 0.025);

    if (nextCount === 5) {
      setShowEasterEgg(true);
      triggerChime(523.25, 'sine', 0.8, 0.03);
      setTimeout(() => triggerChime(659.25, 'sine', 0.8, 0.03), 100);
      setTimeout(() => triggerChime(783.99, 'sine', 0.8, 0.03), 200);
      setTimeout(() => triggerChime(1046.50, 'sine', 1.2, 0.04), 300);
      fireConfetti();
    }
  };

  const handleTypoClick = () => {
    if (showSecretQuote) return;
    const nextCount = typoClickCount + 1;
    setTypoClickCount(nextCount);
    
    // Play elegant soft high pitch acoustic tones
    triggerChime(329.63 + nextCount * 130.81, 'sine', 0.5, 0.02);

    if (nextCount === 3) {
      setShowSecretQuote(true);
      triggerChime(659.25, 'sine', 1.0, 0.03);
      setTimeout(() => triggerChime(783.99, 'sine', 1.0, 0.03), 150);
      setTimeout(() => triggerChime(987.77, 'sine', 1.5, 0.04), 300);
      fireConfetti();
    }
  };

  return (
    <motion.div
      ref={scrollContainerRef}
      style={{ backgroundColor: bgTransition }}
      className="relative min-h-[920vh] transition-colors duration-500 overflow-x-hidden selection:bg-neutral-800/25 select-none"
    >
      {/* Film Grain Texture Overlay */}
      <FilmGrain />

      {/* Dynamic Animated Cinematic Vignette */}
      <motion.div 
        style={{ background: vignetteBg }}
        className="fixed inset-0 pointer-events-none z-30 select-none mix-blend-multiply transition-all duration-300"
      />

      {/* Dynamic font styling injector */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@200;300;400;500;600&display=swap');
        
        .font-serif-editorial {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }
        .font-sans-editorial {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          letter-spacing: -0.01em;
        }
        .letter-spacing-huge {
          letter-spacing: 0.18em;
        }
        .vertical-text-editorial {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

      {/* MULTI-LAYERED SUBTLE PARALLAX BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Layer 1: Elegant large floating contour geometry circle */}
        <motion.div
          style={{
            y: bgLayer1Y,
            rotate: bgLayer1Rotate,
            scale: scaleLayer1,
            opacity: layer1Opacity,
            borderColor: textContrastColor,
          }}
          className="absolute -top-[10%] -left-[10%] w-[70vw] h-[70vw] rounded-full border border-current transition-colors duration-500"
        />

        {/* Layer 2: Soft large organic light leak blur blobs that morph */}
        <motion.div
          style={{
            y: bgLayer2Y,
            scale: scaleLayer2,
            opacity: layer3Opacity,
          }}
          className="absolute top-1/3 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-neutral-500/10 to-neutral-400/5 blur-[120px]"
        />

        {/* Layer 3: Giant premium editorial typeface background watermark "INK" */}
        <motion.div
          style={{
            y: bgLayer2Y,
            rotate: bgLayer2Rotate,
            opacity: layer2Opacity,
            color: textContrastColor,
          }}
          className="absolute top-1/2 left-10 md:left-20 font-serif-editorial text-[18vw] font-light leading-none tracking-tighter italic select-none transition-colors duration-500"
        >
          INK
        </motion.div>

        {/* Layer 4: Vertical architectural coordinate indicator */}
        <motion.div
          style={{
            y: bgLayer3Y,
            opacity: layer1Opacity,
            color: textContrastColor,
          }}
          className="absolute right-32 top-1/4 font-sans-editorial text-[9px] uppercase tracking-[0.5em] vertical-text-editorial opacity-25 select-none transition-colors duration-500"
        >
          CREATION // SOVEREIGN_BLUEPRINTS
        </motion.div>

        {/* Layer 5: Concentric premium wireframe curves in the bottom half of the journey */}
        <motion.div
          style={{
            y: bgLayer3Y,
            scale: scaleLayer1,
            opacity: layer2Opacity,
            borderColor: textContrastColor,
          }}
          className="absolute bottom-[-5%] left-[5%] w-[60vw] h-[30vw] rounded-t-full border-t border-x border-current transition-colors duration-500"
        />
      </div>

      {/* MINIMAL NAVIGATION OVERLAY */}
      <motion.header 
        style={{ color: textContrastColor }}
        className="fixed top-0 inset-x-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference"
      >
        <Magnetic range={50} strength={0.32}>
          <Link 
            to="/" 
            onClick={() => triggerChime(220, 'sine', 0.3)}
            className="flex items-center gap-2 group cursor-pointer transition-opacity duration-300 hover:opacity-75"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
            <span className="font-sans-editorial text-[9px] uppercase tracking-[0.25em] font-medium">INDEX</span>
          </Link>
        </Magnetic>

        <div className="flex items-center gap-6">
          <Magnetic range={45} strength={0.28}>
            <span 
              onClick={handleTypoClick}
              className="font-serif-editorial italic text-xs tracking-widest opacity-40 hidden sm:inline cursor-pointer hover:opacity-80 active:scale-95 transition-all select-none"
              title="A silent touch"
            >
              a quiet conversation
            </span>
          </Magnetic>
          
          <Magnetic range={60} strength={0.38}>
            <button
              onClick={() => {
                const nextState = !audioActive;
                setAudioActive(nextState);
                if (nextState) {
                  playMinimalChime(392.00, 'sine', 0.8, 0.03);
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-current/10 bg-transparent font-sans-editorial text-[9px] uppercase tracking-[0.2em] transition-all hover:bg-current/[0.03] cursor-pointer"
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
                  <span>SOUNDS ACTIVE</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 opacity-40" />
                  <span>SOUND MUTED</span>
                </>
              )}
            </button>
          </Magnetic>
        </div>
      </motion.header>

      {/* PROGRESS TRACKER LINE */}
      <div className="fixed top-0 left-0 w-full h-[1px] z-50 pointer-events-none">
        <motion.div 
          style={{ 
            scaleX: scrollYProgress,
            backgroundColor: textContrastColor
          }} 
          className="h-full origin-left w-full opacity-20" 
        />
      </div>

      {/* DESIGN GRID LINES (EXTREMELY FAINT MUSAUM DETAIL) */}
      <motion.div 
        style={{ borderColor: borderContrastColor }}
        className="fixed inset-y-0 left-16 md:left-24 w-px border-l pointer-events-none z-10 opacity-50" 
      />
      <motion.div 
        style={{ borderColor: borderContrastColor }}
        className="fixed inset-y-0 right-16 md:right-24 w-px border-r pointer-events-none z-10 opacity-50" 
      />

      {/* =========================================================
          CHAPTER 01: THE OPENING (ALMOST EMPTY)
          ========================================================= */}
      <section className="relative h-[100vh] flex flex-col justify-center px-16 md:px-32 z-20">
        <BreathingContainer className="max-w-4xl space-y-4" duration={8}>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: textContrastColor }}
            className="font-sans-editorial text-[10px] uppercase tracking-[0.35em] opacity-40"
          >
            CHAPTER ONE
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: textContrastColor }}
            className="font-serif-editorial text-5xl md:text-8xl font-light tracking-tight leading-none"
          >
            <FleetingText>Hi, I’m Bibek.</FleetingText>
          </motion.h1>
        </BreathingContainer>

        {/* Quiet organic breathing background aura */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30">
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.12, 0.22, 0.12]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10, 
              ease: "easeInOut" 
            }}
            className="w-[450px] h-[450px] rounded-full bg-neutral-800/10 blur-[90px]" 
          />
        </div>

        {/* Minimal Scroll Cue */}
        <motion.div 
          style={{ color: textContrastColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-16 md:left-24 space-y-2"
        >
          <span className="font-sans-editorial text-[8px] tracking-[0.3em] uppercase block font-medium">SCROLL DOWN TO BEGIN</span>
          <div className="h-6 w-px bg-current opacity-30 origin-top animate-pulse" />
        </motion.div>
      </section>

      {/* =========================================================
          CHAPTER 02: THE SCROLL TRANSITION (WORDS REVEALING THOUGHTS)
          ========================================================= */}
      <section ref={narrativeSectionRef} className="relative h-[400vh] z-20">
        <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center overflow-hidden px-6 md:px-16 lg:px-32">
          {/* Scroll-dependent blur backdrop to create a depth of field effect */}
          <motion.div
            style={{
              backdropFilter: narrativeBlur,
              WebkitBackdropFilter: narrativeBlur,
            }}
            className="absolute inset-0 z-0 pointer-events-none"
          />

          {/* Interactive, dynamic noise subtractor particle and geometry field */}
          <NoiseSubtractorField 
            scrollProgress={smoothNarrativeScroll} 
            textContrastColor={textContrastColor} 
          />

          {/* Responsive tactile progress controller panel (visible on both desktop & mobile) */}
          <div className="fixed md:absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-auto md:left-6 md:translate-x-0 md:left-12 lg:left-16 md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col items-center gap-4 md:gap-6 z-30 select-none bg-zinc-950/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none px-6 py-3.5 md:p-0 rounded-full border border-white/5 md:border-none shadow-xl md:shadow-none transition-all duration-500">
            <motion.span 
              style={{ color: textContrastColor }}
              className="font-sans-editorial text-[8px] uppercase tracking-[0.25em] vertical-text-editorial opacity-40 select-none hidden md:block"
            >
              NARRATIVE PROGRESS
            </motion.span>
            
            <motion.div 
              style={{ backgroundColor: borderContrastColor }}
              className="h-32 w-[1.5px] relative rounded-full overflow-hidden transition-colors duration-500 hidden md:block" 
            >
              <motion.div 
                style={{ 
                  scaleY: smoothNarrativeScroll,
                  backgroundColor: textContrastColor
                }}
                className="absolute inset-x-0 top-0 origin-top h-full rounded-full transition-colors duration-500"
              />
              {/* Floating, glowing particle thumb along the timeline */}
              <motion.div
                style={{
                  top: progressY,
                  backgroundColor: textContrastColor,
                  boxShadow: "0 0 8px currentColor"
                }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-10 transition-colors duration-500"
              />
            </motion.div>

            <div className="flex flex-row md:flex-col items-center gap-5 md:gap-3.5 font-mono text-[10px] md:text-[8px] select-none">
              {['01', '02', '03', '04'].map((num, idx) => {
                const isActive = activeLine === idx;
                const thoughtTitles = ["THE BEGINNING", "A LOUD WORLD", "SILENT SANCTUARY", "THE RAW SOUL"];
                return (
                  <motion.div 
                    key={idx}
                    animate={{ 
                      scale: isActive ? 1.25 : 1,
                      opacity: isActive ? 1 : 0.25,
                    }}
                    style={{ color: textContrastColor }}
                    className="flex items-center gap-2 font-medium text-center transition-all duration-500 cursor-pointer relative group/item"
                    onClick={() => {
                      const scrollOffsets = [0.15, 0.4, 0.65, 0.9];
                      if (narrativeSectionRef.current) {
                        const targetY = narrativeSectionRef.current.offsetTop + (scrollOffsets[idx] * narrativeSectionRef.current.offsetHeight);
                        window.scrollTo({ top: targetY, behavior: 'smooth' });
                      }
                      triggerChime(293.66 + idx * 40, 'sine', 0.55, 0.015);
                    }}
                  >
                    {/* Glowing active surrounding ring */}
                    {isActive && (
                      <motion.span 
                        layoutId="activeDotRing"
                        className="absolute inset-0 -m-2 border border-current rounded-full opacity-35 animate-pulse pointer-events-none"
                        transition={{ type: "spring", stiffness: 120, damping: 15 }}
                      />
                    )}
                    
                    <span className="relative z-10 font-bold">{num}</span>
                    
                    {/* Sleek, hovering glassmorphic tooltip */}
                    <span className="hidden lg:group-hover/item:inline-block absolute left-8 pl-1 py-1.5 px-3 rounded-xl bg-zinc-950/95 text-white/95 border border-white/10 backdrop-blur-md text-[7px] uppercase tracking-widest whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl z-50">
                      {thoughtTitles[idx]}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Smooth, magnetic bottom-right floating advance-indicator button (with micro-tuned audio and buttery transitions) */}
          <motion.div
            style={{ color: textContrastColor }}
            className="absolute bottom-12 right-6 md:right-12 lg:right-16 z-20 flex flex-col items-end gap-2"
          >
            <Magnetic range={75} strength={0.45}>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  const nextLine = activeLine + 1;
                  if (nextLine < 4) {
                    const scrollOffsets = [0.15, 0.4, 0.65, 0.9];
                    if (narrativeSectionRef.current) {
                      const targetY = narrativeSectionRef.current.offsetTop + (scrollOffsets[nextLine] * narrativeSectionRef.current.offsetHeight);
                      window.scrollTo({ top: targetY, behavior: 'smooth' });
                    }
                    triggerChime(293.66 + nextLine * 45, 'triangle', 0.6, 0.018);
                  } else {
                    if (portraitSectionRef.current) {
                      window.scrollTo({ top: portraitSectionRef.current.offsetTop, behavior: 'smooth' });
                    }
                    triggerChime(587.33, 'triangle', 0.65, 0.02);
                  }
                }}
                className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-current/20 bg-current/[0.03] hover:bg-current/[0.07] hover:border-current/40 backdrop-blur-xl font-sans-editorial text-[9px] uppercase tracking-[0.25em] font-bold transition-all duration-300 cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.08)] group relative"
              >
                <span>
                  {activeLine === -1 
                    ? "01/04 • INITIATE JOURNEY" 
                    : activeLine === 3 
                      ? "DISCOVER PORTRAIT" 
                      : `0${activeLine + 2}/04 • NEXT THOUGHT`}
                </span>
                
                {/* Dynamic circular progress dial that animates as you scroll */}
                <svg className="w-4 h-4 ml-1 relative z-10 flex-shrink-0" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    className="stroke-current opacity-15"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="9"
                    className="stroke-current"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="56.54"
                    style={{
                      pathLength: smoothNarrativeScroll,
                      transformOrigin: "center",
                      rotate: -90,
                    }}
                  />
                </svg>

                <motion.span 
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-current font-bold"
                >
                  →
                </motion.span>
              </motion.button>
            </Magnetic>
            <span className="font-sans-editorial text-[7px] uppercase tracking-[0.18em] opacity-35 select-none hidden sm:block">
              OR SCROLL GENTLY
            </span>
          </motion.div>

          <motion.div
            style={{ 
              filter: motionBlurVal,
              perspective: dynamicPerspective,
              rotateX: dynamicTiltX,
              rotateY: dynamicRotate, // Horizontal 3D pivot
              skewX: dynamicSkewX,
              transformStyle: "preserve-3d" as const
            }}
            className="max-w-4xl w-full h-[360px] md:h-[260px] relative z-10 transition-transform duration-150 ease-out"
          >
            
            {/* Sentence 1 */}
            <motion.div 
              style={{ 
                z: s1Z, 
                filter: s1DOFBlur, 
                transformStyle: "preserve-3d" as const 
              }}
              className="absolute inset-0 flex flex-col justify-center space-y-1.5 md:space-y-3 pointer-events-none"
            >
              <BreathingContainer duration={6.2} className="pointer-events-auto">
                <motion.span
                  style={{
                    opacity: s1LabelOpacity,
                    y: s1LabelY,
                    color: textContrastColor
                  }}
                  className="font-sans-editorial text-[9px] uppercase tracking-[0.3em] opacity-40 block"
                >
                  A DIRECTION
                </motion.span>
                <motion.p
                  style={{
                    opacity: s1QuoteOpacity,
                    y: s1QuoteY,
                    color: textContrastColor
                  }}
                  className="font-serif-editorial text-2xl md:text-4xl lg:text-5xl font-light italic leading-tight"
                >
                  <ScatteredText text="“I never wanted to just build websites.”" isActive={activeLine === 0} isGlitching={isSelecting} />
                </motion.p>
              </BreathingContainer>
            </motion.div>
 
            {/* Sentence 2 */}
            <motion.div 
              style={{ 
                z: s2Z, 
                filter: s2DOFBlur, 
                transformStyle: "preserve-3d" as const 
              }}
              className="absolute inset-0 flex flex-col justify-center space-y-1.5 md:space-y-3 pointer-events-none"
            >
              <BreathingContainer duration={6.8} className="pointer-events-auto">
                <motion.span
                  style={{
                    opacity: s2LabelOpacity,
                    y: s2LabelY,
                    color: textContrastColor
                  }}
                  className="font-sans-editorial text-[9px] uppercase tracking-[0.3em] opacity-40 block"
                >
                  THE INTENT
                </motion.span>
                <motion.p
                  style={{
                    opacity: s2QuoteOpacity,
                    y: s2QuoteY,
                    color: textContrastColor
                  }}
                  className="font-serif-editorial text-2xl md:text-4xl lg:text-5xl font-light leading-tight"
                >
                  <ScatteredText text="“I wanted to create experiences people remember.”" isActive={activeLine === 1} isGlitching={isSelecting} />
                </motion.p>
              </BreathingContainer>
            </motion.div>
 
            {/* Sentence 3 */}
            <motion.div 
              style={{ 
                z: s3Z, 
                filter: s3DOFBlur, 
                transformStyle: "preserve-3d" as const 
              }}
              className="absolute inset-0 flex flex-col justify-center space-y-1.5 md:space-y-3 pointer-events-none"
            >
              <BreathingContainer duration={7.4} className="pointer-events-auto">
                <motion.span
                  style={{
                    opacity: s3LabelOpacity,
                    y: s3LabelY,
                    color: textContrastColor
                  }}
                  className="font-sans-editorial text-[9px] uppercase tracking-[0.3em] opacity-40 block"
                >
                  THE MEDIUM
                </motion.span>
                <motion.p
                  style={{
                    opacity: s3QuoteOpacity,
                    y: s3QuoteY,
                    color: textContrastColor
                  }}
                  className="font-serif-editorial text-2xl md:text-4xl lg:text-5xl font-light italic leading-tight"
                >
                  <ScatteredText text="“Software is not just logic. It is a canvas of light, pace, and respect.”" isActive={activeLine === 2} isGlitching={isSelecting} />
                </motion.p>
              </BreathingContainer>
            </motion.div>
 
            {/* Sentence 4 */}
            <motion.div 
              style={{ 
                z: s4Z, 
                filter: s4DOFBlur, 
                transformStyle: "preserve-3d" as const 
              }}
              className="absolute inset-0 flex flex-col justify-center space-y-1.5 md:space-y-3 pointer-events-none"
            >
              <BreathingContainer duration={8} className="pointer-events-auto">
                <motion.span
                  style={{
                    opacity: s4LabelOpacity,
                    y: s4LabelY,
                    color: textContrastColor
                  }}
                  className="font-sans-editorial text-[9px] uppercase tracking-[0.3em] opacity-40 block"
                >
                  THE CONVICTION
                </motion.span>
                <motion.p
                  style={{
                    opacity: s4QuoteOpacity,
                    y: s4QuoteY,
                    color: textContrastColor
                  }}
                  className="font-serif-editorial text-2xl md:text-4xl lg:text-5xl font-light leading-tight"
                >
                  <ScatteredText text="“Subtracting noise until the raw soul of the idea emerges.”" isActive={activeLine === 3} isGlitching={isSelecting} />
                </motion.p>
              </BreathingContainer>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* =========================================================
          CHAPTER 03: THE PHOTOGRAPHY EXPERIENCE (ART PORTRAIT)
          ========================================================= */}
      <section ref={portraitSectionRef} className="relative min-h-[180vh] flex flex-col justify-center px-16 md:px-32 py-40 z-20">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Magazine Left Column: Spoken prose */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4 }}
              style={{ color: textContrastColor }}
              className="space-y-6"
            >
              <BreathingContainer duration={7.2}>
                <p className="font-sans-editorial text-[9px] uppercase tracking-[0.3em] opacity-40">CHAPTER TWO // PORTRAIT</p>
                
                <h3 className="font-serif-editorial text-4xl font-light italic tracking-tight leading-none">
                  <FleetingText>The friction between what is, <br /> and what could be.</FleetingText>
                </h3>
                
                <p className="font-sans-editorial text-xs md:text-sm text-current/60 leading-relaxed font-light">
                  Every line of code I craft is driven by an ongoing obsession with human friction. Modern software is often loud, demanding attention. We try to design quiet anchors instead.
                </p>

                <div className="pt-6 border-t border-current/10 max-w-xs space-y-2">
                  <span className="font-sans-editorial text-[8px] uppercase tracking-[0.25em] opacity-35 block">ART DIRECTION COORDINATE</span>
                  <span className="font-serif-editorial italic text-xs text-current/50 block">45.09 // Mono-Grayscale Composite</span>
                </div>
              </BreathingContainer>
            </motion.div>
          </div>

          {/* Art composition: overlapping magazine panels */}
          <div className="lg:col-span-7 relative flex justify-center items-center h-[550px] order-1 lg:order-2">
            
            {/* Main elegant clip-masked portrait */}
            <motion.div 
              style={{ y: imgParallaxY, scale: imgScale, clipPath: portraitMask1 }}
              className="w-72 h-96 bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10"
            >
              <div className="absolute inset-0 bg-neutral-900/10 z-10" />
              <img 
                src={bibekPortrait} 
                alt="Bibek Bista Portrait" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 z-20 text-white font-sans-editorial text-[8px] uppercase tracking-[0.2em] bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                Portrait of obsessions
              </div>
            </motion.div>

            {/* Overlapping background abstract textures representing raw material craft */}
            <motion.div 
              style={{ y: secondImgY, clipPath: portraitMask2 }}
              className="absolute -right-2 top-20 w-48 h-64 bg-zinc-800 rounded-2xl overflow-hidden shadow-lg z-0 opacity-45 hidden sm:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                alt="Abstract sculpture" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>

            {/* Subtle background coordinates text */}
            <motion.div 
              style={{ color: textContrastColor }}
              className="absolute -left-12 bottom-12 font-sans-editorial text-[10px] uppercase tracking-[0.4em] opacity-10 vertical-text-editorial hidden xl:block"
            >
              ORIGIN // GRAPHICBlueprints
            </motion.div>
          </div>

        </div>
      </section>

      {/* =========================================================
          CHAPTER 04: THE CREATOR STORY (CINEMATIC MOMENTS)
          ========================================================= */}
      <section className="relative min-h-[160vh] flex flex-col justify-center px-16 md:px-32 py-40 z-20">
        <div className="max-w-4xl space-y-16">
          <BreathingContainer className="space-y-3" duration={7.6}>
            <motion.p className="font-sans-editorial text-[9px] uppercase tracking-[0.3em] opacity-40" style={{ color: textContrastColor }}>CHAPTER THREE</motion.p>
            <motion.h2 className="font-serif-editorial text-4xl md:text-6xl font-light" style={{ color: textContrastColor }}>
              <FleetingText>Fragments from a journey</FleetingText>
            </motion.h2>
          </BreathingContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 gap-y-16">
            {[
              { label: 'A MEMORY', text: 'At 3 AM, watching a single pixel slide across a custom spring hook. That was when I learned software can feel living, organic, and respiratory.' },
              { label: 'A MISTAKE', text: 'Chasing metrics and noisy screens in my early years. I forgot that behind every browser viewport is a human eye seeking simplicity.' },
              { label: 'AN OBSESSION', text: 'The precise delay before an elegant dropdown opens, the exact speed of a slide transition. These are gestures of pure respect.' },
              { label: 'A LESSON', text: 'Subtracting layout noise until only the core soul remains. True visual luxury is defined by what you choose to leave out.' }
            ].map((fragment, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, delay: idx * 0.1 }}
                style={{ color: textContrastColor }}
                onClick={() => triggerChime(260 + idx * 40, 'triangle', 0.4)}
                className="p-8 border-l border-current/10 space-y-4 hover:border-current/30 transition-colors duration-300 cursor-pointer"
              >
                <span className="font-sans-editorial text-[8px] uppercase tracking-[0.3em] opacity-45">{fragment.label}</span>
                <p className="font-serif-editorial text-lg md:text-xl font-light italic leading-relaxed text-current/80">
                  <FleetingText>“{fragment.text}”</FleetingText>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CHAPTER 05: THE INK MOMENT (BACKGROUND TRANSITIONS TO WHITE)
          ========================================================= */}
      <section className="relative min-h-[160vh] flex flex-col justify-center px-16 md:px-32 py-40 z-20">
        <div className="w-full max-w-5xl mx-auto space-y-16">
          
          <BreathingContainer className="space-y-4 max-w-2xl" duration={8.2}>
            <motion.p 
              style={{ color: textContrastColor }}
              className="font-sans-editorial text-[9px] uppercase tracking-[0.3em] opacity-40"
            >
              CHAPTER FOUR // ORIGINS
            </motion.p>
            <motion.h2 
              style={{ color: textContrastColor }}
              className="font-serif-editorial text-4xl md:text-7xl font-light tracking-tight leading-none"
            >
              <FleetingText>The Creation <br /> <span className="italic">of INK</span></FleetingText>
            </motion.h2>
          </BreathingContainer>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            <BreathingContainer className="lg:col-span-6 space-y-8" duration={7.8}>
              <motion.p 
                style={{ color: textContrastColor }}
                className="font-serif-editorial text-xl md:text-2xl font-light leading-relaxed text-current/80 italic"
              >
                <FleetingText>“INK was born from a quiet rebellion. A response to an internet that became crowded, distracting, and loud.”</FleetingText>
              </motion.p>

              <motion.p 
                style={{ color: textContrastColor }}
                className="font-sans-editorial text-xs md:text-sm text-current/60 leading-relaxed font-light"
              >
                Instead of flashing notification bars, marketing popups, and trackable scripts, I imagined a sanctuary. A beautiful digital canvas where human ideas could breathe and expand in total silence.
              </motion.p>

              <motion.p 
                style={{ color: textContrastColor }}
                className="font-sans-editorial text-xs md:text-sm text-current/60 leading-relaxed font-light"
              >
                Developing INK was an exercise in absolute subtraction. No unnecessary files. No over-engineered database packages. A resilient core designed with complete elegance.
              </motion.p>
            </BreathingContainer>

            {/* Overlapping abstract editorial design mock */}
            <div className="lg:col-span-6 relative flex justify-center items-center min-h-[400px]">
              <motion.div 
                style={{ scale: 0.98 }}
                className="w-full h-80 rounded-[2.5rem] bg-zinc-900 overflow-hidden shadow-2xl relative"
              >
                {/* Visual rendering of minimalist notebook paper layout */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between text-white/90">
                  <div className="flex justify-between items-center border-b border-white/15 pb-4 font-sans-editorial text-[9px] uppercase tracking-widest opacity-60">
                    <span>INK WRITING PLATFORM</span>
                    <span>EST. 2026</span>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="font-serif-editorial italic text-2xl md:text-3xl font-light">"A place for raw, unedited thoughts."</p>
                    <div className="h-[1px] w-20 bg-white/30" />
                  </div>

                  <div className="flex justify-between items-end font-sans-editorial text-[8px] uppercase tracking-widest opacity-40">
                    <span>SOCIALLY SECURE</span>
                    <span>MINIMALIST ANCHOR</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-neutral-900/10 pointer-events-none" />
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Raw ink flow" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-30 pointer-events-none"
                />
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          CHAPTER 06: THE BELIEF MOMENT (MASSIVE TYPOGRAPHY WORDS)
          ========================================================= */}
      <section className="relative min-h-[180vh] flex flex-col justify-center px-16 md:px-32 py-40 z-20">
        <BreathingContainer className="w-full max-w-5xl mx-auto space-y-12 mb-20 text-center" duration={7.5}>
          <motion.span className="font-sans-editorial text-[9px] uppercase tracking-[0.3em] opacity-40" style={{ color: textContrastColor }}>CHAPTER FIVE</motion.span>
          <motion.h2 className="font-serif-editorial text-4xl md:text-6xl font-light" style={{ color: textContrastColor }}>
            <FleetingText>The Pillars of Belief</FleetingText>
          </motion.h2>
          <p className="font-sans-editorial text-xs text-current/50 max-w-sm mx-auto">Select any value pillar to manifest its design code quotation in real-time.</p>
        </BreathingContainer>

        {/* Floating cinematic words in grid block layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
          {[
            { id: 'curiosity', word: 'CURIOSITY', desc: 'Push layouts to discover visual canvas boundaries.' },
            { id: 'craft', word: 'CRAFT', desc: 'Pixel symmetry, border weights, and fluid springs are acts of respect.' },
            { id: 'patience', word: 'PATIENCE', desc: 'Allowing ideas to mature organically in complete workspace focus.' },
            { id: 'creativity', word: 'CREATIVITY', desc: 'Render web pages not as sheets, but as beautiful art exhibitions.' },
            { id: 'consistency', word: 'CONSISTENCY', desc: 'Maintain perfect execution across invisible details.' },
            { id: 'impact', word: 'IMPACT', desc: 'Constructing secure, private workspaces that honor user attention.' }
          ].map((item, index) => {
            const isActive = activePhilosophy === item.id;
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setActivePhilosophy(isActive ? null : item.id);
                  triggerChime(300 + index * 50, 'sine', 0.8, 0.02);
                  if (item.id === 'craft') {
                    fireConfetti();
                  }
                }}
                className={`p-10 rounded-[2rem] border transition-all duration-500 cursor-pointer text-left space-y-6 ${
                  isActive 
                    ? 'bg-neutral-900 border-neutral-800 text-white shadow-2xl' 
                    : 'bg-transparent border-current/10 text-current hover:border-current/30'
                }`}
              >
                <div className="flex justify-between items-center font-sans-editorial text-[9px] tracking-widest opacity-40">
                  <span>PILLAR_0{index + 1}</span>
                  <Sparkles className={`w-3 h-3 ${isActive ? 'text-neutral-400 animate-spin' : 'opacity-20'}`} />
                </div>

                <h3 className="font-serif-editorial text-3xl md:text-4xl font-light tracking-wide">
                  <FleetingText>{item.word}</FleetingText>
                </h3>
                
                <p className="font-sans-editorial text-xs leading-relaxed opacity-60 font-light">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          CHAPTER 07: THE PERSONAL MESSAGE & EASTER EGG (BREAKING THE 4TH WALL)
          ========================================================= */}
      <section className="relative min-h-[140vh] flex flex-col justify-center px-16 md:px-32 py-40 z-20">
        <BreathingContainer className="max-w-3xl mx-auto space-y-8 text-center" duration={8}>
          <motion.span className="font-sans-editorial text-[9px] uppercase tracking-[0.35em] opacity-40 block" style={{ color: textContrastColor }}>CHAPTER SIX</motion.span>
          
          <motion.h2 className="font-serif-editorial text-4xl md:text-6xl font-light" style={{ color: textContrastColor }}>
            <FleetingText>Let’s speak honestly.</FleetingText>
          </motion.h2>

          <motion.p className="font-serif-editorial text-xl md:text-2xl font-light italic leading-relaxed text-current/80" style={{ color: textContrastColor }}>
            <FleetingText>“Behind every viewport, every spring transition, and every written word, there is simply another person seeking meaning.”</FleetingText>
          </motion.p>

          <motion.p className="font-sans-editorial text-xs md:text-sm text-current/60 leading-relaxed max-w-xl mx-auto font-light" style={{ color: textContrastColor }}>
            I built this space for you. If you scrolled this far, you are not just a user in an analytics dashboard. You are a person who appreciates craft. Tap my signature coordinates 5 times below to bypass the system.
          </motion.p>

          {/* Elegant Easter Egg Trigger Point */}
          <div className="pt-12">
            <Magnetic range={70} strength={0.4}>
              <motion.button
                onClick={handleEggClick}
                className="px-6 py-3 rounded-full border border-current/10 font-sans-editorial text-[9px] uppercase tracking-[0.25em] transition-all hover:bg-current/[0.04] cursor-pointer"
                style={{ color: textContrastColor }}
              >
                BIBEK.BISTA // SECURE_CORE // {eggCount}/5 TAPS
              </motion.button>
            </Magnetic>
          </div>
        </BreathingContainer>
      </section>

      {/* =========================================================
          EASTER EGG MODAL (PREMIUM POPUP NOTE)
          ========================================================= */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-xl border border-white/10 bg-zinc-950 p-8 md:p-12 rounded-[2.5rem] text-left space-y-6 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-8">
                <Magnetic range={40} strength={0.25}>
                  <button 
                    onClick={() => {
                      setShowEasterEgg(false);
                      setEggCount(0);
                      triggerChime(196, 'sine', 0.4);
                    }}
                    className="font-sans-editorial text-[9px] text-white/40 uppercase tracking-[0.2em] hover:text-white cursor-pointer"
                  >
                    [ CLOSE ]
                  </button>
                </Magnetic>
              </div>

              <span className="font-sans-editorial text-[8px] text-neutral-500 uppercase tracking-[0.3em]">DECRYPTED TRANSCRIPT</span>

              <h4 className="font-serif-editorial text-3xl text-white font-light italic">
                A personal message.
              </h4>

              <div className="space-y-4 font-sans-editorial text-xs md:text-sm text-white/70 font-light leading-relaxed">
                <p>
                  To the curiosity-seeker: Thank you for taking the time to explore this space. It proves that there is still a deep hunger for craftsmanship, patience, and visual discipline on the web.
                </p>
                <p>
                  So much of what we do in tech is transactional. But creating is an emotional gesture. My hope is that whatever you build next, you do so with an unyielding respect for the human on the other side.
                </p>
                <p className="font-serif-editorial italic text-white/50 text-base pt-4">
                  With sincerity, <br />
                  Bibek Bista
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          SECRET PHILOSOPHICAL QUOTE (TYPOGRAPHIC EASTER EGG)
          ========================================================= */}
      <AnimatePresence>
        {showSecretQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-x-4 bottom-12 md:bottom-20 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-xl z-50 p-8 rounded-[2rem] bg-zinc-950/95 border border-white/10 shadow-2xl backdrop-blur-xl text-center space-y-4"
          >
            <div className="flex justify-center items-center gap-2 font-sans-editorial text-[8px] text-neutral-500 uppercase tracking-[0.3em]">
              <Sparkles className="w-3 h-3 text-neutral-400 animate-pulse" />
              <span>A MOMENT OF REVELATION</span>
              <Sparkles className="w-3 h-3 text-neutral-400 animate-pulse" />
            </div>

            <p className="font-serif-editorial text-xl md:text-2xl font-light italic leading-relaxed text-white">
              “In the rush of creation, we often forget that stillness is the greatest designer. The most profound statements are written in silent, empty spaces.”
            </p>

            <p className="font-sans-editorial text-[8px] text-neutral-500 uppercase tracking-[0.2em]">
              THIS MOMENT WILL DISSOLVE SECURELY IN A FEW SECONDS
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          CHAPTER 08: THE ENDING (SILENCE)
          ========================================================= */}
      <section className="relative h-[100vh] flex flex-col justify-center items-center px-16 md:px-32 z-20 text-center">
        <div className="max-w-2xl space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 2.5 }}
            style={{ color: textContrastColor }}
            className="space-y-6"
          >
            <p className="font-serif-editorial text-2xl md:text-4xl font-light italic opacity-95">
              <FleetingText>“Everything you’ve seen here started as a small idea.”</FleetingText>
            </p>
            
            <p className="font-serif-editorial text-base md:text-xl font-light text-current/40">
              <FleetingText>Maybe yours will too.</FleetingText>
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          VINTAGE ANALOG DEPTH METER OVERLAY
          ========================================================= */}
      <motion.div
        style={{ 
          color: textContrastColor,
          borderColor: borderContrastColor,
        }}
        className="fixed bottom-8 right-8 z-40 p-3 rounded-2xl border bg-neutral-900/10 dark:bg-neutral-50/5 backdrop-blur-md shadow-lg flex flex-col items-center justify-center group pointer-events-auto transition-transform hover:scale-105 active:scale-95 duration-300"
      >
        {/* Analog Instrument Gauge Container */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Subtle Outer Bezel Rim */}
          <div className="absolute inset-0 rounded-full border border-current/10" />
          <div className="absolute inset-1 rounded-full border border-current/5" />
          
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Outer Circular Track Arc */}
            <path
              d="M 18 78 A 38 38 0 1 1 82 78"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
              className="opacity-20"
            />
            
            {/* Ticks & Sub-ticks */}
            {Array.from({ length: 25 }).map((_, i) => {
              const angle = -120 + (i * 10);
              const isMajor = i % 6 === 0;
              const tickLength = isMajor ? 6 : 3;
              const r1 = 38;
              const r2 = 38 - tickLength;
              const rad = (angle - 90) * Math.PI / 180;
              const x1 = 50 + r1 * Math.cos(rad);
              const y1 = 50 + r1 * Math.sin(rad);
              const x2 = 50 + r2 * Math.cos(rad);
              const y2 = 50 + r2 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="currentColor"
                  strokeWidth={isMajor ? 1.2 : 0.6}
                  className={isMajor ? "opacity-50" : "opacity-30"}
                />
              );
            })}

            {/* Numerical Labels on Dial */}
            {[-120, -60, 0, 60, 120].map((angle, idx) => {
              const labelValues = ["0", "2.5", "5.0", "7.5", "10"];
              const rad = (angle - 90) * Math.PI / 180;
              const r = 26;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad) + 2;
              return (
                <text
                  key={idx}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fontSize="5.5"
                  className="font-mono text-[5.5px] fill-current opacity-60 font-medium tracking-tight"
                >
                  {labelValues[idx]}
                </text>
              );
            })}

            {/* Instrument Text Labels */}
            <text
              x="50"
              y="68"
              textAnchor="middle"
              fontSize="5"
              className="font-mono text-[5px] fill-current opacity-40 uppercase tracking-[0.2em]"
            >
              DEPTH METER
            </text>

            <text
              x="50"
              y="74"
              textAnchor="middle"
              fontSize="4"
              className="font-mono text-[4px] fill-current opacity-35 uppercase tracking-[0.1em]"
            >
              x1000m
            </text>

            {/* Simulated Glass Reflection Highlight */}
            <path
              d="M 22 28 A 38 38 0 0 1 78 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="opacity-10"
              strokeDasharray="4 8"
            />

            {/* Mechanical Counter Window Box */}
            <rect
              x="36"
              y="78"
              width="28"
              height="10"
              rx="1.5"
              fill="currentColor"
              className="opacity-5"
            />
            <rect
              x="36"
              y="78"
              width="28"
              height="10"
              rx="1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="opacity-15"
            />
            
            {/* Counter Text inside Box */}
            <text
              x="50"
              y="85"
              textAnchor="middle"
              fontSize="6.5"
              className="font-mono text-[6.5px] fill-current font-semibold tracking-wider opacity-85"
            >
              {(scrollPercent).toString().padStart(3, '0')}%
            </text>

            {/* Vintage Analog Rotating Needle */}
            <motion.g style={{ rotate: needleRotation, originX: "50px", originY: "50px" }}>
              {/* Premium tapered design / pointer shadow line */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="14"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="opacity-90"
              />
              {/* Fine pointer tip detail */}
              <circle
                cx="50"
                cy="14"
                r="1"
                className="fill-current"
              />
              {/* Counterweight Tail */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="58"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="opacity-45"
              />
            </motion.g>

            {/* Solid Center Brass Boss Cap */}
            <circle
              cx="50"
              cy="50"
              r="4"
              fill="currentColor"
              className="opacity-95"
            />
            <circle
              cx="50"
              cy="50"
              r="1.8"
              className="fill-neutral-950 dark:fill-neutral-50"
            />
          </svg>

          {/* Vacuum Tube / Indicator Light in top corner of widget frame */}
          <div className="absolute top-1 right-1 flex items-center justify-center">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
            </span>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
