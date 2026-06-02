import { useState } from 'react';
import { Check } from 'lucide-react';
import { Slide, StaggerContainer, StaggerChild } from './Slide';
import { Proposal, ProposalPricingTier } from '../../types/proposal';

interface Props { proposal: Proposal; }

const PAYMENT_PLANS = [
  { id: '50-50', label: '50 / 50 Split', desc: '50% upfront · 50% at launch' },
  { id: 'milestones', label: 'Milestones', desc: '40% upfront · 30% design · 30% launch' },
  { id: 'retainer', label: '6-Mo Retainer', desc: 'Equal monthly payments over 6 months' },
];

const PRICE_MAP: Record<string, number> = {
  'Starter': 1500,
  'Growth': 3500,
  'Scale': 7500,
};

function calcPayment(plan: string, price: number) {
  if (plan === '50-50') return [
    { label: 'Due now (50%)', amount: price * 0.5 },
    { label: 'Due at launch (50%)', amount: price * 0.5 },
  ];
  if (plan === 'milestones') return [
    { label: 'Due now (40%)', amount: price * 0.4 },
    { label: 'At design approval (30%)', amount: price * 0.3 },
    { label: 'At launch (30%)', amount: price * 0.3 },
  ];
  if (plan === 'retainer') {
    const monthly = price / 6;
    return Array.from({ length: 6 }, (_, i) => ({
      label: `Month ${i + 1}`,
      amount: monthly,
    }));
  }
  return [];
}

const DEFAULT_TIERS: ProposalPricingTier[] = [
  {
    label: 'Starter',
    price: '$1,500',
    period: 'one-time',
    features: ['5-page conversion-optimized website', 'Google Business Profile setup', 'Basic AI chatbot (GoHighLevel)', 'Social media setup for 2 platforms', 'Lead capture form + CRM connection', 'Basic on-page SEO', 'Google Analytics 4 + Search Console', '30-minute Loom walkthrough'],
  },
  {
    label: 'Growth',
    price: '$3,500',
    period: 'one-time',
    popular: true,
    features: ['Everything in Starter', 'Advanced SEO + schema markup + local citations', 'GoHighLevel CRM with custom pipeline', 'Email automation sequence (5–7 emails)', 'AI chatbot with lead qualification + booking', '1 automation workflow (lead → CRM → email → SMS)', 'Review request + appointment reminder automation', 'Social media setup across 3 platforms', '60-minute strategy session', '14-day post-launch support'],
  },
  {
    label: 'Scale',
    price: '$7,500',
    period: 'one-time',
    features: ['Everything in Growth', 'Full AI automation suite', '30-day social media content automation', 'Reputation management system', 'GoHighLevel white-label sub-account', 'Monthly performance dashboard', '3 custom automation workflows', '60-day post-launch support + 2 check-in calls', '90-minute strategy + onboarding session', 'Full team training (Loom library)'],
  },
];

export default function ProposalPricing({ proposal }: Props) {
  const tiers = proposal.pricing_tiers?.length ? proposal.pricing_tiers : DEFAULT_TIERS;
  const [selectedTier, setSelectedTier] = useState(proposal.selected_tier || 'growth');
  const [paymentPlan, setPaymentPlan] = useState('50-50');

  const selectedTierData = tiers.find(t => t.label.toLowerCase() === selectedTier.toLowerCase()) || tiers[1];
  const price = PRICE_MAP[selectedTierData?.label] || 3500;
  const breakdown = calcPayment(paymentPlan, price);

  return (
    <Slide index={7} id="pricing" style={{ background: '#ffffff', overflowY: 'auto' }}>
      <div style={{
        minHeight: '100%',
        padding: '56px 80px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        color: '#000000',
      }}>
        <StaggerContainer>
          {/* Tag */}
          <StaggerChild>
            <div style={{ marginBottom: '8px' }}>
              <div style={{
                display: 'inline-block',
                background: '#D98235',
                color: '#fff',
                fontSize: '9px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '4px 12px',
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                07 — Investment
              </div>
            </div>
          </StaggerChild>

          <StaggerChild>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              letterSpacing: '0.06em',
              color: '#000000',
              marginBottom: '4px',
            }}>
              CHOOSE YOUR ENGAGEMENT
            </h2>
          </StaggerChild>

          <StaggerChild>
            <p style={{ fontSize: '12px', color: '#999', marginBottom: '32px', letterSpacing: '0.05em' }}>
              Click a tier to select it — your payment breakdown updates automatically.
            </p>
          </StaggerChild>

          {/* Tier cards */}
          <StaggerChild>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px',
              marginBottom: '40px',
            }}>
              {tiers.map((tier) => {
                const isSelected = selectedTier.toLowerCase() === tier.label.toLowerCase();
                return (
                  <div
                    key={tier.label}
                    onClick={() => setSelectedTier(tier.label.toLowerCase())}
                    style={{
                      border: isSelected ? '2px solid #D98235' : '1px solid #e8e8e8',
                      background: isSelected ? '#fff8f2' : '#fafafa',
                      padding: '24px',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 0 0 3px rgba(217,130,53,0.12)' : 'none',
                    }}
                  >
                    {tier.popular && (
                      <div style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '16px',
                        background: '#D98235',
                        color: '#000',
                        fontSize: '9px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        padding: '3px 10px',
                        fontWeight: 700,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>
                        Most Popular
                      </div>
                    )}

                    <div style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '24px',
                      letterSpacing: '0.08em',
                      color: '#000',
                      marginBottom: '4px',
                    }}>
                      {tier.label}
                    </div>

                    {/* Pricing recommendation reason (Change 5) */}
                    {isSelected && proposal.pricing_recommendation_reason && (
                      <p style={{
                        fontSize: '10px',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: '#D98235',
                        lineHeight: 1.5,
                        marginBottom: '8px',
                        fontStyle: 'italic',
                      }}>
                        {proposal.pricing_recommendation_reason}
                      </p>
                    )}

                    <div style={{ marginBottom: '16px' }}>
                      <span style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '36px',
                        letterSpacing: '0.04em',
                        color: isSelected ? '#D98235' : '#000',
                      }}>
                        {tier.price}
                      </span>
                      <span style={{ fontSize: '12px', color: '#999', marginLeft: '6px' }}>
                        {tier.period}
                      </span>
                    </div>

                    <div style={{ borderTop: '1px solid #e8e8e8', paddingTop: '16px' }}>
                      {tier.features.map((f, i) => (
                        <div key={i} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          marginBottom: '8px',
                        }}>
                          <Check size={12} color="#D98235" style={{ flexShrink: 0, marginTop: '2px' }} strokeWidth={2.5} />
                          <span style={{ fontSize: '11px', color: '#555', lineHeight: 1.4 }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    <button style={{
                      width: '100%',
                      marginTop: '16px',
                      background: isSelected ? '#D98235' : '#000',
                      color: isSelected ? '#000' : '#fff',
                      border: 'none',
                      padding: '10px',
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {isSelected ? '✓ Selected' : 'Select'}
                    </button>
                  </div>
                );
              })}
            </div>
          </StaggerChild>

          {/* Payment plan + breakdown */}
          <StaggerChild>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}>
              {/* Payment plan selector */}
              <div>
                <div style={{
                  fontSize: '10px',
                  color: '#999',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: '12px',
                }}>
                  Billing Plan
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {PAYMENT_PLANS.map(plan => (
                    <button
                      key={plan.id}
                      onClick={() => setPaymentPlan(plan.id)}
                      style={{
                        background: paymentPlan === plan.id ? '#fff8f2' : '#f5f5f5',
                        border: paymentPlan === plan.id ? '1px solid #D98235' : '1px solid #e8e8e8',
                        padding: '12px 16px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontFamily: 'inherit',
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: '13px', color: '#000' }}>{plan.label}</span>
                      <span style={{ fontSize: '11px', color: '#888' }}>{plan.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment breakdown */}
              <div>
                <div style={{
                  fontSize: '10px',
                  color: '#999',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: '12px',
                }}>
                  Payment Breakdown
                </div>
                <div style={{
                  background: '#f8f8f8',
                  border: '1px solid #e8e8e8',
                  padding: '16px',
                }}>
                  {breakdown.map((b, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: i < breakdown.length - 1 ? '1px solid #eee' : 'none',
                    }}>
                      <span style={{ fontSize: '12px', color: '#555' }}>{b.label}</span>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#000',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>
                        ${b.amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  ))}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    marginTop: '4px',
                    borderTop: '2px solid #D98235',
                  }}>
                    <span style={{ fontSize: '11px', color: '#999', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>
                      Total Investment
                    </span>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '28px',
                      letterSpacing: '0.04em',
                      color: '#D98235',
                    }}>
                      ${price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </StaggerChild>
        </StaggerContainer>
      </div>
    </Slide>
  );
}
