import AnimatedCard from './AnimatedCard';
import ScrollReveal from './ScrollReveal';

const technologies = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Firebase',
  'Tailwind CSS',
  'Vercel',
  'Figma',
  'GitHub',
];

export default function TechnologyStack() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[140px]" />
      <div className="absolute bottom-[10%] right-[8%] h-48 w-48 rounded-full bg-[#ff6b00]/10 blur-[160px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Stack</p>
          <h2 className="mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Built with modern technologies.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Every launch is built with tools that keep the experience fast, reliable, and ready to grow.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((technology) => (
            <AnimatedCard
              key={technology}
              className="rounded-[1.35rem] border border-white/10 bg-white/8 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#ff6b00]/40 hover:shadow-[0_0_40px_rgba(255,107,0,0.14)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-white">{technology}</p>
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff6b00] shadow-[0_0_12px_rgba(255,107,0,0.8)]" />
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Premium tooling chosen for smooth delivery and strong long-term performance.
              </p>
            </AnimatedCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
