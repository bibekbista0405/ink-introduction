import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, MapPin, Heart, Sparkles, MessageSquare, AlertCircle, FileText, Check, Loader2, CheckCircle2, Copy } from 'lucide-react';
import { AnimatedText } from './ui/AnimatedText';
import { Reveal, RevealChild } from './ui/Reveal';
import { MagneticButton } from './ui/MagneticButton';
import { fireConfetti } from '../lib/confetti';
import { ToastNotification } from './ui/ToastNotification';

export const Contact = memo(function Contact() {
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

    // Multi-stage transmission with loading spinner and checkmark animation
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

  return (
    <div className="pt-8">
      {/* Hero Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/20 mb-6 shadow-sm"
          >
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary tracking-widest uppercase">Contact Us</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-dark flex flex-col items-center gap-1">
            <AnimatedText text="Whisper in Ink." delay={0.1} />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              <AnimatedText text="We are all ears." delay={0.3} />
            </span>
          </h1>

          <p className="text-foreground/70 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">
            Have a question, feedback, report, or just want to slide us a love note? Choose your letter type below and seal it into our digital stream.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Info Column - Left */}
          <div className="lg:col-span-5 space-y-12">
            <Reveal className="space-y-6">
              <h3 className="text-3xl font-black text-dark tracking-tight">Support Desks</h3>
              <p className="text-foreground/75 font-semibold leading-relaxed">
                Whether you need account support, safety assistance, or custom partnership clearance, our dedicated squads review all transmissions.
              </p>
            </Reveal>

            <Reveal staggerChildren={0.15} className="space-y-8">
              <RevealChild className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-primary border border-primary/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-1">General Operations</h4>
                  <p className="text-foreground/60 font-semibold text-sm">support@ink.app</p>
                </div>
              </RevealChild>

              <RevealChild className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-danger/10 flex items-center justify-center shrink-0 text-danger border border-danger/10">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-1">Abuse & Safety Board</h4>
                  <p className="text-foreground/60 font-semibold text-sm">safety@ink.app</p>
                </div>
              </RevealChild>

              <RevealChild className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0 text-secondary border border-secondary/10">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-1">Press & Partnerships</h4>
                  <p className="text-foreground/60 font-semibold text-sm">hello@ink.app</p>
                </div>
              </RevealChild>

              <RevealChild className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#C3AED6]/15 flex items-center justify-center shrink-0 text-[#C3AED6] border border-[#C3AED6]/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-dark mb-1">Sanctuary HQ</h4>
                  <p className="text-foreground/65 font-medium text-sm leading-snug">
                    100 Silent Valley Road,<br />
                    Cloud Suite 45, SF, CA
                  </p>
                </div>
              </RevealChild>
            </Reveal>
          </div>

          {/* Interactive Form Column - Right */}
          <div className="lg:col-span-7 bg-white border-2 border-primary/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-dark"
                >
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/40 block">Select Letter Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
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
                            className={`py-3 px-2 rounded-2xl border text-xs font-black transition-all flex flex-col items-center justify-center gap-1.5 ${
                              isSelected
                                ? 'bg-primary/10 border-primary text-primary shadow-sm'
                                : 'bg-light border-primary/10 text-dark/70 hover:border-primary/20'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/40 block">Your Return Address (Email)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scribe@domain.com"
                      className="w-full bg-light border border-primary/15 rounded-2xl py-4 px-5 text-base font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/40 block">Subject Heading</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="What is your message regarding?"
                      className="w-full bg-light border border-primary/15 rounded-2xl py-4 px-5 text-base font-bold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-dark/40 block">Your Scribed Message</label>
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
                      rows={5}
                      className="w-full bg-light border border-primary/15 rounded-2xl py-4 px-5 text-base font-semibold focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-foreground/30 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSending || isSuccess}
                      className={`w-full h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group shadow-lg cursor-pointer ${
                        isSuccess
                          ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                          : 'bg-dark text-white hover:shadow-primary/20 hover:scale-[1.01] active:scale-98'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                      
                      <AnimatePresence mode="wait">
                        {isSending ? (
                          <motion.div
                            key="contact-loading"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            className="flex items-center justify-center gap-3 relative z-10"
                          >
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                            <span className="tracking-wide">Inscribing & Folding letter...</span>
                          </motion.div>
                        ) : isSuccess ? (
                          <motion.div
                            key="contact-success"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: [0.7, 1.15, 1] }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            className="flex items-center justify-center gap-2.5 relative z-10"
                          >
                            <motion.div
                              initial={{ rotate: -45, scale: 0 }}
                              animate={{ rotate: 0, scale: 1 }}
                              transition={{ type: "spring", stiffness: 450, damping: 15 }}
                              className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white stroke-[3]" />
                            </motion.div>
                            <span className="font-black">Delivered to Inbox! ✨</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="contact-default"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-3 relative z-10"
                          >
                            <Send className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            <span>Cast Envelope 💌</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="sent-confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-6 flex flex-col items-center text-dark"
                >
                  {/* Floating Animated Graphic */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        y: [0, -16, -16, 0],
                        rotate: [0, -12, 12, 0],
                        scale: [1, 1.12, 1.12, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                      className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center text-primary border-2 border-primary/25 shadow-xl relative z-10"
                    >
                      <Send className="w-10 h-10 rotate-[-15deg] text-primary" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.3, 1] }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg z-20 border-2 border-white"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Transmission Verified & Logged</span>
                    </div>
                    <h3 className="font-black text-3xl md:text-4xl tracking-tight text-dark">
                      Scribed & Cast! 💌
                    </h3>
                    <p className="text-foreground/75 font-semibold text-sm md:text-base max-w-md leading-relaxed mx-auto">
                      Your letter has entered our live stream. Our support squad will review and dispatch a response to <span className="text-primary font-bold">{email}</span> within 24 hours.
                    </p>
                  </div>

                  {/* Digital Dispatch Receipt Card */}
                  <div className="w-full max-w-md bg-light border-2 border-primary/15 rounded-3xl p-6 text-left space-y-3.5 shadow-md">
                    <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                      <span className="font-mono text-xs uppercase font-bold text-dark/50 tracking-wider">Dispatch Receipt</span>
                      <span className="font-mono font-black text-emerald-600 text-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        200 OK DELIVERED
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-dark/40 block text-[10px] uppercase font-bold tracking-wider">Reference Code</span>
                        <span className="font-mono font-bold text-dark text-sm">{ticketId || 'INK-82914'}</span>
                      </div>
                      <div>
                        <span className="text-dark/40 block text-[10px] uppercase font-bold tracking-wider">Desk Route</span>
                        <span className="font-bold text-dark text-sm capitalize">{formType} Support</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-primary/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleCopyReceipt}
                        className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-dark transition-colors cursor-pointer"
                      >
                        {copiedTicket ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-600">Copied Reference Code!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Reference Code</span>
                          </>
                        )}
                      </button>
                      <span className="text-xs font-mono text-dark/40">Secure TLS 1.3</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3.5 w-full max-w-md">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 py-3.5 px-6 rounded-2xl border-2 border-dark/10 hover:bg-dark/5 text-sm font-bold text-dark/80 transition-all cursor-pointer"
                    >
                      Scribe Another Letter
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = '/';
                      }}
                      className="flex-1 py-3.5 px-6 rounded-2xl bg-primary text-white font-bold text-sm hover:scale-102 active:scale-98 shadow-md hover:shadow-primary/30 transition-all cursor-pointer"
                    >
                      Return Home ✨
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Floating Notification Toast */}
      <ToastNotification
        isVisible={showToast}
        title="Envelope Cast Successfully!"
        message={`Your message has been routed to our ${formType} desk. A confirmation log has been tagged to ${email}.`}
        ticketId={ticketId}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
});
