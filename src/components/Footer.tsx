import { motion, type Variants } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

// Deterministic moving particles
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 5) % 100}%`,
  top: `${(i * 23 + 7) % 100}%`,
  size: 2 + (i % 3),
  delay: `${(i % 8) * 0.5}s`,
  duration: `${10 + (i % 6) * 2}s`,
  driftX: `${(i % 2 === 0 ? 1 : -1) * (12 + (i % 5) * 6)}px`,
}));

// Custom Instagram SVG icon (not in lucide-react v1)
function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Floating animation for icons
const floatVariants: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3, ease: 'easeInOut', repeat: Infinity },
  },
};

// Fade-up card variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const bottomBarVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo(el: HTMLElement | number, opts?: unknown): void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] px-6 py-20 sm:px-8 lg:px-12">
      {/* ===== Background: blurred orange circles ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large ambient glows */}
        <div className="absolute -left-[10%] top-[10%] h-72 w-72 rounded-full bg-[#ff6b00]/15 blur-[50px]" />
        <div className="absolute -right-[8%] bottom-[20%] h-80 w-80 rounded-full bg-[#ff6b00]/12 blur-[60px]" />
        <div className="absolute left-[40%] top-[50%] h-56 w-56 rounded-full bg-[#ff6b00]/10 blur-[50px]" />

        {/* Moving particles */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/30"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animation: `footerParticleFloat ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
              ['--drift-x' as string]: p.driftX,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Visitor Counter */}
        <div className="mx-auto mb-16 flex justify-center">
          <VisitorCounter />
        </div>

        {/* ===== 4-Column Grid ===== */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* --- Section 1: Brand --- */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="relative inline-block">
              {/* Orange glow behind logo */}
              <div className="absolute -inset-6 rounded-full bg-[#ff6b00]/20 blur-[50px]" aria-hidden="true" />
              <p className="relative text-[0.7rem] font-semibold uppercase tracking-[0.45em] text-[#ff6b00]">
                Imran Tech
              </p>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              Crafting premium websites, applications and digital experiences for ambitious brands worldwide.
            </p>
          </motion.div>

          {/* --- Section 2: Quick Links --- */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-slate-500">Quick Links</p>
            <nav className="mt-6 flex flex-col gap-3" aria-label="Footer quick links">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link group relative w-fit text-sm text-slate-300 transition-all duration-300 hover:text-[#ff6b00]"
                >
                  <span>{link.label}</span>
                  <span className="footer-link-underline absolute -bottom-0.5 left-0 h-px w-0 rounded-full bg-gradient-to-r from-[#ff6b00] to-[#ff8a3d] shadow-[0_0_8px_rgba(255,107,0,0.5)] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* --- Section 3: Instagram --- */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-slate-500">Let&rsquo;s Connect</p>
            <a
              href="https://instagram.com/i_k_.111"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Instagram profile"
              className="footer-social-link group mt-6 flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/10 hover:shadow-[0_0_30px_rgba(255,107,0,0.2)]"
            >
              <motion.div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#ff6b00] transition-all duration-300 group-hover:border-[#ff6b00]/30 group-hover:bg-[#ff6b00]/15 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.35)]"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ rotate: [0, -8, 8, -8, 0], scale: 1.1 }}
              >
                <InstagramIcon className="h-5 w-5" />
              </motion.div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ff6b00]">
                  Instagram
                </p>
                <p className="text-xs text-slate-400 transition-all duration-300 group-hover:translate-x-1">
                  @i_k_.111
                </p>
              </div>
            </a>
          </motion.div>

          {/* --- Section 4: Email --- */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-slate-500">Email</p>
            <a
              href="mailto:iktech.in@gmail.com?subject=Project%20Inquiry&body=Hello%20Imran,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20my%20project.%0D%0A%0D%0ABest%20Regards"
              aria-label="Send email to iktech.in@gmail.com"
              className="footer-social-link group mt-6 flex items-center gap-4 rounded-[1.25rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/10 hover:shadow-[0_0_30px_rgba(255,107,0,0.2)]"
            >
              <motion.div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#ff6b00] transition-all duration-300 group-hover:border-[#ff6b00]/30 group-hover:bg-[#ff6b00]/15 group-hover:shadow-[0_0_20px_rgba(255,107,0,0.35)]"
                variants={floatVariants}
                animate="animate"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
              >
                <Mail className="h-5 w-5" />
              </motion.div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ff6b00]">
                  Email
                </p>
                <p className="text-xs text-slate-400 transition-all duration-300 group-hover:translate-x-1 break-all">
                  iktech.in@gmail.com
                </p>
              </div>
            </a>
          </motion.div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <motion.div
          variants={bottomBarVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="footer-bottom-bar mt-16 flex flex-col items-center gap-6 rounded-[1.75rem] border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-sm sm:flex-row sm:justify-between sm:px-8"
        >
          {/* Left: Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-[#ff6b00]">
              &copy; 2026 IMRAN TECH
            </p>
            <p className="mt-1 text-xs text-slate-500">All Rights Reserved.</p>
          </div>

          {/* Center: Made by */}
          <div className="text-center">
            <p className="text-xs text-slate-400">
              Made by{' '}
              <span className="bg-gradient-to-r from-white via-[#f8d7c2] to-[#ff8a3d] bg-clip-text font-semibold text-transparent">
                IMRAN TECH
              </span>
            </p>
          </div>

          {/* Right: Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-[#ff6b00]/40 hover:bg-[#ff6b00]/10 hover:text-[#ff6b00] hover:shadow-[0_0_25px_rgba(255,107,0,0.2)]"
          >
            <span>Back to Top</span>
            <motion.span
              className="inline-block text-[#ff6b00]"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUp className="h-4 w-4" />
            </motion.span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}