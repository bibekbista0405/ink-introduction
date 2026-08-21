import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function PerformanceMonitor() {
  const location = useLocation();

  // Log navigation timing
  useEffect(() => {
    const start = performance.now();
    
    // Use requestAnimationFrame and setTimeout to measure after render is complete
    requestAnimationFrame(() => {
      setTimeout(() => {
        const duration = performance.now() - start;
        console.log(`[Performance] Navigation to '${location.pathname}' completed in ${duration.toFixed(2)}ms`);
      }, 0);
    });
  }, [location.pathname]);

  // Log interaction latency
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Type assertion to access properties specific to Event Timing API
          const eventEntry = entry as any;
          const processingStart = eventEntry.processingStart || entry.startTime;
          const latency = processingStart - entry.startTime;
          
          // Log interactions that take longer than 40ms
          if (entry.duration > 40) {
            console.log(
              `[Performance] Interaction (${entry.name}): latency ${latency.toFixed(2)}ms, ` +
              `total duration ${entry.duration.toFixed(2)}ms`
            );
          }
        });
      });

      // Observe standard events and first input delay
      observer.observe({ type: 'event', buffered: true });
      observer.observe({ type: 'first-input', buffered: true });

      return () => observer.disconnect();
    } catch (e) {
      console.log('[Performance] Interaction monitoring not fully supported in this browser.');
    }
  }, []);

  return null;
}
