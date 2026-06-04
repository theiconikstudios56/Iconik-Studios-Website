import { useState, FormEvent, CSSProperties } from 'react';

const ACCENT = '#D98235';
const ACCENT_BG = 'rgba(217, 130, 53, 0.08)';
const ACCENT_BORDER = 'rgba(217, 130, 53, 0.2)';
const BLACK = '#0a0a0a';
const WHITE = '#f5f4f0';
const MID = '#1a1a1a';
const BORDER = '#2a2a2a';
const MUTED = '#555';
const RADIUS = '4px';

const WEBHOOK = 'https://hook.us2.make.com/fxujjpj1w5ul1gteoc668dejt99hs0vj';

type FormData = {
  business_name: string;
  address: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  industry: string;
  business_description: string;
  geo_reach: string;
  years_in_business: string;
  ideal_customer: string;
  customer_problems: string;
  customer_priorities: string;
  has_website: string;
  current_url: string;
  primary_cta: string;
  website_goals: string;
  exclusions: string;
  has_brand: string;
  brand_assets_url: string;
  brand_feel: string;
  design_inspiration: string;
  services: string;
  differentiators: string;
  content_copy: boolean;
  content_photos: boolean;
  content_video: boolean;
  content_testimonials: boolean;
  content_none: boolean;
  launch_timeline: string;
  budget: string;
  additional_notes: string;
};

const empty: FormData = {
  business_name: '', address: '', first_name: '', last_name: '', email: '', phone: '',
  industry: '', business_description: '', geo_reach: '', years_in_business: '',
  ideal_customer: '', customer_problems: '', customer_priorities: '',
  has_website: '', current_url: '', primary_cta: '', website_goals: '', exclusions: '',
  has_brand: '', brand_assets_url: '', brand_feel: '', design_inspiration: '',
  services: '', differentiators: '',
  content_copy: false, content_photos: false, content_video: false,
  content_testimonials: false, content_none: false,
  launch_timeline: '', budget: '', additional_notes: '',
};

const s = {
  body: {
    background: BLACK, color: WHITE, fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300, minHeight: '100vh', padding: '60px 24px 100px',
  } as CSSProperties,
  wrapper: { maxWidth: 680, margin: '0 auto' } as CSSProperties,
  header: {
    marginBottom: 64, paddingBottom: 40,
    borderBottom: `1px solid ${BORDER}`,
  } as CSSProperties,
  logoTag: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 13,
    letterSpacing: '0.3em', color: ACCENT, marginBottom: 20, display: 'block',
  } as CSSProperties,
  h1: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 'clamp(48px, 10vw, 80px)',
    lineHeight: 0.92, letterSpacing: '0.02em', marginBottom: 24,
  } as CSSProperties,
  subtitle: { fontSize: 15, lineHeight: 1.7, color: '#888', maxWidth: 480 } as CSSProperties,
  section: { marginBottom: 56 } as CSSProperties,
  sectionLabel: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 } as CSSProperties,
  sectionNum: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 11,
    letterSpacing: '0.25em', color: ACCENT, background: ACCENT_BG,
    border: `1px solid ${ACCENT_BORDER}`, padding: '4px 10px', borderRadius: 2,
  } as CSSProperties,
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 22,
    letterSpacing: '0.08em', color: WHITE,
  } as CSSProperties,
  field: { marginBottom: 24 } as CSSProperties,
  label: {
    display: 'block', fontSize: 13, fontWeight: 500,
    letterSpacing: '0.05em', color: '#aaa', marginBottom: 8, textTransform: 'uppercase',
  } as CSSProperties,
  required: { color: ACCENT, marginLeft: 3 } as CSSProperties,
  input: {
    width: '100%', background: MID, border: `1px solid ${BORDER}`,
    borderRadius: RADIUS, color: WHITE, fontFamily: "'DM Sans', sans-serif",
    fontSize: 15, fontWeight: 300, padding: '14px 16px', outline: 'none',
    transition: 'border-color 0.2s, background 0.2s', boxSizing: 'border-box',
    WebkitAppearance: 'none', appearance: 'none',
  } as CSSProperties,
  textarea: {
    width: '100%', background: MID, border: `1px solid ${BORDER}`,
    borderRadius: RADIUS, color: WHITE, fontFamily: "'DM Sans', sans-serif",
    fontSize: 15, fontWeight: 300, padding: '14px 16px', outline: 'none',
    transition: 'border-color 0.2s, background 0.2s', boxSizing: 'border-box',
    resize: 'vertical' as const, minHeight: 110, lineHeight: 1.6,
  } as CSSProperties,
  select: {
    width: '100%', background: MID, border: `1px solid ${BORDER}`,
    borderRadius: RADIUS, color: WHITE, fontFamily: "'DM Sans', sans-serif",
    fontSize: 15, fontWeight: 300, padding: '14px 40px 14px 16px', outline: 'none',
    transition: 'border-color 0.2s, background 0.2s', boxSizing: 'border-box',
    cursor: 'pointer', WebkitAppearance: 'none', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23555' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C%2Fsvg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
  } as CSSProperties,
  radioGroup: { display: 'flex', flexDirection: 'column' as const, gap: 10 } as CSSProperties,
  radioGroupInline: { display: 'flex', flexWrap: 'wrap' as const, gap: 10 } as CSSProperties,
  radioOption: {
    display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
    padding: '12px 16px', border: `1px solid ${BORDER}`, borderRadius: RADIUS,
    background: MID, fontSize: 14, color: '#bbb', userSelect: 'none' as const,
    flex: '0 0 auto',
  } as CSSProperties,
  hint: { fontSize: 12, color: MUTED, marginTop: 6 } as CSSProperties,
  divider: { height: 1, background: BORDER, margin: '56px 0' } as CSSProperties,
  submitArea: { paddingTop: 8 } as CSSProperties,
  submitNote: { fontSize: 13, color: MUTED, marginBottom: 24, lineHeight: 1.6 } as CSSProperties,
  btnSubmit: {
    display: 'inline-flex', alignItems: 'center', gap: 12,
    background: ACCENT, color: BLACK, border: 'none', borderRadius: RADIUS,
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.12em',
    padding: '18px 40px', cursor: 'pointer', transition: 'transform 0.15s, opacity 0.15s',
  } as CSSProperties,
  footerNote: { marginTop: 40, fontSize: 12, color: '#3a3a3a', lineHeight: 1.6 } as CSSProperties,
  successScreen: { textAlign: 'center' as const, padding: '80px 0' } as CSSProperties,
  successIcon: { fontSize: 48, marginBottom: 24 } as CSSProperties,
  successH2: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: 48,
    color: ACCENT, marginBottom: 16,
  } as CSSProperties,
  successP: { color: '#888', fontSize: 15, lineHeight: 1.7 } as CSSProperties,
};

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div style={s.field}>
      <label style={s.label}>
        {label}{required && <span style={s.required}>*</span>}
      </label>
      {children}
      {hint && <p style={s.hint}>{hint}</p>}
    </div>
  );
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div style={s.sectionLabel}>
      <span style={s.sectionNum}>{num}</span>
      <span style={s.sectionTitle}>{title}</span>
    </div>
  );
}

export default function IntakePage() {
  const [form, setForm] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(f => ({ ...f, [key]: e.target.value }));

  const setCheck = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.checked }));

  const setRadio = (key: keyof FormData, value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  const focusStyle = (name: string): CSSProperties => ({
    borderColor: focusedField === name ? ACCENT : BORDER,
    background: focusedField === name ? '#1e1e1e' : MID,
  });

  const inputProps = (name: keyof FormData) => ({
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
    style: { ...s.input, ...focusStyle(name) },
  });

  const textareaProps = (name: keyof FormData) => ({
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
    style: { ...s.textarea, ...focusStyle(name) },
  });

  const selectProps = (name: keyof FormData) => ({
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
    style: { ...s.select, ...focusStyle(name) },
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const payload: Record<string, unknown> = { ...form };
    const contentArr: string[] = [];
    if (form.content_copy) contentArr.push('Written copy');
    if (form.content_photos) contentArr.push('Professional photos');
    if (form.content_video) contentArr.push('Video');
    if (form.content_testimonials) contentArr.push('Testimonials');
    if (form.content_none) contentArr.push('None yet');
    delete payload.content_copy; delete payload.content_photos;
    delete payload.content_video; delete payload.content_testimonials;
    delete payload.content_none;
    if (contentArr.length) payload.existing_content = contentArr;

    await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const RadioOption = ({ name, value, label }: { name: keyof FormData; value: string; label?: string }) => (
    <label style={{ ...s.radioOption, borderColor: form[name] === value ? ACCENT_BORDER : BORDER }}>
      <input
        type="radio"
        checked={form[name] === value}
        onChange={() => setRadio(name, value)}
        style={{ width: 16, height: 16, accentColor: ACCENT, cursor: 'pointer', flexShrink: 0 }}
      />
      {label ?? value}
    </label>
  );

  const CheckOption = ({ name, label }: { name: keyof FormData; label: string }) => (
    <label style={{ ...s.radioOption, flex: 'unset', borderColor: form[name] ? ACCENT_BORDER : BORDER }}>
      <input
        type="checkbox"
        checked={form[name] as boolean}
        onChange={setCheck(name)}
        style={{ width: 16, height: 16, accentColor: ACCENT, cursor: 'pointer', flexShrink: 0 }}
      />
      {label}
    </label>
  );

  return (
    <div style={s.body}>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <div style={s.wrapper}>
        {submitted ? (
          <div style={s.successScreen}>
            <div style={s.successIcon}>✦</div>
            <h2 style={s.successH2}>We've Got It.</h2>
            <p style={s.successP}>
              Thanks for taking the time to fill this out.<br />
              The Iconik Studios team will be in touch within 1–2 business days.
            </p>
          </div>
        ) : (
          <>
            <div style={s.header}>
              <span style={s.logoTag}>ICONIK STUDIOS — CLIENT INTAKE</span>
              <h1 style={s.h1}>
                Let's Build<br />Something <span style={{ color: ACCENT }}>Great.</span>
              </h1>
              <p style={s.subtitle}>
                Before we touch a single pixel, we need to understand your business inside and out.
                Take your time — the more detail you give us, the better your website will be.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Section 1: Business Basics */}
              <div style={s.section}>
                <SectionHeader num="01" title="Business Basics" />
                <Field label="Business Name" required>
                  <input type="text" placeholder="e.g. Acme Co." required value={form.business_name} onChange={set('business_name')} {...inputProps('business_name')} />
                </Field>
                <Field label="Business Address">
                  <input type="text" placeholder="123 Main St, Suite 100" value={form.address} onChange={set('address')} {...inputProps('address')} />
                </Field>
                <Field label="First Name" required>
                  <input type="text" placeholder="First name" required value={form.first_name} onChange={set('first_name')} {...inputProps('first_name')} />
                </Field>
                <Field label="Last Name" required>
                  <input type="text" placeholder="Last name" required value={form.last_name} onChange={set('last_name')} {...inputProps('last_name')} />
                </Field>
                <Field label="Email Address" required>
                  <input type="email" placeholder="you@yourcompany.com" required value={form.email} onChange={set('email')} {...inputProps('email')} />
                </Field>
                <Field label="Phone Number">
                  <input type="tel" placeholder="+1 (000) 000-0000" value={form.phone} onChange={set('phone')} {...inputProps('phone')} />
                </Field>
                <Field label="Industry / Niche" required>
                  <input type="text" placeholder="e.g. Real Estate, E-commerce, Health & Wellness" required value={form.industry} onChange={set('industry')} {...inputProps('industry')} />
                </Field>
                <Field label="What does your business do, and how do you make money?" required>
                  <textarea placeholder="Describe your services or products, your business model, and what sets you apart at a high level." required value={form.business_description} onChange={set('business_description')} {...textareaProps('business_description')} />
                </Field>
                <Field label="Geographic Reach" required>
                  <div style={s.radioGroupInline}>
                    {['Local', 'Regional', 'National', 'International'].map(v => (
                      <RadioOption key={v} name="geo_reach" value={v} />
                    ))}
                  </div>
                </Field>
                <Field label="How long have you been in business?">
                  <select value={form.years_in_business} onChange={set('years_in_business')} {...selectProps('years_in_business')}>
                    <option value="" disabled>Select one</option>
                    <option>Less than 1 year</option>
                    <option>1–3 years</option>
                    <option>3–5 years</option>
                    <option>5–10 years</option>
                    <option>10+ years</option>
                  </select>
                </Field>
              </div>

              <div style={s.divider} />

              {/* Section 2: Target Audience */}
              <div style={s.section}>
                <SectionHeader num="02" title="Target Audience" />
                <Field label="Who is your ideal customer?" required>
                  <textarea placeholder="Describe them — age range, profession, lifestyle, income level, values. Be as specific as possible." required value={form.ideal_customer} onChange={set('ideal_customer')} {...textareaProps('ideal_customer')} />
                </Field>
                <Field label="What problems do your customers come to you to solve?" required>
                  <textarea placeholder="What pain points, frustrations, or challenges are they dealing with that your business addresses?" required value={form.customer_problems} onChange={set('customer_problems')} {...textareaProps('customer_problems')} />
                </Field>
                <Field label="What do your customers care most about when choosing a business like yours?">
                  <textarea placeholder="e.g. price, speed, quality, trust, reputation, convenience..." value={form.customer_priorities} onChange={set('customer_priorities')} {...textareaProps('customer_priorities')} />
                </Field>
              </div>

              <div style={s.divider} />

              {/* Section 3: Goals & Website Vision */}
              <div style={s.section}>
                <SectionHeader num="03" title="Goals & Website Vision" />
                <Field label="Do you currently have a website?" required>
                  <div style={s.radioGroupInline}>
                    <RadioOption name="has_website" value="Yes" />
                    <RadioOption name="has_website" value="No" />
                  </div>
                </Field>
                <Field label="Current Website URL" hint="Leave blank if you don't have one yet.">
                  <input type="url" placeholder="https://www.yoursite.com" value={form.current_url} onChange={set('current_url')} {...inputProps('current_url')} />
                </Field>
                <Field label="What is the single most important action you want visitors to take on your new site?" required>
                  <input type="text" placeholder="e.g. Book a free consultation, Request a quote, Buy a product" required value={form.primary_cta} onChange={set('primary_cta')} {...inputProps('primary_cta')} />
                </Field>
                <Field label="What are your top 3 goals for this website?" required>
                  <textarea placeholder="e.g. Generate more leads, Build credibility, Showcase our portfolio, Drive online sales..." required value={form.website_goals} onChange={set('website_goals')} {...textareaProps('website_goals')} />
                </Field>
                <Field label="Is there anything you specifically do NOT want on your site?">
                  <textarea placeholder="e.g. Certain colors, styles, types of content, or features you want to avoid." value={form.exclusions} onChange={set('exclusions')} {...textareaProps('exclusions')} />
                </Field>
              </div>

              <div style={s.divider} />

              {/* Section 4: Brand & Visual Identity */}
              <div style={s.section}>
                <SectionHeader num="04" title="Brand & Visual Identity" />
                <Field label="Do you have existing brand guidelines?" required>
                  <div style={s.radioGroupInline}>
                    <RadioOption name="has_brand" value="Yes — full brand kit" />
                    <RadioOption name="has_brand" value="Partial — logo only" />
                    <RadioOption name="has_brand" value="In progress" />
                    <RadioOption name="has_brand" value="No — starting from scratch" />
                  </div>
                </Field>
                <Field label="Brand Assets Link" hint="Share logos, colors, fonts, or any existing brand materials here.">
                  <input type="url" placeholder="Google Drive, Dropbox, or any shared folder link" value={form.brand_assets_url} onChange={set('brand_assets_url')} {...inputProps('brand_assets_url')} />
                </Field>
                <Field label="How should your brand feel?" required>
                  <textarea placeholder="Pick 3–5 words or phrases. e.g. Bold and confident. Premium but approachable. Clean and minimal. Warm and community-driven." required value={form.brand_feel} onChange={set('brand_feel')} {...textareaProps('brand_feel')} />
                </Field>
                <Field label="Websites you love the look of">
                  <textarea placeholder="Paste URLs and tell us what you like about each one. These don't have to be in your industry." value={form.design_inspiration} onChange={set('design_inspiration')} {...textareaProps('design_inspiration')} />
                </Field>
              </div>

              <div style={s.divider} />

              {/* Section 5: Content & Messaging */}
              <div style={s.section}>
                <SectionHeader num="05" title="Content & Messaging" />
                <Field label="What are your main services or products?" required>
                  <textarea placeholder="List them out. Include a short description of each if you can." required value={form.services} onChange={set('services')} {...textareaProps('services')} />
                </Field>
                <Field label="What makes you different from your competitors?" required>
                  <textarea placeholder="Why should someone choose you over everyone else? What do you do better, faster, or differently?" required value={form.differentiators} onChange={set('differentiators')} {...textareaProps('differentiators')} />
                </Field>
                <Field label="Do you have existing content ready to use?">
                  <div style={s.radioGroup}>
                    <CheckOption name="content_copy" label="Written copy (service descriptions, about us, etc.)" />
                    <CheckOption name="content_photos" label="Professional photos or images" />
                    <CheckOption name="content_video" label="Video content" />
                    <CheckOption name="content_testimonials" label="Customer testimonials or reviews" />
                    <CheckOption name="content_none" label="None yet — starting fresh" />
                  </div>
                </Field>
              </div>

              <div style={s.divider} />

              {/* Section 6: Project Details */}
              <div style={s.section}>
                <SectionHeader num="06" title="Project Details" />
                <Field label="Target Launch Date">
                  <select value={form.launch_timeline} onChange={set('launch_timeline')} {...selectProps('launch_timeline')}>
                    <option value="" disabled>Select a timeframe</option>
                    <option>ASAP — within 2 weeks</option>
                    <option>Within 1 month</option>
                    <option>Within 2–3 months</option>
                    <option>Within 3–6 months</option>
                    <option>Flexible — no hard deadline</option>
                  </select>
                </Field>
                <Field label="Budget Range">
                  <select value={form.budget} onChange={set('budget')} {...selectProps('budget')}>
                    <option value="" disabled>Select a range</option>
                    <option>Under $1,000</option>
                    <option>$1,000 – $2,500</option>
                    <option>$2,500 – $5,000</option>
                    <option>$5,000 – $10,000</option>
                    <option>$10,000+</option>
                    <option>Let's discuss</option>
                  </select>
                </Field>
                <Field label="Anything else we should know?">
                  <textarea placeholder="Specific requirements, concerns, past experiences with web design, or anything else that would help us serve you better." value={form.additional_notes} onChange={set('additional_notes')} {...textareaProps('additional_notes')} />
                </Field>
              </div>

              {/* Submit */}
              <div style={s.submitArea}>
                <p style={s.submitNote}>
                  Once you submit, a member of the Iconik Studios team will review your responses
                  and reach out within 1–2 business days to schedule your kickoff call.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ ...s.btnSubmit, opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Submitting...' : 'Submit My Brief'}
                  {!submitting && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <p style={s.footerNote}>
                  Your information is kept strictly confidential and used only to prepare for your project. — Iconik Studios
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
