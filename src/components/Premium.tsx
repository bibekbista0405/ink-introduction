import { motion } from 'motion/react';
import { Check, Star, Sparkles } from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { MagneticButton } from './ui/MagneticButton';
import { cn } from '../lib/utils';
import { AnimatedText } from './ui/AnimatedText';
import { Skeleton } from './ui/Skeleton';

function TiltCard({ children, className, delay = 0, initialX = 0, activeGlow = false }: { children: React.ReactNode, className?: string, delay?: number, initialX?: number, activeGlow?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className={cn("relative group", className)}
    >
      {activeGlow && (
        <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-[3rem] blur opacity-40 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
      )}
      <div className="relative flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
}

export const Premium = React.memo(function Premium() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section id="premium" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-accent/20 mb-6 shadow-sm"
          >
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <span className="text-sm font-bold text-accent tracking-widest uppercase">Pricing Plans</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-dark flex items-center justify-center gap-3 flex-wrap">
            <AnimatedText text="INK" delay={0.1} />
            <AnimatedText 
              text="Premium" 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" 
              delay={0.3} 
            />
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg md:text-xl font-medium"
          >
            Elevate your experience with advanced features, deeper insights, and exclusive customization options.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {isLoading ? (
            <>
              {/* Free Tier Skeleton */}
              <TiltCard 
                initialX={-50} 
                className="h-full"
              >
                <div className="p-10 md:p-12 rounded-[2.5rem] bg-white border border-primary/10 flex flex-col h-full shadow-sm relative overflow-hidden">
                  <Skeleton className="h-8 w-32 mb-4" />
                  <Skeleton className="h-16 w-48 mb-8" />
                  <Skeleton className="h-6 w-full mb-10 pb-8 border-b border-primary/10" />
                  
                  <ul className="space-y-6 mb-12 flex-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                        <Skeleton className="h-5 w-3/4" />
                      </li>
                    ))}
                  </ul>
                  
                  <Skeleton className="w-full h-16 mt-auto rounded-full" />
                </div>
              </TiltCard>

              {/* Premium Tier Skeleton */}
              <TiltCard 
                initialX={50} 
                delay={0.2}
                className="h-full"
              >
                <div className="p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-b from-primary/5 to-accent/5 border-2 border-primary/20 flex flex-col h-full shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-10 -translate-y-1/2 h-8 w-32">
                    <Skeleton className="w-full h-full rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-32 mb-4" />
                  <Skeleton className="h-16 w-48 mb-8" />
                  <Skeleton className="h-6 w-full mb-10 pb-8 border-b border-primary/10" />
                  
                  <ul className="space-y-6 mb-12 flex-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                        <Skeleton className="h-5 w-4/5" />
                      </li>
                    ))}
                  </ul>
                  
                  <Skeleton className="w-full h-16 mt-auto rounded-full" />
                </div>
              </TiltCard>
            </>
          ) : (
            <>
              {/* Free Tier */}
              <TiltCard 
                initialX={-50} 
                className="h-full"
              >
                <div className="p-10 md:p-12 rounded-[2.5rem] bg-white border border-primary/20 flex flex-col h-full shadow-lg">
                  <h3 className="text-2xl font-bold text-dark mb-2">Essential</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-extrabold text-dark">$0</span>
                    <span className="text-foreground/50 font-bold ml-2">/ forever</span>
                  </div>
                  <p className="text-foreground/70 font-medium mb-8 pb-8 border-b border-primary/10 text-lg">Everything you need to start receiving anonymous messages.</p>
                  
                  <ul className="space-y-5 mb-12 flex-1">
                    {[
                      "Unlimited incoming confessions & messages",
                      "Standard profile customization",
                      "Play active Q&A prompts",
                      "Standard shareable bio link"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-foreground/80 font-medium text-lg">
                        <Check className="w-6 h-6 text-foreground/40 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="https://ink-social.vercel.app" target="_blank" rel="noopener noreferrer" className="cursor-none w-full block">
                    <MagneticButton className="w-full py-5 mt-auto rounded-full bg-light text-dark font-bold hover:bg-primary/10 transition-colors text-lg relative overflow-hidden group border border-primary/20 shadow-sm">
                      <span className="relative z-10">Get Started</span>
                    </MagneticButton>
                  </a>
                </div>
              </TiltCard>

              {/* Premium Tier */}
              <TiltCard 
                initialX={50} 
                delay={0.2}
                activeGlow={true}
                className="h-full"
              >
                <div className="p-10 md:p-12 rounded-[2.5rem] bg-gradient-to-b from-primary/10 to-accent/10 border-2 border-primary/40 relative flex flex-col h-full backdrop-blur-2xl shadow-2xl">
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-gradient-to-r from-primary to-accent text-white px-5 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(255,139,167,0.5)] z-20">
                    <Star className="w-4 h-4 fill-current" /> Most Popular
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-2">Premium</h3>
                  <div className="mb-6 flex items-baseline">
                    <span className="text-5xl font-extrabold text-dark">$4.99</span>
                    <span className="text-foreground/50 font-bold ml-2">/ month</span>
                  </div>
                  <p className="text-foreground/80 font-medium mb-8 pb-8 border-b border-primary/20 text-lg">Advanced tools for creators, influencers, and power users.</p>
                  
                  <ul className="space-y-5 mb-12 flex-1">
                    {[
                      "Everything in Essential",
                      "Premium animated profile themes & skins",
                      "Holographic custom profile styles",
                      "Detailed visitor counts & analytics",
                      "Early access to new game modes",
                      "VIP custom styling & badge"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-4 text-dark font-medium text-lg">
                        <Check className="w-6 h-6 text-primary shrink-0 drop-shadow-sm" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="https://ink-social.vercel.app" target="_blank" rel="noopener noreferrer" className="cursor-none w-full block">
                    <MagneticButton className="w-full py-5 mt-auto rounded-full bg-dark text-white font-bold hover:scale-[1.02] transition-all duration-300 shadow-xl relative z-20 overflow-hidden group text-lg">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      <span className="relative z-10">Upgrade to Premium</span>
                    </MagneticButton>
                  </a>
                </div>
              </TiltCard>
            </>
          )}
        </div>
      </div>
    </section>
  );
});
