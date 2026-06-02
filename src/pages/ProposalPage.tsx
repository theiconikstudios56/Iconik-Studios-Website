import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Proposal } from '../types/proposal';
import ProposalHeader from '../components/proposals/ProposalHeader';
import FloatingNavDots from '../components/proposals/FloatingNavDots';
import ProposalCover from '../components/proposals/ProposalCover';
import ProposalExecSummary from '../components/proposals/ProposalExecSummary';
import ProposalProblem from '../components/proposals/ProposalProblem';
import ProposalVision from '../components/proposals/ProposalVision';
import ProposalSolution from '../components/proposals/ProposalSolution';
import ProposalScope from '../components/proposals/ProposalScope';
import ProposalProof from '../components/proposals/ProposalProof';
import ProposalPricing from '../components/proposals/ProposalPricing';
import ProposalCTA from '../components/proposals/ProposalCTA';
import ProposalEndSlide from '../components/proposals/ProposalEndSlide';

function LoadingState() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#444',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '12px',
      letterSpacing: '0.12em',
    }}>
      Loading proposal...
    </div>
  );
}

function NotFoundState() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      textAlign: 'center',
      padding: '40px',
    }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          <div style={{ width: '3px', height: '20px', background: '#D98235' }} />
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.12em' }}>
            ICONIK STUDIOS
          </span>
        </div>
      </div>
      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: '56px',
        letterSpacing: '0.06em',
        color: '#ffffff',
        marginBottom: '16px',
      }}>
        PROPOSAL NOT FOUND
      </h1>
      <p style={{ color: '#555', fontSize: '14px', maxWidth: '400px', lineHeight: 1.7 }}>
        This proposal doesn't exist or has been removed. Reach out to confirm you have the correct link.
      </p>
      <p style={{
        marginTop: '32px',
        color: '#333',
        fontSize: '12px',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        ricky@theiconikstudios.com · theiconikstudios.com
      </p>
    </div>
  );
}

function ExpiredState() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      textAlign: 'center',
      padding: '40px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '48px' }}>
        <div style={{ width: '3px', height: '20px', background: '#D98235' }} />
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.12em' }}>
          ICONIK STUDIOS
        </span>
      </div>

      <div style={{
        display: 'inline-block',
        background: '#1a0a0a',
        border: '1px solid #7f1d1d',
        color: '#f87171',
        fontSize: '9px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        padding: '4px 12px',
        fontFamily: "'JetBrains Mono', monospace",
        marginBottom: '24px',
      }}>
        Proposal Expired
      </div>

      <h1 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(36px, 5vw, 64px)',
        letterSpacing: '0.06em',
        color: '#ffffff',
        marginBottom: '20px',
        lineHeight: 1,
      }}>
        THIS PROPOSAL HAS EXPIRED
      </h1>

      <p style={{
        color: '#666',
        fontSize: '14px',
        maxWidth: '480px',
        lineHeight: 1.7,
        marginBottom: '40px',
      }}>
        Proposals are valid for 30 days from the date they are sent. To request an updated proposal, reach out directly:
      </p>

      <div style={{
        background: '#0a0a0a',
        border: '1px solid #111',
        padding: '24px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'center',
      }}>
        <a
          href="mailto:ricky@theiconikstudios.com"
          style={{
            color: '#D98235',
            fontSize: '14px',
            textDecoration: 'none',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          ricky@theiconikstudios.com
        </a>
        <span style={{ color: '#333', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>
          theiconikstudios.com
        </span>
      </div>
    </div>
  );
}

export default function ProposalPage() {
  const { slug } = useParams<{ slug: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [expired, setExpired] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) fetchProposal(slug);
  }, [slug]);

  async function fetchProposal(slug: string) {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      setNotFound(true);
    } else if (data.status !== 'published') {
      setNotFound(true);
    } else if (data.expires_at && new Date(data.expires_at) < new Date()) {
      setExpired(true);
    } else {
      setProposal(data as Proposal);
      document.title = `Proposal for ${data.client_company || data.client_name} — Iconik Studios`;
    }
    setLoading(false);
  }

  const scrollTo = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const slides = Array.from(container.querySelectorAll('[data-slide]')) as HTMLElement[];
    const target = slides.find(s => Number(s.getAttribute('data-slide')) === index);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !proposal) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).getAttribute('data-slide'));
            if (!isNaN(idx)) setActiveSection(idx);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    const slides = container.querySelectorAll('[data-slide]');
    slides.forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, [proposal]);

  if (loading) return <LoadingState />;
  if (notFound) return <NotFoundState />;
  if (expired) return <ExpiredState />;
  if (!proposal) return <NotFoundState />;

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: '#050505',
      color: '#F5F5F5',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Fixed header */}
      <ProposalHeader proposal={proposal} />

      {/* Floating nav dots */}
      <FloatingNavDots activeSection={activeSection} onScrollTo={scrollTo} />

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          position: 'relative',
        }}
        className="proposal-scroll"
      >
        <ProposalCover proposal={proposal} />
        <ProposalExecSummary proposal={proposal} />
        <ProposalProblem proposal={proposal} />
        <ProposalVision proposal={proposal} />
        <ProposalSolution proposal={proposal} isAdminPreview={false} />
        <ProposalScope proposal={proposal} />
        <ProposalProof proposal={proposal} />
        <ProposalPricing proposal={proposal} />
        <ProposalCTA proposal={proposal} />
        <ProposalEndSlide proposal={proposal} onScrollToSign={() => scrollTo(8)} />
      </div>
    </div>
  );
}
