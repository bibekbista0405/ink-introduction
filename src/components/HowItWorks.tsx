import { motion, useScroll, useTransform } from 'motion/react';
import { Link, Send, Eye, User, Share2, MessageCircle, Sparkles } from 'lucide-react';
import { useRef, memo } from 'react';
import { cn } from '../lib/utils';
import { CustomImage } from './ui/CustomImage';
import { Reveal, RevealChild } from './ui/Reveal';

const steps = [
  {
    icon: User,
    title: "Create Your Profile",
    description: "Claim your unique link in seconds. Customize your profile page, choose premium theme skins, and set up your game presets.",
    color: "from-primary to-accent",
    giphy: "https://media.giphy.com/media/unQ3IJUWK7cj6/giphy.gif"
  },
  {
    icon: Share2,
    title: "Share Your Link",
    description: "Put your ink.app link in your Instagram bio, TikTok profile, Snapchat, or share it directly to your stories.",
    color: "from-secondary to-primary",
    giphy: "https://media.giphy.com/media/l0HlUxcWRYigmDKMM/giphy.gif"
  },
  {
    icon: MessageCircle,
    title: "Receive Confessions",
    description: "Followers send anonymous replies, honest questions, and deep confessions directly from their browser—no account needed.",
    color: "from-accent to-[#FF8BA7]",
    giphy: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif"
  },
  {
    icon: Sparkles,
    title: "Discover Real Thoughts",
    description: "Unlock anonymous feedback, review metrics, play interactive social games, and share answers back to your social stories.",
    color: "from-[#FF8BA7] to-secondary",
    giphy: "https://media.giphy.com/media/l4Ho0At2UD2d7WyD6/giphy.gif"
  }
];

export const HowItWorks = memo(function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,139,167,0.15)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-32">
          <Reveal yOffset={40} delay={0.1}>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-dark">
              How INK <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Works</span>.
            </h2>
          </Reveal>
          <Reveal yOffset={30} blur={5} delay={0.3}>
            <p className="text-foreground/70 text-xl md:text-2xl max-w-3xl mx-auto font-medium">
              A frictionless loop designed to spark honest, curious, and incredibly fun social interactions.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          <Reveal staggerChildren={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <RevealChild 
                key={i}
                yOffset={60}
                scale={0.93}
                className="flex flex-col items-center text-center relative group"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="w-28 h-28 rounded-[2.2rem] bg-white border border-primary/20 flex items-center justify-center mb-8 relative overflow-hidden shadow-xl"
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-30 transition-opacity duration-500", step.color)}></div>
                  <step.icon className="w-10 h-10 text-primary relative z-10 drop-shadow-sm" />
                  
                  {/* Glowing Number Badge */}
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs shadow-[0_0_12px_rgba(255,139,167,0.5)] z-20">
                    {i + 1}
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-dark mb-3 transition-all duration-300 group-hover:text-primary">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed font-medium text-base max-w-xs mb-6">{step.description}</p>

                {/* Creative interactive Giphy container for the step */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1.5 : -1.5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-full max-w-[220px] aspect-[4/3] rounded-3xl overflow-hidden border-2 border-primary/10 bg-white/40 backdrop-blur-sm p-1.5 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 relative mt-auto"
                >
                  <div className="w-full h-full rounded-[1.2rem] overflow-hidden relative">
                    <CustomImage 
                      src={step.giphy} 
                      alt={step.title} 
                      className="w-full h-full border-none rounded-none bg-transparent" 
                      imageClassName="object-cover group-hover:scale-105 transition-all duration-500" 
                    />
                  </div>
                </motion.div>
              </RevealChild>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
});
