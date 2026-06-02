import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useProposals } from '../hooks/useProposals';
import AdminGuard from '../components/AdminGuard';
import GenerateForm from '../components/GenerateForm';
import ProposalPreviewPanel from '../../components/proposals/ProposalPreviewPanel';
import { Proposal } from '../../types/proposal';

const SITE_URL = 'https://www.theiconikstudios.com';

type Tab = 'generate' | 'content' | 'preview';

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#080808',
  border: '1px solid #1a1a1a',
  color: '#fff',
  padding: '10px 14px',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#555',
  fontSize: '10px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: '6px',
  fontFamily: "'JetBrains Mono', monospace",
};

const sectionHeadStyle: React.CSSProperties = {
  fontFamily: "'Bebas Neue', sans-serif",
  fontSize: '18px',
  letterSpacing: '0.1em',
  color: '#ffffff',
  marginTop: '36px',
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottom: '1px solid #111',
};

function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const common = {
    ...inputStyle,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.target.style.borderColor = '#D98235'),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.target.style.borderColor = '#1a1a1a'),
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          style={{ ...common, resize: 'vertical', minHeight: `${rows * 24}px` } as React.CSSProperties}
          onFocus={common.onFocus as any}
          onBlur={common.onBlur as any}
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          style={common as React.CSSProperties}
          onFocus={common.onFocus as any}
          onBlur={common.onBlur as any}
        />
      )}
    </div>
  );
}

export default function ProposalEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { createProposal, updateProposal, publishProposal } = useProposals();
  const isNew = id === 'new';

  const [tab, setTab] = useState<Tab>(isNew ? 'generate' : 'content');
  const [proposal, setProposal] = useState<Partial<Proposal>>({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [slugError, setSlugError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      fetchProposal(id);
      setTab('content'); // reset from 'generate' when navigating from /new to /:id
    }
  }, [id, isNew]);

  async function fetchProposal(proposalId: string) {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', proposalId)
      .single();
    if (!error && data) {
      setProposal(data);
      setSavedId(data.id);
    }
    setLoading(false);
  }

  function set(field: keyof Proposal, value: any) {
    setProposal(prev => ({ ...prev, [field]: value }));
  }

  async function handleGenerated(generated: Partial<Proposal>) {
    setSaving(true);
    try {
      const created = await createProposal({ ...generated, status: 'draft' });
      navigate(`/admin/proposals/${created.id}`);
    } catch (err: any) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setSlugError('');
    try {
      if (savedId) {
        await updateProposal(savedId, proposal);
      } else {
        const created = await createProposal({ ...proposal, status: 'draft' });
        setSavedId(created.id);
        navigate(`/admin/proposals/${created.id}`, { replace: true });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err: any) {
      if (err?.code === '23505' || err?.message?.includes('duplicate')) {
        setSlugError('This slug is already taken. Try appending -v2 or change the company name.');
      }
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (!savedId) {
      await handleSave();
      return;
    }
    setPublishing(true);
    try {
      const updated = await publishProposal(savedId);
      setProposal(updated);

      // Move GHL opportunity to Proposal Sent — silent fail, never blocks admin
      if (updated.client_email) {
        fetch('/api/proposal-published', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: updated.client_email,
            proposal_id: savedId,
          }),
        }).catch(err => console.error('GHL proposal-published call failed:', err));
      }
    } catch (err) {
      console.error('Publish error:', err);
    } finally {
      setPublishing(false);
    }
  }

  function handleCopyLink() {
    if (!proposal.slug) return;
    navigator.clipboard.writeText(`${SITE_URL}/proposals/${proposal.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  }

  const isPublished = proposal.status === 'published';
  const expiresAt = proposal.expires_at
    ? new Date(proposal.expires_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : null;

  const tabStyle = (t: Tab): React.CSSProperties => ({
    background: tab === t ? '#111' : 'transparent',
    color: tab === t ? '#fff' : '#555',
    border: 'none',
    borderBottom: tab === t ? '2px solid #D98235' : '2px solid transparent',
    padding: '12px 20px',
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    transition: 'all 0.15s',
  });

  return (
    <AdminGuard>
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        color: '#fff',
      }}>
        {/* Top bar */}
        <div style={{
          borderBottom: '1px solid #111',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => navigate('/admin/proposals')}
              style={{
                background: 'transparent',
                color: '#555',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                padding: 0,
                fontFamily: 'inherit',
              }}
            >
              ← Back
            </button>
            <span style={{ color: '#222' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '3px', height: '16px', background: '#D98235' }} />
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '18px',
                letterSpacing: '0.1em',
              }}>
                {isNew ? 'NEW PROPOSAL' : (proposal.client_name || 'EDIT PROPOSAL')}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Published status */}
            {isPublished && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {expiresAt && (
                  <span style={{ fontSize: '11px', color: '#555', fontFamily: "'JetBrains Mono', monospace" }}>
                    Expires {expiresAt}
                  </span>
                )}
                <button
                  onClick={handleCopyLink}
                  style={{
                    background: copiedLink ? '#0a1f0a' : '#111',
                    color: copiedLink ? '#4ade80' : '#D98235',
                    border: copiedLink ? '1px solid #166534' : '1px solid #D98235',
                    padding: '8px 16px',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                  }}
                >
                  {copiedLink ? '✓ Copied!' : '🔗 Copy Proposal Link'}
                </button>
              </div>
            )}

            {!isNew && (
              <button
                onClick={handleSave}
                disabled={saving}
                style={{
                  background: saveSuccess ? '#0a1f0a' : '#111',
                  color: saveSuccess ? '#4ade80' : '#888',
                  border: '1px solid #222',
                  padding: '8px 18px',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {saving ? 'Saving...' : saveSuccess ? '✓ Saved' : 'Save Draft'}
              </button>
            )}

            {!isPublished && savedId && (
              <button
                onClick={handlePublish}
                disabled={publishing}
                style={{
                  background: publishing ? '#333' : '#D98235',
                  color: publishing ? '#888' : '#000',
                  border: 'none',
                  padding: '8px 20px',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: publishing ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {publishing ? 'Publishing...' : 'Publish →'}
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        {!isNew && (
          <div style={{ borderBottom: '1px solid #0d0d0d', padding: '0 32px', display: 'flex' }}>
            {(['content', 'preview'] as Tab[]).map(t => (
              <button key={t} style={tabStyle(t)} onClick={() => setTab(t)}>
                {t === 'content' ? 'Content' : 'Preview'}
              </button>
            ))}
          </div>
        )}

        {/* Slug error */}
        {slugError && (
          <div style={{
            background: '#1a0000',
            border: '1px solid #7f1d1d',
            color: '#f87171',
            padding: '12px 32px',
            fontSize: '13px',
          }}>
            {slugError}
          </div>
        )}

        {/* Content */}
        {loading && (
          <div style={{ padding: '60px 32px', color: '#555' }}>Loading...</div>
        )}

        {!loading && (
          <>
            {/* Generate tab */}
            {tab === 'generate' && isNew && (
              <div style={{ padding: '56px 32px' }}>
                {saving && (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
                    Saving draft to Supabase...
                  </div>
                )}
                {!saving && (
                  <GenerateForm onGenerated={handleGenerated} />
                )}
              </div>
            )}

            {/* Content tab */}
            {tab === 'content' && !isNew && (
              <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 32px' }}>
                <div style={sectionHeadStyle}>METADATA</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Field label="Client Name" value={proposal.client_name || ''} onChange={v => set('client_name', v)} />
                  <Field label="Client Company" value={proposal.client_company || ''} onChange={v => set('client_company', v)} />
                  <Field label="Client Email" value={proposal.client_email || ''} onChange={v => set('client_email', v)} />
                  <Field label="Client Industry" value={proposal.client_industry || ''} onChange={v => set('client_industry', v)} />
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Slug</label>
                    <input
                      type="text"
                      value={proposal.slug || ''}
                      onChange={e => set('slug', e.target.value)}
                      style={inputStyle as React.CSSProperties}
                      onFocus={e => e.target.style.borderColor = '#D98235'}
                      onBlur={e => e.target.style.borderColor = '#1a1a1a'}
                    />
                    <p style={{ fontSize: '10px', color: '#333', marginTop: '4px', fontFamily: "'JetBrains Mono', monospace" }}>
                      Public URL: /proposals/{proposal.slug || '…'}
                    </p>
                  </div>
                </div>

                <div style={sectionHeadStyle}>EXECUTIVE SUMMARY</div>
                <Field label="Situation (Where they are now)" value={proposal.exec_situation || ''} onChange={v => set('exec_situation', v)} multiline rows={3} />
                <Field label="Proposal (What we're building)" value={proposal.exec_proposal || ''} onChange={v => set('exec_proposal', v)} multiline rows={3} />
                <Field label="Outcome (90 days out)" value={proposal.exec_outcome || ''} onChange={v => set('exec_outcome', v)} multiline rows={2} />

                <div style={sectionHeadStyle}>THE PROBLEM</div>
                <Field label="Headline (ALL CAPS, 4-5 words)" value={proposal.problem_headline || ''} onChange={v => set('problem_headline', v)} />
                <Field label="Body (two paragraphs, separate with blank line)" value={proposal.problem_body || ''} onChange={v => set('problem_body', v)} multiline rows={6} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Field label="Symptom 1" value={proposal.problem_symptom_1 || ''} onChange={v => set('problem_symptom_1', v)} />
                  <Field label="Symptom 2" value={proposal.problem_symptom_2 || ''} onChange={v => set('problem_symptom_2', v)} />
                  <Field label="Symptom 3" value={proposal.problem_symptom_3 || ''} onChange={v => set('problem_symptom_3', v)} />
                  <Field label="Symptom 4" value={proposal.problem_symptom_4 || ''} onChange={v => set('problem_symptom_4', v)} />
                </div>
                <Field label="Pull Quote / Callout" value={proposal.problem_callout || ''} onChange={v => set('problem_callout', v)} />

                <div style={sectionHeadStyle}>VISION STATS</div>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px' }}>
                  <Field label="Stat 1 Num" value={proposal.vision_stat_1_num || ''} onChange={v => set('vision_stat_1_num', v)} />
                  <Field label="Stat 1 Label" value={proposal.vision_stat_1_label || ''} onChange={v => set('vision_stat_1_label', v)} />
                  <Field label="Stat 2 Num" value={proposal.vision_stat_2_num || ''} onChange={v => set('vision_stat_2_num', v)} />
                  <Field label="Stat 2 Label" value={proposal.vision_stat_2_label || ''} onChange={v => set('vision_stat_2_label', v)} />
                </div>

                <div style={sectionHeadStyle}>PRICING</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Selected Tier</label>
                    <select
                      value={proposal.selected_tier || 'growth'}
                      onChange={e => set('selected_tier', e.target.value)}
                      style={{ ...inputStyle, appearance: 'none' } as React.CSSProperties}
                    >
                      <option value="starter">Starter — $1,500</option>
                      <option value="growth">Growth — $3,500</option>
                      <option value="scale">Scale — $7,500</option>
                    </select>
                  </div>
                  <Field label="Pricing Recommendation Reason" value={proposal.pricing_recommendation_reason || ''} onChange={v => set('pricing_recommendation_reason', v)} />
                </div>

                <div style={sectionHeadStyle}>CTA</div>
                <Field label="CTA Headline" value={proposal.cta_headline || 'READY TO BUILD?'} onChange={v => set('cta_headline', v)} />

                <div style={sectionHeadStyle}>RAW NOTES</div>
                <Field label="Original Discovery Call Notes" value={proposal.raw_notes || ''} onChange={v => set('raw_notes', v)} multiline rows={8} />

                <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #111', display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                      background: saveSuccess ? '#0a1f0a' : '#D98235',
                      color: saveSuccess ? '#4ade80' : '#000',
                      border: 'none',
                      padding: '12px 32px',
                      fontSize: '11px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      cursor: saving ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {saving ? 'Saving...' : saveSuccess ? '✓ Saved' : 'Save Draft'}
                  </button>

                  {!isPublished && (
                    <button
                      onClick={handlePublish}
                      disabled={publishing}
                      style={{
                        background: 'transparent',
                        color: publishing ? '#444' : '#D98235',
                        border: '1px solid #D98235',
                        padding: '12px 32px',
                        fontSize: '11px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        cursor: publishing ? 'not-allowed' : 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      {publishing ? 'Publishing...' : 'Publish Proposal'}
                    </button>
                  )}
                </div>

                {isPublished && (
                  <div style={{
                    marginTop: '24px',
                    background: '#0a1f0a',
                    border: '1px solid #166534',
                    padding: '20px 24px',
                  }}>
                    <div style={{ color: '#4ade80', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                      ✓ Proposal is live
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      color: '#888',
                      marginBottom: '12px',
                    }}>
                      {SITE_URL}/proposals/{proposal.slug}
                    </div>
                    {expiresAt && (
                      <div style={{ fontSize: '11px', color: '#555', marginBottom: '12px' }}>
                        Expires: {expiresAt}
                      </div>
                    )}
                    <button
                      onClick={handleCopyLink}
                      style={{
                        background: copiedLink ? '#166534' : '#D98235',
                        color: copiedLink ? '#4ade80' : '#000',
                        border: 'none',
                        padding: '10px 24px',
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      {copiedLink ? '✓ Link Copied!' : '🔗 Copy Proposal Link'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Preview tab — renders components directly, no fetch, works on drafts */}
            {tab === 'preview' && !isNew && (
              <ProposalPreviewPanel proposal={proposal} />
            )}
          </>
        )}
      </div>
    </AdminGuard>
  );
}
