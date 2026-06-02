export interface ProposalSolutionCard {
  icon: string;
  title: string;
  body: string;
}

export interface ProposalScopePhase {
  number: string;
  name: string;
  description: string;
  note: string;
  pills: string[];
}

export interface ProposalTimelinePhase {
  week: string;
  name: string;
  detail: string;
  highlight?: boolean;
}

export interface ProposalPricingTier {
  label: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export interface Proposal {
  id: string;
  slug: string;
  client_name: string;
  client_email: string | null;
  client_industry: string;
  client_company: string;
  status: 'draft' | 'published' | 'expired';

  published_at: string | null;
  expires_at: string | null;

  exec_situation: string;
  exec_proposal: string;
  exec_outcome: string;

  problem_headline: string;
  problem_body: string;
  problem_symptom_1: string;
  problem_symptom_2: string;
  problem_symptom_3: string;
  problem_symptom_4: string;
  problem_callout: string;

  vision_stat_1_num: string;
  vision_stat_1_label: string;
  vision_stat_2_num: string;
  vision_stat_2_label: string;
  vision_stat_3_num: string;
  vision_stat_3_label: string;
  vision_stat_4_num: string;
  vision_stat_4_label: string;

  solution_cards: ProposalSolutionCard[];
  scope_phases: ProposalScopePhase[];
  timeline_weeks: number;
  timeline_phases: ProposalTimelinePhase[];
  selected_tier: string;
  pricing_tiers: ProposalPricingTier[];
  pricing_recommendation_reason: string;

  cta_headline: string;
  raw_notes: string;

  approved_at: string | null;
  approved_by_name: string | null;

  created_at: string;
  updated_at: string;
}
