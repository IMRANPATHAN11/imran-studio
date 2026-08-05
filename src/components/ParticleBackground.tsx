import { useMemo } from 'react';

type Particle = {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
  driftX: string;
};

export default function ParticleBackground() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 60 }, (_, index) => ({
      id: index,
      left: `${(index * 13 + 5) % 100}%`,
      top: `${(index * 17 + 7) % 100}%`,
      size: `${(index % 3) + 2}px`,
      delay: `${(index % 10) * 0.4}s`,
      duration: `${12 + (index % 8) * 1.8}s`,
      opacity: 0.15 + (index % 5) * 0.1,
      driftX: `${(index % 2 === 0 ? 1 : -1) * (14 + (index % 6) * 4)}px`,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Animated mesh gradient base */}
      <div className="mesh-gradient absolute inset-0" />

      {/* Aurora light layers */}
      <div className="aurora-layer aurora-layer-1 left-[-10%] top-[-12%] h-[42rem] w-[42rem]" />
      <div className="aurora-layer aurora-layer-2 bottom-[-14%] right-[-8%] h-[36rem] w-[36rem]" />
      <div className="aurora-layer aurora-layer-3 left-[30%] top-[40%] h-[30rem] w-[30rem]" />

      {/* Moving radial lights */}
      <div className="absolute inset-0 opacity-70">
        <div
          className="absolute h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,107,0,0.18),transparent_65%)]"
          style={{ animation: 'radialLightA 26s ease-in-out infinite' }}
        />
        <div
          className="absolute h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(120,60,255,0.14),transparent_65%)]"
          style={{ animation: 'radialLightB 32s ease-in-out infinite' }}
        />
      </div>

      {/* Blurred glow blobs */}
      <div className="absolute left-[-8%] top-[18%] h-56 w-56 rounded-full bg-[#ff6b00]/15 blur-[130px]" />
      <div className="absolute bottom-[10%] right-[-6%] h-64 w-64 rounded-full bg-[#ff8a3d]/12 blur-[150px]" />
      <div className="absolute left-[40%] top-[60%] h-48 w-48 rounded-full bg-[#7a3cff]/10 blur-[140px]" />

      {/* Floating particles */}
      <div className="absolute inset-0 opacity-70">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute rounded-full bg-white/80"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              boxShadow: '0 0 8px rgba(255,255,255,0.5)',
              animation: `particleFloat ${particle.duration} ease-in-out infinite`,
              animationDelay: particle.delay,
              ['--drift-x' as string]: particle.driftX,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* Subtle film-grain noise */}
      <div className="noise-overlay" />
    </div>
  );
}