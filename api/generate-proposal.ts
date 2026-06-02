import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { notes, clientName, clientIndustry } = req.body;
  if (!notes) return res.status(400).json({ error: 'Notes are required' });

  const prompt = `You are a senior proposal writer for Iconik Studios, a boutique digital agency in Phoenix, AZ specializing in custom web design, AI automation, and growth systems for small and medium businesses.

Your job: read these discovery call notes and generate a complete, personalized business proposal JSON object. Every field must be tailored specifically to this client — never generic.

DISCOVERY CALL NOTES:
${notes}

Client name provided: ${clientName || 'extract from notes'}
Client industry provided: ${clientIndustry || 'extract from notes'}

TIER SELECTION RULES — choose ONE based on signals in the notes:
- "starter" — client has no website or very outdated site, very small/new business, tight or limited budget mentioned, solo operator, just getting started online
- "growth" — existing business actively getting leads but losing them due to slow follow-up, wants CRM + automation, moderate budget, service business with active lead flow, mentions losing leads or needing better systems
- "scale" — established business generating significant revenue ($20K+/month signals), wants everything connected, multiple staff or locations, mentions scaling, no budget hesitation, wants full AI suite

SLUG RULES:
- Use company name (or client name if no company): lowercase, hyphens only, no special chars, no timestamps
- Example: "Phoenix Med Spa" → "phoenix-med-spa"

ICONIK STUDIOS REAL PRICING TIERS (use these exact prices and features — do not invent):

Starter $1,500 one-time (7–10 business days):
Features: 5-page conversion-optimized website, WordPress + Elementor Pro, Mobile-first responsive design, Google Business Profile setup, Basic AI chatbot (GoHighLevel), Social media setup for 2 platforms, Lead capture form connected to CRM, Basic on-page SEO, Google Analytics 4 + Search Console, SSL and speed optimization, 30-minute Loom walkthrough

Growth $3,500 one-time (14–18 business days) — MOST POPULAR:
Features: Everything in Starter, Advanced SEO + schema markup + local citations, GoHighLevel CRM with custom pipeline (5–7 stages), Email automation sequence (5–7 emails), AI chatbot with lead qualification + appointment booking, 1 automation workflow (lead → CRM → email → SMS), Review request automation, Appointment reminder automation (email + SMS), Social media setup across 3 platforms, 60-minute strategy session, 14-day post-launch support

Scale $7,500 one-time (21–28 business days):
Features: Everything in Growth, Full AI automation suite + sales pipeline automation, AI-assisted support chatbot with dynamic responses, 30-day social media content automation system, Reputation management system (review requests + monitoring + alerts), Email broadcast setup + 2 launch campaigns, GoHighLevel white-label sub-account, Monthly performance dashboard, 60-day post-launch support + 2 check-in calls, 90-minute strategy + onboarding session, 3 custom automation workflows, Full team training (45-min Loom library)

Return ONLY valid JSON. No markdown, no explanation, no backticks. Just the JSON object.

{
  "slug": "company-name-slug",
  "client_name": "full name",
  "client_industry": "industry",
  "client_company": "company name",
  "selected_tier": "starter|growth|scale",

  "exec_situation": "2-3 sentences about their specific situation and pain point",
  "exec_proposal": "2-3 sentences about what Iconik will specifically build for them",
  "exec_outcome": "1-2 sentences on expected outcome and which package is recommended with its price",

  "problem_headline": "THEIR SPECIFIC PROBLEM IN 4-5 WORDS ALL CAPS",
  "problem_body": "Two paragraphs about their specific problem. First paragraph: the immediate pain. Second paragraph: the deeper business cost of not fixing it.",
  "problem_symptom_1": "specific symptom extracted from notes",
  "problem_symptom_2": "specific symptom extracted from notes",
  "problem_symptom_3": "specific symptom extracted from notes",
  "problem_symptom_4": "specific symptom extracted from notes",
  "problem_callout": "A powerful pull quote about their specific problem in quotes",

  "vision_stat_1_num": "a specific outcome number relevant to their industry (e.g. 3x, 47%, 2x)",
  "vision_stat_1_label": "what that number means for their business — specific to their industry",
  "vision_stat_2_num": "10+ hrs",
  "vision_stat_2_label": "Saved per week from automated follow-up and lead routing",
  "vision_stat_3_num": "100%",
  "vision_stat_3_label": "Custom-built — no templates, no limits, no compromise",

  "solution_cards": [
    { "icon": "ti-layout", "title": "Custom Website", "body": "tailored 2-sentence description for this client's specific situation" },
    { "icon": "ti-robot", "title": "AI Automation", "body": "tailored 2-sentence description for this client's specific situation" },
    { "icon": "ti-search", "title": "SEO Foundation", "body": "tailored 2-sentence description for this client's specific situation" }
  ],

  "scope_phases": [
    {
      "number": "01",
      "name": "Discovery & Strategy",
      "description": "tailored 2-sentence description referencing their specific business",
      "note": "What we need from you: specific items relevant to their business",
      "pills": ["Brand audit", "Sitemap", "Tech spec", "Kickoff call"]
    },
    {
      "number": "02",
      "name": "Design & Prototype",
      "description": "tailored 2-sentence description",
      "note": "What we need from you: timely feedback within 48 hours to stay on schedule",
      "pills": ["Figma mockups", "Brand alignment", "Two review rounds", "Client sign-off"]
    },
    {
      "number": "03",
      "name": "Build & Launch",
      "description": "tailored 2-sentence description referencing their specific tech needs",
      "note": "What we need from you: domain access and hosting credentials",
      "pills": ["Development", "CRM integration", "QA testing", "Vercel deploy", "Handoff walkthrough"]
    }
  ],

  "timeline_weeks": 6,
  "timeline_phases": [
    { "week": "Week 1–2", "name": "Discovery", "detail": "Strategy, spec, sitemap" },
    { "week": "Week 2–3", "name": "Design", "detail": "Mockups, review, approval" },
    { "week": "Week 3–5", "name": "Build", "detail": "Development & QA" },
    { "week": "Week 6", "name": "Launch", "detail": "Deploy & handoff", "highlight": true }
  ],

  "pricing_tiers": [
    {
      "label": "Starter",
      "price": "$1,500",
      "period": "one-time",
      "features": ["5-page conversion-optimized website", "Google Business Profile setup", "Basic AI chatbot (GoHighLevel)", "Social media setup for 2 platforms", "Lead capture form + CRM connection", "Basic on-page SEO", "Google Analytics 4 + Search Console", "30-minute Loom walkthrough"]
    },
    {
      "label": "Growth",
      "price": "$3,500",
      "period": "one-time",
      "popular": true,
      "features": ["Everything in Starter", "Advanced SEO + schema markup + local citations", "GoHighLevel CRM with custom pipeline", "Email automation sequence (5–7 emails)", "AI chatbot with lead qualification + booking", "1 automation workflow (lead → CRM → email → SMS)", "Review request + appointment reminder automation", "Social media setup across 3 platforms", "60-minute strategy session", "14-day post-launch support"]
    },
    {
      "label": "Scale",
      "price": "$7,500",
      "period": "one-time",
      "features": ["Everything in Growth", "Full AI automation suite", "30-day social media content automation", "Reputation management system", "GoHighLevel white-label sub-account", "Monthly performance dashboard", "3 custom automation workflows", "60-day post-launch support + 2 check-in calls", "90-minute strategy + onboarding session", "Full team training (Loom library)"]
    }
  ],

  "pricing_recommendation_reason": "One sentence explaining why this specific tier is the right fit for this client based on their situation, goals, and signals from the notes. Reference their company name or industry specifically.",

  "cta_headline": "READY TO BUILD?"
}`;

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 4000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const clean = text.replace(/```json|```/g, '').trim();
    const proposal = JSON.parse(clean);

    if (proposal.slug) {
      proposal.slug = generateSlug(proposal.slug);
    }

    res.status(200).json({ proposal });
  } catch (error: any) {
    console.error('Generation error:', error);
    res.status(500).json({ error: 'Failed to generate proposal', details: error.message });
  }
}
