import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { usePerformanceSettings } from '../lib/performance';

interface Shape {
  id: number;
  type: 'circle' | 'ring' | 'triangle' | 'square' | 'pill' | 'star';
  size: number;
  color: string;
  top: string;
  left: string;
  parallaxFactor: number; // multiplier for mouse movement offset
  baseRotation: number;
  floatDuration: number;
}

const SHAPES: Shape[] = [
  // Top Left Area
  { id: 1, type: 'circle', size: 120, color: 'bg-primary/10 blur-[1px]', top: '15%', left: '10%', parallaxFactor: 0.03, baseRotation: 0, floatDuration: 18 },
  { id: 2, type: 'ring', size: 60, color: 'border-accent/30', top: '25%', left: '25%', parallaxFactor: -0.04, baseRotation: 45, floatDuration: 14 },
  
  // Top Right Area
  { id: 3, type: 'pill', size: 80, color: 'bg-secondary/20', top: '12%', left: '75%', parallaxFactor: 0.02, baseRotation: -25, floatDuration: 22 },
  { id: 4, type: 'star', size: 45, color: 'text-accent/40', top: '28%', left: '85%', parallaxFactor: -0.06, baseRotation: 15, floatDuration: 16 },

  // Mid Left Area
  { id: 5, type: 'triangle', size: 70, color: 'text-primary/20', top: '48%', left: '8%', parallaxFactor: -0.03, baseRotation: 60, floatDuration: 20 },
  { id: 6, type: 'circle', size: 200, color: 'bg-accent/10 blur-[4px]', top: '55%', left: '22%', parallaxFactor: 0.015, baseRotation: 0, floatDuration: 25 },

  // Mid Right Area
  { id: 7, type: 'square', size: 55, color: 'border-primary/20', top: '45%', left: '80%', parallaxFactor: 0.05, baseRotation: 120, floatDuration: 19 },
  { id: 8, type: 'ring', size: 110, color: 'border-secondary/40', top: '62%', left: '70%', parallaxFactor: -0.025, baseRotation: -45, floatDuration: 17 },

  // Bottom Area
  { id: 9, type: 'pill', size: 90, color: 'bg-accent/15', top: '80%', left: '15%', parallaxFactor: 0.04, baseRotation: 35, floatDuration: 21 },
  { id: 10, type: 'star', size: 50, color: 'text-primary/30', top: '85%', left: '82%', parallaxFactor: -0.05, baseRotation: -15, floatDuration: 15 },
];

const AMBIENT_PRESETS = [
  // 0: Hero - Soft pink/peach & lavender
  {
    color1: 'rgba(255, 139, 167, 0.18)',
    color2: 'rgba(195, 174, 214, 0.16)',
    color3: 'rgba(254, 207, 239, 0.15)',
    color4: 'rgba(141, 211, 244, 0.14)',
    scale: 1.0,
    x1: '-15%', y1: '-10%',
    x2: '20%', y2: '15%',
    x3: '10%', y3: '-15%',
    x4: '-10%', y4: '20%'
  },
  // 1: About / Problem - Cool mint & soft rose
  {
    color1: 'rgba(149, 225, 211, 0.16)',
    color2: 'rgba(255, 139, 167, 0.12)',
    color3: 'rgba(180, 215, 250, 0.15)',
    color4: 'rgba(253, 230, 150, 0.11)',
    scale: 1.12,
    x1: '15%', y1: '20%',
    x2: '-20%', y2: '-15%',
    x3: '-10%', y3: '15%',
    x4: '20%', y4: '-10%'
  },
  // 2: How It Works - Warm golden champagne & lilac
  {
    color1: 'rgba(252, 227, 138, 0.16)',
    color2: 'rgba(232, 219, 252, 0.18)',
    color3: 'rgba(253, 160, 133, 0.12)',
    color4: 'rgba(180, 240, 210, 0.14)',
    scale: 1.05,
    x1: '-25%', y1: '10%',
    x2: '15%', y2: '-20%',
    x3: '20%', y3: '10%',
    x4: '-15%', y4: '-15%'
  },
  // 3: Features - Electric blossom & violet hue
  {
    color1: 'rgba(132, 250, 176, 0.15)',
    color2: 'rgba(143, 211, 244, 0.18)',
    color3: 'rgba(195, 174, 214, 0.18)',
    color4: 'rgba(255, 182, 193, 0.14)',
    scale: 1.18,
    x1: '25%', y1: '-15%',
    x2: '-15%', y2: '25%',
    x3: '-20%', y3: '-10%',
    x4: '15%', y4: '20%'
  },
  // 4: FAQ / Premium / Footer - Amber sunset & fresh teal
  {
    color1: 'rgba(255, 139, 167, 0.18)',
    color2: 'rgba(252, 227, 138, 0.15)',
    color3: 'rgba(252, 182, 159, 0.14)',
    color4: 'rgba(130, 220, 225, 0.12)',
    scale: 1.22,
    x1: '-10%', y1: '30%',
    x2: '25%', y2: '5%',
    x3: '15%', y3: '-20%',
    x4: '-20%', y4: '10%'
  }
];

interface ParallaxShapeProps {
  shape: Shape;
  smoothX: any;
  smoothY: any;
  disableAnimation?: boolean;
}

function ParallaxShapeComponent({ shape, smoothX, smoothY, disableAnimation = false }: ParallaxShapeProps) {
  // Calculate dynamic springy translation offsets based on shape parallaxFactor
  const translateX = useTransform(smoothX, (x: number) => x * shape.parallaxFactor * 400);
  const translateY = useTransform(smoothY, (y: number) => y * shape.parallaxFactor * 400);

  return (
    <motion.div
      className="absolute transform-gpu"
      style={{
        top: shape.top,
        left: shape.left,
        width: shape.size,
        height: shape.size,
        x: translateX,
        y: translateY,
      }}
    >
      <motion.div
        className="w-full h-full"
        animate={disableAnimation ? {
          rotate: shape.baseRotation
        } : {
          x: [0, 18, -12, 0],
          y: [0, -22, 14, 0],
          rotate: [shape.baseRotation, shape.baseRotation + 360],
        }}
        transition={disableAnimation ? {} : {
          x: {
            duration: shape.floatDuration * 1.35,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: shape.floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: shape.floatDuration * 2.5,
            repeat: Infinity,
            ease: "linear",
          }
        }}
      >
        {shape.type === 'circle' && (
          <div className={`w-full h-full rounded-full ${shape.color}`} />
        )}

        {shape.type === 'ring' && (
          <div className={`w-full h-full rounded-full border-2 border-dashed ${shape.color}`} />
        )}

        {shape.type === 'square' && (
          <div className={`w-full h-full border-2 rounded-xl ${shape.color}`} />
        )}

        {shape.type === 'pill' && (
          <div className={`w-full h-[50%] rounded-full ${shape.color} rotate-45`} />
        )}

        {shape.type === 'triangle' && (
          <svg viewBox="0 0 100 100" className={`w-full h-full ${shape.color}`} fill="currentColor">
            <polygon points="50,15 90,85 10,85" />
          </svg>
        )}

        {shape.type === 'star' && (
          <svg viewBox="0 0 24 24" className={`w-full h-full ${shape.color}`} fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}

const ParallaxShape = React.memo(ParallaxShapeComponent);
ParallaxShape.displayName = 'ParallaxShape';

interface DustParticle {
  id: number;
  size: number;
  left: string;
  top: string;
  baseSpeed: number;
  delay: number;
}

const DUST_PARTICLES: DustParticle[] = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2, // 2px to 6px (smaller is more efficient to draw)
  left: `${Math.random() * 95}%`,
  top: `${Math.random() * 95}%`,
  baseSpeed: Math.random() * 10 + 8,
  delay: Math.random() * -15,
}));

function DustParticleComponent({ particle }: { particle: DustParticle }) {
  return (
    <motion.div
      className="absolute bg-primary/20 rounded-full pointer-events-none transform-gpu"
      style={{
        left: particle.left,
        top: particle.top,
        width: particle.size,
        height: particle.size,
        opacity: 0.2,
      }}
      animate={{
        y: [0, -40, 0],
        x: [0, 15, -15, 0],
      }}
      transition={{
        y: {
          duration: particle.baseSpeed,
          repeat: Infinity,
          ease: "easeInOut",
          delay: particle.delay,
        },
        x: {
          duration: particle.baseSpeed * 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: particle.delay,
        }
      }}
    />
  );
}

const DustParticle = React.memo(DustParticleComponent);
DustParticle.displayName = 'DustParticle';

export function ParallaxBackground() {
  const { quality } = usePerformanceSettings();
  const [activeSection, setActiveSection] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // High-performance frame throttled mousemove handler (prevents event storming)
    let frameId: number | null = null;
    const handleMouseMove = (event: MouseEvent) => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const normX = (event.clientX / innerWidth) - 0.5;
        const normY = (event.clientY / innerHeight) - 0.5;

        mouseX.set(normX);
        mouseY.set(normY);
        frameId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const sections = Array.from(document.querySelectorAll('section'));
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: 0,
    };

    const intersectionMap = new Map<Element, boolean>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        intersectionMap.set(entry.target, entry.isIntersecting);
      });

      for (let i = 0; i < sections.length; i++) {
        if (intersectionMap.get(sections[i])) {
          setActiveSection(i);
          break;
        }
      }
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId) cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  const preset = AMBIENT_PRESETS[Math.min(activeSection, AMBIENT_PRESETS.length - 1)] || AMBIENT_PRESETS[0];

  // REDUCED MOTION (Level 0): Static neutral theme background, no animations, no particles, no shapes
  if (quality === 0) {
    return (
      <div className="fixed inset-0 pointer-events-none select-none z-0 bg-background" />
    );
  }

  // LOW QUALITY / POWER SAVER (Level 1): Zero-cost CSS radial gradients with smooth transition, no GPU compositing, no particle layers, no float layers
  if (quality === 1) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none select-none z-0 bg-background transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 15% 15%, ${preset.color1} 0%, transparent 45%),
                       radial-gradient(circle at 85% 85%, ${preset.color2} 0%, transparent 45%)`
        }}
      />
    );
  }

  // BALANCED QUALITY (Level 2): Static high-performance gradient, reduced particles (6), reduced shapes (4) with mouse parallax but no rotating float loops
  if (quality === 2) {
    return (
      <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-background">
        <div 
          className="absolute inset-0 z-[-2] transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at 12% 12%, ${preset.color1} 0%, transparent 45%),
                         radial-gradient(circle at 88% 88%, ${preset.color2} 0%, transparent 45%),
                         radial-gradient(circle at 82% 18%, ${preset.color3} 0%, transparent 40%),
                         radial-gradient(circle at 18% 82%, ${preset.color4} 0%, transparent 40%)`
          }}
        />
        {SHAPES.slice(0, 4).map((shape) => (
          <ParallaxShape
            key={shape.id}
            shape={shape}
            smoothX={smoothX}
            smoothY={smoothY}
            disableAnimation={true}
          />
        ))}
        {DUST_PARTICLES.slice(0, 6).map((particle) => (
          <DustParticle
            key={particle.id}
            particle={particle}
          />
        ))}
      </div>
    );
  }

  // PREMIUM QUALITY (Level 3): Full slow rotating master container, all shapes (10), full particles (12) and animated organic fluid blobs with custom blur filters
  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-background">
      {/* 1. Slow rotating master ambient aura container */}
      <motion.div
        className="absolute inset-0 z-[-2] transform-gpu will-change-transform"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 160, // Slower is more cinematic and reduces GPU compute cycles
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Living Blob 1 (Top Left Focus) */}
        <motion.div
          className="absolute opacity-70 mix-blend-multiply transform-gpu will-change-transform"
          animate={{
            x: preset.x1,
            y: preset.y1,
            scale: [preset.scale * 1, preset.scale * 1.15, preset.scale * 0.95, preset.scale * 1.05, preset.scale * 1],
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 50% 60% 40% 60%",
              "50% 50% 50% 50% / 50% 50% 50% 50%",
              "40% 60% 70% 30% / 40% 50% 60% 50%"
            ],
            backgroundColor: preset.color1,
          }}
          transition={{
            x: { type: "spring", stiffness: 20, damping: 15, mass: 1.2 },
            y: { type: "spring", stiffness: 20, damping: 15, mass: 1.2 },
            backgroundColor: { duration: 1.5 },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
            borderRadius: { duration: 16, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            width: '65vw',
            height: '65vw',
            maxWidth: '800px',
            maxHeight: '800px',
            left: '5%',
            top: '10%',
            filter: 'blur(120px)', // Slightly reduced blur to optimize rasterization
          }}
        />

        {/* Living Blob 2 (Bottom Right Focus) */}
        <motion.div
          className="absolute opacity-65 mix-blend-multiply transform-gpu will-change-transform"
          animate={{
            x: preset.x2,
            y: preset.y2,
            scale: [preset.scale * 0.9, preset.scale * 1.05, preset.scale * 0.85, preset.scale * 1.0, preset.scale * 0.9],
            borderRadius: [
              "50% 50% 50% 50% / 50% 50% 50% 50%",
              "40% 60% 30% 70% / 60% 40% 70% 30%",
              "60% 40% 70% 30% / 50% 60% 40% 50%",
              "50% 50% 50% 50% / 50% 50% 50% 50%"
            ],
            backgroundColor: preset.color2,
          }}
          transition={{
            x: { type: "spring", stiffness: 20, damping: 15, mass: 1.2 },
            y: { type: "spring", stiffness: 20, damping: 15, mass: 1.2 },
            backgroundColor: { duration: 1.5 },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            borderRadius: { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            width: '60vw',
            height: '60vw',
            maxWidth: '700px',
            maxHeight: '700px',
            right: '8%',
            bottom: '5%',
            filter: 'blur(120px)',
          }}
        />

        {/* Living Blob 3 (Top Right Focus) */}
        <motion.div
          className="absolute opacity-60 mix-blend-multiply transform-gpu will-change-transform"
          animate={{
            x: preset.x3,
            y: preset.y3,
            scale: [preset.scale * 0.8, preset.scale * 1.0, preset.scale * 0.9, preset.scale * 1.1, preset.scale * 0.8],
            borderRadius: [
              "60% 40% 30% 70% / 50% 60% 40% 60%",
              "50% 50% 50% 50% / 50% 50% 50% 50%",
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 50% 60% 40% 60%"
            ],
            backgroundColor: preset.color3,
          }}
          transition={{
            x: { type: "spring", stiffness: 20, damping: 15, mass: 1.2 },
            y: { type: "spring", stiffness: 20, damping: 15, mass: 1.2 },
            backgroundColor: { duration: 1.5 },
            scale: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            borderRadius: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            width: '55vw',
            height: '55vw',
            maxWidth: '650px',
            maxHeight: '650px',
            right: '10%',
            top: '15%',
            filter: 'blur(100px)',
          }}
        />

        {/* Living Blob 4 (Bottom Left Focus) */}
        <motion.div
          className="absolute opacity-65 mix-blend-multiply transform-gpu will-change-transform"
          animate={{
            x: preset.x4,
            y: preset.y4,
            scale: [preset.scale * 0.85, preset.scale * 0.95, preset.scale * 1.05, preset.scale * 0.8, preset.scale * 0.85],
            borderRadius: [
              "40% 60% 50% 50% / 50% 40% 60% 50%",
              "50% 50% 50% 50% / 50% 50% 50% 50%",
              "60% 40% 50% 50% / 40% 60% 50% 50%",
              "40% 60% 50% 50% / 50% 40% 60% 50%"
            ],
            backgroundColor: preset.color4,
          }}
          transition={{
            x: { type: "spring", stiffness: 20, damping: 15, mass: 1.2 },
            y: { type: "spring", stiffness: 20, damping: 15, mass: 1.2 },
            backgroundColor: { duration: 1.5 },
            scale: { duration: 16, repeat: Infinity, ease: "easeInOut" },
            borderRadius: { duration: 14, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            width: '50vw',
            height: '50vw',
            maxWidth: '600px',
            maxHeight: '600px',
            left: '15%',
            bottom: '20%',
            filter: 'blur(110px)',
          }}
        />
      </motion.div>

      {/* 2. Floating Parallax Shapes with dynamic mouse parallax */}
      {SHAPES.map((shape) => (
        <ParallaxShape
          key={shape.id}
          shape={shape}
          smoothX={smoothX}
          smoothY={smoothY}
        />
      ))}

      {/* 3. Cinematic Dust Particle Field */}
      {DUST_PARTICLES.slice(0, 12).map((particle) => (
        <DustParticle
          key={particle.id}
          particle={particle}
        />
      ))}
    </div>
  );
}
