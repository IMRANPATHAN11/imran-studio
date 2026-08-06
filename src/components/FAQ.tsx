import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    {
      question: 'How long does a project usually take?',
      answer: 'Most launches take between 2 and 6 weeks depending on scope, complexity, and feedback speed.',
    },
    {
      question: 'Do you work with existing brands?',
      answer: 'Yes. We can refine an existing identity or build a complete experience around your current positioning.',
    },
    {
      question: 'Can you help after launch?',
      answer: 'Absolutely. We provide support for improvements, iterative updates, and ongoing digital growth.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute left-[8%] top-[10%] h-32 w-32 rounded-full bg-[#ff6b00]/10 blur-[120px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">FAQ</p>
          <h2 className="section-heading mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Common questions before we begin.
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="faq-card rounded-[1.25rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition duration-300 hover:border-[#ff6b00]/30 hover:shadow-[0_0_30px_rgba(255,107,0,0.12)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <h3 className="faq-question text-lg font-semibold text-white">{item.question}</h3>
                  <span className={`text-2xl text-[#ff6b00] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pt-3' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="text-base leading-7 text-slate-400">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
