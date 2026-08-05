import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);

      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setIsVisible(false);
        window.setTimeout(onFinish, 400);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505] transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 scale-[1.03]'
      }`}
    >
      <ParticleBackground />

      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent_35%,rgba(255,107,0,0.05)_65%,transparent)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="rounded-[2rem] border border-white/10 bg-white/10 px-8 py-10 shadow-[0_0_80px_rgba(255,107,0,0.16)] backdrop-blur-2xl">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[1.4rem] border border-[#ff6b00]/40 bg-[#ff6b00]/10 shadow-[0_0_40px_rgba(255,107,0,0.28)] animate-[float_4s_ease-in-out_infinite]">
            <span className="text-3xl font-semibold tracking-[0.3em] text-[#ff6b00]">
              IT
            </span>
          </div>

          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.55em] text-slate-400">
            IMRAN TECH
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[0.22em] text-white sm:text-4xl">
            CRAFTING DIGITAL EXPERIENCES
          </h1>

          <div className="mx-auto mt-8 h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ff6b00] via-[#ff8a3d] to-[#ffd0a8] transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-4 text-sm font-medium tracking-[0.3em] text-slate-300">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
