import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'motion/react';
import { Shield, Fingerprint, Network, KeyRound, Sparkles } from 'lucide-react';

interface Milestone {
  percentage: number;
  label: string;
  codename: string;
  icon: React.ComponentType<any>;
  color: string;
  pulseColor: string;
}

const MILESTONES: Milestone[] = [
  {
    percentage: 25,
    label: "Local Client Primed",
    codename: "0xSECURE_INIT",
    icon: Fingerprint,
    color: "from-[#FF9A9E] to-[#FECFEF]",
    pulseColor: "rgba(255, 154, 158, 0.5)",
  },
  {
    percentage: 50,
    label: "Routing Network Established",
    codename: "ONION_TUNNEL_ACTIVE",
    icon: Network,
    color: "from-[#a18cd1] to-[#fbc2eb]",
    pulseColor: "rgba(161, 140, 209, 0.5)",
  },
  {
    percentage: 75,
    label: "Cryptographic Vault Sealed",
    codename: "E2E_RSA_READY",
    icon: KeyRound,
    color: "from-[#84fab0] to-[#8fd3f4]",
    pulseColor: "rgba(132, 250, 176, 0.5)",
  },
  {
    percentage: 100,
    label: "Complete Privacy Shield",
    codename: "INK_ZERO_TRACKING",
    icon: Shield,
    color: "from-[#a1c4fd] to-[#c2e9fb]",
    pulseColor: "rgba(161, 196, 253, 0.5)",
  },
];

// High-performance isolated text component to prevent re-rendering the whole milestones block
const SynchronizedText = React.memo(({ progress }: { progress: any }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return progress.onChange((latest: number) => {
      const p = Math.min(Math.max(Math.round(latest * 100), 0), 100);
      setPercent(p);
    });
  }, [progress]);

  return <>{percent}% SYNCHRONIZED</>;
});
SynchronizedText.displayName = 'SynchronizedText';

export function ScrollMilestones({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [activeMilestones, setActiveMilestones] = useState<number[]>([]);
  const [pulseMilestone, setPulseMilestone] = useState<number | null>(null);

  // Bind the progress bar width directly to scroll progress
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Map 0-1 progress to 0-100 percentage
      const percent = Math.min(Math.max(Math.round(latest * 100), 0), 100);

      const reached: number[] = [];
      MILESTONES.forEach((m) => {
        if (percent >= m.percentage) {
          reached.push(m.percentage);
        }
      });

      // Avoid layout thrashing and endless state renders:
      // Only set active milestones when the number of milestones reached actually transitions!
      setActiveMilestones((prev) => {
        if (prev.length === reached.length) {
          return prev;
        }

        // Find the newly unlocked milestone to trigger an intense pop animation
        const newlyReached = reached.filter((p) => !prev.includes(p));
        if (newlyReached.length > 0) {
          const latestNew = newlyReached[newlyReached.length - 1];
          setPulseMilestone(latestNew);
          const timer = setTimeout(() => setPulseMilestone(null), 1000);
          // Return a cleanup ref if needed, or simply let the timer fire safely
        }

        return reached;
      });
    });
  }, [scrollYProgress]);

  return (
    <div className="w-full bg-white/45 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-8 md:p-10 mb-16 relative overflow-hidden shadow-sm">
      {/* Background grid details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Dynamic interactive metrics status */}
        <div className="flex flex-col items-start max-w-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3 text-xs font-bold text-primary tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            Active Integrity Metrics
          </div>
          <h4 className="text-2xl font-black text-dark mb-2 tracking-tight">
            Security Shield Status
          </h4>
          <p className="text-foreground/60 text-sm font-medium leading-relaxed">
            Scroll down the features section to witness the real-time build of your anonymous protocol pipeline.
          </p>
          
          {/* Active status indicator */}
          <div className="mt-4 flex items-center gap-2 bg-light/80 border border-dark/5 px-4 py-2 rounded-2xl w-full">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-dark/40 leading-none">PIPELINE INTEGRITY</span>
              <span className="text-xs font-bold text-dark font-mono mt-0.5">
                <SynchronizedText progress={scrollYProgress} />
              </span>
            </div>
          </div>
        </div>

        {/* Right: The interactive milestone pipeline track */}
        <div className="flex-1 w-full relative pt-10 pb-6 px-4">
          
          {/* Progress bar track line */}
          <div className="absolute top-[50%] left-0 right-0 h-1.5 bg-primary/10 rounded-full -translate-y-1/2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: progressBarWidth }}
              layoutId="scrollProgressBar"
            />
          </div>

          {/* Interactive milestone nodes */}
          <div className="relative flex justify-between w-full">
            {MILESTONES.map((m) => {
              const isReached = activeMilestones.includes(m.percentage);
              const isPulsing = pulseMilestone === m.percentage;
              const Icon = m.icon;

              return (
                <div key={m.percentage} className="flex flex-col items-center relative group">
                  
                  {/* Outer ripple halo on reaching milestone */}
                  <AnimatePresence>
                    {isPulsing && (
                      <motion.div
                        initial={{ scale: 0.6, opacity: 1 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.85, ease: "easeOut" }}
                        className="absolute w-12 h-12 rounded-full pointer-events-none z-0"
                        style={{ backgroundColor: m.pulseColor }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Pulsing ring micro-animation trigger */}
                  <motion.div
                    className="relative z-10 cursor-pointer"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <div className="relative">
                      {/* Active border glow */}
                      <span className={`absolute inset-0 rounded-full blur-[4px] transition-opacity duration-300 ${
                        isReached ? 'bg-primary/20 opacity-100' : 'bg-transparent opacity-0'
                      }`} />
                      
                      {/* Circle container */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10 ${
                        isReached 
                          ? `bg-gradient-to-br ${m.color} border-transparent text-white shadow-md shadow-primary/15` 
                          : 'bg-white border-primary/20 text-dark/40 group-hover:border-primary group-hover:text-primary'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Desktop Title & Details Label */}
                  <div className="absolute top-16 flex flex-col items-center w-36 text-center select-none">
                    <span className={`text-xs font-black tracking-tight leading-tight mb-1 transition-all duration-300 ${
                      isReached ? 'text-dark' : 'text-dark/40 group-hover:text-dark/70'
                    }`}>
                      {m.label}
                    </span>
                    <span className="font-mono text-[9px] text-primary/60 tracking-wider">
                      {m.codename}
                    </span>
                    
                    {/* Micro completion dot indicator */}
                    <span className={`w-1.5 h-1.5 rounded-full mt-2 transition-colors duration-300 ${
                      isReached ? 'bg-primary scale-125 animate-pulse' : 'bg-dark/10'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
