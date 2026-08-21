import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Sparkles, Copy, Check } from 'lucide-react';

export interface ToastNotificationProps {
  isVisible: boolean;
  title: string;
  message: string;
  ticketId?: string;
  onClose: () => void;
  duration?: number;
}

export function ToastNotification({
  isVisible,
  title,
  message,
  ticketId,
  onClose,
  duration = 5000
}: ToastNotificationProps) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  const handleCopyTicket = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ticketId) return;
    navigator.clipboard.writeText(ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed top-6 right-6 z-[200] max-w-md w-[calc(100vw-3rem)] pointer-events-auto"
        >
          <div className="bg-dark/95 backdrop-blur-xl border border-primary/20 text-white rounded-3xl p-5 shadow-2xl shadow-primary/10 relative overflow-hidden">
            {/* Holographic Top Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

            {/* Countdown Progress Bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
            />

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <h4 className="text-sm font-extrabold text-white tracking-tight">{title}</h4>
                </div>
                <p className="text-xs text-white/75 font-medium leading-relaxed mb-2">
                  {message}
                </p>

                {ticketId && (
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-white/90">
                    <span>Receipt: {ticketId}</span>
                    <button
                      type="button"
                      onClick={handleCopyTicket}
                      className="hover:text-primary transition-colors p-0.5 cursor-pointer"
                      title="Copy receipt ID"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
