import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, ShieldAlert, LayoutDashboard, Globe, LockKeyhole, ArrowUpRight, MessageSquare, Heart, Crown, Share2, X, Cpu } from 'lucide-react';
import { cn } from '../lib/utils';
import { GlowingCard } from './ui/GlowingCard';
import { Tooltip } from './ui/Tooltip';
import { useState, useRef, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
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

const featureDetails: Record<string, {
  badge: string;
  specs: { label: string; value: string }[];
  architecture: string;
  deepDive: { title: string; desc: string }[];
}> = {
  "Anonymous Messages": {
    badge: "Security & Anti-Abuse",
    specs: [
      { label: "IP Masking", value: "Strict Zero-Telemetry Logging" },
      { label: "Moderation Latency", value: "<45ms (Edge AI)" },
      { label: "Spam Detection", value: "Token Bucket + Rate Limiters" },
      { label: "Data Retention", value: "Automatic Pruning Configurable" }
    ],
    architecture: "When a follower sends an anonymous message, our Edge gateway sanitizes the raw HTTP request. It completely strips incoming IP headers, geographical coordinates, user-agent details, and telemetry metadata before it ever enters our encrypted database queue. This mathematically prevents any correlation attacks or server-side mapping.",
    deepDive: [
      {
        title: "Content Safety & Real-Time Filtering",
        desc: "We run a multi-tiered filtering system using server-side localized profanity lists combined with state-of-the-art toxic classification models. Messages that exceed our harassment thresholds are immediately quarantined, protecting the creator's mental well-being without leaking sender identity."
      },
      {
        title: "Anti-Spam & Bottleneck Control",
        desc: "Uses client-side device signature tokens combined with a robust server-side sliding window log. This ensures a single browser cannot flood an inbox with repetitive statements, while genuine feedback flows seamlessly."
      }
    ]
  },
  "Confessions": {
    badge: "Engagement Engine",
    specs: [
      { label: "Prompt Customizer", value: "Classic, Midnight, Sweetheart" },
      { label: "Keyword Sanitizer", value: "Double-Layer Regex & Levenshtein" },
      { label: "Self-Destruction", value: "Configurable 24-Hour Expiry" },
      { label: "Interaction Rate", value: "+34% over Standard Feedback" }
    ],
    architecture: "The Confessions subsystem leverages a unique interactive prompt that focuses the sender's mindset on deep, emotional admissions. This prompt acts as a separate schema collection, allowing creators to isolate deep emotional secrets from standard light-hearted reviews.",
    deepDive: [
      {
        title: "The Sentiment Filter",
        desc: "To keep confessions fun and safe, INK uses sentiment scoring. Confessions with high scores of pure toxicity or stalker-like behaviors are rejected instantly, while sweet crush secrets, fun hidden apologies, or creative midnight thoughts are approved."
      },
      {
        title: "Dynamic Visual Cards",
        desc: "Once received, confessions are formatted into specialized visual cards with delicate heart motifs and mysterious midnight gradients. These are ready to be instantly exported for social media platforms."
      }
    ]
  },
  "Dealbreakers": {
    badge: "Interactive Analytics",
    specs: [
      { label: "Anonymity Protocol", value: "Randomized Response Mechanism" },
      { label: "Aggregate Threshold", value: "Minimum 5 responses required" },
      { label: "Custom Ranges", value: "Boolean, Sliders, Multi-choice" },
      { label: "Sharing Format", value: "Custom 9:16 PNG Graphics" }
    ],
    architecture: "Dealbreakers are designed with differential privacy. To prevent creators from guessing a single friend's answer by looking at the change in percentage, values are aggregated using randomized noise or masked entirely until a statistical baseline of at least 5 independent votes is achieved.",
    deepDive: [
      {
        title: "Differential Privacy Model",
        desc: "We ensure absolute certainty of anonymity. Even if a creator watches their responses update live, our server injects subtle delay windows and aggregate grouping so specific response times cannot be tied back to active web sessions."
      },
      {
        title: "Fun Relational Analytics",
        desc: "Provides breakdown insights such as: '85% of your circle considers text-ghosting a dealbreaker.' This generates massive talking points and fosters high-volume circular sharing on digital stories."
      }
    ]
  },
  "Never Have I Ever": {
    badge: "Micro-Gamification",
    specs: [
      { label: "Prompt Database", value: "250+ Curated Aesthetic Cards" },
      { label: "Custom Prompts", value: "Yes, fully creator-editable" },
      { label: "Voter Sync", value: "Debounced WebSocket / polling" },
      { label: "Mobile Performance", value: "Optimized SVG renderers" }
    ],
    architecture: "Never Have I Ever integrates standard micro-gaming mechanics into the static profile. Prompts are loaded from an ultra-lightweight static JSON dictionary, reducing load times. Voter synchronization uses lightweight server-less counter operations, preventing heavy database loads.",
    deepDive: [
      {
        title: "Organic Dynamic Growth",
        desc: "A single profile visitor can vote and immediately see how their life experience matches yours and the rest of your audience, converting static link-clicks into multi-minute high-engagement game sessions."
      },
      {
        title: "Staggered Vector Sharing",
        desc: "When sharing game results on Instagram or Snapchat, the platform automatically renders stacked modern visual card overlays to represent 'I Have' vs 'I Have Never' answers, complete with customized profile graphics."
      }
    ]
  },
  "Public Profiles": {
    badge: "Aesthetic Identity",
    specs: [
      { label: "Rendering Mode", value: "Static Site Generation (SSG)" },
      { label: "Theme Architecture", value: "Tailwind Root Class Mapping" },
      { label: "Font Library", value: "Space Grotesk, Inter, Outfit" },
      { label: "Lighthouse Vitals", value: "100/100 Core Web Performance" }
    ],
    architecture: "A creator's public page is their virtual brand card. We have optimized this entry point to serve clean, lightweight DOM layers with dynamic color maps injected based on user configurations. This ensures rapid loading speeds even on unstable 3G connections.",
    deepDive: [
      {
        title: "Adaptive Style Engine",
        desc: "Instead of loading heavy custom stylesheets or client-side CSS parsers, our engine maps clean design presets (Classic Minimalist, Amber Sunset, Midnight Nebula, Cyber Glow) to Tailwind classes, using native system variables to render fluid layout styles."
      },
      {
        title: "Complete Search Indexing",
        desc: "Every profile leverages highly optimized JSON-LD Schema markup and structured meta tags. If a user sets their profile to 'Public', search engines can parse and index their custom INK profile smoothly with clean, modern preview listings."
      }
    ]
  },
  "Story Replies": {
    badge: "Social Virality Engine",
    specs: [
      { label: "Raster Method", value: "Client-Side Canvas Composition" },
      { label: "Aspect Ratio", value: "9:16 Portrait Optimized" },
      { label: "File Compression", value: "WebP / high-quality PNG fallback" },
      { label: "Alpha Transparency", value: "Supported on custom layers" }
    ],
    architecture: "The Story Replies module does not rely on expensive server-side screenshot servers. It uses high-performance client-side rendering where HTML elements are cleanly compiled into an off-screen HTML5 Canvas. The canvas is rasterized directly on the device, producing a high-resolution 9:16 aspect ratio share card instantly.",
    deepDive: [
      {
        title: "Optimized Device Compilation",
        desc: "By handling rendering client-side, we bypass long queues, remove bandwidth overhead, and guarantee that the graphic is processed at the device's native resolution, resulting in razor-sharp text and pixel-perfect borders in social app overlays."
      },
      {
        title: "Rich Gradient Customizers",
        desc: "Before exporting, users can customize text overlays, adjust contrast ratios, add colorful emojis, or layer dynamic textures behind the response block to maximize engagement."
      }
    ]
  },
  "Analytics Dashboard": {
    badge: "Data & Telemetry",
    specs: [
      { label: "Privacy Framework", value: "Strict GDPR & CCPA Compliance" },
      { label: "Telemetry Mode", value: "Aggregated Device & Country only" },
      { label: "Chart Engine", value: "High-Performance Vector Graphics" },
      { label: "Export Format", value: "CSV, PDF Report Cards" }
    ],
    architecture: "For premium users, we offer high-fidelity performance metrics. To strictly respect privacy laws, we do not monitor individual names, browsing histories, or user session tracking files. Traffic source headers and geographic blocks are compiled in-memory and committed as rounded, non-trackable aggregate counts.",
    deepDive: [
      {
        title: "Beautiful Real-Time Graphs",
        desc: "Visualizes weekly engagement trends and click-through metrics using optimized SVGs. Built with light interaction, responsive tooltips, and custom curves that animate without causing any layout shifts."
      },
      {
        title: "Hour-by-Hour Engagement Spikes",
        desc: "Displays key intervals throughout the day when your circle is most active, allowing creators to coordinate link sharing on Instagram stories with maximum viewer conversion."
      }
    ]
  },
  "Premium Membership": {
    badge: "VIP Ecosystem",
    specs: [
      { label: "Billing Proxy", value: "Secure Stripe Checkout Proxy" },
      { label: "Verification Badge", value: "Exclusive SVG VIP Logo" },
      { label: "Themes Unlock", value: "Holographic & Liquid Glass skins" },
      { label: "Asset Routing", value: "Global Edge Network Delivery" }
    ],
    architecture: "Premium features are gated via secure JWT claims. Billing actions are routed through a secure backend proxy to ensure client details are encrypted. Once unlocked, premium elements use accelerated browser GPU render channels to showcase premium holographic gradients and physics-based interactions.",
    deepDive: [
      {
        title: "Premium Holographic Skins",
        desc: "Unlocks highly interactive styles including 'Liquid Glass' and 'Holographic Silver', utilizing complex, responsive CSS linear gradients that dynamically shift as the reader tilts their mobile screen."
      },
      {
        title: "Global VIP Badging",
        desc: "A custom animated badge is attached to your username across the network, notifying visitors of verified authentication and exclusive creator standing."
      }
    ]
  }
};

const modalBoxVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 350,
      damping: 28,
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn" as const
    }
  }
};

const modalItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const,
      stiffness: 300,
      damping: 24 
    } 
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
};

export const Features = memo(function Features() {
  const [isLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedFeature) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedFeature]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFeature(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeFeatureData = features.find(f => f.title === selectedFeature);
  const activeDetails = selectedFeature ? featureDetails[selectedFeature] : null;

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
                <Tilt maxTilt={12} className="w-full h-full">
                  <GlowingCard 
                    onClick={() => setSelectedFeature(feature.title)}
                    className={cn("h-full p-8 md:p-10 flex flex-col justify-between overflow-hidden", feature.image)}
                  >
                    <motion.div
                      className="h-full w-full flex flex-col justify-between"
                      style={{ transformStyle: "preserve-3d" }}
                      whileHover="hover"
                    >
                      <div 
                        style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}
                        className="flex justify-between items-start mb-12 relative z-10"
                      >
                        <motion.div 
                          variants={{
                            initial: { scale: 1, rotate: 0, y: 0 },
                            hover: { 
                              scale: 1.18, 
                              rotate: 6,
                              y: -4,
                              transition: {
                                type: "spring" as const,
                                stiffness: 400,
                                damping: 12
                              }
                            }
                          }}
                          initial="initial"
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
                      
                      <div 
                        style={{ transform: "translateZ(25px)" }}
                        className="relative z-10 mt-auto"
                      >
                        <h3 className="text-3xl font-bold text-dark mb-4 tracking-tight group-hover:translate-x-2 transition-transform duration-300">{feature.title}</h3>
                        <p className="text-foreground/70 font-medium leading-relaxed text-lg group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
                      </div>
                    </motion.div>
                  </GlowingCard>
                </Tilt>
              </SectionReveal.Item>
            ))
          )}
        </SectionReveal.List>
      </div>

      {/* Tech Deep-Dive Expansion Modals */}
      <AnimatePresence>
        {selectedFeature && activeFeatureData && activeDetails && createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Backdrop glass */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-dark/40 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box with Staggered Entrance */}
            <motion.div
              variants={modalBoxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] border border-primary/20 p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] z-10 select-none"
            >
              {/* Corner Close button */}
              <motion.button
                variants={modalItemVariants}
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full border border-primary/10 bg-light flex items-center justify-center text-dark/40 hover:text-primary hover:bg-primary/5 transition-all duration-300 focus:outline-none z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Decorative top strip matching feature color */}
              <div className={cn("absolute top-0 left-0 right-0 h-2 bg-gradient-to-r", activeFeatureData.color)} />

              {/* Header Container */}
              <motion.div variants={modalItemVariants} className="flex flex-col md:flex-row md:items-center gap-6 mb-8 mt-4">
                <div className="w-24 h-24 rounded-[2.2rem] overflow-hidden border border-primary/20 shadow-md bg-white flex items-center justify-center p-0.5 shrink-0">
                  <CustomImage 
                    src={activeFeatureData.imageAsset} 
                    alt={activeFeatureData.title} 
                    aspectRatio="1/1"
                    className="border-none bg-transparent rounded-[2rem] w-full h-full"
                    imageClassName="rounded-[2rem]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2.5">
                    <Cpu className="w-3.5 h-3.5" />
                    {activeDetails.badge}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-dark tracking-tight">{activeFeatureData.title}</h3>
                </div>
              </motion.div>

              {/* Primary Tech Core section */}
              <motion.div variants={modalItemVariants} className="mb-8">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>Architecture Overview</span>
                  <div className="h-px flex-1 bg-primary/20" />
                </h4>
                <p className="text-foreground/80 text-base leading-relaxed font-medium">
                  {activeFeatureData.description}
                </p>
                <div className="mt-4 p-5 rounded-2xl bg-light/50 border border-primary/10 text-sm font-medium text-foreground/80 leading-relaxed">
                  {activeDetails.architecture}
                </div>
              </motion.div>

              {/* Specifications Grid */}
              <motion.div variants={modalItemVariants} className="mb-8">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span>Technical Specifications</span>
                  <div className="h-px flex-1 bg-primary/20" />
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeDetails.specs.map((spec, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="p-4 rounded-xl bg-white border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="text-xs font-bold text-dark/40 uppercase tracking-wider mb-1">{spec.label}</div>
                      <div className="text-sm font-bold text-dark">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Deep Dive Engine Cards */}
              <motion.div variants={modalItemVariants} className="mb-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span>Deep Dive Capability</span>
                  <div className="h-px flex-1 bg-primary/20" />
                </h4>
                <div className="space-y-4">
                  {activeDetails.deepDive.map((dive, dIdx) => (
                    <div 
                      key={dIdx} 
                      className="p-5 rounded-2xl bg-white border border-primary/10 hover:shadow-md transition-shadow duration-300"
                    >
                      <h5 className="text-lg font-bold text-dark mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {dive.title}
                      </h5>
                      <p className="text-sm text-foreground/75 leading-relaxed font-medium">
                        {dive.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </motion.div>
          </div>,
          document.body
        )}
      </AnimatePresence>
    </section>
  );
});
