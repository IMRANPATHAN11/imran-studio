import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton';
import ScrollIndicator from './ScrollIndicator';

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '100%', label: 'Client Satisfaction' },
];

// Premium staggered entrance variants (Apple/Linear style)
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Hero({ started = true }: { started?: boolean }) {
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const reduceMotion = useReducedMotion();

  // 60 FPS parallax using motion values + springs (GPU-accelerated)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 });
  const orbX = useTransform(springX, (v) => v * 0.6);
  const orbY = useTransform(springY, (v) => v * 0.55);
  const orbRotate = useTransform(springX, (v) => v * 0.08);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.18);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    handleScroll();
    checkMobile();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mouse parallax - only when started and not mobile, using rAF for 60 FPS
  useEffect(() => {
    if (isMobile || !started || reduceMotion) return;

    let frame = 0;
    const handleMouseMove = (event: MouseEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 16;
        const y = (event.clientY / window.innerHeight - 0.5) * 16;
        mouseX.set(x);
        mouseY.set(y);
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [isMobile, started, reduceMotion, mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 py-24 sm:px-8 lg:px-12"
    >
      {/* Background layers */}
      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,107,0,0.22),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(255,107,0,0.16),_transparent_28%)]" />
        <div className="absolute left-[-8%] top-[18%] h-48 w-48 rounded-full bg-[#ff6b00]/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-6%] h-56 w-56 rounded-full bg-[#ff6b00]/15 blur-[140px]" />
        <div className="absolute left-[12%] top-[8%] h-24 w-24 rounded-full border border-white/10" />
        <div className="absolute bottom-[20%] left-[18%] h-16 w-16 rounded-full border border-[#ff6b00]/30" />
      </div>

      {/* Floating orbs - GPU-accelerated with motion values */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-[-4%] top-[12%] h-[28rem] w-[28rem] rounded-full blur-[90px] sm:right-[2%] sm:h-[34rem] sm:w-[34rem] lg:h-[40rem] lg:w-[40rem] lg:blur-[110px]"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 120, 40, 0.95), rgba(255, 107, 0, 0.55) 28%, rgba(120, 60, 255, 0.25) 58%, transparent 72%)',
            x: isMobile || reduceMotion ? 0 : orbX,
            y: isMobile || reduceMotion ? 0 : orbY,
            rotate: isMobile || reduceMotion ? 0 : orbRotate,
            animation: 'heroOrbFloat 16s ease-in-out infinite',
            opacity: 0.9,
            willChange: 'transform',
          }}
        />
        <div
          className="absolute right-[10%] top-[18%] h-24 w-24 rounded-full blur-[70px] sm:h-32 sm:w-32"
          style={{
            background: 'radial-gradient(circle, rgba(255,183,77,0.7), transparent 70%)',
            animation: 'heroOrbFloat 12s ease-in-out infinite 1.2s',
            opacity: 0.8,
          }}
        />
        <div
          className="absolute right-[28%] top-[8%] h-16 w-16 rounded-full blur-[60px] sm:h-20 sm:w-20"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.42), transparent 72%)',
            animation: 'heroOrbFloat 14s ease-in-out infinite 2.4s',
            opacity: 0.7,
          }}
        />
        <div
          className="absolute right-[20%] bottom-[14%] h-12 w-12 rounded-full blur-[50px] sm:h-16 sm:w-16"
          style={{
            background: 'radial-gradient(circle, rgba(255, 140, 60, 0.38), transparent 73%)',
            animation: 'heroOrbFloat 13s ease-in-out infinite 0.8s',
            opacity: 0.75,
          }}
        />
      </div>

      {/* Content - premium staggered entrance */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center lg:justify-start">
        <motion.div
          className="max-w-3xl text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate={started ? 'visible' : 'hidden'}
        >
          {/* Availability badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-300 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              Available for new projects
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-sm font-medium uppercase tracking-[0.35em] text-slate-400 sm:text-base"
          >
            Welcome to Imran Studio
          </motion.p>

          {/* Headline */}
          <motion.h1
            ref={headlineRef}
            variants={itemVariants}
            aria-label="Premium Website and Web App Developer"
            className="mt-6 text-gradient text-4xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Premium Website &<br />
            Web App Developer
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0"
          >
            I build modern, fast, responsive and premium websites that help businesses grow online.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <MagneticButton
              href="#contact"
              className="btn-shine rounded-full bg-[#ff6b00] px-7 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(255,107,0,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_70px_rgba(255,107,0,0.45)]"
            >
              Hire Me
            </MagneticButton>
            <MagneticButton
              href="#services"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-100 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#ff6b00]/40 hover:text-[#ff6b00]"
            >
              View Services
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-14 grid max-w-md grid-cols-3 gap-4 lg:mx-0"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-gradient-accent text-2xl font-semibold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
  );
}