import { useState, useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { fireConfetti } from '../lib/confetti';
import { Magnetic } from './ui/Magnetic';
import { Tooltip } from './ui/Tooltip';
import { usePerformanceSettings } from '../lib/performance';

const MotionLink = motion.create(Link);

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const { quality } = usePerformanceSettings();

  const isScrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledNow = window.scrollY > 45;
      if (isScrolledNow !== isScrolledRef.current) {
        isScrolledRef.current = isScrolledNow;
        setScrolled(isScrolledNow);
      }
    };
    
    // Check initial scroll state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle Lenis and scroll lock when mobile drawer is open
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Features', href: '/features', tooltip: 'Explore our features & tech' },
    { name: 'Premium', href: '/premium', tooltip: 'Unlock elite creator plans' },
    { name: 'About', href: '/about', tooltip: 'Learn about our story & vision' },
    { name: 'FAQ', href: '/faq', tooltip: 'Find answers & support' },
  ];

  // Drawer staggered animations
  const drawerVariants: Variants = {
    hidden: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 350,
        damping: 35,
        staggerChildren: 0.04,
        staggerDirection: -1
      }
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 28,
        staggerChildren: 0.06,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center py-4 md:py-6">
        {/* Hardware accelerated container layout toggle */}
        <div
          className={cn(
            "pointer-events-auto flex flex-col justify-center border border-solid relative overflow-hidden transition-all duration-500 ease-out transform-gpu",
            scrolled 
              ? "w-[92%] md:w-[680px] max-w-[680px] rounded-[32px] bg-white/75 border-primary/20 shadow-md py-2 px-5 md:px-6 backdrop-blur-md" 
              : "w-full max-w-[1280px] rounded-none bg-transparent border-transparent py-3 px-6 md:px-12 backdrop-blur-none shadow-none"
          )}
        >
          {/* Elegant shining sweep light effect on scrolled capsule (Only on high quality) */}
          {scrolled && quality >= 3 && (
            <motion.div
              className="absolute inset-y-0 w-48 bg-gradient-to-r from-transparent via-[#FF8BA7]/8 via-[#C3AED6]/8 to-transparent pointer-events-none z-0"
              initial={{ x: "-150%", skewX: -15 }}
              animate={{ x: "250%" }}
              transition={{
                repeat: Infinity,
                repeatDelay: 5,
                duration: 2.5,
                ease: "easeInOut"
              }}
            />
          )}

          <div className="flex items-center justify-between w-full relative z-10">
            <Magnetic strength={0.12}>
              <Tooltip content="Go to homepage" position="bottom" delay={400}>
                <MotionLink 
                  whileTap={{ scale: 0.96 }}
                  to="/" 
                  className="flex items-center gap-2 group py-1 cursor-none"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                    I
                  </div>
                  <span className="font-extrabold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">INK</span>
                </MotionLink>
              </Tooltip>
            </Magnetic>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-1 bg-black/[0.02] p-1 rounded-full border border-black/5 relative">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Tooltip key={link.name} content={link.tooltip} position="bottom" delay={300}>
                      <Link
                        to={link.href}
                        onMouseEnter={() => setHoveredLink(link.name)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={cn(
                          "text-xs font-extrabold px-4 py-1.5 rounded-full transition-colors duration-200 relative cursor-none block",
                          isActive 
                            ? "text-primary" 
                            : "text-foreground/70 hover:text-dark"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute inset-0 bg-white rounded-full shadow-sm z-0"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        {hoveredLink === link.name && !isActive && (
                          <motion.div
                            layoutId="hoverNavIndicator"
                            className="absolute inset-0 bg-black/[0.03] rounded-full z-0"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{link.name}</span>
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>
              <div className="h-4 w-px bg-foreground/20"></div>
              
              <Magnetic strength={0.15}>
                <Tooltip content="Launch the INK app" position="bottom" delay={300}>
                  <motion.a 
                    href="https://ink-social.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0px 8px 20px rgba(255, 139, 167, 0.35)",
                    }}
                    whileTap={{
                      scale: 0.97,
                      filter: "brightness(0.97)",
                    }}
                    onClick={fireConfetti}
                    className={cn(
                      "group relative inline-flex items-center justify-center gap-1.5 text-xs font-black text-white transition-all duration-300 ease-out rounded-full bg-gradient-to-br from-[#FF8BA7] via-[#FFC6C7] to-[#C3AED6] shadow-sm shrink-0 cursor-none px-5 py-2 inline-flex"
                    )}
                  >
                    <span className="relative z-10 tracking-wide drop-shadow-sm">Launch INK</span>
                    <span className="relative z-10 text-sm group-hover:animate-bounce inline-block">🌸</span>
                    <div className="absolute inset-0 rounded-full bg-white/15 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.a>
                </Tooltip>
              </Magnetic>
            </div>

            {/* Mobile Toggle */}
            <div className="flex md:hidden items-center">
              <motion.button
                whileTap={{ scale: 0.94 }}
                className="p-1.5 rounded-full hover:bg-dark/5 text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Motion Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col justify-between p-8 md:hidden overflow-hidden"
          >
            {/* Background dynamic ambient blob (Optimized low blur on mobile) */}
            <div className="absolute top-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-primary/10 via-secondary/5 to-accent/5 blur-[40px] pointer-events-none -z-10" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[40px] pointer-events-none -z-10" />

            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between w-full">
              <MotionLink 
                whileTap={{ scale: 0.95 }}
                to="/" 
                className="flex items-center gap-2 group py-1" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-md">
                  I
                </div>
                <span className="font-extrabold text-lg tracking-tight text-foreground">INK</span>
              </MotionLink>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-dark/5 rounded-full hover:bg-dark/10 text-foreground transition-colors cursor-none"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Links Area with Staggered Entrance */}
            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.div key={link.name} variants={itemVariants} className="overflow-visible">
                    <MotionLink
                      to={link.href}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block font-sans text-5xl font-black tracking-tight cursor-none group relative py-2.5 w-fit",
                        isActive ? "text-primary" : "text-dark/80 hover:text-primary transition-colors"
                      )}
                    >
                      <span className="text-xs font-mono font-bold text-primary/40 mr-4">0{idx + 1} /</span>
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300 rounded-full" />
                    </MotionLink>
                  </motion.div>
                );
              })}

              <motion.div variants={itemVariants} className="pt-6 overflow-visible">
                <a 
                  href="https://ink-social.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    fireConfetti();
                    setMobileMenuOpen(false);
                  }}
                  className="group relative w-full max-w-sm inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-extrabold text-white rounded-2xl bg-gradient-to-br from-[#FF8BA7] via-[#FFC6C7] to-[#C3AED6] shadow-md cursor-none"
                >
                  <span className="relative z-10 tracking-wide drop-shadow-sm">Launch INK</span>
                  <span className="relative z-10 text-sm group-hover:animate-bounce inline-block">🌸</span>
                </a>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <motion.div 
              variants={itemVariants}
              className="border-t border-dark/10 pt-6 flex flex-col gap-3"
            >
              <div className="flex gap-6 text-sm font-semibold text-foreground/50">
                <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Privacy</Link>
                <Link to="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Terms</Link>
                <Link to="/cookies" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors">Cookies</Link>
              </div>
              <p className="text-xs font-medium text-foreground/40">© {new Date().getFullYear()} INK. Beautifully crafted at 120 FPS.</p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
