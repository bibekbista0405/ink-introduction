import { HTMLMotionProps, motion, useMotionValue, useSpring } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { usePerformanceSettings } from '../../lib/performance';

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

export function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);
  const { quality } = usePerformanceSettings();

  // Setup non-stateful MotionValues
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring-physics interpolator for buttery-smooth movement
  const springX = useSpring(x, { stiffness: 80, damping: 12, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 80, damping: 12, mass: 0.2 });

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Performance scaling: if low quality mode, bypass physics to save calculations
  if (quality <= 1) {
    const {
      whileHover,
      whileTap,
      whileDrag,
      whileFocus,
      whileInView,
      animate,
      initial,
      transition,
      variants,
      viewport,
      onAnimationStart,
      onAnimationComplete,
      onUpdate,
      ...nativeProps
    } = props as any;

    return (
      <button
        ref={ref}
        className={cn(className)}
        {...nativeProps}
      >
        {children}
      </button>
    );
  }

  const handleMouseEnter = () => {
    if (isTouch) return;
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch) return;
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    if (!rectRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = rectRef.current;
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Update motion values directly without triggering component re-renders
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const reset = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{
        scale: 0.95,
        filter: "brightness(0.95)",
        boxShadow: "0px 4px 12px rgba(255, 139, 167, 0.2)",
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
