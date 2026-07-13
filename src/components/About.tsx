import { motion, useScroll, useTransform } from 'motion/react';
import { EyeOff, Heart, Lock } from 'lucide-react';
import { useRef, memo } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import circleAnimation from '../assets/circle.json';
import { AnimatedText } from './ui/AnimatedText';
import { CustomImage } from './ui/CustomImage';
import React from 'react';
import { usePerformanceSettings } from '../lib/performance';

interface WordHighlightProps {
  word: string;
  scrollYProgress: any;
  start: number;
  end: number;
}

function WordHighlightComponent({ word, scrollYProgress, start, end }: WordHighlightProps) {
  const color = useTransform(scrollYProgress, [start, end], ["#594A4E50", "#594A4E"]);
  return (
    <motion.span style={{ color }}>
      {word}
    </motion.span>
  );
}

const WordHighlight = React.memo(WordHighlightComponent);

const TextHighlight = ({ text }: { text: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { quality } = usePerformanceSettings();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"]
  });

  // Performance scaling: If quality is low or mobile (quality <= 1), skip word-by-word scroll transforms (saves 40+ concurrent transforms!)
  if (quality <= 1) {
    return (
      <p ref={ref} className="text-2xl md:text-3xl font-bold leading-relaxed text-dark/80 mb-12">
        {text}
      </p>
    );
  }

  const words = text.split(" ");
  return (
    <p ref={ref} className="text-2xl md:text-3xl font-bold leading-relaxed flex flex-wrap gap-x-2 mb-12 text-foreground/30">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <WordHighlight
            key={i}
            word={word}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </p>
  );
};

export const About = React.memo(function About() {
  const { quality, isMobile } = usePerformanceSettings();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } },
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Soft background blobs: Disabled on quality <= 2 to prevent severe GPU overdraw with global ParallaxBackground */}
      {quality >= 3 && (
        <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-primary/10 blur-[80px] pointer-events-none animate-blob" />
      )}
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-8 text-dark flex flex-col gap-2">
              <AnimatedText text="The meaning behind" delay={0.05} />
              <AnimatedText 
                text="I Need To Know." 
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" 
                delay={0.25} 
              />
            </h2>
            
            <TextHighlight text="In a hyper-connected world, true honesty has become rare. We built INK as a sanctuary for authenticity. A place where you can ask the questions you've always wanted to ask, and receive the answers you truly need to hear." />
            
            <div className="space-y-6">
              {[
                { icon: EyeOff, title: "Absolute Anonymity", desc: "Your identity is protected by state-of-the-art encryption. Speak freely without repercussions.", color: "text-primary bg-primary/10" },
                { icon: Lock, title: "Uncompromising Security", desc: "We don't track you. We don't sell your data. Your secrets are yours alone.", color: "text-accent bg-accent/10" },
                { icon: Heart, title: "Empathetic Community", desc: "Built on principles of respect and understanding. A safe space for genuine human connection.", color: "text-secondary bg-secondary/10" },
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="flex gap-5 items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${item.color}`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-dark font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-foreground/80 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div variants={itemVariants} className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-white/40 border border-white/60 relative backdrop-blur-3xl flex items-center justify-center p-8 transition-transform duration-500 hover:scale-[1.01] shadow-2xl">
              
              {/* Lottie Animation Background Element: Only run Lottie on desktop with quality >= 2 */}
              {quality >= 2 && !isMobile && (
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply flex items-center justify-center">
                  <div className="w-[150%] h-[150%] max-w-[600px] max-h-[600px]">
                    <DotLottieReact data={circleAnimation} loop autoplay />
                  </div>
                </div>
              )}

              <div className="relative z-10 w-full max-w-sm">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white/90 border border-primary/20 p-6 rounded-[2rem] rounded-bl-sm mb-4 shadow-md transition-transform duration-300 hover:-translate-y-1 relative"
                >
                  <p className="text-dark font-bold text-lg">"What's one thing you've always wanted to tell me, but never did?" 🥺</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded-full">Anonymous Ask</span>
                    <span className="text-xs text-foreground/50 font-bold">2 mins ago</span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-primary/95 to-accent/95 border border-white/20 p-6 rounded-[2rem] rounded-br-sm ml-8 shadow-md transition-transform duration-300 hover:translate-x-1"
                >
                  <p className="text-white font-bold text-lg">"I think you're the most inspiring person I've met this year! ✨"</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider bg-white/20 px-2 py-1 rounded-full">Anonymous Reply</span>
                    <span className="text-xs text-white/70 font-bold">Just now</span>
                  </div>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </motion.div>

        {/* Timeline Section */}
        <div className="mt-40 mb-20 max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-24 relative p-8 md:p-12 rounded-[2.5rem] bg-white/40 border border-white/60 backdrop-blur-xl shadow-2xl overflow-hidden transform-gpu"
            initial={{ opacity: 0, scale: 0.85, y: 60, rotateX: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 18,
              mass: 1
            }}
          >
            {/* Creative background light elements */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, rotate: -10 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.1
              }}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-6 shadow-lg overflow-hidden border-2 border-white/40 relative z-10"
            >
              <CustomImage 
                src="https://media.giphy.com/media/l0amJzVHIAfl7jMDos/giphy.webp"
                alt="Origin story illustration"
                className="w-full h-full border-none rounded-none bg-transparent"
                imageClassName="opacity-90 object-cover"
              />
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-dark relative z-10"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Origin Story</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-foreground/70 text-lg md:text-xl font-medium max-w-2xl mx-auto relative z-10"
            >
              How a simple idea evolved into a platform for genuine connection.
            </motion.p>
          </motion.div>

          <Timeline />
        </div>
      </div>
    </section>
  );
});

interface TimelineEventItemProps {
  event: { year: string; title: string; description: string };
  index: number;
  totalEvents: number;
  scrollYProgress: any;
  isHighPerformance: boolean;
}

function TimelineEventItemComponent({ event, index, totalEvents, scrollYProgress, isHighPerformance }: TimelineEventItemProps) {
  // Only apply scroll-linked translations on high-performance settings
  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, (index - 0.5) / totalEvents), (index + 0.5) / totalEvents],
    [0.6, isHighPerformance ? 1.2 : 1.0]
  );
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, (index - 0.5) / totalEvents), index / totalEvents],
    [0.4, 1]
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}
    >
      <div className={`flex-1 w-full pl-20 pr-4 md:px-0 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
         <h4 className="text-3xl font-extrabold text-dark mb-3">{event.title}</h4>
         <p className="text-foreground/70 font-medium text-lg leading-relaxed">{event.description}</p>
      </div>
      
      <div className="absolute left-8 md:left-1/2 w-12 h-12 -ml-6 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center shrink-0 z-10 shadow-md">
        <motion.div 
          className="w-4 h-4 bg-gradient-to-tr from-primary to-accent rounded-full"
          style={isHighPerformance ? { scale, opacity } : { scale: 1, opacity: 1 }}
        />
      </div>

      <div className={`flex-1 w-full pl-20 pr-4 md:px-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}>
        <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-accent/80 drop-shadow-sm">{event.year}</span>
      </div>
    </motion.div>
  );
}

const TimelineEventItem = React.memo(TimelineEventItemComponent);

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { quality } = usePerformanceSettings();
  const isHighPerformance = quality >= 2;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const timelineEvents = [
    { year: "2023", title: "The Idea", description: "It started with a simple question: why is it so hard to be honest online? We realized the fear of judgment was holding people back." },
    { year: "2024", title: "Building the Foundation", description: "We developed a secure, encrypted platform prioritizing anonymity, ensuring users felt safe to share their true thoughts." },
    { year: "2025", title: "The Launch", description: "INK goes live. A clean, beautiful interface focused on what matters most: the conversation and radical honesty." },
    { year: "Future", title: "Evolving Honesty", description: "Continuously refining the experience, introducing new features to foster deeper, more meaningful connections globally." }
  ];

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-primary/10 rounded-full transform md:-translate-x-1/2">
        <motion.div 
          className="absolute top-0 w-full bg-gradient-to-b from-primary to-accent origin-top rounded-full"
          style={{ height: '100%', scaleY: isHighPerformance ? scrollYProgress : 1 }}
        />
      </div>

      <div className="space-y-20 relative">
        {timelineEvents.map((event, index) => (
          <TimelineEventItem
            key={index}
            event={event}
            index={index}
            totalEvents={timelineEvents.length}
            scrollYProgress={scrollYProgress}
            isHighPerformance={isHighPerformance}
          />
        ))}
      </div>
    </div>
  );
}
