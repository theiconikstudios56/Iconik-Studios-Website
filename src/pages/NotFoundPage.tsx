import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

/** Any address the site doesn't have: a way back instead of a blank screen. */
export default function NotFoundPage() {
  return (
    <Layout title="Page not found | Iconik Studios" description="This page doesn't exist. Head back to the Iconik Studios homepage.">
      <section className="bg-ink text-paper min-h-[100svh] flex items-center px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-accent block">Error 404</span>
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tighter leading-[0.95]">
            This page wandered off
          </h1>
          <p className="text-sm md:text-base font-mono text-tan leading-relaxed">
            The link may be old or mistyped. Everything else is right where you left it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <Link
              to="/"
              className="px-10 py-5 bg-paper text-ink rounded-full font-display text-lg uppercase hover:bg-accent transition-all duration-300"
            >
              Back to the homepage
            </Link>
            <Link to="/contact" className="text-xs font-display uppercase tracking-widest border-b border-transparent hover:border-paper transition-all py-2">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
