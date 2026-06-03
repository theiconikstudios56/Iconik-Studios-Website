import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SignContractBody {
  contactId: string;
  contactName: string;
  contactEmail: string;
  businessName: string;
  signedName: string;
  signedAt: string;
  packageName: string;
  projectPrice: string;
  initials: Record<string, string>;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    contactId,
    contactName,
    contactEmail,
    businessName,
    signedName,
    signedAt,
    packageName,
    projectPrice,
    initials = {},
  }: SignContractBody = req.body;

  const signedDate = new Date(signedAt).toLocaleString('en-US', {
    timeZone: 'America/Phoenix',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  // Step 1: Add "contract signed" tag in GHL (non-blocking — failure is silent)
  try {
    const ghlRes = await fetch(
      `https://services.leadconnectorhq.com/contacts/${contactId}/tags`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GHL_PRIVATE_INTEGRATION_TOKEN}`,
          Version: '2021-07-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tags: ['contract signed'] }),
      }
    );
    if (!ghlRes.ok) {
      const text = await ghlRes.text();
      console.error('GHL tag error:', ghlRes.status, text);
    }
  } catch (err) {
    console.error('GHL tag request failed:', err);
  }

  // Step 2: Send confirmation to client
  try {
    await resend.emails.send({
      from: 'Iconik Studios <hello@iconikstudios.com>',
      to: contactEmail,
      subject: 'Your Iconik Studios Contract is Signed ✓',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'DM Mono',monospace,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 24px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="padding-bottom:40px;border-bottom:1px solid #C9A84C33;">
          <p style="margin:0;font-size:13px;letter-spacing:0.3em;color:#C9A84C;text-transform:uppercase;font-weight:600;">ICONIK STUDIOS</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 0;">
          <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#ffffff;font-family:sans-serif;">Contract Signed ✓</h1>
          <p style="margin:0 0 32px;font-size:14px;color:#999;letter-spacing:0.05em;">Thank you, ${contactName}. Your agreement is confirmed.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #C9A84C22;margin-bottom:32px;">
            <tr><td style="padding:24px;">
              <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.2em;color:#C9A84C;text-transform:uppercase;">Agreement Details</p>
              <table width="100%">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Package</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;text-align:right;">${packageName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Total Investment</td>
                  <td style="padding:6px 0;font-size:13px;color:#C9A84C;font-weight:600;text-align:right;">${projectPrice}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Signed</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;text-align:right;">${signedDate} MST</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <p style="margin:0 0 32px;font-size:14px;color:#ccc;line-height:1.7;">
            Ricky from Iconik Studios will be in touch within 24 hours to kick off your project. If you have any questions in the meantime, just reply to this email.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;border-top:1px solid #ffffff0d;">
          <p style="margin:0;font-size:12px;color:#555;letter-spacing:0.1em;">ICONIK STUDIOS &nbsp;·&nbsp; iconikstudios.com &nbsp;·&nbsp; theiconikstudios@gmail.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });
  } catch (err) {
    console.error('Resend client email error:', err);
  }

  // Step 3: Notify Ricky
  try {
    await resend.emails.send({
      from: 'Iconik Studios System <hello@iconikstudios.com>',
      to: 'theiconikstudios@gmail.com',
      subject: `🎉 New Contract Signed — ${contactName}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'DM Mono',monospace,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 24px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #C9A84C33;">
          <p style="margin:0;font-size:13px;letter-spacing:0.3em;color:#C9A84C;text-transform:uppercase;font-weight:600;">ICONIK STUDIOS — SYSTEM NOTIFICATION</p>
        </td></tr>
        <tr><td style="padding:40px 0;">
          <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;color:#ffffff;font-family:sans-serif;">New Contract Signed 🎉</h1>
          <p style="margin:0 0 32px;font-size:13px;color:#999;">A client has signed their General Service Agreement.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #C9A84C22;">
            <tr><td style="padding:24px;">
              <p style="margin:0 0 16px;font-size:12px;letter-spacing:0.2em;color:#C9A84C;text-transform:uppercase;">Client Details</p>
              <table width="100%">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;width:140px;">Client Name</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;">${contactName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Business</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;">${businessName || '—'}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Email</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;">${contactEmail}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Package</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;">${packageName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Price</td>
                  <td style="padding:6px 0;font-size:13px;color:#C9A84C;font-weight:600;">${projectPrice}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Signed As</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;">${signedName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">Timestamp</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;">${signedDate} MST</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;">GHL Contact ID</td>
                  <td style="padding:6px 0;font-size:13px;color:#fff;">${contactId}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#999;vertical-align:top;">Initials</td>
                  <td style="padding:6px 0;font-size:12px;color:#ccc;">${Object.entries(initials).map(([k, v]) => `${k}: ${v}`).join(' &nbsp;·&nbsp; ') || '—'}</td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding-top:32px;border-top:1px solid #ffffff0d;">
          <p style="margin:0;font-size:12px;color:#555;letter-spacing:0.1em;">ICONIK STUDIOS SYSTEM &nbsp;·&nbsp; iconikstudios.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });
  } catch (err) {
    console.error('Resend Ricky notification error:', err);
  }

  return res.status(200).json({ success: true });
}
