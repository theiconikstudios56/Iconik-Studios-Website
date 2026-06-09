import React from 'react';
import { Proposal } from '../../types/proposal';
import ProposalHeader from './ProposalHeader';
import ProposalCover from './ProposalCover';
import ProposalExecSummary from './ProposalExecSummary';
import ProposalProblem from './ProposalProblem';
import ProposalVision from './ProposalVision';
import ProposalSolution from './ProposalSolution';
import ProposalScope from './ProposalScope';
import ProposalProof from './ProposalProof';
import ProposalPricing from './ProposalPricing';
import ProposalCTA from './ProposalCTA';
import ProposalEndSlide from './ProposalEndSlide';

interface Props {
  proposal: Partial<Proposal>;
}

// Fills in placeholder values so components don't crash on empty drafts
function withDefaults(p: Partial<Proposal>): Proposal {
  return {
    id: p.id ?? '',
    slug: p.slug ?? '',
    client_name: p.client_name ?? 'Client Name',
    client_email: p.client_email ?? null,
    client_industry: p.client_industry ?? 'Industry',
    client_company: p.client_company ?? 'Company',
    status: p.status ?? 'draft',
    published_at: p.published_at ?? null,
    expires_at: p.expires_at ?? null,
    approved_at: p.approved_at ?? null,
    approved_by_name: p.approved_by_name ?? null,
    exec_situation: p.exec_situation ?? '',
    exec_proposal: p.exec_proposal ?? '',
    exec_outcome: p.exec_outcome ?? '',
    problem_headline: p.problem_headline ?? 'YOUR HEADLINE HERE',
    problem_body: p.problem_body ?? '',
    problem_symptom_1: p.problem_symptom_1 ?? '',
    problem_symptom_2: p.problem_symptom_2 ?? '',
    problem_symptom_3: p.problem_symptom_3 ?? '',
    problem_symptom_4: p.problem_symptom_4 ?? '',
    problem_callout: p.problem_callout ?? '',
    vision_stat_1_num: p.vision_stat_1_num ?? '3x',
    vision_stat_1_label: p.vision_stat_1_label ?? '',
    vision_stat_2_num: p.vision_stat_2_num ?? '10+ hrs',
    vision_stat_2_label: p.vision_stat_2_label ?? '',
    vision_stat_3_num: p.vision_stat_3_num ?? '100%',
    vision_stat_3_label: p.vision_stat_3_label ?? '',
    vision_stat_4_num: p.vision_stat_4_num ?? '24/7',
    vision_stat_4_label: p.vision_stat_4_label ?? '',
    solution_cards: p.solution_cards ?? [],
    scope_phases: p.scope_phases ?? [],
    timeline_weeks: p.timeline_weeks ?? 6,
    timeline_phases: p.timeline_phases ?? [],
    selected_tier: p.selected_tier ?? 'growth',
    pricing_tiers: p.pricing_tiers ?? [],
    pricing_recommendation_reason: p.pricing_recommendation_reason ?? '',
    cta_headline: p.cta_headline ?? 'READY TO BUILD?',
    raw_notes: p.raw_notes ?? '',
    created_at: p.created_at ?? '',
    updated_at: p.updated_at ?? '',
  };
}

export default function ProposalPreviewPanel({ proposal }: Props) {
  const p = withDefaults(proposal);

  return (
    <div style={{
      background: '#050505',
      color: '#F5F5F5',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      minHeight: '100vh',
    }}>
      {/* Draft watermark banner */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 200,
        background: '#1a0f00',
        border: '1px solid #D98235',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <span style={{
          background: '#D98235',
          color: '#000',
          fontSize: '9px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '2px 8px',
          fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          Preview — Draft
        </span>
        <span style={{ fontSize: '11px', color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>
          This is how the proposal will look when published. Scroll to review all sections.
        </span>
      </div>

      <ProposalHeader proposal={p} />

      {/* All slides stacked — no snap scroll in preview */}
      <div>
        <ProposalCover proposal={p} />
        <ProposalExecSummary proposal={p} />
        <ProposalProblem proposal={p} />
        <ProposalVision proposal={p} />
        <ProposalSolution proposal={p} isAdminPreview={true} />
        <ProposalScope proposal={p} />
        <ProposalProof proposal={p} />
        <ProposalPricing proposal={p} />
        <ProposalCTA proposal={p} />
        <ProposalEndSlide proposal={p} />
      </div>
    </div>
  );
}
