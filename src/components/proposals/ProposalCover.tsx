import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal } from '../../types/proposal';

interface Props { proposal: Proposal; }

export default function ProposalCover({ proposal }: Props) {
  const year = new Date().getFullYear();

  return (
    <Slide index={0} id="cover" style={{ background: '#000000', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative vertical bars — right side */}
      <div style={{
        position: 'absolute',
        right: '72px',
        top: 0,
        bottom: 0,
        width: '3px',
        background: '#D98235',
        opacity: 0.8,
      }} />
      <div style={{
        position: 'absolute',
        right: '84px',
        top: 0,
        bottom: 0,
        width: '1px',
        background: '#D98235',
        opacity: 0.25,
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(217,130,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(217,130,53,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
        maxWidth: '900px',
        position: 'relative',
        zIndex: 1,
      }}>
        <StaggerContainer>
          {/* Tag */}
          <StaggerChild>
            <div style={{
              display: 'inline-block',
              background: '#D98235',
              color: '#000',
              fontSize: '10px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '5px 14px',
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: '32px',
            }}>
              Business Proposal
            </div>
          </StaggerChild>

          {/* Eyebrow */}
          <StaggerChild>
            <p style={{
              fontSize: '13px',
              color: '#555',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              Prepared for {proposal.client_company || proposal.client_name} · {year}
            </p>
          </StaggerChild>

          {/* Main headline */}
          <StaggerChild>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(56px, 8vw, 100px)',
              lineHeight: 0.95,
              color: '#ffffff',
              letterSpacing: '0.04em',
              marginBottom: '32px',
              textTransform: 'uppercase',
            }}>
              THE FUTURE<br />
              OF YOUR<br />
              <span style={{ color: '#D98235' }}>BRAND ONLINE</span>
            </h1>
          </StaggerChild>

          {/* Sub line */}
          <StaggerChild>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}>
              <div style={{ width: '40px', height: '1px', background: '#D98235' }} />
              <p style={{
                fontSize: '13px',
                color: '#666',
                letterSpacing: '0.12em',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                Custom web design & AI automation&nbsp;&nbsp;|&nbsp;&nbsp;Iconik Studios · Phoenix, AZ
              </p>
            </div>
          </StaggerChild>
        </StaggerContainer>
      </div>

      {/* Bottom metadata bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: '100px',
        height: '40px',
        borderTop: '1px solid #111',
        display: 'flex',
        alignItems: 'center',
        padding: '0 80px',
        gap: '32px',
      }}>
        {[
          proposal.client_name,
          proposal.client_industry || 'Business Services',
          `Prepared ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
        ].map((item, i) => (
          <span key={i} style={{
            fontSize: '10px',
            color: '#333',
            letterSpacing: '0.1em',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {item}
          </span>
        ))}
      </div>
    </Slide>
  );
}
