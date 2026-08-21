import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import React, { MouseEvent } from 'react';
import { cn } from '../../lib/utils';

export function GlowingCard({ children, className, style, onClick }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn("group relative rounded-[2rem] bg-white border border-primary/20 overflow-hidden shadow-lg", onClick && "cursor-pointer", className)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        ...style
      }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 139, 167, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 198, 199, 0.4),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>{children}</div>
    </div>
  );
}
