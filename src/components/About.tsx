import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

const stats = [
  { value: 4, label: 'Years Experience' },
];

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1200;
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          setCount(Math.round(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="about-counter rounded-[1.25rem] border border-white/10 bg-black/30 p-5 text-center">
      <p className="about-counter-value text-3xl font-semibold text-white">{count}{label === 'Client Satisfaction' ? '%' : '+'}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{label}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute left-[-5%] top-[10%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[120px]" />
      <div className="absolute bottom-[8%] right-[-4%] h-48 w-48 rounded-full bg-[#ff6b00]/10 blur-[140px]" />
      <ScrollReveal className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">About</p>
          <h2 className="section-heading mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            We design premium digital experiences that make brands feel instantly credible.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Imran Studio partners with founders and modern teams to craft high-impact websites, apps, and brand systems with thoughtful UX and striking visual clarity.
          </p>
        </div>

        <div className="card-padding rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-[0_0_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex justify-center">
            {stats.map((stat) => (
              <Counter key={stat.label} target={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
