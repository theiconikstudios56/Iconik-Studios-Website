export default function PhilosophySection() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 border-b border-ink/10 bg-ink text-tan">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
           <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-100 sticky top-32">Our Approach</span>
        </div>
        <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <h3 className="text-2xl md:text-3xl font-display mb-8 uppercase tracking-tight text-burnt-orange">Precision Design</h3>
            <p className="text-xl leading-relaxed opacity-100 font-serif italic text-tan">
              "We believe in the power of minimalism and the impact of deliberate choices. Every pixel is placed with intent, ensuring your brand speaks with authority."
            </p>
            <div className="mt-8 h-[1px] w-full bg-tan/20" />
            <p className="mt-8 text-sm opacity-100 leading-relaxed text-tan">
              Our design philosophy is rooted in Swiss modernism—clarity, objectivity, and a focus on the essential. We strip away the noise to reveal the core of your brand's identity.
            </p>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-display mb-8 uppercase tracking-tight text-burnt-orange">AI Orchestration</h3>
            <p className="text-xl leading-relaxed opacity-100 font-serif italic text-tan">
              "Automation isn't just about efficiency; it's about reclaiming your time. We build systems that work while you sleep, scaling your vision effortlessly."
            </p>
            <div className="mt-8 h-[1px] w-full bg-tan/20" />
            <p className="mt-8 text-sm opacity-100 leading-relaxed text-tan">
              We integrate cutting-edge AI workflows into your digital ecosystem. From automated lead nurturing to intelligent content generation, we build the infrastructure for modern growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
