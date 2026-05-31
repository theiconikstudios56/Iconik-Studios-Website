import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

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
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

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
        setArticle(data[0] || null);
      } catch (err) {
        console.error('Failed to fetch article:', err);
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

  if (!article) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-xs tracking-widest text-white/40 uppercase mb-6">Article Not Found</p>
          <button onClick={() => navigate('/blog')} className="font-mono text-xs tracking-widest text-burnt-orange uppercase">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <Layout
      title={`${article.title} | Iconik Studios`}
      description={article.meta_description}
    >
      <div className="bg-[#000000] min-h-screen text-white font-sans">
        <div className="h-24 md:h-32" />

        <article className="max-w-3xl mx-auto px-6 py-16">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-white/40 uppercase hover:text-burnt-orange transition-colors mb-16"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </motion.button>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {article.tags.map((tag) => (
                <span key={tag} className="bg-burnt-orange text-white px-3 py-1 font-mono text-[9px] tracking-widest uppercase">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-display font-black leading-[1.05] uppercase tracking-tight mb-6"
          >
            {article.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 font-mono text-xs text-white/40 tracking-widest uppercase mb-16 border-b border-white/10 pb-8"
          >
            <span>Iconik Team</span>
            <span>—</span>
            <span>{formatDate(article.created_at)}</span>
          </motion.div>

          {/* Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none
              prose-h2:font-display prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tight prose-h2:text-white prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-p:text-white/70 prose-p:leading-relaxed prose-p:font-light
              prose-li:text-white/70 prose-li:font-light
              prose-strong:text-white prose-strong:font-bold
              prose-a:text-burnt-orange prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
        </article>
      </div>
    </Layout>
  );
}
