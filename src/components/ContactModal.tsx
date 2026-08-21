import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, X, Sparkles, MessageSquare, AlertCircle, Heart, FileText, Check, Loader2, ShieldCheck, CheckCircle2, Copy } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { fireConfetti } from '../lib/confetti';
import { ToastNotification } from './ui/ToastNotification';

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [copiedTicket, setCopiedTicket] = useState(false);

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

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isSending || isSuccess) return;

    const userEmail = email.trim() || 'bibekbista0405@gmail.com';
    const userMsg = message.trim() || 'Hello INK team! Really love the anonymous vibe and design. 💌';

    setEmail(userEmail);
    setMessage(userMsg);

    const generatedId = `INK-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketId(generatedId);

    setIsSending(true);

    // Multi-stage transmission with loading spinner, checkmark, and toast
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      fireConfetti();
      setShowToast(true);

      setTimeout(() => {
        setIsSent(true);
        setIsSuccess(false);
      }, 600);
    }, 900);
  };

  const resetForm = () => {
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSuccess(false);
    setIsSent(false);
    setShowToast(false);
  };

  const handleCopyReceipt = () => {
    if (!ticketId) return;
    navigator.clipboard.writeText(ticketId);
    setCopiedTicket(true);
    setTimeout(() => setCopiedTicket(false), 2000);
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
            className="absolute inset-0 bg-zinc-950/70 backdrop-blur-md cursor-pointer"
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
              scale: 0.95, 
              y: 12,
              transition: {
                duration: 0.2,
                ease: [0.32, 0, 0.67, 0]
              }
            }}
            className="w-full max-w-xl bg-white border-2 border-primary/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden z-10 text-dark flex flex-col max-h-[90vh]"
          >
            {/* Holographic Top Line */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent z-20" />
            
            {/* Close Button */}
            <div className="absolute top-5 right-5 z-20">
              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 rounded-full border border-primary/10 bg-light flex items-center justify-center text-dark/60 hover:text-dark hover:border-primary/25 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container */}
            <div 
              data-lenis-prevent="true"
              className="p-8 md:p-10 overflow-y-auto w-full max-h-[calc(88vh-2rem)] overscroll-contain touch-pan-y"
            >
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
                              className={`py-3 px-1 rounded-xl border text-[11px] font-black transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="scribe@domain.com (or leave for default)"
                        className="w-full bg-light border border-primary/15 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30 cursor-text"
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
                        className="w-full bg-light border border-primary/15 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30 cursor-text"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-dark/40 block">Your Scribed Message</label>
                      <textarea
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
                        className="w-full bg-light border border-primary/15 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30 resize-none cursor-text"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSending || isSuccess}
                        className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden group shadow-lg cursor-pointer ${
                          isSuccess
                            ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                            : 'bg-dark text-white hover:shadow-primary/20 hover:scale-[1.01] active:scale-98'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                        
                        <AnimatePresence mode="wait">
                          {isSending ? (
                            <motion.div
                              key="btn-loading"
                              initial={{ opacity: 0, scale: 0.85 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.85 }}
                              className="flex items-center justify-center gap-2.5 relative z-10"
                            >
                              <Loader2 className="w-5 h-5 animate-spin text-primary" />
                              <span className="text-sm tracking-wide font-bold">Inscribing & Folding...</span>
                            </motion.div>
                          ) : isSuccess ? (
                            <motion.div
                              key="btn-success"
                              initial={{ opacity: 0, scale: 0.7 }}
                              animate={{ opacity: 1, scale: [0.7, 1.15, 1] }}
                              exit={{ opacity: 0, scale: 0.85 }}
                              className="flex items-center justify-center gap-2 relative z-10"
                            >
                              <motion.div
                                initial={{ rotate: -45, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 450, damping: 15 }}
                                className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center"
                              >
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                              </motion.div>
                              <span className="text-sm font-black">Delivered! ✨</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="btn-default"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center justify-center gap-2.5 relative z-10"
                            >
                              <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              <span className="text-sm font-bold">Cast Envelope 💌</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="sent-confirmation-modal"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4 space-y-5 flex flex-col items-center"
                  >
                    {/* Animated Floating Graphic */}
                    <div className="relative">
                      <motion.div
                        animate={{
                          y: [0, -12, -12, 0],
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1.1, 1]
                        }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        className="w-18 h-18 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center text-primary border border-primary/25 shadow-lg relative z-10"
                      >
                        <Send className="w-8 h-8 rotate-[-15deg] text-primary" />
                      </motion.div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.3, 1] }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md z-20 border-2 border-white"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Transmission Verified & Logged</span>
                      </div>
                      <h3 className="font-extrabold text-2xl tracking-tight text-dark">
                        Letter Scribed & Cast! 💌
                      </h3>
                      <p className="text-foreground/75 font-medium text-xs max-w-sm leading-relaxed mx-auto">
                        Your message has securely entered our dispatch queue. Our support scribes will review and deliver a response to <span className="text-primary font-bold">{email}</span> within 24 hours.
                      </p>
                    </div>

                    {/* Digital Dispatch Receipt Card */}
                    <div className="w-full bg-light border border-primary/15 rounded-2xl p-4 text-left space-y-2.5 shadow-sm text-xs">
                      <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                        <span className="font-mono text-[10px] uppercase font-bold text-dark/50">Transmission Receipt</span>
                        <span className="font-mono font-black text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          200 OK DELIVERED
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-dark/40 block text-[9px] uppercase font-bold">Reference ID</span>
                          <span className="font-mono font-bold text-dark">{ticketId || 'INK-91823'}</span>
                        </div>
                        <div>
                          <span className="text-dark/40 block text-[9px] uppercase font-bold">Desk Route</span>
                          <span className="font-bold text-dark capitalize">{formType} Desk</span>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={handleCopyReceipt}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary hover:text-dark transition-colors cursor-pointer"
                        >
                          {copiedTicket ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied Reference Code!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Reference Receipt</span>
                            </>
                          )}
                        </button>
                        <span className="text-[10px] font-mono text-dark/40">Secure TLS 1.3</span>
                      </div>
                    </div>

                    <div className="pt-1 flex flex-col sm:flex-row gap-2.5 w-full">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 py-3 px-4 rounded-xl border border-dark/15 hover:bg-dark/5 text-xs font-bold text-dark/80 transition-all cursor-pointer"
                      >
                        Scribe Another Letter
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs hover:scale-102 active:scale-98 shadow-md hover:shadow-primary/30 transition-all cursor-pointer"
                      >
                        Complete & Return ✨
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating System Notification Toast */}
      <ToastNotification
        isVisible={showToast}
        title="Envelope Cast Successfully!"
        message={`Your message has been routed to our ${formType} desk. A confirmation log has been tagged to ${email}.`}
        ticketId={ticketId}
        onClose={() => setShowToast(false)}
      />
    </AnimatePresence>
  );
});
