import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProblemSolution } from './components/ProblemSolution';
import { PublicProfileShowcase } from './components/PublicProfileShowcase';
import { AnalyticsSection } from './components/AnalyticsSection';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { PrivacySafety } from './components/PrivacySafety';
import { PlayfulGiphy } from './components/PlayfulGiphy';
import { Premium } from './components/Premium';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Developer } from './components/Developer';
import { Footer } from './components/Footer';
import { ContactSupportButton } from './components/ContactSupportButton';
import { OnboardingTour } from './components/OnboardingTour';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { PageTransition } from './components/ui/PageTransition';
import { SectionDivider } from './components/ui/SectionDivider';
import { ParallaxBackground } from './components/ParallaxBackground';
import { useActiveSectionFocus } from './hooks/useActiveSectionFocus';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './components/ui/SEO';
import { SectionReveal } from './components/ui/SectionReveal';
import { motion, useSpring, AnimatePresence, useMotionValue } from 'motion/react';
import { LegalPageWrapper } from './components/legal/LegalPageWrapper';
import { NotFound } from './components/NotFound';
import { ProgressBar } from './components/ProgressBar';
import { SkeletonLoader } from './components/ui/SkeletonLoader';
import { setPrefersReducedMotion } from './lib/performance';
import { Safety } from './components/Safety';
import { Contact } from './components/Contact';
import { ContactModal } from './components/ContactModal';
import { BibekDimension } from './components/BibekDimension';

function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);

  const ringRef = React.useRef<HTMLDivElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Graceful check to completely disable on touch/mobile devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let isHovering = false;
    let isMouseDown = false;
    let ringScale = 1;
    let dotScale = 1;

    let lastTime = performance.now();
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // Fast checks on tags to identify interactive elements
      const clickable = target.closest('a, button, [role="button"], .cursor-pointer, input, select, textarea, [data-clickable]');
      isHovering = !!clickable;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    const tick = (time: number) => {
      let dt = (time - lastTime) / 1000;
      lastTime = time;

      // Cap delta time to prevent spring jumps on tab sleep/unfocus
      if (dt > 0.1) dt = 0.1;
      if (dt <= 0) dt = 0.001;

      // Golden formula: Exponential decay. Ultra-smooth, mathematically correct, and frame-rate independent!
      const followSpeed = isHovering ? 24 : 18; // Speed up outer ring slightly on hover for responsiveness
      const ringRatio = 1 - Math.exp(-followSpeed * dt);
      const dotRatio = 1 - Math.exp(-40 * dt); // Dot follows almost instantly

      ring.x += (mouse.x - ring.x) * ringRatio;
      ring.y += (mouse.y - ring.y) * ringRatio;

      dot.x += (mouse.x - dot.x) * dotRatio;
      dot.y += (mouse.y - dot.y) * dotRatio;

      // Interpolate scales smoothly using exponential decay
      const targetRingScale = isMouseDown ? 0.75 : (isHovering ? 1.4 : 1.0);
      const targetDotScale = isMouseDown ? 1.3 : (isHovering ? 0.5 : 1.0);

      const scaleSpeed = 16;
      const scaleRatio = 1 - Math.exp(-scaleSpeed * dt);
      ringScale += (targetRingScale - ringScale) * scaleRatio;
      dotScale += (targetDotScale - dotScale) * scaleRatio;

      // Update styles directly bypass React virtual DOM render cycle to maintain solid 120fps
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        
        if (isHovering) {
          ringRef.current.style.backgroundColor = 'rgba(255, 139, 167, 0.1)';
          ringRef.current.style.borderColor = 'rgba(255, 139, 167, 0.8)';
        } else {
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.borderColor = 'rgba(255, 139, 167, 0.45)';
        }
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        
        if (isHovering) {
          dotRef.current.style.backgroundColor = '#C3AED6'; // Soft accent purple on hover for delightful aesthetic contrast
        } else {
          dotRef.current.style.backgroundColor = '#FF8BA7'; // Soft primary pink
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Simple elegant outer circle */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[100] transform-gpu will-change-transform shadow-sm transition-opacity duration-300"
      />

      {/* Simple elegant inner dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[100] transform-gpu will-change-transform shadow-sm transition-opacity duration-300"
      />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  useActiveSectionFocus();

  return (
    <>
      <SEO />
      <AnimatePresence mode="wait">
        {/* @ts-ignore - React Router v6 types omit key, but it's needed for AnimatePresence */}
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Hero />
            <SectionDivider />
            <ProblemSolution />
            <SectionDivider />
            <SectionReveal><PublicProfileShowcase /></SectionReveal>
            <SectionDivider />
            <SectionReveal><AnalyticsSection /></SectionReveal>
            <SectionDivider />
            <SectionReveal><HowItWorks /></SectionReveal>
            <SectionDivider />
            <SectionReveal><PrivacySafety /></SectionReveal>
            <SectionDivider />
            <PlayfulGiphy />
            <SectionDivider />
            <SectionReveal><Testimonials /></SectionReveal>
          </PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition>
            <SectionReveal><About /></SectionReveal>
          </PageTransition>
        } />
        <Route path="/features" element={
          <PageTransition>
            <SectionReveal><Features /></SectionReveal>
          </PageTransition>
        } />
        <Route path="/premium" element={
          <PageTransition>
            <SectionReveal><Premium /></SectionReveal>
            <SectionDivider />
            <SectionReveal><Testimonials /></SectionReveal>
          </PageTransition>
        } />
        <Route path="/faq" element={
          <PageTransition>
            <SectionReveal><FAQ /></SectionReveal>
          </PageTransition>
        } />
        <Route path="/safety" element={
          <PageTransition>
            <Safety />
          </PageTransition>
        } />
        <Route path="/contact" element={
          <PageTransition>
            <Contact />
          </PageTransition>
        } />
        <Route path="/bibek" element={
          <PageTransition>
            <BibekDimension />
          </PageTransition>
        } />
        <Route path="/terms" element={
          <PageTransition>
            <LegalPageWrapper slug="terms" />
          </PageTransition>
        } />
        <Route path="/privacy" element={
          <PageTransition>
            <LegalPageWrapper slug="privacy" />
          </PageTransition>
        } />
        <Route path="/cookies" element={
          <PageTransition>
            <LegalPageWrapper slug="cookies" />
          </PageTransition>
        } />
        <Route path="/community-guidelines" element={
          <PageTransition>
            <LegalPageWrapper slug="community-guidelines" />
          </PageTransition>
        } />
        <Route path="/disclaimer" element={
          <PageTransition>
            <LegalPageWrapper slug="disclaimer" />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
      </AnimatePresence>
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function MainAppContent({ isContactModalOpen, setIsContactModalOpen }: { isContactModalOpen: boolean, setIsContactModalOpen: (val: boolean) => void }) {
  const location = useLocation();
  const isBibek = location.pathname === '/bibek';

  if (isBibek) {
    return (
      <div className="bg-black min-h-screen text-white relative overflow-hidden">
        <AnimatedRoutes />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-dark cursor-none relative overflow-hidden">
      <ParallaxBackground />
      <CursorFollower />
      <Navbar />
      <main className="pt-24 pb-20 transform-gpu">
        <AnimatedRoutes />
      </main>
      <Footer />
      <ContactSupportButton />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <OnboardingTour />
    </div>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenContactModal = () => {
      setIsContactModalOpen(true);
    };
    window.addEventListener('open-contact-modal', handleOpenContactModal);
    return () => {
      window.removeEventListener('open-contact-modal', handleOpenContactModal);
    };
  }, []);

  // Dynamic media query listener to detect accessibility reduced motion preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreferenceChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };

    // Initial check
    handleMotionPreferenceChange(mediaQuery);

    // Support both older and modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    } else {
      mediaQuery.addListener(handleMotionPreferenceChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      } else {
        mediaQuery.removeListener(handleMotionPreferenceChange);
      }
    };
  }, []);

  useEffect(() => {
    if (initialLoading) {
      document.body.style.overflow = 'hidden';
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [initialLoading]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // Snappier, more responsive feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    (window as any).lenis = lenis;

    // If still in initial loading state, make sure Lenis stops immediately
    if (initialLoading && typeof lenis.stop === 'function') {
      lenis.stop();
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Ensure style properties are cleared out to be completely stable and flat
    const docEl = document.documentElement;
    docEl.style.removeProperty('--scroll-skew-y');
    docEl.style.removeProperty('--scroll-scale-y');
    docEl.style.removeProperty('--scroll-scale-x');

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = null;
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <ProgressBar />
        <PerformanceMonitor />
        <AnimatePresence mode="wait">
          {initialLoading && (
            <SkeletonLoader onComplete={() => setInitialLoading(false)} />
          )}
        </AnimatePresence>
        <MainAppContent isContactModalOpen={isContactModalOpen} setIsContactModalOpen={setIsContactModalOpen} />
      </Router>
    </HelmetProvider>
  );
}
