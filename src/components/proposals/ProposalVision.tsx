import { TrendingUp, Clock, Sparkles } from 'lucide-react';
import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal } from '../../types/proposal';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface Props { proposal: Proposal; }

export default function ProposalVision({ proposal }: Props) {
  const { isMobile, isTablet } = useBreakpoint();
  const cards = [
    {
      badge: '01 / REVENUE',
      Icon: TrendingUp,
      headline: `${proposal.vision_stat_1_num || '3X'} YOUR LEAD FLOW`,
      body: proposal.vision_stat_1_label || 'More qualified leads entering your pipeline within 90 days of launch.',
    },
    {
      badge: '02 / OPERATIONS',
      Icon: Clock,
      headline: 'RECLAIM YOUR TIME',
      body: proposal.vision_stat_2_label || 'Saved per week from automated follow-up and lead routing — so you focus on the work, not the admin.',
    },
    {
      badge: '03 / AUTHORITY',
      Icon: Sparkles,
      headline: "A PRESENCE THAT MATCHES YOUR QUALITY",
      body: "Zero templates, zero compromises. A digital presence built to match the standard of what you actually deliver — and convert the clients who are already looking for you.",
    },
  ];

  return (
    <Slide index={3} id="exec" style={{ background: '#0a0a0d' }}>
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '28px 20px' : isTablet ? '40px 48px' : '56px 80px',
        overflowY: isMobile ? 'auto' : undefined,
      }}>
        <StaggerContainer>
          {/* Tag */}
          <StaggerChild>
            <div style={{
              display: 'inline-block',
              background: '#D98235',
              color: '#000',
              fontSize: '9px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '28px',
            }}>
              03 — The Vision
            </div>
          </StaggerChild>

          {/* Headline */}
          <StaggerChild>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              letterSpacing: '0.06em',
              color: '#ffffff',
              marginBottom: '48px',
            }}>
              WHERE YOU'LL BE IN 90 DAYS
            </h2>
          </StaggerChild>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: '2px',
          }}>
            {cards.map((card, i) => (
              <StaggerChild key={i}>
                <div style={{
                  background: '#0c0c10',
                  border: '1px solid #151518',
                  padding: '32px 28px',
                  height: '100%',
                  boxSizing: 'border-box',
                }}>
                  <div style={{
                    fontSize: '9px',
                    color: '#D98235',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: '20px',
                    fontWeight: 600,
                  }}>
                    {card.badge}
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <card.Icon size={20} color="#D98235" strokeWidth={1.5} />
                  </div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '22px',
                    letterSpacing: '0.06em',
                    color: '#ffffff',
                    lineHeight: 1.1,
                    marginBottom: '14px',
                  }}>
                    {card.headline}
                  </div>
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: 1.65,
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  }}>
                    {card.body}
                  </p>
                </div>
              </StaggerChild>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </Slide>
  );
}
