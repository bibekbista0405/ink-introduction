import React, { memo } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MessageSquareOff, EyeOff, HeartHandshake, AlertTriangle, ShieldAlert, ArrowRight } from 'lucide-react';
import { AnimatedText } from './ui/AnimatedText';
import { Reveal, RevealChild } from './ui/Reveal';
import { SectionReveal } from './ui/SectionReveal';
import { MagneticButton } from './ui/MagneticButton';
import { usePerformanceSettings } from '../lib/performance';

const CORE_SAFETY_POLICIES = [
  {
    icon: ShieldCheck,
    title: "AI-Powered Content Filtering",
    desc: "Our active neural net moderates incoming messages. We instantly identify, flag, and filter out threat indicators, hate speech, spam, and harassment before they ever touch your inbox.",
    color: "text-primary bg-primary/10"
  },
  {
    icon: MessageSquareOff,
    title: "One-Tap Instant Reporting",
    desc: "If any message slips through or makes you uncomfortable, tap the report icon. Our safety desk acts on flags within minutes, protecting you in real time.",
    color: "text-secondary bg-secondary/10"
  },
  {
    icon: EyeOff,
    title: "IP & Device Level Bans",
    desc: "We enforce structural bans. Senders violating our safety guidelines are barred at the IP and hardware identifier levels, completely removing them from the platform.",
    color: "text-emerald-500 bg-emerald-500/10"
  },
  {
    icon: HeartHandshake,
    title: "Positive Space Baseline",
    desc: "INK is designed for playful curiosity and constructive reviews. We operate with a strict zero-tolerance policy for cyberbullying, ensuring a supportive habitat.",
    color: "text-amber-500 bg-amber-500/10"
  }
];

const SAFETY_FAQS = [
  {
    question: "How do I report a message?",
    answer: "Every message card in your INK inbox contains a reporting flag icon. Tapping this icon automatically sends the card to our automated moderation queue. Once reviewed, violating senders are banned."
  },
  {
    question: "Can someone find out my identity if I send a message?",
    answer: "No. Safety applies to privacy too. Unless you choose to sign your name, our database doesn't link your physical credentials to your sent message. However, abusive content terminates this privilege via automatic system blocks."
  },
  {
    question: "What happens when a sender is banned?",
    answer: "Banned senders are permanently locked out of sending any further messages across the INK ecosystem. This block is enforced cryptographically to prevent burner profile abuse."
  }
];

export const Safety = memo(function Safety() {
  const { quality } = usePerformanceSettings();

  return (
    <div className="pt-8">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 mb-6 shadow-sm"
          >
            <ShieldAlert className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary tracking-widest uppercase">Safety Center</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-dark flex flex-col items-center gap-1">
            <AnimatedText text="Your Safety is" delay={0.1} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              <AnimatedText text="Our Core Promise." delay={0.3} />
            </span>
          </h1>

          <p className="text-foreground/70 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
            Anonymity is a powerful medium for authentic connections, but only when everyone is safe from harm. Learn how we engineer INK to block abuse and cultivate kindness.
          </p>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 relative bg-white/40 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark tracking-tight">Our Four Pillars of Protection</h2>
            <p className="text-foreground/65 font-medium mt-3 text-lg">Multi-layered defensive algorithms guarding your public inbox.</p>
          </div>

          <SectionReveal.List className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_SAFETY_POLICIES.map((policy, i) => (
              <SectionReveal.Item key={i} className="bg-white border border-primary/10 rounded-[2rem] p-8 shadow-sm flex gap-6 items-start hover:border-primary/20 hover:shadow-md transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${policy.color}`}>
                  <policy.icon className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-dark tracking-tight">{policy.title}</h3>
                  <p className="text-foreground/70 font-semibold text-base leading-relaxed">{policy.desc}</p>
                </div>
              </SectionReveal.Item>
            ))}
          </SectionReveal.List>
        </div>
      </section>

      {/* Interactive Mock Filter Demonstration */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <Reveal className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-2 border-primary/15 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-accent" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/10 px-3 py-1.5 rounded-full">Automated Defense</span>
              <h3 className="text-3xl font-black text-dark tracking-tight">How Content is Filtered</h3>
              <p className="text-foreground/75 font-semibold leading-relaxed text-base">
                We believe in proactive protection. When a user submits an anonymous ask, our system performs immediate natural language analysis. If hate indicators or harassment patterns are discovered:
              </p>
              <ul className="space-y-3 font-semibold text-foreground/75 list-disc list-inside">
                <li>The message is immediately dropped (it never reaches your device)</li>
                <li>The sender receives a strict warning notice</li>
                <li>Persistent violations result in immediate device-level IP suspension</li>
              </ul>
            </div>
            <div className="lg:col-span-5 bg-white border border-primary/10 rounded-3xl p-6 shadow-md space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono text-dark/40 font-bold uppercase tracking-wider">
                <span>Filter Testbed</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest font-mono">Blocked Input 🚫</span>
                <p className="text-xs text-foreground/50 line-through">"You are such a loser, nobody likes you."</p>
                <p className="text-[10px] font-mono font-bold text-red-500 mt-1">Harassment pattern detected & dropped.</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-mono">Passed Input ✨</span>
                <p className="text-xs text-dark font-bold">"Your profile vibe is incredible! Let's hang out."</p>
                <p className="text-[10px] font-mono font-bold text-emerald-600 mt-1">Safe content verified.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Safety FAQ */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark tracking-tight">Safety FAQ</h2>
            <p className="text-foreground/60 font-medium mt-3">Answers to common safety and reporting concerns.</p>
          </div>

          <div className="space-y-6">
            {SAFETY_FAQS.map((faq, i) => (
              <Reveal key={i} yOffset={15} delay={i * 0.1} className="bg-white border border-primary/10 rounded-[2rem] p-8 shadow-sm">
                <h3 className="text-xl font-bold text-dark mb-3">{faq.question}</h3>
                <p className="text-foreground/70 font-semibold text-base leading-relaxed">{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust CTA Section */}
      <section className="py-24 max-w-5xl mx-auto px-6 text-center">
        <div className="p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-[#FF8BA7]/10 via-[#FFC6C7]/5 to-[#C3AED6]/10 border border-primary/20 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-20%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-black text-dark tracking-tight">Enjoy a Safe Anonymous Experience</h2>
          <p className="text-foreground/70 font-semibold text-lg max-w-xl mx-auto">
            Ready to claim your secure, spam-free anonymous feedback link? Connect with your audience safely on INK.
          </p>
          <div className="flex justify-center pt-4">
            <a href="https://ink-social.vercel.app" target="_blank" rel="noopener noreferrer" className="cursor-none">
              <MagneticButton className="group h-16 px-10 rounded-full bg-dark text-white font-bold text-lg flex items-center gap-3 hover:scale-103 transition-all duration-300 overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Claim Your Safe Link</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
});
