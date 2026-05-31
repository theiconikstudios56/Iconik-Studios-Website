import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'motion/react';

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

interface Article {
  id: number;
  title: string;
  body: string;
  slug: string;
  tags: string[];
  meta_description: string;
  published: boolean;
  created_at: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}.${month}.${year}`;
}

function getExcerpt(body: string): string {
  const stripped = body.replace(/<[^>]+>/g, '');
  return stripped.length > 160 ? stripped.slice(0, 157) + '...' : stripped;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/articles?published=eq.true&order=created_at.desc`,
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
        console.error('Failed to fetch articles:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <Layout
      title="Insights & Strategies | AI Automation Blog | Iconik Studios"
      description="Read the latest insights on AI automation, web development, and digital strategy to scale your business effortlessly."
    >
      <div className="bg-[#000000] min-h-screen text-white font-sans selection:bg-burnt-orange selection:text-white" data-bg="black">
        {/* Navigation spacer */}
        <div className="h-24 md:h-32" />

        {/* Blog Grid */}
        <section className="py-12 px-4 md:px-8">
          <div className="max-w-[1800px] mx-auto">

            {loading ? (
              <div className="flex items-center justify-center py-40">
                <p className="font-mono text-xs tracking-widest text-white/40 uppercase">Loading Articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="flex items-center justify-center py-40">
                <p className="font-mono text-xs tracking-widest text-white/40 uppercase">No Articles Yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                {articles.map((article, idx) => (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/blog/${article.slug}`)}
                  >
                    {/* Image Container with Badge */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#000] mb-6">
                      {/* Release Badge */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                        <div className="bg-white text-black px-6 py-2 rounded-full font-mono text-[10px] sm:text-[11px] font-bold tracking-widest whitespace-nowrap border border-black/5">
                          RELEASES — {formatDate(article.created_at)}
                        </div>
                      </div>

                      <motion.img
                        src={DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length]}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:brightness-110"
                        referrerPolicy="no-referrer"
                      />

                      {/* Category Badge */}
                      {article.tags && article.tags[0] && (
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="bg-burnt-orange text-white px-3 py-1 font-mono text-[9px] tracking-widest uppercase">
                            {article.tags[0]}
                          </span>
                        </div>
                      )}

                      {/* Subtle Overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Title */}
                    <div className="px-1">
                      <h2 className="text-xl md:text-2xl font-display font-black leading-[1.1] uppercase tracking-tight group-hover:text-burnt-orange transition-colors duration-300">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="mt-3 text-white/50 text-sm font-light leading-relaxed line-clamp-3">
                        {getExcerpt(article.body)}
                      </p>

                      {/* Decorative underline */}
                      <motion.div
                        className="h-[1px] bg-burnt-orange mt-4 w-0 group-hover:w-full transition-all duration-500 origin-left"
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            {/* Row Divider */}
            <div className="mt-24 border-t border-white/10 w-full" />
          </div>
        </section>

        {/* Footer CTA */}
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
