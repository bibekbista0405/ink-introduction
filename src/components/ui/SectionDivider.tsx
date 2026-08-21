import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { Sparkles } from 'lucide-react';

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full py-16 md:py-24 relative flex justify-center items-center overflow-hidden", className)}>
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-primary/10 rounded-full blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="w-full max-w-5xl mx-auto flex items-center justify-center relative z-10 px-6">
        <motion.div 
          className="h-[2px] bg-gradient-to-r from-transparent to-primary/40 flex-1 origin-right rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "circOut" }}
        />
        
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="mx-4 md:mx-8 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-lg rounded-full scale-150 animate-pulse" />
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/30 flex items-center justify-center bg-white/5 backdrop-blur-md relative z-10 shadow-lg">
            <Sparkles className="w-5 h-5 text-accent drop-shadow-md" />
          </div>
          
          {/* Orbiting dot */}
          <motion.div
            className="absolute inset-[-10px] z-20"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(132,250,176,0.8)]" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="h-[2px] bg-gradient-to-l from-transparent to-primary/40 flex-1 origin-left rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "circOut" }}
        />
      </div>
    </div>
  );
}
