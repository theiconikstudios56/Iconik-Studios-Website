import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  body: string;
  slug: string;
  tags: string[];
  meta_description: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1200",
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}.${month}.${year}`;
}

const LatestInsights = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/articles?published=eq.true&order=created_at.desc&limit=4`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
          }
        );
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Failed to fetch articles for LatestInsights:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <section className="py-32 px-6 lg:px-12 bg-black text-white">
      <div className="max-w-[1800px] mx-auto space-y-24">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-9xl font-display uppercase tracking-tighter"
          >
            Latest Insights
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto text-lg opacity-100 font-light uppercase tracking-widest text-white italic"
          >
            "Deep dives into the intersection of design and technology."
          </motion.p>
        </div>

        {/* Grid Section - Matching Blog Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse space-y-8">
                <div className="aspect-[3/4] bg-white/5" />
                <div className="space-y-4 px-1">
                  <div className="h-7 bg-white/10 w-11/12" />
                  <div className="h-7 bg-white/10 w-2/3" />
                </div>
              </div>
            ))
          ) : (
            articles.map((item, index) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                className="group cursor-pointer"
                onClick={() => navigate(`/blog/${item.slug}`)}
              >
                {/* Image Container with Badge */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white/5 mb-8">
                  {/* Release Badge */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-white text-black px-6 py-2 rounded-full font-mono text-[10px] font-bold tracking-widest whitespace-nowrap">
                      RELEASES — {formatDate(item.created_at)}
                    </div>
                  </div>

                  <motion.img 
                    src={item.image_url || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];
                    }}
                  />
                  
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Title Content */}
                <div className="px-1">
                  <h3 className="text-2xl md:text-3xl font-display font-black leading-[1.1] uppercase tracking-tight group-hover:text-burnt-orange transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* Decorative underline appearing on hover */}
                  <motion.div 
                    className="h-[1.5px] bg-burnt-orange mt-6 w-0 group-hover:w-full transition-all duration-500 origin-left"
                  />
                </div>
              </motion.article>
            ))
          )}
        </div>
        
        {/* Footer Link */}
        <div className="pt-12 text-center">
            <Link 
                to="/blog"
                className="inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.4em] text-white hover:text-burnt-orange transition-colors duration-300"
            >
                View all articles <ArrowUpRight size={14} />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;
