import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal } from '../../types/proposal';

interface Props { proposal: Proposal; }

const STATS = [
  {
    num: '14+',
    label: 'Sites Launched',
    sub: 'No templates. Ever.',
  },
  {
    num: '100%',
    label: 'Custom Code',
    sub: 'Not a single template shipped.',
  },
  {
    num: '<6 WKS',
    label: 'Avg. Time to Launch',
    sub: 'From signed proposal to live site.',
  },
];

export default function ProposalProof({ proposal: _ }: Props) {
  return (
    <Slide index={6} id="proof" style={{ background: '#000000' }}>
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 80px',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Subtle accent lines */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '80px',
          right: '80px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #D98235, transparent)',
          opacity: 0.3,
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '80px',
          right: '80px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #D98235, transparent)',
          opacity: 0.3,
        }} />

        <StaggerContainer style={{ width: '100%' }}>
          {/* Section tag */}
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
              marginBottom: '40px',
            }}>
              06 — Proof & Results
            </div>
          </StaggerChild>

          {/* Headline */}
          <StaggerChild>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 5vw, 64px)',
              letterSpacing: '0.06em',
              color: '#ffffff',
              marginBottom: '64px',
            }}>
              BUILT DIFFERENT. PROVEN RESULTS.
            </h2>
          </StaggerChild>

          {/* Stats grid */}
          <StaggerChild>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
              marginBottom: '56px',
            }}>
              {STATS.map((stat, i) => (
                <div key={i} style={{
                  background: '#0a0a0a',
                  border: '1px solid #111',
                  padding: '40px 32px',
                }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 'clamp(48px, 6vw, 80px)',
                    color: '#D98235',
                    lineHeight: 1,
                    letterSpacing: '0.04em',
                    marginBottom: '12px',
                  }}>
                    {stat.num}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: '#ffffff',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#444',
                    lineHeight: 1.5,
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </StaggerChild>

          {/* Proof quote */}
          <StaggerChild>
            <p style={{
              fontSize: '14px',
              color: '#555',
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            }}>
              "Every site Iconik Studios has ever launched was hand-coded from scratch, delivered on time, and built to convert."
            </p>
          </StaggerChild>
        </StaggerContainer>
      </div>
    </Slide>
  );
}
