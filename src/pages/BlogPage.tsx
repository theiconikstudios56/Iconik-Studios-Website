import Layout from '../components/Layout';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import IconikLogo from '../components/IconikLogo';

const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Automate Lead Capture on a New Website",
    excerpt: "If your team is still manually handling lead follow-up, you're leaving serious money on the table. Discover how automated lead capture transforms your website.",
    date: "26.02.26",
    author: "ICONIK TEAM",
    category: "AI",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 2,
    title: "Automate Client Onboarding Website Setup",
    excerpt: "A seamless client onboarding experience shouldn't require endless emails. Learn how to design an autonomous onboarding flow that delights clients and saves hours.",
    date: "18.02.26",
    author: "ICONIK TEAM",
    category: "STRATEGY",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    title: "Connect CRM to Website for Automated Follow Ups",
    excerpt: "Your website is only as powerful as the systems behind it. We break down the exact strategies to sync your site with GoHighLevel or HubSpot for instant nurturing.",
    date: "21.01.26",
    author: "ICONIK TEAM",
    category: "AUTOMATION",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 4,
    title: "Why Your Website Is Losing You Leads (And How to Fix It)",
    excerpt: "Are visitors bouncing before they convert? We explore the top design mistakes that kill conversion rates and how to engineer a frictionless user journey.",
    date: "19.01.26",
    author: "ICONIK TEAM",
    category: "DESIGN",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 5,
    title: "VINTAGE SOLE RETROSPECTIVE",
    excerpt: "CRAFTING NARRATIVES THAT RESONATE WITH A GLOBAL AUDIENCE IN THE AGE OF AI.",
    date: "12.12.25",
    author: "ICONIK TEAM",
    category: "CREATIVE",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 6,
    title: "THE FUTURE OF HYPE CULTURE",
    excerpt: "HOW TO LEVERAGE TECHNOLOGY TO GROW YOUR BRAND WITHOUT LOSING THE HUMAN TOUCH.",
    date: "27.11.25",
    author: "ICONIK TEAM",
    category: "GROWTH",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 7,
    title: "SNEAKERHEADS IN THE METAVERSE",
    excerpt: "VIRTUAL ASSETS AND REAL-WORLD VALUE.",
    date: "21.11.25",
    author: "ICONIK TEAM",
    category: "COMMUNITY",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 8,
    title: "SUSTAINABLE LUXURY FOOTWEAR",
    excerpt: "THE NEXT ERA OF ECO-CONSCIOUS MANUFACTURING.",
    date: "15.11.25",
    author: "ICONIK TEAM",
    category: "INNOVATION",
    image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function BlogPage() {
  return (
    <Layout
      title="Insights & Strategies | AI Automation Blog | Iconik Studios"
      description="Read the latest insights on AI automation, web development, and digital strategy to scale your business effortlessly."
    >
      <div className="bg-[#000000] min-h-screen text-white font-sans selection:bg-burnt-orange selection:text-white" data-bg="black">
        {/* Navigation spacer */}
        <div className="h-24 md:h-32" />

        {/* Blog Grid - Matching the High-End Boutique Aesthetic */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
              {BLOG_POSTS.map((post, idx) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                  className="group cursor-pointer"
                >
                  {/* Image Container with Badge */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#000] mb-6">
                    {/* Release Badge */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                      <div className="bg-white text-black px-6 py-2 rounded-full font-mono text-[10px] sm:text-[11px] font-bold tracking-widest whitespace-nowrap border border-black/5">
                        RELEASES — {post.date.split(',')[0]}
                      </div>
                    </div>

                    <motion.img 
                      src={post.image} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Title - Bold All Caps */}
                  <div className="px-1">
                    <h2 className="text-xl md:text-2xl font-display font-black leading-[1.1] uppercase tracking-tight group-hover:text-burnt-orange transition-colors duration-300">
                      {post.title}
                    </h2>
                    
                    {/* Decorative underline appearing on hover */}
                    <motion.div 
                      className="h-[1px] bg-burnt-orange mt-4 w-0 group-hover:w-full transition-all duration-500 origin-left"
                    />
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Row Divider - seen in image */}
            <div className="mt-24 border-t border-white/10 w-full" />
          </div>
        </section>

        {/* Footer CTA - Themed for Dark Mode */}
        <section className="py-40 px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-[10px] font-mono text-burnt-orange tracking-[0.6em] block mb-12 uppercase">Join the Inner Circle</span>
            <h2 className="text-5xl md:text-8xl font-display mb-12 leading-none uppercase tracking-tighter">
              READY TO <span className="italic font-light">EVOLVE?</span>
            </h2>
            <p className="text-lg md:text-xl font-light text-white mb-12 max-w-xl mx-auto leading-relaxed">
              SUBSCRIBE TO OUR DISPATCH FOR EXCLUSIVE INSIGHTS INTO AI, DESIGN, AND THE FUTURE OF DIGITAL COMMERCE.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="w-full md:w-80 bg-white/5 border border-white/10 px-8 py-6 rounded-none font-mono text-xs focus:border-burnt-orange outline-none transition-colors"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-12 py-6 bg-white text-black font-mono text-xs tracking-[0.4em] uppercase hover:bg-burnt-orange hover:text-white transition-all duration-300 font-bold"
              >
                Access Dispatch
              </motion.button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
