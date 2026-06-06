import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal, ProposalScopePhase } from '../../types/proposal';

interface Props { proposal: Proposal; }

const DEFAULT_PHASES: ProposalScopePhase[] = [
  {
    number: '01',
    name: 'Discovery & Strategy',
    description: 'We map your goals, audience, and competitive landscape. Full sitemap and technical spec finalized before design begins.',
    note: 'What we need from you: brand assets, service list, and 60 minutes for kickoff call.',
    pills: ['Brand audit', 'Sitemap', 'Tech spec', 'Kickoff call'],
  },
  {
    number: '02',
    name: 'Design & Prototype',
    description: 'Full mockups built in your brand identity. Two rounds of review and approval before a single line of code is written.',
    note: 'What we need from you: feedback within 48 hours to stay on schedule.',
    pills: ['Figma mockups', 'Brand alignment', 'Two review rounds', 'Client sign-off'],
  },
  {
    number: '03',
    name: 'Build & Launch',
    description: 'Full development, QA testing, and deployment. Mobile-first and performance-optimized with CRM integration live on day one.',
    note: 'What we need from you: domain access and hosting credentials.',
    pills: ['Development', 'CRM integration', 'QA testing', 'Vercel deploy', 'Handoff walkthrough'],
  },
];

export default function ProposalScope({ proposal }: Props) {
  const phases = (proposal.scope_phases?.length ? proposal.scope_phases : DEFAULT_PHASES) as ProposalScopePhase[];

  return (
    <Slide index={5} id="scope" style={{ background: '#000000', overflowY: 'auto' }}>
      <div style={{
        minHeight: '100%',
        padding: '56px 80px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
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
              marginBottom: '24px',
            }}>
              05 — Scope of Work
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
              THE PLAN, PHASE BY PHASE
            </h2>
          </StaggerChild>

          {/* Phases */}
          {phases.map((phase, i) => (
            <StaggerChild key={i}>
              <div style={{ marginBottom: '2px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '32px',
                  background: '#0a0a0a',
                  border: '1px solid #111',
                  padding: '32px',
                  alignItems: 'start',
                }}>
                  {/* Phase number */}
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '56px',
                    color: '#D98235',
                    lineHeight: 1,
                    letterSpacing: '0.04em',
                    opacity: 0.8,
                  }}>
                    {phase.number}
                  </div>

                  {/* Phase content */}
                  <div>
                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '24px',
                      letterSpacing: '0.08em',
                      color: '#ffffff',
                      marginBottom: '10px',
                    }}>
                      {phase.name}
                    </div>
                    <p style={{
                      fontSize: '13px',
                      color: '#777',
                      lineHeight: 1.65,
                      marginBottom: '12px',
                    }}>
                      {phase.description}
                    </p>
                    {phase.note && (
                      <p style={{
                        fontSize: '11px',
                        color: '#444',
                        fontStyle: 'italic',
                        marginBottom: '16px',
                      }}>
                        {phase.note}
                      </p>
                    )}
                    {phase.pills?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {phase.pills.map((pill, j) => (
                          <span key={j} style={{
                            background: '#111',
                            color: '#888',
                            fontSize: '10px',
                            padding: '4px 12px',
                            letterSpacing: '0.08em',
                            fontFamily: "'JetBrains Mono', monospace",
                            border: '1px solid #1a1a1a',
                          }}>
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </StaggerChild>
          ))}

          {/* Exclusions */}
          <StaggerChild>
            <div style={{
              borderLeft: '4px solid #D98235',
              background: '#0a0a0a',
              padding: '20px 24px',
              marginTop: '24px',
            }}>
              <div style={{
                fontSize: '10px',
                color: '#D98235',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: '8px',
                fontWeight: 600,
              }}>
                What's Not Included
              </div>
              <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.6 }}>
                Copywriting, photography/video production, ongoing maintenance beyond the support window, third-party licensing fees (hosting, software subscriptions), paid advertising management.
              </p>
            </div>
          </StaggerChild>
        </StaggerContainer>
      </div>
    </Slide>
  );
}
