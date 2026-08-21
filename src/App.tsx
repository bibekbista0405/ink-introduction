import React, { useEffect, useState, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { PublicProfileShowcase } from './components/PublicProfileShowcase';
import { AnalyticsSection } from './components/AnalyticsSection';
import { HowItWorks } from './components/HowItWorks';
import { PrivacySafety } from './components/PrivacySafety';
import { PlayfulGiphy } from './components/PlayfulGiphy';
import { Testimonials } from './components/Testimonials';
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
import { ProgressBar } from './components/ProgressBar';
import { SkeletonLoader } from './components/ui/SkeletonLoader';
import { setPrefersReducedMotion } from './lib/performance';
import { ContactModal } from './components/ContactModal';

// Route-level code splitting: everything below is NOT needed for the initial
// homepage paint, so it's split into its own chunk and only fetched when the
// user actually navigates there. This shrinks the initial JS bundle/parse
// time considerably (BibekDimension alone is 2000+ lines).
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const Premium = lazy(() => import('./components/Premium').then(m => ({ default: m.Premium })));
const FAQ = lazy(() => import('./components/FAQ').then(m => ({ default: m.FAQ })));
const Safety = lazy(() => import('./components/Safety').then(m => ({ default: m.Safety })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const BibekDimension = lazy(() => import('./components/BibekDimension').then(m => ({ default: m.BibekDimension })));
const LegalPageWrapper = lazy(() => import('./components/legal/LegalPageWrapper').then(m => ({ default: m.LegalPageWrapper })));
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })));

// A lazy route chunk (2-45KB) loads in well under the time the liquid wipe
// transition takes to cover the screen, so instead of a jarring spinner we
// simply render nothing while it streams in — the wipe animation itself
// masks the wait. Suspense lives INSIDE PageTransition (not outside it) so
// the transition plays consistently on every navigation, lazy or not.
function LazyRoute({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <Suspense fallback={<div className="min-h-[40vh]" />}>
        {children}
      </Suspense>
    </PageTransition>
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
          <LazyRoute>
            <SectionReveal><About /></SectionReveal>
          </LazyRoute>
        } />
        <Route path="/features" element={
          <LazyRoute>
            <SectionReveal><Features /></SectionReveal>
          </LazyRoute>
        } />
        <Route path="/premium" element={
          <LazyRoute>
            <SectionReveal><Premium /></SectionReveal>
            <SectionDivider />
            <SectionReveal><Testimonials /></SectionReveal>
          </LazyRoute>
        } />
        <Route path="/faq" element={
          <LazyRoute>
            <SectionReveal><FAQ /></SectionReveal>
          </LazyRoute>
        } />
        <Route path="/safety" element={
          <LazyRoute>
            <Safety />
          </LazyRoute>
        } />
        <Route path="/contact" element={
          <LazyRoute>
            <Contact />
          </LazyRoute>
        } />
        <Route path="/bibek" element={
          <LazyRoute>
            <BibekDimension />
          </LazyRoute>
        } />
        <Route path="/terms" element={
          <LazyRoute>
            <LegalPageWrapper slug="terms" />
          </LazyRoute>
        } />
        <Route path="/privacy" element={
          <LazyRoute>
            <LegalPageWrapper slug="privacy" />
          </LazyRoute>
        } />
        <Route path="/cookies" element={
          <LazyRoute>
            <LegalPageWrapper slug="cookies" />
          </LazyRoute>
        } />
        <Route path="/community-guidelines" element={
          <LazyRoute>
            <LegalPageWrapper slug="community-guidelines" />
          </LazyRoute>
        } />
        <Route path="/disclaimer" element={
          <LazyRoute>
            <LegalPageWrapper slug="disclaimer" />
          </LazyRoute>
        } />
        <Route path="*" element={
          <LazyRoute>
            <NotFound />
          </LazyRoute>
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
      <div className="bg-black min-h-screen text-white relative overflow-x-clip">
        <AnimatedRoutes />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 selection:text-dark relative overflow-x-clip">
      <ParallaxBackground />
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

    // Stop burning CPU/GPU on a scroll loop while the tab is backgrounded
    // (browsers throttle rAF in hidden tabs, but explicitly pausing avoids
    // a burst of queued work when the tab regains focus).
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(raf);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Ensure style properties are cleared out to be completely stable and flat
    const docEl = document.documentElement;
    docEl.style.removeProperty('--scroll-skew-y');
    docEl.style.removeProperty('--scroll-scale-y');
    docEl.style.removeProperty('--scroll-scale-x');

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
