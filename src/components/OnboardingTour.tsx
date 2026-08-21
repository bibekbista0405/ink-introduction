import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Check, Sparkles, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

const steps = [
  {
    title: "Welcome to INK 🌸",
    description: "The sweetest place for authentic, anonymous conversations. Let's show you around.",
    icon: Sparkles,
    color: "text-primary bg-primary/10"
  },
  {
    title: "Share Your Link",
    description: "Generate your unique INK link and post it on your socials (Instagram, Twitter, etc.).",
    icon: LinkIcon,
    color: "text-accent bg-accent/10"
  },
  {
    title: "Read & Respond",
    description: "Receive anonymous messages safely. Choose which ones to respond to and share publicly.",
    icon: MessageSquare,
    color: "text-secondary bg-secondary/10"
  }
];

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('ink_onboarding_completed');
    if (!hasSeenTour) {
      // Add a small delay before showing the tour
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const completeTour = () => {
    setIsOpen(false);
    localStorage.setItem('ink_onboarding_completed', 'true');
  };

  const StepIcon = steps[currentStep].icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={completeTour}
          />
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.8}
            onDragEnd={(event, info) => {
              const swipeThresholdX = 80;
              const swipeThresholdY = 100;
              const velocityThreshold = 300;

              if (info.offset.y > swipeThresholdY || info.velocity.y > velocityThreshold) {
                // Swipe down -> dismiss
                completeTour();
              } else if (info.offset.x < -swipeThresholdX || info.velocity.x < -velocityThreshold) {
                // Swipe left -> next
                handleNext();
              } else if (info.offset.x > swipeThresholdX || info.velocity.x > velocityThreshold) {
                // Swipe right -> previous
                if (currentStep > 0) {
                  setCurrentStep(currentStep - 1);
                }
              }
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-primary/20 cursor-grab active:cursor-grabbing touch-none select-none"
          >
            {/* Progress Bar */}
            <div className="flex h-1.5 w-full bg-gray-100">
              <motion.div 
                className="bg-gradient-to-r from-primary to-accent"
                initial={{ width: `${((currentStep) / steps.length) * 100}%` }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Drag Handle Bar */}
            <div className="w-12 h-1 bg-gray-200/80 rounded-full mx-auto mt-3.5 mb-0.5 pointer-events-none" />

            <motion.button 
              whileTap={{ scale: 0.85 }}
              onClick={completeTour}
              className="absolute top-5 right-4 p-2 text-gray-400 hover:text-dark transition-colors rounded-full hover:bg-gray-100 z-10"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="p-8 pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center pointer-events-none"
                >
                  <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm ${steps[currentStep].color}`}>
                    <StepIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3 select-none">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-foreground/70 font-medium leading-relaxed mb-6 select-none">
                    {steps[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-col gap-4 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {steps.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-primary w-6' : 'bg-gray-200 w-2'}`}
                      />
                    ))}
                  </div>
                  <MagneticButton
                    whileTap={{
                      scale: 1.05,
                      filter: "brightness(1.15) contrast(1.05)",
                      boxShadow: "0px 8px 24px rgba(255, 139, 167, 0.45)",
                    }}
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-3 bg-dark text-white rounded-full font-bold shadow-lg cursor-pointer"
                  >
                    {currentStep === steps.length - 1 ? (
                      <>Get Started <Check className="w-4 h-4" /></>
                    ) : (
                      <>Next <ArrowRight className="w-4 h-4" /></>
                    )}
                  </MagneticButton>
                </div>
                
                <div className="text-center">
                  <span className="text-[10px] font-mono font-bold text-gray-400 select-none uppercase tracking-wider">
                    Swipe left/right to browse • Swipe down to dismiss
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
