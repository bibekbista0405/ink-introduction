import { useState } from 'react';
import { ArrowUpRight, X, Send, Twitter, Github, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { fireConfetti } from '../lib/confetti';
import { Link, useLocation } from 'react-router-dom';
import { Magnetic } from './ui/Magnetic';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const MotionLink = motion.create(Link);

const SOCIAL_LINKS: Record<string, string> = {
  Twitter: '', // Empty to test our creative stealth broadcast error portal
  Discord: '', // Empty to test our creative bunker transmission error portal
  GitHub: 'https://github.com/google', // Has link to show standard redirection
  Contact: '', // Empty to test our creative whisper in ink error portal
};

function getPlatformIcon(platform: string) {
  switch (platform) {
    case 'Twitter':
      return <Twitter className="w-7 h-7 text-[#1DA1F2]" />;
    case 'Discord':
      return <MessageSquare className="w-7 h-7 text-[#5865F2]" />;
    case 'GitHub':
      return <Github className="w-7 h-7 text-dark" />;
    case 'Contact':
      return <Mail className="w-7 h-7 text-primary" />;
    default:
      return <Sparkles className="w-7 h-7 text-accent" />;
  }
}

function getPlatformTitle(platform: string) {
  switch (platform) {
    case 'Twitter':
      return 'Stealth Broadcast 🤫';
    case 'Discord':
      return 'Bunker Transmission 🔮';
    case 'GitHub':
      return 'Gold Ink Ledger 📂';
    case 'Contact':
      return 'Whisper in Ink 📮';
    default:
      return 'Interstellar Signal 🚀';
  }
}

function getPlatformDescription(platform: string) {
  switch (platform) {
    case 'Twitter':
      return "Our broadcast tower is currently hidden in the clouds. Slip an anonymous thought or tweet suggestion here, and we'll cast it into our secret buffer.";
    case 'Discord':
      return "The secret society portal is closed to the public eye. Leave a secret invite request or an anonymous note, and we'll pass it under the door.";
    case 'GitHub':
      return "Our golden source ledger is being hand-indexed. Scribble a suggestion, feature concept, or general greeting directly to the scribes.";
    case 'Contact':
      return "Wax-sealed envelopes are beautiful, but they don't slide through glass. Type your secret message, feedback, or love note, and we'll fold it into a paper plane.";
    default:
      return "The bridge to this planet hasn't materialized. Drop a general thought or coordinates, and our search squad will seek it out.";
  }
}

function getPlatformPlaceholder(platform: string) {
  switch (platform) {
    case 'Twitter':
      return '"What if we built an app that paints your thoughts in raw fluid ink animations..."';
    case 'Discord':
      return '"Scribing clearance request for the main terminal... handle: ink_enthusiast"';
    case 'GitHub':
      return '"Idea: An interactive chalkboard that records mouse strokes and plays them back in real time..."';
    case 'Contact':
      return '"Hi! The kinetic flow on this website is absolutely mind-blowing. Scribing with love..."';
    default:
      return 'Type your anonymous thought...';
  }
}

export function Footer() {
  const location = useLocation();
  const [activeErrorPlatform, setActiveErrorPlatform] = useState<string | null>(null);
  const [secretMessage, setSecretMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSocialClick = (e: React.MouseEvent, platform: string) => {
    const link = SOCIAL_LINKS[platform];
    if (link && link !== '') {
      // Real link, open in new tab!
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      // Empty link: trigger our incredibly creative anonymous casting portal modal
      e.preventDefault();
      setActiveErrorPlatform(platform);
      setSecretMessage('');
      setIsSending(false);
      setIsSent(false);
    }
  };

  const handleSendMessage = () => {
    if (!secretMessage.trim()) return;
    setIsSending(true);
    
    // Simulate a magical inscription transmission delay
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      fireConfetti();
    }, 1500);
  };

  const legalLinks = [
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Cookie Policy', path: '/cookies' },
    { name: 'Community Guidelines', path: '/community-guidelines' },
    { name: 'Disclaimer', path: '/disclaimer' }
  ];

  // Smooth framer-motion variants for the standard footer links with 'as const' literal casting
  const linkVariants = {
    initial: { 
      color: "rgba(51, 39, 42, 0.7)", // #33272A (dark/70)
      x: 0,
    },
    hover: { 
      color: "#FF8BA7", // primary color
      x: 6,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  } as const;

  const activeLinkVariants = {
    initial: { 
      color: "#FF8BA7", // primary color for active links
      x: 0,
    },
    hover: { 
      color: "#FF8BA7",
      x: 6,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  } as const;

  const iconVariants = {
    initial: { 
      opacity: 0.5,
      x: 0,
      y: 0,
      scale: 0.9,
    },
    hover: { 
      opacity: 1,
      x: 3,
      y: -3,
      scale: 1.15,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 18
      }
    }
  } as const;

  const bottomLinkVariants = {
    initial: { 
      color: "rgba(51, 39, 42, 0.5)", // dark/50
    },
    hover: { 
      color: "#FF8BA7", // primary
      transition: { duration: 0.2, ease: "easeOut" }
    }
  } as const;

  return (
    <footer className="relative z-20 w-full bg-background border-t border-primary/20 pt-24 pb-12 overflow-visible">
      <div className="max-w-7xl mx-auto px-6 md:px-12 overflow-visible">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16 overflow-visible">
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-2">
            <Magnetic strength={0.15}>
              <Link to="/" className="flex items-center gap-2 mb-6 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                  I
                </div>
                <span className="font-bold text-xl tracking-tight text-dark group-hover:text-primary transition-colors">INK</span>
              </Link>
            </Magnetic>
            <p className="text-dark/70 max-w-sm mb-8 font-medium">
              Every anonymous voice matters. The sweet platform for authentic, secure, and beautiful conversations.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Magnetic strength={0.2}>
                <motion.a 
                  href="https://ink-social.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileTap={{
                    scale: 1.05,
                    filter: "brightness(1.15) contrast(1.05)",
                    boxShadow: "0px 8px 24px rgba(255, 139, 167, 0.45)",
                  }}
                  onClick={fireConfetti}
                  className="text-sm font-bold bg-dark text-white px-6 py-2.5 rounded-full hover:bg-dark/80 transition-colors shadow-md cursor-none inline-block text-center"
                >
                  Launch INK
                </motion.a>
              </Magnetic>

              {/* Elegant social icon buttons with subtle entrance slide-up and gentle pulsing idle animation */}
              <div className="flex gap-2.5">
                {[
                  { name: 'Twitter', icon: <Twitter className="w-4 h-4" /> },
                  { name: 'Discord', icon: <MessageSquare className="w-4 h-4" /> },
                  { name: 'GitHub', icon: <Github className="w-4 h-4" /> },
                  { name: 'Contact', icon: <Mail className="w-4 h-4" /> },
                ].map((social, index) => (
                  <Magnetic key={social.name} strength={0.3}>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: [1, 1.04, 1],
                      }}
                      transition={{
                        opacity: { duration: 0.5, delay: 0.3 + index * 0.1 },
                        y: { duration: 0.5, delay: 0.3 + index * 0.1, type: "spring", stiffness: 200, damping: 15 },
                        scale: {
                          repeat: Infinity,
                          repeatType: "reverse",
                          duration: 2.5,
                          delay: 1 + index * 0.3,
                          ease: "easeInOut"
                        }
                      }}
                      whileHover={{ 
                        scale: 1.12, 
                        backgroundColor: "rgba(255, 139, 167, 0.1)",
                        borderColor: "rgba(255, 139, 167, 0.45)",
                        color: "#FF8BA7"
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e: any) => handleSocialClick(e, social.name)}
                      className="w-9 h-9 rounded-full border border-dark/10 flex items-center justify-center text-dark/60 hover:text-primary transition-colors cursor-none bg-white/40 backdrop-blur-sm"
                      title={social.name}
                    >
                      {social.icon}
                    </motion.button>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-dark font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Premium', 'About', 'Safety', 'FAQ', 'Contact'].map((link, idx) => {
                const path = `/${link.toLowerCase()}`;
                const isActive = location.pathname === path;
                return (
                  <motion.li 
                    key={link} 
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: "easeOut" }}
                    className="overflow-visible"
                  >
                    <Magnetic strength={0.15}>
                      <MotionLink 
                        to={path} 
                        initial="initial"
                        whileHover="hover"
                        animate="initial"
                        variants={isActive ? activeLinkVariants : linkVariants}
                        className={cn(
                          "font-medium block cursor-none",
                          isActive && "font-bold"
                        )}
                      >
                        {link}
                      </MotionLink>
                    </Magnetic>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-dark font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.li 
                    key={link.path} 
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: "easeOut" }}
                    className="overflow-visible"
                  >
                    <Magnetic strength={0.15}>
                      <MotionLink 
                        to={link.path} 
                        initial="initial"
                        whileHover="hover"
                        animate="initial"
                        variants={isActive ? activeLinkVariants : linkVariants}
                        className={cn(
                          "font-medium block cursor-none relative pl-1",
                          isActive && "font-bold"
                        )}
                      >
                        {isActive && (
                          <motion.span 
                            layoutId="footerActiveIndicator"
                            className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          />
                        )}
                        {link.name}
                      </MotionLink>
                    </Magnetic>
                  </motion.li>
                );
              })}
            </ul>
          </div>
          
          <div>
            <h4 className="text-dark font-bold mb-6">Connect</h4>
            <ul className="space-y-4">
              {['Twitter', 'Discord', 'GitHub', 'Contact'].map((link, idx) => (
                <motion.li 
                  key={link} 
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: "easeOut" }}
                  className="overflow-visible"
                >
                  <Magnetic strength={0.15}>
                    <motion.a 
                      href={SOCIAL_LINKS[link] || '#'}
                      onClick={(e) => handleSocialClick(e, link)}
                      initial="initial"
                      whileHover="hover"
                      animate="initial"
                      variants={linkVariants}
                      className="flex items-center gap-1 font-medium cursor-none"
                    >
                      <span>{link}</span>
                      <motion.span variants={iconVariants} className="inline-block">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.span>
                    </motion.a>
                  </Magnetic>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark/50 text-sm font-medium">© {new Date().getFullYear()} INK. All rights reserved. All visual states crafted at 60 FPS. 🌸</p>
          <div className="flex gap-6 text-sm font-medium">
            <Magnetic strength={0.2}>
              <MotionLink 
                to="/privacy" 
                initial="initial"
                whileHover="hover"
                animate="initial"
                variants={bottomLinkVariants}
                className="cursor-none"
              >
                Privacy Policy
              </MotionLink>
            </Magnetic>
            <Magnetic strength={0.2}>
              <MotionLink 
                to="/terms" 
                initial="initial"
                whileHover="hover"
                animate="initial"
                variants={bottomLinkVariants}
                className="cursor-none"
              >
                Terms & Conditions
              </MotionLink>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Creative Empty Link Portal */}
      <AnimatePresence>
        {activeErrorPlatform && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveErrorPlatform(null)}
              className="absolute inset-0 bg-dark/40 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-md bg-white border border-primary/20 rounded-3xl p-8 shadow-2xl overflow-hidden text-dark z-10 cursor-auto"
            >
              {/* Decorative gradient header accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 blur-xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setActiveErrorPlatform(null)}
                className="absolute top-5 right-5 text-dark/40 hover:text-dark hover:rotate-90 transition-all duration-300 w-8 h-8 flex items-center justify-center rounded-full hover:bg-dark/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSent ? (
                <div className="space-y-6">
                  {/* Platform Identity Section */}
                  <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div 
                      animate={{ 
                        y: [0, -6, 0],
                        rotate: [0, -3, 3, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 4, 
                        ease: "easeInOut" 
                      }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-primary/20 text-primary"
                    >
                      {getPlatformIcon(activeErrorPlatform)}
                    </motion.div>
                    
                    <div className="space-y-2">
                      <h3 className="font-bold text-2xl tracking-tight text-dark">
                        {getPlatformTitle(activeErrorPlatform)}
                      </h3>
                      <p className="text-sm text-dark/70 font-medium leading-relaxed px-2">
                        {getPlatformDescription(activeErrorPlatform)}
                      </p>
                    </div>
                  </div>

                  {/* Scribe message area */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/40 block">
                      Your Scribed Thought
                    </label>
                    <textarea
                      value={secretMessage}
                      onChange={(e) => setSecretMessage(e.target.value)}
                      placeholder={getPlatformPlaceholder(activeErrorPlatform)}
                      maxLength={280}
                      className="w-full h-28 bg-dark/[0.02] hover:bg-dark/[0.04] focus:bg-white border border-dark/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-2xl p-4 text-sm text-dark font-medium placeholder-dark/30 focus:outline-none transition-all resize-none cursor-auto"
                    />
                    <div className="flex justify-between items-center text-[10px] font-mono text-dark/40">
                      <span>Will drift anonymously 🕊️</span>
                      <span>{secretMessage.length}/280</span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setActiveErrorPlatform(null)}
                      className="flex-1 py-3 px-5 rounded-xl border border-dark/10 hover:bg-dark/5 text-sm font-bold transition-all text-dark/70 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!secretMessage.trim() || isSending}
                      onClick={handleSendMessage}
                      className="flex-[2] relative overflow-hidden bg-dark text-white hover:bg-dark/90 active:scale-95 py-3 px-5 rounded-xl text-sm font-bold transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/15 cursor-pointer"
                    >
                      {isSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Casting spell...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Cast Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-6 flex flex-col items-center"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      y: [0, -30, -30, 0],
                      x: [0, 40, -40, 0],
                      opacity: [1, 0, 0, 1]
                    }}
                    transition={{ 
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20"
                  >
                    <Send className="w-6 h-6 rotate-[-15deg]" />
                  </motion.div>

                  <div className="space-y-2 px-2">
                    <h3 className="font-bold text-2xl tracking-tight text-dark">
                      Message Inscribed! 💌
                    </h3>
                    <p className="text-sm text-dark/70 font-medium max-w-xs leading-relaxed mx-auto">
                      Your note has been sealed tight in a virtual glass bottle and cast into our digital stream. We'll find it when the tide aligns.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveErrorPlatform(null)}
                    className="py-2.5 px-6 rounded-full bg-primary text-white font-bold text-sm hover:scale-105 active:scale-95 shadow-md hover:shadow-primary/30 transition-all cursor-pointer"
                  >
                    Return to Shore
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
