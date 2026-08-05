import { useEffect, useState } from 'react';
import AnimatedCard from './AnimatedCard';
import ScrollReveal from './ScrollReveal';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      quote:
        'They translated our ambition into a digital experience that feels refined, fast, and unmistakably premium.',
      name: 'Mina Alvarez',
      role: 'Founder, Northstar Labs',
    },
    {
      quote:
        'Every interaction feels deliberate. The launch was seamless, and the site has improved both trust and conversion.',
      name: 'Daniel Brooks',
      role: 'CMO, Axiom Studio',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute left-[8%] bottom-[6%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[140px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Testimonials</p>
          <h2 className="mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Trusted by founders who want more than a standard web presence.
          </h2>
        </div>

        <div className="mt-12">
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-[0_0_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Show testimonial ${index + 1}`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-8 bg-[#ff6b00]' : 'w-2.5 bg-white/30'}`}
                  />
                ))}
              </div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Client voices</p>
            </div>

            <div className="mt-8 transition-all duration-500" key={activeIndex}>
              <AnimatedCard className="rounded-[1.5rem] border border-white/10 bg-black/30 p-8">
                <p className="text-2xl leading-10 text-slate-100">“{testimonials[activeIndex].quote}”</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#ff6b00]/30 bg-[#ff6b00]/10 text-sm font-semibold text-[#ff6b00]">
                    {testimonials[activeIndex].name.split(' ').map((part) => part[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonials[activeIndex].name}</p>
                    <p className="text-sm text-slate-400">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
