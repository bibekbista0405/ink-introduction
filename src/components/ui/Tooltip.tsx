import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number; // delay in milliseconds before appearing
  arrow?: boolean; // Whether to show a tiny arrow pointing to the trigger
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  className,
  delay = 150,
  arrow = true
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  useEffect(() => {
    // Detect touch capability to prevent annoying hovering artifacts on phones
    setIsTouch(
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      window.matchMedia('(pointer: coarse)').matches
    );
  }, []);

  const showTooltip = () => {
    if (isTouch) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2.5';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2.5';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2.5';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2.5';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2.5';
    }
  };

  const getAnimationInitial = () => {
    switch (position) {
      case 'top': return { opacity: 0, y: 6, scale: 0.96 };
      case 'bottom': return { opacity: 0, y: -6, scale: 0.96 };
      case 'left': return { opacity: 0, x: 6, scale: 0.96 };
      case 'right': return { opacity: 0, x: -6, scale: 0.96 };
    }
  };
  
  const getAnimationAnimate = () => {
    return { opacity: 1, x: 0, y: 0, scale: 1 };
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-dark/95 border-r-transparent border-b-transparent border-l-transparent border-t-[5px] border-x-[5px]';
      case 'bottom':
        return 'top-[-4px] left-1/2 -translate-x-1/2 border-b-dark/95 border-r-transparent border-t-transparent border-l-transparent border-b-[5px] border-x-[5px]';
      case 'left':
        return 'right-[-4px] top-1/2 -translate-y-1/2 border-l-dark/95 border-t-transparent border-b-transparent border-r-transparent border-l-[5px] border-y-[5px]';
      case 'right':
        return 'left-[-4px] top-1/2 -translate-y-1/2 border-r-dark/95 border-t-transparent border-b-transparent border-l-transparent border-r-[5px] border-y-[5px]';
    }
  };

  // Render trigger by safely attaching interactive mouse & keyboard accessibility listeners
  const renderTrigger = () => {
    if (React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        'aria-describedby': isVisible ? tooltipId : undefined,
        onMouseEnter: (e: React.MouseEvent) => {
          showTooltip();
          if (child.props && typeof child.props.onMouseEnter === 'function') {
            child.props.onMouseEnter(e);
          }
        },
        onMouseLeave: (e: React.MouseEvent) => {
          hideTooltip();
          if (child.props && typeof child.props.onMouseLeave === 'function') {
            child.props.onMouseLeave(e);
          }
        },
        onFocus: (e: React.FocusEvent) => {
          showTooltip();
          if (child.props && typeof child.props.onFocus === 'function') {
            child.props.onFocus(e);
          }
        },
        onBlur: (e: React.FocusEvent) => {
          hideTooltip();
          if (child.props && typeof child.props.onBlur === 'function') {
            child.props.onBlur(e);
          }
        },
      });
    }

    return (
      <span
        aria-describedby={isVisible ? tooltipId : undefined}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        tabIndex={0}
        className="inline-block"
      >
        {children}
      </span>
    );
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {renderTrigger()}
      <AnimatePresence>
        {isVisible && !isTouch && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={getAnimationInitial()}
            animate={getAnimationAnimate()}
            exit={getAnimationInitial()}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className={cn(
              "absolute z-[999] px-2.5 py-1.5 text-[10px] font-bold text-white bg-dark/95 border border-white/10 rounded-lg whitespace-nowrap shadow-lg backdrop-blur-md pointer-events-none transform-gpu tracking-wide uppercase",
              getPositionClasses(),
              className
            )}
          >
            {content}
            {arrow && (
              <div className={cn("absolute w-0 h-0 border-solid", getArrowClasses())} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
