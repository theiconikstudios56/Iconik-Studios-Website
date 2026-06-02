export interface Deliverable {
  id: string;
  label: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
}

export const CLIENT_DELIVERABLES: Deliverable[] = [
  {
    id: 'website',
    label: 'Website Design',
    tagline: 'Custom-coded. Conversion-optimized.',
    description:
      'A fully hand-coded website built around your brand identity and engineered to convert visitors into leads. No templates, no drag-and-drop — every element is purpose-built for your business.',
    features: [
      '5-page conversion-optimized layout',
      'Mobile-first responsive design',
      'Brand-aligned custom UI',
      'Google Analytics 4 integration',
      'Performance & speed optimization',
      'SSL configuration',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Vercel'],
  },
  {
    id: 'ai_automation',
    label: 'AI Automation Workflows',
    tagline: 'Intelligent systems that work 24/7.',
    description:
      'AI-powered automation workflows that qualify leads, trigger follow-up sequences, and surface insights — all without manual intervention. From first touch to closed deal.',
    features: [
      'Lead qualification logic',
      'Automated follow-up sequences',
      'CRM pipeline triggers',
      'Appointment booking integration',
      'AI chatbot configuration',
      'Performance monitoring',
    ],
    techStack: ['GoHighLevel', 'OpenAI', 'Make.com', 'Zapier'],
  },
  {
    id: 'lead_capture',
    label: 'Lead Capturing Pipelines',
    tagline: 'Every inquiry captured and routed.',
    description:
      'Multi-channel lead capture connected to your CRM in real time. Forms, chatbots, social DMs, and Google — every entry point feeds one unified pipeline.',
    features: [
      'Multi-step lead capture forms',
      'GoHighLevel CRM integration',
      'Custom pipeline stages (5–7)',
      'Lead source tracking',
      'Instant lead notifications',
      'Duplicate detection',
    ],
    techStack: ['GoHighLevel', 'Webhooks', 'Zapier'],
  },
  {
    id: 'follow_up',
    label: 'Automated Follow-ups',
    tagline: 'Zero leads left behind.',
    description:
      'A complete nurture system that responds within 60 seconds and follows up across email, SMS, and voicemail until the lead books or opts out.',
    features: [
      '5–7 email nurture sequence',
      'SMS follow-up automation',
      'Voicemail drop capability',
      'Review request automation',
      'Appointment reminder (24h + 1h)',
      'Re-engagement campaigns',
    ],
    techStack: ['GoHighLevel', 'Twilio', 'Mailgun'],
  },
  {
    id: 'reputation',
    label: 'Reputation Management',
    tagline: 'Build trust at scale.',
    description:
      'Automated review request campaigns that turn happy clients into public proof. Includes monitoring, alerts, and response templates to protect and grow your online reputation.',
    features: [
      'Automated review requests (post-job)',
      'Google + Facebook monitoring',
      'Alert system for new reviews',
      'Response templates',
      'Review widget for website',
      'Monthly reputation report',
    ],
    techStack: ['GoHighLevel', 'Google Business API'],
  },
  {
    id: 'maintenance',
    label: 'Continuous Maintenance',
    tagline: 'Always on. Always updated.',
    description:
      'Ongoing site health monitoring, security patches, content updates, and monthly performance reports. Your site stays fast, secure, and current without you lifting a finger.',
    features: [
      'Security patch monitoring',
      'Monthly content updates',
      'Performance benchmarking',
      'Uptime monitoring',
      'Monthly report delivery',
      'Priority support access',
    ],
    techStack: ['Vercel', 'Cloudflare', 'Sentry'],
  },
];
