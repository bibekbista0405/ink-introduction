import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, X, Sparkles, MessageSquare, AlertCircle, Heart, FileText, Check } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { fireConfetti } from '../lib/confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = memo(function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formType, setFormType] = useState<'love' | 'abuse' | 'general' | 'business'>('general');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Stop Lenis/scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.stop === 'function') {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.start === 'function') {
        lenis.start();
      }
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setIsSending(true);

    // Simulate premium transmission delay
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      fireConfetti();
    }, 1800);
  };

  const resetForm = () => {
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSent(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6">
          {/* Glass backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md cursor-none"
          />

          {/* Centered Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 26
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              y: 30,
              transition: {
                duration: 0.2
              }
            }}
            className="w-full max-w-xl bg-white border-2 border-primary/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden z-10 text-dark flex flex-col max-h-[90vh]"
          >
            {/* Holographic Top Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent z-20" />
            
            {/* Close Button */}
            <div className="absolute top-5 right-5 z-20">
              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full border border-primary/10 bg-light flex items-center justify-center text-dark/60 hover:text-dark hover:border-primary/25 transition-all cursor-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div className="p-8 md:p-10 overflow-y-auto w-full custom-scrollbar">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <motion.form
                    key="modal-contact-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 pt-2"
                  >
                    <div className="space-y-1 text-left pr-10">
                      <div className="inline-flex items-center gap-1 text-primary">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest font-mono">SECURE SYSTEM TRANS</span>
                      </div>
                      <h2 className="text-3xl font-black tracking-tight text-dark leading-none">
                        Cast a Letter
                      </h2>
                      <p className="text-foreground/60 text-xs font-semibold">
                        Select a desk to route your secure message.
                      </p>
                    </div>

                    {/* Letter Type Selection */}
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40 block">Select Letter Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          { id: 'general', label: 'Inquiry 💬', icon: MessageSquare },
                          { id: 'abuse', label: 'Safety 🚨', icon: AlertCircle },
                          { id: 'love', label: 'Love Note 💌', icon: Heart },
                          { id: 'business', label: 'Press 📂', icon: FileText }
                        ].map((type) => {
                          const Icon = type.icon;
                          const isSelected = formType === type.id;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setFormType(type.id as any)}
                              className={`py-3 px-1 rounded-xl border text-[11px] font-black transition-all flex flex-col items-center justify-center gap-1 ${
                                isSelected
                                  ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                  : 'bg-light border-primary/10 text-dark/70 hover:border-primary/20'
                              }`}
                            >
                              <Icon className="w-4 h-4 shrink-0" />
                              <span className="truncate w-full text-center">{type.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Return Email */}
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40 block">Your Return Address (Email)</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="scribe@domain.com"
                        className="w-full bg-light border border-primary/15 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40 block">Subject Heading</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="What is your message regarding?"
                        className="w-full bg-light border border-primary/15 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40 block">Your Scribed Message</label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={
                          formType === 'love'
                            ? "Write your sweet confession or feedback to the scribes... 🥺"
                            : formType === 'abuse'
                            ? "Please provide links, handles, or message transcripts detailing safety concerns... 🚨"
                            : "Type your thoughts, recommendations, or coordinates..."
                        }
                        rows={4}
                        className="w-full bg-light border border-primary/15 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30 resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <MagneticButton
                        type="submit"
                        disabled={!email || !message || isSending}
                        className="w-full h-14 rounded-xl bg-dark text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden group shadow-lg cursor-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        {isSending ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span className="relative z-10 text-sm">Folding letter...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 relative z-10" />
                            <span className="relative z-10 text-sm">Cast Envelope</span>
                          </>
                        )}
                      </MagneticButton>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="sent-confirmation-modal"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-5 flex flex-col items-center"
                  >
                    <motion.div
                      animate={{
                        y: [0, -15, -15, 0],
                        rotate: [0, -10, 10, 0],
                        scale: [1, 1.1, 1.1, 1]
                      }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20"
                    >
                      <Send className="w-6 h-6 rotate-[-15deg]" />
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="font-extrabold text-2xl tracking-tight text-dark">
                        Scribed & Cast! 💌
                      </h3>
                      <p className="text-foreground/75 font-semibold text-xs max-w-xs leading-relaxed mx-auto">
                        Your letter has been folded into a virtual plane and drifted into our streams. Our support squad will review and dispatch a response to <span className="text-primary font-bold">{email}</span> within 24 hours.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2 w-full max-w-xs">
                      <button
                        onClick={resetForm}
                        className="flex-1 py-2.5 px-4 rounded-full border border-dark/10 hover:bg-dark/5 text-xs font-bold text-dark/70 transition-all cursor-none"
                      >
                        Scribe Another
                      </button>
                      <button
                        onClick={handleClose}
                        className="flex-1 py-2.5 px-4 rounded-full bg-primary text-white font-bold text-xs hover:scale-105 active:scale-95 shadow-md hover:shadow-primary/30 transition-all cursor-none"
                      >
                        Back to App
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});
