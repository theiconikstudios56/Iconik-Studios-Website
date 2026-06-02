import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Proposal } from '../../types/proposal';

export function useProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  async function fetchProposals() {
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setProposals(data);
    setLoading(false);
  }

  async function createProposal(proposal: Partial<Proposal>) {
    const { data, error } = await supabase
      .from('proposals')
      .insert(proposal)
      .select()
      .single();
    if (!error && data) {
      setProposals(prev => [data, ...prev]);
      return data;
    }
    throw error;
  }

  async function updateProposal(id: string, updates: Partial<Proposal>) {
    const { data, error } = await supabase
      .from('proposals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (!error && data) {
      setProposals(prev => prev.map(p => p.id === id ? data : p));
      return data;
    }
    throw error;
  }

  async function publishProposal(id: string) {
    const now = new Date().toISOString();
    return updateProposal(id, {
      status: 'published',
      published_at: now,
      // expires_at is auto-set by database trigger to published_at + 30 days
    });
  }

  async function deleteProposal(id: string) {
    const { error } = await supabase.from('proposals').delete().eq('id', id);
    if (!error) setProposals(prev => prev.filter(p => p.id !== id));
  }

  return {
    proposals,
    loading,
    createProposal,
    updateProposal,
    publishProposal,
    deleteProposal,
    refetch: fetchProposals,
  };
}
