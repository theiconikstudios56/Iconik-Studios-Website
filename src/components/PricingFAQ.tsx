import { motion, AnimatePresence } from 'motion/react';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

export const Pricing = () => {
  const plans = [
    { name: 'Starter', price: '$2,500', items: ['Custom Web Design', 'Core SEO Setup', 'Mobile Responsive', 'Basic Lead Capture'] },
    { name: 'Growth', price: '$5,000', items: ['Advanced Web Design', 'Complete SEO Strategy', 'Make.com Integrations', 'CRM Setup', 'Copywriting'], featured: true },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Iconik Studios Services",
    "description": "Premium Web Design and AI Automation services.",
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": "2",
      "lowPrice": "2500",
      "highPrice": "5000",
      "priceCurrency": "USD"
    }
  };

  return (
    <section id="pricing" className="py-32 px-6 lg:px-12 bg-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-7xl md:text-9xl text-paper">Pricing</h2>
          <p className="max-w-xl mx-auto text-xl font-light text-paper opacity-100">Basics to high-performance ecosystems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <motion.div 
              key={plan.name}
              whileHover={{ y: -10 }}
              className={`p-12 h-fit rounded-[40px] border border-white/10 space-y-12 ${plan.featured ? 'bg-white text-ink' : 'bg-white/5'}`}
            >
              <div className="space-y-4">
                <h3 className={`text-4xl font-display ${!plan.featured ? 'text-paper' : ''}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-7xl font-display ${!plan.featured ? 'text-paper' : ''}`}>{plan.price}</span>
                  <span className={`text-sm opacity-100 ${!plan.featured ? 'text-paper' : ''}`}>/project</span>
                </div>
              </div>
              <div className="w-full h-px bg-current opacity-10" />
              <ul className="space-y-6">
                {plan.items.map(item => (
                  <li key={item} className={`flex items-center gap-4 text-sm font-semibold tracking-wide ${!plan.featured ? 'text-paper' : ''}`}>
                    <Check size={18} className="text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-6 rounded-full font-display text-xl uppercase transition-all ${plan.featured ? 'bg-ink text-paper hover:bg-accent' : 'bg-paper text-ink hover:bg-accent'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const [active, setActive] = useState<number | null>(0);
  const questions = [
    { q: "Do you only work with Med Spas and Real Estate?", a: "While we have specialized systems for Med Spas, Real Estate, HVAC, and Consultants, our core methodology—Conversion-Centered Architecture—applies to any service-based business looking to scale." },
    { q: "What makes your websites different from a template?", a: "Templates are built to look pretty. Our websites are custom-engineered to convert. We focus on cognitive load reduction, 1:1 goal alignment, and seamless integration with your CRM." },
    { q: "How long does a website or automation build take?", a: "Standard website builds typically take 4-6 weeks. Complex AI automation systems and custom agent integrations can take 6-8 weeks, depending on the scope of your operations." },
    { q: "Do you offer ongoing support?", a: "Absolutely. We offer tiered 'Guardianship' maintenance packages that include 24/7 monitoring, security patching, and strategic performance tuning." },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  };

  return (
    <section className="py-32 px-6 lg:px-12 bg-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-8 sticky top-32 h-fit">
          <h2 className="text-7xl md:text-9xl text-paper">FAQ</h2>
          <p className="max-w-sm text-xl font-light text-paper opacity-100">Everything you need to know before we launch.</p>
        </div>
        <div className="space-y-4">
          {questions.map((item, i) => (
            <div key={i} className="bg-white/5 rounded-3xl overflow-hidden">
              <button 
                onClick={() => setActive(active === i ? null : i)}
                className="w-full p-8 flex justify-between items-center text-left"
              >
                <div className="flex items-center gap-8 text-paper">
                  <span className="font-display opacity-80">0{i + 1}</span>
                  <span className="text-base md:text-lg font-mono uppercase">{item.q}</span>
                </div>
                <motion.div animate={{ rotate: active === i ? 45 : 0 }} className="text-paper">
                  <X size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {active === i && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="px-8 pb-8"
                  >
                    <p className="text-lg opacity-100 font-light leading-relaxed text-paper">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
