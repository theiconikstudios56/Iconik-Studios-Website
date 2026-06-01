import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1600",
];

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

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/articles?slug=eq.${slug}&published=eq.true&limit=1`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
          }
        );
        const data = await res.json();
        if (!data || data.length === 0) {
          setNotFound(true);
        } else {
          setArticle(data[0]);
        }
      } catch (err) {
        console.error('Failed to fetch article:', err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="font-mono text-xs tracking-widest text-white/40 uppercase">Loading...</p>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-xs tracking-widest text-white/40 uppercase">Article Not Found</p>
        <button onClick={() => navigate('/blog')} className="font-mono text-[10px] text-burnt-orange tracking-widest uppercase hover:underline">
          Back to Blog
        </button>
      </div>
    );
  }

  const heroImage = article.image_url || DEFAULT_IMAGES[article.id % DEFAULT_IMAGES.length];
  const siteUrl = 'https://iconik-studios-website.vercel.app';
  const canonicalUrl = `${siteUrl}/blog/${article.slug}`;

  return (
    <Layout
      title={`${article.title} | Iconik Studios`}
      description={article.meta_description}
      canonicalUrl={canonicalUrl}
      ogImage={heroImage}
    >
      <div className="bg-[#000000] min-h-screen text-white" data-bg="black">

        {/* Hero Image */}
        <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
          <img
            src={heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = DEFAULT_IMAGES[0];
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

          {/* Back button */}
          <button
            onClick={() => navigate('/blog')}
            className="absolute top-8 left-6 md:left-12 flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/70 hover:text-white transition-colors z-10 mt-16"
          >
            <ArrowLeft size={12} />
            Back to Blog
          </button>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto px-6 md:px-8 pb-32 -mt-24 relative z-10">

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map(tag => (
                <span key={tag} className="bg-burnt-orange text-white px-3 py-1 font-mono text-[9px] tracking-widest uppercase">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-4xl md:text-6xl font-display font-black uppercase leading-[1.05] tracking-tight mb-6"
          >
            {article.title}
          </motion.h1>

          {/* Date */}
          <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mb-16">
            {formatDate(article.created_at)}
          </p>

          <div className="border-t border-white/10 mb-16" />

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="article-body text-white/80 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          <div className="border-t border-white/10 mt-24 mb-16" />

          {/* Back link */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-burnt-orange transition-colors"
          >
            <ArrowLeft size={12} />
            Back to All Articles
          </button>
        </div>
      </div>

      <style>{`
        .article-body p { margin-bottom: 1.5rem; }
        .article-body h2 { font-size: 1.5rem; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; margin-top: 3rem; margin-bottom: 1rem; color: #ffffff; }
        .article-body ul { margin-bottom: 1.5rem; padding-left: 1.5rem; list-style: disc; }
        .article-body li { margin-bottom: 0.75rem; }
        .article-body strong { color: #ffffff; font-weight: 700; }
        .article-body a { color: var(--burnt-orange, #c84b11); text-decoration: underline; }
      `}</style>
    </Layout>
  );
}
