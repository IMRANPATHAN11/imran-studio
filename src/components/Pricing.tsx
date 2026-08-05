import AnimatedCard from './AnimatedCard';
import ScrollReveal from './ScrollReveal';

export default function Pricing() {
  const plans = [
    {
      name: 'Launch',
      price: '$3.5k',
      description: 'For founders building a strong first impression.',
      features: ['Brand-aligned landing page', 'Responsive UI', 'Basic SEO setup'],
      featured: false,
    },
    {
      name: 'Growth',
      price: '$7.5k',
      description: 'For product-led teams needing a premium experience.',
      features: ['Multi-page website', 'CMS integration', 'Conversion optimisation'],
      featured: true,
    },
    {
      name: 'Scale',
      price: 'Custom',
      description: 'For ambitious companies building a full digital platform.',
      features: ['Web app development', 'Advanced interactions', 'Ongoing support'],
      featured: false,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute right-[10%] top-[15%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[140px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Pricing</p>
          <h2 className="mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Flexible engagement options for ambitious brands.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <AnimatedCard
              key={plan.name}
              className={`rounded-[1.75rem] border p-8 shadow-[0_0_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:shadow-[0_0_50px_rgba(255,107,0,0.14)] ${
                plan.featured
                  ? 'border-[#ff6b00]/40 bg-[#ff6b00]/10'
                  : 'border-white/10 bg-white/10'
              }`}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{plan.name}</p>
              <p className="mt-4 text-4xl font-semibold text-white">{plan.price}</p>
              <p className="mt-4 text-base leading-7 text-slate-400">{plan.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </AnimatedCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
