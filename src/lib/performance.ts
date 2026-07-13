import { useEffect, useState } from 'react';

// Quality Levels:
// 3: Premium (High detail, full particles, full blurs, interactive 3D, scroll parallax, full scramble)
// 2: Balanced (Medium blur, fewer particles, simpler floating shapes, disable non-essential shadows)
// 1: Low / Power Saver (No floating shapes, simple background gradient without blur filters, disabled tilt, static reveals)
// 0: Reduced Motion (No background animations, static illustrations, immediate reveals)

export type QualityLevel = 0 | 1 | 2 | 3;

interface PerformanceState {
  quality: QualityLevel;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  fps: number;
}

// Check for mobile user agents or touch devices
const checkMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768 ||
    ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0)
  );
};

// Check prefers-reduced-motion
const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Initial state calculation
const initialIsMobile = checkMobile();
const initialReducedMotion = checkReducedMotion();

let currentQuality: QualityLevel = initialReducedMotion
  ? 0
  : initialIsMobile
  ? 2 // Start mobile at balanced
  : 3; // Start desktop at premium

// Read cached performance level if exists to prevent constant re-probing
if (typeof window !== 'undefined') {
  const cached = localStorage.getItem('ink-perf-quality');
  if (cached) {
    currentQuality = parseInt(cached, 10) as QualityLevel;
  }
}

// Global subscribers set
const listeners = new Set<(state: PerformanceState) => void>();

let currentFps = 60;
const state: PerformanceState = {
  quality: currentQuality,
  isMobile: initialIsMobile,
  prefersReducedMotion: initialReducedMotion,
  fps: currentFps,
};

const notifySubscribers = () => {
  listeners.forEach((listener) => listener({ ...state }));
};

// Set quality level and cache it
export const setQualityLevel = (newQuality: QualityLevel) => {
  if (newQuality !== state.quality) {
    state.quality = newQuality;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ink-perf-quality', String(newQuality));
    }
    notifySubscribers();
  }
};

// Set prefers reduced motion and adjust quality level accordingly
export const setPrefersReducedMotion = (reduced: boolean) => {
  if (reduced !== state.prefersReducedMotion) {
    state.prefersReducedMotion = reduced;
    if (reduced) {
      state.quality = 0;
    } else {
      // Restore quality
      const cached = localStorage.getItem('ink-perf-quality');
      if (cached) {
        state.quality = parseInt(cached, 10) as QualityLevel;
      } else {
        state.quality = state.isMobile ? 2 : 3;
      }
    }
    notifySubscribers();
  }
};

// FPS monitor logic - self-contained, runs quiet, doesn't thrash React
let frameCount = 0;
let lastTime = typeof performance !== 'undefined' ? performance.now() : 0;
let lowFpsStreak = 0;
let monitorActive = false;

const runFpsMonitor = () => {
  if (!monitorActive || typeof window === 'undefined') return;

  const now = performance.now();
  frameCount++;

  if (now >= lastTime + 1000) {
    currentFps = Math.round((frameCount * 1000) / (now - lastTime));
    state.fps = currentFps;
    
    // Only analyze performance if quality is above Low (1) and user hasn't explicitly set 0
    if (state.quality > 1 && !state.prefersReducedMotion) {
      // If FPS drops below 48 FPS on a 60Hz screen (or significantly below refresh rate)
      if (currentFps < 48) {
        lowFpsStreak++;
        if (lowFpsStreak >= 3) {
          const lowerQuality = (state.quality - 1) as QualityLevel;
          console.warn(`[Performance Engine] Low FPS detected (${currentFps} FPS). Downgrading quality to level ${lowerQuality}.`);
          setQualityLevel(lowerQuality);
          lowFpsStreak = 0;
        }
      } else {
        lowFpsStreak = Math.max(0, lowFpsStreak - 1);
      }
    }

    frameCount = 0;
    lastTime = now;
  }

  requestAnimationFrame(runFpsMonitor);
};

export const startPerformanceMonitoring = () => {
  if (monitorActive || typeof window === 'undefined') return;
  monitorActive = true;
  lastTime = performance.now();
  frameCount = 0;
  requestAnimationFrame(runFpsMonitor);
};

export const stopPerformanceMonitoring = () => {
  monitorActive = false;
};

// Custom Hook to hook into performance settings
export function usePerformanceSettings() {
  const [currentSettings, setCurrentSettings] = useState<PerformanceState>({ ...state });

  useEffect(() => {
    // Start monitoring on first hook use
    startPerformanceMonitoring();

    const handleChange = (updatedState: PerformanceState) => {
      setCurrentSettings(updatedState);
    };

    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  return currentSettings;
}
