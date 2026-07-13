import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { Skeleton } from './Skeleton';
import { useIntersectionObserver as useIntersectionObserverHook } from '../../hooks/useIntersectionObserver';

interface CustomImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>, 
  'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart' | 'style'
> {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. "16/9", "4/3", "1/1", or any valid CSS aspect-ratio value
  className?: string;
  imageClassName?: string;
  fallbackSrc?: string;
  useIntersectionObserver?: boolean; // Whether to lazy load using IntersectionObserver
}

/**
 * Utility to append/override the width query parameter of an image URL.
 * Handles Unsplash (w=...), local paths, and generic CDNs (width=... or w=...)
 */
function appendWidthParam(url: string, width: number): string {
  if (!url) return url;
  
  // Only optimize network URLs or absolute assets that can support query parameters
  if (!url.startsWith('http') && !url.startsWith('/')) return url;
  
  try {
    // Check if it is an Unsplash URL (uses w=)
    if (url.includes('images.unsplash.com')) {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      if (!urlObj.searchParams.has('fit')) urlObj.searchParams.set('fit', 'max');
      if (!urlObj.searchParams.has('auto')) urlObj.searchParams.set('auto', 'format');
      return urlObj.toString();
    }
    
    // Check if it is a relative path or local URL
    if (url.startsWith('/')) {
      const dummyBase = 'https://dummy.com';
      const urlObj = new URL(url, dummyBase);
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('width', width.toString());
      return urlObj.toString().replace(dummyBase, '');
    } else {
      // General external CDN
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('width', width.toString());
      return urlObj.toString();
    }
  } catch (e) {
    // Fallback if URL parsing fails for any reason
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width}&width=${width}`;
  }
}

export function CustomImage({
  src,
  alt,
  aspectRatio = 'auto',
  className,
  imageClassName,
  fallbackSrc,
  useIntersectionObserver = true,
  loading = 'lazy',
  ...props
}: CustomImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  
  // Use high-performance hook for advanced lazy loading
  const [observerRef, isIntersecting] = useIntersectionObserverHook<HTMLDivElement>({
    rootMargin: '200px', // Slightly larger margin for smoother scroll transition loading
    threshold: 0.01,
    freezeOnceVisible: true,
  });

  const isInView = !useIntersectionObserver || isIntersecting;

  // Measure container width for dynamic resizing/optimization
  useEffect(() => {
    const element = observerRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const rect = entries[0].contentRect;
      const width = rect.width;
      
      if (width > 0) {
        // Round to nearest logical bucket to improve browser and CDN cache hit rates
        const buckets = [100, 200, 320, 480, 640, 800, 1024, 1200, 1600, 2000];
        const matchedBucket = buckets.find(b => b >= width) || buckets[buckets.length - 1];
        setContainerWidth(matchedBucket);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [observerRef]);

  // Derive optimized URL with dynamic width based on container width
  const optimizedSrc = React.useMemo(() => {
    if (containerWidth && src) {
      return appendWidthParam(src, containerWidth);
    }
    return src;
  }, [src, containerWidth]);

  // Derive WebP source automatically for any local or external JPG/PNG image
  const webpSrc = React.useMemo(() => {
    const targetSrc = optimizedSrc;
    if (!targetSrc) return null;
    
    // Strip query parameters to identify the correct file extension
    const urlWithoutQuery = targetSrc.split('?')[0];
    if (urlWithoutQuery.endsWith('.webp')) {
      return targetSrc;
    }
    
    const dotIndex = urlWithoutQuery.lastIndexOf('.');
    if (dotIndex !== -1) {
      const ext = urlWithoutQuery.substring(dotIndex).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        // Construct the WebP source path while maintaining the query parameters
        const queryPart = targetSrc.includes('?') ? targetSrc.substring(targetSrc.indexOf('?')) : '';
        return urlWithoutQuery.substring(0, dotIndex) + '.webp' + queryPart;
      }
    }
    return null;
  }, [optimizedSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true); // Stop skeleton loader if error occurs to reveal fallback or alt text
  };

  // Determine standard source to show
  const currentSrc = hasError && fallbackSrc ? fallbackSrc : optimizedSrc;

  return (
    <div
      ref={observerRef}
      className={cn(
        "relative overflow-hidden w-full bg-primary/[0.02] border border-primary/5 rounded-2xl transition-all duration-300",
        className
      )}
      style={{ 
        aspectRatio,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {/* Intrinsic Aspect Ratio Placeholder (CLS Prevention) */}
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <motion.div
            key="skeleton-placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-10 w-full h-full"
          >
            <Skeleton className="w-full h-full rounded-none border-none shadow-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render the actual image inside a picture tag once in view */}
      {isInView && (
        <picture>
          {webpSrc && !hasError && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          <motion.img
            src={currentSrc}
            alt={alt}
            loading={loading}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={handleLoad}
            onError={handleError}
            initial={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 1.02,
              filter: isLoaded ? 'blur(0px)' : 'blur(4px)',
            }}
            transition={{
              opacity: { duration: 0.4, ease: 'easeOut' },
              scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 0.4, ease: 'easeOut' },
            }}
            style={{
              willChange: 'transform, opacity, filter',
              transform: 'translateZ(0)', // Force GPU compositor layer promotion
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className={cn(
              "w-full h-full object-cover select-none transform-gpu",
              imageClassName
            )}
            {...props}
          />
        </picture>
      )}

      {/* Fallback render block if image fails entirely */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/[0.04] p-4 text-center">
          <span className="text-xs text-primary/40 font-medium font-sans">
            {alt || "Image failed to load"}
          </span>
        </div>
      )}
    </div>
  );
}
