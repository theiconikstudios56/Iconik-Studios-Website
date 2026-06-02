import { useState } from 'react';

const SECTIONS = [
  { id: 'cover', label: '00 / Start' },
  { id: 'manifesto', label: '01 / Exec Summary' },
  { id: 'reference', label: '02 / The Problem' },
  { id: 'exec', label: '03 / Outcome Vision' },
  { id: 'problem', label: '04 / Tailored Solution' },
  { id: 'scope', label: '05 / Scope of Work' },
  { id: 'proof', label: '06 / Proof & Results' },
  { id: 'pricing', label: '07 / Investment' },
  { id: 'sign', label: '08 / Approve Proposal' },
  { id: 'end', label: "09 / Let's Build" },
];

interface FloatingNavDotsProps {
  activeSection: number;
  onScrollTo: (index: number) => void;
}

export default function FloatingNavDots({ activeSection, onScrollTo }: FloatingNavDotsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{
      position: 'fixed',
      right: '24px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      alignItems: 'flex-end',
    }}>
      {SECTIONS.map((section, i) => {
        const isActive = activeSection === i;
        const isHovered = hoveredIndex === i;

        return (
          <div
            key={section.id}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            onClick={() => onScrollTo(i)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Label (shown on hover) */}
            <span style={{
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#D98235',
              fontFamily: "'JetBrains Mono', monospace",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateX(0)' : 'translateX(6px)',
              transition: 'opacity 0.2s, transform 0.2s',
              whiteSpace: 'nowrap',
            }}>
              {section.label}
            </span>

            {/* Dot */}
            <div style={{
              width: isActive ? '8px' : '5px',
              height: isActive ? '8px' : '5px',
              borderRadius: '50%',
              background: isActive ? '#D98235' : (isHovered ? '#D98235' : '#333'),
              boxShadow: isActive ? '0 0 8px rgba(217,130,53,0.8)' : 'none',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }} />
          </div>
        );
      })}
    </div>
  );
}
