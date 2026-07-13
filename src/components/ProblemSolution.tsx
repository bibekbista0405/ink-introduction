import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, memo } from 'react';
import { AlertCircle, Heart, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { CustomImage } from './ui/CustomImage';

import { Tooltip } from './ui/Tooltip';

export const ProblemSolution = memo(function ProblemSolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Parallax transforms
  const y1 = useTransform(springProgress, [0, 1], [150, -150]);
  const y2 = useTransform(springProgress, [0, 1], [-150, 150]);
  
  const card1Y = useTransform(springProgress, [0, 1], [50, -50]);
  const card2Y = useTransform(springProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-24 md:py-40 relative overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] rounded-full bg-danger/10 blur-[100px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-primary/20 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20 md:mb-32 relative">
          {/* Floating funny sticker */}
          <motion.div 
            className="absolute -top-10 left-10 md:left-1/4 w-16 h-16 md:w-20 md:h-20 drop-shadow-2xl"
            animate={{ 
              x: [0, 15, -15, 0],
              y: [0, -22, 10, 0], 
              rotate: [0, -15, 15, 0] 
            }}
            transition={{ 
              x: { repeat: Infinity, duration: 6.5, ease: "easeInOut" },
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" }
            }}
          >
            <CustomImage 
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Peeking%20Eye.png"
              alt="Peeking eye emoji"
              className="w-full h-full border-none rounded-none bg-transparent"
              imageClassName="object-contain"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-primary/20 mb-6 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-black text-primary uppercase tracking-widest">The Evolution</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-dark mb-6"
          >
            From <span className="text-danger">Boring</span> to <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Honest Magic.</span>
          </motion.h2>
          
          {/* Another funny sticker */}
          <motion.div 
            className="absolute top-10 right-10 md:right-1/4 w-16 h-16 md:w-24 md:h-24 drop-shadow-2xl"
            animate={{ 
              x: [0, -18, 12, 0],
              y: [0, 24, -10, 0], 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              x: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.5 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 },
              scale: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 },
              rotate: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }
            }}
          >
            <CustomImage 
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Exploding%20Head.png"
              alt="Exploding head emoji"
              className="w-full h-full border-none rounded-none bg-transparent"
              imageClassName="object-contain"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative">
          
          {/* The Old Way Card */}
          <motion.div 
            style={{ y: card1Y }}
            className="w-full flex"
          >
            <div className="bg-white/60 backdrop-blur-2xl border border-danger/20 rounded-[3rem] p-8 md:p-12 shadow-xl w-full hover:shadow-danger/10 hover:border-danger/30 transition-all duration-300 relative overflow-hidden group">
              {/* Funny Giphy for Old Way */}
              <div className="w-full h-48 md:h-56 rounded-3xl overflow-hidden mb-8 relative bg-danger/5">
                <div className="absolute inset-0 bg-danger/10 mix-blend-multiply z-10"></div>
                <CustomImage 
                  src="https://media.giphy.com/media/1F9xFZ6x0h6gM/giphy.gif" 
                  alt="Stressed cat typing" 
                  className="w-full h-full border-none rounded-none bg-transparent" 
                  imageClassName="filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                />
                <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-danger">The Past</div>
              </div>

              <div className="flex items-center gap-4 mb-6 text-danger">
                <Tooltip content="The Past" position="top">
                  <div className="p-3 bg-danger/10 rounded-2xl">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                </Tooltip>
                <h3 className="text-3xl font-bold">The Old Way</h3>
              </div>
              
              <ul className="space-y-6">
                {[
                  "Fear of judgment prevents honest feedback and deep connections.", 
                  "Curated social feeds replace genuine, unfiltered human interactions.", 
                  "Burning questions remain unasked due to awkward social barriers."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-foreground/80 font-medium text-lg">
                    <span className="w-2 h-2 rounded-full bg-danger/50 mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* The INK Way Card */}
          <motion.div 
            style={{ y: card2Y }}
            className="w-full flex lg:mt-24"
          >
            <div className="bg-white border-2 border-primary/30 rounded-[3rem] p-8 md:p-12 shadow-2xl w-full relative overflow-hidden group hover:shadow-primary/20 hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                
                {/* Cute Giphy for New Way */}
                <div className="w-full h-48 md:h-56 rounded-3xl overflow-hidden mb-8 relative bg-primary/5 shadow-inner">
                  <CustomImage 
                    src="https://media.giphy.com/media/JpG2A9P3dPHXaTYrwu/giphy.gif" 
                    alt="Happy typing dog" 
                    className="w-full h-full border-none rounded-none bg-transparent" 
                    imageClassName="group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">The Future</div>
                </div>

                <div className="flex items-center gap-4 mb-6 text-primary">
                  <Tooltip content="The Future" position="top">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <Heart className="w-8 h-8 fill-primary/20" />
                    </div>
                  </Tooltip>
                  <h3 className="text-3xl font-bold">The INK Way</h3>
                </div>
                
                <ul className="space-y-6">
                  {[
                    "Absolute privacy encourages radical, beautifully unfiltered honesty.", 
                    "Focus on curiosity, secret sharing, and delightful interactive games.", 
                    "A frictionless, safe space to ask exactly what you need to know."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-dark font-bold text-lg">
                      <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent mt-2.5 shrink-0 shadow-[0_0_10px_rgba(255,139,167,0.5)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});
