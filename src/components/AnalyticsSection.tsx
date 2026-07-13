import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Eye, MessageSquare, TrendingUp, Users, ArrowUpRight, Sparkles, Calendar, Zap, Bell } from 'lucide-react';
import { cn } from '../lib/utils';
import { Tilt } from './ui/Tilt';
import { GlowingCard } from './ui/GlowingCard';

// Mock charts coordinate points for drawing smooth animated SVG paths
const GROWTH_DATA = {
  views: [20, 35, 55, 45, 75, 95, 125, 150],
  messages: [12, 18, 32, 28, 48, 62, 74, 98],
  conversions: [5, 12, 22, 19, 31, 41, 52, 68]
};

const STAT_CARDS = [
  { id: 'views', title: "Profile Views", value: "24,850", change: "+14.2%", icon: Eye, color: "text-[#FF8BA7]", bg: "bg-[#FF8BA7]/10" },
  { id: 'messages', title: "Confessions Recieved", value: "3,412", change: "+28.4%", icon: MessageSquare, color: "text-[#C3AED6]", bg: "bg-[#C3AED6]/10" },
  { id: 'conversions', title: "Audience Engagement", value: "18.6%", change: "+4.1%", icon: TrendingUp, color: "text-[#10B981]", bg: "bg-[#10B981]/10" }
];

export const AnalyticsSection = memo(function AnalyticsSection() {
  const [activeMetric, setActiveMetric] = useState<'views' | 'messages' | 'conversions'>('views');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const activePoints = GROWTH_DATA[activeMetric];
  
  // Calculate SVG path points dynamically
  const width = 600;
  const height = 180;
  const padding = 20;
  
  const pointsString = activePoints.map((val, idx) => {
    const x = padding + (idx / (activePoints.length - 1)) * (width - 2 * padding);
    // invert Y axis for screen space coords
    const y = height - padding - (val / 160) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  // SVG Area path closing off the bottom
  const areaPointsString = `${padding},${height - padding} ${pointsString} ${width - padding},${height - padding}`;

  return (
    <section id="analytics" className="py-32 relative bg-dark text-white overflow-hidden">
      {/* Absolute dark canvas gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-primary/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[15%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent/5 blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-white tracking-widest uppercase">Creator Insights</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
            Detailed <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Visitor Insights</span>.
          </h2>
          <p className="text-white/60 text-xl md:text-2xl font-medium">
            Understand your popularity. Track visit spikes, monitor anonymous message activity, and see which social share brings the most clicks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Dashboard Metric Selectors - Left 4 cols */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40 block mb-2">Metrics Snapshot</span>
              
              {STAT_CARDS.map((stat) => {
                const isActive = activeMetric === stat.id;
                const Icon = stat.icon;
                
                return (
                  <motion.button
                    key={stat.id}
                    onClick={() => setActiveMetric(stat.id as any)}
                    onMouseEnter={() => setHoveredCard(stat.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={cn(
                      "w-full text-left p-6 rounded-[2rem] border transition-all duration-300 relative overflow-hidden flex items-center justify-between group",
                      isActive 
                        ? "bg-white/10 border-white/20 shadow-lg" 
                        : "bg-white/5 border-white/5 hover:border-white/10"
                    )}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={cn("p-3 rounded-2xl flex items-center justify-center", stat.bg)}>
                        <Icon className={cn("w-6 h-6", stat.color)} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white/50 uppercase tracking-wider">{stat.title}</p>
                        <h4 className="text-2xl font-black text-white mt-1">{stat.value}</h4>
                      </div>
                    </div>

                    <div className="text-right relative z-10">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-extrabold">
                        {stat.change}
                      </span>
                      <p className="text-[10px] text-white/40 font-mono mt-1 font-bold">This week</p>
                    </div>

                    {/* Left glowing border bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-accent" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Quick insights card */}
            <div className="p-6 rounded-[2.2rem] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-xl bg-primary/20 text-primary mt-1">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-white">Insight of the Week</h5>
                  <p className="text-xs font-medium text-white/50 leading-relaxed mt-1">
                    Your confession counts spiked by <strong className="text-primary font-bold">42%</strong> immediately after you updated your bio link on Instagram on Sunday.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chart & Graphic Showcase - Right 8 cols */}
          <div className="lg:col-span-8">
            <Tilt maxTilt={3} className="w-full h-full">
              <div className="w-full h-full rounded-[2.5rem] bg-white/[0.06] border border-white/10 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl backdrop-blur-md">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#FF8BA7] animate-pulse" />
                    <h3 className="text-xl font-bold text-white tracking-tight">Real-time Traffic Monitor</h3>
                  </div>

                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white/60">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Last 7 Days</span>
                  </div>
                </div>

                {/* SVG Animated Chart */}
                <div className="relative w-full aspect-[16/7] md:aspect-[16/6] mt-4 flex items-center justify-center">
                  <svg 
                    viewBox={`0 0 ${width} ${height}`} 
                    width="100%" 
                    height="100%" 
                    className="overflow-visible"
                  >
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map((grid) => {
                      const yVal = padding + (grid / 4) * (height - 2 * padding);
                      return (
                        <line
                          key={grid}
                          x1={padding}
                          y1={yVal}
                          x2={width - padding}
                          y2={yVal}
                          stroke="rgba(255, 255, 255, 0.05)"
                          strokeWidth="1.5"
                          strokeDasharray="5,5"
                        />
                      );
                    })}

                    {/* Chart Gradient fill */}
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF8BA7" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#C3AED6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* SVG Filled Area with slide-up animation */}
                    <AnimatePresence mode="wait">
                      <motion.polygon
                        key={`area-${activeMetric}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        points={areaPointsString}
                        fill="url(#chartGlow)"
                      />
                    </AnimatePresence>

                    {/* Smooth SVG Line */}
                    <AnimatePresence mode="wait">
                      <motion.polyline
                        key={`line-${activeMetric}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ pathLength: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        fill="none"
                        stroke="url(#gradientLine)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        points={pointsString}
                      />
                    </AnimatePresence>

                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#FF8BA7" />
                        <stop offset="50%" stopColor="#FFC6C7" />
                        <stop offset="100%" stopColor="#C3AED6" />
                      </linearGradient>
                    </defs>

                    {/* Interactive Points / Dots */}
                    {activePoints.map((val, idx) => {
                      const x = padding + (idx / (activePoints.length - 1)) * (width - 2 * padding);
                      const y = height - padding - (val / 160) * (height - 2 * padding);
                      return (
                        <g key={idx} className="group/dot cursor-pointer">
                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            className="fill-white stroke-primary stroke-2"
                          />
                          <circle
                            cx={x}
                            cy={y}
                            r="12"
                            className="fill-primary/20 opacity-0 group-hover/dot:opacity-100 transition-opacity"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Legend/Labels footer */}
                <div className="flex justify-between items-center text-[11px] font-mono font-bold text-white/30 pt-6 border-t border-white/5 mt-4">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                  <span>Today</span>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
});
