export interface ContractPageUIProps {
  contactName: string;
  contactEmail: string;
  businessName: string;
  packageName: string;
  projectPrice: string;
  contactState: string;
  contactCounty: string;
  signedName: string;
  isChecked: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  initials: Record<string, string>;
  onSignedNameChange: (value: string) => void;
  onCheckedChange: (value: boolean) => void;
  onInitialChange: (section: string, value: string) => void;
  onSign: () => void;
}

const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export default function ContractPageUI({
  contactName,
  contactEmail,
  businessName,
  packageName,
  projectPrice,
  contactState,
  contactCounty,
  signedName,
  isChecked,
  isLoading,
  isSuccess,
  error,
  initials,
  onSignedNameChange,
  onCheckedChange,
  onInitialChange,
  onSign,
}: ContractPageUIProps) {
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full border-2 border-[#C9A84C] flex items-center justify-center mx-auto mb-8">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-display text-4xl text-black tracking-tight mb-4 uppercase">
            Contract Signed
          </h1>
          <p className="text-[#C9A84C] font-mono text-sm tracking-[0.2em] uppercase mb-6">
            Successfully
          </p>
          <p className="text-[#666] font-mono text-sm leading-relaxed">
            A copy has been sent to <span className="text-black">{contactEmail}</span>.<br />
            Ricky will be in touch within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="border-b border-black/10 px-6 py-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="font-display text-xl tracking-[0.15em] text-[#C9A84C] uppercase">
            Iconik Studios
          </span>
          <span className="text-xs text-[#999] tracking-[0.15em] uppercase hidden sm:block">
            Legal Document
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 pb-24">
        {/* Document title block */}
        <div className="mb-12 pb-8 border-b border-black/10">
          <p className="text-xs text-[#C9A84C] tracking-[0.3em] uppercase mb-3 font-mono">
            General Service Agreement
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-black tracking-tight uppercase mb-6">
            Service Contract
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-[#999] text-xs tracking-[0.15em] uppercase font-mono">Date</span>
              <p className="text-black mt-1">{today}</p>
            </div>
            <div>
              <span className="text-[#999] text-xs tracking-[0.15em] uppercase font-mono">Client</span>
              <p className="text-black mt-1">{contactName || '—'}</p>
            </div>
            <div>
              <span className="text-[#999] text-xs tracking-[0.15em] uppercase font-mono">Business</span>
              <p className="text-black mt-1">{businessName || '—'}</p>
            </div>
          </div>
        </div>

        {/* Contract body */}
        <div className="text-sm text-[#333] leading-relaxed space-y-10">

          <Section title="Agreement">
            <p>
              This General Service Agreement is entered into as of {today} between Iconik Studios LLC ("Agency") and {contactName}{businessName ? ` of ${businessName}` : ''} ("Client").
            </p>
            <p className="mt-4">
              I, {contactName}, am hiring ICONIK STUDIOS LLC to design, develop, and deploy the systems and services outlined in the Statement of Work for the total fixed investment of{' '}
              <span className="text-[#C9A84C] font-semibold">{projectPrice}</span>.
              I acknowledge this price is based on the selected service package:{' '}
              <span className="text-[#C9A84C] font-semibold">{packageName}</span>,
              and the information provided at the time of signing. Any work beyond the agreed scope requires a signed Change Order before work begins.
            </p>
          </Section>

          <Section title="Selected Service Package">
            <div className="bg-[#f5f5f5] border border-black/10 p-4">
              <span className="text-[#666]">Package: </span>
              <span className="text-black font-medium">{packageName}</span>
              <span className="text-[#bbb] mx-3">|</span>
              <span className="text-[#666]">Total Investment: </span>
              <span className="text-[#C9A84C] font-semibold">{projectPrice}</span>
            </div>
          </Section>

          <Section title="Payment Schedule">
            <ul className="space-y-2">
              <li><span className="text-[#C9A84C] font-medium">Payment 1</span> — 50% deposit due at signing to initiate the project</li>
              <li><span className="text-[#C9A84C] font-medium">Payment 2</span> — 25% due at final design approval before proceeding to build</li>
              <li><span className="text-[#C9A84C] font-medium">Payment 3</span> — 25% due at launch before DNS migration and site go-live</li>
            </ul>
            <p className="mt-3 text-[#555]">
              Payments not received within 5 business days incur a $50 late fee plus $25 every 7 days thereafter. The deposit is non-refundable.
            </p>
          </Section>

          <Section title="What is Not Included">
            <ul className="space-y-1 text-[#555]">
              {[
                'Pages, features, or workflows beyond what is documented in the Statement of Work',
                'Copywriting, content writing, or blog articles',
                'Photography, videography, or custom illustration',
                'Logo design or brand identity work',
                'E-commerce functionality or payment gateway development',
                'Paid advertising setup or management',
                'Hosting, domain, or platform subscription fees',
                'Any service not explicitly listed in the Statement of Work',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#C9A84C]/60 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Client Responsibilities">
            <ul className="space-y-1 text-[#555]">
              {[
                'All written content prior to build commencement',
                'All brand assets (logo, colors, fonts, guidelines)',
                'All photos, videos, and media in high-resolution format',
                'Access to existing domain registrar and hosting account',
                'A single designated point of contact authorized to approve deliverables',
                'Written approval at each milestone before proceeding',
                'Responses to Agency requests within 3 business days',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#C9A84C]/60 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* Divider */}
          <div className="border-t border-black/10 pt-10">
            <p className="text-xs text-[#C9A84C] tracking-[0.3em] uppercase mb-8 font-mono font-semibold">
              Mutual Obligations
            </p>

            <Section title="">
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-black mb-1">YOU:</p>
                  <p className="text-[#444]">
                    You have the authority to enter into this agreement on behalf of your company. You agree to provide required assets on time, review deliverables promptly, adhere to agreed deadlines, and make payments according to the schedule in this agreement.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-black mb-1">US:</p>
                  <p className="text-[#444]">
                    We have the experience and ability to deliver everything agreed to in this document and will do so in a professional and timely manner. We cannot be held responsible for missed deadlines if required materials, approvals, or access have not been provided on time.
                  </p>
                </div>
              </div>
              <InitialField sectionKey="mutualObligations" value={initials['mutualObligations'] ?? ''} onChange={onInitialChange} />
            </Section>
          </div>

          {/* Divider */}
          <div className="border-t border-black/10 pt-10">
            <p className="text-xs text-[#C9A84C] tracking-[0.3em] uppercase mb-8 font-mono font-semibold">
              Terms &amp; Conditions
            </p>

            <div className="space-y-10">

              <Section title="Revisions & Change Orders">
                <p className="text-[#444]">
                  This project includes 2 rounds of revisions per deliverable. A revision round is one consolidated list of feedback submitted in a single written communication. Additional rounds are billed at $100/round. Any scope additions require a signed Change Order before work begins. Verbal approvals are not honored under any circumstances.
                </p>
                <InitialField sectionKey="revisions" value={initials['revisions'] ?? ''} onChange={onInitialChange} />
              </Section>

              <Section title="Intellectual Property">
                <p className="text-[#444]">
                  Ownership of all final deliverables — website, automation documentation, and design files — transfers to the client upon receipt of full payment. Until that point, all work remains the sole property of Iconik Studios. Third-party platforms (GoHighLevel, Make.com, Elementor Pro) are subject to their own licensing terms and are not transferred under this agreement.
                </p>
                <InitialField sectionKey="intellectualProperty" value={initials['intellectualProperty'] ?? ''} onChange={onInitialChange} />
              </Section>

              <Section title="Design Credit">
                <p className="text-[#444]">
                  Iconik Studios reserves the right to display "Designed by Iconik Studios" on the client's website. Removal of this credit requires a one-time fee of $250. Removal does not transfer the design credit to any other party.
                </p>
                <InitialField sectionKey="designCredit" value={initials['designCredit'] ?? ''} onChange={onInitialChange} />
              </Section>

              <Section title="Error Review">
                <p className="text-[#444]">
                  A 7-day error review window begins on the date of website migration. This covers migration errors only — not new revisions. Any errors found after 7 days are billed at $100/hour.
                </p>
                <InitialField sectionKey="errorReview" value={initials['errorReview'] ?? ''} onChange={onInitialChange} />
              </Section>

              <Section title="Termination">
                <p className="text-[#444]">
                  Either party may terminate this agreement with 7 days written notice. If the client terminates, they remain responsible for all work completed to date billed at $100/hour. The deposit is non-refundable. If Iconik Studios terminates, all completed files will be delivered and any payments beyond completed work will be refunded within 14 business days.
                </p>
                <InitialField sectionKey="termination" value={initials['termination'] ?? ''} onChange={onInitialChange} />
              </Section>

              <Section title="Confidentiality">
                <p className="text-[#444]">
                  Both parties agree to keep all non-public information shared during this engagement strictly confidential — including business processes, automation logic, client data, pricing structures, and system configurations. This obligation survives the completion or termination of this agreement.
                </p>
                <InitialField sectionKey="confidentiality" value={initials['confidentiality'] ?? ''} onChange={onInitialChange} />
              </Section>

              <Section title="Limitation of Liability">
                <p className="text-[#444]">
                  Iconik Studios' total liability under this agreement shall not exceed the total fees paid by the client. The Agency is not liable for indirect, incidental, or consequential damages, or for results dependent on the client's own sales process, follow-up speed, or market conditions.
                </p>
                <InitialField sectionKey="liability" value={initials['liability'] ?? ''} onChange={onInitialChange} />
              </Section>

              <Section title="Dispute Resolution">
                <p className="text-[#444]">
                  In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation. If unresolved within 30 days, the dispute will be submitted to mediation before any legal action. This agreement is governed by the laws of the State of {contactState}, and proceedings will take place in {contactCounty ? `${contactCounty} County` : 'the applicable county'}.
                </p>
                <InitialField sectionKey="disputeResolution" value={initials['disputeResolution'] ?? ''} onChange={onInitialChange} />
              </Section>

            </div>
          </div>

          {/* Closing paragraph */}
          <div className="border-t border-black/10 pt-8 text-[#555] text-sm leading-relaxed">
            This contract is a legally binding document. If any provision is found invalid or unenforceable, the remaining provisions remain in full effect. This agreement, together with the Statement of Work and any signed Change Orders, constitutes the entire agreement between the parties and supersedes all prior discussions, proposals, or representations — written or verbal.
          </div>

        </div>

        {/* Signature section */}
        <div className="mt-16 pt-10 border-t border-[#C9A84C]/30">
          <p className="text-xs text-[#C9A84C] tracking-[0.3em] uppercase mb-4 font-mono">
            Electronic Signature
          </p>
          <p className="text-sm text-[#555] leading-relaxed mb-8">
            By typing your full legal name below and clicking Sign Contract, you agree to all terms. This constitutes a legally binding electronic signature.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#999] tracking-[0.15em] uppercase mb-2 font-mono">
                Full Legal Name
              </label>
              <input
                type="text"
                value={signedName}
                onChange={(e) => onSignedNameChange(e.target.value)}
                placeholder="Type your full legal name"
                className="w-full bg-white border border-black/20 text-black text-sm px-4 py-3 outline-none focus:border-[#C9A84C] transition-colors placeholder:text-[#bbb]"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => onCheckedChange(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 border transition-colors ${isChecked ? 'bg-[#C9A84C] border-[#C9A84C]' : 'bg-white border-black/30 group-hover:border-[#C9A84C]'}`}>
                  {isChecked && (
                    <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5">
                      <polyline points="1 6 5 10 11 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-[#555]">
                I have read and agree to all terms of this agreement
              </span>
            </label>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                {error}
              </p>
            )}

            <button
              onClick={onSign}
              disabled={!signedName.trim() || !isChecked || isLoading}
              className="w-full sm:w-auto px-8 py-4 text-sm tracking-[0.2em] uppercase transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed bg-[#C9A84C] text-white font-semibold hover:bg-[#b8963e] active:scale-[0.98]"
            >
              {isLoading ? 'Signing…' : 'Sign Contract →'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-black/10">
          <p className="text-xs text-[#aaa] leading-relaxed font-mono">
            Iconik Studios LLC &nbsp;·&nbsp; theiconikstudios@gmail.com &nbsp;·&nbsp; iconikstudios.com
            <br />
            This document was presented electronically. Your typed signature and checkbox confirmation constitute a valid electronic signature under the ESIGN Act.
          </p>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      {title && (
        <h2 className="text-sm text-[#C9A84C] tracking-[0.25em] uppercase mb-3 font-semibold font-mono">
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}

function InitialField({
  sectionKey,
  value,
  onChange,
}: {
  sectionKey: string;
  value: string;
  onChange: (section: string, value: string) => void;
}) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(sectionKey, e.target.value)}
        placeholder="—"
        maxLength={6}
        className="w-16 border-b-2 border-black/20 focus:border-[#C9A84C] outline-none text-center text-sm py-1 bg-transparent transition-colors placeholder:text-[#ccc]"
      />
      <span className="text-xs text-[#999] uppercase tracking-widest font-mono">(Client Initial)</span>
    </div>
  );
}
