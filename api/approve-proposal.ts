import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, approverName } = req.body;

  if (!slug || !approverName?.trim()) {
    return res.status(400).json({ error: 'Slug and name are required' });
  }

  const { data: proposal, error: fetchError } = await supabase
    .from('proposals')
    .select('id, status, expires_at, approved_at')
    .eq('slug', slug)
    .single();

  if (fetchError || !proposal) {
    return res.status(404).json({ error: 'Proposal not found' });
  }

  if (proposal.status !== 'published') {
    return res.status(400).json({ error: 'Proposal is not active' });
  }

  if (proposal.expires_at && new Date(proposal.expires_at) < new Date()) {
    return res.status(400).json({ error: 'Proposal has expired' });
  }

  if (proposal.approved_at) {
    return res.status(200).json({ success: true, alreadyApproved: true });
  }

  const { error: updateError } = await supabase
    .from('proposals')
    .update({
      approved_at: new Date().toISOString(),
      approved_by_name: approverName.trim(),
    })
    .eq('id', proposal.id);

  if (updateError) {
    console.error('Approval update error:', updateError);
    return res.status(500).json({ error: 'Failed to record approval' });
  }

  res.status(200).json({ success: true });
}
