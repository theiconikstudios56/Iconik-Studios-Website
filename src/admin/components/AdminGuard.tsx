import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setAuthed(true);
      } else {
        navigate('/admin/login');
      }
      setChecking(false);
    });
  }, [navigate]);

  if (checking) return (
    <div style={{
      background: '#000000',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      letterSpacing: '0.05em',
    }}>
      Checking auth...
    </div>
  );

  return authed ? <>{children}</> : null;
}
