import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { fireConfetti } from '../lib/confetti';
import { MagneticButton } from './ui/MagneticButton';
import { useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedText } from './ui/AnimatedText';
import { CustomImage } from './ui/CustomImage';
import { cn } from '../lib/utils';
import { Tooltip } from './ui/Tooltip';
import { usePerformanceSettings } from '../lib/performance';

// High-performance static Giphy WebP CDN alternatives (WebPs decode instantly and use 80% less memory)
const PARTY_GIPHYS = [
  "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.webp",
  "https://media.giphy.com/media/3o7aD2saalEvTe8XnW/giphy.webp",
  "https://media.giphy.com/media/unQ3IJUWK7cj6/giphy.webp",
  "https://media.giphy.com/media/l0HlUxcWRYigmDKMM/giphy.webp",
  "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.webp",
  "https://media.giphy.com/media/l4Ho0At2UD2d7WyD6/giphy.webp",
  "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.webp",
  "https://media.giphy.com/media/2A75RyXVzzSI2bx4Gj/giphy.webp",
  "https://media.giphy.com/media/U7P0BlqQ2Oco5Gi9c1/giphy.webp",
  "https://media.giphy.com/media/ibolLe3mOqHE3PQTtk/giphy.webp"
];

export const Hero = memo(function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { quality, isMobile } = usePerformanceSettings();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isStickerParty, setIsStickerParty] = useState(false);
  const [stickers, setStickers] = useState<Array<{ id: number; url: string; x: number; y: number; rotate: number; scale: number }>>([]);

  const handleHeroClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isStickerParty) return;
    if ((e.target as HTMLElement).closest('button, a')) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const randomUrl = PARTY_GIPHYS[Math.floor(Math.random() * PARTY_GIPHYS.length)];
    const newSticker = {
      id: Date.now() + Math.random(),
      url: randomUrl,
      x: clickX,
      y: clickY,
      rotate: Math.random() * 40 - 20,
      scale: Math.random() * 0.4 + 0.8
    };

    setStickers((prev) => {
      const updated = [...prev, newSticker];
      // Restrict active screen stickers to max 8 on screen to prevent rendering/layout lag
      return updated.length > 8 ? updated.slice(updated.length - 8) : updated;
    });
  };

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Adaptive parallax triggers: zero scroll transformations on quality levels <= 1 (Low / Reduced Motion)
  const isHighPerformance = quality >= 2;
  
  const yBackgroundText = useTransform(springScroll, [0, 1], [0, isHighPerformance ? 320 : 0]);
  const yMainContent = useTransform(springScroll, [0, 1], [0, isHighPerformance ? -50 : 0]);
  const yFloatingLeft = useTransform(springScroll, [0, 1], [0, isHighPerformance ? -180 : 0]);
  const yFloatingRight = useTransform(springScroll, [0, 1], [0, isHighPerformance ? -120 : 0]);
  const yForegroundFast = useTransform(springScroll, [0, 1], [0, isHighPerformance ? -280 : 0]);
  const yForegroundSlow = useTransform(springScroll, [0, 1], [0, isHighPerformance ? -80 : 0]);
  
  const scale = useTransform(springScroll, [0, 1], [1, isHighPerformance ? 1.2 : 1]);
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0]);
  const textScale = useTransform(springScroll, [0, 1], [1, isHighPerformance ? 1.15 : 1]);
  const textOpacity = useTransform(springScroll, [0, 0.5], [0.12, 0]);

  // Premium performance: Omit Framer Motion scroll styles completely if !isHighPerformance.
  // This keeps the browser from recalculating layouts and applying transform styles on scroll.
  const backgroundTextStyle = isHighPerformance 
    ? { y: yBackgroundText, scale: textScale, opacity: textOpacity }
    : { opacity: 0.12 };

  const mainContentStyle = isHighPerformance 
    ? { y: yMainContent } 
    : {};

  const floatingLeftStyle = isHighPerformance 
    ? { y: yFloatingLeft, scale } 
    : {};

  const floatingRightStyle = isHighPerformance 
    ? { y: yFloatingRight, scale } 
    : {};

  const foregroundFastStyle = isHighPerformance 
    ? { y: yForegroundFast } 
    : {};

  const foregroundSlowStyle = isHighPerformance 
    ? { y: yForegroundSlow } 
    : {};

  return (
    <section 
      ref={ref} 
      onClick={handleHeroClick}
      className={cn(
        "relative min-h-[95vh] flex items-center justify-center overflow-hidden transition-all duration-300 transform-gpu",
        isStickerParty ? "cursor-crosshair bg-gradient-to-b from-primary/5 via-transparent to-accent/5" : ""
      )}
    >
      {/* Massive Background Text Parallax */}
      <motion.div 
        style={backgroundTextStyle}
        className="absolute top-[18%] left-0 w-full flex justify-center pointer-events-none z-0 will-change-transform"
      >
        <h1 className="text-[25vw] font-extrabold text-primary/20 tracking-tighter leading-none select-none">
          INK
        </h1>
      </motion.div>

      {/* Dynamic Background: Disabled on quality <= 2 to prevent overdraw with global ParallaxBackground */}
      {quality >= 3 && (
        <motion.div style={{ opacity }} className="absolute inset-0 overflow-hidden pointer-events-none z-0 will-change-transform">
          <div className="absolute top-[10%] left-[10%] w-[35%] h-[35%] rounded-full bg-primary/10 blur-[90px] animate-blob" />
          <div className="absolute top-[30%] right-[10%] w-[30%] h-[40%] rounded-full bg-accent/10 blur-[90px] animate-blob animation-delay-2000" />
        </motion.div>
      )}

      <motion.div 
        style={mainContentStyle}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-12 will-change-transform"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-primary/20 shadow-sm"
          >
            <Heart className="w-4 h-4 text-primary animate-pulse fill-primary/20" />
            <span className="text-sm font-bold text-primary tracking-widest uppercase">A Safe Space For You</span>
          </motion.div>

          {/* Interactive Giphy Sticker Party Toggle */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsStickerParty(!isStickerParty);
              if (!isStickerParty) {
                const initial = [
                  { id: 1, url: PARTY_GIPHYS[0], x: 200, y: 250, rotate: -15, scale: 1.0 },
                  { id: 2, url: PARTY_GIPHYS[1], x: window.innerWidth > 1000 ? 950 : 350, y: 200, rotate: 12, scale: 1.1 },
                  { id: 3, url: PARTY_GIPHYS[2], x: 180, y: 550, rotate: -8, scale: 0.95 },
                  { id: 4, url: PARTY_GIPHYS[4], x: window.innerWidth > 1000 ? 1000 : 300, y: 500, rotate: 20, scale: 1.2 }
                ];
                setStickers(initial);
                fireConfetti();
              } else {
                setStickers([]);
              }
            }}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm border transition-all duration-300 pointer-events-auto",
              isStickerParty 
                ? "bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-[0_0_15px_rgba(255,139,167,0.4)] animate-pulse" 
                : "bg-white text-dark border-primary/20 hover:border-primary/40 hover:shadow-md"
            )}
          >
            <span>🎈 Sticker Party: {isStickerParty ? "ON 🎉" : "OFF"}</span>
          </motion.button>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[1.1] mb-8 max-w-5xl text-dark flex flex-col items-center">
          <AnimatedText text="Honest Thoughts." splitBy="character" className="block text-center" delay={0.1} />
          <AnimatedText 
            text="Stay Unseen." 
            splitBy="character"
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent text-center" 
            delay={0.4} 
          />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl text-foreground/70 max-w-3xl mb-12 font-medium leading-relaxed px-4"
        >
          Get honest thoughts, anonymous confessions, and real feedback from the people around you. Create your free INK profile today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a 
            href="https://ink-social.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={fireConfetti}
            className="cursor-none"
          >
            <MagneticButton 
              className="group relative h-16 px-10 rounded-full bg-dark text-white font-bold text-lg flex items-center gap-3 hover:scale-103 transition-all duration-300 overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Enter INK</span> 
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </a>
          
          <Link to="/features">
            <MagneticButton className="h-16 px-10 rounded-full bg-white text-dark font-bold text-lg border border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 shadow-sm relative overflow-hidden group">
              <span className="relative z-10">Explore Features</span>
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>

      {/* Abstract 3D Floating Elements with Giphys (Only on Quality level 3 / Desktop to optimize layers) */}
      {quality >= 3 && !isMobile && (
        <>
          <motion.div style={floatingLeftStyle} className="absolute top-1/4 left-[5%] lg:left-[10%] hidden md:flex z-20 will-change-transform">
            <Tooltip content="We love fun!" position="right">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/10 blur-lg group-hover:bg-primary/30 transition-colors duration-500 rounded-full" />
                <CustomImage 
                  src="https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.webp" 
                  alt="Cute dancing dog"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl transform rotate-12 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 relative z-10 bg-transparent"
                  imageClassName="object-cover"
                />
              </div>
            </Tooltip>
          </motion.div>

          <motion.div style={floatingRightStyle} className="absolute bottom-1/4 right-[5%] lg:right-[15%] hidden lg:flex z-20 will-change-transform">
            <Tooltip content="So much joy!" position="left">
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/10 blur-lg group-hover:bg-accent/30 transition-colors duration-500 rounded-full" />
                <CustomImage 
                  src="https://media.giphy.com/media/3o7aD2saalEvTe8XnW/giphy.webp" 
                  alt="Excited happy sticker"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] border-4 border-white shadow-xl transform -rotate-12 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 relative z-10 bg-transparent"
                  imageClassName="object-cover"
                />
              </div>
            </Tooltip>
          </motion.div>
        </>
      )}

      {/* Foreground Super-Fast Parallax Glass Cards (Only on Quality level 3) */}
      {quality >= 3 && (
        <>
          <motion.div 
            style={foregroundFastStyle} 
            className="absolute bottom-12 left-[18%] hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-md z-30 pointer-events-none rotate-[-6deg] will-change-transform"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">🔒</div>
            <div className="text-left">
              <p className="text-[10px] font-mono uppercase tracking-wider text-dark/40 font-bold leading-none">Security</p>
              <p className="text-xs font-black text-dark font-sans">100% Secure</p>
            </div>
          </motion.div>

          <motion.div 
            style={foregroundSlowStyle} 
            className="absolute top-2/3 right-[10%] hidden xl:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 shadow-md z-30 pointer-events-none rotate-[4deg] will-change-transform"
          >
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs">🌸</div>
            <div className="text-left">
              <p className="text-[10px] font-mono uppercase tracking-wider text-dark/40 font-bold leading-none">Identity</p>
              <p className="text-xs font-black text-dark font-sans">Stay Unseen</p>
            </div>
          </motion.div>
        </>
      )}

      {/* Interactive Drag-and-Toss Giphy Stickers */}
      {stickers.map((st) => (
        <motion.div
          key={st.id}
          initial={{ scale: 0, opacity: 0, rotate: st.rotate }}
          animate={{ scale: st.scale, opacity: 1 }}
          drag
          dragConstraints={ref}
          dragElastic={0.1}
          className="absolute pointer-events-auto cursor-grab active:cursor-grabbing z-50 group"
          style={{
            left: st.x,
            top: st.y,
            x: "-50%",
            y: "-50%",
          }}
        >
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-white/50 backdrop-blur-sm p-1">
            <button 
              onClick={(ev) => {
                ev.stopPropagation();
                setStickers((prev) => prev.filter(s => s.id !== st.id));
              }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-auto"
            >
              ×
            </button>
            <CustomImage 
              src={st.url} 
              alt="Draggable sticker" 
              className="w-full h-full border-none rounded-xl overflow-hidden bg-transparent"
              imageClassName="object-cover"
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
});
