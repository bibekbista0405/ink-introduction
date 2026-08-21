import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Factor to scale the magnetic attraction (defaults to 0.3)
  className?: string;
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);

  // Setup non-stateful MotionValues to bypass React state updates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring-physics interpolator for buttery-smooth movement
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleMouseEnter = () => {
    if (isTouch) return;
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    if (!rectRef.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = rectRef.current;
    
    // Calculate distance from center of the container
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Snappy non-state coordinate update
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
