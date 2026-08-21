import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Developer() {
  return (
    <section className="py-32 relative border-t border-white/5 bg-black/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-xs font-medium text-gray-300">Meet the Developer</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Crafted with <span className="text-primary">passion</span> and precision.
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              INK was built to solve a fundamental problem with modern social interaction: the loss of genuine, uncurated conversation. As an independent developer, my goal was to create an experience that feels as premium as any Silicon Valley giant, but retains the soul of a handcrafted tool.
            </p>
            
            <div className="flex gap-4 pt-4">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 border border-white/10 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-overlay"></div>
              {/* Replace with actual image or elegant abstract pattern if no image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-sm">
                [Developer Portrait]
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-background/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl">
              <p className="font-bold text-white">Bibek Bista</p>
              <p className="text-sm text-gray-400">Creator & Lead Engineer</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
