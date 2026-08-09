import { memo, useEffect, useMemo, useState } from 'react';

type Quality = 'low' | 'medium' | 'high';

type Particle = {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
  driftX: string;
  driftY: string;
};

type Sparkle = {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: string;
};

function getQuality(): Quality {
  if (typeof window === 'undefined') return 'high';
  const width = window.innerWidth;
  if (width < 768) return 'low';
  if (width < 1024) return 'medium';
  return 'high';
}

function ParticleBackground() {
  const [quality, setQuality] = useState<Quality>(getQuality);

  useEffect(() => {
    let rafId: number | null = null;
    const checkQuality = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setQuality(getQuality());
      });
    };
    window.addEventListener('resize', checkQuality, { passive: true });

    // Pause animations when tab is hidden to save CPU/GPU
    const handleVisibility = () => {
      document.documentElement.classList.toggle('tab-hidden', document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', checkQuality);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Reduced particle counts for significantly lower CPU/GPU usage
  const particleCount = quality === 'high' ? 20 : quality === 'medium' ? 12 : 6;
  const sparkleCount = quality === 'high' ? 3 : quality === 'medium' ? 2 : 0;

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: particleCount }, (_, index) => ({
      id: index,
      left: `${(index * 13 + 5) % 100}%`,
      top: `${(index * 17 + 7) % 100}%`,
      size: `${(index % 3) + 2}px`,
      delay: `${(index % 10) * 0.4}s`,
      duration: `${14 + (index % 8) * 1.8}s`,
      opacity: 0.12 + (index % 5) * 0.08,
      driftX: `${(index % 2 === 0 ? 1 : -1) * (14 + (index % 6) * 4)}px`,
      driftY: `${-(18 + (index % 8) * 5)}px`,
    }));
  }, [particleCount]);

  const sparkles = useMemo<Sparkle[]>(() => {
    return Array.from({ length: sparkleCount }, (_, index) => ({
      id: index,
      left: `${(index * 31 + 11) % 100}%`,
      top: `${(index * 29 + 13) % 92}%`,
      delay: `${(index % 6) * 0.7}s`,
      duration: `${4.5 + (index % 5) * 1.2}s`,
      size: `${2 + (index % 2)}px`,
    }));
  }, [sparkleCount]);

  const isLowQuality = quality === 'low';

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Cinematic animated mesh gradient */}
      <div className="cinematic-mesh absolute inset-0" />

      {/* Slow-moving radial lights - reduced blur on mobile */}
      <div className="cinematic-light cinematic-light-1 left-[-8%] top-[-12%]" />
      <div className="cinematic-light cinematic-light-2 bottom-[-14%] right-[-10%]" />
      {!isLowQuality && <div className="cinematic-light cinematic-light-3 left-[42%] top-[38%]" />}

      {/* Moving blurred blobs - reduced on mobile */}
      <div className="cinematic-blob absolute left-[-6%] top-[15%] h-56 w-56 bg-[#ff6b00]/12" />
      {!isLowQuality && (
        <div className="cinematic-blob absolute bottom-[12%] right-[-8%] h-64 w-64 bg-[#7a3cff]/8" style={{ animationDelay: '-8s' }} />
      )}

      {/* Floating particles — eternal slow drift */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="cinematic-particle absolute rounded-full bg-white/70"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              boxShadow: isLowQuality ? undefined : '0 0 8px rgba(255,255,255,0.4)',
              animationDuration: particle.duration,
              animationDelay: particle.delay,
              ['--drift-x' as string]: particle.driftX,
              ['--drift-y' as string]: particle.driftY,
            }}
          />
        ))}
      </div>

      {/* Subtle sparkles */}
      {sparkles.map((sparkle) => (
        <span
          key={`sparkle-${sparkle.id}`}
          className="cinematic-sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
            animationDuration: sparkle.duration,
          }}
        />
      ))}

      {/* Light rays - reduced on mobile */}
      {!isLowQuality && (
        <div className="absolute inset-0 opacity-25">
          <div className="absolute left-[-20%] top-[15%] h-px w-[140%] rotate-[-8deg] bg-gradient-to-r from-transparent via-[#ff6b00]/30 to-transparent" />
          <div className="absolute left-[-10%] top-[65%] h-px w-[120%] rotate-[6deg] bg-gradient-to-r from-transparent via-[#ff8a3d]/20 to-transparent" />
        </div>
      )}
    </div>
  );
}

export default memo(ParticleBackground);