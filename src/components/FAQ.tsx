import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  },
  {
    question: "Do I need to download an app to use INK?",
    answer: "No download required. INK runs entirely in your mobile or desktop browser. Just create your link once and share it anywhere — friends can send you anonymous messages without installing anything either."
  },
  {
    question: "Can I delete a message someone sent me?",
    answer: "Yes. Every message in your inbox has a delete option. Deleting a message removes it permanently from our servers — it isn't just hidden from your view, it's actually gone."
  },
  {
    question: "Can senders see if I've read their message?",
    answer: "No. Because senders never create an account or stay connected to a session, there's no read-receipt or online-status system at all. Your reading activity is completely private, even from the sender."
  },
  {
    question: "Is there a limit to how many anonymous messages I can receive?",
    answer: "None. Your inbox has no cap on the free plan. Whether you get 5 messages or 5,000, INK handles it the same way — fast, private, and spam-filtered."
  },
  {
    question: "Can I get anonymous messages removed or reported?",
    answer: "Yes. Every message has a report option that flags it for our safety team and immediately hides it from your inbox while it's reviewed. Reported senders that violate our guidelines are permanently banned."
  },
  {
    question: "Can I use INK for anonymous Q&A instead of just messages?",
    answer: "Definitely. Many people use their INK link for anonymous Q&A sessions — post a question sticker on your story, get anonymous answers, and share the fun replies back. It works the same way as anonymous feedback."
  },
  {
    question: "Can I use INK on multiple social platforms at once?",
    answer: "Yes. Your INK link works everywhere — Instagram, Snapchat, TikTok, X, or your bio anywhere. You get one shareable link and one inbox, no matter how many platforms you post it on."
  }
];

// Special, hidden result that surfaces only when someone searches for the
// developer by name — a little easter egg that doubles as a genuine answer,
// linking straight through to the /bibek page.
const developerEasterEgg = {
  question: "Who built INK?",
  answer: "INK was designed and built by Bibek Bista — every animation, layout, and interaction on this site was hand-crafted by him. Curious what makes him tick? There's a whole dedicated space for that.",
  isDeveloperEgg: true,
};
const developerKeywords = ["bibek", "bista", "developer", "creator", "who made", "who built", "who created", "founder"];

// High-performance WebP formats for instant loading & decodes.
// Note: this list is intentionally kept in sync with (and cycled across,
// via modulo) rather than 1:1 with `faqs` — every URL here is a verified,
// working Giphy asset. Adding one unverified hash per new FAQ risked
// pointing at broken/removed Giphy content, so newer questions reuse this
// same trusted rotation instead of guessing at new hashes.
const faqGiphys = [
  "https://media.giphy.com/media/unQ3IJUWK7cj6/giphy.webp", // Is INK anonymous? (cat typing sneakily)
  "https://media.giphy.com/media/2A75RyXVzzSI2bx4Gj/giphy.webp", // How to deal with spam? (sweeping/cleaning)
  "https://media.giphy.com/media/U7P0BlqQ2Oco5Gi9c1/giphy.webp", // Can I find out? (No way/secretive lock)
  "https://media.giphy.com/media/ibolLe3mOqHE3PQTtk/giphy.webp", // Mobile app? (happy tech/mobile)
  "https://media.giphy.com/media/J1Y89ThkHjwJxeRS0A/giphy.webp"  // How does INK make money? (cash success thumbs up)
];

export const FAQ = memo(function FAQ() {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(0);
  const { quality, isMobile } = usePerformanceSettings();

  const normalizedSearch = search.trim().toLowerCase();

  // Bug fix: this used to filter `faqs` and re-map to a fresh 0-based index
  // for every render, then use THAT filtered-array position as the item's
  // key/open-state/giphy-lookup id. The moment you searched something, an
  // item's "position" changed to wherever it landed in the shorter filtered
  // list — completely disconnected from its real identity. Clearing the
  // search then restored the full list at the ORIGINAL positions, but any
  // open/giphy state set while filtered was now pointing at the wrong item
  // (or an index that no longer existed), which is what was producing the
  // blank/broken-looking page. Every item now carries a stable `id` (its
  // fixed position in the master `faqs` array) that never changes no
  // matter how the visible list is filtered.
  const filteredFaqs = faqs
    .map((faq, id) => ({ ...faq, id }))
    .filter(faq =>
      faq.question.toLowerCase().includes(normalizedSearch) ||
      faq.answer.toLowerCase().includes(normalizedSearch)
    );

  const showDeveloperEgg = normalizedSearch.length > 0 &&
    developerKeywords.some(k => normalizedSearch.includes(k));

  const hasResults = filteredFaqs.length > 0 || showDeveloperEgg;

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
            {hasResults ? (
              <>
                {showDeveloperEgg && (
                  <SectionReveal.Item
                    yOffset={15}
                    className="bg-gradient-to-br from-primary/10 via-white to-accent/10 border-2 border-primary/30 rounded-[2rem] overflow-hidden shadow-md relative z-10 p-7"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl">✍️</span>
                      <span className="font-bold text-xl text-dark">{developerEasterEgg.question}</span>
                    </div>
                    <p className="text-foreground/70 font-medium leading-relaxed text-lg mb-5">
                      {developerEasterEgg.answer}
                    </p>
                    <Link
                      to="/bibek"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:opacity-90 transition-opacity"
                    >
                      Meet the developer
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </SectionReveal.Item>
                )}
                {filteredFaqs.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <SectionReveal.Item 
                      key={faq.id}
                      yOffset={15}
                      className={cn(
                        "bg-white border rounded-[2rem] overflow-hidden transition-all duration-350 relative z-10",
                        isOpen ? "border-primary/30 shadow-md" : "border-primary/10 hover:border-primary/20 shadow-sm"
                      )}
                    >
                      <button 
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
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
                })}
              </>
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
                        key={openId ?? 'default'}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full absolute inset-0"
                      >
                        <CustomImage 
                          src={openId !== null ? faqGiphys[openId % faqGiphys.length] : "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.webp"} 
                          alt="FAQ Reaction Giphy" 
                          className="w-full h-full border-none rounded-none bg-transparent"
                          imageClassName="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <p className="text-foreground/80 font-bold text-lg min-h-[56px] px-2 leading-snug">
                    {openId !== null
                      ? `"${faqs[openId].question}"`
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
