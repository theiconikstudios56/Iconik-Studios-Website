export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, proposal_id } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const GHL_TOKEN = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
  const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;
  const GHL_PROPOSAL_SENT_STAGE_ID = process.env.GHL_PROPOSAL_SENT_STAGE_ID;

  if (!GHL_TOKEN || !GHL_LOCATION_ID || !GHL_PIPELINE_ID || !GHL_PROPOSAL_SENT_STAGE_ID) {
    console.error('Missing GHL env vars — skipping proposal-published GHL update');
    return res.status(200).json({ success: true, warning: 'GHL env vars not configured' });
  }

  const headers = {
    'Authorization': `Bearer ${GHL_TOKEN}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28',
  };

  try {
    // Step 1: Find the contact by email
    const contactSearch = await fetch(
      `https://services.leadconnectorhq.com/contacts/search`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          pageLimit: 1,
          filters: [{ field: 'email', operator: 'eq', value: email }],
        }),
      }
    );
    const contactData = await contactSearch.json();
    const contact = contactData.contacts?.[0];

    if (!contact) {
      console.error('GHL contact not found for email:', email);
      return res.status(200).json({ success: true, warning: 'Contact not found in GHL' });
    }

    // Step 2: Find their opportunity in the sales pipeline
    const oppSearch = await fetch(
      `https://services.leadconnectorhq.com/opportunities/search?location_id=${GHL_LOCATION_ID}&pipeline_id=${GHL_PIPELINE_ID}&contact_id=${contact.id}`,
      { headers }
    );
    const oppData = await oppSearch.json();
    const opportunity = oppData.opportunities?.[0];

    if (!opportunity) {
      console.error('No opportunity found for contact:', contact.id);
      return res.status(200).json({ success: true, warning: 'Opportunity not found in GHL' });
    }

    // Step 3: Move the opportunity to Proposal Sent stage
    const oppUpdate = await fetch(
      `https://services.leadconnectorhq.com/opportunities/${opportunity.id}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          pipelineId: GHL_PIPELINE_ID,
          pipelineStageId: GHL_PROPOSAL_SENT_STAGE_ID,
          status: 'open',
        }),
      }
    );

    if (!oppUpdate.ok) {
      const errBody = await oppUpdate.text();
      console.error(`GHL opportunity update failed (${oppUpdate.status}):`, errBody);
      return res.status(200).json({ success: true, warning: `GHL stage update failed: ${oppUpdate.status}` });
    }

    console.log(`GHL opportunity moved to Proposal Sent for contact ${contact.id} (${email}), proposal ${proposal_id}`);
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('GHL proposal-published error:', err);
    return res.status(200).json({ success: true, warning: 'GHL update failed silently' });
  }
}
