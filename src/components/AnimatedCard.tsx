import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
};

function AnimatedCard({ children, className = '' }: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const borderGlowRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;

    // Check if touch device
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((0.5 - y / rect.height) * 10);
      const glowX = (x / rect.width) * 100;
      const glowY = (y / rect.height) * 100;

      // Direct DOM updates - no React re-renders
      element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.14), transparent 55%)`;
        glowRef.current.style.opacity = '1';
      }
      if (borderGlowRef.current) {
        borderGlowRef.current.style.opacity = '0.9';
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,107,0,0.1), transparent 50%)`;
        spotlightRef.current.style.opacity = '0.6';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)';
      if (glowRef.current) glowRef.current.style.opacity = '0';
      if (borderGlowRef.current) borderGlowRef.current.style.opacity = '0';
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={ref}
      className={`card-animated-border card-reflect group relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Light reflection that follows the cursor */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14), transparent 55%)',
          opacity: 0,
        }}
      />
      {/* Border glow */}
      <div
        ref={borderGlowRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          boxShadow: `0 0 50px rgba(255,107,0,0.18), inset 0 0 25px rgba(255,107,0,0.06)`,
          opacity: 0,
        }}
      />
      {/* Orange mouse spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,107,0,0.1), transparent 50%)',
          opacity: 0,
        }}
      />
      {children}
    </div>
  );
}

export default memo(AnimatedCard);