import { motion } from 'motion/react';
import { Sparkles, Zap, ShieldAlert, LayoutDashboard, Globe, LockKeyhole, ArrowUpRight, MessageSquare, Heart, Crown, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { GlowingCard } from './ui/GlowingCard';
import { Tooltip } from './ui/Tooltip';
import { useState, useRef, memo } from 'react';
import { AnimatedText } from './ui/AnimatedText';
import { ScrollMilestones } from './ScrollMilestones';
import { CustomImage } from './ui/CustomImage';
import { Tilt } from './ui/Tilt';
import { SectionReveal } from './ui/SectionReveal';

// Premium Generated Abstract Vector Icons
import iconEncryption from '../assets/images/icon_encryption_1783497797892.webp';
import iconPrivacy from '../assets/images/icon_privacy_1783497811834.webp';
import iconSpeed from '../assets/images/icon_speed_1783497824887.webp';
import iconAesthetic from '../assets/images/icon_aesthetic_1783497837082.webp';
import iconGlobal from '../assets/images/icon_global_1783497849832.webp';
import iconDashboard from '../assets/images/icon_dashboard_1783497862649.webp';

function FeatureCardSkeleton({ colSpan }: { colSpan?: string }) {
  return (
    <div className={cn("p-8 md:p-10 rounded-[2.5rem] bg-white border border-primary/10 flex flex-col justify-between h-[380px] shadow-sm animate-pulse", colSpan)}>
      <div className="flex justify-between items-start mb-12">
        <div className="w-20 h-20 rounded-[2rem] bg-foreground/10" />
        <div className="w-10 h-10 rounded-full bg-foreground/10" />
      </div>
      <div>
        <div className="h-8 w-2/3 bg-foreground/10 rounded mb-4" />
        <div className="h-4 w-full bg-foreground/10 rounded mb-2" />
        <div className="h-4 w-4/5 bg-foreground/10 rounded" />
      </div>
    </div>
  );
}

const features = [
  {
    title: "Anonymous Messages",
    description: "Receive deep, authentic, and fun anonymous feedback from your friends and followers without spam, abuse, or toxic noise.",
    icon: LockKeyhole,
    imageAsset: iconPrivacy,
    color: "from-[#FF9A9E] to-[#FECFEF]",
    colSpan: "lg:col-span-2",
    image: "bg-white"
  },
  {
    title: "Confessions",
    description: "Enable dedicated confession prompts on your link, inviting your circle to reveal secret thoughts and crush admissions anonymously.",
    icon: ShieldAlert,
    imageAsset: iconEncryption,
    color: "from-[#a18cd1] to-[#fbc2eb]",
    colSpan: "lg:col-span-1",
    image: "bg-white"
  },
  {
    title: "Dealbreakers",
    description: "Launch custom Dealbreaker Q&As. Poll your circle on relationships, rules, and habits, then share responses instantly.",
    icon: Zap,
    imageAsset: iconSpeed,
    color: "from-[#f6d365] to-[#fda085]",
    colSpan: "lg:col-span-1",
    image: "bg-white"
  },
  {
    title: "Never Have I Ever",
    description: "Host interactive Never Have I Ever games directly from your profile, gathering anonymous yes/no cards from your inner circle.",
    icon: Sparkles,
    imageAsset: iconAesthetic,
    color: "from-[#84fab0] to-[#8fd3f4]",
    colSpan: "lg:col-span-1",
    image: "bg-white"
  },
  {
    title: "Public Profiles",
    description: "Claim your gorgeous public home page. Style your username layout with custom fonts and stunning aesthetic preset themes.",
    icon: Globe,
    imageAsset: iconGlobal,
    color: "from-[#a1c4fd] to-[#c2e9fb]",
    colSpan: "lg:col-span-1",
    image: "bg-white"
  },
  {
    title: "Story Replies",
    description: "Turn incoming messages into shareable graphic response layouts, and share them directly on Instagram stories with one tap.",
    icon: Share2,
    imageAsset: iconSpeed,
    color: "from-[#ffecd2] to-[#fcb69f]",
    colSpan: "lg:col-span-1",
    image: "bg-white"
  },
  {
    title: "Analytics Dashboard",
    description: "Access real-time views, visitor growth patterns, conversion statistics, and detailed weekly engagement spikes.",
    icon: LayoutDashboard,
    imageAsset: iconDashboard,
    color: "from-[#e0c3fc] to-[#8ec5fc]",
    colSpan: "lg:col-span-1",
    image: "bg-white"
  },
  {
    title: "Premium Membership",
    description: "Unlock advanced theme presets, holographic custom skins, detailed visitor insight tracking, and VIP badges.",
    icon: Crown,
    imageAsset: iconAesthetic,
    color: "from-[#f6d365] to-[#fda085]",
    colSpan: "lg:col-span-1",
    image: "bg-white"
  }
];

export const Features = memo(function Features() {
  const [isLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="features" ref={sectionRef} className="py-32 relative overflow-hidden will-change-transform-opacity">
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/30 blur-[100px] pointer-events-none animate-blob will-change-transform-opacity" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 mb-6 shadow-sm will-change-transform-opacity"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-bold text-primary tracking-widest uppercase">Platform Features</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-dark flex flex-col items-center gap-1">
            <AnimatedText text="Engineered for" delay={0.1} />
            <AnimatedText 
              text="Self-Discovery." 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent" 
              delay={0.4} 
            />
          </h2>
        </div>

        {/* Dynamic scroll progress milestone tracker with pops and micro-animations */}
        <ScrollMilestones containerRef={sectionRef} />

        <SectionReveal.List className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            features.map((feature, i) => (
              <FeatureCardSkeleton
                key={`skeleton-${i}`}
                colSpan={feature.colSpan}
              />
            ))
          ) : (
            features.map((feature, i) => (
              <SectionReveal.Item
                key={i}
                className={cn("h-full group", feature.colSpan)}
              >
                <Tilt maxTilt={8} className="w-full h-full">
                  <GlowingCard className={cn("h-full p-8 md:p-10 flex flex-col justify-between overflow-hidden", feature.image)}>
                    
                    <div className="flex justify-between items-start mb-12 relative z-10">
                      <motion.div 
                        whileHover={{ scale: 1.08, rotate: 4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="w-20 h-20 rounded-[2rem] overflow-hidden border border-primary/20 shadow-md bg-white flex items-center justify-center p-0.5"
                      >
                        <CustomImage 
                          src={feature.imageAsset} 
                          alt={feature.title} 
                          aspectRatio="1/1"
                          className="border-none bg-transparent rounded-[1.8rem] w-full h-full"
                          imageClassName="rounded-[1.8rem]"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                      <Tooltip content="Learn more" position="left">
                        <div className="w-10 h-10 rounded-full bg-light flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <ArrowUpRight className="w-5 h-5 text-dark/30 group-hover:text-primary transition-colors duration-300" />
                        </div>
                      </Tooltip>
                    </div>
                    
                    <div className="relative z-10 mt-auto">
                      <h3 className="text-3xl font-bold text-dark mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">{feature.title}</h3>
                      <p className="text-foreground/70 font-medium leading-relaxed text-lg group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
                    </div>
                  </GlowingCard>
                </Tilt>
              </SectionReveal.Item>
            ))
          )}
        </SectionReveal.List>
      </div>
    </section>
  );
});
