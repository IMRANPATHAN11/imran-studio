import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useSplashScreen } from '../hooks/useSplashScreen'

type SplashScreenProps = {
  /** Called once when the splash has fully completed (flash + fade-out done). */
  onFinish: () => void
}

const EASE = [0.16, 1, 0.3, 1] as const

// Deterministic floating sparks / fire particles / dust
const sparks = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 17) % 90}%`,
  delay: `${(i % 5) * 0.35}s`,
  duration: `${2.4 + (i % 4) * 0.6}s`,
  size: 3 + (i % 3),
  hue: i % 2 === 0 ? 'rgba(96, 165, 250, 0.9)' : 'rgba(255, 138, 61, 0.9)',
}))

const roadParticles = Array.from({ length: 14 }, (_, i) => ({
  left: `${18 + ((i * 5.7) % 64)}%`,
  delay: `${(i % 7) * 0.28}s`,
  duration: `${1.1 + (i % 5) * 0.22}s`,
}))

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
      className="fixed inset-0 z-[99] flex items-center justify-center overflow-hidden bg-[#04050a]"
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
      {/* ------- Background layers ------- */}
      <div className="absolute inset-0">
        {/* Deep space gradient + blue/orange glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d] via-[#0a1630] to-[#05060b]" />
        <div className="absolute left-1/2 top-[38%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.35),transparent_65%)] blur-[80px]" />
        <div className="absolute bottom-[6%] left-1/2 h-[22rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.22),transparent_70%)] blur-[90px]" />

        {/* Moving light rays */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-[-20%] top-[15%] h-px w-[140%] rotate-[-8deg] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
          <div className="absolute left-[-10%] top-[60%] h-px w-[120%] rotate-[6deg] bg-gradient-to-r from-transparent via-orange-400/25 to-transparent" />
          <div className="absolute left-[-5%] top-[80%] h-px w-[110%] rotate-[-4deg] bg-gradient-to-r from-transparent via-blue-300/20 to-transparent" />
        </div>

        {/* Ambient smoke */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-[10%] top-[10%] h-64 w-64 rounded-full bg-blue-500/15 blur-[100px]" />
          <div className="absolute right-[8%] top-[30%] h-56 w-56 rounded-full bg-orange-500/12 blur-[110px]" />
          <div className="absolute bottom-[18%] right-[20%] h-72 w-72 rounded-full bg-blue-400/10 blur-[120px]" />
        </div>

        {/* Floating sparks / particles / dust */}
        {sparks.map((spark, i) => (
          <motion.span
            key={`spark-${i}`}
            className="absolute rounded-full"
            style={{
              left: spark.left,
              top: spark.top,
              width: spark.size,
              height: spark.size,
              background: spark.hue,
              boxShadow: `0 0 ${spark.size * 3}px ${spark.hue}`,
            }}
            animate={{
              y: reduceMotion ? [0, 0] : [0, -50, 0],
              x: reduceMotion ? 0 : [0, 8, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: parseFloat(spark.duration),
              delay: parseFloat(spark.delay),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ------- Center content ------- */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo + energy ring */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating diamond energy ring */}
          <div className="energy-ring absolute h-44 w-44 sm:h-52 sm:w-52" />

          {/* Spotlight glow */}
          <div className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28),rgba(255,107,0,0.12)_45%,transparent_72%)] blur-[20px]" />

          {/* IT Logo */}
          <motion.div
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-[1.35rem] border border-white/20 bg-white/[0.06] shadow-[0_0_40px_rgba(37,99,235,0.35),inset_0_0_22px_rgba(255,255,255,0.05)] backdrop-blur-xl sm:h-24 sm:w-24"
            animate={{
              rotate: reduceMotion ? 0 : [0, 3, -3, 0],
              scale: reduceMotion ? [1, 1, 1] : [1, 1.06, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Logo reflections */}
            <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_40%,transparent_60%,rgba(255,255,255,0.06))]" />
            <div className="pointer-events-none absolute left-1 top-1 right-4 h-6 rounded-t-[1.1rem] bg-white/5 blur-[2px]" />

            <span className="text-2xl font-bold tracking-[0.08em] text-white drop-shadow-[0_0_14px_rgba(96,165,250,0.8)] sm:text-3xl">
              IT
            </span>
          </motion.div>
        </div>

        {/* Tron road */}
        <div className="relative mt-8 h-24 w-72 overflow-hidden sm:w-96">
          {/* Perspective road base */}
          <div
            className="absolute inset-x-8 bottom-0 top-6 mx-auto"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 70% 0, 30% 0)',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(37,99,235,0.18) 22%, rgba(37,99,235,0.12) 70%, transparent 100%)',
            }}
          />
          {/* Blue lane lines */}
          <div className="absolute inset-x-0 top-2 bottom-0" style={{ perspective: '300px' }}>
            <div className="absolute left-1/2 top-6 bottom-0 w-px -translate-x-[38%] bg-gradient-to-b from-blue-400/70 to-transparent" />
            <div className="absolute left-1/2 top-6 bottom-0 w-px translate-x-[38%] bg-gradient-to-b from-blue-400/70 to-transparent" />
          </div>
          {/* Flowing orange fire energy */}
          <div className="road-fire absolute inset-x-0 top-10 bottom-0" />
          {/* Moving light streaks */}
          {roadParticles.map((p, i) => (
            <motion.span
              key={`road-${i}`}
              className="absolute top-10 bottom-0 w-[2px] rounded-full bg-[linear-gradient(to_bottom,rgba(96,165,250,0.9),rgba(255,107,0,0.6),transparent)]"
              style={{ left: p.left }}
              initial={{ y: 0, opacity: 0 }}
              animate={
                reduceMotion
                  ? { y: 0, opacity: 0.3 }
                  : { y: [0, 200], opacity: [0, 0.9, 0] }
              }
              transition={{
                duration: parseFloat(p.duration),
                delay: parseFloat(p.delay),
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div className="mt-8 text-center">
          <h1 className="flex items-baseline justify-center gap-1 text-2xl font-extrabold tracking-[0.28em] sm:text-3xl">
            <motion.span
              className="text-white drop-shadow-[0_0_18px_rgba(96,165,250,0.55)]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              IMRAN
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-orange-400 via-[#ff8a3d] to-orange-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(255,107,0,0.6)]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            >
              TECH
            </motion.span>
          </h1>
          <motion.p
            className="mt-3 text-[0.62rem] font-medium uppercase tracking-[0.52em] text-slate-400 [text-shadow:0_0_14px_rgba(96,165,250,0.35)] sm:text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            Crafting Digital Experiences
          </motion.p>
        </div>

        {/* Loading bar */}
        <div className="mt-8 w-64 sm:w-80">
          <div className="relative h-2.5 overflow-hidden rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-orange-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut' }}
            />
            <div className="loader-shine absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
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
          background: 'radial-gradient(circle at 50% 42%, rgba(200,230,255,0.9), rgba(37,99,235,0.4) 30%, rgba(255,107,0,0.25) 60%, transparent 80%)',
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