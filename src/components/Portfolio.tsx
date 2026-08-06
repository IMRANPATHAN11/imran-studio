import AnimatedCard from './AnimatedCard';
import ScrollReveal from './ScrollReveal';

export default function Portfolio() {
  const projects = [
    {
      title: 'Northstar Labs',
      description: 'A premium launch site for a venture-backed AI company, focusing on clarity and conversion.',
      badge: 'Launch',
    },
    {
      title: 'Axiom Studio',
      description: 'A refined digital platform for a boutique creative studio with strong storytelling and motion.',
      badge: 'Brand',
    },
    {
      title: 'Lumen Finance',
      description: 'A clean, modern experience for a finance brand seeking trust and sleek product positioning.',
      badge: 'Product',
    },
  ];

  return (
    <section id="portfolio" className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute bottom-[8%] left-[6%] h-44 w-44 rounded-full bg-[#ff6b00]/10 blur-[140px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Portfolio</p>
            <h2 className="section-heading mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
              Selected work that balances elegance, performance, and purpose.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <AnimatedCard
              key={project.title}
              className="section-card-padding group rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/15 to-white/5 p-8 shadow-[0_0_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:border-[#ff6b00]/30 hover:shadow-[0_0_50px_rgba(255,107,0,0.16)]"
            >
              <div className="group-hover:scale-[1.02] relative h-32 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(255,107,0,0.25),_transparent_40%)] transition duration-300">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-70" />
                <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-200">
                  {project.badge}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-400">{project.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
