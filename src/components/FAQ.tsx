import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import squareAnimation from '../assets/square.json';
import { cn } from '../lib/utils';
import { AnimatedText } from './ui/AnimatedText';
import { CustomImage } from './ui/CustomImage';
import { Reveal } from './ui/Reveal';
import { SectionReveal } from './ui/SectionReveal';
import { usePerformanceSettings } from '../lib/performance';

const faqs = [
  {
    question: "Is INK truly anonymous?",
    answer: "Yes, absolutely. We do not track IP addresses, require logins to send feedback, or collect location details. The system is designed to be technically untraceable so senders can speak their raw minds."
  },
  {
    question: "How does INK filter out spam and hate?",
    answer: "We have built-in real-time content safety filters. Profanity, cyberbullying, and harassment are blocked automatically. Repeated bad actors are permanently IP banned."
  },
  {
    question: "Can anyone hack or pay to see sender names?",
    answer: "No. Security and absolute privacy is our core promise. It is mathematically and architecturally impossible to trace sender profiles. Senders remain 100% unseen."
  },
  {
    question: "Can I share anonymous cards on Instagram?",
    answer: "Yes! Any message you receive can be formatted into a gorgeous, highly styled custom graphic card and shared directly to your Instagram, Snapchat, or TikTok stories with a single tap."
  },
  {
    question: "How does Premium billing work?",
    answer: "INK remains 100% free for core features. Premium is optional at $4.99/month and unlocks gorgeous animated profile skins, visitor traffic analytics, early access to new games, and VIP badges."
  }
];

// High-performance WebP formats for instant loading & decodes
const faqGiphys = [
  "https://media.giphy.com/media/unQ3IJUWK7cj6/giphy.webp", // Is INK anonymous? (cat typing sneakily)
  "https://media.giphy.com/media/2A75RyXVzzSI2bx4Gj/giphy.webp", // How to deal with spam? (sweeping/cleaning)
  "https://media.giphy.com/media/U7P0BlqQ2Oco5Gi9c1/giphy.webp", // Can I find out? (No way/secretive lock)
  "https://media.giphy.com/media/ibolLe3mOqHE3PQTtk/giphy.webp", // Mobile app? (happy tech/mobile)
  "https://media.giphy.com/media/J1Y89ThkHjwJxeRS0A/giphy.webp"  // How does INK make money? (cash success thumbs up)
];

export const FAQ = memo(function FAQ() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { quality, isMobile } = usePerformanceSettings();

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(search.toLowerCase()) || 
    faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Decorative background blobs: Disabled on quality <= 2 to avoid browser layout compositing drops */}
      {quality >= 3 && (
        <div className="absolute top-[30%] right-[-15%] w-[35vw] h-[35vw] rounded-full bg-accent/10 blur-[80px] pointer-events-none animate-blob animation-delay-4000" />
      )}
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 relative">
          
          {/* Lottie Loop: disabled on low-end hardware/mobile (quality <= 1) to conserve CPU cycles */}
          {quality >= 2 && !isMobile && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 -z-10 opacity-25 mix-blend-multiply pointer-events-none">
              <DotLottieReact data={squareAnimation} loop autoplay />
            </div>
          )}

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-6 shadow-md overflow-hidden bg-transparent mix-blend-multiply"
          >
            <CustomImage 
              src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.webp"
              alt="Confused reaction emoji"
              className="w-full h-full border-none rounded-none bg-transparent"
              imageClassName="opacity-80 object-cover"
            />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-dark relative z-10 flex flex-col items-center gap-1">
            <AnimatedText text="Questions?" delay={0.05} />
            <AnimatedText 
              text="Answers." 
              className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary" 
              delay={0.2} 
            />
          </h2>
          
          <Reveal yOffset={15} delay={0.3} className="relative max-w-xl mx-auto mt-12 group z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 -z-10"></div>
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-primary/20 rounded-[2rem] py-4 pl-14 pr-6 text-dark placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-lg shadow-md"
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* FAQ Accordion List - Takes 2 cols on lg */}
          <SectionReveal.List className="lg:col-span-2 space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <SectionReveal.Item 
                    key={index}
                    yOffset={15}
                    className={cn(
                      "bg-white border rounded-[2rem] overflow-hidden transition-all duration-350 relative z-10",
                      isOpen ? "border-primary/30 shadow-md" : "border-primary/10 hover:border-primary/20 shadow-sm"
                    )}
                  >
                    <button 
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-7 text-left group"
                    >
                      <span className={cn(
                        "font-bold text-xl transition-colors duration-250",
                        isOpen ? "text-dark" : "text-foreground/80 group-hover:text-dark"
                      )}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-250",
                          isOpen ? "bg-primary/20 text-primary" : "bg-foreground/5 text-foreground/40 group-hover:bg-primary/10 group-hover:text-primary"
                        )}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="p-7 pt-0 text-foreground/70 font-medium leading-relaxed text-lg max-w-3xl">
                             {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SectionReveal.Item>
                );
              })
            ) : (
              <div className="text-center py-20 text-foreground/50 font-medium text-lg relative z-10">
                No answers found for "<span className="text-dark font-bold">{search}</span>"
              </div>
            )}
          </SectionReveal.List>

          {/* Sticky Live Reaction Giphy Panel - Column 3 on Desktop (only if quality level is balanced or higher) */}
          {quality >= 2 && (
            <div className="hidden lg:block sticky top-32 z-20">
              <Reveal delay={0.1} yOffset={25} className="w-full">
                <div className="bg-white/85 backdrop-blur-md border border-primary/20 rounded-[3rem] p-8 shadow-md text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
                  
                  <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Visual Reaction 🎭</h4>
                  
                  <div className="w-full aspect-square rounded-[2.2rem] overflow-hidden border-4 border-white shadow-md bg-gray-50 relative mb-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={openIndex ?? 'default'}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full absolute inset-0"
                      >
                        <CustomImage 
                          src={openIndex !== null && openIndex < faqGiphys.length ? faqGiphys[openIndex] : "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.webp"} 
                          alt="FAQ Reaction Giphy" 
                          className="w-full h-full border-none rounded-none bg-transparent"
                          imageClassName="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <p className="text-foreground/80 font-bold text-lg min-h-[56px] px-2 leading-snug">
                    {openIndex !== null && openIndex < faqs.length
                      ? `"${faqs[openIndex].question}"`
                      : "Click any question to reveal its custom reaction!"}
                  </p>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
