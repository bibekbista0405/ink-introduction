import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, MessageCircleQuestion, Mail, Compass } from 'lucide-react';
import { Magnetic } from './ui/Magnetic';
import { fireConfetti } from '../lib/confetti';

// A handful of fixed waypoints describing a lazy, looping arc across the
// scene. The plane travels through these in order, then loops back to the
// start — simple keyframe animation (transform-only, no filter, no scroll
// binding), so it's cheap to run continuously and stays butter-smooth.
const FLIGHT_PATH = [
  { x: -140, y: 40, rotate: -8 },
  { x: -40, y: -70, rotate: -22 },
  { x: 70, y: -30, rotate: 6 },
  { x: 150, y: 60, rotate: 18 },
  { x: 40, y: 90, rotate: -4 },
  { x: -140, y: 40, rotate: -8 },
];

interface Wisp {
  id: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
}

export function NotFound() {
  const location = useLocation();
  const [wisps, setWisps] = useState<Wisp[]>([]);
  const [sendCount, setSendCount] = useState(0);

  // A small, tasteful burst of drifting dots/sparkles from the button — a
  // "sending another message off" moment. Bounded count, transform +
  // opacity only, so it stays cheap no matter how many times it's tapped.
  const handleSendAnother = () => {
    fireConfetti();
    setSendCount((c) => c + 1);
    const newWisps: Wisp[] = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      angle: (i / 10) * Math.PI * 2 + Math.random() * 0.4,
      distance: 90 + Math.random() * 70,
      size: Math.random() * 6 + 4,
      color: i % 3 === 0 ? '#FF4D8D' : i % 3 === 1 ? '#A855F7' : '#FF7A59',
    }));
    setWisps((prev) => [...prev, ...newWisps].slice(-40));
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-16 text-center overflow-hidden select-none">

      {/* Soft ambient backdrop — two static-blur glows, no animated filter */}
      <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-80 h-80 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      {/* Dashed flight-path arc, purely decorative */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M 80 340 C 220 120, 420 480, 600 160 S 760 340, 720 200"
          fill="none"
          stroke="currentColor"
          className="text-primary/40"
          strokeWidth="2"
          strokeDasharray="1 14"
          strokeLinecap="round"
        />
      </svg>

      {/* The lost paper airplane, looping its little flight forever */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-0 pointer-events-none"
        animate={{
          x: FLIGHT_PATH.map(p => p.x),
          y: FLIGHT_PATH.map(p => p.y),
          rotate: FLIGHT_PATH.map(p => p.rotate),
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.45, 0.7, 0.88, 1],
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 text-primary drop-shadow-md">
          <path
            d="M1.91 11.08c-.38.16-.39.69-.02.87l6.81 3.23c.31.15.68.08.92-.17l9.46-9.46c.15-.15.37.07.22.22l-9.46 9.46c-.25.25-.32.61-.17.92l3.23 6.81c.18.38.71.37.87-.02L21.72 3.1c.12-.29-.19-.6-.48-.48L1.91 11.08z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* Sent-message wisps burst */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <AnimatePresence>
          {wisps.map((w) => (
            <motion.div
              key={w.id}
              className="absolute left-1/2 top-[62%] rounded-full"
              style={{
                width: w.size,
                height: w.size,
                backgroundColor: w.color,
              }}
              initial={{ opacity: 0.9, scale: 0.3, x: 0, y: 0 }}
              animate={{
                opacity: [0.9, 0.9, 0],
                scale: [0.6, 1, 0.4],
                x: Math.cos(w.angle) * w.distance,
                y: Math.sin(w.angle) * w.distance - 40,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Core content */}
      <div className="max-w-xl w-full flex flex-col items-center relative z-20">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-black text-primary uppercase tracking-wider mb-8">
          <Compass className="w-3.5 h-3.5" />
          <span>Off the map</span>
        </div>

        {/* Big, clean 404 — no drip, just gentle floating weight */}
        <h1 className="text-8xl md:text-9xl font-black text-dark tracking-tighter mb-5 flex items-center justify-center gap-1">
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            4
          </motion.span>
          <motion.span
            className="text-primary"
            animate={{ y: [0, 10, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            0
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            4
          </motion.span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 leading-snug">
          This message never found its way.
        </h2>

        <p className="text-foreground/70 text-base md:text-lg font-medium leading-relaxed mb-2 max-w-md">
          Somewhere between sending and arriving, this page slipped off course.
          Nothing was lost on our end — it just isn't here.
        </p>

        {location.pathname && location.pathname !== '/404' && (
          <p className="text-foreground/40 text-sm font-mono mb-9 mt-1">
            you tried: <span className="text-foreground/60">{location.pathname}</span>
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-10">
          <Magnetic strength={0.15}>
            <motion.div
              whileTap={{
                scale: 1.05,
                filter: "brightness(1.15) contrast(1.05)",
                boxShadow: "0px 8px 24px rgba(255, 77, 141, 0.35)",
              }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/"
                className="w-full inline-flex items-center justify-center gap-2 bg-dark text-white font-bold px-8 py-3.5 rounded-full hover:bg-dark/90 transition-all shadow-md hover:shadow-lg cursor-none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Take me home</span>
              </Link>
            </motion.div>
          </Magnetic>

          <Magnetic strength={0.15}>
            <motion.button
              whileTap={{
                scale: 1.05,
                filter: "brightness(1.15) contrast(1.05)",
                boxShadow: "0px 8px 24px rgba(168, 85, 247, 0.3)",
              }}
              onClick={handleSendAnother}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-dark border border-primary/25 font-bold px-6 py-3.5 rounded-full hover:bg-primary/5 hover:border-primary transition-all shadow-sm cursor-none"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{sendCount > 2 ? "Still nowhere. Try home?" : "Send it off again"}</span>
            </motion.button>
          </Magnetic>
        </div>

        {/* Better handling: quick, genuinely useful escape hatches instead of a dead end */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/faq"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-dark text-sm font-semibold transition-colors"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            Browse FAQ
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-dark text-sm font-semibold transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
