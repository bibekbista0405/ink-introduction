import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Share2, Heart, MessageCircle, Send, Check, RefreshCw, Smartphone, Eye, Flame, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { fireConfetti } from '../lib/confetti';
import { CustomImage } from './ui/CustomImage';
import { Reveal } from './ui/Reveal';

const THEMES = [
  { id: 'pink', name: 'Cosmic Twilight', bg: 'bg-gradient-to-br from-[#FF8BA7]/10 via-[#FFC6C7]/10 to-[#C3AED6]/15', cardBg: 'bg-white/80', primary: 'text-[#FF8BA7]', btnBg: 'bg-[#FF8BA7] hover:bg-[#FF8BA7]/90', accent: 'border-[#FF8BA7]/20 focus:border-[#FF8BA7]' },
  { id: 'purple', name: 'Lilac Dream', bg: 'bg-gradient-to-br from-[#C3AED6]/10 via-[#D3BBDD]/15 to-[#A393EB]/10', cardBg: 'bg-white/80', primary: 'text-[#C3AED6]', btnBg: 'bg-[#A393EB] hover:bg-[#A393EB]/90', accent: 'border-[#C3AED6]/20 focus:border-[#A393EB]' },
  { id: 'slate', name: 'Cyber Minimalist', bg: 'bg-gradient-to-br from-[#1E293B]/5 via-[#0F172A]/5 to-[#334155]/10', cardBg: 'bg-white/90', primary: 'text-[#475569]', btnBg: 'bg-[#334155] hover:bg-[#1E293B]', accent: 'border-[#334155]/20 focus:border-[#334155]' },
  { id: 'emerald', name: 'Mint Glow', bg: 'bg-gradient-to-br from-[#059669]/5 via-[#10B981]/5 to-[#34D399]/10', cardBg: 'bg-white/80', primary: 'text-[#059669]', btnBg: 'bg-[#10B981] hover:bg-[#059669]', accent: 'border-[#10B981]/20 focus:border-[#059669]' },
  { id: 'orange', name: 'Sunset Fizz', bg: 'bg-gradient-to-br from-[#FF7E5F]/10 via-[#FEB47B]/10 to-[#FF7E5F]/5', cardBg: 'bg-white/80', primary: 'text-[#FF7E5F]', btnBg: 'bg-[#FF7E5F] hover:bg-[#FF7E5F]/90', accent: 'border-[#FF7E5F]/20 focus:border-[#FF7E5F]' },
];

const THEME_STYLES: Record<string, {
  cardClass: string;
  textClass: string;
  subtextClass: string;
  inputBg: string;
  inputBorder: string;
  btnClass: string;
  pulseGlow: string;
  ringColor: string;
}> = {
  pink: {
    cardClass: "bg-white/70 backdrop-blur-xl border-2 border-[#FF8BA7]/30 shadow-[0_12px_40px_-8px_rgba(255,139,167,0.3)] text-dark",
    textClass: "text-dark",
    subtextClass: "text-foreground/60",
    inputBg: "bg-white/60 focus:bg-white/95",
    inputBorder: "border-[#FF8BA7]/20 focus:border-[#FF8BA7] focus:ring-[#FF8BA7]/20",
    btnClass: "bg-[#FF8BA7] hover:bg-[#FF8BA7]/90 hover:shadow-[#FF8BA7]/20 text-white",
    pulseGlow: "rgba(255,139,167,0.4)",
    ringColor: "text-[#FF8BA7]"
  },
  purple: {
    cardClass: "bg-white/70 backdrop-blur-xl border-2 border-[#C3AED6]/35 shadow-[0_12px_40px_-8px_rgba(195,174,214,0.3)] text-dark",
    textClass: "text-dark",
    subtextClass: "text-foreground/60",
    inputBg: "bg-white/60 focus:bg-white/95",
    inputBorder: "border-[#C3AED6]/25 focus:border-[#A393EB] focus:ring-[#A393EB]/20",
    btnClass: "bg-[#A393EB] hover:bg-[#A393EB]/90 hover:shadow-[#A393EB]/20 text-white",
    pulseGlow: "rgba(163,147,235,0.4)",
    ringColor: "text-[#A393EB]"
  },
  slate: {
    cardClass: "bg-slate-900/80 backdrop-blur-xl border-2 border-slate-700/40 shadow-[0_12px_40px_-8px_rgba(15,23,42,0.65)] text-slate-100",
    textClass: "text-slate-100",
    subtextClass: "text-slate-400",
    inputBg: "bg-slate-950/60 focus:bg-slate-950/90",
    inputBorder: "border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20",
    btnClass: "bg-[#334155] hover:bg-slate-800 border border-slate-700 text-white hover:shadow-cyan-500/10",
    pulseGlow: "rgba(34,211,238,0.4)",
    ringColor: "text-cyan-400"
  },
  emerald: {
    cardClass: "bg-white/70 backdrop-blur-xl border-2 border-emerald-500/25 shadow-[0_12px_40px_-8px_rgba(16,185,129,0.3)] text-dark",
    textClass: "text-dark",
    subtextClass: "text-foreground/60",
    inputBg: "bg-white/60 focus:bg-white/95",
    inputBorder: "border-emerald-500/20 focus:border-[#059669] focus:ring-[#059669]/20",
    btnClass: "bg-[#10B981] hover:bg-[#059669] hover:shadow-[#10B981]/20 text-white",
    pulseGlow: "rgba(16,185,129,0.4)",
    ringColor: "text-[#10B981]"
  },
  orange: {
    cardClass: "bg-white/70 backdrop-blur-xl border-2 border-[#FF7E5F]/30 shadow-[0_12px_40px_-8px_rgba(255,126,95,0.3)] text-dark",
    textClass: "text-dark",
    subtextClass: "text-foreground/60",
    inputBg: "bg-white/60 focus:bg-white/95",
    inputBorder: "border-[#FF7E5F]/20 focus:border-[#FF7E5F] focus:ring-[#FF7E5F]/20",
    btnClass: "bg-[#FF7E5F] hover:bg-[#FF7E5F]/90 hover:shadow-[#FF7E5F]/20 text-white",
    pulseGlow: "rgba(255,126,95,0.4)",
    ringColor: "text-[#FF7E5F]"
  }
};

const GAME_PROMPTS = {
  qa: [
    "Ask me anything! No filter. 🤫",
    "What is my worst habit? Be honest.",
    "Do you have a crush on me? 🥺",
  ],
  confess: [
    "Tell me a secret you've never told anyone... 💔",
    "What did you think of me when we first met?",
    "Confess something you did that I don't know about.",
  ],
  dealbreakers: [
    "Is being late to every single date a dealbreaker? ⏰",
    "Would you date someone who doesn't like dogs? 🐶",
    "Is putting pineapple on pizza an immediate block? 🍍",
  ],
  neverhave: [
    "Never Have I Ever: Lied to get out of social plans. 🤭",
    "Never Have I Ever: Regretted a text instantly.",
    "Never Have I Ever: Snooped through a partner's phone.",
  ]
};

export const PublicProfileShowcase = memo(function PublicProfileShowcase() {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [username, setUsername] = useState('jenna_styles');
  const [activeTab, setActiveTab] = useState<'qa' | 'confess' | 'dealbreakers' | 'neverhave'>('qa');
  const [promptIndex, setPromptIndex] = useState(0);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentMessages, setSentMessages] = useState<Array<{ id: number; text: string; tab: string; time: string }>>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentPrompt = GAME_PROMPTS[activeTab][promptIndex];

  const handleNextPrompt = () => {
    setPromptIndex((prev) => (prev + 1) % GAME_PROMPTS[activeTab].length);
  };

  const handleTabChange = (tab: 'qa' | 'confess' | 'dealbreakers' | 'neverhave') => {
    setActiveTab(tab);
    setPromptIndex(0);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        tab: activeTab,
        time: 'Just now'
      };
      setSentMessages((prev) => [newMessage, ...prev]);
      setMessageText('');
      setIsSending(false);
      fireConfetti();
    }, 1200);
  };

  const handleDeleteMessage = (id: number) => {
    setSentMessages((prev) => prev.filter(m => m.id !== id));
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(`ink.app/@${username}`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="profile-showcase" className="py-32 relative bg-background overflow-hidden">
      {/* Visual decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(195,174,214,0.15)_0%,transparent_60%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 mb-6 shadow-sm"
          >
            <Smartphone className="w-5 h-5 text-primary animate-bounce" />
            <span className="text-sm font-bold text-primary tracking-widest uppercase">Live Demo</span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-dark">
            Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Truth Link</span>.
          </h2>
          <Reveal yOffset={30} blur={5} delay={0.2}>
            <p className="text-foreground/70 text-xl md:text-2xl max-w-3xl mx-auto font-medium">
              See what your audience sees. Play with theme styles, try out game presets, and send a simulated anonymous message right now.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Controls Panel - Left */}
          <div className="lg:col-span-5 space-y-8">
            {/* Customizer Card */}
            <div className="bg-white border-2 border-primary/10 rounded-[2.5rem] p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-black text-dark">Customize Profile</h3>
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-dark/50">Your Unique Handle</label>
                <div className="flex items-center bg-light rounded-2xl border border-primary/15 px-4 py-3 focus-within:border-primary transition-colors">
                  <span className="text-foreground/50 font-bold font-mono mr-1">ink.app/@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="bg-transparent border-none text-dark font-bold focus:outline-none w-full"
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Theme Customizer Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-dark/50 block">Select Profile Skin</label>
                <div className="flex flex-wrap gap-3">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setActiveTheme(theme)}
                      className={cn(
                        "px-4 py-2 rounded-full border text-sm font-bold transition-all duration-300 flex items-center gap-2",
                        activeTheme.id === theme.id
                          ? "bg-dark text-white border-dark scale-105 shadow-md"
                          : "bg-white border-primary/15 text-dark/80 hover:border-primary/40"
                      )}
                    >
                      <span className={cn("w-3.5 h-3.5 rounded-full", theme.id === 'slate' ? 'bg-[#334155]' : theme.id === 'pink' ? 'bg-[#FF8BA7]' : theme.id === 'purple' ? 'bg-[#C3AED6]' : theme.id === 'emerald' ? 'bg-[#10B981]' : 'bg-[#FF7E5F]')} />
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Game Modes Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-dark/50 block">Game Templates</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'qa', label: 'Anonymous Q&A 🤫' },
                    { id: 'confess', label: 'Confessions 💔' },
                    { id: 'dealbreakers', label: 'Dealbreakers 🚫' },
                    { id: 'neverhave', label: 'Never Have I Ever 🤭' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id as any)}
                      className={cn(
                        "py-3 px-3 rounded-2xl border text-sm font-bold transition-all text-center",
                        activeTab === tab.id
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-white border-primary/10 text-dark/70 hover:border-primary/30"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action: Copy Profile URL */}
              <button
                onClick={handleCopyLink}
                className="w-full py-4 rounded-2xl bg-dark text-white font-bold hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {copiedLink ? <Check className="w-5 h-5 text-primary" /> : <Share2 className="w-5 h-5" />}
                <span>{copiedLink ? "Link Copied!" : "Share Profile Link"}</span>
              </button>
            </div>

            {/* Simulated Inbox Alerts */}
            <div className="bg-white border-2 border-primary/10 rounded-[2.5rem] p-8 shadow-md">
              <h4 className="text-sm font-black text-dark uppercase tracking-widest mb-4">Your Real-time Inbox ({sentMessages.length})</h4>
              
              <AnimatePresence mode="popLayout">
                {sentMessages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 text-foreground/40 font-medium"
                  >
                    No messages received yet. Submit one from the phone preview! 📱
                  </motion.div>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {sentMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-light border border-primary/10 p-4 rounded-2xl flex justify-between items-start gap-3"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {msg.tab === 'qa' ? 'Q&A' : msg.tab === 'confess' ? 'Confession' : msg.tab === 'dealbreakers' ? 'Dealbreaker' : 'Never Have I'}
                          </span>
                          <p className="text-dark font-bold text-sm leading-snug">"{msg.text}"</p>
                        </div>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-foreground/40 hover:text-danger p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Phone Mockup - Right */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[9/19] rounded-[3.2rem] border-[10px] border-dark bg-dark shadow-2xl overflow-hidden group">
              {/* Speaker & Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-dark rounded-b-2xl z-50 flex items-center justify-center">
                <div className="w-12 h-1 bg-gray-800 rounded-full mb-1"></div>
              </div>

              {/* Simulated OS Status Bar */}
              <div className="absolute top-1.5 left-0 right-0 px-6 flex justify-between text-[11px] font-bold text-dark/70 z-40 font-mono">
                <span>9:41</span>
                <div className="flex gap-1 items-center">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-dark/60 rounded-[3px] p-0.5 flex items-center"><div className="w-full h-full bg-dark/70 rounded-[1px]"></div></div>
                </div>
              </div>

              {/* Main Phone Screen Viewport */}
              <div className={cn("w-full h-full pt-10 pb-6 px-5 flex flex-col justify-between transition-colors duration-500", activeTheme.bg)}>
                
                {/* Profile Header Block */}
                <div className="flex flex-col items-center text-center mt-6">
                  {/* Glowing Avatar Frame */}
                  <div className="w-20 h-20 rounded-full p-1 border-2 border-primary/20 bg-white shadow-md relative mb-3 group-hover:scale-105 transition-transform duration-300">
                    <CustomImage
                      src={`https://i.pravatar.cc/150?u=${username}`}
                      alt="Avatar"
                      className="w-full h-full border-none rounded-full"
                      imageClassName="object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[10px] border-2 border-white shadow-sm">
                      ✨
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-black text-dark leading-none">@{username}</h4>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold bg-white/60 border border-primary/10 text-dark/60 px-2 py-0.5 rounded-full">
                      ink.app/@{username}
                    </span>
                  </div>
                </div>

                {/* Simulated Game Box */}
                <div className={cn("rounded-3xl p-5 border border-primary/10 shadow-lg text-center flex flex-col justify-between min-h-[220px] relative overflow-hidden transition-all duration-500", activeTheme.cardBg)}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded-full">
                        {activeTab === 'qa' ? 'Q&A Board 🤫' : activeTab === 'confess' ? 'Confession Booth 💔' : activeTab === 'dealbreakers' ? 'Dealbreaker 🚫' : 'Never Have I Ever 🤭'}
                      </span>
                      
                      <button 
                        onClick={handleNextPrompt}
                        className="p-1.5 bg-light hover:bg-primary/10 rounded-full transition-colors"
                        title="Shuffle Prompt"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-foreground/50 hover:text-primary animate-spin-hover" />
                      </button>
                    </div>

                    <div className="min-h-[72px] flex items-center justify-center py-2">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={currentPrompt}
                          initial={{ opacity: 0, scale: 0.95, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -5 }}
                          transition={{ duration: 0.25 }}
                          className="text-base font-extrabold text-dark tracking-tight leading-snug"
                        >
                          {currentPrompt}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>

                  <form onSubmit={handleSendMessage} className="space-y-2 mt-4 relative z-10">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type anonymous message..."
                      maxLength={100}
                      className="w-full bg-light border border-primary/15 rounded-2xl py-3 px-4 text-xs font-bold text-dark focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-foreground/40"
                    />
                    
                    <button
                      type="submit"
                      disabled={!messageText.trim() || isSending}
                      className={cn("w-full py-3 rounded-2xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none", activeTheme.btnBg)}
                    >
                      {isSending ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-3 h-3" />
                      )}
                      <span>{isSending ? "Casting..." : "Send Anonymously"}</span>
                    </button>
                  </form>
                </div>

                {/* Small Footer Branding */}
                <div className="text-center pt-2">
                  <span className="text-[9px] font-bold text-dark/40 uppercase tracking-widest flex items-center justify-center gap-1">
                    Powered by <span className="text-primary font-black">INK</span> 🌸
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
