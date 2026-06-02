import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useProposals } from '../hooks/useProposals';
import AdminGuard from '../components/AdminGuard';

const SITE_URL = 'https://iconikstudios.com';

function StatusBadge({ status, expiresAt }: { status: string; expiresAt: string | null }) {
  const isExpired = expiresAt && new Date(expiresAt) < new Date();
  const resolved = isExpired ? 'expired' : status;

  const styles: Record<string, React.CSSProperties> = {
    draft: { background: '#1a1a1a', color: '#888', border: '1px solid #333' },
    published: { background: '#0a1f0a', color: '#4ade80', border: '1px solid #166534' },
    expired: { background: '#1a0a0a', color: '#f87171', border: '1px solid #7f1d1d' },
  };

  const labels: Record<string, string> = {
    draft: 'Draft',
    published: 'Published',
    expired: 'Expired',
  };

  return (
    <span style={{
      fontSize: '10px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      fontWeight: 600,
      ...styles[resolved],
    }}>
      {labels[resolved]}
    </span>
  );
}

export default function ProposalList() {
  const { proposals, loading, deleteProposal } = useProposals();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  async function handleDelete(id: string, clientName: string) {
    if (!confirm(`Delete proposal for ${clientName}? This cannot be undone.`)) return;
    setDeletingId(id);
    await deleteProposal(id);
    setDeletingId(null);
  }

  function handleCopyLink(slug: string, id: string) {
    navigator.clipboard.writeText(`${SITE_URL}/proposals/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  const isExpired = (p: { expires_at: string | null }) =>
    p.expires_at && new Date(p.expires_at) < new Date();

  const isPublishedActive = (p: { status: string; expires_at: string | null }) =>
    p.status === 'published' && !isExpired(p);

  return (
    <AdminGuard>
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        color: '#ffffff',
      }}>
        {/* Header */}
        <div style={{
          borderBottom: '1px solid #111',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '60px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '3px', height: '20px', background: '#D98235' }} />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '20px',
              letterSpacing: '0.1em',
            }}>ICONIK ADMIN</span>
            <span style={{ color: '#333', fontSize: '14px' }}>/</span>
            <span style={{ color: '#888', fontSize: '13px' }}>Proposals</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => navigate('/admin/proposals/new')}
              style={{
                background: '#D98235',
                color: '#000',
                border: 'none',
                padding: '8px 20px',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              + New Proposal
            </button>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#555',
                border: '1px solid #222',
                padding: '8px 16px',
                fontSize: '11px',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '40px 32px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '36px',
              letterSpacing: '0.08em',
              marginBottom: '4px',
            }}>
              ALL PROPOSALS
            </h1>
            <p style={{ color: '#555', fontSize: '13px' }}>
              {proposals.length} proposal{proposals.length !== 1 ? 's' : ''} total
            </p>
          </div>

          {loading && (
            <div style={{ color: '#555', fontSize: '14px', padding: '40px 0' }}>Loading...</div>
          )}

          {!loading && proposals.length === 0 && (
            <div style={{
              border: '1px dashed #222',
              padding: '60px',
              textAlign: 'center',
              color: '#444',
            }}>
              <p style={{ fontSize: '14px', marginBottom: '16px' }}>No proposals yet.</p>
              <button
                onClick={() => navigate('/admin/proposals/new')}
                style={{
                  background: '#D98235',
                  color: '#000',
                  border: 'none',
                  padding: '10px 24px',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Create First Proposal
              </button>
            </div>
          )}

          {!loading && proposals.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {/* Table header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 180px 120px 140px 160px 100px',
                padding: '10px 20px',
                borderBottom: '1px solid #111',
              }}>
                {['Client', 'Company', 'Status', 'Created', 'Expires', 'Actions'].map(h => (
                  <span key={h} style={{
                    fontSize: '10px',
                    color: '#444',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    {h}
                  </span>
                ))}
              </div>

              {proposals.map(p => (
                <div
                  key={p.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 180px 120px 140px 160px 100px',
                    padding: '16px 20px',
                    background: '#0a0a0a',
                    border: '1px solid #111',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#222')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#111')}
                  onClick={() => navigate(`/admin/proposals/${p.id}`)}
                >
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '2px' }}>
                      {p.client_name}
                    </div>
                    <div style={{ color: '#444', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>
                      /{p.slug}
                    </div>
                  </div>

                  <div style={{ color: '#888', fontSize: '13px' }}>
                    {p.client_company || '—'}
                  </div>

                  <div>
                    <StatusBadge status={p.status} expiresAt={p.expires_at} />
                  </div>

                  <div style={{ color: '#555', fontSize: '12px' }}>
                    {new Date(p.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </div>

                  <div style={{ color: '#555', fontSize: '12px' }}>
                    {p.expires_at
                      ? new Date(p.expires_at).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })
                      : '—'
                    }
                  </div>

                  <div
                    style={{ display: 'flex', gap: '8px' }}
                    onClick={e => e.stopPropagation()}
                  >
                    {isPublishedActive(p) && (
                      <button
                        title="Copy proposal link"
                        onClick={() => handleCopyLink(p.slug, p.id)}
                        style={{
                          background: copiedId === p.id ? '#166534' : '#111',
                          color: copiedId === p.id ? '#4ade80' : '#888',
                          border: '1px solid #222',
                          padding: '4px 8px',
                          fontSize: '10px',
                          cursor: 'pointer',
                          letterSpacing: '0.08em',
                          fontFamily: 'inherit',
                        }}
                      >
                        {copiedId === p.id ? '✓ Copied' : 'Copy Link'}
                      </button>
                    )}
                    <button
                      title="Delete proposal"
                      onClick={() => handleDelete(p.id, p.client_name)}
                      disabled={deletingId === p.id}
                      style={{
                        background: 'transparent',
                        color: '#555',
                        border: '1px solid #1a1a1a',
                        padding: '4px 8px',
                        fontSize: '10px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      {deletingId === p.id ? '...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}
