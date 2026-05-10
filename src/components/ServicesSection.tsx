export default function ServicesSection() {
  return (
    <section id="services" className="py-32 md:py-48 px-6 md:px-12 border-b border-ink/10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
           <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100 sticky top-32">Services</span>
        </div>
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
            {[
              { title: 'Web Design', desc: 'Modern, responsive websites engineered to engage your audience and turn visitors into customers. Built to convert, not just impress.' },
              { title: 'AI Automation', desc: 'Autonomous agents and intelligent workflows that handle lead qualification, booking, and CRM updates in real time.' },
              { title: 'Marketing', desc: 'Strategic marketing assets that amplify your reach and directly support growth. From digital ads to automated review generation.' },
              { title: 'Brand Identity', desc: 'Cohesive brand identities that communicate purpose, personality, and credibility from the first impression.' },
            ].map((service, i) => (
              <div key={service.title} className="flex flex-col gap-6">
                <span className="text-2xl font-display uppercase tracking-tight text-burnt-orange">{service.title}</span>
                <p className="text-sm opacity-100 leading-relaxed max-w-md">{service.desc}</p>
                <div className="w-12 h-[1px] bg-ink/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
