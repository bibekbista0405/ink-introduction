import { memo } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MessageSquareOff, EyeOff, Scale, HelpCircle, Sparkles, HeartHandshake, Eye } from 'lucide-react';
import { Reveal, RevealChild } from './ui/Reveal';
import { CustomImage } from './ui/CustomImage';

const SAFETY_FEATURES = [
  {
    icon: ShieldCheck,
    title: "AI Spam & Hate Filter",
    desc: "Our real-time filters automatically block toxic content, hate speech, threats, and spam before they ever touch your inbox.",
    color: "text-[#FF8BA7] bg-[#FF8BA7]/10"
  },
  {
    icon: MessageSquareOff,
    title: "One-Click Reporting",
    desc: "If any message makes you feel uncomfortable, you can report it instantly. Our team acts on reports within minutes.",
    color: "text-[#C3AED6] bg-[#C3AED6]/10"
  },
  {
    icon: EyeOff,
    title: "Strict Sender IP Bans",
    desc: "Block repetitive spammers permanently. Senders who violate community guidelines are blocked across the entire network.",
    color: "text-[#10B981] bg-[#10B981]/10"
  },
  {
    icon: HeartHandshake,
    title: "Safety First Community",
    desc: "We promote playful curiosity and clean fun. We have zero tolerance for cyberbullying and maintain absolute protective standards.",
    color: "text-amber-500 bg-amber-500/10"
  }
];

export const PrivacySafety = memo(function PrivacySafety() {
  return (
    <section id="safety" className="py-32 relative bg-background overflow-hidden">
      {/* Visual abstract details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,139,167,0.08)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text and Features Content */}
          <div className="space-y-12">
            <div>
              <Reveal yOffset={15} delay={0.1}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 mb-6 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-primary tracking-widest uppercase">Safe & Clean</span>
                </div>
              </Reveal>

              <Reveal yOffset={30} delay={0.2}>
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-dark mb-6">
                  Radical Honesty, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Zero Bullying</span>.
                </h2>
              </Reveal>

              <Reveal yOffset={25} delay={0.3}>
                <p className="text-foreground/70 text-xl font-medium leading-relaxed max-w-xl">
                  Anonymity is powerful, but only when it is safe. We built INK from the ground up with advanced moderation tools and instant reporting algorithms to keep your experience purely positive.
                </p>
              </Reveal>
            </div>

            <Reveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SAFETY_FEATURES.map((feature, i) => (
                <RevealChild key={i} yOffset={20} className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-extrabold text-dark tracking-tight">{feature.title}</h4>
                  <p className="text-foreground/70 text-sm font-semibold leading-relaxed">{feature.desc}</p>
                </RevealChild>
              ))}
            </Reveal>
          </div>

          {/* Visual Showcase - Right Column */}
          <div className="relative flex justify-center">
            {/* Ambient glows */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[80px] pointer-events-none -z-10" />

            {/* Premium visual box depicting safe vs abusive messages being filtered */}
            <div className="w-full max-w-[460px] p-8 md:p-10 rounded-[3rem] bg-white border-2 border-primary/10 shadow-2xl space-y-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-primary uppercase tracking-widest">INK Content Filter</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Message 1: Safe, passed */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl relative"
              >
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                  Passed
                </div>
                <p className="text-xs font-bold text-emerald-600/50 uppercase tracking-widest mb-1.5 font-mono">Incoming Message 🕊️</p>
                <p className="text-sm font-black text-dark">"I think you are doing an amazing job. Your music playlist inspired me so much today! ✨"</p>
              </motion.div>

              {/* Filtering transition indicator */}
              <div className="flex justify-center items-center gap-1.5 py-1 text-foreground/30 font-mono text-xs">
                <div className="w-2 h-2 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary/20 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="font-bold text-[10px] text-dark/30 uppercase tracking-widest ml-2">Filtering engine active</span>
              </div>

              {/* Message 2: Harmful, auto-blocked */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl relative opacity-60 filter blur-[0.5px]"
              >
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                  Blocked
                </div>
                <p className="text-xs font-bold text-red-500/50 uppercase tracking-widest mb-1.5 font-mono">Auto-moderated 🛑</p>
                <p className="text-sm font-bold text-foreground/50 line-through">"You are so ugly and I hate your posts so much you should..."</p>
                <div className="mt-2.5 flex items-center gap-2 text-[10px] font-mono text-red-500/80 font-bold">
                  <span>Reason:</span>
                  <span className="bg-red-500/10 px-2 py-0.5 rounded">Cyberbullying policy</span>
                </div>
              </motion.div>

              {/* Trust disclaimer text */}
              <p className="text-xs font-semibold text-foreground/50 leading-relaxed text-center pt-2">
                All filtered messages are completely erased. Senders receive an warning notification, and repeated violations result in permanent, cryptographically backed IP banning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
