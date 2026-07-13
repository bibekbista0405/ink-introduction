import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { useInView } from 'motion/react';
import { usePerformanceSettings } from '../../lib/performance';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText = React.memo(function ScrambleText({ text, className, delay = 0, duration = 0.8 }: ScrambleTextProps) {
  const { quality } = usePerformanceSettings();
  const [displayText, setDisplayText] = useState(''); 
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  const [hasStarted, setHasStarted] = useState(false);

  // Performance scaling: If quality is low or reduced motion is active, skip scramble entirely and render static text immediately
  const skipScramble = quality <= 1;

  useEffect(() => {
    if (skipScramble) {
      setDisplayText(text);
      return;
    }

    if (inView && !hasStarted) {
      const timeout = setTimeout(() => {
        setHasStarted(true);
        let iteration = 0;
        
        // Increase interval time slightly from 30ms to 45ms to cut React state updates by ~33%
        const intervalTime = 45; 
        const totalSteps = (duration * 1000) / intervalTime;
        const stepSize = text.length / totalSteps;

        const interval = setInterval(() => {
          setDisplayText(() => {
            return text
              .split('')
              .map((letter, index) => {
                if (index < iteration) {
                  return text[index];
                }
                if (text[index] === ' ') return ' ';
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join('');
          });

          if (iteration >= text.length) {
            clearInterval(interval);
            setDisplayText(text); // Ensure precise ending
          }

          iteration += stepSize;
        }, intervalTime);
        
        return () => clearInterval(interval);
      }, delay * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [inView, hasStarted, delay, text, duration, skipScramble]);

  if (skipScramble) {
    return (
      <span ref={ref} className={cn("relative inline-block", className)}>
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <span className="opacity-0">{text}</span>
      <span className="absolute inset-0 left-0 top-0 whitespace-nowrap">{displayText}</span>
    </span>
  );
});

ScrambleText.displayName = 'ScrambleText';
