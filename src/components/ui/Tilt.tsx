import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { usePerformanceSettings } from '../../lib/performance';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees
}

export function Tilt({ children, className, maxTilt = 10 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const rectRef = useRef<DOMRect | null>(null);
  const { quality } = usePerformanceSettings();

  // Motion values to store normalized mouse offset from center [-0.5, 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse positions to rotation values
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 120,
    damping: 18,
    mass: 0.4
  });
  
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 120,
    damping: 18,
    mass: 0.4
  });

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  // Performance-based bypass
  if (quality <= 1) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseEnter = () => {
    if (isTouch || !ref.current) return;
    // Cache the bounding rect on hover start to avoid layout thrashing in mousemove
    rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    
    // Retrieve cached rect
    let rect = rectRef.current;
    if (!rect && ref.current) {
      rect = ref.current.getBoundingClientRect();
      rectRef.current = rect;
    }
    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card coordinates, centered from -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        rotateX,
        rotateY,
      }}
    >
      <div 
        style={{ 
          transform: 'translateZ(15px)', // Slightly reduced depth for better rendering
          transformStyle: 'preserve-3d' 
        }} 
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
