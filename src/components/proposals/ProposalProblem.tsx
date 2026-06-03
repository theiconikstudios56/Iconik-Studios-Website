import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal } from '../../types/proposal';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface Props { proposal: Proposal; }

export default function ProposalProblem({ proposal }: Props) {
  const { isMobile } = useBreakpoint();
  const [para1, para2] = (proposal.problem_body || '').split(/\n\n/);

  const symptoms = [
    proposal.problem_symptom_1,
    proposal.problem_symptom_2,
    proposal.problem_symptom_3,
    proposal.problem_symptom_4,
  ].filter(Boolean);

  return (
    <Slide index={2} id="reference" style={{ background: '#ffffff', overflowY: 'auto' }}>
      <div style={{
        minHeight: '100%',
        padding: isMobile ? '28px 20px' : '56px 80px',
        color: '#000000',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}>
        <StaggerContainer>
          {/* Tag */}
          <StaggerChild>
            <div style={{
              display: 'inline-block',
              background: '#D98235',
              color: '#fff',
              fontSize: '9px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '24px',
            }}>
              02 — The Problem
            </div>
          </StaggerChild>

          {/* Dynamic headline */}
          <StaggerChild>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 0.95,
              color: '#000000',
              letterSpacing: '0.04em',
              marginBottom: '32px',
            }}>
              {proposal.problem_headline || 'YOUR BUSINESS IS LOSING LEADS'}
            </h2>
          </StaggerChild>

          {/* Body paragraphs */}
          <StaggerChild>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '32px',
              marginBottom: '40px',
            }}>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#333' }}>{para1}</p>
              <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#555' }}>{para2}</p>
            </div>
          </StaggerChild>

          {/* Revenue Leakage Diagram — evergreen / hardcoded */}
          <StaggerChild>
            <div style={{
              background: '#f8f8f8',
              border: '1px solid #e8e8e8',
              padding: '28px 32px',
              marginBottom: '40px',
              borderLeft: '4px solid #D98235',
            }}>
              <div style={{
                fontSize: '10px',
                color: '#D98235',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '16px',
                fontWeight: 600,
              }}>
                Revenue Leakage vs. Captured Inquiries
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr', gap: '16px', alignItems: 'center' }}>
                {/* Template approach */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#cc4444', marginBottom: '8px' }}>
                    TEMPLATE SITE
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#888' }}>
                    {['Visitor lands', 'No clear CTA', 'Slow / generic', 'Bounces away', '→ Your competitor'].map(s => (
                      <div key={s} style={{ background: '#fff0f0', padding: '4px 8px', border: '1px solid #fdd' }}>{s}</div>
                    ))}
                  </div>
                </div>
                {/* VS */}
                <div style={{ textAlign: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', color: '#ccc' }}>
                  VS
                </div>
                {/* Iconik approach */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#D98235', marginBottom: '8px' }}>
                    ICONIK BUILD
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#555' }}>
                    {['Visitor lands', 'Clear value + CTA', 'Lead captured', 'Auto follow-up in 60s', '→ Booked appointment'].map(s => (
                      <div key={s} style={{ background: '#fff8f0', padding: '4px 8px', border: '1px solid #D9823544' }}>{s}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </StaggerChild>

          {/* Symptom grid */}
          {symptoms.length > 0 && (
            <StaggerChild>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '2px',
                marginBottom: '32px',
              }}>
                {symptoms.map((symptom, i) => (
                  <div key={i} style={{
                    background: '#f8f8f8',
                    border: '1px solid #eee',
                    padding: '20px 24px',
                  }}>
                    <div style={{
                      fontSize: '9px',
                      color: '#D98235',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: '8px',
                      fontWeight: 600,
                    }}>
                      Symptom {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: '13px', color: '#333', lineHeight: 1.5 }}>
                      {symptom}
                    </div>
                  </div>
                ))}
              </div>
            </StaggerChild>
          )}

          {/* Pull quote */}
          {proposal.problem_callout && (
            <StaggerChild>
              <div style={{
                borderLeft: '4px solid #D98235',
                background: '#f5f5f5',
                padding: '20px 28px',
              }}>
                <p style={{
                  fontSize: '16px',
                  color: '#222',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                }}>
                  {proposal.problem_callout}
                </p>
              </div>
            </StaggerChild>
          )}
        </StaggerContainer>
      </div>
    </Slide>
  );
}
