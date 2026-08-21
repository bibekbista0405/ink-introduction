import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';
import { usePerformanceSettings } from '../../lib/performance';

interface TiltCardProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  variant?: 'default' | 'cta';
  maxTilt?: number; // maximum degrees of tilt (e.g., 6 or 8)
  perspective?: number; // 3D perspective depth (e.g., 1000)
}

export function TiltCard({
  children,
  className,
  isActive = false,
  variant = 'default',
  maxTilt = 8, // Subtle, high-end design
  perspective = 1200,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { quality } = usePerformanceSettings();
  const shouldTilt = quality > 1;
  
  // Motion values for normalized cursor coordinates [-0.5 to 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High performance smooth spring animations for rotation
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldTilt) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse position
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Normalised position
    const normalizedX = (mouseX / width) - 0.5;
    const normalizedY = (mouseY / height) - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (shouldTilt) {
      x.set(0);
      y.set(0);
    }
  };

  const defaultBg = isHovered
    ? 'rgba(255, 255, 255, 0.12)'
    : isActive
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.05)';

  const defaultBorder = isHovered 
    ? 'rgba(255, 255, 255, 0.25)' 
    : isActive 
      ? 'rgba(255, 255, 255, 0.2)' 
      : 'rgba(255, 255, 255, 0.1)';

  const ctaBg = isHovered
    ? 'rgba(255, 139, 167, 0.15)' 
    : 'rgba(255, 139, 167, 0.05)';

  const ctaBorder = isHovered
    ? 'rgba(255, 139, 167, 0.4)' 
    : 'rgba(255, 139, 167, 0.2)';

  // Static/Optimized style mapping for elements
  const cardStyle = shouldTilt ? {
    rotateX,
    rotateY,
    transformStyle: 'preserve-3d' as const,
    perspective: perspective,
    ...props.style
  } : {
    ...props.style
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={shouldTilt ? handleMouseMove : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      animate={{
        scale: isHovered ? 1.015 : 1.0,
        boxShadow: isHovered 
          ? isActive 
            ? '0 35px 70px -15px rgba(0, 0, 0, 0.75), 0 0 50px 4px rgba(255, 139, 167, 0.25)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 35px 2px rgba(255, 139, 167, 0.15)'
          : isActive
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.5)'
            : '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
        borderColor: variant === 'cta' ? ctaBorder : defaultBorder,
        backgroundColor: variant === 'cta' ? ctaBg : defaultBg,
      }}
      transition={{
        boxShadow: { duration: 0.3 },
        borderColor: { duration: 0.3 },
        backgroundColor: { duration: 0.3 },
        scale: { duration: 0.25, ease: 'easeOut' },
        ...(props.transition || {})
      }}
      className={cn(
        'rounded-[2rem] md:rounded-[2.5rem] border overflow-hidden cursor-pointer relative backdrop-blur-md transition-all transform-gpu',
        className
      )}
      {...props}
    >
      {/* Container for hardware accelerated 3D pop effect */}
      <div 
        style={shouldTilt ? { 
          transform: 'translateZ(30px)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        } : {}} 
        className="relative w-full h-full transform-gpu"
      >
        {children}
      </div>
    </motion.div>
  );
}
