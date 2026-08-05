import AnimatedCard from './AnimatedCard';
import ScrollReveal from './ScrollReveal';

export default function FeaturedProject() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute left-[8%] top-[10%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[140px]" />
      <div className="absolute right-[8%] bottom-[8%] h-48 w-48 rounded-full bg-[#ff6b00]/10 blur-[160px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_0_70px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Featured Project</p>
              <h2 className="mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
                A premium digital experience for modern product teams.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Designed as a high-conversion launch site with refined motion, elegant content structure, and performance-first implementation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {['React', 'Tailwind CSS', 'Vercel'].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full bg-[#ff6b00] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,107,0,0.25)] transition duration-300 hover:scale-105 hover:bg-[#ff7b2a]">
                  Live Demo
                </a>
                <span className="cursor-default rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:border-[#ff6b00]/40 hover:text-[#ff6b00]">
                  GitHub
                </span>
              </div>
            </div>

            <AnimatedCard className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-black/30 p-3">
              <div className="rounded-[1.2rem] border border-white/10 bg-gradient-to-br from-[#171717] via-[#0f0f0f] to-[#1b140f] p-6">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b00]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </div>
                <div className="mt-6 rounded-[1rem] border border-white/10 bg-white/5 p-4">
                  <div className="h-3 w-28 rounded-full bg-white/15" />
                  <div className="mt-4 h-32 rounded-[0.8rem] bg-gradient-to-br from-[#ff6b00]/30 to-transparent" />
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="h-16 rounded-[0.8rem] border border-white/10 bg-white/5" />
                    <div className="h-16 rounded-[0.8rem] border border-white/10 bg-white/5" />
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
