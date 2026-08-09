import ScrollReveal from './ScrollReveal';

export default function FeaturedProject() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute left-[8%] top-[10%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[50px]" />
      <div className="absolute right-[8%] bottom-[8%] h-48 w-48 rounded-full bg-[#ff6b00]/10 blur-[60px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="featured-card rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_0_70px_rgba(0,0,0,0.3)] backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-1">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Featured Project</p>
              <h2 className="section-heading mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
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
                <span className="cursor-default rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:border-[#ff6b00]/40 hover:text-[#ff6b00]">
                  GitHub
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
