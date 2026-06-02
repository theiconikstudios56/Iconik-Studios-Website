import { useState } from 'react';
import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal } from '../../types/proposal';
import { CLIENT_DELIVERABLES } from '../../data/proposalDeliverables';
import { Check } from 'lucide-react';

interface Props {
  proposal: Proposal;
  isAdminPreview?: boolean;
}

export default function ProposalSolution({ isAdminPreview = false }: Props) {
  const [activeId, setActiveId] = useState(CLIENT_DELIVERABLES[0].id);
  const active = CLIENT_DELIVERABLES.find(d => d.id === activeId) || CLIENT_DELIVERABLES[0];

  return (
    <Slide index={4} id="problem" style={{ background: '#F8F9FA' }}>
      <div style={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}>
        {/* Left — module list */}
        <div style={{
          background: '#000000',
          borderRight: '1px solid #111',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 0',
          overflowY: 'auto',
        }}>
          <div style={{ padding: '0 28px 24px' }}>
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
              marginBottom: '16px',
            }}>
              04 — Tailored Solution
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '28px',
              letterSpacing: '0.06em',
              color: '#ffffff',
              lineHeight: 1.1,
            }}>
              WHAT WE'RE BUILDING
            </h2>
          </div>

          <div style={{ flex: 1 }}>
            {CLIENT_DELIVERABLES.map((item, i) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  style={{
                    width: '100%',
                    background: isActive ? '#0d0d0d' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? '3px solid #D98235' : '3px solid transparent',
                    padding: '16px 28px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'block',
                  }}
                >
                  <div style={{
                    fontSize: '9px',
                    color: isActive ? '#D98235' : '#444',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: '4px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: isActive ? '#ffffff' : '#666',
                    fontWeight: isActive ? 600 : 400,
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  }}>
                    {item.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — detail panel */}
        <div style={{
          padding: '56px 64px',
          overflowY: 'auto',
          background: '#F8F9FA',
        }}>
          <StaggerContainer key={activeId}>
            <StaggerChild>
              <p style={{
                fontSize: '11px',
                color: '#D98235',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '8px',
                fontWeight: 600,
              }}>
                {active.tagline}
              </p>
            </StaggerChild>

            <StaggerChild>
              <h3 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '48px',
                letterSpacing: '0.06em',
                color: '#000000',
                marginBottom: '20px',
                lineHeight: 1,
              }}>
                {active.label.toUpperCase()}
              </h3>
            </StaggerChild>

            <StaggerChild>
              <p style={{
                fontSize: '14px',
                color: '#555',
                lineHeight: 1.75,
                marginBottom: '36px',
                maxWidth: '560px',
              }}>
                {active.description}
              </p>
            </StaggerChild>

            {/* Features */}
            <StaggerChild>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '32px',
              }}>
                {active.features.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    background: '#fff',
                    border: '1px solid #e8e8e8',
                    padding: '12px 16px',
                  }}>
                    <Check size={14} color="#D98235" style={{ flexShrink: 0, marginTop: '1px' }} strokeWidth={2.5} />
                    <span style={{ fontSize: '12px', color: '#333', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
            </StaggerChild>

            {/* Tech stack — admin preview only (Change 4) */}
            {isAdminPreview && (
              <StaggerChild>
                <div>
                  <div style={{
                    fontSize: '9px',
                    color: '#999',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: '10px',
                  }}>
                    Tech Stack
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {active.techStack.map((t, i) => (
                      <span key={i} style={{
                        background: '#111',
                        color: '#888',
                        fontSize: '10px',
                        padding: '3px 10px',
                        letterSpacing: '0.08em',
                        fontFamily: "'JetBrains Mono', monospace",
                        border: '1px solid #222',
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerChild>
            )}
          </StaggerContainer>
        </div>
      </div>
    </Slide>
  );
}
