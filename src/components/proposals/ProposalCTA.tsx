import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal } from '../../types/proposal';

interface Props { proposal: Proposal; }

const NEXT_STEPS = [
  {
    num: '01',
    title: 'Reply to this proposal',
    desc: 'Let us know which tier fits and any questions you have.',
  },
  {
    num: '02',
    title: 'Kickoff call',
    desc: '30 minutes to align on goals and lock in the timeline.',
  },
  {
    num: '03',
    title: 'We get to work',
    desc: 'Discovery starts within 48 hours of agreement.',
  },
];

export default function ProposalCTA({ proposal }: Props) {
  return (
    <Slide
      index={8}
      id="sign"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0d0a07 50%, #120f08 100%)',
      }}
    >
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 80px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}>
        <StaggerContainer>
          {/* Badge — Change 7 */}
          <StaggerChild>
            <div style={{
              display: 'inline-block',
              background: 'rgba(217,130,53,0.12)',
              border: '1px solid rgba(217,130,53,0.3)',
              color: '#D98235',
              fontSize: '9px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '4px 12px',
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '28px',
            }}>
              08 — Proposal Approval
            </div>
          </StaggerChild>

          {/* Headline — Change 7 */}
          <StaggerChild>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(56px, 7vw, 96px)',
              lineHeight: 0.95,
              color: '#ffffff',
              letterSpacing: '0.04em',
              marginBottom: '20px',
            }}>
              {proposal.cta_headline || 'LET\'S MAKE IT OFFICIAL.'}
            </h2>
          </StaggerChild>

          {/* Sub copy — Change 7 */}
          <StaggerChild>
            <p style={{
              fontSize: '15px',
              color: '#888',
              lineHeight: 1.7,
              maxWidth: '560px',
              marginBottom: '48px',
            }}>
              You've seen the plan. You know what we're building. Signing below kicks off Week 1 — we'll have your discovery prep ready within 48 hours.
            </p>
          </StaggerChild>

          {/* CTA button */}
          <StaggerChild>
            <div style={{ marginBottom: '56px' }}>
              <a
                href="https://www.theiconikstudios.com/contact"
                style={{
                  display: 'inline-block',
                  background: '#D98235',
                  color: '#000000',
                  padding: '18px 48px',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.filter = 'brightness(1.08)';
                  (e.target as HTMLElement).style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.filter = '';
                  (e.target as HTMLElement).style.transform = '';
                }}
              >
                Sign & Approve Proposal
              </a>
            </div>
          </StaggerChild>

          {/* Next steps */}
          <StaggerChild>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '40px',
            }}>
              {NEXT_STEPS.map((step) => (
                <div key={step.num}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: '#D98235',
                    letterSpacing: '0.12em',
                    marginBottom: '6px',
                  }}>
                    {step.num}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#ccc',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </StaggerChild>

          {/* Contact */}
          <StaggerChild>
            <div style={{
              borderTop: '1px solid #1a1a1a',
              paddingTop: '24px',
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
            }}>
              {['ricky@theiconikstudios.com', 'theiconikstudios.com', 'Phoenix, AZ'].map((item, i) => (
                <span key={i} style={{
                  fontSize: '11px',
                  color: '#444',
                  letterSpacing: '0.08em',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {item}
                </span>
              ))}
            </div>
          </StaggerChild>
        </StaggerContainer>
      </div>
    </Slide>
  );
}
