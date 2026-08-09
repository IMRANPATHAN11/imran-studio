import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useSplashScreen } from '../hooks/useSplashScreen'

type SplashScreenProps = {
  /** Called once when the splash has fully completed (flash + fade-out done). */
  onFinish: () => void
}

const EASE = [0.16, 1, 0.3, 1] as const

// Deterministic ambient particles — very low opacity, slow drift
const ambientParticles = Array.from({ length: 8 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 17) % 90}%`,
  delay: `${(i % 5) * 0.35}s`,
  duration: `${14 + (i % 4) * 3}s`,
  size: 2 + (i % 2),
}))

// Orbit nodes — positioned on the ring, rotate with the orbit
const orbitNodes = [
  { angle: 0, size: 6, color: '#6D5DFB' },
  { angle: 120, size: 4, color: '#38BDF8' },
  { angle: 240, size: 5, color: '#FF7A18' },
]

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const reduceMotion = useReducedMotion()
  const { progress, isComplete, isVisible } = useSplashScreen({ duration: 2, exitDelay: 700 })
  const finishedRef = useRef(false)

  useEffect(() => {
    if (isVisible === false && !finishedRef.current) {
      finishedRef.current = true
      onFinish()
    }
  }, [isVisible, onFinish])

  return (
    <motion.div
      className="fixed inset-0 z-[99] flex items-center justify-center overflow-hidden bg-[#02040A]"
      style={{ minHeight: '100dvh' }}
      initial={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : reduceMotion ? 1 : 1.08,
        filter: isVisible ? 'blur(0px)' : reduceMotion ? 'blur(0px)' : 'blur(12px)',
      }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      exit={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* ------- Cinematic background atmosphere ------- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Deep midnight navy base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#0A1020_0%,#050816_45%,#02040A_100%)]" />

        {/* Deep violet/blue glow behind logo */}
        <div className="splash-glow-violet absolute left-1/2 top-[38%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(109,93,251,0.16),transparent_65%)] blur-[40px]" />

        {/* Subtle warm amber edge glow */}
        <div className="splash-glow-amber absolute bottom-[8%] right-[-5%] h-[20rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.08),transparent_70%)] blur-[45px]" />

        {/* Faint cyan glow */}
        <div className="splash-glow-cyan absolute left-[-8%] top-[20%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06),transparent_70%)] blur-[40px]" />

        {/* Ambient particles — very subtle, edges only */}
        {ambientParticles.map((p, i) => (
          <motion.span
            key={`ambient-${i}`}
            className="splash-particle absolute rounded-full bg-white/30"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={
              reduceMotion
                ? { opacity: 0.15 }
                : { y: [0, -30, 0], opacity: [0.05, 0.2, 0.05] }
            }
            transition={{
              duration: parseFloat(p.duration),
              delay: parseFloat(p.delay),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ------- Center content ------- */}
      <div className="relative z-10 flex flex-col items-center px-6" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {/* Logo + orbit system */}
        <div className="relative flex items-center justify-center">
          {/* Orbit wrapper — handles positioning only, no rotation */}
          <div className="splash-orbit-wrapper absolute h-44 w-44 sm:h-56 sm:w-56">
            {/* Orbit ring — rotates continuously, GPU-friendly */}
            <div className="splash-orbit-ring absolute inset-0 rounded-full">
              {/* Orbit path (thin circle) */}
              <div className="splash-orbit-path absolute inset-0 rounded-full" />

              {/* Glowing nodes on the orbit */}
              {orbitNodes.map((node, i) => (
                <span
                  key={`node-${i}`}
                  className="splash-orbit-node absolute"
                  style={{
                    width: node.size,
                    height: node.size,
                    background: node.color,
                    boxShadow: `0 0 ${node.size * 3}px ${node.color}`,
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${node.angle}deg) translateX(5.5rem) translate(-50%, -50%)`,
                    transformOrigin: '0 0',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Soft spotlight glow behind logo */}
          <div className="splash-logo-glow absolute h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(109,93,251,0.18),rgba(56,189,248,0.08)_45%,transparent_72%)] blur-[24px]" />

          {/* Premium glass IT logo */}
          <motion.div
            className="splash-logo relative z-10 flex h-20 w-20 items-center justify-center rounded-[1.35rem] border border-white/15 bg-white/[0.06] shadow-[0_0_40px_rgba(109,93,251,0.2),inset_0_0_22px_rgba(255,255,255,0.05)] backdrop-blur-md sm:h-24 sm:w-24"
            animate={{
              scale: reduceMotion ? [1, 1, 1] : [1, 1.04, 1],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Glass reflections */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_40%,transparent_60%,rgba(255,255,255,0.04))]" />
            <div className="pointer-events-none absolute left-1 top-1 right-4 h-6 rounded-t-[1.1rem] bg-white/5 blur-[2px]" />

            {/* Subtle violet edge glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] border border-[#6D5DFB]/20" />

            <span className="text-2xl font-bold tracking-[0.08em] text-white sm:text-3xl">
              IT
            </span>
          </motion.div>
        </div>

        {/* Title */}
        <div className="mt-10 text-center">
          <h1 className="flex items-baseline justify-center gap-1 text-xl font-bold tracking-[0.28em] sm:text-2xl">
            <motion.span
              className="text-[#F8FAFC]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              IMRAN
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-[#6D5DFB] via-[#38BDF8] to-[#FF7A18] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              TECH
            </motion.span>
          </h1>
          <motion.p
            className="mt-3 text-[0.6rem] font-medium uppercase tracking-[0.52em] text-slate-400 sm:text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            Crafting Digital Experiences
          </motion.p>
        </div>

        {/* Premium glass loading bar */}
        <div className="splash-loader mt-8 w-64 sm:w-80">
          <div className="splash-progress-track relative h-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.05] shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            <motion.div
              className="splash-progress-fill h-full rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut' }}
            />
            <div className="splash-progress-shine absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>
          <div className="mt-3 flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-slate-400">
            <span>Loading</span>
            <span className="tabular-nums text-slate-200">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* ------- Exit flash + camera zoom ------- */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: 'radial-gradient(circle at 50% 42%, rgba(200,230,255,0.9), rgba(109,93,251,0.4) 30%, rgba(56,189,248,0.25) 60%, transparent 80%)',
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: isComplete ? 1.12 : 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />

      {/* ------- White flash on exit (brief 100ms flash then fade) ------- */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? [0, 1, 0] : 0 }}
        transition={{ duration: 0.3, times: [0, 0.33, 1], delay: 0.1 }}
      />
    </motion.div>
  )
}