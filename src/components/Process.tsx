import AnimatedCard from './AnimatedCard';
import ScrollReveal from './ScrollReveal';

export default function Process() {
  const steps = [
    {
      title: 'Discover',
      description: 'We map your audience, product positioning, and growth goals before designing a single screen.',
    },
    {
      title: 'Design',
      description: 'We shape a premium visual system with clear messaging, motion, and conversion-focused flows.',
    },
    {
      title: 'Build',
      description: 'We ship a polished product with performance, SEO, and accessibility baked in from day one.',
    },
  ];

  return (
    <section id="process" className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute right-[8%] top-[10%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[120px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Process</p>
          <h2 className="mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            A calm, intentional process from concept to launch.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <AnimatedCard
              key={step.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/10 p-8 shadow-[0_0_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:border-[#ff6b00]/30 hover:shadow-[0_0_50px_rgba(255,107,0,0.14)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b00]/30 bg-[#ff6b00]/10 text-sm font-semibold text-[#ff6b00]">
                0{index + 1}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-400">{step.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
