import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal } from '../../types/proposal';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface Props { proposal: Proposal; }

const CARDS = [
  {
    badge: '01 / RIGHT NOW',
    title: 'WHERE YOU ARE NOW',
    field: 'exec_situation' as keyof Proposal,
  },
  {
    badge: '02 / THE PLAN',
    title: 'WHAT WE\'RE BUILDING',
    field: 'exec_proposal' as keyof Proposal,
  },
  {
    badge: '03 / 90 DAYS OUT',
    title: 'WHERE YOU\'LL BE IN 90 DAYS',
    field: 'exec_outcome' as keyof Proposal,
  },
];

export default function ProposalExecSummary({ proposal }: Props) {
  const { isMobile } = useBreakpoint();
  return (
    <Slide index={1} id="manifesto" style={{ background: '#0c0c0d' }}>
      <div style={{
        height: '100%',
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : undefined,
        gridTemplateColumns: isMobile ? undefined : '1fr 2fr',
        gap: 0,
        overflowY: isMobile ? 'auto' : undefined,
      }}>
        {/* Left column */}
        <div style={{
          borderRight: isMobile ? 'none' : '1px solid #111',
          borderBottom: isMobile ? '1px solid #111' : 'none',
          padding: isMobile ? '28px 20px' : '64px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <StaggerContainer>
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
                01 — Executive Summary
              </div>
            </StaggerChild>
            <StaggerChild>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 4vw, 56px)',
                lineHeight: 0.95,
                color: '#ffffff',
                letterSpacing: '0.04em',
                marginBottom: '24px',
              }}>
                THE SHORT VERSION.<br />READ THIS FIRST.
              </h2>
            </StaggerChild>
            <StaggerChild>
              <div style={{ width: '40px', height: '3px', background: '#D98235' }} />
            </StaggerChild>
          </StaggerContainer>
        </div>

        {/* Right column — three cards */}
        <div style={{
          padding: isMobile ? '28px 20px' : '48px 56px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '2px',
          overflowY: 'auto',
        }}>
          <StaggerContainer>
            {CARDS.map((card) => (
              <StaggerChild key={card.badge}>
                <div style={{
                  background: '#0a0a0d',
                  border: '1px solid #151515',
                  padding: '24px 28px',
                  marginBottom: '2px',
                }}>
                  <div style={{
                    fontSize: '9px',
                    color: '#D98235',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: '10px',
                    fontWeight: 600,
                  }}>
                    {card.badge}
                  </div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '20px',
                    letterSpacing: '0.08em',
                    color: '#ffffff',
                    marginBottom: '10px',
                  }}>
                    {card.title}
                  </div>
                  <p style={{
                    color: '#777',
                    fontSize: '13px',
                    lineHeight: 1.65,
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  }}>
                    {String(proposal[card.field] || '')}
                  </p>
                </div>
              </StaggerChild>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </Slide>
  );
}
