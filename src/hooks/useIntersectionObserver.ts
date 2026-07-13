import { useEffect, useRef, useState, RefObject } from 'react';

interface UseIntersectionObserverProps {
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
}

/**
 * A highly optimized, hardware-friendly React Hook for viewport visibility tracking.
 * Uses native IntersectionObserver API which runs off the main browser thread.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>({
  rootMargin = '150px', // Pre-load elements 150px before they enter the viewport
  threshold = 0.01,
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}): [RefObject<T | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // If we only need to detect intersection once (e.g. for lazy loading) and it is already intersecting, stop
    if (isIntersecting && freezeOnceVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const entryIntersecting = entry.isIntersecting;
        if (entryIntersecting) {
          setIsIntersecting(true);
          if (freezeOnceVisible) {
            observer.unobserve(element);
          }
        } else if (!freezeOnceVisible) {
          setIsIntersecting(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      if (element && !freezeOnceVisible) {
        observer.unobserve(element);
      }
    };
  }, [rootMargin, threshold, freezeOnceVisible, isIntersecting]);

  return [elementRef, isIntersecting];
}
