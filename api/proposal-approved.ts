import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = 'https://www.theiconikstudios.com';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, full_name, package: selectedPackage, price, business, proposal_id } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const GHL_TOKEN = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
  const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID;
  const GHL_STAGE_ID = process.env.GHL_STAGE_ID;

  if (!GHL_TOKEN || !GHL_LOCATION_ID || !GHL_PIPELINE_ID || !GHL_STAGE_ID) {
    console.error('Missing GHL env vars — skipping GHL update');
    return res.status(200).json({ success: true, warning: 'GHL env vars not configured' });
  }

  const headers = {
    'Authorization': `Bearer ${GHL_TOKEN}`,
    'Content-Type': 'application/json',
    'Version': '2021-07-28',
  };

  let contactId: string | null = null;

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
    } else {
      contactId = contact.id;

      // Step 2: Update contact name so GHL workflow merge fields are populated
      if (full_name?.trim()) {
        const nameParts = full_name.trim().split(' ');
        const firstName = nameParts[0] ?? '';
        const lastName = nameParts.slice(1).join(' ') || '';
        await fetch(`https://services.leadconnectorhq.com/contacts/${contact.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({ firstName, lastName }),
        });
      }

      // Step 3: Find and move the opportunity stage
      const oppSearch = await fetch(
        `https://services.leadconnectorhq.com/opportunities/search?location_id=${GHL_LOCATION_ID}&pipeline_id=${GHL_PIPELINE_ID}&contact_id=${contact.id}`,
        { headers }
      );
      const oppData = await oppSearch.json();
      const opportunity = oppData.opportunities?.[0];

      if (!opportunity) {
        console.error('No opportunity found for contact:', contact.id);
      } else {
        const oppUpdate = await fetch(
          `https://services.leadconnectorhq.com/opportunities/${opportunity.id}`,
          {
            method: 'PUT',
            headers,
            body: JSON.stringify({
              pipelineId: GHL_PIPELINE_ID,
              pipelineStageId: GHL_STAGE_ID,
              status: 'won',
            }),
          }
        );
        if (!oppUpdate.ok) {
          const errBody = await oppUpdate.text();
          console.error(`GHL opportunity update failed (${oppUpdate.status}):`, errBody);
        } else {
          console.log(`GHL opportunity updated to Won for contact ${contact.id} (${email}), proposal ${proposal_id}`);
        }
      }
    }
  } catch (err) {
    console.error('GHL update error:', err);
  }

  // Step 4: Send contract link email to client via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const contractUrl = new URL(`${SITE_URL}/contract`);
      if (contactId) contractUrl.searchParams.set('contactId', contactId);
      contractUrl.searchParams.set('name', full_name || '');
      contractUrl.searchParams.set('email', email);
      contractUrl.searchParams.set('business', business || '');
      contractUrl.searchParams.set('package', selectedPackage || '');
      contractUrl.searchParams.set('price', price || '');

      await resend.emails.send({
        from: 'Ricky @ Iconik Studios <hello@theiconikstudios.com>',
        to: email,
        subject: 'Your Proposal Has Been Approved — Sign Your Contract',
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'DM Mono',monospace,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 24px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #C9A84C33;">
          <p style="margin:0;font-size:13px;letter-spacing:0.3em;color:#C9A84C;text-transform:uppercase;font-weight:600;">ICONIK STUDIOS</p>
        </td></tr>

        <tr><td style="padding:40px 0;">
          <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#ffffff;font-family:sans-serif;">
            Hi ${full_name || 'there'},
          </h1>
          <p style="margin:0 0 32px;font-size:15px;color:#ccc;line-height:1.7;">
            Great news — your proposal has been approved and your project is officially moving forward.
          </p>
          <p style="margin:0 0 8px;font-size:14px;color:#ccc;">
            The next step is to review and sign your General Service Agreement. It only takes a few minutes.
          </p>

          ${selectedPackage || price ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #C9A84C22;margin:24px 0 32px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.2em;color:#C9A84C;text-transform:uppercase;">Project Summary</p>
              <table width="100%">
                ${selectedPackage ? `<tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Package</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;text-align:right;">${selectedPackage}</td>
                </tr>` : ''}
                ${price ? `<tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Total Investment</td>
                  <td style="padding:6px 0;font-size:13px;color:#C9A84C;font-weight:600;text-align:right;">${price}</td>
                </tr>` : ''}
              </table>
            </td></tr>
          </table>
          ` : ''}

          <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr><td style="background:#C9A84C;padding:0;">
              <a href="${contractUrl.toString()}" style="display:inline-block;background:#C9A84C;color:#000;text-decoration:none;padding:16px 32px;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;font-family:'DM Mono',monospace;">
                → Sign Your Contract Here
              </a>
            </td></tr>
          </table>

          <p style="margin:0 0 32px;font-size:14px;color:#ccc;line-height:1.7;">
            Once signed, you'll receive a copy by email and we'll kick off your project within 24 hours.<br><br>
            If you have any questions before signing, just reply to this email.
          </p>

          <p style="margin:0;font-size:14px;color:#ccc;line-height:1.7;">
            Looking forward to working with you,<br>
            <strong style="color:#fff;">Ricky</strong><br>
            <span style="color:#666;">Iconik Studios</span>
          </p>
        </td></tr>

        <tr><td style="padding-top:32px;border-top:1px solid #ffffff0d;">
          <p style="margin:0;font-size:12px;color:#555;letter-spacing:0.1em;">ICONIK STUDIOS &nbsp;·&nbsp; theiconikstudios.com &nbsp;·&nbsp; theiconikstudios@gmail.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });

      console.log(`Contract link email sent to ${email} for proposal ${proposal_id}`);
    } catch (err) {
      console.error('Resend contract email error:', err);
    }
  }

  return res.status(200).json({ success: true });
}
