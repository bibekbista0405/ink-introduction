import { motion, AnimatePresence } from 'motion/react';
import { useState, memo } from 'react';
import { Star, Quote, Sparkles, MessageSquare, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { TestimonialCardSkeleton } from './ui/TestimonialCardSkeleton';
import { Skeleton } from './ui/Skeleton';
import { CustomImage } from './ui/CustomImage';
import { TiltCard } from './ui/TiltCard';
import { usePerformanceSettings } from '../lib/performance';

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    handle: "@sarahj",
    content: "I shared my INK link on my Insta story and received over 100 confessions in an hour! The questions were so fun and it's completely anonymous.",
    rating: 5,
    color: "from-[#FF9A9E] to-[#FECFEF]",
    avatar: "https://i.pravatar.cc/150?img=1",
    sticker: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png",
    giphy: "https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif"
  },
  {
    id: 2,
    name: "Alex Rivera",
    handle: "@arivera",
    content: "The Never Have I Ever and Dealbreaker question features are incredible. It sparks the most hilarious conversations in my DMs.",
    rating: 5,
    color: "from-[#a18cd1] to-[#fbc2eb]",
    avatar: "https://i.pravatar.cc/150?img=11",
    sticker: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Fire.png",
    giphy: "https://media.giphy.com/media/l0amJzVHIAfl7jMDos/giphy.gif"
  },
  {
    id: 3,
    name: "Emily Chen",
    handle: "@emilyc_design",
    content: "The custom profile themes are beautiful! I matches my page aesthetic perfectly. My followers love sending anonymous Q&As.",
    rating: 5,
    color: "from-[#84fab0] to-[#8fd3f4]",
    avatar: "https://i.pravatar.cc/150?img=5",
    sticker: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Partying%20Face.png",
    giphy: "https://media.giphy.com/media/xT0xezQGU5xCDJuCPe/giphy.gif"
  },
  {
    id: 4,
    name: "Marcus Johnson",
    handle: "@marcusj",
    content: "I was skeptical about cyberbullying, but INK's spam and moderation filter is brilliant. It feels completely safe.",
    rating: 4,
    color: "from-[#f6d365] to-[#fda085]",
    avatar: "https://i.pravatar.cc/150?img=12",
    sticker: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png",
    giphy: "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif"
  },
  {
    id: 5,
    name: "Sophia Taylor",
    handle: "@sophiat",
    content: "The detailed visitor tracking and analytics dashboard lets me see how my shares are performing. I upgraded to Premium instantly.",
    rating: 5,
    color: "from-[#e0c3fc] to-[#8ec5fc]",
    avatar: "https://i.pravatar.cc/150?img=9",
    sticker: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Clapping%20Hands.png",
    giphy: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif"
  }
];

export const Testimonials = memo(function Testimonials() {
  const [activeId, setActiveId] = useState(1);
  const [isLoading] = useState(false);
  const { quality } = usePerformanceSettings();

  const showDecorations = quality >= 2;
  const showActiveAnimations = quality >= 3;

  return (
    <section id="testimonials" className="py-24 md:py-32 relative overflow-hidden bg-dark text-white will-change-[transform,opacity]">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
         {showDecorations && (
           <>
             <div className={cn("absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px] mix-blend-overlay will-change-[transform,opacity]", showActiveAnimations && "animate-pulse")} style={{ animationDuration: '4s' }} />
             <div className={cn("absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] mix-blend-overlay will-change-[transform,opacity]", showActiveAnimations && "animate-pulse")} style={{ animationDuration: '6s', animationDelay: '2s' }} />
           </>
         )}
         
         {/* Floating Emojis (Fully optimized based on quality settings) */}
         {showDecorations && [
            { src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png", top: "10%", left: "10%", size: "w-16 h-16 md:w-20 md:h-20", delay: 0 },
            { src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png", top: "60%", left: "5%", size: "w-20 h-20 md:w-28 md:h-28", delay: 2 },
            { src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Heart-Eyes.png", top: "25%", left: "85%", size: "w-24 h-24 md:w-32 md:h-32", delay: 1 },
            { src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Fire.png", top: "75%", left: "85%", size: "w-16 h-16 md:w-24 md:h-24", delay: 3 },
            { src: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Party%20Popper.png", top: "85%", left: "45%", size: "w-20 h-20 md:w-24 md:h-24", delay: 1.5 },
         ].map((emoji, i) => {
           const motionProps = showActiveAnimations ? {
             animate: { 
               y: [0, -30, 0],
               x: [0, 20, 0],
               rotate: [0, 15, -15, 0]
             },
             transition: {
               duration: 8 + i * 2,
               repeat: Infinity,
               ease: "easeInOut" as const,
               delay: emoji.delay
             }
           } : {};

           return (
             <motion.div
               key={i}
               className={cn("absolute drop-shadow-2xl opacity-40 md:opacity-60 mix-blend-screen will-change-transform", emoji.size)}
               style={{ top: emoji.top, left: emoji.left }}
               {...motionProps}
             >
               <CustomImage 
                 src={emoji.src}
                 alt="Decorative floating emoji"
                 className="w-full h-full border-none rounded-none bg-transparent"
                 imageClassName="object-contain"
               />
             </motion.div>
           );
         })}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-white tracking-widest uppercase">Wall of Love</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 relative inline-block"
          >
            Voices of <br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">the INK fam.</span>
            
            {/* Fun bouncing star near title (Optimized) */}
            {showDecorations && (
              <motion.div 
                className="absolute -top-10 -right-16 w-16 h-16 md:w-20 md:h-20 hidden md:block drop-shadow-2xl"
                animate={showActiveAnimations ? { y: [0, -15, 0], rotate: [0, 10, -10, 0] } : undefined}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <CustomImage 
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png"
                  alt="Star-struck bouncing emoji"
                  className="w-full h-full border-none rounded-none bg-transparent"
                  imageClassName="object-contain"
                />
              </motion.div>
            )}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-medium"
          >
            Click any card to expand and read their full story.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 md:gap-6 grid-flow-dense">
          {isLoading ? (
            <>
              <TestimonialCardSkeleton isActive={true} delay={0.0} />
              <TestimonialCardSkeleton isActive={false} delay={0.05} />
              <TestimonialCardSkeleton isActive={false} delay={0.1} />
              <TestimonialCardSkeleton isActive={false} delay={0.15} />
              <TestimonialCardSkeleton isActive={false} delay={0.2} />
              {/* Join CTA Card Skeleton */}
              <div className="row-span-1 md:col-span-1 md:row-span-1 rounded-[2rem] md:rounded-[2.5rem] bg-white/5 border border-white/10 p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <Skeleton className="w-12 h-12 rounded-full bg-white/10 mb-4" />
                <Skeleton className="h-6 w-24 bg-white/10 mb-2" />
                <Skeleton className="h-4 w-32 bg-white/5 mb-6" />
                <Skeleton className="h-10 w-full rounded-full bg-white/10" />
              </div>
            </>
          ) : (
            <>
              {testimonials.map((t, index) => {
                const isActive = t.id === activeId;
                
                return (
                  <TiltCard
                    layout={quality >= 2 ? "position" : false}
                    key={t.id}
                    isActive={isActive}
                    onClick={() => setActiveId(t.id)}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className={cn(
                      isActive 
                        ? "row-span-2 md:col-span-2" 
                        : "row-span-1 md:col-span-1"
                    )}
                    transition={{ 
                      opacity: { duration: 0.4, delay: index * 0.05 },
                      y: { duration: 0.4, delay: index * 0.05 },
                      layout: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 }
                    }}
                  >
                    <AnimatePresence initial={false} mode="wait">
                      {isActive ? (
                        <motion.div 
                          key="active"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 p-6 md:p-12 flex flex-col h-full overflow-hidden"
                        >
                          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20", t.color)} />
                          
                          {/* Floating Sticker */}
                          {showDecorations && (
                            <motion.div
                              className="absolute top-8 right-8 w-16 h-16 md:w-24 md:h-24 z-20 drop-shadow-2xl"
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 10 }}
                              transition={{ type: "spring", damping: 10, delay: 0.15 }}
                              whileHover={{ scale: 1.1, rotate: 0 }}
                            >
                              <CustomImage 
                                src={t.sticker}
                                alt="Sticker"
                                className="w-full h-full border-none rounded-none bg-transparent"
                                imageClassName="object-contain"
                              />
                            </motion.div>
                          )}

                          {/* Giphy Image embedded beautifully */}
                          {showDecorations && (
                            <motion.div 
                              initial={{ opacity: 0, x: 50, rotate: 10 }}
                              animate={{ opacity: 0.15, x: 0, rotate: -5 }}
                              className="absolute -bottom-10 -right-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden blur-sm mix-blend-screen pointer-events-none"
                            >
                              <CustomImage 
                                src={t.giphy} 
                                alt="Giphy" 
                                className="w-full h-full border-none rounded-none bg-transparent" 
                                imageClassName="object-cover" 
                              />
                            </motion.div>
                          )}

                          {/* Decorative quote icon placed safely in DOM before text container to prevent z-index issues */}
                          <Quote className="absolute top-1/2 right-12 w-24 h-24 md:w-32 md:h-32 text-white/5 rotate-12 -translate-y-1/2 pointer-events-none" />
                          
                          <div className="relative z-10 flex flex-col h-full w-full md:w-3/4">
                            <div className="flex gap-1 mb-4 md:mb-6">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  <Star className={cn("w-5 h-5 md:w-6 md:h-6", i < t.rating ? 'text-primary fill-primary drop-shadow-[0_0_8px_rgba(255,139,167,0.8)]' : 'text-white/20')} />
                                </motion.div>
                              ))}
                            </div>
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="text-xl md:text-4xl font-medium leading-tight mb-4 md:mb-8 text-white/95 tracking-tight relative z-20"
                            >
                              "{t.content}"
                            </motion.p>
                            <div className="mt-auto flex items-center gap-4 md:gap-5">
                              <motion.div 
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.15, type: "spring" }}
                                className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden bg-transparent" 
                              >
                                <CustomImage 
                                  src={t.avatar}
                                  alt={t.name}
                                  className="w-full h-full border-none rounded-none bg-transparent"
                                  imageClassName="object-cover"
                                />
                              </motion.div>
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                <h4 className="font-bold text-lg md:text-xl flex items-center gap-2">
                                  {t.name}
                                </h4>
                                <p className="text-sm md:text-base text-white/50 font-medium">{t.handle}</p>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="inactive"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 p-5 md:p-8 flex flex-col h-full group"
                        >
                          <div className="flex justify-between items-start mb-3 md:mb-6">
                            <div className="relative">
                               <CustomImage 
                                 src={t.avatar} 
                                 alt={t.name} 
                                 className="w-12 h-12 rounded-full border border-white/10" 
                                 imageClassName="object-cover" 
                               />
                               {showDecorations && (
                                 <CustomImage 
                                   src={t.sticker} 
                                   alt="Sticker" 
                                   className="w-6 h-6 absolute -bottom-2 -right-2 border-none bg-transparent" 
                                   imageClassName="drop-shadow-md group-hover:scale-125 transition-transform duration-300 object-cover" 
                                 />
                               )}
                            </div>
                            
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                            </div>
                          </div>
                          
                          <p className="text-sm md:text-base text-white/60 line-clamp-2 md:line-clamp-3 group-hover:text-white/90 transition-colors font-medium mb-auto">
                            "{t.content}"
                          </p>
                          
                          <h4 className="font-bold text-sm text-white/80 mt-2 md:mt-4">{t.name}</h4>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </TiltCard>
                )
              })}
              
              {/* Join CTA Card */}
              <TiltCard
                layout={quality >= 2 ? "position" : false}
                variant="cta"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  opacity: { duration: 0.4, delay: testimonials.length * 0.05 },
                  y: { duration: 0.4, delay: testimonials.length * 0.05 },
                  layout: { type: "spring", stiffness: 280, damping: 28, mass: 0.8 }
                }}
                className="row-span-1 md:col-span-1 md:row-span-1 p-6 md:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
                
                {showDecorations && (
                  <motion.div
                     animate={showActiveAnimations ? { rotate: 360 } : undefined}
                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                     className="absolute -top-10 -left-10 opacity-30"
                  >
                     <CustomImage 
                       src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Confetti%20Ball.png" 
                       alt="Confetti Ball" 
                       className="w-32 h-32 border-none bg-transparent" 
                       imageClassName="blur-sm" 
                     />
                  </motion.div>
                )}
                
                <Sparkles className="w-12 h-12 text-primary mb-6 group-hover:scale-125 transition-transform duration-500 drop-shadow-sm relative z-10" />
                <h4 className="font-bold text-2xl text-white mb-2 relative z-10">Join the Fam</h4>
                <p className="text-base text-white/60 mb-8 font-medium relative z-10">Start receiving anonymous feedback today.</p>
                <motion.button 
                  whileTap={{
                    scale: 1.05,
                    filter: "brightness(1.15) contrast(1.05)",
                    boxShadow: "0px 8px 24px rgba(255, 139, 167, 0.45)",
                  }}
                  className="w-full py-4 rounded-full bg-white text-dark font-bold text-base hover:scale-[1.02] active:scale-95 transition-all shadow-lg relative z-10 overflow-hidden group/btn"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </TiltCard>
            </>
          )}
        </div>

      </div>
    </section>
  );
});
