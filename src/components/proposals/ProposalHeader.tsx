import { Proposal } from '../../types/proposal';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface ProposalHeaderProps {
  proposal: Proposal;
}

export default function ProposalHeader({ proposal }: ProposalHeaderProps) {
  const { isMobile } = useBreakpoint();
  return (
    <div style={{
      height: '56px',
      background: 'rgba(0,0,0,0.95)',
      borderBottom: '1px solid #111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      flexShrink: 0,
      backdropFilter: 'blur(8px)',
      zIndex: 50,
    }}>
      {/* Left — Iconik brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '3px', height: '18px', background: '#D98235' }} />
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '16px',
          letterSpacing: '0.14em',
          color: '#ffffff',
        }}>
          ICONIK STUDIOS
        </span>
        <span style={{ color: '#222', margin: '0 4px' }}>·</span>
        <span style={{
          fontSize: '10px',
          color: '#444',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          Business Proposal
        </span>
      </div>

      {/* Right — client info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: '10px',
          color: '#555',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          CLIENT:&nbsp;
          <span style={{ color: '#D98235' }}>
            {proposal.client_name}
          </span>
          {proposal.client_industry && (
            <span style={{ color: '#444' }}>&nbsp;·&nbsp;{proposal.client_industry}</span>
          )}
        </span>
        <div style={{
          background: '#D98235',
          color: '#000',
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '3px 10px',
          fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          CONFIDENTIAL
        </div>
      </div>
    </div>
  );
}
