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
              { title: 'Bespoke Web Design', desc: 'Crafting unique digital experiences that resonate with your brand identity and captivate your audience.' },
              { title: 'AI Automation', desc: 'Implementing intelligent workflows that streamline your operations and scale your business growth.' },
              { title: 'Brand Strategy', desc: 'Defining your brand voice and positioning to ensure you stand out in a crowded digital landscape.' },
              { title: 'Digital Orchestration', desc: 'Managing your entire digital ecosystem for seamless performance and maximum impact.' },
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
