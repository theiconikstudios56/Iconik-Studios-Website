import { Resend } from 'resend';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');

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

  // Step 1: Add "contract signed" tag in GHL (non-blocking)
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

  // Step 2: Generate contract PDF
  let pdfBuffer: Buffer | null = null;
  try {
    pdfBuffer = await generateContractPDF({
      contactName, contactEmail, businessName,
      signedName, signedAt, signedDate,
      packageName, projectPrice, initials,
    });
  } catch (err) {
    console.error('PDF generation error:', err);
  }

  const pdfAttachment = pdfBuffer
    ? [{ filename: 'Iconik-Studios-Service-Agreement.pdf', content: pdfBuffer }]
    : [];

  // Step 3: Send confirmation to client
  try {
    await resend.emails.send({
      from: 'Iconik Studios <hello@theiconikstudios.com>',
      to: contactEmail,
      subject: 'Your Iconik Studios Contract is Signed ✓',
      attachments: pdfAttachment,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'DM Mono',monospace,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:48px 24px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="padding-bottom:40px;border-bottom:1px solid #C9A84C33;">
          <p style="margin:0;font-size:13px;letter-spacing:0.3em;color:#C9A84C;text-transform:uppercase;font-weight:600;">ICONIK STUDIOS</p>
        </td></tr>
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
            Your signed contract is attached to this email as a PDF. Ricky from Iconik Studios will be in touch within 24 hours to kick off your project.
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
  } catch (err) {
    console.error('Resend client email error:', err);
  }

  // Step 4: Notify Ricky
  try {
    await resend.emails.send({
      from: 'Iconik Studios System <hello@theiconikstudios.com>',
      to: 'theiconikstudios@gmail.com',
      subject: `🎉 New Contract Signed — ${contactName}`,
      attachments: pdfAttachment,
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
          <p style="margin:0 0 32px;font-size:13px;color:#999;">A client has signed their General Service Agreement. PDF attached.</p>
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
          <p style="margin:0;font-size:12px;color:#555;letter-spacing:0.1em;">ICONIK STUDIOS SYSTEM &nbsp;·&nbsp; theiconikstudios.com</p>
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

// ─────────────────────────────────────────────────────────
// PDF Generation
// ─────────────────────────────────────────────────────────

interface PDFData {
  contactName: string;
  contactEmail: string;
  businessName: string;
  signedName: string;
  signedAt: string;
  signedDate: string;
  packageName: string;
  projectPrice: string;
  initials: Record<string, string>;
}

function generateContractPDF(data: PDFData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 72, size: 'LETTER' });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    const GOLD = '#C9A84C';
    const DARK = '#111111';
    const MID = '#444444';
    const GRAY = '#888888';
    const pageWidth = doc.page.width - 144;

    const hr = (color = '#DDDDDD', weight = 0.5) => {
      doc.moveDown(0.5);
      doc.moveTo(72, doc.y).lineTo(72 + pageWidth, doc.y).strokeColor(color).lineWidth(weight).stroke();
      doc.moveDown(0.8);
    };

    const sectionHeading = (text: string) => {
      hr();
      doc.font('Helvetica-Bold').fontSize(8).fillColor(GOLD).text(text.toUpperCase(), { characterSpacing: 1.5 });
      doc.moveDown(0.5);
    };

    const body = (text: string) => {
      doc.font('Helvetica').fontSize(10).fillColor(MID).text(text, { lineGap: 4 });
    };

    const bulletItem = (text: string) => {
      doc.font('Helvetica').fontSize(10).fillColor(MID).text(`—  ${text}`, { indent: 12, lineGap: 3 });
    };

    const addInitials = (key: string) => {
      const val = data.initials?.[key];
      if (val) {
        doc.moveDown(0.4);
        doc.font('Helvetica').fontSize(9).fillColor(GRAY).text(`Initials: ${val}`, { align: 'right' });
      }
    };

    // ── HEADER ──────────────────────────────────
    doc.font('Helvetica-Bold').fontSize(9).fillColor(GOLD).text('ICONIK STUDIOS LLC', { characterSpacing: 2 });
    doc.font('Helvetica').fontSize(8).fillColor(GRAY).text('General Service Agreement');
    doc.moveDown(1.5);
    doc.font('Helvetica-Bold').fontSize(26).fillColor(DARK).text('SERVICE CONTRACT');
    doc.moveDown(0.5);
    doc.moveTo(72, doc.y).lineTo(72 + pageWidth, doc.y).strokeColor(GOLD).lineWidth(1.5).stroke();
    doc.moveDown(1);

    // ── DOCUMENT INFO ──────────────────────────────────
    doc.font('Helvetica').fontSize(9).fillColor(GRAY).text('DATE');
    doc.font('Helvetica').fontSize(10).fillColor(DARK).text(data.signedDate);
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(9).fillColor(GRAY).text('CLIENT');
    doc.font('Helvetica').fontSize(10).fillColor(DARK).text(data.contactName || '—');
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(9).fillColor(GRAY).text('BUSINESS');
    doc.font('Helvetica').fontSize(10).fillColor(DARK).text(data.businessName || '—');
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(9).fillColor(GRAY).text('EMAIL');
    doc.font('Helvetica').fontSize(10).fillColor(DARK).text(data.contactEmail || '—');

    // ── AGREEMENT ──────────────────────────────────
    const today = new Date(data.signedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    sectionHeading('Agreement');
    body(`This General Service Agreement is entered into as of ${today} between Iconik Studios LLC ("Agency") and ${data.contactName}${data.businessName ? ` of ${data.businessName}` : ''} ("Client").`);
    doc.moveDown(0.5);
    body(`I, ${data.contactName}, am hiring ICONIK STUDIOS LLC to design, develop, and deploy the systems and services outlined in the Statement of Work for the total fixed investment of ${data.projectPrice}. I acknowledge this price is based on the selected service package: ${data.packageName}, and the information provided at the time of signing. Any work beyond the agreed scope requires a signed Change Order before work begins.`);

    // ── SELECTED PACKAGE ──────────────────────────────────
    sectionHeading('Selected Service Package');
    doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK).text(data.packageName, { continued: true });
    doc.font('Helvetica').fillColor(GRAY).text('   |   Total Investment: ', { continued: true });
    doc.font('Helvetica-Bold').fillColor(GOLD).text(data.projectPrice);

    // ── PAYMENT SCHEDULE ──────────────────────────────────
    sectionHeading('Payment Schedule');
    doc.font('Helvetica-Bold').fontSize(10).fillColor(GOLD).text('Payment 1', { continued: true });
    doc.font('Helvetica').fillColor(MID).text(' — 50% deposit due at signing to initiate the project');
    doc.font('Helvetica-Bold').fillColor(GOLD).text('Payment 2', { continued: true });
    doc.font('Helvetica').fillColor(MID).text(' — 25% due at final design approval before proceeding to build');
    doc.font('Helvetica-Bold').fillColor(GOLD).text('Payment 3', { continued: true });
    doc.font('Helvetica').fillColor(MID).text(' — 25% due at launch before DNS migration and site go-live');
    doc.moveDown(0.4);
    body('Payments not received within 5 business days incur a $50 late fee plus $25 every 7 days thereafter. The deposit is non-refundable.');

    // ── NOT INCLUDED ──────────────────────────────────
    sectionHeading('What is Not Included');
    [
      'Pages, features, or workflows beyond what is documented in the Statement of Work',
      'Copywriting, content writing, or blog articles',
      'Photography, videography, or custom illustration',
      'Logo design or brand identity work',
      'E-commerce functionality or payment gateway development',
      'Paid advertising setup or management',
      'Hosting, domain, or platform subscription fees',
      'Any service not explicitly listed in the Statement of Work',
    ].forEach(bulletItem);

    // ── CLIENT RESPONSIBILITIES ──────────────────────────────────
    sectionHeading('Client Responsibilities');
    [
      'All written content prior to build commencement',
      'All brand assets (logo, colors, fonts, guidelines)',
      'All photos, videos, and media in high-resolution format',
      'Access to existing domain registrar and hosting account',
      'A single designated point of contact authorized to approve deliverables',
      'Written approval at each milestone before proceeding',
      'Responses to Agency requests within 3 business days',
    ].forEach(bulletItem);

    // ── MUTUAL OBLIGATIONS ──────────────────────────────────
    sectionHeading('Mutual Obligations');
    doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK).text('YOU:');
    body('You have the authority to enter into this agreement on behalf of your company. You agree to provide required assets on time, review deliverables promptly, adhere to agreed deadlines, and make payments according to the schedule in this agreement.');
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK).text('US:');
    body('We have the experience and ability to deliver everything agreed to in this document and will do so in a professional and timely manner. We cannot be held responsible for missed deadlines if required materials, approvals, or access have not been provided on time.');
    addInitials('mutualObligations');

    // ── REVISIONS ──────────────────────────────────
    sectionHeading('Revisions & Change Orders');
    body('This project includes 2 rounds of revisions per deliverable. A revision round is one consolidated list of feedback submitted in a single written communication. Additional rounds are billed at $100/round. Any scope additions require a signed Change Order before work begins. Verbal approvals are not honored under any circumstances.');
    addInitials('revisions');

    // ── IP ──────────────────────────────────
    sectionHeading('Intellectual Property');
    body('Ownership of all final deliverables — website, automation documentation, and design files — transfers to the client upon receipt of full payment. Until that point, all work remains the sole property of Iconik Studios. Third-party platforms (GoHighLevel, Make.com, Elementor Pro) are subject to their own licensing terms and are not transferred under this agreement.');
    addInitials('intellectualProperty');

    // ── DESIGN CREDIT ──────────────────────────────────
    sectionHeading('Design Credit');
    body('Iconik Studios reserves the right to display "Designed by Iconik Studios" on the client\'s website. Removal of this credit requires a one-time fee of $250. Removal does not transfer the design credit to any other party.');
    addInitials('designCredit');

    // ── ERROR REVIEW ──────────────────────────────────
    sectionHeading('Error Review');
    body('A 7-day error review window begins on the date of website migration. This covers migration errors only — not new revisions. Any errors found after 7 days are billed at $100/hour.');
    addInitials('errorReview');

    // ── TERMINATION ──────────────────────────────────
    sectionHeading('Termination');
    body('Either party may terminate this agreement with 7 days written notice. If the client terminates, they remain responsible for all work completed to date billed at $100/hour. The deposit is non-refundable. If Iconik Studios terminates, all completed files will be delivered and any payments beyond completed work will be refunded within 14 business days.');
    addInitials('termination');

    // ── CONFIDENTIALITY ──────────────────────────────────
    sectionHeading('Confidentiality');
    body('Both parties agree to keep all non-public information shared during this engagement strictly confidential — including business processes, automation logic, client data, pricing structures, and system configurations. This obligation survives the completion or termination of this agreement.');
    addInitials('confidentiality');

    // ── LIABILITY ──────────────────────────────────
    sectionHeading('Limitation of Liability');
    body("Iconik Studios' total liability under this agreement shall not exceed the total fees paid by the client. The Agency is not liable for indirect, incidental, or consequential damages, or for results dependent on the client's own sales process, follow-up speed, or market conditions.");
    addInitials('liability');

    // ── DISPUTE RESOLUTION ──────────────────────────────────
    sectionHeading('Dispute Resolution');
    body('In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation. If unresolved within 30 days, the dispute will be submitted to mediation before any legal action. This agreement is governed by the laws of the State of Arizona, and proceedings will take place in the applicable county.');
    addInitials('disputeResolution');

    // ── BINDING CLAUSE ──────────────────────────────────
    hr();
    body('This contract is a legally binding document. If any provision is found invalid or unenforceable, the remaining provisions remain in full effect. This agreement, together with the Statement of Work and any signed Change Orders, constitutes the entire agreement between the parties and supersedes all prior discussions, proposals, or representations — written or verbal.');

    // ── SIGNATURE BLOCK ──────────────────────────────────
    doc.moveDown(1.5);
    doc.moveTo(72, doc.y).lineTo(72 + pageWidth, doc.y).strokeColor(GOLD).lineWidth(1.5).stroke();
    doc.moveDown(0.8);

    doc.font('Helvetica-Bold').fontSize(9).fillColor(GOLD).text('ELECTRONIC SIGNATURE', { characterSpacing: 1.5 });
    doc.moveDown(0.4);
    body('By typing their full legal name below, the client agreed to all terms of this agreement. This constitutes a legally binding electronic signature under the ESIGN Act.');
    doc.moveDown(0.8);

    doc.font('Helvetica').fontSize(9).fillColor(GRAY).text('SIGNED BY');
    doc.font('Helvetica-Bold').fontSize(16).fillColor(DARK).text(data.signedName);
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(9).fillColor(GRAY).text('TIMESTAMP');
    doc.font('Helvetica').fontSize(10).fillColor(DARK).text(data.signedDate);

    if (data.initials && Object.keys(data.initials).length > 0) {
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(9).fillColor(GRAY).text('SECTION INITIALS');
      doc.font('Helvetica').fontSize(9).fillColor(MID).text(
        Object.entries(data.initials).map(([k, v]) => `${k}: ${v}`).join('  ·  ')
      );
    }

    // ── PAGE FOOTER ──────────────────────────────────
    doc.moveDown(2);
    hr('#DDDDDD', 0.5);
    doc.font('Helvetica').fontSize(8).fillColor(GRAY)
      .text('ICONIK STUDIOS LLC  ·  theiconikstudios.com  ·  theiconikstudios@gmail.com', { align: 'center' });
    doc.moveDown(0.3);
    doc.font('Helvetica').fontSize(7).fillColor('#AAAAAA')
      .text('This document was presented electronically. The typed signature constitutes a valid electronic signature under the ESIGN Act.', { align: 'center' });

    doc.end();
  });
}
