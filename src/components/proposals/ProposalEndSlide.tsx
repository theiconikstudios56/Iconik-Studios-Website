import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal } from '../../types/proposal';

interface Props {
  proposal: Proposal;
  onScrollToSign?: () => void;
}

export default function ProposalEndSlide({ onScrollToSign }: Props) {
  return (
    <Slide index={9} id="end" style={{ background: '#000000' }}>
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 80px',
        textAlign: 'center',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}>
        {/* Decorative corner marks */}
        <div style={{ position: 'absolute', top: '40px', left: '60px', width: '24px', height: '24px', borderTop: '2px solid #D98235', borderLeft: '2px solid #D98235', opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: '40px', right: '60px', width: '24px', height: '24px', borderTop: '2px solid #D98235', borderRight: '2px solid #D98235', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: '40px', left: '60px', width: '24px', height: '24px', borderBottom: '2px solid #D98235', borderLeft: '2px solid #D98235', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: '40px', right: '60px', width: '24px', height: '24px', borderBottom: '2px solid #D98235', borderRight: '2px solid #D98235', opacity: 0.4 }} />

        <StaggerContainer style={{ maxWidth: '640px' }}>
          <StaggerChild>
            <div style={{
              fontFamily: "'Permanent Marker', cursive",
              fontSize: '14px',
              color: '#D98235',
              letterSpacing: '0.04em',
              marginBottom: '20px',
              opacity: 0.8,
            }}>
              Iconik Studios
            </div>
          </StaggerChild>

          <StaggerChild>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(48px, 7vw, 96px)',
              lineHeight: 0.95,
              color: '#ffffff',
              letterSpacing: '0.04em',
              marginBottom: '24px',
            }}>
              LET'S BUILD SOMETHING <span style={{ color: '#D98235' }}>ICONIK</span>
            </h2>
          </StaggerChild>

          <StaggerChild>
            <p style={{
              fontSize: '14px',
              color: '#555',
              lineHeight: 1.7,
              marginBottom: '48px',
            }}>
              You've seen what we build. You know how we think. The only thing left is the decision.
            </p>
          </StaggerChild>

          {/* Single CTA button — Change 8 */}
          <StaggerChild>
            <button
              onClick={onScrollToSign}
              style={{
                padding: '18px 56px',
                background: '#D98235',
                color: '#000',
                border: 'none',
                fontSize: '11px',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(217,130,53,0.25)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.filter = 'brightness(1.05)';
                (e.target as HTMLElement).style.transform = 'scale(1.03)';
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.filter = '';
                (e.target as HTMLElement).style.transform = '';
              }}
            >
              APPROVE & GET STARTED
            </button>
          </StaggerChild>

          <StaggerChild>
            <p style={{
              marginTop: '32px',
              fontSize: '11px',
              color: '#333',
              letterSpacing: '0.08em',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              ricky@iconikstudios.com · iconikstudios.com · Phoenix, AZ
            </p>
          </StaggerChild>
        </StaggerContainer>
      </div>
    </Slide>
  );
}
