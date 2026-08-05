import AnimatedCard from './AnimatedCard';
import ScrollReveal from './ScrollReveal';

const benefits = [
  {
    title: 'Lightning Fast Websites',
    description: 'Performance-first builds with sharp load times and smooth interactions.',
  },
  {
    title: 'SEO Optimized',
    description: 'Technical structure and on-page strategy that help your brand be discovered.',
  },
  {
    title: 'Mobile First',
    description: 'Every experience is designed to feel effortless from phone to desktop.',
  },
  {
    title: 'Pixel Perfect UI',
    description: 'Highly refined visual execution with careful spacing, rhythm, and detail.',
  },
  {
    title: 'Clean & Scalable Code',
    description: 'Thoughtful architecture that makes future growth and iteration simple.',
  },
  {
    title: 'Ongoing Support',
    description: 'A long-term partner for updates, improvements, and steady momentum.',
  },
];

export default function WhyChooseMe() {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute left-[10%] top-[12%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[140px]" />
      <div className="absolute right-[8%] bottom-[8%] h-44 w-44 rounded-full bg-[#ff6b00]/10 blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Why Choose Me</p>
          <h2 className="mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Premium craftsmanship, built for ambitious brands.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => (
            <div
  key={benefit.title}
  className="rounded-[1.45rem] border border-white/10 bg-white/8 p-7"
>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ff6b00]/25 bg-[#ff6b00]/10 text-[#ff6b00]">
                ✦
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
