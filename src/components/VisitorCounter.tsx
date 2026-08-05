import { motion } from 'framer-motion';

const particles = [
  { left: '8%', bottom: '22%', size: 10, delay: '0s', duration: 9 },
  { left: '18%', bottom: '8%', size: 6, delay: '1.2s', duration: 11 },
  { left: '32%', bottom: '34%', size: 8, delay: '2.4s', duration: 10 },
  { left: '46%', bottom: '12%', size: 5, delay: '0.6s', duration: 12 },
  { left: '58%', bottom: '28%', size: 9, delay: '1.8s', duration: 9.5 },
  { left: '70%', bottom: '6%', size: 6, delay: '3s', duration: 10.5 },
  { left: '82%', bottom: '24%', size: 7, delay: '0.9s', duration: 11.5 },
  { left: '92%', bottom: '10%', size: 5, delay: '2s', duration: 9.8 },
];

/**
 * Premium static visitor statistics widget.
 *
 * IMPORTANT: This is a purely decorative UI element. It displays a FIXED
 * value ("1K+") and does NOT track, store, or fetch any visitor data.
 * No backend, API, or storage is used — and the number NEVER changes.
 */
export default function VisitorCounter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md"
      role="status"
      aria-live="polite"
      aria-label="Total visitors: 1K plus"
    >
      {/* Animated glowing border */}
      <div className="visitor-counter-border pointer-events-none absolute -inset-px rounded-[1.75rem]" aria-hidden="true" />

      {/* Soft ambient glow behind the card */}
      <div
        className="visitor-glow pointer-events-none absolute -inset-6 rounded-[2.5rem]"
        aria-hidden="true"
      />

      {/* Card body */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 p-8 shadow-[0_0_80px_rgba(255,107,0,0.12)] backdrop-blur-2xl sm:p-10">
        {/* Animated gradient wash */}
        <div
          className="visitor-gradient pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        {/* Fire-like orange glow blobs */}
        <div
          className="visitor-fire pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full blur-[64px]"
          aria-hidden="true"
        />
        <div
          className="visitor-fire-2 pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full blur-[72px]"
          aria-hidden="true"
        />

        {/* Floating particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {particles.map((particle, particleIndex) => (
            <span
              key={`${particle.left}-${particleIndex}`}
              className="visitor-particle absolute rounded-full bg-[#ff8a3d]"
              style={{
                left: particle.left,
                bottom: particle.bottom,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: particle.delay,
                animationDuration: `${particle.duration}s`,
                boxShadow: '0 0 12px rgba(255,138,61,0.85)',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Live indicator */}
          <div className="flex items-center justify-center gap-2.5">
            <span className="visitor-live-dot relative h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-emerald-300 sm:text-xs">
              Live
            </span>
          </div>

          {/* Eye + label */}
          <div className="mt-6 flex items-center justify-center gap-3 text-slate-300">
            <svg
              className="h-5 w-5 text-[#ff8a3d]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-400 sm:text-sm">
              Total Visitors
            </p>
          </div>

          {/* Fixed value — NEVER changes, only the glow/shimmer animate */}
          <p className="mt-4 text-gradient-accent visitor-value text-6xl font-semibold tracking-tight sm:text-7xl">
            1K+
          </p>

          {/* Shimmer sweep */}
          <div className="visitor-shimmer pointer-events-none absolute inset-0" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}