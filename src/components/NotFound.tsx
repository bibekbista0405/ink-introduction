import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, PenTool } from 'lucide-react';
import { Magnetic } from './ui/Magnetic';
import { fireConfetti } from '../lib/confetti';
import { CustomImage } from './ui/CustomImage';
import ink404Illustration from '../assets/images/ink_404_illustration_1783715924172.jpg';

interface InkDrop {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export function NotFound() {
  const [inkSpills, setInkSpills] = useState<InkDrop[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Trigger eyes blinking occasionally
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleSpillInk = (e: React.MouseEvent<HTMLButtonElement>) => {
    fireConfetti();
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    const newDrops: InkDrop[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: startX + (Math.random() - 0.5) * 160,
      y: startY + (Math.random() - 0.5) * 40,
      size: Math.random() * 24 + 12,
      color: i % 3 === 0 ? '#FF8BA7' : i % 3 === 1 ? '#C3AED6' : '#33272A'
    }));

    setInkSpills((prev) => [...prev, ...newDrops].slice(-30)); // Limit to 30 drops max
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 py-12 text-center overflow-visible select-none">
      
      {/* Falling Ink Droplets Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <AnimatePresence>
          {inkSpills.map((drop) => (
            <motion.div
              key={drop.id}
              className="absolute rounded-full"
              style={{
                left: drop.x,
                top: drop.y,
                width: drop.size,
                height: drop.size,
                backgroundColor: drop.color,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
              initial={{ opacity: 0, scale: 0.2, y: 0 }}
              animate={{
                opacity: [0.8, 1, 0],
                scale: [1, 1.2, 0.4],
                y: window.innerHeight * 0.8,
                rotate: [0, 45, 180]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.2,
                ease: [0.25, 1, 0.5, 1],
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left relative z-20">
        
        {/* Typographic & Message Column */}
        <div className="flex flex-col justify-center order-2 md:order-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-black text-primary uppercase tracking-wider mb-6 w-fit mx-auto md:mx-0">
            <PenTool className="w-3.5 h-3.5" />
            <span>Post Astray</span>
          </div>
          
          {/* Animated Big 404 Title */}
          <h1 className="text-7xl md:text-8xl font-black text-dark tracking-tighter mb-4 flex justify-center md:justify-start items-baseline">
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              4
            </motion.span>
            <motion.span
              className="inline-block mx-1 relative"
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-primary">0</span>
              {/* Dripping dot under the zero */}
              <motion.span
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 rounded-full bg-primary"
                animate={{
                  y: [0, 15, 30, 0],
                  scale: [1, 0.8, 0.5, 1],
                  opacity: [1, 1, 0, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.span>
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              4
            </motion.span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 leading-snug">
            Lost in the Inkwell
          </h2>
          
          <p className="text-foreground/80 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-md">
            This letter seems to have gone astray. It was written in invisible ink, or perhaps the message was sealed and sent to a wrong room. Let's guide you back safely.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Magnetic strength={0.15}>
              <motion.div
                whileTap={{
                  scale: 1.05,
                  filter: "brightness(1.15) contrast(1.05)",
                  boxShadow: "0px 8px 24px rgba(255, 139, 167, 0.45)",
                }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/"
                  className="w-full inline-flex items-center justify-center gap-2 bg-dark text-white font-bold px-8 py-3.5 rounded-full hover:bg-dark/90 transition-all shadow-md hover:shadow-lg cursor-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return Home</span>
                </Link>
              </motion.div>
            </Magnetic>

            <Magnetic strength={0.15}>
              <motion.button
                whileTap={{
                  scale: 1.05,
                  filter: "brightness(1.15) contrast(1.05)",
                  boxShadow: "0px 8px 24px rgba(255, 139, 167, 0.45)",
                }}
                onClick={handleSpillInk}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-dark border border-primary/25 font-bold px-6 py-3.5 rounded-full hover:bg-primary/5 hover:border-primary transition-all shadow-sm cursor-none"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Spill Ink</span>
              </motion.button>
            </Magnetic>
          </div>
        </div>

        {/* Mascot & SVG Animation Column */}
        <div className="flex items-center justify-center order-1 md:order-2">
          <motion.div
            className="relative w-72 h-72 md:w-85 md:h-85 flex items-center justify-center bg-white/40 backdrop-blur-md rounded-full border border-primary/10 shadow-xl shadow-primary/5"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Background Blob / Ink Pool */}
            <motion.div
              className="absolute w-56 h-56 rounded-full bg-secondary/30 blur-2xl z-0"
              animate={{
                scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Floating Origami Paper Airplane */}
            <motion.div
              className="absolute z-10 w-16 h-16 pointer-events-none"
              animate={{
                x: [80, 100, 70, 80],
                y: [-80, -110, -90, -80],
                rotate: [-15, -5, -25, -15],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-accent drop-shadow-md">
                <path
                  d="M1.91 11.08c-.38.16-.39.69-.02.87l6.81 3.23c.31.15.68.08.92-.17l9.46-9.46c.15-.15.37.07.22.22l-9.46 9.46c-.25.25-.32.61-.17.92l3.23 6.81c.18.38.71.37.87-.02L21.72 3.1c.12-.29-.19-.6-.48-.48L1.91 11.08z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>

            {/* Whimsical 404 Illustration with Custom Frame */}
            <motion.div
              className="relative w-56 h-56 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-primary/20 shadow-xl z-10 select-none bg-white p-2"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CustomImage
                src={ink404Illustration}
                alt="INK whimsical 404 illustration"
                aspectRatio="1/1"
                className="border-none bg-transparent rounded-2xl w-full h-full select-none pointer-events-none"
                imageClassName="rounded-2xl pointer-events-none"
                referrerPolicy="no-referrer"
              />
              {/* Subtle glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/10 to-transparent pointer-events-none rounded-2xl" />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
