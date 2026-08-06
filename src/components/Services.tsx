import AnimatedCard from './AnimatedCard';
import ScrollReveal from './ScrollReveal';

export default function Services() {
  const services = [
    {
      title: 'Brand-led Web Design',
      description: 'Refined interfaces with premium visual systems tailored to your brand and audience.',
    },
    {
      title: 'High-performance Web Apps',
      description: 'Thoughtful product experiences designed for speed, clarity, and long-term growth.',
    },
    {
      title: 'Conversion Strategy',
      description: 'Clear messaging, layout systems, and UX direction that support business goals.',
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12">
      <div className="absolute left-[10%] top-[12%] h-40 w-40 rounded-full bg-[#ff6b00]/10 blur-[120px]" />
      <ScrollReveal className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#ff6b00]">Services</p>
          <h2 className="section-heading mt-4 bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
            Services built for ambitious brands and modern products.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <AnimatedCard
              key={service.title}
              className="section-card-padding rounded-[1.75rem] border border-white/10 bg-white/10 p-8 shadow-[0_0_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:border-[#ff6b00]/30 hover:shadow-[0_0_50px_rgba(255,107,0,0.16)]"
            >
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-400">{service.description}</p>
            </AnimatedCard>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
