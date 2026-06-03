import React, { useState } from 'react';
import { Proposal } from '../../types/proposal';

interface GenerateFormProps {
  onGenerated: (proposal: Partial<Proposal>) => void;
}

export default function GenerateForm({ onGenerated }: GenerateFormProps) {
  const [notes, setNotes] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientIndustry, setClientIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!notes.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes, clientName, clientIndustry }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed');
      }

      const { proposal } = await res.json();
      onGenerated({ ...proposal, client_email: clientEmail.trim() || undefined });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0a0a0a',
    border: '1px solid #1e1e1e',
    color: '#fff',
    padding: '12px 16px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    resize: 'vertical',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#666',
    fontSize: '10px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    marginBottom: '8px',
    fontFamily: "'JetBrains Mono', monospace",
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          display: 'inline-block',
          background: '#D98235',
          color: '#000',
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '4px 12px',
          marginBottom: '16px',
          fontWeight: 700,
        }}>
          AI Generation
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '36px',
          letterSpacing: '0.06em',
          color: '#fff',
          marginBottom: '8px',
        }}>
          GENERATE FROM NOTES
        </h2>
        <p style={{ color: '#555', fontSize: '14px', lineHeight: 1.6 }}>
          Paste your discovery call notes. Claude will extract client details, select the right tier, and draft the full proposal in 15–30 seconds.
        </p>
      </div>

      <form onSubmit={handleGenerate}>
        <div style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>Discovery Call Notes *</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            required
            placeholder="Paste your raw notes here — the more detail, the better the proposal. Include: business context, pain points, goals, budget signals, timeline, and anything the client mentioned about their situation..."
            rows={12}
            style={{
              ...inputStyle,
              minHeight: '240px',
            }}
            onFocus={e => e.target.style.borderColor = '#D98235'}
            onBlur={e => e.target.style.borderColor = '#1e1e1e'}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={labelStyle}>Client Name (optional)</label>
            <input
              type="text"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              placeholder="AI will extract from notes"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#D98235'}
              onBlur={e => e.target.style.borderColor = '#1e1e1e'}
            />
          </div>
          <div>
            <label style={labelStyle}>Client Industry (optional)</label>
            <input
              type="text"
              value={clientIndustry}
              onChange={e => setClientIndustry(e.target.value)}
              placeholder="AI will extract from notes"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#D98235'}
              onBlur={e => e.target.style.borderColor = '#1e1e1e'}
            />
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <label style={labelStyle}>Client Email (required for pipeline automation)</label>
          <input
            type="email"
            value={clientEmail}
            onChange={e => setClientEmail(e.target.value)}
            placeholder="client@company.com"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = '#D98235'}
            onBlur={e => e.target.style.borderColor = '#1e1e1e'}
          />
        </div>

        {error && (
          <div style={{
            background: '#1a0000',
            border: '1px solid #7f1d1d',
            color: '#f87171',
            padding: '12px 16px',
            fontSize: '13px',
            marginBottom: '20px',
            lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !notes.trim()}
          style={{
            width: '100%',
            background: loading || !notes.trim() ? '#1a1a1a' : '#D98235',
            color: loading || !notes.trim() ? '#444' : '#000',
            border: 'none',
            padding: '16px',
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            cursor: loading || !notes.trim() ? 'not-allowed' : 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            transition: 'background 0.2s',
          }}
        >
          {loading ? '⟳  Claude is analyzing your discovery notes...' : 'Generate Proposal →'}
        </button>

        <p style={{
          textAlign: 'center',
          color: '#333',
          fontSize: '11px',
          marginTop: '16px',
          letterSpacing: '0.05em',
        }}>
          Generation takes 15–30 seconds. Claude will extract client details and tailor the full proposal from your notes.
        </p>
      </form>
    </div>
  );
}
