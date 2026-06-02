import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const ADMIN_EMAIL = 'remedy@theiconikstudios.com';
const SITE_URL = 'https://www.theiconikstudios.com';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { slug, approverName } = req.body;

  if (!slug || !approverName?.trim()) {
    return res.status(400).json({ error: 'Slug and name are required' });
  }

  const { data: proposal, error: fetchError } = await supabase
    .from('proposals')
    .select('id, status, expires_at, approved_at, client_name, client_company, selected_tier')
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

  const approvedAt = new Date().toISOString();

  const { error: updateError } = await supabase
    .from('proposals')
    .update({
      approved_at: approvedAt,
      approved_by_name: approverName.trim(),
    })
    .eq('id', proposal.id);

  if (updateError) {
    console.error('Approval update error:', updateError);
    return res.status(500).json({ error: 'Failed to record approval' });
  }

  // Send email notification — awaited so errors surface in Vercel logs
  try {
    await sendApprovalEmail({
      clientName: proposal.client_name,
      clientCompany: proposal.client_company,
      approverName: approverName.trim(),
      tier: proposal.selected_tier,
      slug,
      approvedAt,
    });
    console.log('Approval email sent successfully');
  } catch (err) {
    console.error('Email notification failed:', err);
  }

  res.status(200).json({ success: true });
}

async function sendApprovalEmail({
  clientName,
  clientCompany,
  approverName,
  tier,
  slug,
  approvedAt,
}: {
  clientName: string;
  clientCompany: string | null;
  approverName: string;
  tier: string | null;
  slug: string;
  approvedAt: string;
}) {
  console.log('sendApprovalEmail called, RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email');
    return;
  }

  const displayName = clientCompany || clientName;
  const tierLabel = tier
    ? tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase()
    : 'Unknown';
  const formattedDate = new Date(approvedAt).toLocaleString('en-US', {
    timeZone: 'America/Phoenix',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const adminLink = `${SITE_URL}/admin/proposals`;
  const proposalLink = `${SITE_URL}/proposals/${slug}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; color: #111111;">
      <div style="background: #0a0a0a; padding: 28px 32px; border-bottom: 3px solid #D98235;">
        <p style="margin: 0; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #D98235; font-weight: 700;">
          Iconik Studios
        </p>
        <h1 style="margin: 8px 0 0; font-size: 24px; color: #ffffff; font-weight: 700;">
          Proposal Approved ✓
        </h1>
      </div>

      <div style="padding: 32px;">
        <p style="font-size: 16px; color: #333; margin: 0 0 24px;">
          <strong>${approverName}</strong> just signed and approved the proposal for <strong>${displayName}</strong>.
        </p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
          <tr>
            <td style="padding: 10px 14px; background: #f5f5f5; font-size: 12px; color: #666; width: 130px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Client</td>
            <td style="padding: 10px 14px; background: #f5f5f5; font-size: 14px; color: #111;">${displayName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; background: #ffffff; font-size: 12px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; border-top: 1px solid #eee;">Approved By</td>
            <td style="padding: 10px 14px; background: #ffffff; font-size: 14px; color: #111; border-top: 1px solid #eee;">${approverName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; background: #f5f5f5; font-size: 12px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Package</td>
            <td style="padding: 10px 14px; background: #f5f5f5; font-size: 14px; color: #D98235; font-weight: 700;">${tierLabel}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; background: #ffffff; font-size: 12px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; border-top: 1px solid #eee;">Approved At</td>
            <td style="padding: 10px 14px; background: #ffffff; font-size: 14px; color: #111; border-top: 1px solid #eee;">${formattedDate}</td>
          </tr>
        </table>

        <div style="display: flex; gap: 12px; margin-bottom: 32px;">
          <a href="${adminLink}" style="display: inline-block; background: #D98235; color: #000000; text-decoration: none; padding: 12px 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">
            View in Admin
          </a>
          <a href="${proposalLink}" style="display: inline-block; background: #f0f0f0; color: #333333; text-decoration: none; padding: 12px 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">
            View Proposal
          </a>
        </div>

        <p style="font-size: 12px; color: #999; margin: 0; border-top: 1px solid #eee; padding-top: 20px;">
          This notification was sent automatically when the client approved their proposal.<br>
          Iconik Studios · Phoenix, AZ · theiconikstudios.com
        </p>
      </div>
    </div>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Iconik Studios <notifications@theiconikstudios.com>',
      to: [ADMIN_EMAIL],
      subject: `Proposal Approved — ${displayName} (${tierLabel})`,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${error}`);
  }
}
