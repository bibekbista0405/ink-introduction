import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, memo } from 'react';
import { CustomImage } from './ui/CustomImage';
import { MagneticButton } from './ui/MagneticButton';
import { usePerformanceSettings } from '../lib/performance';

interface GifItem {
  url: string;
  top: string;
  left: string;
  rotation: number;
  scale: number;
}

// Solid, reliable Giphy IDs that align with our section vibe
const INITIAL_GIF_IDS = [
  'unQ3IJUWK7cj6', // Sneak cat typing
  'l0HlUxcWRYigmDKMM', // Colorful retro celebration
  'xT0GqFj57K5Neeu7h6', // Neon flashing stars
  '3o7TKSjRrfIPjeiVyM', // Playful dance
  'l4Ho0At2UD2d7WyD6', // Mindblown/excited reaction
];

const REACTION_GIF_IDS = [
  '11sBLVxNs7v6WA', // Cash success celebration
  '2A75RyXVzzSI2bx4Gj', // Clean sweeping cartoon
  'J1Y89ThkHjwJxeRS0A', // Confetti thumbs up
  'ibolLe3mOqHE3PQTtk', // Secret lock / tech vibe
  'U7P0BlqQ2Oco5Gi9c1', // No way / funny face
];

// Fallback high-quality static Giphy CDN WebP URLs (WebP decodes 10x faster and is 80% smaller than GIF)
const DEFAULT_INITIAL_GIFS: GifItem[] = [
  { url: 'https://media.giphy.com/media/unQ3IJUWK7cj6/giphy.webp', top: '10%', left: '15%', rotation: -12, scale: 1 },
  { url: 'https://media.giphy.com/media/l0HlUxcWRYigmDKMM/giphy.webp', top: '25%', left: '70%', rotation: 15, scale: 1.1 },
  { url: 'https://media.giphy.com/media/xT0GqFj57K5Neeu7h6/giphy.webp', top: '60%', left: '10%', rotation: -8, scale: 0.9 },
  { url: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.webp', top: '50%', left: '80%', rotation: 20, scale: 1.2 },
  { url: 'https://media.giphy.com/media/l4Ho0At2UD2d7WyD6/giphy.webp', top: '75%', left: '45%', rotation: -5, scale: 1 },
];

const DEFAULT_REACTION_GIFS = [
  "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.webp",
  "https://media.giphy.com/media/2A75RyXVzzSI2bx4Gj/giphy.webp",
  "https://media.giphy.com/media/J1Y89ThkHjwJxeRS0A/giphy.webp",
  "https://media.giphy.com/media/ibolLe3mOqHE3PQTtk/giphy.webp",
  "https://media.giphy.com/media/U7P0BlqQ2Oco5Gi9c1/giphy.webp"
];

export const PlayfulGiphy = memo(function PlayfulGiphy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { quality, isMobile } = usePerformanceSettings();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yProgress = useSpring(scrollYProgress, springConfig);
  
  // Adaptive scrolling offsets: disable or minimize on lower quality / mobile
  const yOffsetMultiplier = quality <= 1 ? 0 : quality === 2 ? 60 : 150;
  const y1 = useTransform(yProgress, [0, 1], [-yOffsetMultiplier, yOffsetMultiplier]);
  const y2 = useTransform(yProgress, [0, 1], [yOffsetMultiplier, -yOffsetMultiplier]);
  
  const [activeGifs, setActiveGifs] = useState<GifItem[]>(DEFAULT_INITIAL_GIFS);
  const [fetchedReactions, setFetchedReactions] = useState<string[]>(DEFAULT_REACTION_GIFS);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const fetchGiphyContent = async () => {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
      if (!apiKey) {
        return;
      }

      try {
        const idsParam = INITIAL_GIF_IDS.join(',');
        const response = await fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${idsParam}`);
        
        if (!response.ok) {
          throw new Error(`Specific Giphy IDs fetch failed with status ${response.status}`);
        }

        const result = await response.json();
        if (result && Array.isArray(result.data) && result.data.length > 0) {
          const mappedGifs = result.data.map((gif: any, i: number) => {
            const defaultPos = DEFAULT_INITIAL_GIFS[i] || { url: '', top: `${Math.random() * 60 + 10}%`, left: `${Math.random() * 60 + 10}%`, rotation: 0, scale: 1 };
            // PREFER WEB_P RENDITIONS (images?.original?.webp or images?.fixed_height?.webp) over heavy original URLs
            return {
              url: gif.images?.original?.webp || gif.images?.fixed_height?.webp || gif.images?.original?.url || defaultPos.url,
              top: defaultPos.top,
              left: defaultPos.left,
              rotation: defaultPos.rotation,
              scale: defaultPos.scale,
            };
          });
          setActiveGifs(mappedGifs);
        } else {
          throw new Error("Specific Giphy IDs returned empty data.");
        }

        const reactionsParam = REACTION_GIF_IDS.join(',');
        const reactionsResponse = await fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${reactionsParam}`);
        if (reactionsResponse.ok) {
          const reactionsResult = await reactionsResponse.json();
          if (reactionsResult && Array.isArray(reactionsResult.data) && reactionsResult.data.length > 0) {
            const mappedReactions = reactionsResult.data.map((gif: any) => 
              gif.images?.original?.webp || gif.images?.fixed_height?.webp || gif.images?.original?.url
            );
            setFetchedReactions(mappedReactions);
          }
        }

      } catch (specificError) {
        console.warn("Specific Giphy content fetch failed, triggering trending fallback:", specificError);

        try {
          const trendingResponse = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12&rating=g`);
          if (!trendingResponse.ok) {
            throw new Error(`Trending fallback failed with status ${trendingResponse.status}`);
          }

          const trendingResult = await trendingResponse.json();
          if (trendingResult && Array.isArray(trendingResult.data) && trendingResult.data.length >= 5) {
            const mappedTrending = trendingResult.data.slice(0, 5).map((gif: any, i: number) => {
              const defaultPos = DEFAULT_INITIAL_GIFS[i] || { url: '', top: '50%', left: '50%', rotation: 0, scale: 1 };
              return {
                url: gif.images?.original?.webp || gif.images?.fixed_height?.webp || gif.images?.original?.url || defaultPos.url,
                top: defaultPos.top,
                left: defaultPos.left,
                rotation: defaultPos.rotation,
                scale: defaultPos.scale,
              };
            });
            setActiveGifs(mappedTrending);

            const remainingTrending = trendingResult.data.slice(5).map((gif: any) => 
              gif.images?.original?.webp || gif.images?.fixed_height?.webp || gif.images?.original?.url
            );
            if (remainingTrending.length > 0) {
              setFetchedReactions(remainingTrending);
            }
          }
        } catch (trendingError) {
          console.error("Giphy trending fallback also failed. Safely sticking to high-quality default static URLs:", trendingError);
        }
      }
    };

    fetchGiphyContent();
  }, []);

  const addReaction = () => {
    const randomGif = fetchedReactions[Math.floor(Math.random() * fetchedReactions.length)];
    const newGif = {
      url: randomGif,
      top: `${Math.random() * 50 + 25}%`,
      left: `${Math.random() * 50 + 25}%`,
      rotation: Math.random() * 40 - 20,
      scale: Math.random() * 0.4 + 0.8
    };
    
    // Prevent state bloat by restricting active reactions array to maximum 12 items
    setActiveGifs(prev => {
      const merged = [...prev, newGif];
      return merged.length > 12 ? merged.slice(merged.length - 12) : merged;
    });
    setClickCount(prev => prev + 1);
  };

  // Performance-based rendering of floating cards on Desktop
  const desktopGifs = quality >= 3 
    ? activeGifs 
    : quality === 2 
    ? activeGifs.slice(0, 2) // Render maximum 2 floating GIFs on balanced desktop
    : []; // Low quality or Reduced motion gets ZERO floating GIFs on desktop (huge GPU save)

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden bg-background">
      {/* Dynamic Animated Background (Optimized blur based on Quality) */}
      {quality > 1 && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-primary/15 rounded-full filter transform-gpu"
            style={{
              y: y1,
              filter: quality === 3 ? 'blur(100px)' : 'blur(40px)' // Lower blur radius on Balanced/Mobile
            }}
          />
          <motion.div 
            className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-secondary/15 rounded-full filter transform-gpu"
            style={{
              y: y2,
              filter: quality === 3 ? 'blur(100px)' : 'blur(40px)'
            }}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
        
        <div className="text-center mb-16 z-30 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-primary/20 mb-6 shadow-md"
          >
            <span className="text-sm font-black text-primary uppercase tracking-widest">Beyond Words 💫</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-dark mb-6 mix-blend-multiply"
          >
            Express the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Unspoken.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto font-medium"
          >
            Sometimes text isn't enough. Let your emotions run wild with integrated GIPHY reactions. Be silly. Be you.
          </motion.p>
        </div>

        {/* Interactive Reaction Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
          className="relative z-40 mb-12"
        >
          <MagneticButton 
            whileTap={{
              scale: 1.03,
              filter: "brightness(1.1) contrast(1.02)",
              boxShadow: "0px 6px 18px rgba(255, 139, 167, 0.35)",
            }}
            onClick={addReaction}
            className="group relative px-8 py-4 bg-dark text-white rounded-full font-bold text-lg overflow-hidden shadow-xl cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              Drop a Reaction {clickCount > 0 && <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{clickCount}</span>}
            </span>
          </MagneticButton>
        </motion.div>

        {/* Floating GIFs container (Desktop only) */}
        {desktopGifs.length > 0 && (
          <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
            <AnimatePresence>
              {desktopGifs.map((gif, i) => (
                <FloatingGif key={i} index={i} {...gif} scrollProgress={yProgress} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Mobile GIFs Grid */}
        <div className="lg:hidden grid grid-cols-2 gap-4 w-full max-w-lg mx-auto z-20">
           {activeGifs.slice(-4).map((gif, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.7, rotate: (i % 2 === 0 ? -5 : 5) }}
               animate={{ opacity: 1, scale: 1, rotate: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ type: "spring", stiffness: 100, damping: 15 }}
               className="rounded-2xl overflow-hidden border-4 border-white shadow-lg aspect-square bg-white"
             >
                <CustomImage 
                  src={gif.url} 
                  alt="reaction" 
                  className="w-full h-full border-none rounded-none bg-transparent" 
                  imageClassName="object-cover" 
                />
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
});

const FloatingGif = memo(({ url, top, left, rotation, scale, index, scrollProgress }: { url: string, top: string, left: string, rotation: number, scale: number, index: number, scrollProgress: any }) => {
  const yOffset = useTransform(scrollProgress, [0, 1], [index % 2 === 0 ? -120 : 120, index % 2 === 0 ? 120 : -120]);
  
  // Curved path: horizontal coordinate moves in a subtle wave relative to scroll
  const xOffset = useTransform(scrollProgress, [0, 0.33, 0.66, 1], [
    index % 2 === 0 ? -30 : 30,
    index % 2 === 0 ? 20 : -20,
    index % 2 === 0 ? -20 : 20,
    index % 2 === 0 ? 30 : -30
  ]);
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: isHovered ? scale * 1.1 : scale }}
      exit={{ opacity: 0, scale: 0 }}
      style={{
        position: 'absolute',
        top,
        left,
        y: yOffset,
        x: xOffset,
        rotate: isHovered ? 0 : rotation,
        zIndex: isHovered ? 50 : 10
      }}
      className="pointer-events-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
    >
      <div className="w-48 h-48 rounded-2xl overflow-hidden border-[4px] border-white shadow-xl relative group bg-white">
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />
        <CustomImage 
          src={url} 
          alt="GIF Reaction" 
          className="w-full h-full border-none rounded-none bg-transparent" 
          imageClassName="pointer-events-none object-cover" 
        />
      </div>
    </motion.div>
  );
});

FloatingGif.displayName = "FloatingGif";
