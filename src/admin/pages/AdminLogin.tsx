import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin/proposals');
    }
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '12px',
          }}>
            <div style={{ width: '3px', height: '28px', background: '#D98235' }} />
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '28px',
              letterSpacing: '0.12em',
              color: '#ffffff',
            }}>ICONIK STUDIOS</span>
          </div>
          <p style={{ color: '#555', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              color: '#888',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#0d0d0d',
                border: '1px solid #222',
                color: '#fff',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              onFocus={e => e.target.style.borderColor = '#D98235'}
              onBlur={e => e.target.style.borderColor = '#222'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              color: '#888',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#0d0d0d',
                border: '1px solid #222',
                color: '#fff',
                padding: '12px 16px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              onFocus={e => e.target.style.borderColor = '#D98235'}
              onBlur={e => e.target.style.borderColor = '#222'}
            />
          </div>

          {error && (
            <div style={{
              background: '#1a0000',
              border: '1px solid #ff4444',
              color: '#ff8888',
              padding: '10px 14px',
              fontSize: '13px',
              marginBottom: '16px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#333' : '#D98235',
              color: loading ? '#888' : '#000',
              border: 'none',
              padding: '14px',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          color: '#333',
          fontSize: '12px',
          marginTop: '32px',
        }}>
          Iconik Studios · Admin Only
        </p>
      </div>
    </div>
  );
}
