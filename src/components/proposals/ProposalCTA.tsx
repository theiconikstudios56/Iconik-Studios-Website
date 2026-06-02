import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Slide } from './Slide';
import { Proposal } from '../../types/proposal';

interface Props { proposal: Proposal; }

type ApprovalState = 'idle' | 'form' | 'loading' | 'success';

const TIER_DISPLAY: Record<string, { label: string; price: string }> = {
  starter: { label: 'Starter', price: '$1,500' },
  growth:  { label: 'Growth',  price: '$3,500' },
  scale:   { label: 'Scale',   price: '$7,500' },
};

const NEXT_STEPS = [
  { num: '01', title: 'Reply to this proposal', desc: 'Let us know which tier fits and any questions you have.' },
  { num: '02', title: 'Kickoff call',            desc: '30 minutes to align on goals and lock in the timeline.' },
  { num: '03', title: 'We get to work',          desc: 'Discovery starts within 48 hours of agreement.' },
];

function fadeIn(show: boolean, delay = 0): React.CSSProperties {
  return {
    opacity: show ? 1 : 0,
    transform: show ? 'none' : 'translateY(16px)',
    transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  };
}

export default function ProposalCTA({ proposal }: Props) {
  const alreadyApproved = !!proposal.approved_at;
  const [approvalState, setApprovalState] = useState<ApprovalState>(alreadyApproved ? 'success' : 'idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  // Slide-level visibility — driven by our own IntersectionObserver on the container.
  // Avoids Framer Motion's whileInView which clips against overflow:hidden ancestors
  // and causes elements at the bottom of centered content to stay invisible.
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideVisible, setSlideVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSlideVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Success state gets its own fade so it animates in cleanly after approval
  const [successVisible, setSuccessVisible] = useState(alreadyApproved);
  useEffect(() => {
    if (approvalState === 'success') {
      const t = setTimeout(() => setSuccessVisible(true), 60);
      return () => clearTimeout(t);
    }
  }, [approvalState]);

  const tier = TIER_DISPLAY[(proposal.selected_tier || 'growth').toLowerCase()] ?? TIER_DISPLAY.growth;

  async function handleApprove() {
    if (!name.trim() || !email.trim() || !agreed) return;
    setApprovalState('loading');
    setError('');
    try {
      const res = await fetch('/api/approve-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: proposal.slug, approverName: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setApprovalState('success');

      // Fire GHL update — silent fail, never blocks the confirmation screen
      fetch('/api/proposal-approved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          full_name: name.trim(),
          package: proposal.selected_tier,
          proposal_id: proposal.id,
        }),
      }).catch(err => console.error('GHL proposal-approved call failed:', err));
    } catch (err: any) {
      setError(err.message);
      setApprovalState('form');
    }
  }

  return (
    <Slide
      index={8}
      id="sign"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0d0a07 50%, #120f08 100%)' }}
    >
      <div
        ref={containerRef}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 80px',
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          overflowY: 'auto',
        }}
      >

        {/* ── SUCCESS STATE ─────────────────────────────── */}
        {approvalState === 'success' && (
          <div>
            <div style={fadeIn(successVisible, 0)}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(217,130,53,0.12)',
                border: '2px solid #D98235',
                marginBottom: '32px',
              }}>
                <span style={{ fontSize: '24px', color: '#D98235' }}>✓</span>
              </div>
            </div>

            <div style={fadeIn(successVisible, 0.1)}>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(56px, 7vw, 96px)',
                lineHeight: 0.95,
                color: '#ffffff',
                letterSpacing: '0.04em',
                marginBottom: '16px',
              }}>
                YOU'RE IN.
              </h2>
              <p style={{ fontSize: '16px', color: '#888', marginBottom: '8px', lineHeight: 1.6 }}>
                {proposal.approved_by_name
                  ? <>Proposal approved by <strong style={{ color: '#D98235' }}>{proposal.approved_by_name}</strong>.</>
                  : <>Proposal approved. We've got you on the books.</>
                }
              </p>
              <p style={{ fontSize: '15px', color: '#666', maxWidth: '480px', lineHeight: 1.7, marginBottom: '40px' }}>
                We'll reach out within 24 hours to kick off Week 1 and get discovery rolling.
              </p>
            </div>

            <div style={fadeIn(successVisible, 0.2)}>
              <div style={{
                background: '#0a0a0a',
                border: '1px solid #1a1a1a',
                borderLeft: '3px solid #D98235',
                padding: '20px 28px',
                display: 'inline-block',
              }}>
                <p style={{ fontSize: '12px', color: '#555', marginBottom: '6px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
                  QUESTIONS? REACH OUT DIRECTLY
                </p>
                <a href="mailto:ricky@theiconikstudios.com" style={{ color: '#D98235', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace", textDecoration: 'none' }}>
                  ricky@theiconikstudios.com
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── IDLE + FORM STATES ────────────────────────── */}
        {approvalState !== 'success' && (
          <div>
            {/* Badge */}
            <div style={fadeIn(slideVisible, 0)}>
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
            </div>

            {/* Headline */}
            <div style={fadeIn(slideVisible, 0.1)}>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(56px, 7vw, 96px)',
                lineHeight: 0.95,
                color: '#ffffff',
                letterSpacing: '0.04em',
                marginBottom: '24px',
              }}>
                {proposal.cta_headline || "LET'S MAKE IT OFFICIAL."}
              </h2>
            </div>

            {/*
              Interactive content — no opacity animation on this wrapper.
              State changes (idle ↔ form) just swap React content; animation
              on the wrapper would re-trigger on children changes.
            */}
            <div style={{ marginBottom: '8px' }}>

              {/* ── IDLE ── */}
              {approvalState === 'idle' && (
                <div>
                  <p style={{ fontSize: '15px', color: '#888', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px' }}>
                    You've seen the plan. You know what we're building. Approving below kicks off Week 1 — we'll have your discovery prep ready within 48 hours.
                  </p>

                  <div style={{ marginBottom: '48px' }}>
                    <button
                      onClick={() => setApprovalState('form')}
                      style={{
                        background: '#D98235',
                        color: '#000',
                        border: 'none',
                        padding: '18px 48px',
                        fontSize: '12px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: 'pointer',
                        transition: 'filter 0.2s, transform 0.2s',
                      }}
                      onMouseEnter={e => { (e.target as HTMLElement).style.filter = 'brightness(1.08)'; (e.target as HTMLElement).style.transform = 'scale(1.02)'; }}
                      onMouseLeave={e => { (e.target as HTMLElement).style.filter = ''; (e.target as HTMLElement).style.transform = ''; }}
                    >
                      Sign & Approve Proposal
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
                    {NEXT_STEPS.map(step => (
                      <div key={step.num}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#D98235', letterSpacing: '0.12em', marginBottom: '6px' }}>
                          {step.num}
                        </div>
                        <div style={{ fontSize: '13px', color: '#ccc', fontWeight: 600, marginBottom: '4px' }}>
                          {step.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#555', lineHeight: 1.5 }}>
                          {step.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── FORM / LOADING ── */}
              {(approvalState === 'form' || approvalState === 'loading') && (
                <div>
                  {/* Selected tier summary */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '16px',
                    background: '#0d0d0d',
                    border: '1px solid #1a1a1a',
                    borderLeft: '3px solid #D98235',
                    padding: '14px 20px',
                    marginBottom: '28px',
                  }}>
                    <div>
                      <div style={{ fontSize: '9px', color: '#555', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace", marginBottom: '2px' }}>
                        Selected Package
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
                        {tier.label} — <span style={{ color: '#D98235', fontFamily: "'JetBrains Mono', monospace" }}>{tier.price}</span> one-time
                      </div>
                    </div>
                  </div>

                  {/* Approval form */}
                  <div style={{ maxWidth: '480px', marginBottom: '40px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '10px',
                        color: '#555',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: '8px',
                      }}>
                        Your Full Name — Digital Signature
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        disabled={approvalState === 'loading'}
                        style={{
                          width: '100%',
                          background: '#0a0a0a',
                          border: '1px solid #222',
                          borderBottom: name.trim() ? '2px solid #D98235' : '1px solid #222',
                          color: '#fff',
                          padding: '14px 16px',
                          fontSize: '16px',
                          fontFamily: "'Permanent Marker', cursive",
                          outline: 'none',
                          boxSizing: 'border-box' as const,
                          transition: 'border-color 0.2s',
                          letterSpacing: '0.03em',
                        }}
                        onKeyDown={e => e.key === 'Enter' && agreed && name.trim() && email.trim() && handleApprove()}
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '10px',
                        color: '#555',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        fontFamily: "'JetBrains Mono', monospace",
                        marginBottom: '8px',
                      }}>
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. alex@company.com"
                        disabled={approvalState === 'loading'}
                        style={{
                          width: '100%',
                          background: '#0a0a0a',
                          border: '1px solid #222',
                          borderBottom: email.trim() ? '2px solid #D98235' : '1px solid #222',
                          color: '#fff',
                          padding: '14px 16px',
                          fontSize: '14px',
                          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                          outline: 'none',
                          boxSizing: 'border-box' as const,
                          transition: 'border-color 0.2s',
                        }}
                        onKeyDown={e => e.key === 'Enter' && agreed && name.trim() && email.trim() && handleApprove()}
                      />
                    </div>

                    <label style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      cursor: 'pointer',
                      marginBottom: '24px',
                      userSelect: 'none' as const,
                    }}>
                      <div
                        onClick={() => { if (approvalState !== 'loading') setAgreed(a => !a); }}
                        style={{
                          width: '18px',
                          height: '18px',
                          flexShrink: 0,
                          marginTop: '2px',
                          background: agreed ? '#D98235' : 'transparent',
                          border: agreed ? '2px solid #D98235' : '2px solid #333',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: approvalState === 'loading' ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s',
                        }}
                      >
                        {agreed && <span style={{ color: '#000', fontSize: '11px', fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: '12px', color: '#666', lineHeight: 1.6 }}>
                        I've reviewed this proposal and approve Iconik Studios to begin work on the selected package.
                      </span>
                    </label>

                    {error && (
                      <div style={{
                        background: '#1a0000',
                        border: '1px solid #7f1d1d',
                        color: '#f87171',
                        padding: '10px 14px',
                        fontSize: '12px',
                        marginBottom: '16px',
                      }}>
                        {error}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button
                        onClick={handleApprove}
                        disabled={!name.trim() || !email.trim() || !agreed || approvalState === 'loading'}
                        style={{
                          background: (!name.trim() || !email.trim() || !agreed) ? '#1a1a1a' : '#D98235',
                          color: (!name.trim() || !email.trim() || !agreed) ? '#444' : '#000',
                          border: 'none',
                          padding: '14px 32px',
                          fontSize: '11px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          fontFamily: "'JetBrains Mono', monospace",
                          cursor: (!name.trim() || !agreed || approvalState === 'loading') ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {approvalState === 'loading' ? 'Confirming...' : 'Confirm & Approve →'}
                      </button>
                      {approvalState !== 'loading' && (
                        <button
                          onClick={() => { setApprovalState('idle'); setName(''); setEmail(''); setAgreed(false); setError(''); }}
                          style={{
                            background: 'transparent',
                            color: '#444',
                            border: 'none',
                            fontSize: '12px',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            padding: '14px 0',
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>{/* end interactive content wrapper */}

            {/* Contact footer */}
            <div style={fadeIn(slideVisible, 0.3)}>
              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' as const }}>
                {['ricky@theiconikstudios.com', 'theiconikstudios.com', 'Phoenix, AZ'].map((item, i) => (
                  <span key={i} style={{ fontSize: '11px', color: '#444', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </Slide>
  );
}
